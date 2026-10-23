# BLACKLINE 0.3.0 — JavaScript API

## 1. Minimaler Einstieg

```html
<button id="start">Audio starten</button>
<button id="shot" disabled>Schuss</button>
<script src="./blackline.js"></script>
<script>
let engine, gun;
document.querySelector('#start').onclick = async () => {
  try {
    if (!engine) {
      engine = new Blackline.Engine({masterGain: 0.28, maxVoices: 48});
      gun = engine.createEmitter({
        weapon: 'g17', environment: 'field', position: [0, 1.6, -1]
      });
    }
    await engine.resume(); // Browser-Audio innerhalb einer Benutzerinteraktion
    document.querySelector('#shot').disabled = false;
  } catch (error) {
    console.error('BLACKLINE konnte nicht starten:', error);
  }
};
document.querySelector('#shot').onclick = () => gun.fire();
</script>
```

Alternativ über einen Entwicklungsserver:

```js
import {Engine, WEAPONS, synthesize} from './blackline.mjs';
```

Für TypeScript die beiliegende `blackline.d.ts` nutzen und die DOM-Typen aktivieren. Beim direkten Import der `.mjs`-Datei kann je nach TypeScript-Modulauflösung die beiliegende `blackline.d.mts` verwendet werden. Es gibt keinen API-Key, keine Cloud und keine kostenpflichtigen Endpunkte. „API“ bedeutet hier eine lokale Programmierschnittstelle.

## 2. Koordinaten und laufende Änderungen

Rechtshändiges System in **Metern**: +X rechts, +Y oben, standardmäßige Blickrichtung −Z. Quellposition und Hörerposition sind Weltkoordinaten.

```js
// In deinem Update-/Render-Loop, nicht neue Emitter pro Frame erzeugen:
gun.setPosition([weaponWorldX, weaponWorldY, weaponWorldZ]);
engine.setListener({
  position: [cameraX, cameraY, cameraZ],
  forward: [forwardX, forwardY, forwardZ],
  up: [0, 1, 0]
});
// Etwa aus deinem Sicht-/Occlusion-System:
gun.setOcclusion(0.65);
```

`forward` und `up` werden normalisiert. Nullvektoren und nahezu parallele Richtungen werden abgelehnt. `setPosition(x,y,z)` ist ebenfalls möglich. Positions-, Filter- und Gain-Parameter werden kurz geglättet, nicht hart gesprungen.

`gun.setDistance(10, Math.PI / 2, 0)` positioniert die Quelle 10 m rechts vom Hörer. Winkel sind **Radiant**, Höhe als Elevationswinkel. Diese Hilfsmethode ist in globalen X/Z-Achsen relativ zur Hörerposition definiert; sie dreht sich nicht automatisch mit `listener.forward`. Für eine Kamerakoordinate erst deinen Spieltransform in Weltkoordinaten umrechnen.

**Wirkung:** Position, Entfernung, Schalllaufzeit, Pegel und Verdeckung betreffen auch laufende Ereignisse. Bei stark bewegter Quelle ändert sich die Verzögerungsleitung kontinuierlich; das kann die Tonhöhe mit verändern. Klangparameter gelten für die nächste Synthese, nicht rückwirkend auf bereits berechnete PCM-Werte. Raumwechsel überblenden 80 ms, alte Hallfahnen werden ausgeblendet. Späte diffuse Hallanteile sind nicht als ortsfeste Reflexionsobjekte modelliert.

## 3. Engine und eigener Audiomixer

```js
const context = new AudioContext({latencyHint: 'interactive'});
const gameMixer = context.createGain();
gameMixer.connect(context.destination);
const engine = new Blackline.Engine({
  context, destination: gameMixer,
  masterGain: 0.22, maxVoices: 64, speedOfSound: 343
});
await engine.resume();
```

| Option | Default / Bedeutung |
|---|---|
| `context` | Neue AudioContext; alternativ eigene AudioContext oder OfflineAudioContext |
| `destination` | `context.destination`; `null` erzeugt einen zunächst unverbundenen Ausgang |
| `masterGain` | 0.28; Bereich 0–1, Digitalverstärkung und keine dB-SPL-Angabe |
| `maxVoices` | 64, geklemmt auf 1–256; älteste Stimme wird bei Überschreitung gestoppt |
| `speedOfSound` | 343 m/s, Bereich 300–380; nur für Schalllaufzeit |

