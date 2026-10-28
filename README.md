# Neon Arena / Neon Duel

Statisches Browser-Spiel für GitHub Pages. Kein Build und keine Anmeldung nötig.

## Spielen
WASD bewegen, Maus zielen, Linksklick schießen. Solo oder zwei Spieler.

## Multiplayer mit PeerJS
1. Beide öffnen die aktuelle Seite. Der Host klickt MULTIPLAYER und LOBBY ERSTELLEN.
2. Erst wenn PeerJS die Lobby registriert hat, erscheint ein 8-stelliger Code samt Einladungslink.
3. Der Gast öffnet den Link oder gibt den Code ein und klickt BEITRETEN. Kein Antwortcode nötig.
4. Beide bleiben auf der Seite. Nach Versionsprüfung startet das Duell automatisch.

PeerJS 1.5.5 ist fest versioniert lokal unter `vendor/peerjs.min.js` eingebunden. Damit hängt das Laden des Clients nicht von einem externen CDN ab. Standardmäßig vermittelt PeerJS Cloud über HTTPS/WSS Port 443 die Verbindung. Optional lässt sich ein eigener PeerServer-Hostname mit HTTPS-Port 443 und Pfad `/` eintragen. Beide Teilnehmer müssen denselben Server verwenden. Lobby-Codes sind zufällige Einladungskennungen, keine Identitätsprüfung oder Passwörter. Keine öffentlichen Lobby-Listen.

Der Host berechnet die Welt; der Gast sendet nur Eingaben. Der Datenkanal verwendet JSON-Strings ohne zusätzliche PeerJS-Serialisierung. Ein eigener Hello/Ready-Handshake prüft Spielprotokoll 6 und BLACKLINE-Katalog. Veraltete Verbindungscodes funktionieren nicht mehr. Registrierung bricht nach 20 Sekunden, Datenverbindung nach 25 Sekunden ab. Ein Heartbeat erkennt stumme Verbindungen nach 15 Sekunden. Bei Gast-Abbruch bleibt eine registrierte Host-Lobby für einen neuen Versuch bestehen; die Runde beginnt dann neu. Eine dritte Verbindung wird abgewiesen. Alte Callbacks können keine beendete Sitzung wieder öffnen.

## TURN
Die unveränderten ICE-Defaults von PeerJS 1.5.5 sind aktiv, einschließlich der dort angegebenen öffentlichen TURN-Server. Deren Verfügbarkeit ist nicht garantiert. In manchen Mobilfunk-, Firmen- und NAT-Netzwerken reicht eine direkte Verbindung nicht aus. Dafür unter „Netzwerk / TURN“ auf beiden Geräten einen erreichbaren TURN-Server, Benutzername und Passwort eintragen, danach neue Codes erzeugen. „Nur TURN“ erzwingt einen Relay-Test. Zugangsdaten werden nicht gespeichert oder in die Codes aufgenommen. Keine dauerhaften TURN-Geheimnisse ins öffentliche Repository schreiben.

Es wird kein eigener TURN-Dienst betrieben. GitHub Pages hostet nur die statischen Dateien. Referenz: https://webrtc.org/getting-started/turn-server

## GitHub Pages
Repository erstellen und diese Dateien auf den main-Branch übertragen. Unter Settings > Pages > Build and deployment: Deploy from a branch, main, / (root), Save. index.html liegt direkt im Repository-Wurzelverzeichnis.

## Prüfung
`node tests/regression.cjs` prüft Spielzustand, Verbindungswechsel, Eingabe-Timeout und Paketvalidierung mit simulierten Browser-APIs. Ein echter Verbindungsaufbau über zwei getrennte Netzwerke muss nach der Bereitstellung separat getestet werden.

## 3D-Version (Protokoll 6)
Echter WebGL-Renderer mit Perspektive und Tiefenpuffer, dreidimensionalen Gitterwänden und Spieler-Modellen. Ein Postprocessing-Pass erzeugt Bloom, einstellbare Fisheye-Verzerrung, leichte Farbsäume und eine Vignette. Keine externen JavaScript-Abhängigkeiten.

- WASD / Pfeiltasten: Bewegung. Maus: Zielen. Linksklick: Feuern.
- Space / linke Umschalttaste: Dash (2 Sekunden Abklingzeit).
- Handy: linker Stick bewegt, rechter Stick zielt und feuert, Blitz-Taste aktiviert Dash.
- Grüne Stationen heilen 50 HP und laden 12 Sekunden nach. Geschosse enden beim ersten Wandtreffer.
- Zehn Eliminierungen gewinnen die Runde. Solo-Neustart über den Neustart-Button; online eine neue Host-Sitzung erstellen.
- Ton startet nach dem Start-Klick. TON und MUSIK sind separat schaltbar. FX RUHIG reduziert Partikel und deaktiviert Kamerawackeln und rote Trefferblenden. Die Einstellung berücksichtigt prefers-reduced-motion.
- Beide Spieler müssen die neue Seite laden und neue Codes austauschen. Alte Verbindungscodes sind inkompatibel.

