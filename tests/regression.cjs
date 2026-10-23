const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const elements=new Map();
const el=id=>{if(!elements.has(id))elements.set(id,{value:'',checked:false,open:false,hidden:false,style:{},classList:{toggle(){}},textContent:'',setAttribute(){},addEventListener(){},close(){this.open=false},showModal(){this.open=true}});return elements.get(id)};
class Peer{
 constructor(config){this.config=config;this.connectionState='new';this.iceGatheringState='complete';this.signalingState='stable'}
 createDataChannel(){return{readyState:'connecting',bufferedAmount:0,close(){this.readyState='closed'},send(){}}}
 close(){this.connectionState='closed'}addEventListener(){}removeEventListener(){}
 async createOffer(){return{type:'offer',sdp:'v=0\r\na=candidate:1 1 UDP 1 192.0.2.1 12345 typ host\r\n'}}
 async createAnswer(){return{...await this.createOffer(),type:'answer'}}
 async setLocalDescription(d){this.localDescription=d;this.signalingState=d.type==='offer'?'have-local-offer':'stable'}
 async setRemoteDescription(d){this.remoteDescription=d;this.signalingState=d.type==='answer'?'stable':'have-remote-offer'}
}
const ctx=vm.createContext({document:{getElementById:el,addEventListener(){}},window:{addEventListener(){}},requestAnimationFrame(){},RTCPeerConnection:Peer,performance:{now:()=>1000},setTimeout:()=>1,clearTimeout(){},navigator:{},console});
for(const name of ['vendor/blackline.js','weapons.js','audio.js','renderer.js','game.js','network.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',name),'utf8'),ctx);
const run=s=>vm.runInContext(s,ctx);
(async()=>{
 await el('host').onclick();assert.equal(JSON.parse(el('out').value).type,'offer');assert.equal(JSON.parse(el('out').value).gameVersion,4);assert.equal(run('mode'),'waiting');
 run("remoteInput={shoot:true};remoteState={bad:true};const previous=ch;el('solo').onclick();if(previous.onclose)previous.onclose();");assert.equal(run('mode'),'solo');assert.equal(run('remoteState'),null);assert.equal(run('Object.keys(remoteInput).length'),0);
 run("el('disconnect').onclick()");el('in').value=JSON.stringify({...await new Peer({}).createOffer(),gameVersion:4,engineSignature:run('WeaponSystem.signature')});await el('apply').onclick();assert.equal(run('role'),'guest');assert.equal(JSON.parse(el('out').value).type,'answer');
 run("pc.ondatachannel({channel:pc.createDataChannel()});ch.readyState='open';ch.onopen();mouse.down=true;update(.04)");assert.equal(run('bullets.length'),0,'guest never simulates projectiles');
 run("ch.onmessage({data:JSON.stringify({protocol:4,seq:1,type:'state',ps:[player(0),player(1)],bullets:[],weaponDrops:[],scores:null})})");assert.equal(run('remoteState'),null);
 run("ch.onmessage({data:JSON.stringify({protocol:4,seq:2,type:'state',ps:[player(0),player(1)],bullets:[],weaponDrops:[],scores:[3,4]})});update(.04)");assert.equal(run('scores[1]'),4);
 run("ch.onmessage({data:JSON.stringify({protocol:4,seq:1,type:'state',ps:[player(0),player(1)],bullets:[],weaponDrops:[],scores:[0,0]})});update(.04)");assert.equal(run('scores[1]'),4,'out of order packets cannot rewind match');
 run("setup('host');ch.readyState='open';ch.onopen();remoteInput={right:true};remoteSeen=0;update(.04)");assert.equal(run('ps[1].x'),670,'stale input stops');
 run("ch.onmessage({data:JSON.stringify({protocol:4,seq:1,type:'input',v:{mx:.5,my:0,dash:true,a:0}})});update(.04)");assert.ok(run('ps[1].x')>670,'analog input and dash supported');
 run("pc.connectionState='disconnected';pc.onconnectionstatechange();pc.connectionState='connected';pc.onconnectionstatechange()");assert.equal(run('mode'),'online');
 run("el('disconnect').onclick()");el('in').value=JSON.stringify({type:'offer',gameVersion:4,engineSignature:run('WeaponSystem.signature'),sdp:'v=0\r\n'});await el('apply').onclick();assert.match(el('status').textContent,/Keine Netzwerkadressen/);assert.equal(run('pc'),null);
 const old=Peer.prototype.createOffer;Peer.prototype.createOffer=async()=>({type:'offer',sdp:'v=0\r\n'});await el('host').onclick();assert.equal(run('mode'),'idle');assert.equal(el('out').value,'');Peer.prototype.createOffer=old;
 el('in').value=JSON.stringify({...await new Peer({}).createOffer(),gameVersion:2});await el('apply').onclick();assert.match(el('status').textContent,/Spielversion/);
 el('relayOnly').checked=true;assert.throws(()=>run('configuration()'),/TURN/);el('turnUrls').value='turn:example.com:3478';assert.equal(run('configuration().iceTransportPolicy'),'relay');
 run("reset();mode='solo';ps[0].x=185;ps[0].y=160;move(0,{mx:1,my:0,a:0,dash:true},.04)");assert.ok(run('ps[0].x')<197,'dash cannot tunnel through cover');
 run("reset();mode='online';role='host';ps[0].x=400;ps[0].y=240;ps[1].x=450;ps[1].y=240;ps[1].inv=0;fire(0);for(let i=0;i<8;i++)simulate(.01)");assert.equal(run('ps[1].hp'),75,'bullet hit applies damage');
 run("reset();mode='solo';for(let i=0;i<1000;i++)update(.016)");assert.ok(run('ps.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y))'));assert.ok(run('sparks.length')<=420);assert.ok(run('bullets.length')<200);
 run("reset();mode='solo';weaponDrops=[{id:99,x:ps[0].x,y:ps[0].y,weapon:'akm',ttl:30}];equipNearby(0,1)");assert.equal(run('ps[0].weapon'),'akm');assert.equal(run('weaponDrops.length'),0,'old gun disappears');
 run("weaponDrops=[{id:100,x:ps[0].x,y:ps[0].y,weapon:'mp5',ttl:30}];equipNearby(0,1)");assert.equal(run('ps[0].weapon'),'akm','repeated packet does not pick up twice');
 run('equipNearby(0,2)');assert.equal(run('ps[0].weapon'),'mp5');
 run("weaponDrops=[{id:101,x:900,y:100,weapon:'p90',ttl:30}];equipNearby(0,3)");assert.equal(run('ps[0].weapon'),'mp5','out of range pickup rejected');
 run("reset();mode='online';role='host';ps[0].weapon='mossberg590';fire(0)");assert.equal(run('bullets.length'),8);assert.equal(run('eventLog.filter(e=>e.kind==="shot").length'),1,'shotgun emits one acoustic shot');
 assert.equal(run('new Set(Array.from({length:WeaponSystem.ids.length},WeaponSystem.bag())).size'),18,'shuffle bag includes every profile');
 assert.equal(run('validState({ps,bullets,scores,weaponDrops:[{id:1,x:100,y:100,ttl:30,weapon:"unknown"}]})'),false,'unknown profiles rejected');
 run('close()');
 // Projection must map an aiming point back to its floor position through the lens.
 run("const r=Object.create(ArenaRenderer.prototype);r.canvas={width:1000,height:650,getBoundingClientRect:()=>({left:0,top:0,width:1000,height:650})};r.view=[560,365];r.shake=[0,0];r.lens=.14;const p=r.project(700,430);const q=r.unproject(p.x,p.y);if(Math.hypot(q.x-700,q.y-430)>.1)throw Error('lens aiming mismatch')");
 console.log('PASS: signaling, host waiting, version checks, ICE errors, session cleanup, guest authority, packet order, analog input, dash collision, damage, simulation stability, fisheye aiming');
})().catch(e=>{console.error(e);process.exitCode=1});