`engine.input`, `engine.output`, `engine.master`, `engine.analyser`, `engine.hp`, `engine.limiter` und `engine.context` sind zugänglich. `output.connect(myNode)` verbindet die Engine mit einem eigenen Effektbus. Nicht zusätzlich an `destination` anschließen, wenn sie schon über den Spielmixer verbunden ist — das würde doppelt ausgeben. Der gemeinsame Hörer ist der Listener des AudioContext; bei mehreren Audio-Systemen im gleichen Context diese Zuständigkeit koordinieren.

| Methode | Wirkung |
|---|---|
| `await resume()` | Context nach Benutzerinteraktion aktivieren |
| `await suspend()` | Quellen/Hall stoppen und Context pausieren |
| `createEmitter(options)` | Unabhängige Quelle erzeugen; optionale `id` muss eindeutig sein |
| `setListener(patch)` | Weltposition, Blickrichtung, Up-Vektor |
| `setMasterGain(value)` | Geglätteter Engine-Master |
| `stopAll({tails:true})` | Default: Ereignisse, Timer, Delays und Hallfahnen entfernen |
| `stopAll({tails:false})` | Quellen stoppen; bestehende Raumfahnen dürfen ausklingen |
| `snapshot()` | Serialisierbare Engine-/Emitter-Konfiguration; kein Audiozustand |
| `await dispose()` | Alle Emitter und Verbindungen entfernen; nur selbst erzeugten Context schließen |

`engine.stats` liefert `shots`, `lastSynthMS`, `maxSynthMS`, `voices`, `emitters`, `sampleRate`, `state`. `engine.activeVoices`, `engine.currentTime` und `engine.emitters` sind direkt lesbar. Statistiken sind Beobachtungen, keine Performance-Garantie.

## 4. Emitter erstellen und aktualisieren

```js
const rifle = engine.createEmitter({
  id: 'npc-rifle-17', weapon: 'm4a1',
  position: [3, 1.6, -12],
  environment: 'hall', room: {wet: 0.30, rt: 2.1},
  distanceModel: 'game', rolloff: 1,
  panningModel: 'HRTF', propagation: true,
  occlusion: 0, gain: 1,
  synth: {mechanical: 0.45, brightness: 0.9, surface: 'concrete'}
});
```

`gain` 0–2, `occlusion` 0–1, `rolloff` 0–4. Der Default ist `distanceModel:'inverse'`, `panningModel:'HRTF'`, `propagation:true`. `inverse` verwendet eine einfache 1/r-artige Pegelabnahme mit Referenzdistanz 1 m; `game` reduziert diese Abnahme auf einen wahrnehmungsorientierten Spielmix; `none` entfernt nur die Entfernungs-Pegelabnahme. Luftabsorption, Laufzeit, Panning und Verdeckung bleiben bei `none` aktiv. Es gibt keine physische SPL-Kalibrierung.

Methoden: `setPosition`, `setDistance`, `setGain`, `setOcclusion`, `setDistanceModel(model,rolloff)`, `setPanningModel`, `setWeapon`, `setSynth(patch)`, `setEnvironment(id,overrides)`, `update(patch)`.

```js
rifle.update({
  position: [8, 1.8, -20], occlusion: 0.4,
  environment: 'alley', room: {wet: 0.2},
  synth: {texture: 1.1}
});
```

Die Mehrfachänderung ist nicht transaktional: vorangehende Teiländerungen können bei einer späteren ungültigen Angabe bereits erfolgt sein. Validierte Spielzustände übergeben. Ein Waffenwechsel stoppt Automatik, aber nicht automatisch alle bereits klingenden Ereignisse; für einen sofortigen harten Wechsel vorher `silence()` verwenden. `setEnvironment(id)` setzt die Raumparameter auf die Defaults dieser Umgebung, während `update({room:...})` die angegebenen Raumwerte mit dem jeweiligen Grundpreset verwendet.

## 5. Einzelereignisse, Automatik und Sequenzen

