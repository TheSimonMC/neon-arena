const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements=new Map();
const el=id=>{if(!elements.has(id))elements.set(id,{value:'',checked:false,addEventListener(){},getContext(){return {}},textContent:''});return elements.get(id)};
const peers=[];
class Peer{
 constructor(config){this.config=config;this.connectionState='new';this.iceGatheringState='complete';this.signalingState='stable';peers.push(this)}
 createDataChannel(){return {readyState:'connecting',bufferedAmount:0,close(){this.readyState='closed'},send(){}}}
 close(){this.connectionState='closed'}
 addEventListener(){} removeEventListener(){}
 async createOffer(){return {type:'offer',sdp:'v=0\r\na=candidate:1 1 UDP 1 192.0.2.1 12345 typ host\r\n'}}
 async createAnswer(){return {type:'answer',sdp:'v=0\r\na=candidate:1 1 UDP 1 192.0.2.1 12345 typ host\r\n'}}
 async setLocalDescription(d){this.localDescription=d;this.signalingState=d.type==='offer'?'have-local-offer':'stable'}
 async setRemoteDescription(d){this.remoteDescription=d;this.signalingState=d.type==='answer'?'stable':'have-remote-offer'}
}
const ctx=vm.createContext({document:{querySelector:()=>el('c'),getElementById:el},window:{addEventListener(){}},requestAnimationFrame(){},RTCPeerConnection:Peer,performance:{now:()=>1000},setTimeout:()=>1,clearTimeout(){},navigator:{},console});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1],ctx);
const run=s=>vm.runInContext(s,ctx);
(async()=>{
 await el('host').onclick();assert.equal(JSON.parse(el('out').value).type,'offer');assert.equal(run('mode'),'waiting','host waits for answer, not connecting');
 run("remoteInput={shoot:true};remoteState={bad:true};const previous=ch;el('solo').onclick();if(previous.onclose)previous.onclose();");
 assert.equal(run('mode'),'solo');assert.equal(run('remoteState'),null);assert.equal(run('Object.keys(remoteInput).length'),0);
 el('in').value=JSON.stringify({type:'offer',sdp:'v=0\r\na=candidate:1 1 UDP 1 192.0.2.1 12345 typ host\r\n'});await el('apply').onclick();
 assert.equal(run('role'),'guest');assert.equal(JSON.parse(el('out').value).type,'answer');
 run("pc.ondatachannel({channel:pc.createDataChannel()});ch.readyState='open';ch.onopen();ps=[player(0),player(1)];mouse.down=true;update(.04)");assert.equal(run('bullets.length'),0,'guest must not simulate local bullets');
 run("ch.onmessage({data:JSON.stringify({type:'state',ps:[player(0),player(1)],bullets:[],scores:null})})");assert.equal(run('remoteState'),null,'reject invalid scores');
 run("ch.onmessage({data:JSON.stringify({type:'state',ps:[player(0),player(1)],bullets:[],scores:[3,4]})});update(.04)");assert.equal(run('scores[1]'),4);
 run("setup('host');ch.onopen();remoteInput={right:true};remoteSeen=0;update(.04)");assert.equal(run('ps[1].x'),690,'stale input must stop movement');
 run("ch.onmessage({data:JSON.stringify({type:'input',v:{right:true,a:0}})});update(.04)");assert.ok(run('ps[1].x')>690);
 run("pc.connectionState='disconnected';pc.onconnectionstatechange();pc.connectionState='connected';pc.onconnectionstatechange()");assert.equal(run('mode'),'online');
 run("el('disconnect').onclick()");
 el('in').value=JSON.stringify({type:'offer',sdp:'v=0\r\n'});await el('apply').onclick();assert.match(el('status').textContent,/Keine Netzwerkadressen/);assert.equal(run('pc'),null);
 const originalOffer=Peer.prototype.createOffer;Peer.prototype.createOffer=async()=>({type:'offer',sdp:'v=0\r\n'});await el('host').onclick();assert.equal(run('mode'),'idle');assert.equal(el('out').value,'');assert.match(el('status').textContent,/Keine Netzwerkadressen/);Peer.prototype.createOffer=originalOffer;
 el('relayOnly').checked=true;assert.throws(()=>run('configuration()'),/TURN/);
 el('turnUrls').value='turn:example.com:3478';assert.equal(run('configuration().iceTransportPolicy'),'relay');
 run("el('disconnect').onclick()");assert.equal(run('pc'),null);assert.equal(run('mode'),'idle');
 console.log('PASS: offer/answer, automatic join, session reset, guest authority, packet validation, stale inputs, reconnect, TURN config, disconnect');
})().catch(e=>{console.error(e);process.exitCode=1});
