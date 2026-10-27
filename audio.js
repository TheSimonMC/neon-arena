/* BLACKLINE adapter + original procedural industrial score. No gun sample cache. */
'use strict';
class ArenaAudio{
 constructor(){this.enabled=true;this.music=true;this.playing=false;this.ctx=null;this.nodes=new Set();this.step=0;this.timer=null;this.error='';this.spatialClock=0;this.local=0;}
 async unlock(){
  if(!this.enabled)return;
  try{
   if(!this.ctx){
    const c=this.ctx=new(window.AudioContext||window.webkitAudioContext)();
    this.master=c.createGain();this.master.gain.value=.82;const limiter=c.createDynamicsCompressor();limiter.threshold.value=-4;limiter.knee.value=10;limiter.ratio.value=5;this.master.connect(limiter);limiter.connect(c.destination);
    this.musicBus=c.createGain();this.musicBus.gain.value=.14;this.musicBus.connect(this.master);this.fxBus=c.createGain();this.fxBus.gain.value=.5;this.fxBus.connect(this.master);
    this.engine=new Blackline.Engine({context:c,destination:this.master,masterGain:.62,maxVoices:32,limiter:{ceilingDB:-1,releaseMS:70,lookaheadMS:5}});
    this.emitters=[0,1].map(i=>this.engine.createEmitter({id:'pilot-'+i,weapon:WeaponSystem.defaultId,environment:'hall',room:{rt:.48,wet:.08,early:.16,damping:.6,size:.65,width:.85},distanceModel:'game',rolloff:.5,panningModel:'HRTF',propagation:true,synth:{surface:'concrete',transient:1.3,texture:1.2,body:1.1,gas:.7,mechanical:.85,casing:.5,metalness:.12,brightness:.65}}));
    this.buffers={};for(const name of ['kick','snare','hat','metal','dash','hit','kill','heal','spawn','impact'])this.buffers[name]=this.makeBuffer(name);
   }
   await this.engine.resume();this.error='';this.sync();
  }catch(e){this.error='Audio: '+e.message;this.stop();}
 }
 makeBuffer(kind){
  const c=this.ctx,sr=c.sampleRate,duration=({kick:.3,snare:.2,hat:.055,metal:.32,dash:.3,hit:.11,kill:.6,heal:.4,spawn:.4,impact:.09})[kind],b=c.createBuffer(1,Math.ceil(sr*duration),sr),a=b.getChannelData(0);let phase=0,prev=0,low=0,mid=0,seed=417;
  for(let i=0;i<a.length;i++){const t=i/sr,u=t/duration;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const noise=seed/2147483648-1,high=noise-prev;prev=noise;low+=.045*(noise-low);mid+=.3*(noise-mid);let v=0;
   if(kind==='kick'){phase+=2*Math.PI*(45+115*Math.exp(-t*36))/sr;v=Math.sin(phase)*Math.exp(-t*15)+high*.14*Math.exp(-t*180)}
   else if(kind==='snare')v=(high*.45+Math.sin(t*2*Math.PI*174)*.4)*Math.exp(-t*24);
   else if(kind==='hat')v=high*.35*Math.exp(-t*75);
   else if(kind==='dash')v=noise*.42*Math.sin(Math.PI*u)*Math.sin(t*2*Math.PI*(900-650*u));
   else if(kind==='kill')v=(low*2.8+(mid-low)*.8)*Math.exp(-t*22);
   else if(kind==='hit')v=((mid-low)*1.7+low*2+high*.12)*Math.exp(-t*65);
   else if(kind==='impact')v=((noise-mid)*.7+(mid-low)*1.2)*Math.exp(-t*95);
   else if(kind==='heal'||kind==='spawn')v=(Math.sin(t*2*Math.PI*660)+Math.sin(t*2*Math.PI*990)*.35)*.3*Math.exp(-t*14)+(high*.25*Math.exp(-t*90));
   else v=(Math.sin(t*2*Math.PI*731)*Math.sin(t*2*Math.PI*1139)+high*.2)*.35*Math.exp(-t*17);
   a[i]=Math.tanh(v*1.4)*Math.min(1,i/(sr*.0015))*Math.min(1,(a.length-i)/(sr*.004));
  }return b;
 }
 sample(name,when,gain,bus=this.fxBus,rate=1){const c=this.ctx,s=c.createBufferSource(),g=c.createGain();s.buffer=this.buffers[name];s.playbackRate.value=rate;g.gain.value=gain;s.connect(g);g.connect(bus);this.nodes.add(s);s.onended=()=>{this.nodes.delete(s);s.disconnect();g.disconnect()};s.start(when);return s;}
 bass(note,t,accent=false){const c=this.ctx,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter(),d=c.createWaveShaper();o.type='sawtooth';o.frequency.value=440*2**((note-69)/12);const curve=new Float32Array(128);for(let i=0;i<128;i++)curve[i]=Math.tanh((i/63.5-1)*3);d.curve=curve;f.type='lowpass';f.frequency.setValueAtTime(accent?2300:1100,t);f.frequency.exponentialRampToValueAtTime(150,t+.13);f.Q.value=3;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(accent?.23:.16,t+.004);g.gain.exponentialRampToValueAtTime(.001,t+.15);o.connect(d);d.connect(f);f.connect(g);g.connect(this.musicBus);this.nodes.add(o);o.onended=()=>{this.nodes.delete(o);[o,d,f,g].forEach(n=>n.disconnect())};o.start(t);o.stop(t+.17);}
 schedule(){if(!this.ctx||this.ctx.state!=='running')return;const c=this.ctx,beat=60/116/4;if(this.next<c.currentTime)this.next=c.currentTime+.025;
  while(this.next<c.currentTime+.12){const n=this.step++,s=n%16,bar=Math.floor(n/16),root=[28,28,31,27][Math.floor(bar/4)%4],breakdown=bar%16===15,t=this.next;
   if(!breakdown&&[0,6,8,11].includes(s))this.sample('kick',t,.85,this.musicBus);
   if(s===4||s===12)this.sample('snare',t,.7,this.musicBus);
   if(s%2===0||bar%4===3)this.sample('hat',t,s%2?.24:.38,this.musicBus,s%4===2?.85:1.15);
   if(s===14&&bar%2===1)this.sample('metal',t,.42,this.musicBus,.7);
   if([0,3,6,8,10,14].includes(s)&&(!breakdown||s<4))this.bass(root+[0,0,7,0,12,1][[0,3,6,8,10,14].indexOf(s)],t,s===0);
   if(bar%8>=4&&[2,7,15].includes(s))this.bass(root+24+(s===7?7:0),t,false);
   this.next+=beat;
  }
 }
 sync(){if(!this.ctx)return;const run=this.enabled&&this.playing&&!document.hidden;
  if(!run){this.stop();return}if(this.music&&!this.timer){this.next=this.ctx.currentTime+.04;this.timer=setInterval(()=>this.schedule(),25);this.schedule()}else if(!this.music&&this.timer){clearInterval(this.timer);this.timer=null}this.musicBus.gain.setTargetAtTime(this.music?.14:0,this.ctx.currentTime,.04);
 }
 stop(){if(this.timer)clearInterval(this.timer);this.timer=null;for(const n of this.nodes){try{n.stop()}catch{}}this.nodes.clear();this.engine?.stopAll({tails:true});}
 setEnabled(value){this.enabled=value;if(value)this.unlock();else this.stop();}
 update(players,local,playing,dt,blocked){this.local=local;if(this.playing!==playing){this.playing=playing;this.sync()}if(!this.ctx||!this.enabled||!playing||document.hidden)return;this.spatialClock-=dt;if(this.spatialClock>0)return;this.spatialClock=.075;const p=players[local];this.listenerX=p.x;this.listenerY=p.y;this.engine.setListener({position:this.position(p),forward:[0,0,-1],up:[0,1,0]});players.forEach((p,i)=>{this.emitters[i].setPerspective(i===local?'firstPerson':'world');this.emitters[i].setPosition(this.position(p));this.emitters[i].setOcclusion(i===local?0:blocked(players[local],p)?.35:0)});}
 position(p){return[(p.x-500)/32,1.6,(p.y-320)/32]}
 // Only use actions explicitly supported by the current profile. No generic gun cues.
 weaponAction(emitter,e,t){
  const actions=emitter.getCapabilities().actions,has=name=>actions.includes(name);
  const cue=(name,delay=0)=>{if(has(name))emitter.playAction(name,{seed:((e.seed??e.id??0)+Math.round(delay*1000))>>>0,when:t+delay,priority:2,actionOptions:{damping:1.4,resonance:.7}})};
  if(e.kind==='dryfire')cue('dryFire');
  else if(e.kind==='pickup'){if(has('magSeat'))cue('magSeat');else if(has('cylinderClose'))cue('cylinderClose');else if(has('pumpForward'))cue('pumpForward');else cue('boltForward');}
  else if(e.kind==='reload'){if(has('magOut')){cue('magRelease');cue('magOut',.07)}else if(has('cylinderOpen'))cue('cylinderOpen');else if(has('clip'))cue('clip');else cue('pumpBack');}
  else if(e.kind==='ready'){if(has('magIn')){cue('magIn');cue('magSeat',.08)}else if(has('cylinderClose'))cue('cylinderClose');else if(has('clip')){cue('clip');cue('boltForward',.08)}else cue('pumpForward');}
 }
 event(e){if(!this.ctx||!this.enabled||!this.playing||document.hidden||this.ctx.state!=='running')return;
  try{const t=this.ctx.currentTime+.008;if(e.kind==='shot'){
   if(!WeaponSystem.has(e.weapon)||!this.emitters[e.i])return;const emitter=this.emitters[e.i];emitter.setWeapon(e.weapon);emitter.setPerspective(e.i===this.local?'firstPerson':'world');emitter.setPosition(this.position(e));emitter.fire({seed:e.seed>>>0,when:t,priority:3,legacyTrigger:true});if(e.weapon==='mossberg590')emitter.mechanics({seed:(e.seed^0x9e3779b9)>>>0,when:t+.34,gain:.8});
   const g=this.musicBus.gain;g.cancelScheduledValues(t);g.setValueAtTime(this.music?.065:0,t);g.setTargetAtTime(this.music?.14:0,t+.055,.08);
  }else if(['reload','ready','pickup','dryfire'].includes(e.kind)){if(!WeaponSystem.has(e.weapon)||!this.emitters[e.i])return;const emitter=this.emitters[e.i];emitter.setWeapon(e.weapon);emitter.setPerspective(e.i===this.local?'firstPerson':'world');emitter.setPosition(this.position(e));this.weaponAction(emitter,e,t);}else if(this.buffers[e.kind]){const distance=e.kind==='heal'||e.kind==='spawn'?1:1/(1+Math.hypot(e.x-this.listenerX,e.y-this.listenerY)/350);this.sample(e.kind,t,(e.kind==='impact'?.24:.65)*(Number.isFinite(distance)?distance:1),this.fxBus,.96+((e.id||0)%7)*.013);}
  }catch(err){this.error='BLACKLINE: '+err.message;}
 }
}
