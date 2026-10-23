function status(s){el('status').textContent=s}
let connectionTimer, disconnectTimer, busy=false;
function close(){
 clearTimeout(connectionTimer);clearTimeout(disconnectTimer);
 const oldCh=ch,oldPc=pc;ch=null;pc=null;
 if(oldCh){oldCh.onopen=oldCh.onclose=oldCh.onmessage=oldCh.onerror=null;oldCh.close()}
 if(oldPc){oldPc.onconnectionstatechange=oldPc.ondatachannel=null;oldPc.close()}
 remoteInput={};remoteState=null;keys={};mouse.down=false;touch.mx=touch.my=0;touch.shoot=touch.dash=false;
}
function configuration(){
 const urls=el('turnUrls').value.trim().split(/\s+/).filter(Boolean);
 if(urls.some(u=>!/^turns?:[^\s]+$/.test(u)))throw Error('TURN-URLs müssen mit turn: oder turns: beginnen');
 if(el('relayOnly').checked&&!urls.length)throw Error('Für Nur TURN zuerst einen TURN-Server eintragen');
 const iceServers=[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']}];
 if(urls.length)iceServers.push({urls,username:el('turnUser').value,credential:el('turnPass').value});
 return {iceServers,iceTransportPolicy:el('relayOnly').checked?'relay':'all'};
}
function setup(kind){
 const config=configuration();
 if(typeof RTCPeerConnection==='undefined')throw Error('Dieser Browser unterstützt WebRTC nicht');
 close();reset();role=kind;mode=kind==='host'?'preparing':'waiting';el('out').value='';
 const peer=new RTCPeerConnection(config);pc=peer;
 peer.onconnectionstatechange=()=>{
  if(pc!==peer)return;
  const state=peer.connectionState;
  if(state==='connecting'&&mode!=='preparing'){mode='connecting';status('Codes ausgetauscht. Verbindung wird geprüft …');armTimeout(peer)}
  if(state==='connected'){clearTimeout(disconnectTimer);if(ch?.readyState==='open'){mode='online';status('Verbunden! Du spielst '+(role==='host'?'CYAN.':'PINK.'))}}
  if(state==='disconnected'){remoteInput={};status('Verbindung unterbrochen. Wiederherstellung läuft …');clearTimeout(disconnectTimer);disconnectTimer=setTimeout(()=>{if(pc===peer&&peer.connectionState==='disconnected')fail()},10000)}
  if(state==='failed')fail();
 };
 peer.ondatachannel=e=>{if(pc===peer)wire(e.channel,peer)};
 if(kind==='host')wire(peer.createDataChannel('game',{ordered:false,maxRetransmits:0}),peer);
 return peer;
}
function fail(){close();mode='idle';status('Verbindung fehlgeschlagen. Neu verbinden; bei blockierter Direktverbindung TURN auf beiden Geräten eintragen.')}
function armTimeout(peer){clearTimeout(connectionTimer);connectionTimer=setTimeout(()=>{if(pc===peer&&ch?.readyState!=='open')fail()},45000)}
function validState(d){
 const finite=(o,fields)=>o&&fields.every(k=>Number.isFinite(o[k]));
 return Array.isArray(d.ps)&&d.ps.length===2&&d.ps.every(p=>finite(p,['x','y','a','hp','dead','cool','flash','dash','dashCd','inv']))&&Array.isArray(d.bullets)&&d.bullets.length<=200&&d.bullets.every(b=>finite(b,['x','y','vx','vy','i','t'])&&(b.i===0||b.i===1))&&Array.isArray(d.scores)&&d.scores.length===2&&d.scores.every(n=>Number.isSafeInteger(n)&&n>=0);
}
function wire(channel,peer){
 if(ch&&ch!==channel){channel.close();return}ch=channel;
 channel.onopen=()=>{if(pc!==peer)return;clearTimeout(connectionTimer);mode='online';status('Verbunden! Du spielst '+(role==='host'?'CYAN.':'PINK.'))};
 channel.onclose=()=>{if(pc===peer){close();mode='idle';status('Verbindung geschlossen.')}};
 channel.onerror=()=>{if(pc===peer)fail()};
 channel.onmessage=e=>{
  if(pc!==peer||typeof e.data!=='string'||e.data.length>100000)return;
  try{const d=JSON.parse(e.data);if(!d||d.protocol!==3||!Number.isSafeInteger(d.seq)||d.seq<=lastRemoteSeq)return;lastRemoteSeq=d.seq;
   if(role==='host'&&d.type==='input'&&d.v&&Number.isFinite(d.v.a)){remoteInput={up:!!d.v.up,down:!!d.v.down,left:!!d.v.left,right:!!d.v.right,shoot:!!d.v.shoot,a:d.v.a,dash:!!d.v.dash,mx:Number.isFinite(d.v.mx)?clamp(d.v.mx,-1,1):undefined,my:Number.isFinite(d.v.my)?clamp(d.v.my,-1,1):undefined};remoteSeen=performance.now()}
   if(role==='guest'&&d.type==='state'&&validState(d))remoteState=d;
  }catch{}
 };
}
function requireCandidates(description){
 if(!/^a=candidate:/m.test(description?.sdp||''))throw Error('Keine Netzwerkadressen im Verbindungscode. WebRTC ist im Browser oder Netzwerk blockiert, oder der TURN-Server ist nicht erreichbar. Anderen Browser oder anderes Netzwerk testen; anschließend einen neuen Code erstellen.');
}
async function waitIce(peer){
 if(peer.iceGatheringState==='complete'){requireCandidates(peer.localDescription);return;}
 await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{cleanup();reject(Error('ICE-Zeitüberschreitung. Netzwerk oder TURN-Einstellungen prüfen und neu verbinden.'))},20000);
  function cleanup(){clearTimeout(timer);peer.removeEventListener('icegatheringstatechange',check);peer.removeEventListener('connectionstatechange',check)}
  function check(){if(peer.connectionState==='closed'){cleanup();reject(Error('Verbindung abgebrochen'))}else if(peer.iceGatheringState==='complete'){cleanup();resolve()}}
  peer.addEventListener('icegatheringstatechange',check);peer.addEventListener('connectionstatechange',check);check();
 });
 requireCandidates(peer.localDescription);
}
async function action(work){
 if(busy)return;busy=true;['host','guest','apply'].forEach(id=>el(id).disabled=true);
 try{await work()}catch(e){if(mode==='preparing'){close();mode='idle';el('out').value=''}status('Fehler: '+e.message)}finally{busy=false;['host','guest','apply'].forEach(id=>el(id).disabled=false)}
}
el('host').onclick=()=>action(async()=>{
 const peer=setup('host');el('in').value='';status('Host-Code wird vorbereitet …');
 await peer.setLocalDescription(await peer.createOffer());await waitIce(peer);if(pc!==peer)return;
 mode='waiting';el('out').value=JSON.stringify({...JSON.parse(JSON.stringify(peer.localDescription)),gameVersion:3});status('Host bereit. 1. Deinen Code an den Gast schicken. 2. Gast übernimmt ihn und schickt seine Antwort. 3. Antwort hier einfügen und übernehmen.');
});
el('guest').onclick=()=>action(async()=>{setup('guest');status('Host-Code einfügen und übernehmen.');});
el('apply').onclick=()=>action(async()=>{
 const raw=el('in').value.trim();if(raw.length>100000)throw Error('Code zu lang');
 const d=JSON.parse(raw);if(!d||!['offer','answer'].includes(d.type)||typeof d.sdp!=='string'||!d.sdp.startsWith('v=0'))throw Error('Ungültiger Verbindungscode');
 if(d.gameVersion!==3)throw Error('Unterschiedliche Spielversion. Beide Seiten neu laden und neue Codes erstellen.');
 requireCandidates(d);
 if(!pc&&d.type==='offer')setup('guest');
 const peer=pc;if(!peer)throw Error('Zuerst Host erstellen oder ein Host-Angebot einfügen');
 if(role==='guest'){
  if(d.type!=='offer')throw Error('Gast braucht den Host-Code');
  if(peer.remoteDescription)throw Error('Für ein neues Angebot zuerst Beitreten klicken');
  mode='preparing';status('Antwortcode wird erstellt …');await peer.setRemoteDescription(d);await peer.setLocalDescription(await peer.createAnswer());await waitIce(peer);if(pc!==peer)return;
  mode='waiting';el('out').value=JSON.stringify({...JSON.parse(JSON.stringify(peer.localDescription)),gameVersion:3});status('Antwort bereit: Deinen Code an den Host schicken. Erst wenn er ihn übernimmt, beginnt das Spiel.');
  if(peer.connectionState==='connecting'){mode='connecting';armTimeout(peer)}
 }else{
  if(d.type!=='answer'||peer.signalingState!=='have-local-offer')throw Error('Host braucht die Antwort auf seinen aktuellen Code');
  await peer.setRemoteDescription(d);if(pc!==peer)return;if(ch?.readyState!=='open'){mode='connecting';status('Antwort übernommen. Verbindung wird geprüft (max. 45 Sekunden) …');armTimeout(peer)}
 }
});
el('solo').onclick=startSolo;
el('disconnect').onclick=()=>{close();mode='idle';el('in').value='';el('out').value='';status('Getrennt.')};
el('copy').onclick=async()=>{if(!el('out').value){status('Zuerst einen Verbindungscode erstellen.');return}try{await navigator.clipboard.writeText(el('out').value);status('Code kopiert.')}catch{el('out').select();status('Code markieren und manuell kopieren.')}};
window.addEventListener('pagehide',close);
