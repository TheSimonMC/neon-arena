/* BLACKLINE 0.4.0 | MIT | Procedural game audio. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Blackline=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const VERSION = '0.4.0';
const catalogue = [{"id":"g17","name":"GLOCK 17 Gen5","shortName":"G17","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":202,"barrelMM":114,"shape":"glock","sources":[{"title":"GLOCK 17 Gen5 — Hersteller","url":"https://eu.glock.com/en/products/pistols/g17-gen5"}],"checked":"2026-10-23","heightMM":139,"widthMM":34,"massG":null,"massNote":"","capacity":17,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":139,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen."},{"id":"g19","name":"GLOCK 19 Gen5","shortName":"G19","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":185,"barrelMM":102,"shape":"glock","sources":[{"title":"GLOCK 19 Gen5 — Hersteller","url":"https://eu.glock.com/en/products/pistols/g19-gen5"}],"checked":"2026-10-23","heightMM":128,"widthMM":34,"massG":null,"massNote":"","capacity":15,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":128,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen."},{"id":"g26","name":"GLOCK 26 Gen5","shortName":"G26","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":163,"barrelMM":87,"shape":"glock","sources":[{"title":"GLOCK 26 Gen5 — Hersteller","url":"https://eu.glock.com/en/products/pistols/g26-gen5"}],"checked":"2026-10-23","heightMM":106,"widthMM":33,"massG":null,"massNote":"","capacity":10,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":106,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen."},{"id":"g34","name":"GLOCK 34 Gen5 MOS","shortName":"G34","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":222,"barrelMM":135,"shape":"glock","sources":[{"title":"GLOCK 34 Gen5 MOS — Hersteller","url":"https://eu.glock.com/en/products/pistols/g34-gen5-mos"}],"checked":"2026-10-23","heightMM":139,"widthMM":34,"massG":null,"massNote":"","capacity":17,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":139,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen."},{"id":"g43x","name":"GLOCK 43X MOS","shortName":"G43X","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":165,"barrelMM":87,"shape":"glock","sources":[{"title":"GLOCK 43X MOS — Hersteller","url":"https://eu.glock.com/en/products/pistols/g43x-mos"}],"checked":"2026-10-23","heightMM":128,"widthMM":28,"massG":null,"massNote":"","capacity":10,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":128,"description":"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen."},{"id":"beretta92","name":"Beretta 92FS","shortName":"92FS","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":217,"barrelMM":125,"shape":"beretta","sources":[{"title":"Beretta — 90 Series, technische Daten S. 19 (PDF-Seite 21)","url":"https://www.beretta.com/content/dam/beretta-usa/user-manuals/90_Series_Manual.pdf"}],"checked":"2026-10-23","heightMM":137,"widthMM":38,"massG":975,"massNote":"Unbeladen, ca.; laut 90-Series-Handbuch","capacity":15,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":137,"description":"Offene Schlittenkontur, außenliegender Hahn und getrennte Griffschalen. Klassische 92FS-Ausführung."},{"id":"p226","name":"SIG SAUER P226 MK25","shortName":"P226","category":"Pistolen","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":196,"barrelMM":112,"shape":"sig","sources":[{"title":"SIG SAUER — P226 MK25","url":"https://www.sigsauer.com/p226-mk25-full-size.html"}],"checked":"2026-10-23","heightMM":140,"widthMM":38,"massG":964,"massNote":"Herstellerangabe: 34 oz / 964 g","capacity":15,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":140,"description":"MK25 ohne verlängerten Gewindelauf. Metallrahmen, außenliegender Hahn und Zubehörschiene."},{"id":"colt1911","name":"Colt 1911 Classic","shortName":"1911","category":"Pistolen","caliber":".45 ACP","action":"Halbautomatisch","lengthMM":216,"barrelMM":127,"shape":"colt","sources":[{"title":"Colt — 1911 Classic","url":"https://www.colt.com/detail-page/classic/"},{"title":"American Rifleman — eigener First Look / Maßangaben","url":"https://www.americanrifleman.org/content/video-first-look-colt-1911-classic-pistol/"}],"checked":"2026-10-23","heightMM":133.4,"widthMM":null,"massG":null,"massNote":"","capacity":7,"automatic":false,"rpm":null,"dimensionNote":"Länge aus 8,5 Zoll, Höhe aus 5,25 Zoll umgerechnet; Außenkontur illustrativ.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":133.4,"description":"Government-Format mit 5-Zoll-Lauf, schmalem Griff, außenliegendem Hahn und klassischem Schlitten."},{"id":"sw686","name":"S&W 686 Performance Center · 4″","shortName":"686 PC","category":"Revolver","caliber":".357 Magnum","action":"Revolver · SA/DA","lengthMM":241,"barrelMM":101.6,"shape":"revolver","sources":[{"title":"Smith & Wesson — SKU 11759, Herstellerdatenblatt","url":"https://assets.contentstack.io/v3/assets/bltb61dcb3c40854cd9/bltc15fcc08eebd6d78/64d533011519f03f1e46805e/11759_pc686_specsheet.pdf"}],"checked":"2026-10-23","heightMM":152.4,"widthMM":39.4,"massG":1075,"massNote":"Herstellerdatenblatt","capacity":6,"automatic":false,"rpm":null,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":152.4,"description":"Konkrete PC-Ausführung 11759 mit ungefluteter Trommel. Kein automatischer Hülsenauswurf beim Schuss."},{"id":"luger","name":"Luger Pistole 08 · Museumsprofil","shortName":"P08","category":"Historisch","caliber":"9 × 19 mm","action":"Halbautomatisch","lengthMM":224,"barrelMM":null,"shape":"luger","sources":[{"title":"Imperial War Museums — Pistole 08, Objekt 30032386","url":"https://www.iwm.org.uk/collections/item/object/30032386"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":8,"automatic":false,"rpm":null,"dimensionNote":"224 mm: Länge des IWM-Objekts. Höhe und Laufmaß hier nicht als verifizierte Maße geführt.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":140,"description":"Kniegelenkverschluss und markant geneigter Griff. Länge des referenzierten Museumsobjekts; nicht auf alle P08-Varianten übertragbar."},{"id":"mp5","name":"Heckler & Koch MP5A3","shortName":"MP5A3","category":"Automatisch","caliber":"9 × 19 mm","action":"Halb- / vollautomatisch","lengthMM":680,"barrelMM":225,"shape":"mp5","sources":[{"title":"Small Arms Survey / Royal Armouries — MP5A3","url":"https://www.smallarmssurvey.org/sites/default/files/SAS-weapons-sub-machine-guns-Heckler-Koch-MP5.pdf"},{"title":"Heckler & Koch — MP5","url":"https://www.heckler-koch.com/en/Products/Military%20and%20Law%20Enforcement/Submachine%20guns/MP5"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":30,"automatic":true,"rpm":800,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":260,"description":"MP5A3 mit ausgezogener Schulterstütze. 680 mm laut referenziertem Datenblatt. Keine SD-Ausführung."},{"id":"m4a1","name":"FN M4A1 · 14,5″","shortName":"M4A1","category":"Automatisch","caliber":"5,56 × 45 mm","action":"Halb- / vollautomatisch","lengthMM":838.2,"barrelMM":368.3,"shape":"m4","sources":[{"title":"FN America — M4A1","url":"https://fnamerica.com/products/rifles/fn-m4a1/"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":30,"automatic":true,"rpm":825,"dimensionNote":"29,75–33 Zoll Gesamtlänge; Ansicht nutzt 33 Zoll. Weitere Konturdetails illustrativ.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","lengthMinMM":755.7,"rpmNote":"Profilwert 825; Herstellerbereich 700–950/min","visualHeight":265,"description":"M4A1, nicht das zivile FN-15-Modell. Ansicht mit ausgezogener Schulterstütze und kurzer Gewehrkontur."},{"id":"akm","name":"AKM · Festkolben","shortName":"AKM","category":"Automatisch","caliber":"7,62 × 39 mm","action":"Halb- / vollautomatisch","lengthMM":880,"barrelMM":415,"shape":"ak","sources":[{"title":"Imperial War Museums — AKM","url":"https://www.iwm.org.uk/collections/item/object/30029524"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":null,"automatic":true,"rpm":600,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","rpmNote":"600/min: gestalteter Wiedergabetakt, hier nicht messtechnisch bestätigt","visualHeight":275,"description":"Festkolben, langes Gasrohr und stark gekrümmte Magazinkontur. Außenlänge und Laufmaß des IWM-Referenzobjekts."},{"id":"g36","name":"Heckler & Koch G36","shortName":"G36","category":"Automatisch","caliber":"5,56 × 45 mm","action":"Halb- / vollautomatisch","lengthMM":null,"barrelMM":480,"shape":"g36","sources":[{"title":"Bundeswehr — G36, technische Daten","url":"https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/ausruestung-bewaffnung/gewehr-g36"},{"title":"Heckler & Koch — G36","url":"https://www.heckler-koch.com/en/Products/Military%20and%20Law%20Enforcement/Assault%20rifles/G36"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":30,"automatic":true,"rpm":750,"dimensionNote":"Gesamtlänge und Höhe nicht aus der verwendeten Primärquelle verifiziert. Zeichenlänge 1000 mm ist eine Annahme; keine bestätigte Maßansicht.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualLength":1000,"visualHeight":320,"description":"Lange G36-Konfiguration mit ausgeklappter Schulterstütze und charakteristischem Tragebügel."},{"id":"p90","name":"FN P90 Standard","shortName":"P90","category":"Automatisch","caliber":"5,7 × 28 mm","action":"Halb- / vollautomatisch","lengthMM":505,"barrelMM":264.15,"shape":"p90","sources":[{"title":"FN Herstal — P90, technisches Datenblatt","url":"https://fnherstal.com/app/uploads/technical-data-fn-p90_0.pdf"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":2800,"massNote":"Ca., mit leerem Magazin; Standard-Ausführung","capacity":50,"automatic":true,"rpm":950,"dimensionNote":"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","rpmNote":"Profilwert 950; Herstellerbereich 850–1100/min","visualHeight":210,"description":"Kompakte Bullpup-Kontur mit horizontalem Magazin oberhalb des Gehäuses. Standard-Ausführung, nicht PS90."},{"id":"thompson","name":"Thompson M1A1","shortName":"M1A1","category":"Historisch","caliber":".45 ACP","action":"Halb- / vollautomatisch","lengthMM":810,"barrelMM":267,"shape":"thompson","sources":[{"title":"Royal Armouries — Thompson M1A1, Objekt 277959","url":"https://royalarmouries.org/collection/object/object-277959"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":null,"automatic":true,"rpm":700,"dimensionNote":"810 mm Gesamtlänge und 267 mm Lauf: referenziertes Royal-Armouries-Objekt. Andere Exemplare können abweichen; Kontur illustrativ.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","rpmNote":"Gestalteter Wiedergabetakt; kein verifizierter Messwert","visualLength":810,"visualHeight":265,"description":"Vereinfachte historische M1A1-Kontur mit Kastenmagazin und horizontalem Vorderschaft; keine 1928-Trommelvariante."},{"id":"garand","name":"M1 Garand · Museumsprofil","shortName":"M1 GARAND","category":"Historisch","caliber":".30-06 Springfield","action":"Halbautomatisch","lengthMM":1110,"barrelMM":null,"shape":"garand","sources":[{"title":"Imperial War Museums — M1 Garand FIR 6319","url":"https://www.iwm.org.uk/collections/item/object/30036169"},{"title":"National Park Service — M1 Garand","url":"https://www.nps.gov/spar/learn/historyculture/u-s-m1-garand-rifle-production.htm"}],"checked":"2026-10-23","heightMM":190,"widthMM":60,"massG":null,"massNote":"","capacity":8,"automatic":false,"rpm":null,"dimensionNote":"1110 × 190 × 60 mm: gerundete IWM-Objektmaße. Kein maßhaltiges 3D-Modell.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":190,"description":"Historische Holzschaftkontur ohne herausragendes Kastenmagazin. Maße des referenzierten Museumsobjekts."},{"id":"mossberg590","name":"Mossberg 590 · 9-Shot / 50693","shortName":"590","category":"Flinten","caliber":"12 Gauge","action":"Vorderschaftrepetierer","lengthMM":1041.4,"barrelMM":508,"shape":"shotgun","sources":[{"title":"Mossberg — 590 9-Shot, SKU 50693","url":"https://www.mossberg.com/590-9-shot-50693.html"}],"checked":"2026-10-23","heightMM":null,"widthMM":null,"massG":null,"massNote":"","capacity":"8 + 1","automatic":false,"rpm":null,"dimensionNote":"Gesamtlänge 41 Zoll; Lauf 20 Zoll. Höhe der Illustration angenähert.","audioNote":"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.","visualHeight":190,"description":"20-Zoll-Konfiguration mit Röhrenmagazin und Vorderschaft. Pumpgeräusch wird getrennt über „Mechanik“ ausgelöst, nicht automatisch nach jedem Schuss."},{"id":"barrett82","name":"Barrett M82A1 · 29″","shortName":"M82A1","category":"Präzisionsgewehre","caliber":".50 BMG","action":"Halbautomatisch","automatic":false,"rpm":null,"rpmNote":"","lengthMM":1448,"barrelMM":737,"heightMM":null,"widthMM":null,"massG":14800,"massNote":"Herstellerangabe für die 29-Zoll-Variante","capacity":10,"visualLength":1448,"visualHeight":310,"shape":"barrett","description":"Lange Außenkontur mit markanter Mündungsbremse, Zweibein und großem Gehäuse. Audio-Designprofil, keine vermessene Signatur.","dimensionNote":"Gesamtlänge und Lauf laut Hersteller. Höhe der Illustration gestalterisch angenähert; kein CAD-Modell.","audioNote":"Gestaltetes Klangprofil. Schalldämpfer-Modus ist ein Spieleffekt, keine Aussage über reale Kompatibilität.","checked":"2026-10-23","sources":[{"title":"Barrett — Model 82A1, Herstellerdaten","url":"https://barrett.net/products/firearms/model-82a1/"}]}];
const SOUND_DESIGN = {"g17":{"family":"pistol9","frontMS":0.5,"edge":1.0,"body":1.0,"tail":1.0,"mechanism":"striker"},"g19":{"family":"pistol9","frontMS":0.46,"edge":1.04,"body":0.95,"tail":0.97,"mechanism":"striker"},"g26":{"family":"pistol9","frontMS":0.41,"edge":1.1,"body":0.91,"tail":0.92,"mechanism":"striker"},"g34":{"family":"pistol9","frontMS":0.56,"edge":0.94,"body":1.04,"tail":1.05,"mechanism":"striker"},"g43x":{"family":"pistol9","frontMS":0.42,"edge":1.07,"body":0.91,"tail":0.93,"mechanism":"striker"},"beretta92":{"family":"pistol9","frontMS":0.54,"edge":0.98,"body":1.03,"tail":1.02,"mechanism":"hammer"},"p226":{"family":"pistol9","frontMS":0.52,"edge":1.01,"body":1.07,"tail":1.04,"mechanism":"hammer"},"colt1911":{"family":"pistol45","frontMS":0.78,"edge":0.85,"body":1.15,"tail":1.15,"mechanism":"hammer"},"sw686":{"family":"magnum","frontMS":0.6,"edge":1.12,"body":1.08,"tail":1.08,"mechanism":"revolver"},"luger":{"family":"pistol9","frontMS":0.53,"edge":0.98,"body":1.02,"tail":0.98,"mechanism":"toggle"},"mp5":{"family":"smg9","frontMS":0.64,"edge":0.92,"body":1.0,"tail":0.92,"mechanism":"roller"},"m4a1":{"family":"rifle556","frontMS":0.48,"edge":1.25,"body":0.95,"tail":1.12,"mechanism":"rifle"},"akm":{"family":"rifle762","frontMS":0.72,"edge":1.05,"body":1.12,"tail":1.2,"mechanism":"rifleHeavy"},"g36":{"family":"rifle556","frontMS":0.59,"edge":1.12,"body":1.06,"tail":1.1,"mechanism":"rifle"},"p90":{"family":"pdw","frontMS":0.36,"edge":1.13,"body":0.78,"tail":0.83,"mechanism":"compact"},"thompson":{"family":"pistol45","frontMS":0.84,"edge":0.81,"body":1.15,"tail":1.06,"mechanism":"openBolt"},"garand":{"family":"rifleFull","frontMS":0.88,"edge":1.12,"body":1.23,"tail":1.28,"mechanism":"rifleHeavy"},"mossberg590":{"family":"shotgun","frontMS":1.08,"edge":0.95,"body":1.35,"tail":1.45,"mechanism":"pump"},"barrett82":{"family":"heavy50","frontMS":0.48,"edge":0.91,"tail":1.15,"body":1.02,"mechanism":"rifleHeavy"}};
for (const item of catalogue)
    item.audio = SOUND_DESIGN[item.id];
const ENVIRONMENTS = {
    field: { name: 'Open field', subtitle: 'Wiese · im Freien', rt: .17, wet: .07, early: .24, damping: .64, size: 1, width: 1, paths: [[.009, -.08, .21], [.031, .3, .04]], description: 'Kurze Bodenreflexion; fast keine diffuse Hallfahne.' },
    forest: { name: 'Waldlichtung', subtitle: 'Unregelmäßige Reflexionen', rt: .75, wet: .19, early: .33, damping: .72, size: 1, width: 1, paths: [[.032, -.8, .14], [.064, .65, .11], [.103, -.4, .08], [.181, .9, .05]], description: 'Verteilte Reflexionen und gedämpfte Höhen.' },
    range: { name: 'Shooting range', subtitle: 'Indoor · bedämpft', rt: .65, wet: .28, early: .48, damping: .49, size: 1, width: .9, paths: [[.009, -.75, .3], [.016, .7, .26], [.026, -.4, .2], [.041, .5, .12]], description: 'Dichte frühe Reflexionen mit kontrolliertem Ausklang.' },
    hall: { name: 'Lagerhalle', subtitle: 'Groß · hart', rt: 2.7, wet: .36, early: .65, damping: .26, size: 1, width: 1, paths: [[.023, -.85, .26], [.046, .8, .24], [.072, -.5, .18], [.11, .7, .14]], description: 'Weite frühe Echos und lange, helle Hallfahne.' },
    concrete: { name: 'Betonraum', subtitle: 'Klein · reflektierend', rt: 1.45, wet: .34, early: .72, damping: .2, size: 1, width: .88, paths: [[.005, -.75, .35], [.011, .8, .3], [.019, -.25, .23], [.029, .5, .18]], description: 'Sehr frühe, harte Reflexionen; kompakter Raumcharakter.' },
    tunnel: { name: 'Tunnel', subtitle: 'Längsreflexionen', rt: 3.4, wet: .33, early: .69, damping: .36, size: 1, width: .72, paths: [[.022, -.2, .27], [.067, .2, .23], [.123, -.15, .2], [.209, .15, .14], [.334, -.1, .1]], description: 'Zeitlich gestaffelte Echos entlang eines langen Raums.' },
    alley: { name: 'Stadtgasse', subtitle: 'Zwei Fassaden', rt: 1.15, wet: .23, early: .6, damping: .31, size: 1, width: 1, paths: [[.014, -.9, .28], [.028, .9, .26], [.056, -.8, .15], [.088, .75, .12]], description: 'Seitliche Rückwürfe, nach oben offene Geometrie.' },
    valley: { name: 'Gebirgstal', subtitle: 'Weite · diskrete Echos', rt: 1.8, wet: .15, early: .68, damping: .55, size: 1, width: 1, paths: [[.24, -.75, .27], [.47, .8, .22], [.76, -.3, .15], [1.1, .5, .09]], description: 'Späte einzelne Rückwürfe; keine vermessene Landschaft.' },
    dry: { name: 'Anechoic', subtitle: 'Nur die Quelle', rt: 0, wet: 0, early: 0, damping: .5, size: 1, width: 1, paths: [], description: 'Keine Reflexionen, kein Hall. Gut zum Vergleich der Quellen.' }
};
const DEFAULT_SYNTH = { transient: 1, texture: 1, body: .55, gas: .75, mechanical: .55, casing: .28, brightness: .86, variation: .035, cycle: 1, metalness: .28, trigger: 1, bolt: 1, spring: .35, return: 1, frontDuration: 1, frontShape: 1, textureDecay: 1, bodyBandwidth: 1, bodyDecay: 1, gasDecay: 1, surface: 'concrete', solo: null, mute: [] };
const RANGES = { transient: [0, 1.5], texture: [0, 1.5], body: [0, 1.5], gas: [0, 1.5], mechanical: [0, 2], casing: [0, 2], brightness: [0, 1], variation: [0, .2], cycle: [.5, 2], metalness: [0, 1], trigger: [0, 2], bolt: [0, 2], spring: [0, 2], return: [0, 2], frontDuration: [.4, 2.5], frontShape: [.5, 2], textureDecay: [.35, 2.5], bodyBandwidth: [.4, 2], bodyDecay: [.4, 2.5], gasDecay: [.3, 2.5] };
const LAYERS = ['transient', 'texture', 'body', 'gas', 'mechanical', 'casing'];
const FAMILIES = {
    pistol9: { gain: .87, crust: .0052, bark: .016, gas: .012, low: 520 },
    pistol45: { gain: .98, crust: .0063, bark: .019, gas: .014, low: 440 },
    magnum: { gain: 1.06, crust: .0048, bark: .021, gas: .013, low: 600 },
    smg9: { gain: .85, crust: .0054, bark: .016, gas: .012, low: 500 },
    rifle556: { gain: 1.02, crust: .0066, bark: .025, gas: .015, low: 710 },
    rifle762: { gain: 1.11, crust: .0075, bark: .03, gas: .019, low: 540 },
    rifleFull: { gain: 1.14, crust: .0082, bark: .036, gas: .023, low: 430 },
    pdw: { gain: .86, crust: .0045, bark: .017, gas: .012, low: 660 },
    heavy50: { gain: 1.18, crust: .009, bark: .046, gas: .032, low: 360 },
    shotgun: { gain: 1.16, crust: .009, bark: .039, gas: .025, low: 380 }
};
const TAU = Math.PI * 2, clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function number(v, name) { if (typeof v !== 'number' || !Number.isFinite(v))
    throw new TypeError(name + ' must be a finite number'); return v; }
function vector(v, name = 'position') { if (!v || v.length !== 3)
    throw new TypeError(name + ' must be [x,y,z]'); return Array.from(v, (x) => clamp(number(x, name), -10000, 10000)); }
function clone(o) { return typeof structuredClone === 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o)); }
function deepFreeze(o) { Object.freeze(o); for (const v of Object.values(o))
    if (v && typeof v === 'object' && !Object.isFrozen(v))
        deepFreeze(v); return o; }
const WEAPONS = Object.fromEntries(catalogue.map(x => [x.id, deepFreeze(x)]));
deepFreeze(ENVIRONMENTS);
deepFreeze(DEFAULT_SYNTH);
function weapon(id) { if (!Object.hasOwn(WEAPONS, id))
    throw new RangeError('Unknown weapon: ' + id); return WEAPONS[id]; }
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function randomSeed() { if (typeof crypto !== 'undefined' && crypto.getRandomValues)
    return crypto.getRandomValues(new Uint32Array(1))[0] || 1; return (Date.now() ^ Math.random() * 0xffffffff) >>> 0; }
function object(o, name = 'options') { if (!o || typeof o !== 'object' || Array.isArray(o))
    throw new TypeError(name + ' must be an object'); return o; }
function bool(v, name) { if (typeof v !== 'boolean')
    throw new TypeError(name + ' must be boolean'); return v; }
function choice(v, values, name) { if (!values.includes(v))
    throw new RangeError(name + ': ' + values.join(', ')); return v; }
function seedValue(v) { number(v, 'seed'); if (!Number.isInteger(v) || v < 0 || v > 4294967295)
    throw new RangeError('seed must be uint32 (0–4294967295)'); return v; }
function sampleRateValue(v) { number(v, 'sampleRate'); if (!Number.isInteger(v) || v < 16000 || v > 192000)
    throw new RangeError('sampleRate: integer 16000–192000'); return v; }
function identifier(v) { if (typeof v !== 'string' || !v.length || v.length > 100 || !/^[-a-zA-Z0-9_.]+$/.test(v) || ['__proto__', 'constructor', 'prototype'].includes(v))
    throw new TypeError('id must be 1–100 letters, digits, _, . or -'); return v; }
function deriveSeed(seed, key) { let h = (seed ^ 2166136261) >>> 0; for (let i = 0; i < key.length; i++)
    h = Math.imul(h ^ key.charCodeAt(i), 16777619); return h >>> 0; }
function synthOptions(o = {}) { object(o, 'synth'); const r = { ...DEFAULT_SYNTH, mute: [] }; for (const [k, range] of Object.entries(RANGES))
    if (o[k] !== undefined)
        r[k] = clamp(number(o[k], k), ...range); if (o.surface !== undefined)
    r.surface = choice(o.surface, ['grass', 'gravel', 'concrete', 'wood', 'metal'], 'surface'); if (o.solo != null)
    r.solo = choice(o.solo, LAYERS, 'solo'); if (o.mute !== undefined) {
    if (!Array.isArray(o.mute) || o.mute.some(x => !LAYERS.includes(x)))
        throw new TypeError('mute must contain layer names');
    r.mute = [...new Set(o.mute)];
} return r; }
const DEFAULT_SUPPRESSOR = deepFreeze({ enabled: false, amount: .8, tone: .5 });
function suppressorOptions(o = {}) { if (typeof o === 'boolean')
    o = { enabled: o }; object(o, 'suppressor'); return { enabled: bool(o.enabled ?? false, 'suppressor.enabled'), amount: clamp(number(o.amount ?? .8, 'suppressor.amount'), 0, 1), tone: clamp(number(o.tone ?? .5, 'suppressor.tone'), 0, 1) }; }
const DEFAULT_MIXER = deepFreeze(Object.fromEntries(LAYERS.map(k => [k, { gain: 1, mute: false, solo: false, direct: 1, room: k === 'mechanical' ? .45 : k === 'casing' ? .3 : 1 }])));
function mixerOptions(o = {}) { object(o, 'mixer'); for (const k of Object.keys(o))
    choice(k, LAYERS, 'mixer layer'); const out = {}; for (const k of LAYERS) {
    const v = object(o[k] || {}, 'mixer.' + k), d = DEFAULT_MIXER[k];
    out[k] = { gain: clamp(number(v.gain ?? d.gain, 'gain'), 0, 2), mute: bool(v.mute ?? false, 'mute'), solo: bool(v.solo ?? false, 'solo'), direct: clamp(number(v.direct ?? d.direct, 'direct'), 0, 2), room: clamp(number(v.room ?? d.room, 'room'), 0, 2) };
} return out; }
function measure(channels) { if (channels instanceof Float32Array)
    channels = [channels]; let peak = 0, energy = 0, n = 0, clipped = 0; for (const a of channels)
    for (const x of a) {
        if (!Number.isFinite(x))
            throw new Error('Non-finite PCM');
        peak = Math.max(peak, Math.abs(x));
        energy += x * x;
        n++;
        if (Math.abs(x) >= 1)
            clipped++;
    } const rms = Math.sqrt(energy / Math.max(1, n)); return { peak, rms, peakDB: 20 * Math.log10(Math.max(1e-12, peak)), rmsDB: 20 * Math.log10(Math.max(1e-12, rms)), crestDB: rms > 0 ? 20 * Math.log10(Math.max(1, peak / rms)) : 0, clipped, samples: n }; }
function registerProfile(metadata, audio) { object(metadata, 'metadata'); object(audio, 'audio'); const id = identifier(metadata.id); if (Object.hasOwn(WEAPONS, id))
    throw new Error('Profile already exists: ' + id); choice(audio.family, Object.keys(FAMILIES), 'family'); choice(audio.mechanism, ['striker', 'hammer', 'toggle', 'revolver', 'roller', 'rifle', 'rifleHeavy', 'compact', 'openBolt', 'pump'], 'mechanism'); const a = { ...audio }; for (const k of ['frontMS', 'edge', 'body', 'tail'])
    a[k] = clamp(number(a[k], k), .1, 3); const w = { ...clone(metadata), id, name: String(metadata.name || id), shortName: String(metadata.shortName || id), automatic: metadata.automatic === true, rpm: metadata.rpm == null ? null : clamp(number(metadata.rpm, 'rpm'), 30, 1500), audio: a }; WEAPONS[id] = deepFreeze(w); return w; }

/* Pure event DSP. All functions own their output buffers; no shared mutable PCM. */
const DEFAULT_EQ = deepFreeze({ enabled: false, position: 'pre', hp: { enabled: false, frequency: 35, Q: .707 }, lp: { enabled: false, frequency: 18000, Q: .707 }, lowShelf: { frequency: 160, gain: 0, Q: .707 }, bell1: { frequency: 900, gain: 0, Q: 1 }, bell2: { frequency: 3500, gain: 0, Q: 1 }, highShelf: { frequency: 6500, gain: 0, Q: .707 } });
const DEFAULT_CHAIN = deepFreeze({ eq: DEFAULT_EQ, saturation: { enabled: false, mode: 'soft', inputDB: 0, driveDB: 6, outputDB: -3, wet: 1, oversample: 4 }, compressor: { enabled: false, threshold: -15, ratio: 3, knee: 6, attackMS: 12, releaseMS: 90, makeupDB: 0 } });
function chainOptions(o = {}) {
    object(o, 'chain');
    const q = object(o.eq || {}, 'eq'), eq = { enabled: bool(q.enabled ?? false, 'eq.enabled'), position: choice(q.position ?? 'pre', ['pre', 'post'], 'eq.position') };
    for (const key of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf']) {
        const d = DEFAULT_EQ[key], v = object(q[key] || {}, 'eq.' + key);
        eq[key] = { frequency: clamp(number(v.frequency ?? d.frequency, 'frequency'), 10, 90000), Q: clamp(number(v.Q ?? d.Q, 'Q'), .15, 12) };
        if (key === 'hp' || key === 'lp')
            eq[key].enabled = bool(v.enabled ?? d.enabled, key + '.enabled');
        else
            eq[key].gain = clamp(number(v.gain ?? d.gain, 'EQ gain'), -24, 24);
    }
    const s = object(o.saturation || {}, 'saturation'), c = object(o.compressor || {}, 'compressor');
    return { eq, saturation: { enabled: bool(s.enabled ?? false, 'saturation.enabled'), mode: choice(s.mode ?? 'soft', ['soft', 'hard'], 'saturation.mode'), inputDB: clamp(number(s.inputDB ?? 0, 'inputDB'), -24, 24), driveDB: clamp(number(s.driveDB ?? 6, 'driveDB'), 0, 30), outputDB: clamp(number(s.outputDB ?? -3, 'outputDB'), -30, 12), wet: clamp(number(s.wet ?? 1, 'wet'), 0, 1), oversample: choice(s.oversample ?? 4, [1, 4], 'oversample') }, compressor: { enabled: bool(c.enabled ?? false, 'compressor.enabled'), threshold: clamp(number(c.threshold ?? -15, 'threshold'), -60, 0), ratio: clamp(number(c.ratio ?? 3, 'ratio'), 1, 20), knee: clamp(number(c.knee ?? 6, 'knee'), 0, 24), attackMS: clamp(number(c.attackMS ?? 12, 'attackMS'), .1, 100), releaseMS: clamp(number(c.releaseMS ?? 90, 'releaseMS'), 5, 1000), makeupDB: clamp(number(c.makeupDB ?? 0, 'makeupDB'), -24, 24) } };
}
const EFFECT_PRESETS = {};
function effectsOptions(o = {}) { if (typeof o === 'string') {
    if (!Object.hasOwn(EFFECT_PRESETS, o))
        throw new RangeError('Unknown effect preset');
    return clone(EFFECT_PRESETS[o]);
} object(o, 'effects'); const out = { layers: {} }; for (const k of Object.keys(o.layers || {}))
    choice(k, LAYERS, 'effects layer'); for (const k of LAYERS)
    out.layers[k] = chainOptions(o.layers?.[k]); return out; }
