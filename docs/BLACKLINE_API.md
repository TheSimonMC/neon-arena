# BLACKLINE Engine / API

Version **0.4.0** · JavaScript · prozedurales Spiele-Audio · MIT

BLACKLINE erzeugt PCM aus Druckimpuls-ähnlichen Kurven, gefiltertem Rauschen und gestalteten mechanischen Kontakten. Es werden keine aufgenommenen Schüsse oder Raumantworten geladen. Waffenbezeichnungen sind Profilnamen; die Synthese ist kein akustisch kalibriertes Modell und keine Waffenfunktions- oder Ballistiksimulation. Der Schalldämpfer ist ein Klangdesign-Effekt für Spiele, keine Aussage über reale Kompatibilität oder Dämpfungsleistung.

## 1. Dateien und Start

| Datei | Aufgabe |
|---|---|
| `index.html` | Vollständiges Studio mit eingebetteter Engine, ohne externe Laufzeitdateien. |
| `blackline.js` | UMD: Browser-Global `Blackline`, unter Node `require()`. |
| `blackline.mjs` | ESM-Wrapper mit Default- und Named-Exports; benötigt die benachbarte `blackline.js`. |
| `blackline.d.ts`, `blackline.d.mts` | TypeScript-Typen für beide Modulvarianten. |
| `blackline.worker.js` | Generierter, eigenständig lesbarer Worker. Die Engine nutzt standardmäßig denselben eingebetteten Code als Blob-Worker. |
| `src/engine/` | Kanonische, logisch getrennte Engine-Module. |
| `weapons.json`, `sound-design.json` | Katalogmetadaten getrennt von gestalteten Klangparametern. |

Für das Studio genügt das Öffnen der HTML-Datei und ein Klick auf **Audio aktivieren**. Für Module und den bevorzugten AudioWorklet-Pfad lokal über einen Server starten:

```sh
python3 -m http.server 8080
```

Danach `http://localhost:8080/` öffnen. Für veröffentlichte Spiele HTTPS verwenden. Die Web-Audio-Ausgabe muss durch eine Nutzerinteraktion freigeschaltet werden. Worker und Worklet verwenden Blob-URLs; eine eigene Content Security Policy muss dies ausdrücklich erlauben. Bei gesperrtem Worker wird synchron synthetisiert. Bei nicht verfügbarem AudioWorklet wird der ausdrücklich ausgewiesene ScriptProcessor-Fallback verwendet. Dieser ältere Browserpfad ist kein Ersatz für einen Produktionstest auf dem Zielgerät.

## 2. Erstes laufendes Beispiel

```html
<button id="start">Audio starten / Impuls</button>
<script src="blackline.js"></script>
<script>
let engine, gun;
document.getElementById('start').onclick = async () => {
  try {
    if (!engine) {
      engine = new Blackline.Engine({ masterGain: 0.2, worker: true });
      gun = engine.createEmitter({
        id: 'player', weapon: 'g17', environment: 'field',
        perspective: 'firstPerson', effects: 'punchy'
      });
    }
    await engine.resume();
    await gun.fireAsync({ seed: Blackline.randomSeed() });
  } catch (error) {
    console.error(error);
  }
};
</script>
```

Alternativ im Modul:

```js
import Blackline, { Engine, synthesizeEvent } from './blackline.mjs';
```

Die Systemlautstärke zunächst niedrig einstellen. `masterGain` ist ein digitaler Abhörpegel und kein Realismusregler. Ein Limiter kann die akustische Lautstärke von Lautsprechern oder Kopfhörern nicht garantieren.

## 3. Signalweg und Geltungsbereiche

```text
Roh-Layer oder einzelner Audio-Cue
 → Synth-Layerpegel × Mixer-Gain × Quell-Headroom
 → DC-Filter / optionaler Schalldämpfer-Klangeffekt
 → eigener EQ → eigene Sättigung → eigener Kompressor
   (EQ alternativ nach der Sättigung)
 → getrennte bearbeitete Stems
 → pro Stem Direktsend + Raumsend
 → Emitter-Gain / Entfernung / Luftabsorption / Verdeckung / Panning
 → Direktschall + frühe Reflexionen + synthetischer Hall
 → Szenensumme / 22-Hz-Hochpass
 → stereogekoppelter Sample-Peak-Limiter
 → unabhängiger Monitor-Gain
 → Analyser / Ausgabe
```

**Kreative Effekte arbeiten pro Layer und pro Ereignis**, nicht auf einem globalen verzerrten Summenbus. Überlappende Ereignisse behalten ihre eigenen Effektzustände. Nur der finale Limiter bearbeitet die gemeinsame Szenensumme. Eine saubere Impulsfront bleibt möglich, ist aber nicht von dieser Ausgangskontrolle ausgenommen.

| Änderung | Wirkung |
|---|---|
| `setSynth`, `setEffects`, `setLayerEffects`, `setMixer`, `setSuppressor`, `setWeapon` | Nächstes erzeugtes Ereignis. Bereits vorbereitete PCM und laufende Voices bleiben unverändert. |
| Position, Hörer, Gain, Occlusion, Entfernung, Schallgeschwindigkeit, Perspektive | Laufende Emitterbusse; numerische Änderungen werden geglättet. |
| `setEnvironment` nur mit Wet/Early-Änderung | Bestehende Raumsends; keine neue IR. |
| Raumform/RT/Dämpfung/Breite | Neue Rauminstanz mit Übergang bzw. Ausklingen. |
| Panning-Modell | Native Graph-Eigenschaft; kein garantierter Crossfade. Möglichst zwischen Ereignissen ändern. |
| Limiter-Ceiling/Release | Laufende Summenverarbeitung. Lookahead ist bei Konstruktion festgelegt. |
| `masterGain` | Nur Abhören nach dem Limiter; verändert keine Sättigung. |

