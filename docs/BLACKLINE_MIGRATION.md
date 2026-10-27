# Migration 0.3.0 → 0.4.0

## Bestehende Aufrufe

`new Engine`, `createEmitter`, `fire`, `mechanics`, Position/Listener, die bisherigen neun Umgebungen, `synthesize`, `renderShot` und PCM16-WAV bleiben verfügbar. Die Klangdaten sind jedoch bewusst verändert; ein alter Seed erzeugt nicht automatisch denselben Klang wie in 0.3.0. Pinne die Engine-Version für Referenzdaten.

`mechanics()` ist jetzt ausdrücklich eine Action-Komposition und wird nicht als Schuss gezählt. Ereignisse dafür über `action` oder `event` abonnieren, nicht nur über `shot`.

`fire()` enthält standardmäßig keinen zusätzlichen Triggerkontakt. Separate `playAction('triggerPress')` und `playAction('triggerRelease')` dürfen die Anwendung steuern. Die Automatik erzeugt diese Kontakte einmal je Haltephase. Für einen alten Einzelereignis-Mix `legacyTrigger:true` benutzen; bei manuell gesteuerten Automatik-Triggern `triggerCues:false`.

`result.layers` ist jetzt nur mit `debugStems:true` vorhanden und bezeichnet weiterhin rohe Layer. Neue Integrationen nutzen `stems`, `rawStems`, `weightedStems` und die dokumentierten Summenbeziehungen. Unterschiedlich lange Stems sind erlaubt; nicht mehr feste 0.88 Sekunden voraussetzen.

## Schemas und Export

Engine-Szenen: `blackline.scene.v2`; Studio: `blackline.studio.v2`. Beide übernehmen v1-Daten mit Defaults. Engine-Snapshot enthält jetzt `maxVoices`, `speedOfSound`, Limiter und Worker-Konfiguration; Emitter zusätzlich Effekte, Mixer, Suppressor und Perspektive. Import erhöht den Monitor nicht automatisch. Eigene Profile vor dem Import registrieren.

Der Studioexport entscheidet explizit zwischen aktuellem Setup und dem eingefrorenen Snapshot des letzten Ereignisses. Ein Waffenwechsel verwirft diesen letzten Exportsnapshot nicht mehr. Ein Session-Import setzt die laufende Studiohistorie zurück. Exportrate ist wählbar statt fest auf 48 kHz gesetzt. Neue Formate: Float32, optionales PCM16-Dither, Roh-/gewichtete/bearbeitete Stems, Dry/Wet.

## Reproduzierte Fehler und Korrekturen

Die Baseline-Prüfung gegen die tatsächlich vorhandene 0.3.0-Quelle ist unter `tests/baseline-0.3.0.json` gespeichert. Die alte Quelle ist kein zweites, zu pflegendes Engine-Bundle im Repository.

| Befund | Einordnung / Änderung |
|---|---|
| Mehrere Mechanikprofile identisches PCM | Fehler bzw. zu generische Implementierung: Mechanismusfamilien und Varianten jetzt messbar unterschiedlich. |
| Brightness bei 16 kHz ohne Wirkung | Fehler: Rauschband relativ zur Sample-Rate nutzbar begrenzt. |
| Pump-Cycle/-Spring ohne Wirkung | Fehler: getrennte Pump-/Federkomposition mit wirksamen Parametern. |
| Kontakte über Nyquist, feste Sample-Glättung | Fehler: Modenbegrenzung und frequenz-/zeitbasierte Koeffizienten. |
| Doppelte automatisch/manuell erzeugte IDs | Fehler: geprüfte IDs und kollisionsfreie Vergabe. |
| Feste 343 im Offlinepfad; unvollständiger Snapshot | Fehler: Enginewert auch offline und im Snapshot. |
| Sieben feste 0.88-s-Puffer, auch für Mechanik | Laufzeitgrenze: bedarfsgerechte Layer/Dauer, Debugdaten optional, Worker-Vorbereitung. Keine pauschale Peak-Heap-Einsparung behauptet. |
| WaveShaper als gemeinsame Ausgangsbegrenzung | Designgrenze: durch zeitabhängigen stereogekoppelten Sample-Peak-Limiter ersetzt. |
| Kein frei konfigurierbarer EQ / kein Einzelsystem für Actions | Fehlende Funktionen: neue unabhängige Ketten/Cues samt UI/API. |
| Bisherige Raum-Crossfades, externe Gameplay-Verantwortung, Event-Parameter erst beim nächsten Klang | Bewusste Entscheidungen, nicht als Fehler behandelt. |

## Neue Validierung und Routing

Seeds sind uint32; IDs sind definierte kurze Zeichenfolgen. Mehrfachupdates und Imports werden vor Anwendung geprüft. Zahlen müssen endlich sein. Werte innerhalb eines bekannten Designparameters werden auf dessen Bereich begrenzt. Unbekannte alte Synth-Felder bleiben aus Kompatibilitätsgründen ignoriert.

Die Engine-Limiterinstanz ist kein `WaveShaperNode` mehr. Interne Nodes nicht als stabile API betrachten. Eigene Mixerroutings über `destination`, `engine.input` und `engine.output` anbinden. `setLimiter()` kann Ceiling/Release ändern, nicht das Lookahead des bestehenden Graphen.

Das Studio benötigt keine neue Datei zur Laufzeit. Die Modulbibliothek benötigt bei ESM zusätzlich die benachbarte `blackline.js`; Worker-Code ist bereits eingebettet. Für gesicherte Browserfeatures localhost/HTTPS bereitstellen.