```js
const h = rifle.fire({seed: 429, gain: 1});
// Oder präzise in AudioContext-Sekunden planen:
rifle.fire({when: engine.currentTime + 0.08, seed: 430});
// Aktuelles/noch geplantes Ereignis gezielt stoppen:
h.stop();
```

`fire()` benötigt einen laufenden Context, außer im Offline-Renderer. Zeit in AudioContext-Sekunden, nicht `Date.now()`. Vergangene Zeiten werden auf jetzt begrenzt. Höchstens 30 Sekunden im Voraus planen. Die erste Synthese kann wegen Browser-JIT merklich länger dauern als spätere. Ein Spiel sollte zeitkritische Ereignisse mit kurzem Vorlauf planen oder für hohe Anforderungen ein Worker-/Worklet-Backend ergänzen.

Ein Handle enthält `id`, `when`, `seed`, `duration`, `weapon`, `source` (AudioBufferSourceNode), `gainNode`, `data`, `synthMS`, `stopped` und `stop()`. `data` enthält mono PCM, rohe Teilschichten, Peak, RMS und Syntheseoptionen. Die Teilschichten sind vor Layer-Gain und finalem DC-Filter; ihre rohe Summe ist deshalb nicht exakt das fertige `pcm`.

```js
const burst = rifle.startAutomatic({rpm: 825, count: 8, seed: 1000});
burst.setRate(700);
burst.stop();
// Unbegrenzte Automatik bis zum Loslassen:
rifle.startAutomatic();
rifle.stopAutomatic();
// Für beliebiges Profil, explizit als Audio-Testsequenz:
rifle.startSequence({count: 5, intervalMS: 500, seed: 1200});
```

Automatik nur bei `WEAPONS[id].automatic`. Rate 30–1500/min; Default profilabhängig. `count` 1–10000 oder `Infinity`; Sequenzen mit `intervalMS` werden auf denselben Ratenbereich begrenzt. Ein angegebener Seed wird pro Ereignis um eins erhöht. Die Sequenz plant mit 20-ms-Timer und 60-ms-Vorlauf anhand des AudioContext; nach großen Hauptthread-Stalls wird nicht eine lange Queue nachgeholt. `stopAutomatic()` bricht den Timer und noch in der Zukunft geplante Ereignisse ab, lässt bereits gestartete Klänge ausklingen. `stop()` stoppt alle Quellereignisse, `silence()` auch Delays/Hall. `dispose()` entfernt die Quelle vollständig.

`mechanics({seed})` erzeugt ein separates mechanisches Ereignis. Die Mossberg benötigt es für den Pumpvorgang; beim Revolver gibt es keinen automatischen Hülsenauswurf. Magazinstand, Feuerberechtigung, Gameplay-Feuerrate und Nachladen kontrolliert das Spiel selbst. Die Engine ist keine Waffenfunktionssimulation.

Ereignisse werden **beim Erzeugen/Planen**, nicht erst beim hörbaren Schallankunftszeitpunkt, gemeldet:

```js
const unsubscribe = engine.on('shot', ({emitter, handle}) => {
  console.log(emitter.id, handle.when, handle.seed);
});
const off = rifle.on('shot', handle => console.log(handle.data.peak));
unsubscribe(); off();
```

Emitter liefern außerdem `sequenceend` mit `{count}`, sobald alle Ereignisse geplant sind. Das ist nicht das Ende ihrer Hallfahnen.

## 6. Klang- und Raumparameter

`setSynth()` ändert nur neue Ereignisse. Pegel sind lineare Faktoren, nicht dB.

| Schlüssel | Bereich | Default |
|---|---:|---:|
| `transient`, `texture` | 0–1.5 | 1 / 1 |
| `body`, `gas` | 0–1.5 | 0.55 / 0.75 |
| `mechanical`, `casing` | 0–2 | 0.55 / 0.28 |
| `brightness`, `metalness` | 0–1 | 0.86 / 0.28 |
| `variation` | 0–0.2 | 0.035 |
| `cycle` | 0.5–2 | 1 |
| `trigger`, `bolt`, `spring`, `return` | 0–2 | 1 / 1 / 0.35 / 1 |
| `surface` | grass / gravel / concrete / wood / metal | concrete |
| `solo` | einer der sechs Layernamen oder `null` | null |
| `mute` | Array der Layernamen | [] |