function mergeChain(base, patch) { const r = clone(base); for (const k of ['eq', 'saturation', 'compressor'])
    if (patch[k]) {
        Object.assign(r[k], patch[k]);
        if (k === 'eq')
            for (const b of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf'])
                if (patch.eq[b])
                    r.eq[b] = { ...base.eq[b], ...patch.eq[b] };
    } return chainOptions(r); }
function registerPreset(id, effects) { identifier(id); if (Object.hasOwn(EFFECT_PRESETS, id))
    throw new Error('Preset already exists'); EFFECT_PRESETS[id] = deepFreeze(effectsOptions(effects)); return EFFECT_PRESETS[id]; }
registerPreset('clean', {});
for (const [id, drive, wet, threshold] of [['punchy', 6, .45, -16], ['aggressive', 11, .7, -19]]) {
    const e = effectsOptions({});
    for (const k of ['texture', 'body', 'gas'])
        e.layers[k] = mergeChain(e.layers[k], { eq: { enabled: true, lowShelf: { gain: -1.5 }, bell2: { gain: id === 'aggressive' ? 2 : 1, Q: .7 } }, saturation: { enabled: true, driveDB: drive, outputDB: -drive * .65, wet }, compressor: { enabled: true, threshold, ratio: 2.5, attackMS: 14, releaseMS: 85, makeupDB: 0 } });
    registerPreset(id, e);
}
function biquadCoefficients(type, frequency, Q, gain, sr) {
    const f = clamp(frequency, 5, sr * .45), w = TAU * f / sr, cs = Math.cos(w), sn = Math.sin(w), A = Math.pow(10, gain / 40), alpha = sn / (2 * Q), beta = 2 * Math.sqrt(A) * alpha;
    let b0, b1, b2, a0, a1, a2;
    switch (type) {
        case 'hp':
            b0 = (1 + cs) / 2;
            b1 = -(1 + cs);
            b2 = b0;
            a0 = 1 + alpha;
            a1 = -2 * cs;
            a2 = 1 - alpha;
            break;
        case 'lp':
            b0 = (1 - cs) / 2;
            b1 = 1 - cs;
            b2 = b0;
            a0 = 1 + alpha;
            a1 = -2 * cs;
            a2 = 1 - alpha;
            break;
        case 'bell':
            b0 = 1 + alpha * A;
            b1 = -2 * cs;
            b2 = 1 - alpha * A;
            a0 = 1 + alpha / A;
            a1 = -2 * cs;
            a2 = 1 - alpha / A;
            break;
        case 'lowShelf':
            b0 = A * ((A + 1) - (A - 1) * cs + beta);
            b1 = 2 * A * ((A - 1) - (A + 1) * cs);
            b2 = A * ((A + 1) - (A - 1) * cs - beta);
            a0 = (A + 1) + (A - 1) * cs + beta;
            a1 = -2 * ((A - 1) + (A + 1) * cs);
            a2 = (A + 1) + (A - 1) * cs - beta;
            break;
        case 'highShelf':
            b0 = A * ((A + 1) + (A - 1) * cs + beta);
            b1 = -2 * A * ((A - 1) + (A + 1) * cs);
            b2 = A * ((A + 1) + (A - 1) * cs - beta);
            a0 = (A + 1) - (A - 1) * cs + beta;
            a1 = 2 * ((A - 1) - (A + 1) * cs);
            a2 = (A + 1) - (A - 1) * cs - beta;
            break;
        default: throw new RangeError('Unknown filter');
    }
    return [b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0];
}
function filterPCM(a, c) { const out = new Float32Array(a.length); let z1 = 0, z2 = 0; for (let i = 0; i < a.length; i++) {
    const x = a[i], y = c[0] * x + z1;
    z1 = c[1] * x - c[3] * y + z2;
    z2 = c[2] * x - c[4] * y;
    out[i] = y;
} return out; }
function applyEQ(a, eq, sr) { let out = a.slice(); if (!eq.enabled)
    return out; for (const k of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf']) {
    const b = eq[k], pass = k === 'hp' || k === 'lp';
    if (pass ? !b.enabled : b.gain === 0)
        continue;
    out = filterPCM(out, biquadCoefficients(k.startsWith('bell') ? 'bell' : k, b.frequency, b.Q, b.gain || 0, sr));
} return out; }
const FIR_CACHE = new Map();
function oversamplingFIR() { if (FIR_CACHE.has(4))
    return FIR_CACHE.get(4); const n = 97, h = new Float64Array(n), mid = (n - 1) / 2, fc = .1125; let sum = 0; for (let i = 0; i < n; i++) {
    const x = i - mid, win = .42 - .5 * Math.cos(TAU * i / (n - 1)) + .08 * Math.cos(2 * TAU * i / (n - 1));
    h[i] = (x === 0 ? 2 * fc : Math.sin(TAU * fc * x) / (Math.PI * x)) * win;
    sum += h[i];
} for (let i = 0; i < n; i++)
    h[i] /= sum; FIR_CACHE.set(4, h); return h; }
function saturatePCM(a, s) {
    if (!s.enabled || s.wet === 0)
        return a.slice();
    const drive = Math.pow(10, (s.inputDB + s.driveDB) / 20), outGain = Math.pow(10, s.outputDB / 20), shape = x => s.mode === 'hard' ? clamp(x, -1, 1) : Math.tanh(x);
    let wet;
    if (s.oversample === 1) {
        wet = new Float32Array(a.length);
        for (let i = 0; i < a.length; i++)
            wet[i] = shape(a[i] * drive) * outGain;
    }
    else {
        const h = oversamplingFIR(), m = h.length - 1, N = a.length * 4 + m * 2, up = new Float32Array(N);
        for (let n = 0; n < a.length; n++) {
            const x = a[n] * 4 * drive;
            if (x === 0)
                continue;
            for (let j = 0; j < h.length; j++)
                up[n * 4 + j] += x * h[j];
        }
        for (let i = 0; i < N; i++)
            up[i] = shape(up[i]) * outGain;
        wet = new Float32Array(a.length); /* Both FIR group delays are removed in this prepared-event path. Dry remains on the same sample clock. */
        for (let n = 0; n < a.length; n++) {
            const at = n * 4 + m;
            let y = 0;
            for (let j = 0; j < h.length; j++)
                if (at - j >= 0 && at - j < N)
                    y += up[at - j] * h[j];
            wet[n] = y;
        }
    }
    if (s.wet === 1)
        return wet;
    for (let i = 0; i < wet.length; i++)
        wet[i] = a[i] * (1 - s.wet) + wet[i] * s.wet;
    return wet;
}
function compressPCM(a, c, sr) { const out = new Float32Array(a.length); if (!c.enabled)
    return { pcm: a.slice(), reductionDB: 0 }; const attack = Math.exp(-1 / (c.attackMS * .001 * sr)), release = Math.exp(-1 / (c.releaseMS * .001 * sr)), makeup = Math.pow(10, c.makeupDB / 20); let reduction = 0, maxGR = 0; for (let i = 0; i < a.length; i++) {
    const level = 20 * Math.log10(Math.max(1e-12, Math.abs(a[i]))), x = level - c.threshold;
    let target = 0;
    if (c.knee > 0 && x > -c.knee / 2 && x < c.knee / 2)
        target = (1 - 1 / c.ratio) * (x + c.knee / 2) ** 2 / (2 * c.knee);
    else if (x >= c.knee / 2)
        target = (1 - 1 / c.ratio) * x;
    const coef = target > reduction ? attack : release;
    reduction = coef * reduction + (1 - coef) * target;
    maxGR = Math.max(maxGR, reduction);
    out[i] = a[i] * Math.pow(10, -reduction / 20) * makeup;
} return { pcm: out, reductionDB: maxGR }; }
function processChain(a, settings, sr) { const c = chainOptions(settings); sampleRateValue(sr); let x = a.slice(); if (c.eq.enabled && c.eq.position === 'pre')
    x = applyEQ(x, c.eq, sr); if (c.saturation.enabled && c.saturation.wet > 0)
    x = saturatePCM(x, c.saturation); if (c.eq.enabled && c.eq.position === 'post')
    x = applyEQ(x, c.eq, sr); const out = c.compressor.enabled ? compressPCM(x, c.compressor, sr) : { pcm: x, reductionDB: 0 }; return { ...out, latencySamples: 0 }; }
const DEFAULT_LIMITER = deepFreeze({ ceilingDB: -1, releaseMS: 70, lookaheadMS: 5 });
function limiterOptions(o = {}) { object(o, 'limiter'); return { ceilingDB: clamp(number(o.ceilingDB ?? -1, 'ceilingDB'), -18, -.1), releaseMS: clamp(number(o.releaseMS ?? 70, 'releaseMS'), 10, 1000), lookaheadMS: clamp(number(o.lookaheadMS ?? 5, 'lookaheadMS'), 0, 20) }; }
/* Stereo-linked sliding-maximum lookahead sample-peak limiter; shared by live and offline. */
class LinkedPeakLimiter {
    constructor(sr, options = {}) { this.sr = sr; this.options = { ceilingDB: -1, releaseMS: 70, lookaheadMS: 5, ...options }; this.lookahead = Math.round(this.options.lookaheadMS * .001 * sr); this.size = this.lookahead + 1; this.left = new Float32Array(this.size); this.right = new Float32Array(this.size); this.qValue = new Float64Array(this.size + 2); this.qIndex = new Float64Array(this.size + 2); this.head = 0; this.tail = 0; this.n = 0; this.gain = 1; this.resetMeter(); this.configure(this.options); }
    configure(o) { Object.assign(this.options, o); this.ceiling = Math.pow(10, this.options.ceilingDB / 20); this.release = Math.exp(-1 / (this.options.releaseMS * .001 * this.sr)); }
    resetMeter() { this.meter = { prePeak: 0, postPeak: 0, preEnergy: 0, postEnergy: 0, samples: 0, maxReductionDB: 0, overCeiling: 0 }; }
    process(input, output) {
        const l = input[0], r = input[1] || l, ol = output[0], or = output[1] || output[0], cap = this.qValue.length, m = this.meter;
        for (let i = 0; i < ol.length; i++) {
            const x = l?.[i] || 0, y = r?.[i] || 0, peak = Math.max(Math.abs(x), Math.abs(y)), n = this.n++, at = n % this.size;
            this.left[at] = x;
            this.right[at] = y;
            while (this.head !== this.tail && this.qIndex[this.head] < n - this.lookahead)
                this.head = (this.head + 1) % cap;
            while (this.head !== this.tail && this.qValue[(this.tail - 1 + cap) % cap] <= peak)
                this.tail = (this.tail - 1 + cap) % cap;
            this.qValue[this.tail] = peak;
            this.qIndex[this.tail] = n;
            this.tail = (this.tail + 1) % cap;
            const max = this.qValue[this.head], target = max > this.ceiling ? this.ceiling / max : 1;
            this.gain = target < this.gain ? target : Math.min(target, 1 - (1 - this.gain) * this.release);
            const read = (n + 1) % this.size, ox = this.left[read] * this.gain, oy = this.right[read] * this.gain;
            ol[i] = ox;
            or[i] = oy;
            m.prePeak = Math.max(m.prePeak, peak);
            m.postPeak = Math.max(m.postPeak, Math.abs(ox), Math.abs(oy));
            m.preEnergy += x * x + y * y;
            m.postEnergy += ox * ox + oy * oy;
            m.samples += 2;
            m.maxReductionDB = Math.max(m.maxReductionDB, -20 * Math.log10(Math.max(1e-12, this.gain)));
            if (Math.abs(ox) > this.ceiling + 1e-6 || Math.abs(oy) > this.ceiling + 1e-6)
                m.overCeiling++;
        }
        return output;
    }
    readMeter(reset = false) { const m = { ...this.meter }, n = Math.max(1, m.samples); m.preRMS = Math.sqrt(m.preEnergy / n); m.postRMS = Math.sqrt(m.postEnergy / n); m.crestDB = m.postRMS ? 20 * Math.log10(Math.max(1, m.postPeak / m.postRMS)) : 0; m.currentReductionDB = -20 * Math.log10(Math.max(1e-12, this.gain)); if (reset)
        this.resetMeter(); return m; }
}
function limitPCM(channels, sr, options = {}) { sampleRateValue(sr); if (!Array.isArray(channels) || channels.length < 1 || channels.length > 2 || channels.some(a => !(a instanceof Float32Array) || !a.length))
    throw new TypeError('channels: one or two non-empty Float32Array buffers'); measure(channels); const config = limiterOptions(options), lim = new LinkedPeakLimiter(sr, config), n = Math.max(...channels.map(c => c.length)) + lim.lookahead, input = [new Float32Array(n), new Float32Array(n)], output = [new Float32Array(n), new Float32Array(n)]; input[0].set(channels[0]); input[1].set(channels[1] || channels[0]); lim.process(input, output); return { channels: output, metrics: lim.readMeter(), latencySamples: lim.lookahead }; }

/* Designed sound cues, not an operational weapon state machine. Times are artistic. */
const ACTION_NAMES = deepFreeze({ triggerPress: 'Abzugsbewegung', triggerBreak: 'Abzugskontakt', triggerRelease: 'Loslassen', triggerReset: 'Reset-Klick', dryFire: 'Dry-Fire', boltBack: 'Schlitten / Verschluss zurück', boltForward: 'Schlitten / Verschluss vor', spring: 'Feder / Reibung', magRelease: 'Magazinkontakt lösen', magOut: 'Magazin entnehmen', magIn: 'Magazin einsetzen', magSeat: 'Magazin einrasten', safety: 'Sicherungs-Cue', selector: 'Wahlhebel-Cue', pumpBack: 'Pumpen zurück', pumpForward: 'Pumpen vor', casingImpact: 'Hülsenkontakt', hammerCock: 'Hahnkontakt', cylinderOpen: 'Trommel öffnen', cylinderClose: 'Trommel schließen', clip: 'Clip-Kontakt', cycle: 'Mechanik-Komposition' });
function capabilities(id) { const w = weapon(id), m = w.audio.mechanism, a = ['triggerPress', 'triggerBreak', 'triggerRelease', 'triggerReset', 'dryFire', 'casingImpact', 'cycle']; if (m === 'revolver')
    a.push('cylinderOpen', 'cylinderClose', 'hammerCock');
else if (m === 'pump')
    a.push('pumpBack', 'pumpForward', 'spring', 'safety');
else {
    a.push('boltBack', 'boltForward', 'spring');
    if (id === 'garand')
        a.push('clip');
    else
        a.push('magRelease', 'magOut', 'magIn', 'magSeat');
    if (m !== 'striker' && id !== 'p226')
        a.push('safety');
    if (w.automatic)
        a.push('selector');
    if (['hammer', 'toggle'].includes(m))
        a.push('hammerCock');
} return { actions: a, automatic: !!w.automatic, suppressor: true, suppressorMode: 'game-audio', spring: m !== 'revolver', bolt: m !== 'revolver', magazine: !['revolver', 'pump'].includes(m) && id !== 'garand' }; }
const MECH_FAMILIES = deepFreeze({ striker: { base: 1550, decay: .0028, noise: .8, ring: .2, drag: .018, modes: 5 }, hammer: { base: 1190, decay: .0042, noise: .62, ring: .38, drag: .023, modes: 7 }, toggle: { base: 1740, decay: .0049, noise: .48, ring: .5, drag: .019, modes: 9 }, revolver: { base: 960, decay: .006, noise: .5, ring: .48, drag: .02, modes: 6 }, roller: { base: 1220, decay: .0031, noise: .8, ring: .27, drag: .024, modes: 8 }, rifle: { base: 900, decay: .0048, noise: .8, ring: .24, drag: .04, modes: 7 }, rifleHeavy: { base: 690, decay: .0062, noise: .76, ring: .31, drag: .06, modes: 9 }, compact: { base: 1830, decay: .0024, noise: .9, ring: .14, drag: .018, modes: 5 }, openBolt: { base: 710, decay: .0067, noise: .7, ring: .35, drag: .054, modes: 8 }, pump: { base: 590, decay: .008, noise: .83, ring: .15, drag: .12, modes: 6 } });
function actionOptions(o = {}) { object(o, 'actionOptions'); return { intensity: clamp(number(o.intensity ?? 1, 'intensity'), 0, 2), material: choice(o.material ?? 'mixed', ['mixed', 'metal', 'polymer', 'wood'], 'material'), resonance: clamp(number(o.resonance ?? 1, 'resonance'), .5, 2), damping: clamp(number(o.damping ?? 1, 'damping'), .3, 3), friction: clamp(number(o.friction ?? 1, 'friction'), 0, 2), bounces: Math.round(clamp(number(o.bounces ?? 3, 'bounces'), 1, 6)), surface: choice(o.surface ?? 'concrete', ['grass', 'gravel', 'concrete', 'wood', 'metal'], 'surface') }; }
function actionPlan(id, name, p, options = {}) {
    const cap = capabilities(id);
    if (!cap.actions.includes(name))
        throw new RangeError(name + ' is not supported by ' + id);
    const w = weapon(id), m = w.audio.mechanism, cy = p.cycle, a = actionOptions(options), out = [];
    const add = (type, at, amp = 1, length = .02, tag = type) => out.push({ type, at, amp, length, tag });
    switch (name) {
        case 'triggerPress':
            add('rub', 0, .016 * p.trigger, .018 * cy);
            add('click', .008 * cy, .014 * p.trigger, .008);
            break;
        case 'triggerBreak':
            add('click', 0, .038 * p.trigger, .018);
            break;
        case 'triggerRelease':
            add('rub', 0, .012 * p.trigger, .016 * cy);
            add('tick', .009 * cy, .015 * p.trigger, .01);
            break;
        case 'triggerReset':
            add('tick', 0, .026 * p.trigger, .016);
            break;
        case 'dryFire':
            add('click', 0, .043 * p.trigger, .025);
            add('tick', .004, .018 * p.trigger, .014);
            break;
        case 'boltBack':
            add('impact', 0, .07 * p.bolt, .04);
            add('rub', .005, .035 * p.spring, .044 * cy);
            add('clunk', .045 * cy, .055 * p.bolt, .04);
            break;
        case 'boltForward':
            add('rub', 0, .027 * p.spring, .03 * cy);
            add('clunk', .035 * cy, .085 * p.return, .042);
            break;
        case 'spring':
            add('rub', 0, .045 * p.spring, .08 * cy);
            break;
        case 'magRelease':
            add('tick', 0, .032, .015);
            add('click', .012, .019, .02);
            break;
        case 'magOut':
            add('rub', 0, .035, .12 * cy);
            add('tick', .10 * cy, .025, .016);
            break;
        case 'magIn':
            add('rub', 0, .042, .095 * cy);
            add('impact', .10 * cy, .065, .035);
            break;
        case 'magSeat':
            add('clunk', 0, .083, .035);
            add('tick', .008, .027, .018);
            break;
        case 'safety':
            add('tick', 0, .03, .017);
            break;
        case 'selector':
            add('click', 0, .032, .018);
            add('tick', .006, .02, .015);
            break;
        case 'pumpBack':
            add('clunk', 0, .13 * p.bolt, .055);
            add('rub', .009, .10 * p.spring, .13 * cy);
            add('impact', .145 * cy, .105 * p.bolt, .05);
            break;
        case 'pumpForward':
            add('rub', 0, .095 * p.spring, .12 * cy);
            add('clunk', .125 * cy, .16 * p.return, .06);
            break;
        case 'hammerCock':
            add('rub', 0, .014, .036 * cy);
            add('tick', .019 * cy, .029, .019);
            add('click', .038 * cy, .037, .025);
            break;
        case 'cylinderOpen':
            add('click', 0, .04, .025);
            add('clunk', .05 * cy, .075, .04);
            break;
        case 'cylinderClose':
            add('rub', 0, .018, .04 * cy);
            add('impact', .045 * cy, .09, .055);
            add('tick', .052 * cy, .025, .024);
            break;
        case 'clip':
            add('impact', 0, .07, .12);
            add('tick', .08, .034, .07);
            break;
        case 'casingImpact': {
            let at = 0;
            for (let i = 0; i < a.bounces; i++) {
                add('casing', at, .04 * Math.pow(.47, i), .08, 'bounce-' + i);
                at += .12 / (i + 1);
            }
            break;
        }
        case 'cycle': {
            let names;
            if (m === 'revolver')
                names = [['hammerCock', 0], ['triggerBreak', .09 * cy]];
            else if (m === 'pump')
                names = [['pumpBack', 0], ['pumpForward', .20 * cy]];
            else
                names = [['boltBack', 0], ['boltForward', .075 * cy]];
            for (const [n, t] of names)
                for (const x of actionPlan(id, n, p, a))
                    out.push({ ...x, at: x.at + t, tag: n + '/' + x.tag });
            break;
        }
    }
    return out.map((e, i) => ({ ...e, tag: name + '/' + e.tag + '/' + i }));
}
function synthAction(id, name, p, sr, seed, options = {}) {
    const a = actionOptions(options), w = weapon(id), f = MECH_FAMILIES[w.audio.mechanism], plan = actionPlan(id, name, p, a), length = Math.max(32, Math.ceil((Math.max(...plan.map(e => e.at + Math.max(e.length, (e.type === 'casing' ? .011 : f.decay * 1.3) * 9 / a.damping)), .01) + .03) * sr)), pcm = new Float32Array(length);
    const variant = .94 + (deriveSeed(1, id) % 1200) / 10000, mat = { mixed: [1, 1], metal: [1.3, 1.4], polymer: [.67, .3], wood: [.57, .5] }[a.material], coef = hz => 1 - Math.exp(-TAU * clamp(hz, 15, sr * .42) / sr);
    for (const e of plan) {
        const random = rng(deriveSeed(seed, e.tag)), noise = () => random() * 2 - 1, at = Math.round(e.at * sr), amp = e.amp * a.intensity * (1 + (random() * 2 - 1) * p.variation);
        let low = 0, slow = 0;
        if (e.type === 'rub') {
            const n = Math.min(length - at, Math.ceil(e.length * sr)), c = coef(1300 * variant), cs = coef(90);
            for (let j = 0; j < n; j++) {
                const x = noise();
                low += c * (x - low);
                slow += cs * (noise() - slow);
                const envelope = Math.max(0, Math.sin(Math.PI * j / Math.max(1, n - 1))) ** 1.2;
                pcm[at + j] += amp * a.friction * envelope * (low * .55 + (x - low) * .12) * (1 + slow * 1.6);
            }
            continue;
        }
        let base = f.base * variant * a.resonance * mat[0], decay = f.decay / a.damping, ring = f.ring * mat[1] * (.4 + p.metalness * 1.6), exc = f.noise;
        if (e.type === 'tick') {
            base *= 1.5;
            decay *= .55;
        }
        if (e.type === 'clunk') {
            base *= .61;
            decay *= 1.2;
        }
        if (e.type === 'impact') {
            base *= .85;
            decay *= 1.3;
        }
        let surfaceAmp = 1;
        if (e.type === 'casing') {
            const surface = { grass: [.08, 800, .0014, .05], gravel: [.3, 1600, .0028, .18], concrete: [.7, 2800, .004, .6], wood: [.4, 1300, .0034, .3], metal: [.9, 3200, .011, .85] }[a.surface];
            surfaceAmp = surface[0];
            base = surface[1] * a.resonance;
            decay = surface[2] / a.damping;
            ring = surface[3] * (.6 + p.metalness);
        }
        const modes = [];
        for (let j = 0; j < f.modes; j++) {
            const freq = base * (1 + j * .77 + (random() - .5) * .18);
            if (freq > sr * .44)
                continue;
            modes.push({ f: freq, phase: random() * TAU, decay: decay / (1 + j * .17), amp: 1 / (1 + j * 1.5) });
        }
        const n = Math.min(length - at, Math.ceil(Math.max(e.length, decay * 9) * sr)), c = coef(base * 1.8);
        for (let j = 0; j < n; j++) {
            const t = j / sr, x = noise();
            low += c * (x - low);
            let tonal = 0;
            for (const m of modes)
                tonal += Math.sin(TAU * m.f * t + m.phase) * Math.exp(-t / m.decay) * m.amp;
            const thud = low * Math.exp(-t / (decay * .65)), tick = (x - low) * Math.exp(-t / .00065);
            pcm[at + j] += amp * surfaceAmp * (exc * (tick + thud * .65) + ring * tonal * .45);
        }
    }
    return { pcm, plan, duration: length / sr };
}

function eqTailSeconds(chain, sr) { if (!chain.eq.enabled)
    return 0; let longest = 0; for (const k of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf']) {
    const b = chain.eq[k], pass = k === 'hp' || k === 'lp';
    if (pass ? !b.enabled : b.gain === 0)
        continue;
    const c = biquadCoefficients(k.startsWith('bell') ? 'bell' : k, b.frequency, b.Q, b.gain || 0, sr), disc = c[3] * c[3] - 4 * c[4];
    let radius;
    if (disc < 0)
        radius = Math.sqrt(Math.max(0, c[4]));
    else
        radius = Math.max(Math.abs((-c[3] + Math.sqrt(disc)) / 2), Math.abs((-c[3] - Math.sqrt(disc)) / 2));
    if (radius > 0 && radius < 1)
        longest = Math.max(longest, Math.log(1e-6) / Math.log(radius) / sr);
} if (longest > 6)
    throw new RangeError("EQ decay exceeds the six-second event tail budget; raise frequency or reduce Q/gain"); return longest; }
function dcFilter(a, sr) { const out = new Float32Array(a.length), c = Math.exp(-TAU * 28 / sr); let prev = 0, y = 0; for (let i = 0; i < a.length; i++) {
    const x = a[i];
    y = x - prev + c * y;
    prev = x;
    out[i] = y;
} return out; }
function shotLayers(id, p, sr, seed, keys) {
    const w = weapon(id), a = w.audio, f = FAMILIES[a.family], event = rng(deriveSeed(seed, 'event')), vary = () => 1 + (event() * 2 - 1) * p.variation, gain = f.gain * vary(), front = a.frontMS * .001 * p.frontDuration * vary(), edge = a.edge * vary(), tail = a.tail * vary(), start = Math.round(.002 * sr), raw = {}, coef = hz => 1 - Math.exp(-TAU * clamp(hz, 15, sr * .45) / sr);
    const durations = { transient: Math.max(.04, front * 16), texture: Math.max(.1, f.bark * tail * p.textureDecay * 10), body: .008 * tail * p.bodyDecay * 11, gas: f.gas * tail * p.gasDecay * 10 };
    for (const k of keys) {
        if (!Object.hasOwn(durations, k))
            continue;
        const random = rng(deriveSeed(seed, 'layer/' + k)), noise = () => random() * 2 - 1, length = start + Math.ceil(durations[k] * sr), out = raw[k] = new Float32Array(length), cLo = coef(f.low), cMid = coef(Math.min(2700, sr * .19)), cHi = coef(700 + (sr * .44 - 700) * p.brightness), cMod = coef(360), cBody = coef(950 * p.bodyBandwidth), cSub = coef(90), cGas = coef(1700);
        let lo = 0, mid = 0, hi = 0, mod = 0, body = 0, sub = 0, gas = 0;
        const breaks = [];
        let t0 = .00018;
        for (let j = 0; j < 15; j++) {
            t0 += (.00011 + random() * .00065) * (j < 5 ? 1 : 1.6);
            breaks.push([t0, (.035 + random() * .12) * Math.exp(-t0 / .0045) * (random() < .22 ? -1 : 1), .00007 + random() * .00019]);
        }
        const smears = [];
        for (let j = 0; j < 7; j++)
            smears.push([.0008 + random() * .026, .0005 + random() * .0017, .15 + random() * .5]);
        for (let i = start; i < length; i++) {
            const t = (i - start) / sr, n = noise(), n2 = noise();
            lo += cLo * (n - lo);
            mid += cMid * (n - mid);
            hi += cHi * (n - hi);
            mod += cMod * (n2 - mod);
            body += cBody * (n2 - body);
            sub += cSub * (n2 - sub);
            gas += cGas * (n2 - gas);
            const disorder = clamp(1 + mod * 2.7, .28, 1.9);
            if (k === 'transient') {
                const u = t / front, pressure = (1 - u * p.frontShape) * Math.exp(-(1.1 + .45 * p.frontShape) * u);
                let breakup = 0;
                for (const b of breaks) {
                    const z = t - b[0];
                    if (z >= 0 && z < b[2] * 9) {
                        const q = z / b[2];
                        breakup += b[1] * (1 - q) * Math.exp(-q);
                    }
                }
                out[i] = gain * (pressure * .91 + breakup * 1.5);
            }
            else if (k === 'texture') {
                let packet = 0;
                for (const b of smears) {
                    const z = (t - b[0]) / b[1];
                    if (z > 0 && z < 8)
                        packet += b[2] * Math.exp(-z);
                }
                const crust = (hi - mid) * Math.exp(-t / (f.crust * tail * p.textureDecay)), bark = ((mid - lo) * 1.12 + (hi - mid) * .32) * Math.exp(-t / (f.bark * tail * p.textureDecay)) * (.62 + packet) * disorder;
                out[i] = gain * (crust * .95 * edge + bark * .99);
            }
            else if (k === 'body')
                out[i] = gain * a.body * (body - sub) * 1.6 * Math.exp(-t / (.008 * tail * p.bodyDecay));
            else
                out[i] = gain * (gas * .45 + (hi - mid) * .08) * Math.exp(-t / (f.gas * tail * p.gasDecay)) * disorder;
        }
    }
    return raw;
}
function resolveEvent(request = {}) {
    object(request, 'event');
    const id = weapon(request.weapon || 'g17').id, kind = choice(request.kind || 'shot', ['shot', 'mechanics', 'action'], 'kind'), action = kind === 'mechanics' ? 'cycle' : kind === 'action' ? choice(request.action, capabilities(id).actions, 'action') : null;
    return { weapon: id, kind, action, sampleRate: sampleRateValue(request.sampleRate ?? 48000), seed: seedValue(request.seed ?? 17017), synth: synthOptions(request.synth), effects: effectsOptions(request.effects), mixer: mixerOptions(request.mixer), suppressor: suppressorOptions(request.suppressor), actionOptions: actionOptions({ ...request.actionOptions, surface: request.actionOptions?.surface ?? request.synth?.surface ?? DEFAULT_SYNTH.surface }), debugStems: bool(request.debugStems ?? false, 'debugStems'), includeCasing: bool(request.includeCasing ?? true, 'includeCasing'), includeMechanics: bool(request.includeMechanics ?? true, 'includeMechanics'), legacyTrigger: bool(request.legacyTrigger ?? false, 'legacyTrigger') };
}
function synthesizeEvent(request = {}) {
    const r = resolveEvent(request), { weapon: id, sampleRate: sr, seed, synth: p } = r, solo = LAYERS.some(k => r.mixer[k].solo), audible = k => !p.mute.includes(k) && (!p.solo || p.solo === k) && !r.mixer[k].mute && (!solo || r.mixer[k].solo), needed = k => r.debugStems || audible(k), raw = {}, timeline = [];
    if (r.kind === 'shot') {
        Object.assign(raw, shotLayers(id, p, sr, seed, ['transient', 'texture', 'body', 'gas'].filter(needed)));
        const m = weapon(id).audio.mechanism;
        if (r.includeMechanics && needed('mechanical') && m !== 'pump' && m !== 'revolver') {
            const c = synthAction(id, 'cycle', p, sr, deriveSeed(seed, 'mechanical/cycle'), r.actionOptions);
            raw.mechanical = c.pcm;
            timeline.push(...c.plan.map(x => ({ layer: 'mechanical', action: 'cycle', at: x.at, type: x.type })));
        }
        if (r.legacyTrigger && needed('mechanical')) {
            const c = synthAction(id, 'triggerBreak', p, sr, deriveSeed(seed, 'mechanical/trigger'), r.actionOptions), arr = new Float32Array(Math.max(raw.mechanical?.length || 0, c.pcm.length));
            if (raw.mechanical)
                arr.set(raw.mechanical);
            for (let i = 0; i < c.pcm.length; i++)
                arr[i] += c.pcm[i];
            raw.mechanical = arr;
        }
        if (r.includeCasing && needed('casing') && m !== 'pump' && m !== 'revolver') {
            const opts = { ...r.actionOptions, surface: p.surface }, c = synthAction(id, 'casingImpact', p, sr, deriveSeed(seed, 'casing'), opts), offset = Math.round(sr * .31);
            raw.casing = new Float32Array(offset + c.pcm.length);
            raw.casing.set(c.pcm, offset);
            timeline.push(...c.plan.map(x => ({ layer: 'casing', action: 'casingImpact', at: x.at + .31, type: x.type })));
        }
        timeline.unshift({ layer: 'transient', action: 'shot', at: .002, type: 'source' });
    }
    else {
        const layer = r.action === 'casingImpact' ? 'casing' : 'mechanical';
        if (needed(layer)) {
            const c = synthAction(id, r.action, p, sr, deriveSeed(seed, 'action/' + r.action), { ...r.actionOptions, surface: request.actionOptions?.surface ?? p.surface });
            raw[layer] = c.pcm;
            timeline.push(...c.plan.map(x => ({ layer, action: r.action, at: x.at, type: x.type })));
        }
    }
    const stems = {}, rawStems = r.debugStems ? {} : undefined, weightedStems = r.debugStems ? {} : undefined, metrics = {};
    let length = 32, allocatedSamples = 0;
    for (const [k, a] of Object.entries(raw)) {
        allocatedSamples += a.length;
        if (r.debugStems)
            rawStems[k] = a.slice();
        const chain = r.effects.layers[k], padding = .085 + eqTailSeconds(chain, sr) + (chain.saturation.enabled ? .002 : 0), buffer = new Float32Array(a.length + Math.ceil(padding * sr));
        let gain = audible(k) ? p[k] * .72 * r.mixer[k].gain : 0;
        if (r.suppressor.enabled && ['transient', 'texture', 'body', 'gas'].includes(k))
            gain *= Math.pow(10, -r.suppressor.amount * ({ transient: 18, texture: 16, body: 10, gas: 9 }[k]) / 20);
        for (let i = 0; i < a.length; i++)
            buffer[i] = a[i] * gain;
        let x = dcFilter(buffer, sr);
        if (r.suppressor.enabled && r.suppressor.amount > 0 && ['transient', 'texture', 'body', 'gas'].includes(k)) {
            const cutoff = (.45 * sr) * (1 - r.suppressor.amount) + (1100 + 6200 * r.suppressor.tone) * r.suppressor.amount;
            x = filterPCM(x, biquadCoefficients('lp', cutoff, .6, 0, sr));
        }
        if (r.debugStems)
            weightedStems[k] = x.slice();
        const result = processChain(x, chain, sr);
        stems[k] = result.pcm;
        metrics[k] = { ...measure(result.pcm), compressorReductionDB: result.reductionDB };
        length = Math.max(length, result.pcm.length);
        allocatedSamples += buffer.length + x.length + result.pcm.length;
    }
    const pcm = new Float32Array(length);
    for (const a of Object.values(stems))
        for (let i = 0; i < a.length; i++)
            pcm[i] += a[i];
    const metricsSum = measure(pcm);
    return { pcm, stems, rawStems, weightedStems, layers: rawStems, sampleRate: sr, seed, weapon: id, kind: r.kind, action: r.action, peak: metricsSum.peak, rms: metricsSum.rms, duration: length / sr, metrics: metricsSum, layerMetrics: metrics, timeline, options: p, resolved: r, allocatedBytesEstimate: (allocatedSamples + length) * 4, retainedBytes: (length + Object.values(stems).reduce((n, a) => n + a.length, 0) + (r.debugStems ? Object.values(rawStems).reduce((n, a) => n + a.length, 0) + Object.values(weightedStems).reduce((n, a) => n + a.length, 0) : 0)) * 4 };
}
/** Compatible entry point; processing contains effects/mixer/suppressor and debugStems. */
function synthesize(id = 'g17', options = {}, sampleRate = 48000, seed = 17017, kind = 'shot', processing = {}) { return synthesizeEvent({ ...processing, weapon: id, synth: options, sampleRate, seed, kind }); }

function environment(id = 'field', overrides = {}) {
    if (!Object.hasOwn(ENVIRONMENTS, id))
        throw new RangeError('Unknown environment: ' + id);
    const e = { ...clone(ENVIRONMENTS[id]), id };
    for (const [k, r] of Object.entries({ rt: [0, 5], wet: [0, 1], early: [0, 1], damping: [0, 1], size: [.25, 3], width: [0, 1] }))
        if (overrides[k] !== undefined)
            e[k] = clamp(number(overrides[k], k), ...r);
    if (id === 'dry') {
        e.rt = 0;
        e.wet = 0;
        e.early = 0;
    }
    return e;
}
/** Synthetic diffuse IR; geometrical early paths remain separate live nodes. */
function roomImpulse(e, sr) {
    const n = Math.max(1, Math.ceil((e.rt * 1.12 + .08) * sr)), L = new Float32Array(n), R = new Float32Array(n);
    if (e.rt === 0)
        return { left: L, right: R };
    const rand = rng(209193 + Object.keys(ENVIRONMENTS).indexOf(e.id) * 199), onset = .018 * e.size;
    let ll = 0, rl = 0, ls = 0, rs = 0, energy = 0;
    const coef = 1 - Math.exp(-TAU * (2200 + 6500 * (1 - e.damping)) / sr);
    for (let i = Math.floor(onset * sr); i < n; i++) {
        const t = i / sr - onset, nl = rand() * 2 - 1, nr = rand() * 2 - 1;
        ll += coef * (nl - ll);
        rl += coef * (nr - rl);
        const slow = 1 - Math.exp(-TAU * 272 / sr);
        ls += slow * (nl - ls);
        rs += slow * (nr - rs);
        const density = 1 - Math.exp(-t / .014), d = Math.exp(-6.9078 * t / Math.max(.02, e.rt));
        const hf = Math.exp(-6.9078 * t / (Math.max(.02, e.rt) * (.25 + .6 * (1 - e.damping))));
        const l = density * (ls * 1.7 * d + (ll - ls) * hf), r = density * (rs * 1.7 * d + (rl - rs) * hf), mid = (l + r) * .5, side = (l - r) * .5 * e.width;
        L[i] = mid + side;
        R[i] = mid - side;
        energy += L[i] * L[i] + R[i] * R[i];
    }
    const g = energy > 0 ? .78 / Math.sqrt(energy) : 0;
    for (let i = 0; i < n; i++) {
        L[i] *= g;
        R[i] *= g;
    }
    return { left: L, right: R };
}

function ramp(param, v, ctx, t = .015) { param.setTargetAtTime(v, ctx.currentTime, t); }
function dis(node) { try {
    node?.disconnect();
}
catch (_) { } }
function clock() { return typeof performance !== 'undefined' ? performance.now() : Date.now(); }
class Events {
    constructor() { this._events = new Map(); }
    on(name, fn) { if (typeof fn !== 'function')
        throw new TypeError('Listener must be a function'); if (!this._events.has(name))
        this._events.set(name, new Set()); this._events.get(name).add(fn); return () => this.off(name, fn); }
    off(name, fn) { this._events.get(name)?.delete(fn); return this; }
    _emit(name, value) { for (const fn of this._events.get(name) || [])
        try {
            fn(value);
        }
        catch (err) {
            console.error('BLACKLINE listener', err);
        } }
}
function emitterOptions(o = {}) { object(o, 'emitter'); return { weapon: weapon(o.weapon || 'g17').id, position: vector(o.position || [0, 1.6, -1]), gain: clamp(number(o.gain ?? 1, 'gain'), 0, 2), occlusion: clamp(number(o.occlusion ?? 0, 'occlusion'), 0, 1), distanceModel: choice(o.distanceModel || 'inverse', ['inverse', 'game', 'none'], 'distanceModel'), rolloff: clamp(number(o.rolloff ?? 1, 'rolloff'), 0, 4), propagation: bool(o.propagation ?? true, 'propagation'), panningModel: choice(o.panningModel || 'HRTF', ['HRTF', 'equalpower'], 'panningModel'), perspective: choice(o.perspective || 'world', ['world', 'firstPerson'], 'perspective'), firstPersonOffset: vector(o.firstPersonOffset || [.15, -.12, -.5]), tailMode: choice(o.tailMode || 'crossfade', ['crossfade', 'natural'], 'tailMode'), priority: clamp(number(o.priority ?? 0, 'priority'), -10, 10), synth: synthOptions(o.synth), effects: effectsOptions(o.effects), mixer: mixerOptions(o.mixer), suppressor: suppressorOptions(o.suppressor), environment: environment(o.environment || 'field', o.room || {}) }; }
class Emitter extends Events {
    constructor(engine, options = {}) { super(); this.engine = engine; this.context = engine.context; this.id = engine._allocateID(options.id); Object.assign(this, emitterOptions(options)); this._destroyed = false; this._ephemeral = options._ephemeral === true; this._voiceSerial = 0; this.voices = new Map(); this._oldRooms = new Set(); this._timers = new Set(); this._sequence = null; this._pending = new Set(); this._makeGraph(); }
    _assert() { if (this._destroyed || this.engine._destroyed)
        throw new Error('Emitter disposed'); }
    _makeGraph() { const c = this.context; this.input = c.createGain(); this.input.gain.value = this.gain; this.roomInput = c.createGain(); this.roomInput.gain.value = this.gain; this.air = c.createBiquadFilter(); this.air.type = 'lowpass'; this.air.Q.value = .5; this.roomAir = c.createBiquadFilter(); this.roomAir.type = 'lowpass'; this.roomAir.Q.value = .5; this.delay = c.createDelay(30); this.roomDelay = c.createDelay(30); this.distanceGain = c.createGain(); this.panner = c.createPanner(); this.panner.panningModel = this.panningModel; this.panner.rolloffFactor = 0; this.spatialOut = c.createGain(); this.roomFeed = c.createGain(); this.input.connect(this.air); this.air.connect(this.delay); this.delay.connect(this.distanceGain); this.distanceGain.connect(this.panner); this.panner.connect(this.spatialOut); this.spatialOut.connect(this.engine.input); this.roomInput.connect(this.roomAir); this.roomAir.connect(this.roomDelay); this.roomDelay.connect(this.roomFeed); this._room = this._buildRoom(this.environment); this._spatial(true); }
    _destroyGraph() { this._room?.dispose(); for (const old of this._oldRooms) {
        clearTimeout(old.timer);
        old.dispose();
    } this._oldRooms.clear(); for (const k of ['input', 'roomInput', 'air', 'roomAir', 'delay', 'roomDelay', 'distanceGain', 'panner', 'spatialOut', 'roomFeed'])
        dis(this[k]); }
    _buildRoom(e) {
        const c = this.context, root = c.createGain(), out = c.createGain(), nodes = [root, out];
        this.roomFeed.connect(root);
        out.connect(this.engine.input);
        let wet = null;
        if (e.rt > 0) {
            const con = c.createConvolver();
            wet = c.createGain();
            con.normalize = false;
            con.buffer = this.engine._getIR(e);
            wet.gain.value = e.wet;
            root.connect(con);
            con.connect(wet);
            wet.connect(out);
            nodes.push(con, wet);
        }
        const early = [];
        for (const [time, pan, amp] of e.paths) {
            const d = c.createDelay(8), g = c.createGain(), p = c.createStereoPanner(), lp = c.createBiquadFilter();
            d.delayTime.value = time * e.size;
            g.gain.value = amp * e.early;
            lp.type = 'lowpass';
            lp.frequency.value = Math.min(c.sampleRate * .45, 1800 + 12000 * (1 - e.damping));
            lp.Q.value = .5;
            p.pan.value = pan * e.width;
            root.connect(d);
            d.connect(lp);
            lp.connect(g);
            g.connect(p);
            p.connect(out);
            nodes.push(d, g, p, lp);
            early.push({ pan: p, base: pan, gain: g, amp });
        }
        return { root, out, nodes, wet, early, e, timer: null, dispose: () => { try {
                this.roomFeed.disconnect(root);
            }
            catch (_) { } for (const n of nodes)
                dis(n); } };
    }
    _worldPosition() { if (this.perspective === 'world')
        return this.position; const l = this.engine.listener, f = l.forward, u = l.up, r = [f[1] * u[2] - f[2] * u[1], f[2] * u[0] - f[0] * u[2], f[0] * u[1] - f[1] * u[0]], o = this.firstPersonOffset; return l.position.map((x, i) => x + r[i] * o[0] + u[i] * o[1] - f[i] * o[2]); }
    _spatial(immediate = false) {
        if (this._destroyed)
            return;
        const c = this.context, p = this._worldPosition(), l = this.engine.listener, delta = p.map((x, i) => x - l.position[i]), d = Math.hypot(...delta), first = this.perspective === 'firstPerson', r = this.rolloff * (this.distanceModel === 'game' ? .3 : 1), atten = first || this.distanceModel === 'none' ? 1 : 1 / (1 + r * (Math.max(1, d) - 1)), occ = Math.pow(10, -18 * this.occlusion / 20), cutoff = clamp(19500 * Math.exp(-.008 * (first ? 0 : d)) * (1 - .94 * this.occlusion), 300, c.sampleRate * .45), set = (param, v) => immediate ? param.value = v : ramp(param, v, c);
        this.distance = d;
        this.propagationSeconds = this.propagation && !first ? Math.min(29, d / this.engine.speedOfSound) : 0;
        set(this.distanceGain.gain, atten * occ);
        set(this.roomFeed.gain, Math.sqrt(atten) * Math.pow(10, -7 * this.occlusion / 20));
        set(this.air.frequency, cutoff);
        set(this.roomAir.frequency, cutoff);
        set(this.delay.delayTime, this.propagationSeconds);
        set(this.roomDelay.delayTime, this.propagationSeconds);
        if (this.panner.positionX)
            ['X', 'Y', 'Z'].forEach((axis, i) => set(this.panner['position' + axis], p[i]));
        else
            this.panner.setPosition(...p);
        const f = l.forward, u = l.up, right = [f[1] * u[2] - f[2] * u[1], f[2] * u[0] - f[0] * u[2], f[0] * u[1] - f[1] * u[0]], side = clamp(delta.reduce((n, x, i) => n + x * right[i], 0) / Math.max(1e-6, d), -1, 1);
        this.azimuth = Math.atan2(side, delta.reduce((n, x, i) => n + x * f[i], 0) / Math.max(1e-6, d));
        for (const tap of this._room?.early || [])
            set(tap.pan.pan, clamp(tap.base * this.environment.width + side * .25, -1, 1));
    }
    setPosition(x, y, z) { this._assert(); this.position = vector(Array.isArray(x) || ArrayBuffer.isView(x) ? x : [x, y, z]); this._spatial(); return this; }
    setDistance(distance, azimuth = 0, elevation = 0) { this._assert(); const d = clamp(number(distance, 'distance'), 0, 10000), a = number(azimuth, 'azimuth'), e = number(elevation, 'elevation'), l = this.engine.listener.position; return this.setPosition(l[0] + Math.sin(a) * d * Math.cos(e), l[1] + Math.sin(e) * d, l[2] - Math.cos(a) * d * Math.cos(e)); }
    setGain(v) { this._assert(); this.gain = clamp(number(v, 'gain'), 0, 2); ramp(this.input.gain, this.gain, this.context); ramp(this.roomInput.gain, this.gain, this.context); return this; }
    setOcclusion(v) { this._assert(); this.occlusion = clamp(number(v, 'occlusion'), 0, 1); this._spatial(); return this; }
    setDistanceModel(model, rolloff = this.rolloff) { this._assert(); const m = choice(model, ['inverse', 'game', 'none'], 'distanceModel'), r = clamp(number(rolloff, 'rolloff'), 0, 4); this.distanceModel = m; this.rolloff = r; this._spatial(); return this; }
    setPanningModel(model) { this._assert(); choice(model, ['HRTF', 'equalpower'], 'panningModel'); this.panningModel = model; this.panner.panningModel = model; return this; }
    setPerspective(mode, offset = this.firstPersonOffset) { this._assert(); const m = choice(mode, ['world', 'firstPerson'], 'perspective'), p = vector(offset); this.perspective = m; this.firstPersonOffset = p; this._spatial(); return this; }
    setSynth(patch) { this._assert(); this.synth = synthOptions({ ...this.synth, ...object(patch) }); return this; }
    setEffects(patch) { this._assert(); if (typeof patch === 'string')
        this.effects = effectsOptions(patch);
    else {
        const next = clone(this.effects);
        for (const [k, v] of Object.entries(object(patch).layers || {})) {
            choice(k, LAYERS, 'layer');
            next.layers[k] = mergeChain(next.layers[k], v);
        }
        this.effects = effectsOptions(next);
    } return this; }
    setLayerEffects(layer, patch) { return this.setEffects({ layers: { [layer]: patch } }); }
    setMixer(patch) { this._assert(); const next = clone(this.mixer); for (const [k, v] of Object.entries(object(patch))) {
        choice(k, LAYERS, 'layer');
        next[k] = { ...next[k], ...v };
    } this.mixer = mixerOptions(next); return this; }
    setSuppressor(value) { this._assert(); this.suppressor = suppressorOptions(typeof value === 'boolean' ? { ...this.suppressor, enabled: value } : { ...this.suppressor, ...value }); return this; }
    setWeapon(id) { this._assert(); weapon(id); this.stopAutomatic(); this.weapon = id; return this; }
    getCapabilities() { return capabilities(this.weapon); }
    setEnvironment(id, overrides = {}, options = {}) {
        this._assert();
        const next = environment(id, overrides), mode = choice(options.tailMode ?? this.tailMode, ['crossfade', 'natural'], 'tailMode'), old = this._room, shape = e => JSON.stringify([e.id, e.rt, e.damping, e.size, e.width]);
        this.tailMode = mode;
        if (old && shape(next) === shape(this.environment)) {
            this.environment = next;
            old.e = next;
            if (old.wet)
                ramp(old.wet.gain, next.wet, this.context);
            for (const t of old.early)
                ramp(t.gain.gain, t.amp * next.early, this.context);
            this._spatial();
            return this;
        }
        this.environment = next;
        this._room = this._buildRoom(next);
        this._spatial();
        if (old) {
            const t = this.context.currentTime;
            this._room.out.gain.setValueAtTime(0, t);
            this._room.out.gain.linearRampToValueAtTime(1, t + .06);
            if (mode === 'natural') {
                old.root.gain.setValueAtTime(1, t);
                old.root.gain.linearRampToValueAtTime(0, t + .015);
            }
            else {
                old.out.gain.setValueAtTime(old.out.gain.value, t);
                old.out.gain.linearRampToValueAtTime(0, t + .06);
            }
            this._oldRooms.add(old);
            const wait = mode === 'natural' ? this._tailDuration(old.e) + .1 : .12;
            old.timer = setTimeout(() => { old.dispose(); this._oldRooms.delete(old); }, wait * 1000);
            while (this._oldRooms.size > 4) {
                const first = this._oldRooms.values().next().value;
                clearTimeout(first.timer);
                first.dispose();
                this._oldRooms.delete(first);
            }
        }
        return this;
    }
    _tailDuration(e = this.environment) { return Math.max(e.wet > 0 ? e.rt * 1.12 + .08 : 0, e.early > 0 ? Math.max(0, ...e.paths.map(x => x[0] * e.size)) + .05 : 0); }
    update(patch = {}) { this._assert(); object(patch); /* Preflight the full merged state before touching any nodes. */ /* Preflight the full merged state before touching any nodes. */ const next = emitterOptions({ ...this.snapshot(), ...patch, synth: { ...this.synth, ...patch.synth }, suppressor: typeof patch.suppressor === 'boolean' ? patch.suppressor : { ...this.suppressor, ...patch.suppressor } }); if (next.weapon !== this.weapon)
        this.setWeapon(next.weapon); this.synth = next.synth; this.effects = next.effects; this.mixer = next.mixer; this.suppressor = next.suppressor; this.priority = next.priority; this.position = next.position; this.occlusion = next.occlusion; this.distanceModel = next.distanceModel; this.rolloff = next.rolloff; this.propagation = next.propagation; this.perspective = next.perspective; this.firstPersonOffset = next.firstPersonOffset; this.setGain(next.gain); this.setPanningModel(next.panningModel); this.setEnvironment(next.environment.id, next.environment, { tailMode: next.tailMode }); this._spatial(); return this; }
    _request(options = {}) { return resolveEvent({ weapon: this.weapon, sampleRate: this.context.sampleRate, synth: { ...this.synth, ...options.synth }, effects: options.effects ?? this.effects, mixer: options.mixer ?? this.mixer, suppressor: options.suppressor ?? this.suppressor, seed: options.seed === undefined ? randomSeed() : options.seed, kind: options.kind || 'shot', action: options.action, actionOptions: options.actionOptions, debugStems: options.debugStems ?? false, includeCasing: options.includeCasing ?? true, includeMechanics: options.includeMechanics ?? true, legacyTrigger: options.legacyTrigger ?? false }); }
    fire(options = {}) { this._assert(); this._checkRunning(); const start = clock(), data = synthesizeEvent(this._request(options)); return this._play(data, { ...options, synthMS: clock() - start }); }
    playAction(name, options = {}) { return this.fire({ ...options, kind: 'action', action: name }); }
    mechanics(options = {}) { return this.fire({ ...options, kind: 'mechanics' }); }
    async prepare(options = {}) { this._assert(); const request = this._request(options), start = clock(), data = await this.engine.prepareEvent(request, { signal: options.signal }); this._assert(); return { data, synthMS: clock() - start }; }
    async fireAsync(options = {}) { this._assert(); const abort = new AbortController(); this._pending.add(abort); const onAbort = () => abort.abort(); options.signal?.addEventListener('abort', onAbort, { once: true }); try {
        if (options.signal?.aborted)
            abort.abort();
        const p = await this.prepare({ ...options, signal: abort.signal });
        if (abort.signal.aborted)
            throw new Error('Event cancelled');
        return this.playPrepared(p, options);
    }
    finally {
        this._pending.delete(abort);
        options.signal?.removeEventListener('abort', onAbort);
    } }
    playPrepared(prepared, options = {}) { this._assert(); this._checkRunning(); if (!prepared?.data?.stems || prepared.data.sampleRate !== this.context.sampleRate)
        throw new TypeError('Prepared event/sampleRate mismatch'); return this._play(prepared.data, { ...options, synthMS: prepared.synthMS || 0 }); }
    _checkRunning() { if (this.context.state !== 'running' && !this.engine._offline)
        throw new Error('Call await engine.resume() from a user gesture first'); }
    _play(data, options = {}) {
        if (this._resetTimer) {
            clearTimeout(this._resetTimer);
            this._timers.delete(this._resetTimer);
            this._resetTimer = null;
            this.silence();
        }
        const c = this.context, now = c.currentTime, eventGain = clamp(number(options.gain ?? 1, 'event gain'), 0, 2), priority = clamp(number(options.priority ?? this.priority, 'priority'), -10, 10);
        let when = number(options.when ?? now + .006, 'when');
        if (when - now > 30)
            throw new RangeError('Schedule at most 30 seconds ahead');
        const late = choice(options.latePolicy ?? 'play', ['play', 'drop'], 'latePolicy');
        if (when < now - .025 && late === 'drop') {
            this.engine._stats.lateDropped++;
            return null;
        }
        when = Math.max(when, now + (this.engine._offline ? 0 : .002));
        if (options.position !== undefined || options.follow === false) {
            const pos = vector(options.position ?? this._worldPosition()), temp = this.engine.createEmitter({ ...this.snapshot(), id: undefined, _ephemeral: true, position: pos, perspective: 'world' });
            const h = temp._play(data, { ...options, when, position: undefined, follow: true });
            if (h)
                h.detached = true;
            else
                temp.dispose();
            return h;
        }
        while (this.engine.activeVoices >= this.engine.maxVoices)
            this.engine._stealVoice();
        const sources = [], gains = [], nodes = [], id = this.id + ':' + (++this._voiceSerial), end = when + data.duration, estimatedArrival = when + this.propagationSeconds + this.engine.latencySeconds, tailEnd = end + this.propagationSeconds + this._tailDuration() + this.engine.latencySeconds;
        const handle = { id, when, scheduledAt: now, audioStart: when, estimatedArrival, sourceEnd: end, estimatedTailEnd: tailEnd, seed: data.seed, duration: data.duration, weapon: data.weapon, kind: data.kind, action: data.action, data, synthMS: options.synthMS || 0, priority, stopped: false, stopping: false, sources, gainNodes: gains, emitter: this, positionAtStart: [...this._worldPosition()], get state() { return this.stopped ? 'ended' : c.currentTime < this.when ? 'scheduled' : c.currentTime < this.sourceEnd ? 'active' : 'tail'; }, stop: ({ immediate = false } = {}) => { if (handle.stopped || handle.stopping)
                return; handle.stopping = true; const t = c.currentTime; for (const g of gains) {
                g.gain.cancelScheduledValues(t);
                g.gain.setValueAtTime(g.gain.value, t);
                g.gain.linearRampToValueAtTime(0, t + (immediate ? 0 : .006));
            } for (const s of sources)
                try {
                    s.stop(t + (immediate ? 0 : .008));
                }
                catch (_) { } if (immediate)
                finish();
            else
                handle.sourceEnd = Math.min(handle.sourceEnd, t + .008); } };
        let remaining = 0, cleanupTimer = null;
        const finish = () => { if (handle.stopped)
            return; handle.stopped = true; clearTimeout(cleanupTimer); this._timers.delete(cleanupTimer); for (const n of nodes)
            dis(n); this.voices.delete(id); this.engine._voices.delete(id); this._emit('ended', handle); if (this._ephemeral && !this.voices.size)
            this.dispose(); };
        const ended = () => { if (--remaining > 0)
            return; for (const n of nodes)
            dis(n); const wait = () => { if (handle.stopped || this._destroyed)
            return; const delay = handle.estimatedTailEnd - c.currentTime; if (delay <= .01 || this.engine._offline) {
            finish();
            return;
        } cleanupTimer = setTimeout(() => { this._timers.delete(cleanupTimer); wait(); }, Math.min(1000, Math.max(30, delay * 1000))); this._timers.add(cleanupTimer); }; wait(); };
        const entries = Object.entries(data.stems);
        if (!entries.length)
            entries.push(['transient', new Float32Array(32)]);
        for (const [k, pcm] of entries) {
            const b = c.createBuffer(1, pcm.length, c.sampleRate);
            b.copyToChannel(pcm, 0);
            const source = c.createBufferSource(), g = c.createGain(), dry = c.createGain(), send = c.createGain(), mix = data.resolved.mixer[k];
            source.buffer = b;
            g.gain.value = eventGain;
            dry.gain.value = mix.direct;
            send.gain.value = mix.room;
            source.connect(g);
            g.connect(dry);
            g.connect(send);
            dry.connect(this.input);
            send.connect(this.roomInput);
            source.onended = ended;
            sources.push(source);
            gains.push(g);
            nodes.push(source, g, dry, send);
            remaining++;
        }
        handle.source = sources[0];
        handle.gainNode = gains[0];
        handle.renderSnapshot = { ...this.snapshot(), listener: clone(this.engine.listener), speedOfSound: this.engine.speedOfSound, limiter: clone(this.engine.limiterSettings), masterGain: this.engine.masterGain, ...clone(data.resolved), position: [...handle.positionAtStart], eventGain };
        this.voices.set(id, handle);
        this.engine._voices.set(id, handle);
        for (const s of sources)
            s.start(when);
        const stats = this.engine._stats;
        stats.events++;
        data.kind === 'shot' ? stats.shots++ : stats.actions++;
        stats.lastSynthMS = handle.synthMS;
        stats.maxSynthMS = Math.max(stats.maxSynthMS, handle.synthMS);
        this.engine._timeline.push({ id, emitter: this.id, sourceEnd: end, kind: data.kind, action: data.action, weapon: data.weapon, scheduledAt: now, audioStart: when, estimatedArrival, estimatedTailEnd: tailEnd, seed: data.seed, position: handle.positionAtStart });
        if (this.engine._timeline.length > 200)
            this.engine._timeline.shift();
        this._emit('event', handle);
        this.engine._emit('event', { emitter: this, handle });
        if (data.kind === 'shot') {
            this._emit('shot', handle);
            this.engine._emit('shot', { emitter: this, handle });
        }
        else {
            this._emit('action', handle);
            this.engine._emit('action', { emitter: this, handle });
        }
        return handle;
    }
    startAutomatic(options = {}) { this._assert(); if (!weapon(this.weapon).automatic)
        throw new Error('Profile does not support automatic playback'); return this._startSequence({ ...options, rpm: options.rpm ?? weapon(this.weapon).rpm, count: options.count ?? Infinity, triggerCues: options.triggerCues ?? true }); }
    startSequence(options = {}) { const interval = clamp(number(options.intervalMS ?? 500, 'intervalMS'), 40, 2000); return this._startSequence({ ...options, rpm: 60000 / interval, count: options.count ?? 5, triggerCues: false }); }
    _startSequence(options) {
        this._assert();
        this._checkRunning();
        const rpm = clamp(number(options.rpm, 'rpm'), 30, 1500), count = options.count ?? Infinity;
        if (count !== Infinity && (!Number.isInteger(count) || count < 1 || count > 10000))
            throw new RangeError('count: 1–10000');
        if (options.seed !== undefined)
            seedValue(options.seed);
        const triggerCues = bool(options.triggerCues ?? false, 'triggerCues');
        this.stopAutomatic();
        const useWorker = options.worker ?? this.engine.workerEnabled, session = { rpm, count, sent: 0, next: this.context.currentTime + (useWorker ? .16 : .025), handles: new Set(), timer: null, active: true, triggerCues, released: false, abort: new AbortController() };
        this._sequence = session;
        if (triggerCues)
            this.playAction('triggerPress', { seed: options.seed });
        const releaseCue = (when) => { if (triggerCues && !session.released) {
            session.released = true;
            if (!this._destroyed && this.context.state === 'running')
                this.playAction('triggerRelease', { when, seed: options.seed });
        } };
        session.releaseCue = releaseCue;
        const pump = () => {
            if (!session.active || this._destroyed)
                return;
            if (this.context.state !== 'running') {
                this.stopAutomatic();
                return;
            }
            const now = this.context.currentTime;
            if (session.next < now - .025) {
                const skipped = Math.max(1, Math.ceil((now - session.next) / (60 / session.rpm)));
                this.engine._stats.lateDropped += skipped;
                session.next = now + (useWorker ? .12 : .008);
            }
            let budget = 2;
            while (session.next < now + (useWorker ? .24 : .07) && session.sent < session.count && budget--) {
                const opt = { when: session.next, seed: options.seed === undefined ? undefined : (options.seed + session.sent) >>> 0, latePolicy: 'drop', legacyTrigger: false, signal: session.abort.signal };
                session.sent++;
                session.next += 60 / session.rpm;
                if (useWorker)
                    this.fireAsync(opt).then(h => { if (!h)
                        return; if (!session.active && session.sent < session.count) {
                        h.stop();
                        return;
                    } session.handles.add(h); }).catch(e => { if (!session.abort.signal.aborted)
                        this.engine._emit('error', e); });
                else {
                    const h = this.fire(opt);
                    if (h)
                        session.handles.add(h);
                }
                for (const h of session.handles)
                    if (h.stopped)
                        session.handles.delete(h);
            }
            if (session.sent >= session.count) {
                clearInterval(session.timer);
                session.timer = null;
                session.active = false;
                releaseCue(session.next);
                this._emit('sequenceend', { count: session.sent });
            }
        };
        session.timer = setInterval(pump, 20);
        pump();
        return { stop: () => this.stopAutomatic(), setRate: (v) => { session.rpm = clamp(number(v, 'rpm'), 30, 1500); }, get active() { return session.active; } };
    }
    stopAutomatic({ release = true } = {}) { const s = this._sequence; if (s) {
        s.active = false;
        clearInterval(s.timer);
        s.abort.abort();
        for (const h of s.handles)
            if (h.when > this.context.currentTime + .001)
                h.stop();
        this._sequence = null;
        if (release)
            s.releaseCue(this.context.currentTime + .006);
    } return this; }
    stop({ immediate = false } = {}) { this.stopAutomatic({ release: false }); for (const p of this._pending)
        p.abort(); this._pending.clear(); for (const v of [...this.voices.values()])
        v.stop({ immediate }); return this; }
    silence() { if (this._resetTimer) {
        clearTimeout(this._resetTimer);
        this._timers.delete(this._resetTimer);
        this._resetTimer = null;
    } this.stop({ immediate: true }); this._destroyGraph(); if (!this._destroyed)
        this._makeGraph(); return this; }
    snapshot() { return { weapon: this.weapon, position: [...this.position], gain: this.gain, occlusion: this.occlusion, distanceModel: this.distanceModel, rolloff: this.rolloff, propagation: this.propagation, panningModel: this.panningModel, perspective: this.perspective, firstPersonOffset: [...this.firstPersonOffset], tailMode: this.tailMode, priority: this.priority, synth: clone(this.synth), effects: clone(this.effects), mixer: clone(this.mixer), suppressor: clone(this.suppressor), environment: this.environment.id, room: clone(this.environment) }; }
    dispose() { if (this._destroyed)
        return; this._destroyed = true; this.stop({ immediate: true }); for (const t of this._timers)
        clearTimeout(t); this._timers.clear(); this._destroyGraph(); this.engine.emitters.delete(this.id); this._events.clear(); }
}
class SynthWorker {
    constructor() { if (typeof Worker === 'undefined')
        throw new Error('Workers unavailable'); this.pending = new Map(); this.serial = 0; this.disposed = false; const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' })); this.worker = new Worker(url); URL.revokeObjectURL(url); this.worker.onmessage = e => { const p = this.pending.get(e.data.id); if (!p)
        return; this.pending.delete(e.data.id); clearTimeout(p.timer); p.cleanup(); e.data.error ? p.reject(new Error(e.data.error)) : p.resolve(e.data.data); }; this.worker.onerror = e => { for (const p of this.pending.values()) {
        clearTimeout(p.timer);
        p.cleanup();
        p.reject(new Error(e.message || 'Worker failed'));
    } this.pending.clear(); }; }
    run(request, { signal } = {}) { if (this.disposed)
        return Promise.reject(new Error('Worker disposed')); if (signal?.aborted)
        return Promise.reject(new Error('Event cancelled')); if (this.pending.size >= 64)
        return Promise.reject(new Error('Worker queue full (64)')); const id = ++this.serial; return new Promise((resolve, reject) => { const abort = () => { const p = this.pending.get(id); if (!p)
        return; clearTimeout(p.timer); p.cleanup(); this.pending.delete(id); reject(new Error('Event cancelled')); }, cleanup = () => signal?.removeEventListener('abort', abort), timer = setTimeout(() => { const p = this.pending.get(id); if (p) {
        p.cleanup();
        this.pending.delete(id);
        reject(new Error('Worker synthesis timeout'));
    } }, 20000); this.pending.set(id, { resolve, reject, cleanup, timer }); signal?.addEventListener('abort', abort, { once: true }); this.worker.postMessage({ id, request, profile: weapon(request.weapon) }); }); }
    dispose() { if (this.disposed)
        return; this.disposed = true; this.worker.terminate(); for (const p of this.pending.values()) {
        clearTimeout(p.timer);
        p.cleanup();
        p.reject(new Error('Worker disposed'));
    } this.pending.clear(); }
}
const WORKLET_MODULES = new WeakMap();
class Engine extends Events {
    constructor(options = {}) {
        super();
        const maxVoices = clamp(Math.floor(number(options.maxVoices ?? 64, 'maxVoices')), 1, 256), speedOfSound = clamp(number(options.speedOfSound ?? 343, 'speedOfSound'), 250, 450), masterGain = clamp(number(options.masterGain ?? .28, 'masterGain'), 0, 1), limiterSettings = limiterOptions(options.limiter), workerEnabled = bool(options.worker ?? false, 'worker');
        const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
        if (!options.context && !AC)
            throw new Error('Web Audio API unavailable');
        this.context = options.context || new AC({ latencyHint: 'interactive' });
        this._ownsContext = !options.context;
        this._offline = typeof this.context.startRendering === 'function';
        this._destroyed = false;
        Object.assign(this, { maxVoices, speedOfSound, masterGain, limiterSettings, workerEnabled });
        this._serial = 0;
        this.emitters = new Map();
        this._voices = new Map();
        this._irCache = new Map();
        this._timeline = [];
        this._stats = { events: 0, shots: 0, actions: 0, lastSynthMS: 0, maxSynthMS: 0, lateDropped: 0, stolen: 0, irBuilds: 0, irHits: 0 };
        this._meter = { prePeak: 0, postPeak: 0, maxReductionDB: 0, postRMS: 0, crestDB: 0 };
        this._meterTotals = { prePeak: 0, postPeak: 0, maxReductionDB: 0, overCeiling: 0 };
        this.listener = { position: [0, 1.6, 0], forward: [0, 0, -1], up: [0, 1, 0] };
        const c = this.context;
        this.input = c.createGain();
        this.hp = c.createBiquadFilter();
        this.hp.type = 'highpass';
        this.hp.frequency.value = 22;
        this.hp.Q.value = .5;
        this.master = c.createGain();
        this.master.gain.value = this.masterGain;
        this.analyser = c.createAnalyser();
        this.analyser.fftSize = 2048;
        this.analyser.smoothingTimeConstant = .7;
        this.output = c.createGain();
        this.input.connect(this.hp);
        this.master.connect(this.analyser);
        this.analyser.connect(this.output);
        if (options.destination !== null)
            this.output.connect(options.destination || c.destination);
        this._workletInit = null;
        this._worker = null;
        if (this._offline) {
            this.hp.connect(this.master);
            this.backend = 'offline-postprocess';
            this.latencySeconds = this.limiterSettings.lookaheadMS * .001;
        }
        else
            this._fallbackLimiter();
        this.setListener(this.listener, true);
    }
    _assert() { if (this._destroyed)
        throw new Error('Engine disposed'); }
    _allocateID(id) { if (id !== undefined) {
        identifier(id);
        if (this.emitters.has(id))
            throw new Error('Emitter ID already exists: ' + id);
        return id;
    } let value; do
        value = 'source-' + (++this._serial);
    while (this.emitters.has(value)); return value; }
    _getIR(e) { const key = JSON.stringify([e.id, e.rt, e.damping, e.size, e.width, this.context.sampleRate]); if (this._irCache.has(key)) {
        this._stats.irHits++;
        return this._irCache.get(key);
    } const data = roomImpulse(e, this.context.sampleRate), b = this.context.createBuffer(2, data.left.length, this.context.sampleRate); b.copyToChannel(data.left, 0); b.copyToChannel(data.right, 1); this._irCache.set(key, b); this._stats.irBuilds++; while (this._irCache.size > 8)
        this._irCache.delete(this._irCache.keys().next().value); return b; }
    _receiveMeter(m) { this._meter = m; for (const k of ['prePeak', 'postPeak', 'maxReductionDB'])
        this._meterTotals[k] = Math.max(this._meterTotals[k], m[k] || 0); this._meterTotals.overCeiling += m.overCeiling || 0; this._emit('meter', m); }
    _fallbackLimiter() { const c = this.context; if (!c.createScriptProcessor)
        throw new Error('This browser requires AudioWorklet support'); this._limiterDSP = new LinkedPeakLimiter(c.sampleRate, this.limiterSettings); this.limiter = c.createScriptProcessor(1024, 2, 2); this.limiter.onaudioprocess = e => { if (this._destroyed)
        return; this._limiterDSP.process([e.inputBuffer.getChannelData(0), e.inputBuffer.getChannelData(1)], [e.outputBuffer.getChannelData(0), e.outputBuffer.getChannelData(1)]); this._receiveMeter(this._limiterDSP.readMeter(true)); }; this.hp.connect(this.limiter); this.limiter.connect(this.master); this.backend = 'scriptprocessor-fallback'; this.latencySeconds = this.limiterSettings.lookaheadMS * .001 + 1024 / c.sampleRate; }
    async _initWorklet() { if (this._offline || this.backend === 'audio-worklet')
        return; if (this._workletInit)
        return this._workletInit; if (!this.context.audioWorklet || typeof AudioWorkletNode === 'undefined')
        return; this._workletInit = (async () => { const code = LinkedPeakLimiter.toString() + `\nclass BlacklinePeak extends AudioWorkletProcessor{constructor(o){super();this.settings=o.processorOptions;this.dsp=new LinkedPeakLimiter(sampleRate,this.settings);this.frames=0;this.port.onmessage=e=>{if(e.data.reset)this.dsp=new LinkedPeakLimiter(sampleRate,this.settings);else{Object.assign(this.settings,e.data);this.dsp.configure(e.data);}};}process(inputs,outputs){const out=outputs[0];if(!out||!out.length)return true;this.dsp.process(inputs[0]||[],out);this.frames+=out[0].length;if(this.frames>=2048){this.port.postMessage(this.dsp.readMeter(true));this.frames=0;}return true;}}registerProcessor('blackline-peak',BlacklinePeak);`; const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' })); try {
        let registration = WORKLET_MODULES.get(this.context);
        if (!registration) {
            registration = this.context.audioWorklet.addModule(url);
            WORKLET_MODULES.set(this.context, registration);
        }
        await registration;
        if (this._destroyed)
            return;
        const node = new AudioWorkletNode(this.context, 'blackline-peak', { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2], channelCount: 2, channelCountMode: 'explicit', processorOptions: this.limiterSettings });
        node.port.onmessage = e => this._receiveMeter(e.data);
        node.onprocessorerror = () => { if (this._destroyed)
            return; this.hp.disconnect(); dis(node); node.port.close(); this._fallbackLimiter(); this._emit('backendfallback', { backend: this.backend, reason: 'AudioWorklet processor error' }); };
        this.hp.disconnect();
        this.limiter.onaudioprocess = null;
        dis(this.limiter);
        this.limiter = node;
        this.hp.connect(node);
        node.connect(this.master);
        this._limiterDSP = null;
        this.backend = 'audio-worklet';
        this.latencySeconds = this.limiterSettings.lookaheadMS * .001;
    }
    catch (e) {
        this._emit('backendfallback', { reason: e.message, backend: this.backend });
    }
    finally {
        URL.revokeObjectURL(url);
    } })(); return this._workletInit; }
    get activeVoices() { let n = 0; for (const v of this._voices.values())
        if (!v.stopped && !v.stopping && v.state !== 'tail')
            n++; return n; }
    get currentTime() { return this.context.currentTime; }
    get stats() { let scheduled = 0, active = 0, tails = 0; for (const v of this._voices.values()) {
        if (v.stopped)
            continue;
        v.state === 'scheduled' ? scheduled++ : v.state === 'active' ? active++ : tails++;
    } return { ...this._stats, voices: scheduled + active, scheduled, active, tails, emitters: [...this.emitters.values()].filter(x => !x._ephemeral).length, sampleRate: this.context.sampleRate, state: this.context.state, backend: this.backend, worker: this.workerEnabled && !!this._worker, workerQueue: this._worker?.pending.size || 0, latencySeconds: this.latencySeconds, irCached: this._irCache.size, limiter: { ...this._meter }, limiterTotals: { ...this._meterTotals } }; }
    get timeline() { return clone(this._timeline); }
    _stealVoice() { const candidates = [...this._voices.values()].filter(v => !v.stopped && !v.stopping && v.state !== 'tail').sort((a, b) => a.priority - b.priority || a.when - b.when); if (candidates[0]) {
        candidates[0].stop();
        this._stats.stolen++;
    } }
    async resume() { this._assert(); if (this._offline)
        return this; if (this.context.state !== 'running')
        await this.context.resume(); await this._initWorklet(); if (this.workerEnabled)
        this.setWorkerEnabled(true); return this; }
    async suspend() { this._assert(); this.stopAll(); if (!this._offline)
        await this.context.suspend(); return this; }
    createEmitter(options = {}) { this._assert(); emitterOptions(options); if (options.id !== undefined) {
        identifier(options.id);
        if (this.emitters.has(options.id))
            throw new Error('Emitter ID already exists');
    } const e = new Emitter(this, options); this.emitters.set(e.id, e); return e; }
    setListener(patch = {}, immediate = false) { this._assert(); const next = clone(this.listener); for (const k of ['position', 'forward', 'up'])
        if (patch[k] !== undefined)
            next[k] = vector(patch[k], k); for (const k of ['forward', 'up']) {
        const d = Math.hypot(...next[k]);
        if (d < 1e-6)
            throw new RangeError(k + ' cannot be zero');
        next[k] = next[k].map(v => v / d);
    } const f = next.forward, dot = next.up.reduce((n, x, i) => n + x * f[i], 0); if (Math.abs(dot) > .999)
        throw new RangeError('forward/up must not be parallel'); next.up = next.up.map((v, i) => v - dot * f[i]); const norm = Math.hypot(...next.up); next.up = next.up.map(v => v / norm); this.listener = next; const l = this.context.listener; for (const [prefix, key] of [['position', 'position'], ['forward', 'forward'], ['up', 'up']])
        for (let i = 0; i < 3; i++) {
            const p = l[prefix + 'XYZ'[i]];
            if (p)
                immediate ? p.value = next[key][i] : ramp(p, next[key][i], this.context, .01);
        } if (!l.positionX) {
        l.setPosition(...next.position);
        l.setOrientation(...next.forward, ...next.up);
    } for (const e of this.emitters.values())
        e._spatial(immediate); return this; }
    setMaxVoices(v) { this._assert(); this.maxVoices = clamp(Math.floor(number(v, 'maxVoices')), 1, 256); while (this.activeVoices > this.maxVoices)
        this._stealVoice(); return this; }
    setMasterGain(v) { this._assert(); this.masterGain = clamp(number(v, 'masterGain'), 0, 1); ramp(this.master.gain, this.masterGain, this.context); return this; }
    setSpeedOfSound(v) { this._assert(); this.speedOfSound = clamp(number(v, 'speedOfSound'), 250, 450); for (const e of this.emitters.values())
        e._spatial(); return this; }
    setLimiter(patch) { this._assert(); const next = limiterOptions({ ...this.limiterSettings, ...patch }); if (next.lookaheadMS !== this.limiterSettings.lookaheadMS)
        throw new Error('lookaheadMS is fixed at construction; create an Engine for another lookahead'); this.limiterSettings = next; this._limiterDSP?.configure(next); if (this.backend === 'audio-worklet')
        this.limiter.port.postMessage(next); return this; }
    setWorkerEnabled(v) { this._assert(); bool(v, 'worker'); if (v && !this._worker) {
        try {
            this._worker = new SynthWorker();
        }
        catch (e) {
            this.workerEnabled = false;
            this._emit('backendfallback', { backend: 'sync-synthesis', reason: e.message });
            return this;
        }
    } if (!v && this._worker) {
        this._worker.dispose();
        this._worker = null;
    } this.workerEnabled = v; return this; }
    async prepareEvent(request, { signal } = {}) { this._assert(); const r = resolveEvent({ ...request, sampleRate: request.sampleRate ?? this.context.sampleRate }); if (signal?.aborted)
        throw new Error('Event cancelled'); if (this.workerEnabled) {
        this.setWorkerEnabled(true);
        if (this._worker) {
            try {
                return await this._worker.run(r, { signal });
            }
            catch (e) {
                if (signal?.aborted || this._destroyed)
                    throw e;
                this._worker.dispose();
                this._worker = null;
                this.workerEnabled = false;
                this._emit('backendfallback', { backend: 'sync-synthesis', reason: e.message });
            }
        }
    } return synthesizeEvent(r); }
    stopAll({ tails = true, immediate = false } = {}) { this._assert(); for (const e of [...this.emitters.values()])
        if (tails && immediate)
            e.silence();
        else {
            e.stop({ immediate });
            if (tails) {
                const t = this.context.currentTime;
                e.spatialOut.gain.cancelScheduledValues(t);
                e.spatialOut.gain.setValueAtTime(e.spatialOut.gain.value, t);
                e.spatialOut.gain.linearRampToValueAtTime(0, t + .008);
                e._room.out.gain.cancelScheduledValues(t);
                e._room.out.gain.setValueAtTime(e._room.out.gain.value, t);
                e._room.out.gain.linearRampToValueAtTime(0, t + .008);
                if (e._resetTimer) {
                    clearTimeout(e._resetTimer);
                    e._timers.delete(e._resetTimer);
                }
                const timer = setTimeout(() => { e._timers.delete(timer); e._resetTimer = null; if (!e._destroyed)
                    e.silence(); }, 24);
                e._resetTimer = timer;
                e._timers.add(timer);
            }
        } if (immediate) {
        this._limiterDSP = new LinkedPeakLimiter(this.context.sampleRate, this.limiterSettings);
        if (this.backend === 'audio-worklet')
            this.limiter.port.postMessage({ reset: true });
    } return this; }
    emergencyStop() { return this.stopAll({ tails: true, immediate: true }); }
    snapshot() { return { schema: 'blackline.scene.v2', version: VERSION, engine: { maxVoices: this.maxVoices, speedOfSound: this.speedOfSound, limiter: clone(this.limiterSettings), worker: this.workerEnabled }, listener: clone(this.listener), masterGain: this.masterGain, emitters: [...this.emitters.values()].filter(e => !e._ephemeral).map(e => ({ id: e.id, ...e.snapshot() })) }; }
    loadSnapshot(snapshot, { allowMonitorIncrease = false } = {}) { this._assert(); const s = migrateScene(snapshot); if (s.engine.limiter.lookaheadMS !== this.limiterSettings.lookaheadMS)
        throw new Error('Snapshot uses another lookaheadMS; construct a matching Engine first'); /* Entire object validated before the existing scene is removed. */ /* Entire object validated before the existing scene is removed. */ for (const e of [...this.emitters.values()])
        e.dispose(); this.maxVoices = s.engine.maxVoices; this.setSpeedOfSound(s.engine.speedOfSound); this.setLimiter(s.engine.limiter); this.setWorkerEnabled(s.engine.worker); this.setListener(s.listener); this.setMasterGain(allowMonitorIncrease ? s.masterGain : Math.min(this.masterGain, s.masterGain)); for (const e of s.emitters)
        this.createEmitter(e); return this; }
    async dispose() { if (this._destroyed)
        return; for (const e of [...this.emitters.values()])
        e.dispose(); this._destroyed = true; this._worker?.dispose(); this._worker = null; if (this.limiter) {
        this.limiter.onaudioprocess = null;
        if (this.limiter.port) {
            this.limiter.port.onmessage = null;
            this.limiter.port.close();
        }
    } for (const n of [this.input, this.hp, this.limiter, this.master, this.analyser, this.output])
        dis(n); this._irCache.clear(); this._voices.clear(); this._events.clear(); if (this._ownsContext && this.context.state !== 'closed')
        await this.context.close(); }
}
function migrateScene(input) { const s = clone(object(input, 'snapshot')); if (!['blackline.scene.v1', 'blackline.scene.v2'].includes(s.schema))
    throw new RangeError('Unsupported scene schema'); const cfg = s.engine || {}; const result = { schema: 'blackline.scene.v2', version: VERSION, engine: { maxVoices: clamp(Math.floor(number(cfg.maxVoices ?? 64, 'maxVoices')), 1, 256), speedOfSound: clamp(number(cfg.speedOfSound ?? 343, 'speedOfSound'), 250, 450), limiter: limiterOptions(cfg.limiter), worker: bool(cfg.worker ?? false, 'worker') }, masterGain: clamp(number(s.masterGain ?? .28, 'masterGain'), 0, 1), listener: { position: vector(s.listener?.position ?? [0, 1.6, 0]), forward: vector(s.listener?.forward ?? [0, 0, -1]), up: vector(s.listener?.up ?? [0, 1, 0]) }, emitters: [] }; const f = result.listener.forward, u = result.listener.up, lf = Math.hypot(...f), lu = Math.hypot(...u); if (lf < 1e-6 || lu < 1e-6 || Math.abs(f.reduce((n, x, i) => n + x * u[i], 0) / (lf * lu)) > .999)
    throw new RangeError('Invalid listener basis'); if (!Array.isArray(s.emitters) || s.emitters.length > 256)
    throw new RangeError('emitters: array of at most 256'); const ids = new Set(); for (const e of s.emitters) {
    const id = identifier(e.id);
    if (ids.has(id))
        throw new Error('Duplicate emitter ID');
    ids.add(id);
    const opts = emitterOptions(e);
    result.emitters.push({ ...opts, id, environment: opts.environment.id, room: opts.environment });
} return result; }