Positions-/Gain-Zielwerte verwenden normalerweise 15 ms Zeitkonstante, Hörerparameter 10 ms. Das sind Glättungsparameter, keine garantierten End-to-End-Latenzen. Per-Ereignis-Effekte benötigen kein Bypass-Umschalten mitten in einer Voice: die neue Einstellung gilt ab dem nächsten Ereignis.

## 4. Engine erstellen und an den Spielmixer anschließen

```js
const context = new AudioContext();
const sfxBus = context.createGain();
sfxBus.connect(context.destination);
const engine = new Blackline.Engine({
  context,
  destination: sfxBus,
  masterGain: 0.25,
  maxVoices: 64,
  speedOfSound: 343,
  worker: true,
  limiter: { ceilingDB: -1, releaseMS: 70, lookaheadMS: 5 }
});
await engine.resume(); // innerhalb einer erlaubten Benutzerinteraktion
```

`destination: null` verhindert die automatische Ausgangsverbindung. Danach lässt sich `engine.output.connect(sfxBus)` verwenden. `engine.input` führt zusätzliche eigene Audiosignale in die gemeinsame Ausgangskontrolle. Dabei entfallen die Waffen-Synthese und die Emitter-Raumverarbeitung für diese zusätzlichen Signale.

Ein übergebener `AudioContext` gehört dem Spiel und wird bei `dispose()` nicht geschlossen. Ein intern erzeugter Kontext gehört der Engine und wird geschlossen. Mehrere Engines im selben Kontext teilen den nativen `AudioListener`; für eine Szene ist deshalb normalerweise eine Engine sinnvoll.

### Engine-Konfiguration

| Feld | Standard / Bereich |
|---|---|
| `masterGain` | 0.28; 0–1 |
| `maxVoices` | 64; ganze Zahl 1–256; zählt Ereignisse, nicht einzelne Layer-Nodes |
| `speedOfSound` | 343; 250–450 m/s; gestaltete Schalllaufzeit, keine Wetterberechnung |
| `worker` | `false`; Vorbereitung im Worker einschalten |
| `limiter.ceilingDB` | −1; −18 bis −0.1 dBFS |
| `limiter.releaseMS` | 70; 10–1000 ms |
| `limiter.lookaheadMS` | 5; 0–20 ms, während der Engine-Lebensdauer unveränderlich |

### Öffentliche Engine-Methoden

| Methode | Ergebnis / Verhalten |
|---|---|
| `resume()` / `suspend()` | Promise; freischalten bzw. Ereignisse stoppen und Kontext pausieren. |
| `createEmitter(options)` | Neuer unabhängiger Emitter; doppelte oder ungültige IDs werden abgelehnt. |
| `setListener({position, forward, up})` | Position und orthogonalisierte Orientierung; Null-/Parallelvektoren werden abgelehnt. |
| `setMasterGain(value)` | Geglätteter Monitor-Gain. |
| `setMaxVoices(value)` | Budget ändern; erforderlichenfalls Voices mit Ausblendung entfernen. |
| `setSpeedOfSound(value)` | Laufzeiten aller Weltquellen aktualisieren. |
| `setLimiter(patch)` | Ceiling/Release ändern; abweichendes Lookahead erfordert eine neue Engine. |
| `setWorkerEnabled(boolean)` | Worker anlegen oder schließen; offene Aufträge werden beim Schließen verworfen. |
| `prepareEvent(request, {signal})` | Promise auf `PCMResult`, ohne Wiedergabe. |
| `stopAll({tails:true, immediate:false})` | Quellen ausblenden und standardmäßig auch Räume kurz ausblenden/zurücksetzen. `tails:false` lässt Raumfahnen stehen. |
| `emergencyStop()` | Sofortige Stille einschließlich Räumen und Limiterzustand; kann absichtlich hart abschneiden. |
| `snapshot()` | Reiner Konfigurationssnapshot, Schema `blackline.scene.v2`. |
| `loadSnapshot(value, {allowMonitorIncrease:false})` | Zuerst komplett validieren, dann Szene ersetzen. Abhörpegel standardmäßig nie erhöhen. |
| `dispose()` | Promise; Timer, Voices, Worker, Räume, Nodes und eigene Kontextressourcen freigeben. |

Gelesen werden können `context`, `currentTime`, `emitters`, `activeVoices`, `stats`, `timeline`, `backend`, `latencySeconds`, `input`, `output`, `analyser`. Unterstrich-Felder sind intern. Einstellungen über Methoden statt direkt über Objektfelder ändern.

## 5. Emitter, 3D-Position und Perspektive

