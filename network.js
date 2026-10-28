'use strict';
const NET_PROTOCOL=6, ROOM_ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
let networkGeneration=0, registrationTimer=null, retryTimer=null, healthTimer=null, connectionTimer=null, helloTimer=null;
let lobbyCode='', lastPacketAt=0, handshake=null, signalingRetries=0;
function status(s){el('status').textContent=s;el('waitMessage').textContent=s;}
function showFailure(message){status(message);if(!el('networkDialog').open)el('networkDialog').showModal();}
function controls(){const pending=mode==='preparing'||mode==='connecting';el('host').disabled=pending;el('guest').disabled=pending;el('copy').disabled=!lobbyCode;el('copyLink').disabled=!lobbyCode;el('roomCode').value=lobbyCode;el('roomLink').value=lobbyCode?roomLink(lobbyCode):'';}
function roomLink(code){const u=new URL(location.href);u.search='';u.hash='room='+code;return u.href;}
function randomRoom(){const bytes=new Uint8Array(8);crypto.getRandomValues(bytes);return Array.from(bytes,n=>ROOM_ALPHABET[n%ROOM_ALPHABET.length]).join('');}
function parseRoom(value){let s=value.trim();if(s.length>500)throw Error('Bitte den neuen 8-stelligen Lobby-Code verwenden, keinen alten Verbindungscode.');if(/^https?:\/\//i.test(s)){const u=new URL(s);s=new URLSearchParams(u.hash.slice(1)).get('room')||u.searchParams.get('room')||'';}s=s.toUpperCase().replace(/[\s-]/g,'');if(!/^[A-HJ-NP-Z2-9]{8}$/.test(s))throw Error('Ungültiger Lobby-Code. Erwartet werden 8 Zeichen oder ein Einladungslink.');return s;}
function configuration(){
 const urls=el('turnUrls').value.trim().split(/\s+/).filter(Boolean);
 if(urls.some(u=>!/^turns?:[^\s]+$/.test(u)))throw Error('TURN-URLs müssen mit turn: oder turns: beginnen.');
 // Retain PeerJS 1.5.5's bundled ICE defaults, including its public TURN fallback.
 // Replacing the defaults with STUN alone would remove that fallback.
 const defaults=window.peerjs?.util?.defaultConfig?.iceServers;
 const iceServers=urls.length||!Array.isArray(defaults)?[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']}]:JSON.parse(JSON.stringify(defaults));
 if(urls.length)iceServers.push({urls,username:el('turnUser').value,credential:el('turnPass').value});
 if(el('relayOnly').checked&&!iceServers.some(s=>(Array.isArray(s.urls)?s.urls:[s.urls]).some(u=>/^turns?:/.test(u))))throw Error('Für Nur TURN zuerst einen TURN-Server eintragen.');
 return{iceServers,iceTransportPolicy:el('relayOnly').checked?'relay':'all'};
}
function peerOptions(){const options={secure:true,debug:0,config:configuration()};const host=el('peerServer').value.trim();if(host){if(!/^[a-z0-9.-]+$/i.test(host))throw Error('PeerServer als Hostname ohne https:// eingeben.');options.host=host;options.port=443;options.path='/';}return options;}
function clearConnection(){clearTimeout(connectionTimer);clearInterval(helloTimer);clearInterval(healthTimer);connectionTimer=helloTimer=healthTimer=null;const old=ch;ch=null;handshake=null;remoteInput={};remoteState=null;remoteSeen=0;if(old){old.removeAllListeners?.();try{old.close()}catch{}}}
function close(){networkGeneration++;clearTimeout(registrationTimer);clearTimeout(retryTimer);registrationTimer=retryTimer=null;clearConnection();const old=pc;pc=null;if(old){old.removeAllListeners?.();try{old.destroy()}catch{}}lobbyCode='';signalingRetries=0;keys={};mouse.down=false;mouse.queued=false;touch.mx=touch.my=0;touch.shoot=touch.dash=false;gameAudio.stop();controls();}
function fail(message){close();mode='idle';controls();showFailure(message);}
function connectionLost(message){clearConnection();if(role==='host'&&pc&&!pc.destroyed){reset();mode='waiting';controls();showFailure(message+' Deine Lobby bleibt geöffnet. Der Gast kann erneut beitreten.');}else fail(message);}
function current(peer,generation){return pc===peer&&generation===networkGeneration;}
function errorText(error){return({'browser-incompatible':'Dieser Browser unterstützt WebRTC nicht. Bitte einen aktuellen Safari, Chrome, Firefox oder Edge verwenden.','peer-unavailable':'Lobby nicht gefunden. Code prüfen und den Host bitten, den Tab geöffnet zu lassen.','unavailable-id':'Dieser Lobby-Code ist bereits belegt. Bitte eine neue Lobby erstellen.','network':'Der Lobby-Server ist nicht erreichbar. Netzwerk prüfen oder einen eigenen PeerServer eintragen.','server-error':'Der Lobby-Server hat einen Fehler gemeldet. Bitte erneut versuchen.','socket-error':'Die Verbindung zum Lobby-Server wurde blockiert oder unterbrochen.','socket-closed':'Die Verbindung zum Lobby-Server wurde geschlossen.','webrtc':'Die WebRTC-Verbindung ist fehlgeschlagen. Bei blockierter Direktverbindung einen TURN-Server eintragen.','ssl-unavailable':'Der gewählte Lobby-Server unterstützt keine sichere Verbindung.','invalid-id':'Ungültige Lobby-ID. Bitte eine neue Lobby erstellen.','invalid-key':'Der Lobby-Server hat die Verbindung abgelehnt.'})[error?.type]||'Verbindung fehlgeschlagen. Bitte erneut versuchen oder Netzwerk / TURN prüfen.';}
function begin(kind,code){
 try{
  if(typeof Peer!=='function')throw Error('PeerJS konnte nicht geladen werden. Seite vollständig neu laden.');
  if(typeof RTCPeerConnection!=='function')throw Error('WebRTC ist in diesem Browser nicht verfügbar.');
  if(typeof isSecureContext!=='undefined'&&!isSecureContext)throw Error('Bitte das Spiel über seine HTTPS-Adresse öffnen.');
  const options=peerOptions();if(kind==='guest'&&code===lobbyCode)throw Error('Du kannst deiner eigenen Lobby nicht beitreten.');
  close();reset();role=kind;mode='preparing';controls();gameAudio.unlock();status('Verbindung zum Lobby-Server wird hergestellt …');
  const generation=networkGeneration,room=kind==='host'?randomRoom():code;
  const peer=pc=kind==='host'?new Peer('neon-arena-'+room,options):new Peer(options);
  registrationTimer=setTimeout(()=>{if(current(peer,generation))fail('Lobby-Server antwortet nicht (20 Sekunden). Netzwerk prüfen oder eigenen PeerServer verwenden.');},20000);
  peer.on('open',()=>{
   if(!current(peer,generation))return;clearTimeout(registrationTimer);clearTimeout(retryTimer);signalingRetries=0;
   if(mode==='online'){status('Verbunden. Lobby-Server wieder erreichbar.');return;}
   if(kind==='host'){lobbyCode=room;mode=ch?'connecting':'waiting';status('Lobby '+room+' ist bereit. Code oder Link teilen und diesen Tab geöffnet lassen.');controls();}
   else if(!ch){mode='connecting';status('Suche Lobby und verbinde mit '+room+' …');controls();try{wire(peer.connect('neon-arena-'+room,{label:'neon-arena',serialization:'raw',reliable:false,metadata:{protocol:NET_PROTOCOL,engine:WeaponSystem.signature}}),peer,generation)}catch(error){fail('Datenverbindung konnte nicht erstellt werden: '+error.message)}}
  });
  peer.on('connection',connection=>{if(!current(peer,generation)){connection.close();return;}if(kind!=='host'){rejectConnection(connection,'Diese Sitzung ist keine Host-Lobby.');return;}if(ch){rejectConnection(connection,'Lobby ist voll. Es können genau zwei Spieler teilnehmen.');return;}wire(connection,peer,generation);});
  peer.on('error',error=>{if(!current(peer,generation))return;if(error.type==='peer-unavailable'||error.type==='webrtc'){connectionLost(errorText(error));return;}if(mode==='online'&&['network','socket-error','socket-closed','server-error'].includes(error.type)){status('Spiel verbunden, Lobby-Server derzeit nicht erreichbar.');return;}fail(errorText(error));});
  peer.on('disconnected',()=>{
   if(!current(peer,generation))return;status(mode==='online'?'Spiel läuft weiter. Lobby-Server wird erneut verbunden …':'Lobby-Server getrennt. Verbindung wird wiederhergestellt …');
   const reconnect=()=>{if(!current(peer,generation)||!peer.disconnected)return;if(signalingRetries++>=3){if(mode!=='online')fail('Lobby-Server bleibt unerreichbar. Bitte neue Lobby erstellen.');else status('Spiel läuft, Lobby-Server ist nicht erreichbar.');return;}try{peer.reconnect()}catch{}retryTimer=setTimeout(reconnect,3000);};clearTimeout(retryTimer);retryTimer=setTimeout(reconnect,1000);
  });
  peer.on('close',()=>{if(current(peer,generation))fail('Lobby geschlossen. Bitte erneut hosten oder beitreten.');});
 }catch(error){if(mode==='preparing')close();mode=pc?mode:'idle';controls();showFailure(error.message);}
}
function rejectConnection(connection,reason){let done=false;const timer=setTimeout(()=>connection.close(),4000);connection.on('error',()=>{clearTimeout(timer);connection.close()});connection.on('open',()=>{if(done)return;done=true;try{connection.send(JSON.stringify({type:'reject',reason}))}catch{}clearTimeout(timer);setTimeout(()=>connection.close(),300);});}
function rawSend(connection,data){if(!connection?.open)return false;try{connection.send(JSON.stringify(data));return true}catch{return false}}
function wire(connection,peer,generation){
 ch=connection;mode='connecting';controls();handshake={hello:false,ready:false};
 const ours=()=>current(peer,generation)&&ch===connection;
 const hello=()=>rawSend(connection,{type:'hello',protocol:NET_PROTOCOL,engine:WeaponSystem.signature,role});
 const activate=()=>{if(!ours()||!handshake.hello||!handshake.ready||mode==='online')return;clearTimeout(connectionTimer);clearInterval(helloTimer);mode='online';lastPacketAt=performance.now();controls();status('Verbunden! Du spielst '+(role==='host'?'CYAN.':'PINK.'));healthTimer=setInterval(()=>{if(!ours())return;if(performance.now()-lastPacketAt>15000){connectionLost('Keine Antwort vom Mitspieler seit 15 Sekunden.');return;}rawSend(connection,{type:'ping'});},1000);};
 connectionTimer=setTimeout(()=>{if(ours())connectionLost('Keine Spielverbindung nach 25 Sekunden. WebRTC könnte im Browser oder Netzwerk blockiert sein. Anderes Netzwerk oder eigenen TURN-Server testen.');},25000);
 connection.on('open',()=>{if(!ours())return;status('Datenkanal offen. Spielversion wird geprüft …');hello();helloTimer=setInterval(hello,500);});
 connection.on('data',raw=>{
  if(!ours()||typeof raw!=='string'||raw.length>100000)return;
  let d;try{d=JSON.parse(raw)}catch{return}if(!d||typeof d!=='object')return;
  if(d.type==='reject'){connectionLost(typeof d.reason==='string'?d.reason.slice(0,200):'Lobby hat die Verbindung abgelehnt.');return;}
  if(d.type==='hello'){
   if(d.protocol!==NET_PROTOCOL||d.engine!==WeaponSystem.signature||d.role===role||!['host','guest'].includes(d.role)){rawSend(connection,{type:'reject',reason:'Unterschiedliche Spielversion. Beide Seiten vollständig neu laden.'});connectionLost('Unterschiedliche Spielversion. Beide Seiten vollständig neu laden.');return;}
   handshake.hello=true;rawSend(connection,{type:'ready',protocol:NET_PROTOCOL,engine:WeaponSystem.signature});activate();return;
  }
  if(d.type==='ready'&&d.protocol===NET_PROTOCOL&&d.engine===WeaponSystem.signature){handshake.ready=true;activate();return;}
  if(mode!=='online')return;
  if(d.type==='ping'){lastPacketAt=performance.now();rawSend(connection,{type:'pong'});return;}if(d.type==='pong'){lastPacketAt=performance.now();return;}
  if(receiveGamePacket(d))lastPacketAt=performance.now();
 });
 connection.on('close',()=>{if(ours())connectionLost('Mitspieler hat die Verbindung geschlossen.');});
 connection.on('error',()=>{if(ours())connectionLost('Datenverbindung fehlgeschlagen. Netzwerk / TURN prüfen.');});
}
function receiveGamePacket(d){
 if(d.protocol!==NET_PROTOCOL||!Number.isSafeInteger(d.seq)||d.seq<=lastRemoteSeq)return false;
 if(role==='host'&&d.type==='input'&&d.v&&Number.isFinite(d.v.a)){
  const v=d.v;remoteInput={reloadRequest:Number.isSafeInteger(v.reloadRequest)&&v.reloadRequest>=0?v.reloadRequest:0,pickupRequest:Number.isSafeInteger(v.pickupRequest)&&v.pickupRequest>=0?v.pickupRequest:0,up:!!v.up,down:!!v.down,left:!!v.left,right:!!v.right,shoot:!!v.shoot,a:v.a,dash:!!v.dash,mx:Number.isFinite(v.mx)?clamp(v.mx,-1,1):undefined,my:Number.isFinite(v.my)?clamp(v.my,-1,1):undefined};remoteSeen=performance.now();
 }else if(role==='guest'&&d.type==='state'&&validState(d))remoteState=d;else return false;
 lastRemoteSeq=d.seq;return true;
}
function validState(d){
 const finite=(o,fields)=>o&&fields.every(k=>Number.isFinite(o[k]));
 return Array.isArray(d.ps)&&d.ps.length===2&&d.ps.every(p=>finite(p,['x','y','a','hp','dead','cool','flash','dash','dashCd','inv','reloading'])&&WeaponSystem.has(p.weapon)&&Number.isSafeInteger(p.pickupSeen)&&Number.isSafeInteger(p.reloadSeen)&&Number.isSafeInteger(p.ammo)&&p.ammo>=0&&p.ammo<=WeaponSystem.catalog[p.weapon].capacity&&Number.isSafeInteger(p.reserve)&&p.reserve>=0&&p.reserve<=WeaponSystem.catalog[p.weapon].capacity*3&&p.reloading>=0&&p.reloading<=WeaponSystem.catalog[p.weapon].reloadTime)&&Array.isArray(d.bullets)&&d.bullets.length<=200&&d.bullets.every(b=>finite(b,['x','y','vx','vy','i','t'])&&(b.i===0||b.i===1))&&Array.isArray(d.weaponDrops)&&d.weaponDrops.length<=5&&d.weaponDrops.every(w=>finite(w,['x','y','ttl'])&&Number.isSafeInteger(w.id)&&WeaponSystem.has(w.weapon)&&w.x>=0&&w.x<=1000&&w.y>=0&&w.y<=640)&&Array.isArray(d.scores)&&d.scores.length===2&&d.scores.every(n=>Number.isSafeInteger(n)&&n>=0);
}
el('host').onclick=()=>begin('host');
el('guest').onclick=()=>{try{begin('guest',parseRoom(el('joinCode').value))}catch(e){showFailure(e.message)}};
el('joinCode').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();el('guest').onclick()}});
el('solo').onclick=startSolo;
el('disconnect').onclick=()=>{close();mode='idle';controls();status('Getrennt. Du kannst eine neue Lobby öffnen.');};
async function copyLobby(link){if(!lobbyCode)return;const field=el(link?'roomLink':'roomCode');try{await navigator.clipboard.writeText(field.value);status(link?'Einladungslink kopiert.':'Lobby-Code kopiert.')}catch{field.focus();field.select();status('Bitte den markierten Code oder Link manuell kopieren.');}}
el('copy').onclick=()=>copyLobby(false);el('copyLink').onclick=()=>copyLobby(true);
function loadInvitation(){if(location.hash.startsWith('#room=')){try{el('joinCode').value=parseRoom(location.href);showNetwork();status('Einladung geladen. Auf BEITRETEN klicken.')}catch(e){showFailure(e.message)}}}
window.addEventListener('DOMContentLoaded',()=>{controls();loadInvitation()});
window.addEventListener('hashchange',loadInvitation);
window.addEventListener('pagehide',close);