class PCMBuffer {
    constructor(channels, sampleRate) { this.numberOfChannels = channels.length; this.length = channels[0].length; this.sampleRate = sampleRate; this.duration = this.length / sampleRate; this._channels = channels; }
    getChannelData(i) { if (!this._channels[i])
        throw new RangeError('Unknown channel'); return this._channels[i]; }
    copyFromChannel(dest, i, offset = 0) { dest.set(this.getChannelData(i).subarray(offset, offset + dest.length)); }
}
function aborted(signal) { if (signal?.aborted)
    throw new Error('Render cancelled'); }
async function renderShot(options = {}) {
    object(options, 'render');
    const sr = sampleRateValue(options.sampleRate ?? 48000), stage = options.stage || 'scene', rawStage = stage.startsWith('raw:'), weightedStage = stage.startsWith('weighted:'), stemStage = stage.startsWith('stem:'), signal = options.signal;
    aborted(signal);
    if (!['scene', 'dry', 'wet', 'source'].includes(stage) && !rawStage && !weightedStage && !stemStage)
        throw new RangeError('Unknown render stage');
    const data = synthesizeEvent({ ...options, sampleRate: sr, debugStems: rawStage || weightedStage || options.debugStems === true });
    if (stage === 'source' || rawStage || weightedStage || stemStage) {
        let pcm = data.pcm;
        if (stage !== 'source') {
            const key = choice(stage.split(':')[1], LAYERS, 'stem'), source = rawStage ? data.rawStems : weightedStage ? data.weightedStems : data.stems;
            pcm = source[key] || new Float32Array(data.pcm.length);
        }
        aborted(signal);
        return { buffer: new PCMBuffer([pcm.slice()], sr), event: data, metrics: measure(pcm), metadata: { version: VERSION, stage, sampleRate: sr, seed: data.seed, kind: data.kind, action: data.action, monitorApplied: false } };
    }
    return renderSequence([{ at: options.at ?? .01, ...options, _data: data }], { ...options, sampleRate: sr, stage });
}
async function renderSequence(events, options = {}) {
    if (!Array.isArray(events) || !events.length || events.length > 128)
        throw new RangeError('events: 1–128');
    const sr = sampleRateValue(options.sampleRate ?? 48000), stage = choice(options.stage || 'scene', ['scene', 'dry', 'wet'], 'stage'), signal = options.signal, limiter = limiterOptions(options.limiter), speed = clamp(number(options.speedOfSound ?? 343, 'speedOfSound'), 250, 450), master = clamp(number(options.masterGain ?? .28, 'masterGain'), 0, 1), listener = options.listener || { position: [0, 1.6, 0], forward: [0, 0, -1], up: [0, 1, 0] }, lp = vector(listener.position || [0, 1.6, 0]);
    aborted(signal);
    const entries = events.map(ev => { const config = { ...options, ...ev }, at = clamp(number(ev.at ?? .01, 'at'), 0, 60), data = ev._data || synthesizeEvent({ ...config, sampleRate: sr }), e = environment(config.environment || 'field', config.room), p = vector(config.position || [0, 1.6, -1]), distance = Math.hypot(...p.map((x, i) => x - lp[i])), prop = config.propagation !== false && config.perspective !== 'firstPerson' ? Math.min(29, distance / speed) : 0, tail = stage === 'dry' ? 0 : Math.max(e.wet > 0 ? e.rt * 1.12 + .08 : 0, e.early > 0 ? Math.max(0, ...e.paths.map(x => x[0] * e.size)) + .05 : 0); return { config, at, data, end: at + data.duration + prop + tail + .12 }; });
    const duration = Math.max(...entries.map(x => x.end));
    if (duration > 90)
        throw new RangeError('Offline scene exceeds 90 seconds');
    const OAC = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
    if (!OAC)
        throw new Error('Scene rendering requires OfflineAudioContext; source/stem rendering also works in Node');
    const context = new OAC(2, Math.ceil(duration * sr), sr);
    let engine;
    try {
        engine = new Engine({ context, masterGain: 1, speedOfSound: speed, maxVoices: Math.max(64, entries.length), limiter });
        engine.setListener(listener, true);
        for (const e of entries) {
            const emitter = engine.createEmitter(e.config);
            emitter._spatial(true);
            const data = e.data;
            if (stage !== 'scene') {
                const mix = clone(data.resolved.mixer);
                for (const k of LAYERS)
                    mix[k][stage === 'dry' ? 'room' : 'direct'] = 0;
                e.data = { ...data, resolved: { ...data.resolved, mixer: mix } };
            }
            emitter._play(e.data, { when: e.at, gain: e.config.eventGain ?? 1 });
        }
        aborted(signal);
        const pre = await context.startRendering();
        aborted(signal);
        const limited = limitPCM([pre.getChannelData(0), pre.getChannelData(1)], sr, limiter);
        for (const a of limited.channels)
            for (let i = 0; i < a.length; i++)
                a[i] *= master;
        const buffer = new PCMBuffer(limited.channels, sr);
        return { buffer, event: entries[0].data, events: entries.map(x => x.data), metrics: limited.metrics, outputMetrics: measure(limited.channels), metadata: { version: VERSION, stage, sampleRate: sr, seed: entries[0].data.seed, kind: entries[0].data.kind, action: entries[0].data.action, eventCount: entries.length, speedOfSound: speed, limiter, latencySamples: limited.latencySamples, monitorApplied: true, monitorGain: master, staticRerender: true } };
    }
    finally {
        if (engine)
            await engine.dispose();
    }
}
function encodeWAV(buffer, options = {}) { object(options); const format = choice(options.format ?? 'pcm16', ['pcm16', 'float32'], 'format'), dither = bool(options.dither ?? false, 'dither'), channels = buffer.numberOfChannels, sr = sampleRateValue(buffer.sampleRate), length = buffer.length; if (!Number.isInteger(channels) || channels < 1 || channels > 8 || !Number.isInteger(length) || length < 1)
    throw new TypeError('Invalid PCM buffer'); const bytes = format === 'float32' ? 4 : 2, metadata = options.metadata ? new TextEncoder().encode(JSON.stringify(options.metadata) + '\0') : null, listSize = metadata ? 12 + metadata.length + (metadata.length % 2) : 0, factSize = format === 'float32' ? 12 : 0, offset = 44 + factSize + (metadata ? 8 + listSize : 0), dataSize = length * channels * bytes; if (dataSize + offset > 0xffffffff)
    throw new RangeError('WAV exceeds RIFF limit'); const result = new ArrayBuffer(offset + dataSize), view = new DataView(result), str = (at, s) => { for (let i = 0; i < s.length; i++)
    view.setUint8(at + i, s.charCodeAt(i)); }; str(0, 'RIFF'); view.setUint32(4, result.byteLength - 8, true); str(8, 'WAVE'); str(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, format === 'float32' ? 3 : 1, true); view.setUint16(22, channels, true); view.setUint32(24, sr, true); view.setUint32(28, sr * channels * bytes, true); view.setUint16(32, channels * bytes, true); view.setUint16(34, bytes * 8, true); let at = 36; if (factSize) {
    str(at, 'fact');
    view.setUint32(at + 4, 4, true);
    view.setUint32(at + 8, length, true);
    at += 12;
} if (metadata) {
    str(at, 'LIST');
    view.setUint32(at + 4, listSize, true);
    str(at + 8, 'INFO');
    str(at + 12, 'ICMT');
    view.setUint32(at + 16, metadata.length, true);
    new Uint8Array(result, at + 20, metadata.length).set(metadata);
    at += 8 + listSize;
} str(at, 'data'); view.setUint32(at + 4, dataSize, true); at += 8; const data = Array.from({ length: channels }, (_, i) => buffer.getChannelData(i)), random = rng(seedValue(options.seed ?? 1)); for (let i = 0; i < length; i++)
    for (let ch = 0; ch < channels; ch++) {
        let x = data[ch][i];
        if (!Number.isFinite(x))
            throw new TypeError('Non-finite PCM');
        if (format === 'float32') {
            view.setFloat32(at, x, true);
            at += 4;
        }
        else {
            if (dither)
                x += (random() - random()) / 32768;
            x = clamp(x, -1, 1);
            view.setInt16(at, Math.round(x < 0 ? x * 32768 : x * 32767), true);
            at += 2;
        }
    } return result; }