```js
const source = engine.createEmitter({
  id: 'npc-17', weapon: 'm4a1', position: [3, 1.6, -12],
  environment: 'hall', room: { wet: 0.25, early: 0.5 },
  distanceModel: 'game', panningModel: 'HRTF',
  propagation: true, occlusion: 0, gain: 1, priority: 0,
  perspective: 'world', tailMode: 'natural',
  effects: 'clean', suppressor: false
});

// Im Update des Spiels; Werte stammen aus der Szene.
source.setPosition([8, 1.5, -20]);
source.setOcclusion(0.4);
engine.setListener({
  position: [0, 1.6, 0], forward: [0, 0, -1], up: [0, 1, 0]
});
```

Einheiten: Meter, +Y nach oben, Standardblickrichtung −Z. `setPosition(x,y,z)` ist ebenfalls erlaubt. `setDistance(distance, azimuthRadians, elevationRadians)` ist eine Komfortfunktion relativ zur Hörerposition; Winkel in **Radiant**, nicht Grad.

`distanceModel` ist `inverse`, `game` oder `none`. `game` verwendet eine flachere gestalterische Abschwächung; `none` deaktiviert nur die Pegelabnahme, nicht automatisch Luftfilter oder Laufzeit. `rolloff` liegt bei 0–4, Standard 1. `occlusion` liegt bei 0–1 und ist ein vom Spiel gelieferter Gestaltungswert, kein internes Raytracing.

`perspective:'firstPerson'` benutzt den hörerrelativen `firstPersonOffset` (Standard `[0.15,-0.12,-0.5]`). Entfernungsschwächung und Laufzeit entfallen; Richtung und Verdeckung bleiben gestaltbar. `world` benutzt die Weltposition. Weltlaufzeiten werden auf 29 Sekunden begrenzt. Die bewegte Delay-Line ist keine vollständige Wellenausbreitungs- oder Dopplersimulation.

### Öffentliche Emitter-Methoden

| Methode | Zweck |
|---|---|
| `setPosition`, `setDistance`, `setGain`, `setOcclusion` | Laufende räumliche Busse verändern. Gain 0–2. |
| `setDistanceModel(model, rolloff?)`, `setPanningModel(model)` | Entfernung und native HRTF/Equal-Power-Ausgabe. |
| `setPerspective(mode, offset?)` | Welt- oder Nahperspektive. |
| `setWeapon(id)` | Profil wechseln, Automatik beenden; laufende Klänge behalten ihr PCM. |
| `setSynth(patch)` | Quellparameter für neue Ereignisse. |
| `setEffects(presetOrPatch)` | Preset vollständig ersetzen oder `layers`-Patch zusammenführen. |
| `setLayerEffects(layer, patch)` | Einzelne kreative Effektkette verändern. |
| `setMixer(patch)` | Pro Layer Gain, Solo/Mute, Direktsend und Raumsend. |
| `setSuppressor(booleanOrPatch)` | Audio-Effekt ein-/ausschalten bzw. einstellen. |
| `setEnvironment(id, room?, {tailMode?})` | Raumwechsel; bisherige Overrides werden nicht still weitergeführt. |
| `update(patch)` | Mehrere Emitter-Einstellungen mit Vorvalidierung ändern. `synth` wird zusammengeführt; für tiefe Effekt-/Mixer-Patches die jeweiligen Setter verwenden. |
| `getCapabilities()` | Unterstützte Audio-Cues und Eigenschaften. |
| `fire`, `playAction`, `mechanics` | Synchron erzeugen und planen. |
| `prepare`, `fireAsync`, `playPrepared` | Asynchrone Vorbereitung und geplante Wiedergabe. |
| `startAutomatic`, `startSequence`, `stopAutomatic` | Audioereignisse takten. |
| `stop({immediate:false})` | Voices ausblenden, Vorbereitungen und Sequenz beenden; Räume bleiben bestehen. |
| `silence()` | Quellen sofort beenden und Raumgraph zurücksetzen. |
| `snapshot()` / `dispose()` | Emitterkonfiguration kopieren / Emitter freigeben. |

## 6. Ereignisse auslösen und planen

```js
const handle = source.fire({
  seed: 17017,
  when: engine.currentTime + 0.05,
  priority: 2,
  gain: 1,
  includeMechanics: true,
  includeCasing: false,
  latePolicy: 'drop'
});
```

`when` ist AudioContext-Zeit in Sekunden, nicht `Date.now()`. Maximal 30 Sekunden vorausplanen. Bei `latePolicy:'drop'` wird ein über 25 ms verspätetes Ereignis verworfen und `null` geliefert. Standard `play` startet sobald möglich. Spontane Wiedergabe besitzt eine kleine interne Planungsvorlaufzeit; sie ist nicht latency-free.

Alle Quelloptionen können pro Ereignis gesetzt werden: `synth`, `effects`, `mixer`, `suppressor`, `actionOptions`, `seed`, `debugStems`, `includeCasing`, `includeMechanics`, `legacyTrigger`. Effekt-/Mixer-Overrides pro Ereignis sind vollständige Konfigurationen mit Defaults, keine tiefen Patches der Emitterkonfiguration.

Standardmäßig folgt der Cue dem Emitter. Mit `position:[x,y,z]` oder `follow:false` entsteht eine unabhängige, nach dem Ausklang freigegebene Ereignisquelle. Das ist besonders für Kontakte am Boden gedacht:

```js
source.playAction('casingImpact', {
  seed: 31,
  position: [4, 0.1, -6],
  follow: false,
  actionOptions: { surface: 'metal', intensity: 0.6, bounces: 3 }
});
```