Regressionstests: `node tests/regression.cjs`. Sie prüfen zusätzlich Dash-Kollisionen, Schaden, Touch-Eingaben im Netzwerkprotokoll, Paket-Reihenfolge, längere Simulation und die inverse Fisheye-Projektion zum Zielen.

Ohne WebGL nutzt das Spiel automatisch eine Software-Projektion derselben 3D-Geometrie mit Neon-Glow. Shader-Bloom und chromatische Aberration bleiben dem WebGL-Modus vorbehalten.

## BLACKLINE + Waffen
Alle 19 Profile aus BLACKLINE 0.4.0 sind verfügbar. Goldene Waffen spawnen zufällig, ein Shuffle-Bag berücksichtigt jedes Profil vor Wiederholung. E oder die Touch-Taste nimmt eine nahe Waffe auf (52 Spieleinheiten). Sie ersetzt die aktuelle Waffe vollständig; die alte verschwindet. Kein Inventar. Die ausgerüstete Waffe bleibt beim Respawn erhalten. Der Host entscheidet über Drops, Treffer und Wechsel. E-Anfragen werden nummeriert, damit Paketverlust keine kurzen Tastendrücke verschluckt und doppelte Pakete nicht zweimal wechseln.

`vendor/blackline.js` enthält ausschließlich das unveränderte Engine-Script aus dem bereitgestellten Release-Paket, mit Original-Lizenzhinweis. `docs/BLACKLINE_API.md` ist die mitgelieferte API-Dokumentation. `weapons.js` enthält das davon getrennte Arcade-Balancing. Neue Katalogeinträge erhalten automatisch ein Standard-Balancing und erscheinen im Spawn-Bag. Schaden und Feuerrate sind Spielregeln, keine realistischen Waffendaten.

`audio.js` ist der Integrationsadapter: zwei wiederverwendete Emitter, echte Live-Synthese pro Schuss, identische Seeds pro Netzwerkereignis, räumliche Entfernung, einfache Deckungsdämpfung und kurzer Hall (0,48 s / 8 % wet). Die Pump-Mechanik der Mossberg wird separat geplant. Kein Sample-Ersatz für Schüsse. Musik und UI-Effekte sind original prozedural erzeugt: 116 BPM, Industrial-Drums, metallische Percussion, verzerrte Bass-Sequenzen und Breaks. Schüsse senken die Musik kurz ab. Versteckte Tabs stoppen Stimmen und Scheduler; beim Zurückkehren wird kein Musik-Rückstand abgespielt.

### Engine aktualisieren
1. `python tools/update_blackline.py /pfad/zum/blackline-engine` (alternativ HTML oder eigenständiges UMD-JavaScript). Bei einem Release-Ordner werden API, Typdefinitionen, Lizenz und Migrationshinweise ebenfalls übernommen.
2. API-Änderungen anhand der neuen Dokumentation in `audio.js` berücksichtigen; Engine-Datei nicht direkt ändern. Neue Waffen bei Bedarf in `weapons.js` balancieren.
3. `node tests/regression.cjs` und `node tests/audio.cjs` ausführen. Die Audio-Prüfung validiert alle Profile dynamisch; bei geändertem Katalog die explizite erwartete Anzahl im Spieltest aktualisieren.
4. Cache-Versionen der Scripts in `index.html` erhöhen und veröffentlichen. Bei inkompatiblen Spieländerungen `protocol` und `gameVersion` gemeinsam erhöhen. Beide Geräte neu laden und neue Verbindungscodes austauschen.

`vendor/blackline-version.json` dokumentiert Version und SHA-256 der importierten Originalquelle. Der Verbindungsaufbau prüft zusätzlich Engine-Version und Katalog-IDs. Die Audio-Tests prüfen PCM-Determinismus und endliche Samples, den echten Engine-Graphen gegen eine Web-Audio-Testoberfläche, Pump-Mechanik, räumliche Parameter und Voice-Cleanup. Klangqualität und Handy-Leistung brauchen zusätzlich Hörtests auf dem Zielgerät.

