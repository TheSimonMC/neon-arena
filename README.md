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
