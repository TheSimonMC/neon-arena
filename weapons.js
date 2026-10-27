/* Arcade balance is deliberately independent of BLACKLINE's audio profiles. */
'use strict';
const WeaponSystem=(()=>{
 const overrides={barrett82:{damage:80,interval:1.05,reloadTime:3.1,spread:.006},sw686:{damage:52,interval:.49},colt1911:{damage:34,interval:.31},garand:{damage:48,interval:.36},mossberg590:{damage:11,interval:.9,pellets:8,spread:.16},mp5:{damage:12,interval:.09},m4a1:{damage:16,interval:.09},akm:{damage:22,interval:.13},g36:{damage:17,interval:.1},p90:{damage:10,interval:.075},thompson:{damage:20,interval:.12}};
 const catalog=Object.fromEntries(Object.entries(Blackline.WEAPONS).map(([id,w])=>[id,Object.freeze({id,name:w.name,label:w.shortName||w.name,capacity:({akm:30,thompson:30,mossberg590:8})[id]||Number(w.capacity)||17,reloadTime:id==='mossberg590'?3.4:id==='sw686'?2.6:w.automatic?2.2:1.6,damage:25,interval:.25,pellets:1,spread:.012,speed:700,...(w.automatic?{damage:16,interval:.1}:{}),...overrides[id]})]));
 const ids=Object.keys(catalog),has=id=>Object.prototype.hasOwnProperty.call(catalog,id);
 function bag(random=Math.random){const remaining=[];return()=>{if(!remaining.length){remaining.push(...ids);for(let i=remaining.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[remaining[i],remaining[j]]=[remaining[j],remaining[i]]}}return remaining.pop()}}
 return Object.freeze({catalog,ids,has,bag,defaultId:has('g17')?'g17':ids[0],signature:Blackline.VERSION+':'+ids.join(',')});
})();
