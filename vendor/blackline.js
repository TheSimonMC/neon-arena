/* BLACKLINE — Procedural Gun Audio Engine 0.3.0
 * Original code: MIT. No recordings, remote resources, telemetry or dependencies.
 * Catalog numbers are reference metadata, not a ballistics input. All DSP profiles
 * are authored approximations. This is neither a calibrated pressure simulator
 * nor a weapon construction/operation model. See README.md and SOURCES.md.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.Blackline=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const VERSION='0.3.0';
const catalogue=[{"id":"g17","name":"GLOCK 17 Gen5","shortName":"G17","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":202,"barrelMM":114,"shape":"glock","sources":[{"title":"GLOCK 17 Gen5 — Hersteller","url":"https://eu.glock.com/en/products/pistols/g17-gen5"}],"checked":"2026-10-23","heightMM":139,"widthMM":34,"massG":null,"massNote":"","capacity":17,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":139,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.","audio":{"family":"pistol9","frontMS":0.5,"edge":1.0,"body":1.0,"tail":1.0,"mechanism":"striker"}},{"id":"g19","name":"GLOCK 19 Gen5","shortName":"G19","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":185,"barrelMM":102,"shape":"glock","sources":[{"title":"GLOCK 19 Gen5 — Hersteller","url":"https://eu.glock.com/en/products/pistols/g19-gen5"}],"checked":"2026-10-23","heightMM":128,"widthMM":34,"massG":null,"massNote":"","capacity":15,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":128,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.","audio":{"family":"pistol9","frontMS":0.46,"edge":1.04,"body":0.95,"tail":0.97,"mechanism":"striker"}},{"id":"g26","name":"GLOCK 26 Gen5","shortName":"G26","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":163,"barrelMM":87,"shape":"glock","sources":[{"title":"GLOCK 26 Gen5 — Hersteller","url":"https://eu.glock.com/en/products/pistols/g26-gen5"}],"checked":"2026-10-23","heightMM":106,"widthMM":33,"massG":null,"massNote":"","capacity":10,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":106,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.","audio":{"family":"pistol9","frontMS":0.41,"edge":1.1,"body":0.91,"tail":0.92,"mechanism":"striker"}},{"id":"g34","name":"GLOCK 34 Gen5 MOS","shortName":"G34","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":222,"barrelMM":135,"shape":"glock","sources":[{"title":"GLOCK 34 Gen5 MOS — Hersteller","url":"https://eu.glock.com/en/products/pistols/g34-gen5-mos"}],"checked":"2026-10-23","heightMM":139,"widthMM":34,"massG":null,"massNote":"","capacity":17,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":139,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.","audio":{"family":"pistol9","frontMS":0.56,"edge":0.94,"body":1.04,"tail":1.05,"mechanism":"striker"}},{"id":"g43x","name":"GLOCK 43X MOS","shortName":"G43X","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":165,"barrelMM":87,"shape":"glock","sources":[{"title":"GLOCK 43X MOS — Hersteller","url":"https://eu.glock.com/en/products/pistols/g43x-mos"}],"checked":"2026-10-23","heightMM":128,"widthMM":28,"massG":null,"massNote":"","capacity":10,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":128,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.","audio":{"family":"pistol9","frontMS":0.42,"edge":1.07,"body":0.91,"tail":0.93,"mechanism":"striker"}},{"id":"beretta92","name":"Beretta 92FS","shortName":"92FS","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":217,"barrelMM":125,"shape":"beretta","sources":[{"title":"Beretta — 90 Series, technische Daten S. 19 (PDF-Seite 21)","url":"https://www.beretta.com/content/dam/beretta-usa/user-manuals/90_Series_Manual.pdf"}],"checked":"2026-10-23","heightMM":137,"widthMM":38,"massG":975,"massNote":"Unbeladen, ca.; laut 90-Series-Handbuch","capacity":15,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":137,"description":"Offene Schlittenkontur, außenliegender Hahn und getrennte Griffschalen. Klassische 92FS-Ausführung.","audio":{"family":"pistol9","frontMS":0.54,"edge":0.98,"body":1.03,"tail":1.02,"mechanism":"hammer"}},{"id":"p226","name":"SIG SAUER P226 MK25","shortName":"P226","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":196,"barrelMM":112,"shape":"sig","sources":[{"title":"SIG SAUER — P226 MK25","url":"https://www.sigsauer.com/p226-mk25-full-size.html"}],"checked":"2026-10-23","heightMM":140,"widthMM":38,"massG":964,"massNote":"Herstellerangabe: 34 oz / 964 g","capacity":15,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":140,"description":"MK25 ohne verlängerten Gewindelauf. Metallrahmen, außenliegender Hahn und Zubehörschiene.","audio":{"family":"pistol9","frontMS":0.52,"edge":1.01,"body":1.07,"tail":1.04,"mechanism":"hammer"}},{"id":"colt1911","name":"Colt 1911 Classic","shortName":"1911","category":"Pistolen","caliber":".45 ACP","action":"Halbautomatisch","lengthMM":216,"barrelMM":127,"shape":"colt","sources":[{"title":"Colt — 1911 Classic","url":"https://www.colt.com/detail-page/classic/"},{"title":"American Rifleman — eigener First Look / Maßangaben","url":"https://www.americanrifleman.org/content/video-first-look-colt-1911-classic-pistol/"}],"checked":"2026-10-23","heightMM":133.4,"widthMM":null,"massG":null,"massNote":"","capacity":7,"automatic":false,"rpm":null,"dimensionNote":"Länge aus 8,5 Zoll, Höhe aus 5,25 Zoll umgerechnet; Außenkontur illustrativ.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":133.4,"description":"Government-Format mit 5-Zoll-Lauf, schmalem Griff, außenliegendem Hahn und klassischem Schlitten.","audio":{"family":"pistol45","frontMS":0.78,"edge":0.85,"body":1.15,"tail":1.15,"mechanism":"hammer"}},{"id":"sw686","name":"S&W 686 Performance Center · 4″","shortName":"686 PC","category":"Revolver","caliber":".357 Magnum","action":"Revolver · SA/DA","lengthMM":241,"barrelMM":101.6,"shape":"revolver","sources":[{"title":"Smith & Wesson — SKU 11759, Herstellerdatenblatt","url":"https://assets.contentstack.io/v3/assets/bltb61dcb3c40854cd9/bltc15fcc08eebd6d78/64d533011519f03f1e46805e/11759_pc686_specsheet.pdf"}],"checked":"2026-10-23","heightMM":152.4,"widthMM":39.4,"massG":1075,"massNote":"Herstellerdatenblatt","capacity":6,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":152.4,"description":"Konkrete PC-Ausführung 11759 mit ungefluteter Trommel. Kein automatischer Hülsenauswurf beim Schuss.","audio":{"family":"magnum","frontMS":0.6,"edge":1.12,"body":1.08,"tail":1.08,"mechanism":"revolver"}},{"id":"luger","name":"Luger Pistole 08 · Museumsprofil","shortName":"P08","category":"Historisch","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":224,"barrelMM":null,"shape":"luger","sources":[{"title":"Imperial War Museums — Pistole 08, Objekt 30032386","url":"https://www.iwm.org.uk/collections/item/object/30032386"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":8,"automatic":false,"rpm":null,"dimensionNote":"224 mm: Länge des IWM-Objekts. Höhe und Laufmaß hier nicht als verifizierte Maße geführt.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":140,"description":"Kniegelenkverschluss und markant geneigter Griff. Länge des referenzierten Museumsobjekts; nicht auf alle P08-Varianten übertragbar.","audio":{"family":"pistol9","frontMS":0.53,"edge":0.98,"body":1.02,"tail":0.98,"mechanism":"toggle"}},{"id":"mp5","name":"Heckler & Koch MP5A3","shortName":"MP5A3","category":"Automatisch","caliber":"9 × 19 mm","action":"Halb- / vollautomatisch","lengthMM":680,"barrelMM":225,"shape":"mp5","sources":[{"title":"Small Arms Survey / Royal Armouries — MP5A3","url":"https://www.smallarmssurvey.org/sites/default/files/SAS-weapons-sub-machine-guns-Heckler-Koch-MP5.pdf"},{"title":"Heckler & Koch — MP5","url":"https://www.heckler-koch.com/en/Products/Military%20and%20Law%20Enforcement/Submachine%20guns/MP5"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":30,"automatic":true,"rpm":800,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":260,"description":"MP5A3 mit ausgezogener Schulterstütze. 680 mm laut referenziertem Datenblatt. Keine SD-Ausführung.","audio":{"family":"smg9","frontMS":0.64,"edge":0.92,"body":1.0,"tail":0.92,"mechanism":"roller"}},{"id":"m4a1","name":"FN M4A1 · 14,5″","shortName":"M4A1","category":"Automatisch","caliber":"5,56 × 45 mm","action":"Halb- / vollautomatisch","lengthMM":838.2,"barrelMM":368.3,"shape":"m4","sources":[{"title":"FN America — M4A1","url":"https://fnamerica.com/products/rifles/fn-m4a1/"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":30,"automatic":true,"rpm":825,"dimensionNote":"29,75–33 Zoll Gesamtlänge; Ansicht nutzt 33 Zoll. Weitere Konturdetails illustrativ.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","lengthMinMM":755.7,"rpmNote":"Profilwert 825; Herstellerbereich 700–950/min","visualHeight":265,"description":"M4A1, nicht das zivile FN-15-Modell. Ansicht mit ausgezogener Schulterstütze und kurzer Gewehrkontur.","audio":{"family":"rifle556","frontMS":0.48,"edge":1.25,"body":0.95,"tail":1.12,"mechanism":"rifle"}},{"id":"akm","name":"AKM · Festkolben","shortName":"AKM","category":"Automatisch","caliber":"7,62 × 39 mm","action":"Halb- / vollautomatisch","lengthMM":880,"barrelMM":415,"shape":"ak","sources":[{"title":"Imperial War Museums — AKM","url":"https://www.iwm.org.uk/collections/item/object/30029524"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":null,"automatic":true,"rpm":600,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","rpmNote":"600/min: gestalteter Wiedergabetakt, hier nicht messtechnisch bestätigt","visualHeight":275,"description":"Festkolben, langes Gasrohr und stark gekrümmte Magazinkontur. Außenlänge und Laufmaß des IWM-Referenzobjekts.","audio":{"family":"rifle762","frontMS":0.72,"edge":1.05,"body":1.12,"tail":1.2,"mechanism":"rifleHeavy"}},{"id":"g36","name":"Heckler & Koch G36","shortName":"G36","category":"Automatisch","caliber":"5,56 × 45 mm","action":"Halb- / vollautomatisch","lengthMM":null,"barrelMM":480,"shape":"g36","sources":[{"title":"Bundeswehr — G36, technische Daten","url":"https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/ausruestung-bewaffnung/gewehr-g36"},{"title":"Heckler & Koch — G36","url":"https://www.heckler-koch.com/en/Products/Military%20and%20Law%20Enforcement/Assault%20rifles/G36"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":30,"automatic":true,"rpm":750,"dimensionNote":"Gesamtlänge und Höhe nicht aus der verwendeten Primärquelle verifiziert. Zeichenlänge 1000 mm ist eine Annahme; keine bestätigte Maßansicht.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualLength":1000,"visualHeight":320,"description":"Lange G36-Konfiguration mit ausgeklappter Schulterstütze und charakteristischem Tragebügel.","audio":{"family":"rifle556","frontMS":0.59,"edge":1.12,"body":1.06,"tail":1.1,"mechanism":"rifle"}},{"id":"p90","name":"FN P90 Standard","shortName":"P90","category":"Automatisch","caliber":"5,7 × 28 mm","action":"Halb- / vollautomatisch","lengthMM":505,"barrelMM":264.15,"shape":"p90","sources":[{"title":"FN Herstal — P90, technisches Datenblatt","url":"https://fnherstal.com/app/uploads/technical-data-fn-p90_0.pdf"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":2800,"massNote":"Ca., mit leerem Magazin; Standard-Ausführung","capacity":50,"automatic":true,"rpm":950,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","rpmNote":"Profilwert 950; Herstellerbereich 850–1100/min","visualHeight":210,"description":"Kompakte Bullpup-Kontur mit horizontalem Magazin oberhalb des Gehäuses. Standard-Ausführung, nicht PS90.","audio":{"family":"pdw","frontMS":0.36,"edge":1.13,"body":0.78,"tail":0.83,"mechanism":"compact"}},{"id":"thompson","name":"Thompson M1A1","shortName":"M1A1","category":"Historisch","caliber":".45 ACP","action":"Halb- / vollautomatisch","lengthMM":810,"barrelMM":267,"shape":"thompson","sources":[{"title":"Royal Armouries — Thompson M1A1, Objekt 277959","url":"https://royalarmouries.org/collection/object/object-277959"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":null,"automatic":true,"rpm":700,"dimensionNote":"810 mm Gesamtlänge und 267 mm Lauf: referenziertes Royal-Armouries-Objekt. Andere Exemplare können abweichen; Kontur illustrativ.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","rpmNote":"Gestalteter Wiedergabetakt; kein verifizierter Messwert","visualLength":810,"visualHeight":265,"description":"Vereinfachte historische M1A1-Kontur mit Kastenmagazin und horizontalem Vorderschaft; keine 1928-Trommelvariante.","audio":{"family":"pistol45","frontMS":0.84,"edge":0.81,"body":1.15,"tail":1.06,"mechanism":"openBolt"}},{"id":"garand","name":"M1 Garand · Museumsprofil","shortName":"M1 GARAND","category":"Historisch","caliber":".30-06 Springfield","action":"Halbautomatisch","lengthMM":1110,"barrelMM":null,"shape":"garand","sources":[{"title":"Imperial War Museums — M1 Garand FIR 6319","url":"https://www.iwm.org.uk/collections/item/object/30036169"},{"title":"National Park Service — M1 Garand","url":"https://www.nps.gov/spar/learn/historyculture/u-s-m1-garand-rifle-production.htm"}],"checked":"2026-10-23","heightMM":190,"widthMM":60,"massG":null,"massNote":"","capacity":8,"automatic":false,"rpm":null,"dimensionNote":"1110 × 190 × 60 mm: gerundete IWM-Objektmaße. Kein maßhaltiges 3D-Modell.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":190,"description":"Historische Holzschaftkontur ohne herausragendes Kastenmagazin. Maße des referenzierten Museumsobjekts.","audio":{"family":"rifleFull","frontMS":0.88,"edge":1.12,"body":1.23,"tail":1.28,"mechanism":"rifleHeavy"}},{"id":"mossberg590","name":"Mossberg 590 · 9-Shot / 50693","shortName":"590","category":"Flinten","caliber":"12 Gauge","action":"Vorderschaftrepetierer","lengthMM":1041.4,"barrelMM":508,"shape":"shotgun","sources":[{"title":"Mossberg — 590 9-Shot, SKU 50693","url":"https://www.mossberg.com/590-9-shot-50693.html"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":"8 + 1","automatic":false,"rpm":null,"dimensionNote":"Gesamtlänge 41 Zoll; Lauf 20 Zoll. Höhe der Illustration angenähert.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":190,"description":"20-Zoll-Konfiguration mit Röhrenmagazin und Vorderschaft. Pumpgeräusch wird getrennt über „Mechanik“ ausgelöst, nicht automatisch nach jedem Schuss.","audio":{"family":"shotgun","frontMS":1.08,"edge":0.95,"body":1.35,"tail":1.45,"mechanism":"pump"}}];
const ENVIRONMENTS={
 field:{name:'Open field',subtitle:'Wiese · im Freien',rt:.17,wet:.07,early:.24,damping:.64,size:1,width:1,paths:[[.009,-.08,.21],[.031,.3,.04]],description:'Kurze Bodenreflexion; fast keine diffuse Hallfahne.'},
 forest:{name:'Waldlichtung',subtitle:'Unregelmäßige Reflexionen',rt:.75,wet:.19,early:.33,damping:.72,size:1,width:1,paths:[[.032,-.8,.14],[.064,.65,.11],[.103,-.4,.08],[.181,.9,.05]],description:'Verteilte Reflexionen und gedämpfte Höhen.'},
 range:{name:'Shooting range',subtitle:'Indoor · bedämpft',rt:.65,wet:.28,early:.48,damping:.49,size:1,width:.9,paths:[[.009,-.75,.3],[.016,.7,.26],[.026,-.4,.2],[.041,.5,.12]],description:'Dichte frühe Reflexionen mit kontrolliertem Ausklang.'},
 hall:{name:'Lagerhalle',subtitle:'Groß · hart',rt:2.7,wet:.36,early:.65,damping:.26,size:1,width:1,paths:[[.023,-.85,.26],[.046,.8,.24],[.072,-.5,.18],[.11,.7,.14]],description:'Weite frühe Echos und lange, helle Hallfahne.'},
 concrete:{name:'Betonraum',subtitle:'Klein · reflektierend',rt:1.45,wet:.34,early:.72,damping:.2,size:1,width:.88,paths:[[.005,-.75,.35],[.011,.8,.3],[.019,-.25,.23],[.029,.5,.18]],description:'Sehr frühe, harte Reflexionen; kompakter Raumcharakter.'},
 tunnel:{name:'Tunnel',subtitle:'Längsreflexionen',rt:3.4,wet:.33,early:.69,damping:.36,size:1,width:.72,paths:[[.022,-.2,.27],[.067,.2,.23],[.123,-.15,.2],[.209,.15,.14],[.334,-.1,.1]],description:'Zeitlich gestaffelte Echos entlang eines langen Raums.'},
 alley:{name:'Stadtgasse',subtitle:'Zwei Fassaden',rt:1.15,wet:.23,early:.6,damping:.31,size:1,width:1,paths:[[.014,-.9,.28],[.028,.9,.26],[.056,-.8,.15],[.088,.75,.12]],description:'Seitliche Rückwürfe, nach oben offene Geometrie.'},
 valley:{name:'Gebirgstal',subtitle:'Weite · diskrete Echos',rt:1.8,wet:.15,early:.68,damping:.55,size:1,width:1,paths:[[.24,-.75,.27],[.47,.8,.22],[.76,-.3,.15],[1.1,.5,.09]],description:'Späte einzelne Rückwürfe; keine vermessene Landschaft.'},
 dry:{name:'Anechoic',subtitle:'Nur die Quelle',rt:0,wet:0,early:0,damping:.5,size:1,width:1,paths:[],description:'Keine Reflexionen, kein Hall. Gut zum Vergleich der Quellen.'}
};
const DEFAULT_SYNTH={transient:1,texture:1,body:.55,gas:.75,mechanical:.55,casing:.28,brightness:.86,variation:.035,cycle:1,metalness:.28,trigger:1,bolt:1,spring:.35,return:1,surface:'concrete',solo:null,mute:[]};
const RANGES={transient:[0,1.5],texture:[0,1.5],body:[0,1.5],gas:[0,1.5],mechanical:[0,2],casing:[0,2],brightness:[0,1],variation:[0,.2],cycle:[.5,2],metalness:[0,1],trigger:[0,2],bolt:[0,2],spring:[0,2],return:[0,2]};
const LAYERS=['transient','texture','body','gas','mechanical','casing'];
const FAMILIES={
 pistol9:{gain:.87,crust:.0052,bark:.016,gas:.012,low:520},
 pistol45:{gain:.98,crust:.0063,bark:.019,gas:.014,low:440},
 magnum:{gain:1.06,crust:.0048,bark:.021,gas:.013,low:600},
 smg9:{gain:.85,crust:.0054,bark:.016,gas:.012,low:500},
 rifle556:{gain:1.02,crust:.0066,bark:.025,gas:.015,low:710},
 rifle762:{gain:1.11,crust:.0075,bark:.03,gas:.019,low:540},
 rifleFull:{gain:1.14,crust:.0082,bark:.036,gas:.023,low:430},
 pdw:{gain:.86,crust:.0045,bark:.017,gas:.012,low:660},
 shotgun:{gain:1.16,crust:.009,bark:.039,gas:.025,low:380}
};
const TAU=Math.PI*2,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function number(v,name){if(typeof v!=='number'||!Number.isFinite(v))throw new TypeError(name+' must be a finite number');return v;}
function vector(v,name='position'){if(!v||v.length!==3)throw new TypeError(name+' must be [x,y,z]');return Array.from(v,(x)=>clamp(number(x,name),-10000,10000));}
function clone(o){return JSON.parse(JSON.stringify(o));}
function deepFreeze(o){Object.freeze(o);for(const v of Object.values(o))if(v&&typeof v==='object'&&!Object.isFrozen(v))deepFreeze(v);return o;}
const WEAPONS=deepFreeze(Object.fromEntries(catalogue.map(x=>[x.id,x])));deepFreeze(ENVIRONMENTS);deepFreeze(DEFAULT_SYNTH);
function weapon(id){if(!Object.hasOwn(WEAPONS,id))throw new RangeError('Unknown weapon: '+id);return WEAPONS[id];}
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
function randomSeed(){if(typeof crypto!=='undefined'&&crypto.getRandomValues)return crypto.getRandomValues(new Uint32Array(1))[0]||1;return (Date.now()^Math.random()*0xffffffff)>>>0;}
function synthOptions(o={}){const r={...DEFAULT_SYNTH};for(const [k,range]of Object.entries(RANGES))if(o[k]!==undefined)r[k]=clamp(number(o[k],k),...range);if(o.surface!==undefined){if(!['grass','gravel','concrete','wood','metal'].includes(o.surface))throw new RangeError('Unknown surface');r.surface=o.surface;}if(o.solo!=null){if(!LAYERS.includes(o.solo))throw new RangeError('Unknown solo layer');r.solo=o.solo;}if(o.mute!==undefined){if(!Array.isArray(o.mute)||o.mute.some(x=>!LAYERS.includes(x)))throw new TypeError('mute must contain layer names');r.mute=[...o.mute];}return r;}
/** Synchronous, deterministic source synthesis. No Web Audio required. */
function synthesize(id='g17',options={},sampleRate=48000,seed=17017,kind='shot'){
 number(sampleRate,'sampleRate');if(sampleRate<16000||sampleRate>192000)throw new RangeError('sampleRate: 16000–192000 Hz');
 number(seed,'seed');if(!['shot','mechanics'].includes(kind))throw new RangeError('kind must be shot or mechanics');
 const w=weapon(id),p=synthOptions(options),a=w.audio,f=FAMILIES[a.family],sr=sampleRate;
 const length=Math.ceil(sr*.88),layers=Object.fromEntries(LAYERS.map(k=>[k,new Float32Array(length)]));
 const random=rng(seed),noise=()=>random()*2-1,vary=()=>1+noise()*p.variation;
 const gain=f.gain*vary(),front=a.frontMS*.001*vary(),edge=a.edge*vary(),tail=a.tail*vary();
 const coef=hz=>1-Math.exp(-TAU*Math.min(sr*.45,hz)/sr);
 const aLo=coef(f.low),aMid=coef(2700),aHi=coef(7000+10000*p.brightness),aMod=coef(360),aBody=coef(950),aSub=coef(90),aGas=coef(1700);
 let lo=0,mid=0,hi=0,mod=0,body=0,sub=0,gasLP=0;
 const start=Math.round(sr*.002),end=start+Math.ceil(sr*.28);
 // Non-periodic front breakup: short irregular pressure wavelets. These are
 // AUDIO shaping constants, never derived from real chamber or cartridge data.
 const breaks=[];let time=.00018;
 for(let j=0;j<15;j++){time+=(.00011+random()*.00065)*(j<5?1:1.6);breaks.push([time,(.035+random()*.12)*Math.exp(-time/.0045)*(random()<.22?-1:1),.00007+random()*.00019]);}
 const smears=[];for(let j=0;j<7;j++)smears.push([.0008+random()*.026, .0005+random()*.0017, .15+random()*.5]);
 for(let i=start;i<end;i++){
  const t=(i-start)/sr,n=noise(),n2=noise();
  lo+=aLo*(n-lo);mid+=aMid*(n-mid);hi+=aHi*(n-hi);mod+=aMod*(n2-mod);
  body+=aBody*(n2-body);sub+=aSub*(n2-sub);gasLP+=aGas*(n2-gasLP);
  const u=t/front,pressure=(1-u)*Math.exp(-1.55*u);
  let breakup=0;for(const b of breaks){const z=t-b[0];if(z>=0&&z<b[2]*9){const q=z/b[2];breakup+=b[1]*(1-q)*Math.exp(-q);}}
  // The direct front begins abruptly, not with the former soft exponential fade.
  layers.transient[i]=gain*(pressure*.91+breakup*1.5);
  const crust=(hi-mid)*Math.exp(-t/(f.crust*tail));
  let packet=0;for(const b of smears){const z=(t-b[0])/b[1];if(z>0&&z<8)packet+=b[2]*Math.exp(-z);}
  const disorder=clamp(1+mod*2.7,.28,1.9);
  const bark=((mid-lo)*1.12+(hi-mid)*.32)*Math.exp(-t/(f.bark*tail))*(.62+packet)*disorder;
  layers.texture[i]=gain*(crust*.95*edge+bark*.99);
  // A short, stochastic low-mid body; no oscillators, kick-drum sine or pitch sweep.
  layers.body[i]=gain*a.body*(body-sub)*1.6*Math.exp(-t/(.008*tail));
  layers.gas[i]=gain*(gasLP*.45+(hi-mid)*.08)*Math.exp(-t/(f.gas*tail))*disorder;
 }
 function contact(dest,at,amp,duration,metal=1){
  const begin=Math.round(at*sr),count=Math.min(length-begin,Math.ceil(duration*7*sr));if(count<=0)return;
  const freq=[1100,2863,5391].map(x=>x*(.82+p.metalness*.36)*vary()*metal);
  let l=0;const c=coef(3200),ph=freq.map(()=>random()*TAU);
  for(let j=0;j<count;j++){
   const t=j/sr,n=noise();l+=c*(n-l);
   let ring=0;for(let k=0;k<3;k++)ring+=Math.sin(TAU*freq[k]*t+ph[k])*Math.exp(-t/(duration*(1-k*.21)))/(k+1);
   dest[begin+j]+=amp*((n-l)*1.1*Math.exp(-t/.0007)+l*Math.exp(-t/.0022)+ring*(.07+.17*p.metalness));
  }
 }
 const m=a.mechanism,cy=p.cycle*vary(),mech=layers.mechanical;
 // Mechanical timing is illustrative. Revolvers have no slide/casing ejection;
 // a pump action is an explicit mechanics event, never an automatic slide cycle.
 contact(mech,.00025,.035*p.trigger,.0014,m==='revolver'?.8:1);
 if(m!=='revolver'&&m!=='pump'){
  const open=m==='openBolt',heavy=m==='rifleHeavy';
  contact(mech,(open?.006:.022)*cy,(heavy?.12:.08)*p.bolt,.0028,heavy?.68:1);
  contact(mech,.049*cy,.043*p.bolt,.0018,m==='toggle'?1.28:.95);
  contact(mech,(open?.076:.086)*cy,.095*p.return,.0029,heavy?.73:1.05);
  const from=Math.round(.03*cy*sr),to=Math.round(.075*cy*sr);let sl=0;
  for(let i=from;i<to&&i<length;i++){const t=(i-from)/sr;sl+=.24*(noise()-sl);mech[i]+=.011*p.spring*sl*Math.exp(-t/.018);}
 }
 if(m==='pump'&&kind==='mechanics'){
  contact(mech,.035,.17*p.bolt,.007,.62);contact(mech,.17,.2*p.return,.006,.72);
  let l=0;for(let i=Math.round(.04*sr);i<.17*sr;i++){l+=.14*(noise()-l);mech[i]+=.07*l*Math.sin(Math.PI*(i/sr-.04)/.13);}
 }
 if(m==='revolver'&&kind==='mechanics')contact(mech,.11,.08,.003,.8);
 const floors={grass:[.08,.001],gravel:[.28,.002],concrete:[.7,.0038],wood:[.4,.0025],metal:[.9,.009]};
 const floor=floors[p.surface];
 if(m!=='revolver'&&(m!=='pump'||kind==='mechanics')){
  let at=(m==='pump'?.29:.31)+random()*.07;
  for(let j=0;j<3;j++){contact(layers.casing,at,.04*floor[0]*Math.pow(.45,j),floor[1],1.8);at+=.12/(j+1)+random()*.02;}
 }
 const pcm=new Float32Array(length);
 for(const k of LAYERS){const on=(!p.mute.includes(k)&&(!p.solo||p.solo===k))&&(kind!=='mechanics'||k==='mechanical'||k==='casing');if(on){const arr=layers[k],g=p[k];for(let i=0;i<length;i++)pcm[i]+=arr[i]*g*.72;}}
 // Remove DC with a linear high-pass. No event normalisation, oscillator body,
 // preloaded buffers or hidden volume-dependent 'realism' processing.
 let prev=0,hp=0;const dc=Math.exp(-TAU*28/sr);let peak=0,energy=0;
 for(let i=0;i<length;i++){const x=pcm[i];hp=x-prev+dc*hp;prev=x;pcm[i]=hp;if(i>length-256)pcm[i]*=(length-i)/256;peak=Math.max(peak,Math.abs(pcm[i]));energy+=pcm[i]*pcm[i];}
 return{pcm,layers,sampleRate:sr,seed:seed>>>0,weapon:id,kind,peak,rms:Math.sqrt(energy/length),duration:length/sr,options:p};
}
function environment(id='field',overrides={}){
 if(!Object.hasOwn(ENVIRONMENTS,id))throw new RangeError('Unknown environment: '+id);
 const e={...clone(ENVIRONMENTS[id]),id};
 for(const [k,r]of Object.entries({rt:[0,5],wet:[0,1],early:[0,1],damping:[0,1],size:[.25,3],width:[0,1]}))if(overrides[k]!==undefined)e[k]=clamp(number(overrides[k],k),...r);
 if(id==='dry'){e.rt=0;e.wet=0;e.early=0;}return e;
}
/** Synthetic diffuse IR; geometrical early paths remain separate live nodes. */
function roomImpulse(e,sr){
 const n=Math.max(1,Math.ceil((e.rt*1.12+.08)*sr)),L=new Float32Array(n),R=new Float32Array(n);
 if(e.rt===0||e.wet===0)return{left:L,right:R};
 const rand=rng(209193+Object.keys(ENVIRONMENTS).indexOf(e.id)*199),onset=.018*e.size;
 let ll=0,rl=0,ls=0,rs=0,energy=0;const coef=1-Math.exp(-TAU*(2200+6500*(1-e.damping))/sr);
 for(let i=Math.floor(onset*sr);i<n;i++){
  const t=i/sr-onset,nl=rand()*2-1,nr=rand()*2-1;ll+=coef*(nl-ll);rl+=coef*(nr-rl);ls+=.035*(nl-ls);rs+=.035*(nr-rs);
  const density=1-Math.exp(-t/.014),d=Math.exp(-6.9078*t/Math.max(.02,e.rt));
  const hf=Math.exp(-6.9078*t/(Math.max(.02,e.rt)*(.25+.6*(1-e.damping))));
  const l=density*(ls*1.7*d+(ll-ls)*hf),r=density*(rs*1.7*d+(rl-rs)*hf),mid=(l+r)*.5,side=(l-r)*.5*e.width;
  L[i]=mid+side;R[i]=mid-side;energy+=L[i]*L[i]+R[i]*R[i];
 }
 const g=energy>0?.78/Math.sqrt(energy):0;for(let i=0;i<n;i++){L[i]*=g;R[i]*=g;}return{left:L,right:R};
}
function ramp(param,v,ctx,t=.015){param.setTargetAtTime(v,ctx.currentTime,t);}
function dis(node){try{node.disconnect();}catch(_){}}
let ceilingCurve=null;
function ceiling(ctx){const node=ctx.createWaveShaper();if(!ceilingCurve){ceilingCurve=new Float32Array(32769);for(let i=0;i<ceilingCurve.length;i++){const x=2*i/(ceilingCurve.length-1)-1;ceilingCurve[i]=clamp(x,-.97,.97);}}node.curve=ceilingCurve;node.oversample='none';return node;}
class Events{
 constructor(){this._events=new Map();}
 on(name,fn){if(typeof fn!=='function')throw new TypeError('Listener must be a function');if(!this._events.has(name))this._events.set(name,new Set());this._events.get(name).add(fn);return()=>this.off(name,fn);}
 off(name,fn){this._events.get(name)?.delete(fn);return this;}
 _emit(name,value){for(const fn of this._events.get(name)||[])try{fn(value);}catch(err){console.error('BLACKLINE event listener',err);}}
}
/** One independently positionable procedural emitter. */
class Emitter extends Events{
 constructor(engine,options={}){
  super();this.engine=engine;this.context=engine.context;this.id=options.id||'source-'+(++engine._serial);this._destroyed=false;
  this.weapon=weapon(options.weapon||'g17').id;this.position=vector(options.position||[0,1.6,-1]);this.synth=synthOptions(options.synth);
  this.gain=clamp(number(options.gain??1,'gain'),0,2);this.occlusion=clamp(number(options.occlusion??0,'occlusion'),0,1);
  this.distanceModel=options.distanceModel||'inverse';if(!['inverse','game','none'].includes(this.distanceModel))throw new RangeError('Unknown distanceModel');
  this.rolloff=clamp(number(options.rolloff??1,'rolloff'),0,4);this.propagation=options.propagation!==false;this.panningModel=options.panningModel||'HRTF';
  if(!['HRTF','equalpower'].includes(this.panningModel))throw new RangeError('panningModel must be HRTF or equalpower');
  this.voices=new Map();this._voiceSerial=0;this._sequence=null;this._oldRooms=new Set();
  this.environment=environment(options.environment||'field',options.room||{});
  const c=this.context;this.input=c.createGain();this.input.gain.value=this.gain;this.air=c.createBiquadFilter();this.air.type='lowpass';this.air.Q.value=.5;
  this.delay=c.createDelay(30);this.distanceGain=c.createGain();this.panner=c.createPanner();this.panner.panningModel=this.panningModel;this.panner.distanceModel='inverse';this.panner.refDistance=1;this.panner.rolloffFactor=0;
  this.spatialOut=c.createGain();this.input.connect(this.air);this.air.connect(this.delay);this.delay.connect(this.distanceGain);this.distanceGain.connect(this.panner);this.panner.connect(this.spatialOut);this.spatialOut.connect(engine.input);
  this.roomFeed=c.createGain();this.delay.connect(this.roomFeed);this._room=this._buildRoom(this.environment);this._spatial(true);
 }
 _assert(){if(this._destroyed||this.engine._destroyed)throw new Error('Emitter disposed');}
 _buildRoom(e){
  const c=this.context,root=c.createGain(),out=c.createGain(),nodes=[root,out];out.gain.value=1;this.roomFeed.connect(root);out.connect(this.engine.input);
  if(e.rt>0&&e.wet>0){const ir=roomImpulse(e,c.sampleRate),con=c.createConvolver(),gain=c.createGain();const b=c.createBuffer(2,ir.left.length,c.sampleRate);b.copyToChannel(ir.left,0);b.copyToChannel(ir.right,1);con.normalize=false;con.buffer=b;gain.gain.value=e.wet;root.connect(con);con.connect(gain);gain.connect(out);nodes.push(con,gain);}
  const early=[];
  for(const [time,pan,amp]of e.paths){const d=c.createDelay(8),g=c.createGain(),p=c.createStereoPanner(),lp=c.createBiquadFilter();d.delayTime.value=time*e.size;g.gain.value=amp*e.early;lp.type='lowpass';lp.frequency.value=1800+12000*(1-e.damping);lp.Q.value=.5;p.pan.value=pan*e.width;root.connect(d);d.connect(lp);lp.connect(g);g.connect(p);p.connect(out);nodes.push(d,g,p,lp);early.push({pan:p,base:pan});}
  return{root,out,nodes,early,e,timer:null,dispose:()=>{try{this.roomFeed.disconnect(root);}catch(_){}for(const n of nodes)dis(n);}};
 }
 _spatial(immediate=false){
  if(this._destroyed)return;const c=this.context,p=this.position,l=this.engine.listener.position,d=Math.hypot(p[0]-l[0],p[1]-l[1],p[2]-l[2]);
  this.distance=d;const r=this.rolloff*(this.distanceModel==='game'?.3:1),atten=this.distanceModel==='none'?1:1/(1+r*(Math.max(1,d)-1));
  const occ=Math.pow(10,-18*this.occlusion/20),cutoff=clamp(19500*Math.exp(-.008*d)*(1-.94*this.occlusion),300,c.sampleRate*.45);
  const set=(param,v)=>immediate?param.value=v:ramp(param,v,c);
  set(this.distanceGain.gain,atten*occ);set(this.roomFeed.gain,Math.sqrt(atten)*Math.pow(10,-7*this.occlusion/20));set(this.air.frequency,cutoff);
  set(this.delay.delayTime,this.propagation?Math.min(29,d/this.engine.speedOfSound):0);
  if(this.panner.positionX){['X','Y','Z'].forEach((axis,i)=>set(this.panner['position'+axis],p[i]));}else this.panner.setPosition(...p);
  const f=this.engine.listener.forward,right=[-f[2],0,f[0]],dx=p[0]-l[0],dz=p[2]-l[2],side=clamp((dx*right[0]+dz*right[2])/Math.max(1e-6,Math.hypot(dx,dz)),-1,1);
  this.azimuth=Math.atan2(side,(dx*f[0]+dz*f[2])/Math.max(1e-6,Math.hypot(dx,dz)));
  for(const tap of this._room?.early||[])set(tap.pan.pan,clamp(tap.base*this.environment.width+side*.25,-1,1));
 }
 setPosition(x,y,z){this._assert();this.position=vector(Array.isArray(x)||ArrayBuffer.isView(x)?x:[x,y,z]);this._spatial();return this;}
 setDistance(distance,azimuth=0,elevation=0){this._assert();number(distance,'distance');number(azimuth,'azimuth');number(elevation,'elevation');const l=this.engine.listener.position,d=clamp(distance,0,10000),ce=Math.cos(elevation);return this.setPosition(l[0]+Math.sin(azimuth)*d*ce,l[1]+Math.sin(elevation)*d,l[2]-Math.cos(azimuth)*d*ce);}
 setGain(v){this._assert();this.gain=clamp(number(v,'gain'),0,2);ramp(this.input.gain,this.gain,this.context);return this;}
 setOcclusion(v){this._assert();this.occlusion=clamp(number(v,'occlusion'),0,1);this._spatial();return this;}
 setDistanceModel(model,rolloff=this.rolloff){this._assert();if(!['inverse','game','none'].includes(model))throw new RangeError('Unknown distance model');this.distanceModel=model;this.rolloff=clamp(number(rolloff,'rolloff'),0,4);this._spatial();return this;}
 setPanningModel(model){this._assert();if(!['HRTF','equalpower'].includes(model))throw new RangeError('Unknown panning model');this.panningModel=model;this.panner.panningModel=model;return this;}
 setSynth(patch){this._assert();this.synth=synthOptions({...this.synth,...patch});return this;}
 setWeapon(id){this._assert();weapon(id);this.stopAutomatic();this.weapon=id;return this;}
 setEnvironment(id,overrides={}){
  this._assert();const next=environment(id,overrides),old=this._room;this.environment=next;this._room=this._buildRoom(next);this._spatial();
  if(old){const t=this.context.currentTime;this._room.out.gain.setValueAtTime(0,t);this._room.out.gain.linearRampToValueAtTime(1,t+.08);old.out.gain.cancelScheduledValues(t);old.out.gain.setValueAtTime(old.out.gain.value,t);old.out.gain.linearRampToValueAtTime(0,t+.08);this._oldRooms.add(old);old.timer=setTimeout(()=>{old.dispose();this._oldRooms.delete(old);},160);}
  return this;
 }
 update(patch={}){this._assert();if(patch.weapon!==undefined)this.setWeapon(patch.weapon);if(patch.position)this.setPosition(patch.position);if(patch.gain!==undefined)this.setGain(patch.gain);if(patch.occlusion!==undefined)this.setOcclusion(patch.occlusion);if(patch.synth)this.setSynth(patch.synth);if(patch.environment||patch.room)this.setEnvironment(patch.environment||this.environment.id,patch.room||this.environment);if(patch.distanceModel||patch.rolloff!==undefined)this.setDistanceModel(patch.distanceModel||this.distanceModel,patch.rolloff??this.rolloff);if(patch.panningModel)this.setPanningModel(patch.panningModel);if(patch.propagation!==undefined){this.propagation=!!patch.propagation;this._spatial();}return this;}
 fire(options={}){
  this._assert();if(this.context.state!=='running'&&!this.engine._offline)throw new Error('Audio is not running. Call await engine.resume() inside a user gesture.');
  const now=this.context.currentTime;let when=Math.max(now,number(options.when??now+.006,'when'));
  if(when-now>30)throw new RangeError('Schedule at most 30 seconds ahead');
  const seed=options.seed===undefined?randomSeed():number(options.seed,'seed');const begin=typeof performance!=='undefined'?performance.now():Date.now();
  const data=synthesize(this.weapon,{...this.synth,...options.synth},this.context.sampleRate,seed,options.kind||'shot');
  const elapsed=(typeof performance!=='undefined'?performance.now():Date.now())-begin,c=this.context;
  if(options.when===undefined)when=Math.max(when,c.currentTime+.003);
  while(this.engine.activeVoices>=this.engine.maxVoices)this.engine._stealVoice();
  const b=c.createBuffer(1,data.pcm.length,c.sampleRate);b.copyToChannel(data.pcm,0);const source=c.createBufferSource(),g=c.createGain();source.buffer=b;g.gain.value=clamp(number(options.gain??1,'event gain'),0,2);source.connect(g);g.connect(this.input);
  const id=this.id+':'+(++this._voiceSerial),handle={id,when,seed:data.seed,duration:data.duration,weapon:this.weapon,source,gainNode:g,data,synthMS:elapsed,stopped:false,stop:()=>{if(handle.stopped)return;handle.stopped=true;try{source.stop();}catch(_){}dis(source);dis(g);this.voices.delete(id);this.engine._voices.delete(id);}};
  this.voices.set(id,handle);this.engine._voices.set(id,handle);source.onended=()=>{dis(source);dis(g);this.voices.delete(id);this.engine._voices.delete(id);handle.stopped=true;};source.start(when);
  this.engine._stats.shots++;this.engine._stats.lastSynthMS=elapsed;this.engine._stats.maxSynthMS=Math.max(this.engine._stats.maxSynthMS,elapsed);
  this._emit('shot',handle);this.engine._emit('shot',{emitter:this,handle});return handle;
 }
 mechanics(options={}){return this.fire({...options,kind:'mechanics'});}
 startAutomatic(options={}){this._assert();if(!weapon(this.weapon).automatic)throw new Error('This profile is not full-auto. Use fire() or startSequence() for a test sequence.');return this._startSequence({...options,rpm:options.rpm??weapon(this.weapon).rpm,count:options.count??Infinity});}
 startSequence(options={}){this._assert();return this._startSequence({...options,rpm:60000/(options.intervalMS??500),count:options.count??5});}
 _startSequence(options){
  if(this.context.state!=='running')throw new Error('Resume the audio context first');this.stopAutomatic();
  const rpm=clamp(number(options.rpm,'rpm'),30,1500),count=options.count??Infinity;if(count!==Infinity&&(!Number.isInteger(count)||count<1||count>10000))throw new RangeError('count: 1–10000');
  const session={rpm,count,sent:0,next:this.context.currentTime+.012,handles:new Set(),timer:null,active:true};this._sequence=session;
  const pump=()=>{if(this._destroyed||!session.active||this.context.state!=='running'){this.stopAutomatic();return;}
   const now=this.context.currentTime;if(session.next<now-.03)session.next=now+.006;
   let n=0;while(session.next<now+.06&&session.sent<session.count&&n++<4){const seed=options.seed===undefined?undefined:((options.seed>>>0)+session.sent)>>>0;const h=this.fire({when:session.next,seed});session.handles.add(h);h.source.addEventListener('ended',()=>session.handles.delete(h),{once:true});session.sent++;session.next+=60/session.rpm;}
   for(const h of session.handles)if(h.stopped)session.handles.delete(h);
   if(session.sent>=session.count){clearInterval(session.timer);session.timer=null;session.active=false;this._emit('sequenceend',{count:session.sent});}
  };
  session.timer=setInterval(pump,20);pump();return{stop:()=>this.stopAutomatic(),setRate:(rpm)=>{session.rpm=clamp(number(rpm,'rpm'),30,1500);},get active(){return session.active;}};
 }
 stopAutomatic(){const s=this._sequence;if(s){s.active=false;clearInterval(s.timer);for(const h of s.handles)if(h.when>this.context.currentTime+.001)h.stop();this._sequence=null;}return this;}
 stop(){this.stopAutomatic();for(const v of [...this.voices.values()])v.stop();return this;}
 silence(){this.stop();this._room.dispose();for(const old of this._oldRooms){clearTimeout(old.timer);old.dispose();}this._oldRooms.clear();dis(this.delay);this.air.disconnect();this.delay=this.context.createDelay(30);this.air.connect(this.delay);this.delay.connect(this.distanceGain);this.delay.connect(this.roomFeed);this._room=this._buildRoom(this.environment);this._spatial(true);return this;}
 snapshot(){return{weapon:this.weapon,position:[...this.position],gain:this.gain,occlusion:this.occlusion,distanceModel:this.distanceModel,rolloff:this.rolloff,propagation:this.propagation,panningModel:this.panningModel,synth:clone(this.synth),environment:this.environment.id,room:clone(this.environment)};}
 dispose(){if(this._destroyed)return;this.stop();this._destroyed=true;this._room.dispose();for(const old of this._oldRooms){clearTimeout(old.timer);old.dispose();}this._oldRooms.clear();for(const n of [this.input,this.air,this.delay,this.distanceGain,this.panner,this.spatialOut,this.roomFeed])dis(n);this.engine.emitters.delete(this.id);this._events.clear();}
}
class Engine extends Events{
 constructor(options={}){
  super();const AC=typeof globalThis!=='undefined'&&(globalThis.AudioContext||globalThis.webkitAudioContext);if(!options.context&&!AC)throw new Error('Web Audio API unavailable');
  this.context=options.context||new AC({latencyHint:'interactive'});this._ownsContext=!options.context;this._offline=typeof this.context.startRendering==='function';this._destroyed=false;
  this.maxVoices=clamp(Math.floor(number(options.maxVoices??64,'maxVoices')),1,256);this.speedOfSound=clamp(number(options.speedOfSound??343,'speedOfSound'),300,380);
  this._serial=0;this.emitters=new Map();this._voices=new Map();this._stats={shots:0,lastSynthMS:0,maxSynthMS:0};
  this.listener={position:[0,1.6,0],forward:[0,0,-1],up:[0,1,0]};
  const c=this.context;this.input=c.createGain();this.hp=c.createBiquadFilter();this.hp.type='highpass';this.hp.frequency.value=22;this.hp.Q.value=.5;
  this.limiter=ceiling(c);this.master=c.createGain();this.master.gain.value=clamp(number(options.masterGain??.28,'masterGain'),0,1);this.analyser=c.createAnalyser();this.analyser.fftSize=2048;this.analyser.smoothingTimeConstant=.7;this.output=c.createGain();
  this.input.connect(this.hp);this.hp.connect(this.limiter);this.limiter.connect(this.master);this.master.connect(this.analyser);this.analyser.connect(this.output);
  if(options.destination!==null)this.output.connect(options.destination||c.destination);this.setListener(this.listener);
 }
 get activeVoices(){return this._voices.size;}
 get currentTime(){return this.context.currentTime;}
 get stats(){return{...this._stats,voices:this.activeVoices,emitters:this.emitters.size,sampleRate:this.context.sampleRate,state:this.context.state};}
 _assert(){if(this._destroyed)throw new Error('Engine disposed');}
 _stealVoice(){const v=this._voices.values().next().value;if(v)v.stop();}
 async resume(){this._assert();if(this._offline)return this;if(this.context.state!=='running')await this.context.resume();return this;}
 async suspend(){this.stopAll();if(!this._offline)await this.context.suspend();return this;}
 createEmitter(options={}){this._assert();if(options.id&&this.emitters.has(options.id))throw new Error('Emitter ID already exists');const e=new Emitter(this,options);this.emitters.set(e.id,e);return e;}
 setListener(patch={}){
  this._assert();const next=clone(this.listener);for(const k of ['position','forward','up'])if(patch[k])next[k]=vector(patch[k],k);
  for(const k of ['forward','up']){const a=next[k],d=Math.hypot(...a);if(d<1e-6)throw new RangeError(k+' cannot be zero');next[k]=a.map(v=>v/d);}
  const f=next.forward,u=next.up;if(Math.abs(f[0]*u[0]+f[1]*u[1]+f[2]*u[2])>.999)throw new RangeError('forward and up cannot be parallel');this.listener=next;
  const l=this.context.listener,c=this.context;
  for(const [prefix,key]of [['position','position'],['forward','forward'],['up','up']])for(let i=0;i<3;i++){const param=l[prefix+'XYZ'[i]];if(param)ramp(param,this.listener[key][i],c,.01);}
  if(!l.positionX){l.setPosition(...this.listener.position);l.setOrientation(...this.listener.forward,...this.listener.up);}
  for(const e of this.emitters.values())e._spatial();return this;
 }
 setMasterGain(v){this._assert();ramp(this.master.gain,clamp(number(v,'masterGain'),0,1),this.context);return this;}
 stopAll({tails=true}={}){for(const e of this.emitters.values())tails?e.silence():e.stop();return this;}
 snapshot(){return{schema:'blackline.scene.v1',version:VERSION,listener:clone(this.listener),masterGain:this.master.gain.value,emitters:[...this.emitters.values()].map(e=>({id:e.id,...e.snapshot()}))};}
 async dispose(){if(this._destroyed)return;for(const e of [...this.emitters.values()])e.dispose();this._destroyed=true;for(const n of [this.input,this.hp,this.limiter,this.master,this.analyser,this.output])dis(n);this._events.clear();if(this._ownsContext&&this.context.state!=='closed')await this.context.close();}
}
/** Offline stereo render using the same source DSP and spatial graph. */
async function renderShot(options={}){
 const sr=options.sampleRate??48000,id=options.weapon||'g17';weapon(id);number(sr,'sampleRate');if(sr<16000||sr>96000)throw new RangeError('Offline sampleRate: 16000–96000');
 const OC=globalThis.OfflineAudioContext||globalThis.webkitOfflineAudioContext;if(!OC)throw new Error('OfflineAudioContext unavailable');
 const env=environment(options.environment||'field',options.room||{}),position=vector(options.position||[0,1.6,-1]),listener=options.listener||{position:[0,1.6,0]};
 const distance=Math.hypot(...position.map((v,i)=>v-(listener.position||[0,1.6,0])[i]));
 const duration=.95+(options.propagation===false?0:distance/343)+Math.max(env.rt*1.15,...env.paths.map(x=>x[0]*env.size),0)+.2;if(duration>30)throw new RangeError('Offline render exceeds 30 seconds; reduce distance or reverb.');
 const context=new OC(2,Math.ceil(duration*sr),sr),engine=new Engine({context,masterGain:options.masterGain??.28});engine.setListener(listener);
 const e=engine.createEmitter({...options,weapon:id,environment:env.id,room:env,position});e._spatial(true);
 const h=e.fire({when:.06,seed:options.seed??17017,kind:options.kind||'shot'});
 const buffer=await context.startRendering();await engine.dispose();return{buffer,event:h.data};
}
function encodeWAV(buffer){
 if(!buffer||typeof buffer.getChannelData!=='function')throw new TypeError('AudioBuffer required');
 const channels=buffer.numberOfChannels,n=buffer.length,bytes=n*channels*2,a=new ArrayBuffer(44+bytes),v=new DataView(a);const str=(p,s)=>{for(let i=0;i<s.length;i++)v.setUint8(p+i,s.charCodeAt(i));};
 str(0,'RIFF');v.setUint32(4,36+bytes,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,channels,true);v.setUint32(24,buffer.sampleRate,true);v.setUint32(28,buffer.sampleRate*channels*2,true);v.setUint16(32,channels*2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,bytes,true);
 const arrays=Array.from({length:channels},(_,i)=>buffer.getChannelData(i));let offset=44;for(let i=0;i<n;i++)for(let j=0;j<channels;j++){const x=clamp(arrays[j][i],-1,1);v.setInt16(offset,Math.round(x*(x<0?32768:32767)),true);offset+=2;}return a;
}
return Object.freeze({VERSION,Engine,Emitter,WEAPONS,ENVIRONMENTS,DEFAULT_SYNTH,LAYERS,synthesize,renderShot,encodeWAV,randomSeed});
});