Die Position bleibt stehen, auch wenn sich die Waffe weiterbewegt; der Hörer kann sich weiterhin relativ dazu bewegen. Flugbahn/Kollision und Zeitpunkt bestimmt das Spiel.

Ein `EventHandle` enthält ID, `kind`, `action`, `seed`, `data`, `synthMS`, `positionAtStart`, `renderSnapshot`, `state` und `stop({immediate?})`. Zeitfelder unterscheiden:

- `scheduledAt`: Kontextzeit des API-Aufrufs/der Registrierung;
- `audioStart`: geplanter Beginn des Quellbuffers;
- `estimatedArrival`: Audio-Start plus modellierte Laufzeit und gemeldete DSP-Latenz;
- `sourceEnd`: Ende des Quell-PCM;
- `estimatedTailEnd`: geschätztes Ende einschließlich Raum und Laufzeit.

Hardware-Ausgabelatenz und die 2-ms-Vorlaufstelle innerhalb der Schussquelle sind keine exakten akustischen Triggerzeitstempel. UI-Animationen sollen bewusst `audioStart` oder `estimatedArrival` wählen.

## 7. Mechanik-Cues und Capabilities

```js
const caps = source.getCapabilities();
console.log(caps.actions);
if (caps.actions.includes('magIn')) {
  source.playAction('magIn', {
    actionOptions: { intensity: 0.7, material: 'polymer', damping: 1.2 }
  });
}
source.playAction('dryFire', { seed: 11 });
source.mechanics({ seed: 11 }); // Komposition 'cycle', kein Schuss
```

Die Registry enthält `triggerPress`, `triggerBreak`, `triggerRelease`, `triggerReset`, `dryFire`, `boltBack`, `boltForward`, `spring`, `magRelease`, `magOut`, `magIn`, `magSeat`, `safety`, `selector`, `pumpBack`, `pumpForward`, `casingImpact`, `hammerCock`, `cylinderOpen`, `cylinderClose`, `clip`, `cycle`.

Nicht jede Aktion existiert bei jedem Profil. `capabilities(id)` beziehungsweise `getCapabilities()` ist die verbindliche Abfrage. Unsupported Actions werfen `RangeError`; das Studio deaktiviert sie. Diese Namen sind Audio-Cues, keine Anleitung oder Abbildung einer Bedienlogik. Kein Cue verwaltet Munition, Ladestand, Verschlusszustand oder Feuerberechtigung.

`actionOptions`: `intensity` 0–2, `material` mixed/metal/polymer/wood, `resonance` 0.5–2, `damping` 0.3–3, `friction` 0–2, `bounces` 1–6, `surface` grass/gravel/concrete/wood/metal. Friction wirkt nur auf Cues mit Reibungsanteil; Bounces nur beim Hülsenkontakt. Ein isolierter Trigger-Cue enthält keinen Knall, vollen Zyklus oder Hülsenkontakt.

Im Schuss ist ein gestalteter Zyklus bei passenden Selbstladeprofilen enthalten. Pump- und Revolverprofile erhalten keinen automatischen Auswurf; Pumpbewegungen werden separat ausgelöst. Ein Triggerkontakt ist seit 0.4 **nicht mehr automatisch bei jedem `fire()`** enthalten. Für altes Verhalten gibt es `legacyTrigger:true`.

### Automatik und Sequenzen

```js
const loop = source.startAutomatic({ rpm: 700, seed: 17017, worker: true });
// Beim Loslassen:
source.stopAutomatic();
// Eine feste Testfolge funktioniert auch für nicht-automatische Profile:
source.startSequence({ count: 5, intervalMS: 550, seed: 17017 });
```

`startAutomatic` ist nur für passende Profile verfügbar. Der Controller setzt Trigger-Press/-Release einmal pro Haltephase, nicht pro Schuss. Wird das im Spiel selbst ausgelöst, `triggerCues:false` setzen. `count` 1–10000 oder Standard unbegrenzt bei Automatik; RPM 30–1500. `startSequence` nutzt standardmäßig fünf Ereignisse und 500 ms Abstand. Controller: `stop()`, `setRate(rpm)`, `active`.

Nach einem Scheduler-Stall werden überfällige Ereignisse verworfen, statt sie gebündelt nachzuholen. Die Statistik zählt sie als `lateDropped`. Für einen echten Spielzustand bleibt die Anwendung zuständig.

## 8. Syntheseparameter und Layer-Mixer

Die sechs Layer sind `transient`, `texture`, `body`, `gas`, `mechanical`, `casing`. Alle Quellparameter sind **Audio-Designwerte**, keine Eingaben für Pulver, Innendruck, Geschossenergie oder Waffenabmessungen.