const WORKER_SOURCE="'use strict';\nconst VERSION = '0.4.0';\nconst catalogue = [{\"id\":\"g17\",\"name\":\"GLOCK 17 Gen5\",\"shortName\":\"G17\",\"category\":\"Pistolen\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":202,\"barrelMM\":114,\"shape\":\"glock\",\"sources\":[{\"title\":\"GLOCK 17 Gen5 — Hersteller\",\"url\":\"https://eu.glock.com/en/products/pistols/g17-gen5\"}],\"checked\":\"2026-10-23\",\"heightMM\":139,\"widthMM\":34,\"massG\":null,\"massNote\":\"\",\"capacity\":17,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":139,\"description\":\"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.\"},{\"id\":\"g19\",\"name\":\"GLOCK 19 Gen5\",\"shortName\":\"G19\",\"category\":\"Pistolen\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":185,\"barrelMM\":102,\"shape\":\"glock\",\"sources\":[{\"title\":\"GLOCK 19 Gen5 — Hersteller\",\"url\":\"https://eu.glock.com/en/products/pistols/g19-gen5\"}],\"checked\":\"2026-10-23\",\"heightMM\":128,\"widthMM\":34,\"massG\":null,\"massNote\":\"\",\"capacity\":15,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":128,\"description\":\"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.\"},{\"id\":\"g26\",\"name\":\"GLOCK 26 Gen5\",\"shortName\":\"G26\",\"category\":\"Pistolen\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":163,\"barrelMM\":87,\"shape\":\"glock\",\"sources\":[{\"title\":\"GLOCK 26 Gen5 — Hersteller\",\"url\":\"https://eu.glock.com/en/products/pistols/g26-gen5\"}],\"checked\":\"2026-10-23\",\"heightMM\":106,\"widthMM\":33,\"massG\":null,\"massNote\":\"\",\"capacity\":10,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":106,\"description\":\"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.\"},{\"id\":\"g34\",\"name\":\"GLOCK 34 Gen5 MOS\",\"shortName\":\"G34\",\"category\":\"Pistolen\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":222,\"barrelMM\":135,\"shape\":\"glock\",\"sources\":[{\"title\":\"GLOCK 34 Gen5 MOS — Hersteller\",\"url\":\"https://eu.glock.com/en/products/pistols/g34-gen5-mos\"}],\"checked\":\"2026-10-23\",\"heightMM\":139,\"widthMM\":34,\"massG\":null,\"massNote\":\"\",\"capacity\":17,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":139,\"description\":\"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.\"},{\"id\":\"g43x\",\"name\":\"GLOCK 43X MOS\",\"shortName\":\"G43X\",\"category\":\"Pistolen\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":165,\"barrelMM\":87,\"shape\":\"glock\",\"sources\":[{\"title\":\"GLOCK 43X MOS — Hersteller\",\"url\":\"https://eu.glock.com/en/products/pistols/g43x-mos\"}],\"checked\":\"2026-10-23\",\"heightMM\":128,\"widthMM\":28,\"massG\":null,\"massNote\":\"\",\"capacity\":10,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":128,\"description\":\"Polymerrahmen, geradliniger Schlitten und modellabhängige Griff- und Schlittenproportionen.\"},{\"id\":\"beretta92\",\"name\":\"Beretta 92FS\",\"shortName\":\"92FS\",\"category\":\"Pistolen\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":217,\"barrelMM\":125,\"shape\":\"beretta\",\"sources\":[{\"title\":\"Beretta — 90 Series, technische Daten S. 19 (PDF-Seite 21)\",\"url\":\"https://www.beretta.com/content/dam/beretta-usa/user-manuals/90_Series_Manual.pdf\"}],\"checked\":\"2026-10-23\",\"heightMM\":137,\"widthMM\":38,\"massG\":975,\"massNote\":\"Unbeladen, ca.; laut 90-Series-Handbuch\",\"capacity\":15,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":137,\"description\":\"Offene Schlittenkontur, außenliegender Hahn und getrennte Griffschalen. Klassische 92FS-Ausführung.\"},{\"id\":\"p226\",\"name\":\"SIG SAUER P226 MK25\",\"shortName\":\"P226\",\"category\":\"Pistolen\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":196,\"barrelMM\":112,\"shape\":\"sig\",\"sources\":[{\"title\":\"SIG SAUER — P226 MK25\",\"url\":\"https://www.sigsauer.com/p226-mk25-full-size.html\"}],\"checked\":\"2026-10-23\",\"heightMM\":140,\"widthMM\":38,\"massG\":964,\"massNote\":\"Herstellerangabe: 34 oz / 964 g\",\"capacity\":15,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":140,\"description\":\"MK25 ohne verlängerten Gewindelauf. Metallrahmen, außenliegender Hahn und Zubehörschiene.\"},{\"id\":\"colt1911\",\"name\":\"Colt 1911 Classic\",\"shortName\":\"1911\",\"category\":\"Pistolen\",\"caliber\":\".45 ACP\",\"action\":\"Halbautomatisch\",\"lengthMM\":216,\"barrelMM\":127,\"shape\":\"colt\",\"sources\":[{\"title\":\"Colt — 1911 Classic\",\"url\":\"https://www.colt.com/detail-page/classic/\"},{\"title\":\"American Rifleman — eigener First Look / Maßangaben\",\"url\":\"https://www.americanrifleman.org/content/video-first-look-colt-1911-classic-pistol/\"}],\"checked\":\"2026-10-23\",\"heightMM\":133.4,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":7,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Länge aus 8,5 Zoll, Höhe aus 5,25 Zoll umgerechnet; Außenkontur illustrativ.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":133.4,\"description\":\"Government-Format mit 5-Zoll-Lauf, schmalem Griff, außenliegendem Hahn und klassischem Schlitten.\"},{\"id\":\"sw686\",\"name\":\"S&W 686 Performance Center · 4″\",\"shortName\":\"686 PC\",\"category\":\"Revolver\",\"caliber\":\".357 Magnum\",\"action\":\"Revolver · SA/DA\",\"lengthMM\":241,\"barrelMM\":101.6,\"shape\":\"revolver\",\"sources\":[{\"title\":\"Smith & Wesson — SKU 11759, Herstellerdatenblatt\",\"url\":\"https://assets.contentstack.io/v3/assets/bltb61dcb3c40854cd9/bltc15fcc08eebd6d78/64d533011519f03f1e46805e/11759_pc686_specsheet.pdf\"}],\"checked\":\"2026-10-23\",\"heightMM\":152.4,\"widthMM\":39.4,\"massG\":1075,\"massNote\":\"Herstellerdatenblatt\",\"capacity\":6,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":152.4,\"description\":\"Konkrete PC-Ausführung 11759 mit ungefluteter Trommel. Kein automatischer Hülsenauswurf beim Schuss.\"},{\"id\":\"luger\",\"name\":\"Luger Pistole 08 · Museumsprofil\",\"shortName\":\"P08\",\"category\":\"Historisch\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halbautomatisch\",\"lengthMM\":224,\"barrelMM\":null,\"shape\":\"luger\",\"sources\":[{\"title\":\"Imperial War Museums — Pistole 08, Objekt 30032386\",\"url\":\"https://www.iwm.org.uk/collections/item/object/30032386\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":8,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"224 mm: Länge des IWM-Objekts. Höhe und Laufmaß hier nicht als verifizierte Maße geführt.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":140,\"description\":\"Kniegelenkverschluss und markant geneigter Griff. Länge des referenzierten Museumsobjekts; nicht auf alle P08-Varianten übertragbar.\"},{\"id\":\"mp5\",\"name\":\"Heckler & Koch MP5A3\",\"shortName\":\"MP5A3\",\"category\":\"Automatisch\",\"caliber\":\"9 × 19 mm\",\"action\":\"Halb- / vollautomatisch\",\"lengthMM\":680,\"barrelMM\":225,\"shape\":\"mp5\",\"sources\":[{\"title\":\"Small Arms Survey / Royal Armouries — MP5A3\",\"url\":\"https://www.smallarmssurvey.org/sites/default/files/SAS-weapons-sub-machine-guns-Heckler-Koch-MP5.pdf\"},{\"title\":\"Heckler & Koch — MP5\",\"url\":\"https://www.heckler-koch.com/en/Products/Military%20and%20Law%20Enforcement/Submachine%20guns/MP5\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":30,\"automatic\":true,\"rpm\":800,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":260,\"description\":\"MP5A3 mit ausgezogener Schulterstütze. 680 mm laut referenziertem Datenblatt. Keine SD-Ausführung.\"},{\"id\":\"m4a1\",\"name\":\"FN M4A1 · 14,5″\",\"shortName\":\"M4A1\",\"category\":\"Automatisch\",\"caliber\":\"5,56 × 45 mm\",\"action\":\"Halb- / vollautomatisch\",\"lengthMM\":838.2,\"barrelMM\":368.3,\"shape\":\"m4\",\"sources\":[{\"title\":\"FN America — M4A1\",\"url\":\"https://fnamerica.com/products/rifles/fn-m4a1/\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":30,\"automatic\":true,\"rpm\":825,\"dimensionNote\":\"29,75–33 Zoll Gesamtlänge; Ansicht nutzt 33 Zoll. Weitere Konturdetails illustrativ.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"lengthMinMM\":755.7,\"rpmNote\":\"Profilwert 825; Herstellerbereich 700–950/min\",\"visualHeight\":265,\"description\":\"M4A1, nicht das zivile FN-15-Modell. Ansicht mit ausgezogener Schulterstütze und kurzer Gewehrkontur.\"},{\"id\":\"akm\",\"name\":\"AKM · Festkolben\",\"shortName\":\"AKM\",\"category\":\"Automatisch\",\"caliber\":\"7,62 × 39 mm\",\"action\":\"Halb- / vollautomatisch\",\"lengthMM\":880,\"barrelMM\":415,\"shape\":\"ak\",\"sources\":[{\"title\":\"Imperial War Museums — AKM\",\"url\":\"https://www.iwm.org.uk/collections/item/object/30029524\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":null,\"automatic\":true,\"rpm\":600,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"rpmNote\":\"600/min: gestalteter Wiedergabetakt, hier nicht messtechnisch bestätigt\",\"visualHeight\":275,\"description\":\"Festkolben, langes Gasrohr und stark gekrümmte Magazinkontur. Außenlänge und Laufmaß des IWM-Referenzobjekts.\"},{\"id\":\"g36\",\"name\":\"Heckler & Koch G36\",\"shortName\":\"G36\",\"category\":\"Automatisch\",\"caliber\":\"5,56 × 45 mm\",\"action\":\"Halb- / vollautomatisch\",\"lengthMM\":null,\"barrelMM\":480,\"shape\":\"g36\",\"sources\":[{\"title\":\"Bundeswehr — G36, technische Daten\",\"url\":\"https://www.bundeswehr.de/de/ausruestung-technik-bundeswehr/ausruestung-bewaffnung/gewehr-g36\"},{\"title\":\"Heckler & Koch — G36\",\"url\":\"https://www.heckler-koch.com/en/Products/Military%20and%20Law%20Enforcement/Assault%20rifles/G36\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":30,\"automatic\":true,\"rpm\":750,\"dimensionNote\":\"Gesamtlänge und Höhe nicht aus der verwendeten Primärquelle verifiziert. Zeichenlänge 1000 mm ist eine Annahme; keine bestätigte Maßansicht.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualLength\":1000,\"visualHeight\":320,\"description\":\"Lange G36-Konfiguration mit ausgeklappter Schulterstütze und charakteristischem Tragebügel.\"},{\"id\":\"p90\",\"name\":\"FN P90 Standard\",\"shortName\":\"P90\",\"category\":\"Automatisch\",\"caliber\":\"5,7 × 28 mm\",\"action\":\"Halb- / vollautomatisch\",\"lengthMM\":505,\"barrelMM\":264.15,\"shape\":\"p90\",\"sources\":[{\"title\":\"FN Herstal — P90, technisches Datenblatt\",\"url\":\"https://fnherstal.com/app/uploads/technical-data-fn-p90_0.pdf\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":2800,\"massNote\":\"Ca., mit leerem Magazin; Standard-Ausführung\",\"capacity\":50,\"automatic\":true,\"rpm\":950,\"dimensionNote\":\"Außenkontur illustrativ; keine CAD- oder Fertigungszeichnung.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"rpmNote\":\"Profilwert 950; Herstellerbereich 850–1100/min\",\"visualHeight\":210,\"description\":\"Kompakte Bullpup-Kontur mit horizontalem Magazin oberhalb des Gehäuses. Standard-Ausführung, nicht PS90.\"},{\"id\":\"thompson\",\"name\":\"Thompson M1A1\",\"shortName\":\"M1A1\",\"category\":\"Historisch\",\"caliber\":\".45 ACP\",\"action\":\"Halb- / vollautomatisch\",\"lengthMM\":810,\"barrelMM\":267,\"shape\":\"thompson\",\"sources\":[{\"title\":\"Royal Armouries — Thompson M1A1, Objekt 277959\",\"url\":\"https://royalarmouries.org/collection/object/object-277959\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":null,\"automatic\":true,\"rpm\":700,\"dimensionNote\":\"810 mm Gesamtlänge und 267 mm Lauf: referenziertes Royal-Armouries-Objekt. Andere Exemplare können abweichen; Kontur illustrativ.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"rpmNote\":\"Gestalteter Wiedergabetakt; kein verifizierter Messwert\",\"visualLength\":810,\"visualHeight\":265,\"description\":\"Vereinfachte historische M1A1-Kontur mit Kastenmagazin und horizontalem Vorderschaft; keine 1928-Trommelvariante.\"},{\"id\":\"garand\",\"name\":\"M1 Garand · Museumsprofil\",\"shortName\":\"M1 GARAND\",\"category\":\"Historisch\",\"caliber\":\".30-06 Springfield\",\"action\":\"Halbautomatisch\",\"lengthMM\":1110,\"barrelMM\":null,\"shape\":\"garand\",\"sources\":[{\"title\":\"Imperial War Museums — M1 Garand FIR 6319\",\"url\":\"https://www.iwm.org.uk/collections/item/object/30036169\"},{\"title\":\"National Park Service — M1 Garand\",\"url\":\"https://www.nps.gov/spar/learn/historyculture/u-s-m1-garand-rifle-production.htm\"}],\"checked\":\"2026-10-23\",\"heightMM\":190,\"widthMM\":60,\"massG\":null,\"massNote\":\"\",\"capacity\":8,\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"1110 × 190 × 60 mm: gerundete IWM-Objektmaße. Kein maßhaltiges 3D-Modell.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":190,\"description\":\"Historische Holzschaftkontur ohne herausragendes Kastenmagazin. Maße des referenzierten Museumsobjekts.\"},{\"id\":\"mossberg590\",\"name\":\"Mossberg 590 · 9-Shot / 50693\",\"shortName\":\"590\",\"category\":\"Flinten\",\"caliber\":\"12 Gauge\",\"action\":\"Vorderschaftrepetierer\",\"lengthMM\":1041.4,\"barrelMM\":508,\"shape\":\"shotgun\",\"sources\":[{\"title\":\"Mossberg — 590 9-Shot, SKU 50693\",\"url\":\"https://www.mossberg.com/590-9-shot-50693.html\"}],\"checked\":\"2026-10-23\",\"heightMM\":null,\"widthMM\":null,\"massG\":null,\"massNote\":\"\",\"capacity\":\"8 + 1\",\"automatic\":false,\"rpm\":null,\"dimensionNote\":\"Gesamtlänge 41 Zoll; Lauf 20 Zoll. Höhe der Illustration angenähert.\",\"audioNote\":\"Gestaltetes Klangprofil, nicht mit Originalmessungen kalibriert.\",\"visualHeight\":190,\"description\":\"20-Zoll-Konfiguration mit Röhrenmagazin und Vorderschaft. Pumpgeräusch wird getrennt über „Mechanik“ ausgelöst, nicht automatisch nach jedem Schuss.\"},{\"id\":\"barrett82\",\"name\":\"Barrett M82A1 · 29″\",\"shortName\":\"M82A1\",\"category\":\"Präzisionsgewehre\",\"caliber\":\".50 BMG\",\"action\":\"Halbautomatisch\",\"automatic\":false,\"rpm\":null,\"rpmNote\":\"\",\"lengthMM\":1448,\"barrelMM\":737,\"heightMM\":null,\"widthMM\":null,\"massG\":14800,\"massNote\":\"Herstellerangabe für die 29-Zoll-Variante\",\"capacity\":10,\"visualLength\":1448,\"visualHeight\":310,\"shape\":\"barrett\",\"description\":\"Lange Außenkontur mit markanter Mündungsbremse, Zweibein und großem Gehäuse. Audio-Designprofil, keine vermessene Signatur.\",\"dimensionNote\":\"Gesamtlänge und Lauf laut Hersteller. Höhe der Illustration gestalterisch angenähert; kein CAD-Modell.\",\"audioNote\":\"Gestaltetes Klangprofil. Schalldämpfer-Modus ist ein Spieleffekt, keine Aussage über reale Kompatibilität.\",\"checked\":\"2026-10-23\",\"sources\":[{\"title\":\"Barrett — Model 82A1, Herstellerdaten\",\"url\":\"https://barrett.net/products/firearms/model-82a1/\"}]}];\nconst SOUND_DESIGN = {\"g17\":{\"family\":\"pistol9\",\"frontMS\":0.5,\"edge\":1.0,\"body\":1.0,\"tail\":1.0,\"mechanism\":\"striker\"},\"g19\":{\"family\":\"pistol9\",\"frontMS\":0.46,\"edge\":1.04,\"body\":0.95,\"tail\":0.97,\"mechanism\":\"striker\"},\"g26\":{\"family\":\"pistol9\",\"frontMS\":0.41,\"edge\":1.1,\"body\":0.91,\"tail\":0.92,\"mechanism\":\"striker\"},\"g34\":{\"family\":\"pistol9\",\"frontMS\":0.56,\"edge\":0.94,\"body\":1.04,\"tail\":1.05,\"mechanism\":\"striker\"},\"g43x\":{\"family\":\"pistol9\",\"frontMS\":0.42,\"edge\":1.07,\"body\":0.91,\"tail\":0.93,\"mechanism\":\"striker\"},\"beretta92\":{\"family\":\"pistol9\",\"frontMS\":0.54,\"edge\":0.98,\"body\":1.03,\"tail\":1.02,\"mechanism\":\"hammer\"},\"p226\":{\"family\":\"pistol9\",\"frontMS\":0.52,\"edge\":1.01,\"body\":1.07,\"tail\":1.04,\"mechanism\":\"hammer\"},\"colt1911\":{\"family\":\"pistol45\",\"frontMS\":0.78,\"edge\":0.85,\"body\":1.15,\"tail\":1.15,\"mechanism\":\"hammer\"},\"sw686\":{\"family\":\"magnum\",\"frontMS\":0.6,\"edge\":1.12,\"body\":1.08,\"tail\":1.08,\"mechanism\":\"revolver\"},\"luger\":{\"family\":\"pistol9\",\"frontMS\":0.53,\"edge\":0.98,\"body\":1.02,\"tail\":0.98,\"mechanism\":\"toggle\"},\"mp5\":{\"family\":\"smg9\",\"frontMS\":0.64,\"edge\":0.92,\"body\":1.0,\"tail\":0.92,\"mechanism\":\"roller\"},\"m4a1\":{\"family\":\"rifle556\",\"frontMS\":0.48,\"edge\":1.25,\"body\":0.95,\"tail\":1.12,\"mechanism\":\"rifle\"},\"akm\":{\"family\":\"rifle762\",\"frontMS\":0.72,\"edge\":1.05,\"body\":1.12,\"tail\":1.2,\"mechanism\":\"rifleHeavy\"},\"g36\":{\"family\":\"rifle556\",\"frontMS\":0.59,\"edge\":1.12,\"body\":1.06,\"tail\":1.1,\"mechanism\":\"rifle\"},\"p90\":{\"family\":\"pdw\",\"frontMS\":0.36,\"edge\":1.13,\"body\":0.78,\"tail\":0.83,\"mechanism\":\"compact\"},\"thompson\":{\"family\":\"pistol45\",\"frontMS\":0.84,\"edge\":0.81,\"body\":1.15,\"tail\":1.06,\"mechanism\":\"openBolt\"},\"garand\":{\"family\":\"rifleFull\",\"frontMS\":0.88,\"edge\":1.12,\"body\":1.23,\"tail\":1.28,\"mechanism\":\"rifleHeavy\"},\"mossberg590\":{\"family\":\"shotgun\",\"frontMS\":1.08,\"edge\":0.95,\"body\":1.35,\"tail\":1.45,\"mechanism\":\"pump\"},\"barrett82\":{\"family\":\"heavy50\",\"frontMS\":0.48,\"edge\":0.91,\"tail\":1.15,\"body\":1.02,\"mechanism\":\"rifleHeavy\"}};\nfor (const item of catalogue)\n    item.audio = SOUND_DESIGN[item.id];\nconst ENVIRONMENTS = {\n    field: { name: 'Open field', subtitle: 'Wiese · im Freien', rt: .17, wet: .07, early: .24, damping: .64, size: 1, width: 1, paths: [[.009, -.08, .21], [.031, .3, .04]], description: 'Kurze Bodenreflexion; fast keine diffuse Hallfahne.' },\n    forest: { name: 'Waldlichtung', subtitle: 'Unregelmäßige Reflexionen', rt: .75, wet: .19, early: .33, damping: .72, size: 1, width: 1, paths: [[.032, -.8, .14], [.064, .65, .11], [.103, -.4, .08], [.181, .9, .05]], description: 'Verteilte Reflexionen und gedämpfte Höhen.' },\n    range: { name: 'Shooting range', subtitle: 'Indoor · bedämpft', rt: .65, wet: .28, early: .48, damping: .49, size: 1, width: .9, paths: [[.009, -.75, .3], [.016, .7, .26], [.026, -.4, .2], [.041, .5, .12]], description: 'Dichte frühe Reflexionen mit kontrolliertem Ausklang.' },\n    hall: { name: 'Lagerhalle', subtitle: 'Groß · hart', rt: 2.7, wet: .36, early: .65, damping: .26, size: 1, width: 1, paths: [[.023, -.85, .26], [.046, .8, .24], [.072, -.5, .18], [.11, .7, .14]], description: 'Weite frühe Echos und lange, helle Hallfahne.' },\n    concrete: { name: 'Betonraum', subtitle: 'Klein · reflektierend', rt: 1.45, wet: .34, early: .72, damping: .2, size: 1, width: .88, paths: [[.005, -.75, .35], [.011, .8, .3], [.019, -.25, .23], [.029, .5, .18]], description: 'Sehr frühe, harte Reflexionen; kompakter Raumcharakter.' },\n    tunnel: { name: 'Tunnel', subtitle: 'Längsreflexionen', rt: 3.4, wet: .33, early: .69, damping: .36, size: 1, width: .72, paths: [[.022, -.2, .27], [.067, .2, .23], [.123, -.15, .2], [.209, .15, .14], [.334, -.1, .1]], description: 'Zeitlich gestaffelte Echos entlang eines langen Raums.' },\n    alley: { name: 'Stadtgasse', subtitle: 'Zwei Fassaden', rt: 1.15, wet: .23, early: .6, damping: .31, size: 1, width: 1, paths: [[.014, -.9, .28], [.028, .9, .26], [.056, -.8, .15], [.088, .75, .12]], description: 'Seitliche Rückwürfe, nach oben offene Geometrie.' },\n    valley: { name: 'Gebirgstal', subtitle: 'Weite · diskrete Echos', rt: 1.8, wet: .15, early: .68, damping: .55, size: 1, width: 1, paths: [[.24, -.75, .27], [.47, .8, .22], [.76, -.3, .15], [1.1, .5, .09]], description: 'Späte einzelne Rückwürfe; keine vermessene Landschaft.' },\n    dry: { name: 'Anechoic', subtitle: 'Nur die Quelle', rt: 0, wet: 0, early: 0, damping: .5, size: 1, width: 1, paths: [], description: 'Keine Reflexionen, kein Hall. Gut zum Vergleich der Quellen.' }\n};\nconst DEFAULT_SYNTH = { transient: 1, texture: 1, body: .55, gas: .75, mechanical: .55, casing: .28, brightness: .86, variation: .035, cycle: 1, metalness: .28, trigger: 1, bolt: 1, spring: .35, return: 1, frontDuration: 1, frontShape: 1, textureDecay: 1, bodyBandwidth: 1, bodyDecay: 1, gasDecay: 1, surface: 'concrete', solo: null, mute: [] };\nconst RANGES = { transient: [0, 1.5], texture: [0, 1.5], body: [0, 1.5], gas: [0, 1.5], mechanical: [0, 2], casing: [0, 2], brightness: [0, 1], variation: [0, .2], cycle: [.5, 2], metalness: [0, 1], trigger: [0, 2], bolt: [0, 2], spring: [0, 2], return: [0, 2], frontDuration: [.4, 2.5], frontShape: [.5, 2], textureDecay: [.35, 2.5], bodyBandwidth: [.4, 2], bodyDecay: [.4, 2.5], gasDecay: [.3, 2.5] };\nconst LAYERS = ['transient', 'texture', 'body', 'gas', 'mechanical', 'casing'];\nconst FAMILIES = {\n    pistol9: { gain: .87, crust: .0052, bark: .016, gas: .012, low: 520 },\n    pistol45: { gain: .98, crust: .0063, bark: .019, gas: .014, low: 440 },\n    magnum: { gain: 1.06, crust: .0048, bark: .021, gas: .013, low: 600 },\n    smg9: { gain: .85, crust: .0054, bark: .016, gas: .012, low: 500 },\n    rifle556: { gain: 1.02, crust: .0066, bark: .025, gas: .015, low: 710 },\n    rifle762: { gain: 1.11, crust: .0075, bark: .03, gas: .019, low: 540 },\n    rifleFull: { gain: 1.14, crust: .0082, bark: .036, gas: .023, low: 430 },\n    pdw: { gain: .86, crust: .0045, bark: .017, gas: .012, low: 660 },\n    heavy50: { gain: 1.18, crust: .009, bark: .046, gas: .032, low: 360 },\n    shotgun: { gain: 1.16, crust: .009, bark: .039, gas: .025, low: 380 }\n};\nconst TAU = Math.PI * 2, clamp = (v, a, b) => Math.max(a, Math.min(b, v));\nfunction number(v, name) { if (typeof v !== 'number' || !Number.isFinite(v))\n    throw new TypeError(name + ' must be a finite number'); return v; }\nfunction vector(v, name = 'position') { if (!v || v.length !== 3)\n    throw new TypeError(name + ' must be [x,y,z]'); return Array.from(v, (x) => clamp(number(x, name), -10000, 10000)); }\nfunction clone(o) { return typeof structuredClone === 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o)); }\nfunction deepFreeze(o) { Object.freeze(o); for (const v of Object.values(o))\n    if (v && typeof v === 'object' && !Object.isFrozen(v))\n        deepFreeze(v); return o; }\nconst WEAPONS = Object.fromEntries(catalogue.map(x => [x.id, deepFreeze(x)]));\ndeepFreeze(ENVIRONMENTS);\ndeepFreeze(DEFAULT_SYNTH);\nfunction weapon(id) { if (!Object.hasOwn(WEAPONS, id))\n    throw new RangeError('Unknown weapon: ' + id); return WEAPONS[id]; }\nfunction rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }\nfunction randomSeed() { if (typeof crypto !== 'undefined' && crypto.getRandomValues)\n    return crypto.getRandomValues(new Uint32Array(1))[0] || 1; return (Date.now() ^ Math.random() * 0xffffffff) >>> 0; }\nfunction object(o, name = 'options') { if (!o || typeof o !== 'object' || Array.isArray(o))\n    throw new TypeError(name + ' must be an object'); return o; }\nfunction bool(v, name) { if (typeof v !== 'boolean')\n    throw new TypeError(name + ' must be boolean'); return v; }\nfunction choice(v, values, name) { if (!values.includes(v))\n    throw new RangeError(name + ': ' + values.join(', ')); return v; }\nfunction seedValue(v) { number(v, 'seed'); if (!Number.isInteger(v) || v < 0 || v > 4294967295)\n    throw new RangeError('seed must be uint32 (0–4294967295)'); return v; }\nfunction sampleRateValue(v) { number(v, 'sampleRate'); if (!Number.isInteger(v) || v < 16000 || v > 192000)\n    throw new RangeError('sampleRate: integer 16000–192000'); return v; }\nfunction identifier(v) { if (typeof v !== 'string' || !v.length || v.length > 100 || !/^[-a-zA-Z0-9_.]+$/.test(v) || ['__proto__', 'constructor', 'prototype'].includes(v))\n    throw new TypeError('id must be 1–100 letters, digits, _, . or -'); return v; }\nfunction deriveSeed(seed, key) { let h = (seed ^ 2166136261) >>> 0; for (let i = 0; i < key.length; i++)\n    h = Math.imul(h ^ key.charCodeAt(i), 16777619); return h >>> 0; }\nfunction synthOptions(o = {}) { object(o, 'synth'); const r = { ...DEFAULT_SYNTH, mute: [] }; for (const [k, range] of Object.entries(RANGES))\n    if (o[k] !== undefined)\n        r[k] = clamp(number(o[k], k), ...range); if (o.surface !== undefined)\n    r.surface = choice(o.surface, ['grass', 'gravel', 'concrete', 'wood', 'metal'], 'surface'); if (o.solo != null)\n    r.solo = choice(o.solo, LAYERS, 'solo'); if (o.mute !== undefined) {\n    if (!Array.isArray(o.mute) || o.mute.some(x => !LAYERS.includes(x)))\n        throw new TypeError('mute must contain layer names');\n    r.mute = [...new Set(o.mute)];\n} return r; }\nconst DEFAULT_SUPPRESSOR = deepFreeze({ enabled: false, amount: .8, tone: .5 });\nfunction suppressorOptions(o = {}) { if (typeof o === 'boolean')\n    o = { enabled: o }; object(o, 'suppressor'); return { enabled: bool(o.enabled ?? false, 'suppressor.enabled'), amount: clamp(number(o.amount ?? .8, 'suppressor.amount'), 0, 1), tone: clamp(number(o.tone ?? .5, 'suppressor.tone'), 0, 1) }; }\nconst DEFAULT_MIXER = deepFreeze(Object.fromEntries(LAYERS.map(k => [k, { gain: 1, mute: false, solo: false, direct: 1, room: k === 'mechanical' ? .45 : k === 'casing' ? .3 : 1 }])));\nfunction mixerOptions(o = {}) { object(o, 'mixer'); for (const k of Object.keys(o))\n    choice(k, LAYERS, 'mixer layer'); const out = {}; for (const k of LAYERS) {\n    const v = object(o[k] || {}, 'mixer.' + k), d = DEFAULT_MIXER[k];\n    out[k] = { gain: clamp(number(v.gain ?? d.gain, 'gain'), 0, 2), mute: bool(v.mute ?? false, 'mute'), solo: bool(v.solo ?? false, 'solo'), direct: clamp(number(v.direct ?? d.direct, 'direct'), 0, 2), room: clamp(number(v.room ?? d.room, 'room'), 0, 2) };\n} return out; }\nfunction measure(channels) { if (channels instanceof Float32Array)\n    channels = [channels]; let peak = 0, energy = 0, n = 0, clipped = 0; for (const a of channels)\n    for (const x of a) {\n        if (!Number.isFinite(x))\n            throw new Error('Non-finite PCM');\n        peak = Math.max(peak, Math.abs(x));\n        energy += x * x;\n        n++;\n        if (Math.abs(x) >= 1)\n            clipped++;\n    } const rms = Math.sqrt(energy / Math.max(1, n)); return { peak, rms, peakDB: 20 * Math.log10(Math.max(1e-12, peak)), rmsDB: 20 * Math.log10(Math.max(1e-12, rms)), crestDB: rms > 0 ? 20 * Math.log10(Math.max(1, peak / rms)) : 0, clipped, samples: n }; }\nfunction registerProfile(metadata, audio) { object(metadata, 'metadata'); object(audio, 'audio'); const id = identifier(metadata.id); if (Object.hasOwn(WEAPONS, id))\n    throw new Error('Profile already exists: ' + id); choice(audio.family, Object.keys(FAMILIES), 'family'); choice(audio.mechanism, ['striker', 'hammer', 'toggle', 'revolver', 'roller', 'rifle', 'rifleHeavy', 'compact', 'openBolt', 'pump'], 'mechanism'); const a = { ...audio }; for (const k of ['frontMS', 'edge', 'body', 'tail'])\n    a[k] = clamp(number(a[k], k), .1, 3); const w = { ...clone(metadata), id, name: String(metadata.name || id), shortName: String(metadata.shortName || id), automatic: metadata.automatic === true, rpm: metadata.rpm == null ? null : clamp(number(metadata.rpm, 'rpm'), 30, 1500), audio: a }; WEAPONS[id] = deepFreeze(w); return w; }\n\n/* Pure event DSP. All functions own their output buffers; no shared mutable PCM. */\nconst DEFAULT_EQ = deepFreeze({ enabled: false, position: 'pre', hp: { enabled: false, frequency: 35, Q: .707 }, lp: { enabled: false, frequency: 18000, Q: .707 }, lowShelf: { frequency: 160, gain: 0, Q: .707 }, bell1: { frequency: 900, gain: 0, Q: 1 }, bell2: { frequency: 3500, gain: 0, Q: 1 }, highShelf: { frequency: 6500, gain: 0, Q: .707 } });\nconst DEFAULT_CHAIN = deepFreeze({ eq: DEFAULT_EQ, saturation: { enabled: false, mode: 'soft', inputDB: 0, driveDB: 6, outputDB: -3, wet: 1, oversample: 4 }, compressor: { enabled: false, threshold: -15, ratio: 3, knee: 6, attackMS: 12, releaseMS: 90, makeupDB: 0 } });\nfunction chainOptions(o = {}) {\n    object(o, 'chain');\n    const q = object(o.eq || {}, 'eq'), eq = { enabled: bool(q.enabled ?? false, 'eq.enabled'), position: choice(q.position ?? 'pre', ['pre', 'post'], 'eq.position') };\n    for (const key of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf']) {\n        const d = DEFAULT_EQ[key], v = object(q[key] || {}, 'eq.' + key);\n        eq[key] = { frequency: clamp(number(v.frequency ?? d.frequency, 'frequency'), 10, 90000), Q: clamp(number(v.Q ?? d.Q, 'Q'), .15, 12) };\n        if (key === 'hp' || key === 'lp')\n            eq[key].enabled = bool(v.enabled ?? d.enabled, key + '.enabled');\n        else\n            eq[key].gain = clamp(number(v.gain ?? d.gain, 'EQ gain'), -24, 24);\n    }\n    const s = object(o.saturation || {}, 'saturation'), c = object(o.compressor || {}, 'compressor');\n    return { eq, saturation: { enabled: bool(s.enabled ?? false, 'saturation.enabled'), mode: choice(s.mode ?? 'soft', ['soft', 'hard'], 'saturation.mode'), inputDB: clamp(number(s.inputDB ?? 0, 'inputDB'), -24, 24), driveDB: clamp(number(s.driveDB ?? 6, 'driveDB'), 0, 30), outputDB: clamp(number(s.outputDB ?? -3, 'outputDB'), -30, 12), wet: clamp(number(s.wet ?? 1, 'wet'), 0, 1), oversample: choice(s.oversample ?? 4, [1, 4], 'oversample') }, compressor: { enabled: bool(c.enabled ?? false, 'compressor.enabled'), threshold: clamp(number(c.threshold ?? -15, 'threshold'), -60, 0), ratio: clamp(number(c.ratio ?? 3, 'ratio'), 1, 20), knee: clamp(number(c.knee ?? 6, 'knee'), 0, 24), attackMS: clamp(number(c.attackMS ?? 12, 'attackMS'), .1, 100), releaseMS: clamp(number(c.releaseMS ?? 90, 'releaseMS'), 5, 1000), makeupDB: clamp(number(c.makeupDB ?? 0, 'makeupDB'), -24, 24) } };\n}\nconst EFFECT_PRESETS = {};\nfunction effectsOptions(o = {}) { if (typeof o === 'string') {\n    if (!Object.hasOwn(EFFECT_PRESETS, o))\n        throw new RangeError('Unknown effect preset');\n    return clone(EFFECT_PRESETS[o]);\n} object(o, 'effects'); const out = { layers: {} }; for (const k of Object.keys(o.layers || {}))\n    choice(k, LAYERS, 'effects layer'); for (const k of LAYERS)\n    out.layers[k] = chainOptions(o.layers?.[k]); return out; }\nfunction mergeChain(base, patch) { const r = clone(base); for (const k of ['eq', 'saturation', 'compressor'])\n    if (patch[k]) {\n        Object.assign(r[k], patch[k]);\n        if (k === 'eq')\n            for (const b of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf'])\n                if (patch.eq[b])\n                    r.eq[b] = { ...base.eq[b], ...patch.eq[b] };\n    } return chainOptions(r); }\nfunction registerPreset(id, effects) { identifier(id); if (Object.hasOwn(EFFECT_PRESETS, id))\n    throw new Error('Preset already exists'); EFFECT_PRESETS[id] = deepFreeze(effectsOptions(effects)); return EFFECT_PRESETS[id]; }\nregisterPreset('clean', {});\nfor (const [id, drive, wet, threshold] of [['punchy', 6, .45, -16], ['aggressive', 11, .7, -19]]) {\n    const e = effectsOptions({});\n    for (const k of ['texture', 'body', 'gas'])\n        e.layers[k] = mergeChain(e.layers[k], { eq: { enabled: true, lowShelf: { gain: -1.5 }, bell2: { gain: id === 'aggressive' ? 2 : 1, Q: .7 } }, saturation: { enabled: true, driveDB: drive, outputDB: -drive * .65, wet }, compressor: { enabled: true, threshold, ratio: 2.5, attackMS: 14, releaseMS: 85, makeupDB: 0 } });\n    registerPreset(id, e);\n}\nfunction biquadCoefficients(type, frequency, Q, gain, sr) {\n    const f = clamp(frequency, 5, sr * .45), w = TAU * f / sr, cs = Math.cos(w), sn = Math.sin(w), A = Math.pow(10, gain / 40), alpha = sn / (2 * Q), beta = 2 * Math.sqrt(A) * alpha;\n    let b0, b1, b2, a0, a1, a2;\n    switch (type) {\n        case 'hp':\n            b0 = (1 + cs) / 2;\n            b1 = -(1 + cs);\n            b2 = b0;\n            a0 = 1 + alpha;\n            a1 = -2 * cs;\n            a2 = 1 - alpha;\n            break;\n        case 'lp':\n            b0 = (1 - cs) / 2;\n            b1 = 1 - cs;\n            b2 = b0;\n            a0 = 1 + alpha;\n            a1 = -2 * cs;\n            a2 = 1 - alpha;\n            break;\n        case 'bell':\n            b0 = 1 + alpha * A;\n            b1 = -2 * cs;\n            b2 = 1 - alpha * A;\n            a0 = 1 + alpha / A;\n            a1 = -2 * cs;\n            a2 = 1 - alpha / A;\n            break;\n        case 'lowShelf':\n            b0 = A * ((A + 1) - (A - 1) * cs + beta);\n            b1 = 2 * A * ((A - 1) - (A + 1) * cs);\n            b2 = A * ((A + 1) - (A - 1) * cs - beta);\n            a0 = (A + 1) + (A - 1) * cs + beta;\n            a1 = -2 * ((A - 1) + (A + 1) * cs);\n            a2 = (A + 1) + (A - 1) * cs - beta;\n            break;\n        case 'highShelf':\n            b0 = A * ((A + 1) + (A - 1) * cs + beta);\n            b1 = -2 * A * ((A - 1) + (A + 1) * cs);\n            b2 = A * ((A + 1) + (A - 1) * cs - beta);\n            a0 = (A + 1) - (A - 1) * cs + beta;\n            a1 = 2 * ((A - 1) - (A + 1) * cs);\n            a2 = (A + 1) - (A - 1) * cs - beta;\n            break;\n        default: throw new RangeError('Unknown filter');\n    }\n    return [b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0];\n}\nfunction filterPCM(a, c) { const out = new Float32Array(a.length); let z1 = 0, z2 = 0; for (let i = 0; i < a.length; i++) {\n    const x = a[i], y = c[0] * x + z1;\n    z1 = c[1] * x - c[3] * y + z2;\n    z2 = c[2] * x - c[4] * y;\n    out[i] = y;\n} return out; }\nfunction applyEQ(a, eq, sr) { let out = a.slice(); if (!eq.enabled)\n    return out; for (const k of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf']) {\n    const b = eq[k], pass = k === 'hp' || k === 'lp';\n    if (pass ? !b.enabled : b.gain === 0)\n        continue;\n    out = filterPCM(out, biquadCoefficients(k.startsWith('bell') ? 'bell' : k, b.frequency, b.Q, b.gain || 0, sr));\n} return out; }\nconst FIR_CACHE = new Map();\nfunction oversamplingFIR() { if (FIR_CACHE.has(4))\n    return FIR_CACHE.get(4); const n = 97, h = new Float64Array(n), mid = (n - 1) / 2, fc = .1125; let sum = 0; for (let i = 0; i < n; i++) {\n    const x = i - mid, win = .42 - .5 * Math.cos(TAU * i / (n - 1)) + .08 * Math.cos(2 * TAU * i / (n - 1));\n    h[i] = (x === 0 ? 2 * fc : Math.sin(TAU * fc * x) / (Math.PI * x)) * win;\n    sum += h[i];\n} for (let i = 0; i < n; i++)\n    h[i] /= sum; FIR_CACHE.set(4, h); return h; }\nfunction saturatePCM(a, s) {\n    if (!s.enabled || s.wet === 0)\n        return a.slice();\n    const drive = Math.pow(10, (s.inputDB + s.driveDB) / 20), outGain = Math.pow(10, s.outputDB / 20), shape = x => s.mode === 'hard' ? clamp(x, -1, 1) : Math.tanh(x);\n    let wet;\n    if (s.oversample === 1) {\n        wet = new Float32Array(a.length);\n        for (let i = 0; i < a.length; i++)\n            wet[i] = shape(a[i] * drive) * outGain;\n    }\n    else {\n        const h = oversamplingFIR(), m = h.length - 1, N = a.length * 4 + m * 2, up = new Float32Array(N);\n        for (let n = 0; n < a.length; n++) {\n            const x = a[n] * 4 * drive;\n            if (x === 0)\n                continue;\n            for (let j = 0; j < h.length; j++)\n                up[n * 4 + j] += x * h[j];\n        }\n        for (let i = 0; i < N; i++)\n            up[i] = shape(up[i]) * outGain;\n        wet = new Float32Array(a.length); /* Both FIR group delays are removed in this prepared-event path. Dry remains on the same sample clock. */\n        for (let n = 0; n < a.length; n++) {\n            const at = n * 4 + m;\n            let y = 0;\n            for (let j = 0; j < h.length; j++)\n                if (at - j >= 0 && at - j < N)\n                    y += up[at - j] * h[j];\n            wet[n] = y;\n        }\n    }\n    if (s.wet === 1)\n        return wet;\n    for (let i = 0; i < wet.length; i++)\n        wet[i] = a[i] * (1 - s.wet) + wet[i] * s.wet;\n    return wet;\n}\nfunction compressPCM(a, c, sr) { const out = new Float32Array(a.length); if (!c.enabled)\n    return { pcm: a.slice(), reductionDB: 0 }; const attack = Math.exp(-1 / (c.attackMS * .001 * sr)), release = Math.exp(-1 / (c.releaseMS * .001 * sr)), makeup = Math.pow(10, c.makeupDB / 20); let reduction = 0, maxGR = 0; for (let i = 0; i < a.length; i++) {\n    const level = 20 * Math.log10(Math.max(1e-12, Math.abs(a[i]))), x = level - c.threshold;\n    let target = 0;\n    if (c.knee > 0 && x > -c.knee / 2 && x < c.knee / 2)\n        target = (1 - 1 / c.ratio) * (x + c.knee / 2) ** 2 / (2 * c.knee);\n    else if (x >= c.knee / 2)\n        target = (1 - 1 / c.ratio) * x;\n    const coef = target > reduction ? attack : release;\n    reduction = coef * reduction + (1 - coef) * target;\n    maxGR = Math.max(maxGR, reduction);\n    out[i] = a[i] * Math.pow(10, -reduction / 20) * makeup;\n} return { pcm: out, reductionDB: maxGR }; }\nfunction processChain(a, settings, sr) { const c = chainOptions(settings); sampleRateValue(sr); let x = a.slice(); if (c.eq.enabled && c.eq.position === 'pre')\n    x = applyEQ(x, c.eq, sr); if (c.saturation.enabled && c.saturation.wet > 0)\n    x = saturatePCM(x, c.saturation); if (c.eq.enabled && c.eq.position === 'post')\n    x = applyEQ(x, c.eq, sr); const out = c.compressor.enabled ? compressPCM(x, c.compressor, sr) : { pcm: x, reductionDB: 0 }; return { ...out, latencySamples: 0 }; }\nconst DEFAULT_LIMITER = deepFreeze({ ceilingDB: -1, releaseMS: 70, lookaheadMS: 5 });\nfunction limiterOptions(o = {}) { object(o, 'limiter'); return { ceilingDB: clamp(number(o.ceilingDB ?? -1, 'ceilingDB'), -18, -.1), releaseMS: clamp(number(o.releaseMS ?? 70, 'releaseMS'), 10, 1000), lookaheadMS: clamp(number(o.lookaheadMS ?? 5, 'lookaheadMS'), 0, 20) }; }\n/* Stereo-linked sliding-maximum lookahead sample-peak limiter; shared by live and offline. */\nclass LinkedPeakLimiter {\n    constructor(sr, options = {}) { this.sr = sr; this.options = { ceilingDB: -1, releaseMS: 70, lookaheadMS: 5, ...options }; this.lookahead = Math.round(this.options.lookaheadMS * .001 * sr); this.size = this.lookahead + 1; this.left = new Float32Array(this.size); this.right = new Float32Array(this.size); this.qValue = new Float64Array(this.size + 2); this.qIndex = new Float64Array(this.size + 2); this.head = 0; this.tail = 0; this.n = 0; this.gain = 1; this.resetMeter(); this.configure(this.options); }\n    configure(o) { Object.assign(this.options, o); this.ceiling = Math.pow(10, this.options.ceilingDB / 20); this.release = Math.exp(-1 / (this.options.releaseMS * .001 * this.sr)); }\n    resetMeter() { this.meter = { prePeak: 0, postPeak: 0, preEnergy: 0, postEnergy: 0, samples: 0, maxReductionDB: 0, overCeiling: 0 }; }\n    process(input, output) {\n        const l = input[0], r = input[1] || l, ol = output[0], or = output[1] || output[0], cap = this.qValue.length, m = this.meter;\n        for (let i = 0; i < ol.length; i++) {\n            const x = l?.[i] || 0, y = r?.[i] || 0, peak = Math.max(Math.abs(x), Math.abs(y)), n = this.n++, at = n % this.size;\n            this.left[at] = x;\n            this.right[at] = y;\n            while (this.head !== this.tail && this.qIndex[this.head] < n - this.lookahead)\n                this.head = (this.head + 1) % cap;\n            while (this.head !== this.tail && this.qValue[(this.tail - 1 + cap) % cap] <= peak)\n                this.tail = (this.tail - 1 + cap) % cap;\n            this.qValue[this.tail] = peak;\n            this.qIndex[this.tail] = n;\n            this.tail = (this.tail + 1) % cap;\n            const max = this.qValue[this.head], target = max > this.ceiling ? this.ceiling / max : 1;\n            this.gain = target < this.gain ? target : Math.min(target, 1 - (1 - this.gain) * this.release);\n            const read = (n + 1) % this.size, ox = this.left[read] * this.gain, oy = this.right[read] * this.gain;\n            ol[i] = ox;\n            or[i] = oy;\n            m.prePeak = Math.max(m.prePeak, peak);\n            m.postPeak = Math.max(m.postPeak, Math.abs(ox), Math.abs(oy));\n            m.preEnergy += x * x + y * y;\n            m.postEnergy += ox * ox + oy * oy;\n            m.samples += 2;\n            m.maxReductionDB = Math.max(m.maxReductionDB, -20 * Math.log10(Math.max(1e-12, this.gain)));\n            if (Math.abs(ox) > this.ceiling + 1e-6 || Math.abs(oy) > this.ceiling + 1e-6)\n                m.overCeiling++;\n        }\n        return output;\n    }\n    readMeter(reset = false) { const m = { ...this.meter }, n = Math.max(1, m.samples); m.preRMS = Math.sqrt(m.preEnergy / n); m.postRMS = Math.sqrt(m.postEnergy / n); m.crestDB = m.postRMS ? 20 * Math.log10(Math.max(1, m.postPeak / m.postRMS)) : 0; m.currentReductionDB = -20 * Math.log10(Math.max(1e-12, this.gain)); if (reset)\n        this.resetMeter(); return m; }\n}\nfunction limitPCM(channels, sr, options = {}) { sampleRateValue(sr); if (!Array.isArray(channels) || channels.length < 1 || channels.length > 2 || channels.some(a => !(a instanceof Float32Array) || !a.length))\n    throw new TypeError('channels: one or two non-empty Float32Array buffers'); measure(channels); const config = limiterOptions(options), lim = new LinkedPeakLimiter(sr, config), n = Math.max(...channels.map(c => c.length)) + lim.lookahead, input = [new Float32Array(n), new Float32Array(n)], output = [new Float32Array(n), new Float32Array(n)]; input[0].set(channels[0]); input[1].set(channels[1] || channels[0]); lim.process(input, output); return { channels: output, metrics: lim.readMeter(), latencySamples: lim.lookahead }; }\n\n/* Designed sound cues, not an operational weapon state machine. Times are artistic. */\nconst ACTION_NAMES = deepFreeze({ triggerPress: 'Abzugsbewegung', triggerBreak: 'Abzugskontakt', triggerRelease: 'Loslassen', triggerReset: 'Reset-Klick', dryFire: 'Dry-Fire', boltBack: 'Schlitten / Verschluss zurück', boltForward: 'Schlitten / Verschluss vor', spring: 'Feder / Reibung', magRelease: 'Magazinkontakt lösen', magOut: 'Magazin entnehmen', magIn: 'Magazin einsetzen', magSeat: 'Magazin einrasten', safety: 'Sicherungs-Cue', selector: 'Wahlhebel-Cue', pumpBack: 'Pumpen zurück', pumpForward: 'Pumpen vor', casingImpact: 'Hülsenkontakt', hammerCock: 'Hahnkontakt', cylinderOpen: 'Trommel öffnen', cylinderClose: 'Trommel schließen', clip: 'Clip-Kontakt', cycle: 'Mechanik-Komposition' });\nfunction capabilities(id) { const w = weapon(id), m = w.audio.mechanism, a = ['triggerPress', 'triggerBreak', 'triggerRelease', 'triggerReset', 'dryFire', 'casingImpact', 'cycle']; if (m === 'revolver')\n    a.push('cylinderOpen', 'cylinderClose', 'hammerCock');\nelse if (m === 'pump')\n    a.push('pumpBack', 'pumpForward', 'spring', 'safety');\nelse {\n    a.push('boltBack', 'boltForward', 'spring');\n    if (id === 'garand')\n        a.push('clip');\n    else\n        a.push('magRelease', 'magOut', 'magIn', 'magSeat');\n    if (m !== 'striker' && id !== 'p226')\n        a.push('safety');\n    if (w.automatic)\n        a.push('selector');\n    if (['hammer', 'toggle'].includes(m))\n        a.push('hammerCock');\n} return { actions: a, automatic: !!w.automatic, suppressor: true, suppressorMode: 'game-audio', spring: m !== 'revolver', bolt: m !== 'revolver', magazine: !['revolver', 'pump'].includes(m) && id !== 'garand' }; }\nconst MECH_FAMILIES = deepFreeze({ striker: { base: 1550, decay: .0028, noise: .8, ring: .2, drag: .018, modes: 5 }, hammer: { base: 1190, decay: .0042, noise: .62, ring: .38, drag: .023, modes: 7 }, toggle: { base: 1740, decay: .0049, noise: .48, ring: .5, drag: .019, modes: 9 }, revolver: { base: 960, decay: .006, noise: .5, ring: .48, drag: .02, modes: 6 }, roller: { base: 1220, decay: .0031, noise: .8, ring: .27, drag: .024, modes: 8 }, rifle: { base: 900, decay: .0048, noise: .8, ring: .24, drag: .04, modes: 7 }, rifleHeavy: { base: 690, decay: .0062, noise: .76, ring: .31, drag: .06, modes: 9 }, compact: { base: 1830, decay: .0024, noise: .9, ring: .14, drag: .018, modes: 5 }, openBolt: { base: 710, decay: .0067, noise: .7, ring: .35, drag: .054, modes: 8 }, pump: { base: 590, decay: .008, noise: .83, ring: .15, drag: .12, modes: 6 } });\nfunction actionOptions(o = {}) { object(o, 'actionOptions'); return { intensity: clamp(number(o.intensity ?? 1, 'intensity'), 0, 2), material: choice(o.material ?? 'mixed', ['mixed', 'metal', 'polymer', 'wood'], 'material'), resonance: clamp(number(o.resonance ?? 1, 'resonance'), .5, 2), damping: clamp(number(o.damping ?? 1, 'damping'), .3, 3), friction: clamp(number(o.friction ?? 1, 'friction'), 0, 2), bounces: Math.round(clamp(number(o.bounces ?? 3, 'bounces'), 1, 6)), surface: choice(o.surface ?? 'concrete', ['grass', 'gravel', 'concrete', 'wood', 'metal'], 'surface') }; }\nfunction actionPlan(id, name, p, options = {}) {\n    const cap = capabilities(id);\n    if (!cap.actions.includes(name))\n        throw new RangeError(name + ' is not supported by ' + id);\n    const w = weapon(id), m = w.audio.mechanism, cy = p.cycle, a = actionOptions(options), out = [];\n    const add = (type, at, amp = 1, length = .02, tag = type) => out.push({ type, at, amp, length, tag });\n    switch (name) {\n        case 'triggerPress':\n            add('rub', 0, .016 * p.trigger, .018 * cy);\n            add('click', .008 * cy, .014 * p.trigger, .008);\n            break;\n        case 'triggerBreak':\n            add('click', 0, .038 * p.trigger, .018);\n            break;\n        case 'triggerRelease':\n            add('rub', 0, .012 * p.trigger, .016 * cy);\n            add('tick', .009 * cy, .015 * p.trigger, .01);\n            break;\n        case 'triggerReset':\n            add('tick', 0, .026 * p.trigger, .016);\n            break;\n        case 'dryFire':\n            add('click', 0, .043 * p.trigger, .025);\n            add('tick', .004, .018 * p.trigger, .014);\n            break;\n        case 'boltBack':\n            add('impact', 0, .07 * p.bolt, .04);\n            add('rub', .005, .035 * p.spring, .044 * cy);\n            add('clunk', .045 * cy, .055 * p.bolt, .04);\n            break;\n        case 'boltForward':\n            add('rub', 0, .027 * p.spring, .03 * cy);\n            add('clunk', .035 * cy, .085 * p.return, .042);\n            break;\n        case 'spring':\n            add('rub', 0, .045 * p.spring, .08 * cy);\n            break;\n        case 'magRelease':\n            add('tick', 0, .032, .015);\n            add('click', .012, .019, .02);\n            break;\n        case 'magOut':\n            add('rub', 0, .035, .12 * cy);\n            add('tick', .10 * cy, .025, .016);\n            break;\n        case 'magIn':\n            add('rub', 0, .042, .095 * cy);\n            add('impact', .10 * cy, .065, .035);\n            break;\n        case 'magSeat':\n            add('clunk', 0, .083, .035);\n            add('tick', .008, .027, .018);\n            break;\n        case 'safety':\n            add('tick', 0, .03, .017);\n            break;\n        case 'selector':\n            add('click', 0, .032, .018);\n            add('tick', .006, .02, .015);\n            break;\n        case 'pumpBack':\n            add('clunk', 0, .13 * p.bolt, .055);\n            add('rub', .009, .10 * p.spring, .13 * cy);\n            add('impact', .145 * cy, .105 * p.bolt, .05);\n            break;\n        case 'pumpForward':\n            add('rub', 0, .095 * p.spring, .12 * cy);\n            add('clunk', .125 * cy, .16 * p.return, .06);\n            break;\n        case 'hammerCock':\n            add('rub', 0, .014, .036 * cy);\n            add('tick', .019 * cy, .029, .019);\n            add('click', .038 * cy, .037, .025);\n            break;\n        case 'cylinderOpen':\n            add('click', 0, .04, .025);\n            add('clunk', .05 * cy, .075, .04);\n            break;\n        case 'cylinderClose':\n            add('rub', 0, .018, .04 * cy);\n            add('impact', .045 * cy, .09, .055);\n            add('tick', .052 * cy, .025, .024);\n            break;\n        case 'clip':\n            add('impact', 0, .07, .12);\n            add('tick', .08, .034, .07);\n            break;\n        case 'casingImpact': {\n            let at = 0;\n            for (let i = 0; i < a.bounces; i++) {\n                add('casing', at, .04 * Math.pow(.47, i), .08, 'bounce-' + i);\n                at += .12 / (i + 1);\n            }\n            break;\n        }\n        case 'cycle': {\n            let names;\n            if (m === 'revolver')\n                names = [['hammerCock', 0], ['triggerBreak', .09 * cy]];\n            else if (m === 'pump')\n                names = [['pumpBack', 0], ['pumpForward', .20 * cy]];\n            else\n                names = [['boltBack', 0], ['boltForward', .075 * cy]];\n            for (const [n, t] of names)\n                for (const x of actionPlan(id, n, p, a))\n                    out.push({ ...x, at: x.at + t, tag: n + '/' + x.tag });\n            break;\n        }\n    }\n    return out.map((e, i) => ({ ...e, tag: name + '/' + e.tag + '/' + i }));\n}\nfunction synthAction(id, name, p, sr, seed, options = {}) {\n    const a = actionOptions(options), w = weapon(id), f = MECH_FAMILIES[w.audio.mechanism], plan = actionPlan(id, name, p, a), length = Math.max(32, Math.ceil((Math.max(...plan.map(e => e.at + Math.max(e.length, (e.type === 'casing' ? .011 : f.decay * 1.3) * 9 / a.damping)), .01) + .03) * sr)), pcm = new Float32Array(length);\n    const variant = .94 + (deriveSeed(1, id) % 1200) / 10000, mat = { mixed: [1, 1], metal: [1.3, 1.4], polymer: [.67, .3], wood: [.57, .5] }[a.material], coef = hz => 1 - Math.exp(-TAU * clamp(hz, 15, sr * .42) / sr);\n    for (const e of plan) {\n        const random = rng(deriveSeed(seed, e.tag)), noise = () => random() * 2 - 1, at = Math.round(e.at * sr), amp = e.amp * a.intensity * (1 + (random() * 2 - 1) * p.variation);\n        let low = 0, slow = 0;\n        if (e.type === 'rub') {\n            const n = Math.min(length - at, Math.ceil(e.length * sr)), c = coef(1300 * variant), cs = coef(90);\n            for (let j = 0; j < n; j++) {\n                const x = noise();\n                low += c * (x - low);\n                slow += cs * (noise() - slow);\n                const envelope = Math.max(0, Math.sin(Math.PI * j / Math.max(1, n - 1))) ** 1.2;\n                pcm[at + j] += amp * a.friction * envelope * (low * .55 + (x - low) * .12) * (1 + slow * 1.6);\n            }\n            continue;\n        }\n        let base = f.base * variant * a.resonance * mat[0], decay = f.decay / a.damping, ring = f.ring * mat[1] * (.4 + p.metalness * 1.6), exc = f.noise;\n        if (e.type === 'tick') {\n            base *= 1.5;\n            decay *= .55;\n        }\n        if (e.type === 'clunk') {\n            base *= .61;\n            decay *= 1.2;\n        }\n        if (e.type === 'impact') {\n            base *= .85;\n            decay *= 1.3;\n        }\n        let surfaceAmp = 1;\n        if (e.type === 'casing') {\n            const surface = { grass: [.08, 800, .0014, .05], gravel: [.3, 1600, .0028, .18], concrete: [.7, 2800, .004, .6], wood: [.4, 1300, .0034, .3], metal: [.9, 3200, .011, .85] }[a.surface];\n            surfaceAmp = surface[0];\n            base = surface[1] * a.resonance;\n            decay = surface[2] / a.damping;\n            ring = surface[3] * (.6 + p.metalness);\n        }\n        const modes = [];\n        for (let j = 0; j < f.modes; j++) {\n            const freq = base * (1 + j * .77 + (random() - .5) * .18);\n            if (freq > sr * .44)\n                continue;\n            modes.push({ f: freq, phase: random() * TAU, decay: decay / (1 + j * .17), amp: 1 / (1 + j * 1.5) });\n        }\n        const n = Math.min(length - at, Math.ceil(Math.max(e.length, decay * 9) * sr)), c = coef(base * 1.8);\n        for (let j = 0; j < n; j++) {\n            const t = j / sr, x = noise();\n            low += c * (x - low);\n            let tonal = 0;\n            for (const m of modes)\n                tonal += Math.sin(TAU * m.f * t + m.phase) * Math.exp(-t / m.decay) * m.amp;\n            const thud = low * Math.exp(-t / (decay * .65)), tick = (x - low) * Math.exp(-t / .00065);\n            pcm[at + j] += amp * surfaceAmp * (exc * (tick + thud * .65) + ring * tonal * .45);\n        }\n    }\n    return { pcm, plan, duration: length / sr };\n}\n\nfunction eqTailSeconds(chain, sr) { if (!chain.eq.enabled)\n    return 0; let longest = 0; for (const k of ['hp', 'lp', 'lowShelf', 'bell1', 'bell2', 'highShelf']) {\n    const b = chain.eq[k], pass = k === 'hp' || k === 'lp';\n    if (pass ? !b.enabled : b.gain === 0)\n        continue;\n    const c = biquadCoefficients(k.startsWith('bell') ? 'bell' : k, b.frequency, b.Q, b.gain || 0, sr), disc = c[3] * c[3] - 4 * c[4];\n    let radius;\n    if (disc < 0)\n        radius = Math.sqrt(Math.max(0, c[4]));\n    else\n        radius = Math.max(Math.abs((-c[3] + Math.sqrt(disc)) / 2), Math.abs((-c[3] - Math.sqrt(disc)) / 2));\n    if (radius > 0 && radius < 1)\n        longest = Math.max(longest, Math.log(1e-6) / Math.log(radius) / sr);\n} if (longest > 6)\n    throw new RangeError(\"EQ decay exceeds the six-second event tail budget; raise frequency or reduce Q/gain\"); return longest; }\nfunction dcFilter(a, sr) { const out = new Float32Array(a.length), c = Math.exp(-TAU * 28 / sr); let prev = 0, y = 0; for (let i = 0; i < a.length; i++) {\n    const x = a[i];\n    y = x - prev + c * y;\n    prev = x;\n    out[i] = y;\n} return out; }\nfunction shotLayers(id, p, sr, seed, keys) {\n    const w = weapon(id), a = w.audio, f = FAMILIES[a.family], event = rng(deriveSeed(seed, 'event')), vary = () => 1 + (event() * 2 - 1) * p.variation, gain = f.gain * vary(), front = a.frontMS * .001 * p.frontDuration * vary(), edge = a.edge * vary(), tail = a.tail * vary(), start = Math.round(.002 * sr), raw = {}, coef = hz => 1 - Math.exp(-TAU * clamp(hz, 15, sr * .45) / sr);\n    const durations = { transient: Math.max(.04, front * 16), texture: Math.max(.1, f.bark * tail * p.textureDecay * 10), body: .008 * tail * p.bodyDecay * 11, gas: f.gas * tail * p.gasDecay * 10 };\n    for (const k of keys) {\n        if (!Object.hasOwn(durations, k))\n            continue;\n        const random = rng(deriveSeed(seed, 'layer/' + k)), noise = () => random() * 2 - 1, length = start + Math.ceil(durations[k] * sr), out = raw[k] = new Float32Array(length), cLo = coef(f.low), cMid = coef(Math.min(2700, sr * .19)), cHi = coef(700 + (sr * .44 - 700) * p.brightness), cMod = coef(360), cBody = coef(950 * p.bodyBandwidth), cSub = coef(90), cGas = coef(1700);\n        let lo = 0, mid = 0, hi = 0, mod = 0, body = 0, sub = 0, gas = 0;\n        const breaks = [];\n        let t0 = .00018;\n        for (let j = 0; j < 15; j++) {\n            t0 += (.00011 + random() * .00065) * (j < 5 ? 1 : 1.6);\n            breaks.push([t0, (.035 + random() * .12) * Math.exp(-t0 / .0045) * (random() < .22 ? -1 : 1), .00007 + random() * .00019]);\n        }\n        const smears = [];\n        for (let j = 0; j < 7; j++)\n            smears.push([.0008 + random() * .026, .0005 + random() * .0017, .15 + random() * .5]);\n        for (let i = start; i < length; i++) {\n            const t = (i - start) / sr, n = noise(), n2 = noise();\n            lo += cLo * (n - lo);\n            mid += cMid * (n - mid);\n            hi += cHi * (n - hi);\n            mod += cMod * (n2 - mod);\n            body += cBody * (n2 - body);\n            sub += cSub * (n2 - sub);\n            gas += cGas * (n2 - gas);\n            const disorder = clamp(1 + mod * 2.7, .28, 1.9);\n            if (k === 'transient') {\n                const u = t / front, pressure = (1 - u * p.frontShape) * Math.exp(-(1.1 + .45 * p.frontShape) * u);\n                let breakup = 0;\n                for (const b of breaks) {\n                    const z = t - b[0];\n                    if (z >= 0 && z < b[2] * 9) {\n                        const q = z / b[2];\n                        breakup += b[1] * (1 - q) * Math.exp(-q);\n                    }\n                }\n                out[i] = gain * (pressure * .91 + breakup * 1.5);\n            }\n            else if (k === 'texture') {\n                let packet = 0;\n                for (const b of smears) {\n                    const z = (t - b[0]) / b[1];\n                    if (z > 0 && z < 8)\n                        packet += b[2] * Math.exp(-z);\n                }\n                const crust = (hi - mid) * Math.exp(-t / (f.crust * tail * p.textureDecay)), bark = ((mid - lo) * 1.12 + (hi - mid) * .32) * Math.exp(-t / (f.bark * tail * p.textureDecay)) * (.62 + packet) * disorder;\n                out[i] = gain * (crust * .95 * edge + bark * .99);\n            }\n            else if (k === 'body')\n                out[i] = gain * a.body * (body - sub) * 1.6 * Math.exp(-t / (.008 * tail * p.bodyDecay));\n            else\n                out[i] = gain * (gas * .45 + (hi - mid) * .08) * Math.exp(-t / (f.gas * tail * p.gasDecay)) * disorder;\n        }\n    }\n    return raw;\n}\nfunction resolveEvent(request = {}) {\n    object(request, 'event');\n    const id = weapon(request.weapon || 'g17').id, kind = choice(request.kind || 'shot', ['shot', 'mechanics', 'action'], 'kind'), action = kind === 'mechanics' ? 'cycle' : kind === 'action' ? choice(request.action, capabilities(id).actions, 'action') : null;\n    return { weapon: id, kind, action, sampleRate: sampleRateValue(request.sampleRate ?? 48000), seed: seedValue(request.seed ?? 17017), synth: synthOptions(request.synth), effects: effectsOptions(request.effects), mixer: mixerOptions(request.mixer), suppressor: suppressorOptions(request.suppressor), actionOptions: actionOptions({ ...request.actionOptions, surface: request.actionOptions?.surface ?? request.synth?.surface ?? DEFAULT_SYNTH.surface }), debugStems: bool(request.debugStems ?? false, 'debugStems'), includeCasing: bool(request.includeCasing ?? true, 'includeCasing'), includeMechanics: bool(request.includeMechanics ?? true, 'includeMechanics'), legacyTrigger: bool(request.legacyTrigger ?? false, 'legacyTrigger') };\n}\nfunction synthesizeEvent(request = {}) {\n    const r = resolveEvent(request), { weapon: id, sampleRate: sr, seed, synth: p } = r, solo = LAYERS.some(k => r.mixer[k].solo), audible = k => !p.mute.includes(k) && (!p.solo || p.solo === k) && !r.mixer[k].mute && (!solo || r.mixer[k].solo), needed = k => r.debugStems || audible(k), raw = {}, timeline = [];\n    if (r.kind === 'shot') {\n        Object.assign(raw, shotLayers(id, p, sr, seed, ['transient', 'texture', 'body', 'gas'].filter(needed)));\n        const m = weapon(id).audio.mechanism;\n        if (r.includeMechanics && needed('mechanical') && m !== 'pump' && m !== 'revolver') {\n            const c = synthAction(id, 'cycle', p, sr, deriveSeed(seed, 'mechanical/cycle'), r.actionOptions);\n            raw.mechanical = c.pcm;\n            timeline.push(...c.plan.map(x => ({ layer: 'mechanical', action: 'cycle', at: x.at, type: x.type })));\n        }\n        if (r.legacyTrigger && needed('mechanical')) {\n            const c = synthAction(id, 'triggerBreak', p, sr, deriveSeed(seed, 'mechanical/trigger'), r.actionOptions), arr = new Float32Array(Math.max(raw.mechanical?.length || 0, c.pcm.length));\n            if (raw.mechanical)\n                arr.set(raw.mechanical);\n            for (let i = 0; i < c.pcm.length; i++)\n                arr[i] += c.pcm[i];\n            raw.mechanical = arr;\n        }\n        if (r.includeCasing && needed('casing') && m !== 'pump' && m !== 'revolver') {\n            const opts = { ...r.actionOptions, surface: p.surface }, c = synthAction(id, 'casingImpact', p, sr, deriveSeed(seed, 'casing'), opts), offset = Math.round(sr * .31);\n            raw.casing = new Float32Array(offset + c.pcm.length);\n            raw.casing.set(c.pcm, offset);\n            timeline.push(...c.plan.map(x => ({ layer: 'casing', action: 'casingImpact', at: x.at + .31, type: x.type })));\n        }\n        timeline.unshift({ layer: 'transient', action: 'shot', at: .002, type: 'source' });\n    }\n    else {\n        const layer = r.action === 'casingImpact' ? 'casing' : 'mechanical';\n        if (needed(layer)) {\n            const c = synthAction(id, r.action, p, sr, deriveSeed(seed, 'action/' + r.action), { ...r.actionOptions, surface: request.actionOptions?.surface ?? p.surface });\n            raw[layer] = c.pcm;\n            timeline.push(...c.plan.map(x => ({ layer, action: r.action, at: x.at, type: x.type })));\n        }\n    }\n    const stems = {}, rawStems = r.debugStems ? {} : undefined, weightedStems = r.debugStems ? {} : undefined, metrics = {};\n    let length = 32, allocatedSamples = 0;\n    for (const [k, a] of Object.entries(raw)) {\n        allocatedSamples += a.length;\n        if (r.debugStems)\n            rawStems[k] = a.slice();\n        const chain = r.effects.layers[k], padding = .085 + eqTailSeconds(chain, sr) + (chain.saturation.enabled ? .002 : 0), buffer = new Float32Array(a.length + Math.ceil(padding * sr));\n        let gain = audible(k) ? p[k] * .72 * r.mixer[k].gain : 0;\n        if (r.suppressor.enabled && ['transient', 'texture', 'body', 'gas'].includes(k))\n            gain *= Math.pow(10, -r.suppressor.amount * ({ transient: 18, texture: 16, body: 10, gas: 9 }[k]) / 20);\n        for (let i = 0; i < a.length; i++)\n            buffer[i] = a[i] * gain;\n        let x = dcFilter(buffer, sr);\n        if (r.suppressor.enabled && r.suppressor.amount > 0 && ['transient', 'texture', 'body', 'gas'].includes(k)) {\n            const cutoff = (.45 * sr) * (1 - r.suppressor.amount) + (1100 + 6200 * r.suppressor.tone) * r.suppressor.amount;\n            x = filterPCM(x, biquadCoefficients('lp', cutoff, .6, 0, sr));\n        }\n        if (r.debugStems)\n            weightedStems[k] = x.slice();\n        const result = processChain(x, chain, sr);\n        stems[k] = result.pcm;\n        metrics[k] = { ...measure(result.pcm), compressorReductionDB: result.reductionDB };\n        length = Math.max(length, result.pcm.length);\n        allocatedSamples += buffer.length + x.length + result.pcm.length;\n    }\n    const pcm = new Float32Array(length);\n    for (const a of Object.values(stems))\n        for (let i = 0; i < a.length; i++)\n            pcm[i] += a[i];\n    const metricsSum = measure(pcm);\n    return { pcm, stems, rawStems, weightedStems, layers: rawStems, sampleRate: sr, seed, weapon: id, kind: r.kind, action: r.action, peak: metricsSum.peak, rms: metricsSum.rms, duration: length / sr, metrics: metricsSum, layerMetrics: metrics, timeline, options: p, resolved: r, allocatedBytesEstimate: (allocatedSamples + length) * 4, retainedBytes: (length + Object.values(stems).reduce((n, a) => n + a.length, 0) + (r.debugStems ? Object.values(rawStems).reduce((n, a) => n + a.length, 0) + Object.values(weightedStems).reduce((n, a) => n + a.length, 0) : 0)) * 4 };\n}\n/** Compatible entry point; processing contains effects/mixer/suppressor and debugStems. */\nfunction synthesize(id = 'g17', options = {}, sampleRate = 48000, seed = 17017, kind = 'shot', processing = {}) { return synthesizeEvent({ ...processing, weapon: id, synth: options, sampleRate, seed, kind }); }\n\nfunction environment(id = 'field', overrides = {}) {\n    if (!Object.hasOwn(ENVIRONMENTS, id))\n        throw new RangeError('Unknown environment: ' + id);\n    const e = { ...clone(ENVIRONMENTS[id]), id };\n    for (const [k, r] of Object.entries({ rt: [0, 5], wet: [0, 1], early: [0, 1], damping: [0, 1], size: [.25, 3], width: [0, 1] }))\n        if (overrides[k] !== undefined)\n            e[k] = clamp(number(overrides[k], k), ...r);\n    if (id === 'dry') {\n        e.rt = 0;\n        e.wet = 0;\n        e.early = 0;\n    }\n    return e;\n}\n/** Synthetic diffuse IR; geometrical early paths remain separate live nodes. */\nfunction roomImpulse(e, sr) {\n    const n = Math.max(1, Math.ceil((e.rt * 1.12 + .08) * sr)), L = new Float32Array(n), R = new Float32Array(n);\n    if (e.rt === 0)\n        return { left: L, right: R };\n    const rand = rng(209193 + Object.keys(ENVIRONMENTS).indexOf(e.id) * 199), onset = .018 * e.size;\n    let ll = 0, rl = 0, ls = 0, rs = 0, energy = 0;\n    const coef = 1 - Math.exp(-TAU * (2200 + 6500 * (1 - e.damping)) / sr);\n    for (let i = Math.floor(onset * sr); i < n; i++) {\n        const t = i / sr - onset, nl = rand() * 2 - 1, nr = rand() * 2 - 1;\n        ll += coef * (nl - ll);\n        rl += coef * (nr - rl);\n        const slow = 1 - Math.exp(-TAU * 272 / sr);\n        ls += slow * (nl - ls);\n        rs += slow * (nr - rs);\n        const density = 1 - Math.exp(-t / .014), d = Math.exp(-6.9078 * t / Math.max(.02, e.rt));\n        const hf = Math.exp(-6.9078 * t / (Math.max(.02, e.rt) * (.25 + .6 * (1 - e.damping))));\n        const l = density * (ls * 1.7 * d + (ll - ls) * hf), r = density * (rs * 1.7 * d + (rl - rs) * hf), mid = (l + r) * .5, side = (l - r) * .5 * e.width;\n        L[i] = mid + side;\n        R[i] = mid - side;\n        energy += L[i] * L[i] + R[i] * R[i];\n    }\n    const g = energy > 0 ? .78 / Math.sqrt(energy) : 0;\n    for (let i = 0; i < n; i++) {\n        L[i] *= g;\n        R[i] *= g;\n    }\n    return { left: L, right: R };\n}\n\nself.onmessage = e => {const {id, request, profile}=e.data; try {if(!WEAPONS[profile.id])registerProfile(profile,profile.audio); const data=synthesizeEvent(request), seen=new Set(), transfers=[]; for(const obj of [data.stems,data.rawStems,data.weightedStems,{pcm:data.pcm}])if(obj)for(const a of Object.values(obj))if(a instanceof Float32Array&&!seen.has(a.buffer)){seen.add(a.buffer);transfers.push(a.buffer);}self.postMessage({id,data},transfers);}catch(err){self.postMessage({id,error:err.message});}};\n";
return {VERSION,Engine,Emitter,WEAPONS,ENVIRONMENTS,DEFAULT_SYNTH,DEFAULT_EQ,DEFAULT_CHAIN,DEFAULT_MIXER,DEFAULT_SUPPRESSOR,DEFAULT_LIMITER,EFFECT_PRESETS,ACTION_NAMES,LAYERS,synthesize,synthesizeEvent,resolveEvent,capabilities,registerProfile,registerPreset,renderShot,renderSequence,encodeWAV,PCMBuffer,measure,processChain,LinkedPeakLimiter,limitPCM,effectsOptions,mixerOptions,suppressorOptions,limiterOptions,synthOptions,actionOptions,emitterOptions,migrateScene,randomSeed};
});