`cycle` ist eine gestaltete Zeitskalierung der Mechanik, kein physischer Umrüstungsparameter. Die Kapazitäten, Kaliber und Laufmaße des Katalogs werden nicht als Ballistikmodell verwendet. Hohe Summenpegel werden durch die Ausgangsbegrenzung verändert; extreme Layer-Regler sind ein Sounddesign-Werkzeug, keine garantierte Originaltreue.

Umgebungen: `field`, `forest`, `range`, `hall`, `concrete`, `tunnel`, `alley`, `valley`, `dry`.

Raumoptionen: `rt` 0–5 s (angestrebte Abklingzeit), `wet` 0–1, `early` 0–1, `damping` 0–1, `size` 0.25–3, `width` 0–1. `dry` erzwingt kein Hall/keine Reflexionen. Diffuser Hall wird per erzeugter Stereo-Impulsantwort und Convolver ausgegeben; diskrete frühe Reflexionen über eigene Delay-/Filter-/Pan-Knoten. Kein Raytracing, kein tatsächlich vermessener Schießstand. Häufige Raumänderungen erzeugen neue Convolver: Raumregler drosseln/debouncen, nicht jede Frame komplett neu bauen.

## 7. PCM, Offline-Export, Wiederholbarkeit

```js
// Auch ohne AudioContext, z. B. in Node:
const event = Blackline.synthesize('g17', {brightness: 0.86}, 48000, 17017);
// event.pcm ist Float32Array; nicht aufgenommene Tondatei.

const {buffer} = await Blackline.renderShot({
  weapon: 'g17', environment: 'hall',
  position: [-3, 1.6, -8], masterGain: 0.28,
  panningModel: 'HRTF', distanceModel: 'game',
  sampleRate: 48000, seed: 17017
});
const wav = Blackline.encodeWAV(buffer); // ArrayBuffer, PCM16 Stereo
```

`synthesize` akzeptiert 16–192 kHz, `renderShot` 16–96 kHz. Offline-Ausgabe enthält Schalllaufzeit und Hallausklang; berechnete Dauer über 30 s wird abgelehnt, nicht heimlich abgeschnitten. Die Echtzeit-Laufzeit wird auf 29 s begrenzt. Entfernungen sollten entsprechend plausibel für die Spielszenengröße bleiben.

Gleiche Version, gleiche Optionen, gleiche Sample-Rate und gleicher Seed ergeben innerhalb der getesteten Runtime identisches Quell-PCM. Plattformübergreifende Bitidentität von HRTF, Filtern, Floating-Point-Mathematik oder Convolver wird nicht garantiert. Für deterministisches Multiplayer-Audio Seed, Profil, Optionen und Ereigniszeit replizieren; keine PCM-Daten über das Netzwerk nötig. Export normalisiert den Pegel nicht nachträglich und kann bei großer Distanz daher leise sein.

`WEAPONS`, `ENVIRONMENTS` und `DEFAULT_SYNTH` sind eingefrorene Kataloge. Neue registrierte Modell-IDs zur Laufzeit sind in 0.3.0 nicht vorgesehen. Für eigene Profile den offen beiliegenden Katalog/Quellcode ändern und mit `src/build.py` neu erzeugen. Bestehende Klangprofile sind per `setSynth` frei gestaltbar.

## 8. Produktivbetrieb und Abbau

Nur einen langlebigen Emitter pro aktiver Audioquelle verwenden. Nicht für jeden Schuss neue Hallräume anlegen. Weit entfernte oder unsichtbare NPCs benötigen nicht automatisch eigene vollständig hallende Audioknoten. Voices begrenzen, Ereignisse bei Hintergrundwechsel stoppen, eigene Lasttests auf Mobilgeräten durchführen. Nach der Szene `emitter.dispose()` bzw. `await engine.dispose()` aufrufen. Bei geliehenem Context dessen Zustand und Mixer im eigenen Spiel aufräumen.

Die Engine ist ein editierbarer Prototyp/SDK-Baustein. Keine attestierte Realwaffen-Akustik, kein Schutz gegen zu hohe Kopfhörerlautstärke, kein fertiges natives Middleware-Plug-in. Vollständige technische und inhaltliche Grenzen stehen in README und im Labor unter „API & Grenzen“.