| Parameter | Standard | Bereich / Bedeutung |
|---|---:|---|
| `transient`, `texture` | 1 / 1 | 0–1.5, Impulsfront und Knalltextur |
| `body`, `gas` | 0.55 / 0.75 | 0–1.5, nichttonaler Körper und Ausströmrauschen |
| `mechanical`, `casing` | 0.55 / 0.28 | 0–2, Mechanik- und Kontaktpegel |
| `brightness` | 0.86 | 0–1, sample-ratenabhängig begrenzte Rauschfärbung |
| `variation` | 0.035 | 0–0.2, Parameterstreuung; nicht das Abschalten von Zufallsrauschen |
| `frontDuration`, `frontShape` | 1 / 1 | 0.4–2.5 / 0.5–2 |
| `textureDecay` | 1 | 0.35–2.5 |
| `bodyBandwidth`, `bodyDecay` | 1 / 1 | 0.4–2 / 0.4–2.5 |
| `gasDecay` | 1 | 0.3–2.5 |
| `cycle` | 1 | 0.5–2, zeitliche Gestaltung mechanischer Abläufe |
| `metalness` | 0.28 | 0–1, Kontaktcharakter |
| `trigger`, `bolt`, `spring`, `return` | 1 / 1 / 0.35 / 1 | 0–2, jeweilige mechanische Teilanteile |
| `surface` | concrete | Untergrund für Kontakte |
| `solo`, `mute` | null / [] | Kompatible Layer-Auswahl in der Synthese |

Mixer-Beispiel:

```js
source.setMixer({
  transient: { gain: 0.9, room: 0.7 },
  body: { gain: 0.8, direct: 1, room: 1 },
  mechanical: { gain: 1, room: 0.25, mute: false, solo: false },
  casing: { room: 0.15 }
});
```

Jeder Mixer-Layer hat `gain`, `direct`, `room` (0–2) und `mute`, `solo` (Boolean). Standardgain/direkt sind 1; Raumsend 1, Mechanik 0.45, Hülsenkontakt 0.3. Sobald mindestens ein Mixer-Solo aktiv ist, werden die anderen Layer stumm. Synth-Solo/Mute und Mixer-Solo/Mute werden gemeinsam berücksichtigt.

## 9. EQ, Sättigung, Kompressor

```js
source.setEffects('punchy');
source.setLayerEffects('body', {
  eq: {
    enabled: true, position: 'pre',
    hp: { enabled: true, frequency: 45, Q: 0.707 },
    lowShelf: { frequency: 160, gain: -2, Q: 0.7 },
    bell1: { frequency: 950, gain: 2, Q: 0.8 },
    bell2: { frequency: 3200, gain: -1, Q: 1.1 },
    highShelf: { frequency: 6500, gain: 1, Q: 0.7 },
    lp: { enabled: true, frequency: 15000, Q: 0.707 }
  },
  saturation: { enabled: true, mode: 'soft', driveDB: 6,
    inputDB: 0, outputDB: -4, wet: 0.4, oversample: 4 },
  compressor: { enabled: true, threshold: -16, ratio: 2.5,
    knee: 6, attackMS: 14, releaseMS: 85, makeupDB: 0 }
});
```

**EQ:** HP, LP, Low-Shelf, High-Shelf, zwei Bell-Bänder. Frequenzanforderung 10–90000 Hz; der tatsächliche Filter wird auf 0.45 × Sample-Rate begrenzt. Gain ±24 dB, Q 0.15–12. Ein neutraler aktiver EQ ist neutral. `position:'post'` schiebt den EQ hinter die Sättigung, vor den Kompressor. Pole werden für zusätzliche Ereignis-Tail-Länge ausgewertet. Konfigurationen mit rechnerisch mehr als sechs Sekunden EQ-Abklingen werden abgelehnt, statt unbemerkt gekürzt.

**Sättigung:** eigenes Bypass, soft/tanh oder hard/clip, Input −24…24 dB, Drive 0…30 dB, Output −30…12 dB, Wet 0…1. Bei Bypass oder Wet=0 bleibt das definierte trockene PCM exakt erhalten; dann wirken auch die Sättigungstrims nicht. 4×-Oversampling benutzt FIR-Auf-/Abtastung und kompensiert deren Gruppenverzögerung in der vorbereiteten PCM. Dry und Wet werden zeitlich ausgerichtet. Das reduziert Aliasing, garantiert aber nicht dessen vollständige Abwesenheit. `oversample:1` ist der günstigere, stärker aliasende Modus.

**Kompressor:** unabhängige Dichtegestaltung nach EQ/Sättigung. Threshold −60…0 dB, Ratio 1…20, Knee 0…24 dB, Attack 0.1…100 ms, Release 5…1000 ms, Makeup ±24 dB. Keine automatische Lautheitsnormalisierung. Reduktion pro Layer unter `result.layerMetrics[layer].compressorReductionDB`.

Presets `clean`, `punchy`, `aggressive`: Clean deaktiviert kreative Effekte, nicht den Ausgangslimiter. Punchy/Aggressive bearbeiten Textur, Body und Gas, lassen Impulsfront, Mechanik und Kontakte zunächst sauber. Das Studio besitzt einen expliziten A/B-Vergleich mit gleichem Seed. Optional wird anhand eines gemeinsamen Quell-Zeitfensters nur die lautere Variante abgesenkt; dies ist kein integriertes Loudness- oder SPL-Messgerät.

## 10. Optionaler Schalldämpfer-Klang

```js
source.setSuppressor(true);
source.setSuppressor({ amount: 0.75, tone: 0.4 });
source.setSuppressor(false);
```

Dieser gestaltete Effekt reduziert/färbt nur Impulsfront, Textur, Körper und Gas. Mechanik und Hülsenkontakte bleiben unverändert. `amount:0` ist transparent. Alle 19 Profile bieten den Spieleffekt an, einschließlich solcher, für die daraus ausdrücklich keine reale Montage-/Funktionsaussage abgeleitet werden darf. Es wird kein separat berechneter Überschall-Geschossknall modelliert. Es gibt keine Daten über reale Dämpfer, Befestigung oder innere Konstruktion.

