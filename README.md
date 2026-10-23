# Neon Arena / Neon Duel

Statisches Browser-Spiel für GitHub Pages. Kein Build und keine Anmeldung nötig.

## Spielen
WASD bewegen, Maus zielen, Linksklick schießen. Solo oder zwei Spieler.

## Multiplayer
1. Beide öffnen dieselbe Spielversion.
2. Host klickt „Host erstellen“ und schickt seinen vollständigen Code an den Gast.
3. Gast fügt den Code ein und klickt „Code übernehmen“ (oder vorher „Beitreten“).
4. Gast schickt seinen Antwortcode zurück. Host übernimmt ihn.
5. Host spielt Cyan, Gast Pink. Der Host berechnet den Spielzustand.

Bei jedem Neuverbinden neue Codes austauschen. Codes enthalten Netzwerkadressen.

## TURN
STUN ist vorkonfiguriert. In manchen Mobilfunk-, Firmen- und NAT-Netzwerken reicht eine direkte Verbindung nicht aus. Dafür unter „Netzwerk / TURN“ auf beiden Geräten einen erreichbaren TURN-Server, Benutzername und Passwort eintragen, danach neue Codes erzeugen. „Nur TURN“ erzwingt einen Relay-Test. Zugangsdaten werden nicht gespeichert oder in die Codes aufgenommen. Keine dauerhaften TURN-Geheimnisse ins öffentliche Repository schreiben.

Es ist kein TURN-Dienst enthalten oder bereitgestellt. GitHub Pages hostet nur die statischen Dateien. Referenz: https://webrtc.org/getting-started/turn-server

## GitHub Pages
Repository erstellen und diese Dateien auf den main-Branch übertragen. Unter Settings > Pages > Build and deployment: Deploy from a branch, main, / (root), Save. index.html liegt direkt im Repository-Wurzelverzeichnis.

## Prüfung
`node tests/regression.cjs` prüft Spielzustand, Verbindungswechsel, Eingabe-Timeout und Paketvalidierung mit simulierten Browser-APIs. Ein echter Verbindungsaufbau über zwei getrennte Netzwerke muss nach der Bereitstellung separat getestet werden.

## 3D-Version (Protokoll 5)
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
Alle 18 Profile aus BLACKLINE 0.3.0 sind verfügbar. Goldene Waffen spawnen zufällig, ein Shuffle-Bag berücksichtigt jedes Profil vor Wiederholung. E oder die Touch-Taste nimmt eine nahe Waffe auf (52 Spieleinheiten). Sie ersetzt die aktuelle Waffe vollständig; die alte verschwindet. Kein Inventar. Die ausgerüstete Waffe bleibt beim Respawn erhalten. Der Host entscheidet über Drops, Treffer und Wechsel. E-Anfragen werden nummeriert, damit Paketverlust keine kurzen Tastendrücke verschluckt und doppelte Pakete nicht zweimal wechseln.

`vendor/blackline.js` enthält ausschließlich das unveränderte Engine-Script aus dem bereitgestellten HTML, mit Original-Lizenzhinweis. `docs/BLACKLINE_API.md` ist die mitgelieferte API-Dokumentation. `weapons.js` enthält das davon getrennte Arcade-Balancing. Neue Katalogeinträge erhalten automatisch ein Standard-Balancing und erscheinen im Spawn-Bag. Schaden und Feuerrate sind Spielregeln, keine realistischen Waffendaten.

`audio.js` ist der Integrationsadapter: zwei wiederverwendete Emitter, echte Live-Synthese pro Schuss, identische Seeds pro Netzwerkereignis, räumliche Entfernung, einfache Deckungsdämpfung und kurzer Hall (0,48 s / 8 % wet). Die Pump-Mechanik der Mossberg wird separat geplant. Kein Sample-Ersatz für Schüsse. Musik und UI-Effekte sind original prozedural erzeugt: 116 BPM, Industrial-Drums, metallische Percussion, verzerrte Bass-Sequenzen und Breaks. Schüsse senken die Musik kurz ab. Versteckte Tabs stoppen Stimmen und Scheduler; beim Zurückkehren wird kein Musik-Rückstand abgespielt.

### Engine aktualisieren
1. `python tools/update_blackline.py /pfad/zur/neuen-engine.html` (auch eigenständiges UMD-JavaScript möglich).
2. API-Änderungen anhand der neuen Dokumentation in `audio.js` berücksichtigen; Engine-Datei nicht direkt ändern. Neue Waffen bei Bedarf in `weapons.js` balancieren.
3. `node tests/regression.cjs` und `node tests/audio.cjs` ausführen. Die Audio-Prüfung validiert alle Profile dynamisch; bei geändertem Katalog die explizite erwartete Anzahl im Spieltest aktualisieren.
4. Cache-Versionen der Scripts in `index.html` erhöhen und veröffentlichen. Bei inkompatiblen Spieländerungen `protocol` und `gameVersion` gemeinsam erhöhen. Beide Geräte neu laden und neue Verbindungscodes austauschen.

`vendor/blackline-version.json` dokumentiert Version und SHA-256 der importierten Originalquelle. Der Verbindungsaufbau prüft zusätzlich Engine-Version und Katalog-IDs. Die Audio-Tests prüfen PCM-Determinismus und endliche Samples, den echten Engine-Graphen gegen eine Web-Audio-Testoberfläche, Pump-Mechanik, räumliche Parameter und Voice-Cleanup. Klangqualität und Handy-Leistung brauchen zusätzlich Hörtests auf dem Zielgerät.

## Magazine, Nachladen und Mix (Version 5)
R oder die Touch-Taste lädt nach. Währenddessen kann nicht geschossen werden. Ein leeres Magazin lädt bei weiterem Feuer automatisch nach, solange Reserve vorhanden ist. Jede neue Waffe kommt mit einem vollen Magazin und drei weiteren Magazinfüllungen als begrenzter Reserve. Sind beide leer, muss eine neue Waffe aufgenommen werden. Respawn füllt die ausgerüstete Waffe wieder auf. Magazin und Reserve werden angezeigt und vom Host synchronisiert. Ein Waffenwechsel oder Tod bricht das Nachladen ab; doppelte Eingabepakete starten es nicht erneut. Zeiten und Kapazitäten sind Arcade-Regeln, keine Simulation vollständiger realer Ladeabläufe.

Kein Ricochet: Wandtreffer entfernen das Geschoss sofort. Schüsse bleiben live prozedural über BLACKLINE berechnet, keine echten Waffenaufnahmen. Das neue Preset hebt Druckimpuls und unregelmäßige Textur an, reduziert metallisches Nachklingen und Hall. Treffer, Einschläge, Waffenaufnahme, Leerabzug und Magazinhandhabung verwenden kurze gefilterte Rauschimpulse statt tonaler Synth-Pings; beim Abschluss des Nachladens spielt BLACKLINE die Mechanik des jeweiligen Waffenprofils. Der Waffenpegel steigt von 0,34 auf 0,62, die Musik sinkt von 0,24 auf 0,14 und wird bei Schüssen auf 0,065 abgesenkt. Der Ausgang behält einen Kompressor für Pegelspitzen.