## Magazine, Nachladen und Mix
R oder die Touch-Taste lädt nach. Währenddessen kann nicht geschossen werden. Ein leeres Magazin lädt bei weiterem Feuer automatisch nach, solange Reserve vorhanden ist. Jede neue Waffe kommt mit einem vollen Magazin und drei weiteren Magazinfüllungen als begrenzter Reserve. Sind beide leer, muss eine neue Waffe aufgenommen werden. Respawn füllt die ausgerüstete Waffe wieder auf. Magazin und Reserve werden angezeigt und vom Host synchronisiert. Ein Waffenwechsel oder Tod bricht das Nachladen ab; doppelte Eingabepakete starten es nicht erneut. Zeiten und Kapazitäten sind Arcade-Regeln, keine Simulation vollständiger realer Ladeabläufe.

Kein Ricochet: Wandtreffer entfernen das Geschoss sofort. Schüsse bleiben live prozedural über BLACKLINE berechnet, keine echten Waffenaufnahmen. Das neue Preset hebt Druckimpuls und unregelmäßige Textur an, reduziert metallisches Nachklingen und Hall. Treffer, Einschläge, Waffenaufnahme, Leerabzug und Magazinhandhabung verwenden kurze gefilterte Rauschimpulse statt tonaler Synth-Pings; beim Abschluss des Nachladens spielt BLACKLINE die Mechanik des jeweiligen Waffenprofils. Der Waffenpegel steigt von 0,34 auf 0,62, die Musik sinkt von 0,24 auf 0,14 und wird bei Schüssen auf 0,065 abgesenkt. Der Ausgang behält einen Kompressor für Pegelspitzen.

## BLACKLINE 0.4.0 Integration
Unverändertes 0.4.0-Release samt Lizenz, API und TypeScript-Typen. Die neue Barrett M82A1 (`barrett82`) ist im gleichen Shuffle-Bag wie alle übrigen Waffen: 10 Schuss, 30 Reserve, 80 Schaden, 1,05 s Schussabstand, 3,1 s Nachladezeit (Arcade-Balancing).

Der Adapter verwendet jetzt profilabhängige Actions für Nachladen, Waffenaufnahme und Leerabzug. Er fragt `getCapabilities()` ab: Magazin-, Trommel-, Clip- und Pump-Profile bekommen nur unterstützte Cues. Der Abschluss folgt dem autoritativen Nachladeereignis; ein abgebrochener Vorgang spielt kein späteres Abschlussgeräusch. Die bisherigen generischen Waffen-Cue-Puffer sind entfernt. Eigene Waffe: Nahperspektive ohne Entfernungsschwächung; Gegner: räumliche Weltquelle mit Deckungsdämpfung. `engine.resume()` initialisiert den neuen Worklet-Limiter einschließlich Engine-Fallback. Der Lautstärkemix bleibt erhalten.

Schüsse bleiben synchron vom tatsächlichen Gameplay-Ereignis ausgelöst. Der neue optionale Synthese-Worker, Schalldämpfer-Effekt und Studio-Editor werden nicht als zusätzliche Spielmechaniken aktiviert. Die Engine enthält sie unverändert für spätere Erweiterungen. `legacyTrigger:true` integriert den Triggerkontakt pro Spielschuss; Pumpmechanik wird weiterhin separat ausgelöst. Mechanik zählt in 0.4.0 als Action, nicht als Schuss. Die Verbindung prüft weiterhin Engine-Version und Katalog; alte 0.3.0-Clients können daher nicht beitreten. Beide Seiten neu laden und neue Codes austauschen.

## Prüfungen nach dem PeerJS-Umbau
- `node tests/regression.cjs`: Bewegung, Treffer, Waffen, Nachladen, kurze Klicks, Spielfeld-Projektion.
- `node tests/network.cjs`: zwei simulierte PeerJS-Clients, Registrierung, Link-/Codeformat, Handshake, Datenfluss, Timeout, alte Pakete, falsche Version, volle/fehlende Lobby, erneuter Beitritt, Signaling-Reconnect, Heartbeat und TURN-Einstellungen. Der Transport ist hierbei simuliert.
- `node tests/audio.cjs`: BLACKLINE-Profile, Actions, PCM, räumliche Parameter und Cleanup.

Referenz: https://peerjs.com/client/getting-started und https://peerjs.com/client/api/peer. PeerJS vermittelt WebRTC; es ersetzt keinen TURN-Relay für restriktive Netze. Die eingebauten PeerJS-Relay-Adressen bleiben erhalten; ein eigener Relay-Dienst wird nicht betrieben. Echte Verbindungen müssen zusätzlich in den verwendeten Browsern und Netzwerken geprüft werden.