## 11. Räume

IDs: `field`, `forest`, `range`, `hall`, `concrete`, `tunnel`, `alley`, `valley`, `dry`.

```js
source.setEnvironment('hall', {
  rt: 2.4, wet: 0.3, early: 0.5, damping: 0.45, width: 1, size: 1.1
}, { tailMode: 'natural' });
```

RT 0–5 s, Wet/Early/Damping/Width 0–1, Size 0.25–3. Dry deaktiviert beide Raumpfade. Räume sind gestaltete Impulsantworten und frühe Verzögerungen, keine gescannten Gebäude oder geometrische Akustiksimulation.

Wet/Early-Änderungen verwenden vorhandene Nodes. Formänderungen wechseln den Raum über 60 ms; `natural` beendet die alte Einspeisung und lässt die alte Antwort ausklingen. Maximal vier alte Räume pro Emitter werden gehalten; bei extrem schnellen Wechseln wird der älteste verworfen. Acht synthetische IRs pro Engine werden zwischengespeichert. **Convolver werden nicht zwischen Emittern geteilt**; der Cache spart IR-Erzeugung, nicht jede Faltungsinstanz.

## 12. Worker, Timing und Last

```js
engine.setWorkerEnabled(true);
const prepared = await source.prepare({ seed: 17017 });
const handle = source.playPrepared(prepared, {
  when: engine.currentTime + 0.05, latePolicy: 'drop'
});
// Oder ohne garantierten festen Startzeitpunkt:
await source.fireAsync({ seed: 18 });
```

`fire()` bleibt synchron. `prepare()` erzeugt die vollständigen Event-Stems im Worker; auf dem zeitkritischen Audio-Thread arbeitet nur der blockweise Limiter. `fireAsync()` plant nach der Vorbereitung, sofern kein `when` angegeben wurde. Mit explizitem Termin muss genügend Vorlauf eingeplant werden. Es gibt keine ungemessene Latenzgarantie.

Worker-Ergebnisse besitzen eigene übertragene Float32-Puffer; kein geteilter mutierbarer PCM-Pool. `prepared` bleibt für mehrfache Wiedergaben verwendbar, sollte vom Aufrufer nicht verändert werden. Native AudioBuffers werden pro Wiedergabe erstellt. Worker-Warteschlange maximal 64 Aufträge, Watchdog 20 s. Ein Fehler fällt auf synchrone Synthese zurück und meldet `backendfallback`. Abort/Stop verwirft ein Ergebnis; bereits auf dem Worker laufende Berechnung muss dabei nicht sofort abbrechen.

Voice-Stealing bevorzugt höhere `priority` (−10…10); bei gleicher Priorität ältere Voices. Normales Stoppen blendet 6 ms aus. Geplante, aktive und ausklingende Voices sind in der Statistik getrennt. Der Budgetzähler betrifft Quellereignisse: bis zu sechs Layer-Sources pro Ereignis plus Raum-Nodes. Raumfahnen werden getrennt gezählt und nicht als neue Schüsse verbucht.

Der automatische Scheduler arbeitet mit begrenzten Vorschaufenstern und maximal zwei neu geplanten Ereignissen pro Tick. Er ist kein Ersatz für das Lastbudget des Spiels. Lange Hintergrundausschaltungen müssen durch die Anwendung gehandhabt werden; das Studio stoppt bei `visibilitychange`.

## 13. Reine PCM-Synthese, Stems und eigene Profile

Die reine Synthese benötigt weder DOM noch Web Audio:

```js
const B = require('./blackline.js');
const result = B.synthesizeEvent({
  weapon: 'barrett82', sampleRate: 48000, seed: 17017,
  effects: 'punchy', suppressor: false, debugStems: true
});
console.log(result.metrics, result.retainedBytes);
```

Der kompatible Aufruf bleibt erhalten:

```js
const result = B.synthesize('g17', { brightness: 0.8 }, 48000, 17017, 'shot', {
  effects: 'clean', debugStems: true
});
```

`rawStems`: rohe Synthese, ohne Layerpegel und Filter. `weightedStems`: Layer-/Mixer-Gain, Headroom, DC-Filter und ggf. Schalldämpfer, noch ohne kreative Effekte. `stems`: fertig bearbeitete Mono-Stems. `pcm`: Summe der bearbeiteten Stems **vor** Direktsends, Raum, Spatial-Audio und Szenenlimiter. `layers` ist nur ein Kompatibilitätsalias auf `rawStems` und ohne `debugStems` nicht vorhanden.

Die Stems besitzen bedarfsgerechte, eventuell unterschiedliche Längen. Zur Rekonstruktion auf die maximale Länge mit Nullen auffüllen und in Objekt-Reihenfolge summieren. So entsteht die Mono-Quellsumme bis zur definierten Float32-Rundung. Nach der nichtlinearen Szenenbegrenzung lassen sich separat gerenderte Beiträge nicht allgemein additiv zurückrechnen.

Unterstützte reine Raten: ganzzahlig 16000–192000 Hz; getestet wurden 16, 44.1, 48, 96 und 192 kHz. Native Browserausgabe kann weniger Raten akzeptieren. Identisches aufgelöstes Setup, Version, Rate und Seed ist im getesteten JS-Backend wiederholbar. Benannte Zufallsströme isolieren Layer/Cues. `variation:0` fixiert Parameterstreuung, aber ein anderer Seed erzeugt weiter anderes Rauschen. HRTF, native Filter, Faltung und andere JavaScript-Implementierungen sind nicht generell bitidentisch.

### Eigene Daten ergänzen

```js
B.registerProfile({
  id: 'custom-prop', name: 'Custom Prop', shortName: 'PROP',
  automatic: false, description: 'Fiktives Spieleprofil', sources: []
}, {
  family: 'pistol9', frontMS: 0.25, edge: 1, body: 0.8, tail: 1,
  mechanism: 'striker'
});
B.registerPreset('custom-dry', {
  layers: { texture: { saturation: { enabled: true, wet: 0.2, driveDB: 4 } } }
});
```

Familien: `pistol9`, `pistol45`, `magnum`, `smg9`, `rifle556`, `rifle762`, `rifleFull`, `pdw`, `heavy50`, `shotgun`. Mechanismen: `striker`, `hammer`, `toggle`, `revolver`, `roller`, `rifle`, `rifleHeavy`, `compact`, `openBolt`, `pump`. Audio-Werte `frontMS/edge/body/tail` 0.1–3. Die Registrierung erweitert die Bibliothek, nicht automatisch eigene Studio-Vektorzeichnungen. Eigene Profile müssen vor dem Import entsprechender Snapshots registriert werden; der Worker erhält ihre Definition automatisch.

### Weitere reine Hilfsfunktionen

`resolveEvent`, `synthOptions`, `effectsOptions`, `mixerOptions`, `suppressorOptions`, `actionOptions`, `limiterOptions`, `emitterOptions` normalisieren Daten. Endliche Zahlen werden innerhalb dokumentierter Designbereiche geklemmt; falsche Typen, IDs, unbekannte Aktionen und ungültige Seeds werden abgelehnt. Unbekannte ältere Synth-Felder werden aus Kompatibilitätsgründen ignoriert. `measure(pcmOrChannels)` liefert Peak/RMS/Crest. `processChain(pcm, chain, rate)` bearbeitet einen vom Aufrufer ausreichend gepaddeten Mono-Puffer; anders als `synthesizeEvent()` hängt dieser Low-Level-Aufruf keine Filterfahne an. `limitPCM(channels, rate, config)` begrenzt eine Mono-/Stereo-Summe und hängt Lookahead-Padding an. `LinkedPeakLimiter` ist der blockweise Baustein mit `process`, `configure`, `readMeter`, `resetMeter`; für direkte Nutzung müssen gültige finite Puffer und normalisierte Einstellungen geliefert werden.

## 14. Messwerte, Events und Fehler

```js
const unsubscribe = engine.on('event', ({ emitter, handle }) => {
  console.log(emitter.id, handle.kind, handle.action, handle.estimatedArrival);
});
engine.on('meter', meter => console.log(meter.postPeak, meter.maxReductionDB));
engine.on('backendfallback', info => console.warn(info));
engine.on('error', error => console.error(error));
// Beim Entfernen der UI:
unsubscribe();
```

Engine-Events: `event`, `shot`, `action`, `meter`, `error`, `backendfallback`. `mechanics()` zählt als Action. Emitter-Events liefern den Handle direkt: `event`, `shot`, `action`, `ended`; `sequenceend` liefert `{count}`. `on()` liefert eine Abmeldefunktion, `off(name, callback)` meldet gezielt ab. Synchron ungültige Aufrufe werfen; asynchrone Fehler sind abgelehnte Promises. Eigene Event-Listener-Ausnahmen werden protokolliert.

`engine.stats` enthält Event-/Shot-/Actionanzahl, Synthesezeiten, Voices, `scheduled`, `active`, `tails`, `stolen`, `lateDropped`, Workerqueue, Backend, IR-Cache sowie Limiterdaten. `timeline` enthält die letzten maximal 200 Event-Metadaten, keine vollständige Bewegungsautomation.

Quellmessung: gesamtes Mono-Event vor Spatial/Room/Limiter; `metrics.samples` bezeichnet die berücksichtigten Samples. Limiter: jedes Sample vor/nach der Begrenzung; native Worklet-Berichte alle 2048 Frames, Fallback alle 1024 Frames. Peak-Hold in `limiterTotals`; kein Ableiten kurzer Peaks nur aus gelegentlichen Bildschirmabfragen. Das Studio-Spektrum liegt hinter dem Monitor-Gain. Quell-Crest und Ausgabe-Crest haben unterschiedliche Zeitfenster und sind daher nicht direkt austauschbar. Es werden keine absoluten Schalldruckpegel berechnet.

## 15. Snapshots, Presets und Migration

```js
const scene = engine.snapshot();
localStorage.setItem('audioScene', JSON.stringify(scene));
const restored = JSON.parse(localStorage.getItem('audioScene'));
engine.loadSnapshot(restored); // erhöht masterGain nicht
```

Schema `blackline.scene.v2` enthält Engine-Konfiguration, Hörer, Monitor und Emitter einschließlich Synth/Effekte/Mixer/Suppressor/Raum/Perspektive. `migrateScene()` übernimmt v1 mit dokumentierten Defaults. Ein Snapshot speichert keine laufenden Voices, Filterzustände oder Hallfahnen. Studio-Sessions verwenden getrennt `blackline.studio.v2`; das Studio importiert v1/v2, nicht direkt Engine-Szenen. Studio-Voicebudget maximal 128 und fester 5-ms-Lookahead; API-Budgets sind weiter gefasst.

Import validiert vor dem Austausch. Ein Snapshot mit anderem Lookahead braucht eine passend konstruierte Engine. Eigene Profile/Presets müssen zuvor registriert sein. JSON-Konfiguration nicht ungeprüft aus fremden Quellen in eigene native Nodes oder dynamisch evaluierten Code übernehmen; BLACKLINE wertet Konfigurationen nicht als JavaScript aus.

## 16. WAV, Stems und Offline-Sequenzen

```js
const rendered = await B.renderShot({
  weapon: 'barrett82', seed: 17017, sampleRate: 48000,
  effects: 'punchy', suppressor: { enabled: true, amount: 0.7 },
  environment: 'hall', position: [5, 1.6, -20],
  listener: { position: [0, 1.6, 0], forward: [0, 0, -1], up: [0, 1, 0] },
  speedOfSound: 330, masterGain: 0.2, stage: 'scene'
});
const wav = B.encodeWAV(rendered.buffer, {
  format: 'float32', metadata: rendered.metadata
});
const url = URL.createObjectURL(new Blob([wav], { type: 'audio/wav' }));
const a = document.createElement('a');
a.href = url; a.download = 'blackline.wav'; a.click();
setTimeout(() => URL.revokeObjectURL(url), 1500);
```

Stufen: `scene`, `dry`, `wet`, `source`, `raw:transient`, `weighted:transient`, `stem:transient` und entsprechend alle anderen Layer. Scene/Dry/Wet sind Stereo inklusive Summenlimiter und explizitem Monitor-Gain (Standard 0.28); Source/Stems sind Mono ohne Monitor/Szenenlimiter und können ±1 überschreiten. Sie funktionieren auch unter Node. Raumrender benötigen `OfflineAudioContext`.

`encodeWAV`: `pcm16` oder `float32`, optional deterministisches TPDF-Dither bei PCM16, kein automatisches Normalisieren. PCM16 muss Werte außerhalb ±1 begrenzen; Float32 erhält sie. Metadaten werden optional als RIFF-Kommentar mitgeschrieben. `PCMBuffer` besitzt `numberOfChannels`, `length`, `sampleRate`, `duration`, `getChannelData`, `copyFromChannel`.

```js
const result = await B.renderSequence([
  { at: 0.01, weapon: 'g17', kind: 'action', action: 'triggerPress', seed: 1 },
  { at: 0.06, weapon: 'g17', kind: 'shot', seed: 2 },
  { at: 0.23, weapon: 'g17', kind: 'action', action: 'triggerRelease', seed: 3 }
], { sampleRate: 48000, environment: 'range', stage: 'scene', masterGain: 0.2 });
```

1–128 Ereignisse; `at` 0–60 s, maximale Gesamtlänge 90 s einschließlich Tails. Filterdauer, Raum, Schalllaufzeit, Limiterverzögerung und tatsächliche Sample-Rate gehen in die Länge ein. Ein `AbortSignal` verhindert Lieferung eines abgebrochenen Renders; eine bereits laufende native Offline-Berechnung kann der Browser trotzdem intern zu Ende rechnen. Nodes werden danach freigegeben.

Das Studio bietet ausdrücklich **aktuelles Setup neu rendern** oder **Snapshot des letzten Ereignisses**. Letzteres verwendet `handle.renderSnapshot`, nicht heimlich die gerade sichtbaren Werte. Sample-Rate, Seed, Eventtyp, Bearbeitungsstufe und Format werden angezeigt. Beide Modi sind statische Neuberechnungen: keine Aufnahme früherer Live-Bewegungen oder bereits vorhandener Raumfahnen. Dry/Wet-Einzelergebnisse sind nach unabhängiger nichtlinearer Begrenzung nicht allgemein zur kompletten Szene addierbar.

## 17. Grenzen und weiterführende Dateien

Die 19 Außenansichten sind Illustrationen, keine maßhaltigen CAD-Datensätze. Katalogdaten und verlinkte Quellen stehen getrennt vom Audiomodell. Es gibt keinen nativen Unity-/Unreal-/Java-Adapter, keine Minecraft-Mod, keine geometrische Verdeckungsberechnung und keinen vollständigen Automation-Recorder. Eigene externe Nodes sind über Ein-/Ausgang anschließbar; ein beliebiger Node-Insert pro internem Stem ist keine öffentliche API.

Der native AudioWorklet-Lauf wurde in der mitgelieferten Testumgebung nicht ausgeführt; dort wurden derselbe Limiter-DSP und der tatsächliche ScriptProcessor-Fallback geprüft. Eine subjektive Hörabnahme, ein Hörvergleich mit realen Waffen und mobile Hardware-Lasttests stehen aus. Siehe [Testbericht](docs/TESTING.md), [Architektur](docs/ARCHITECTURE.md), [Migration](docs/MIGRATION.md) und [Änderungsübersicht](docs/CHANGELOG.md).
