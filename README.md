
Projekt: HSR CAS FEE 2017, Projekt 02
Titel: Give it away backend
Funktion: Backend zur Web Applikation Give it away Frontend mit REST API und Unterstützung der MongoDB Datenbank.


## Voraussetzungen für die Nutzung des Give it away backends
************************************************************

1.0 Die Frontend und Backend Projekte müssen sich im gleichen Folder befinden.
------------------------------------------------------------------------------
Grund: Das Backend greift auf das Distributions Verzeichnis 'dist-prod' des Frontends zu. 
Andernfalls muss in der Datei index.js der Pfad für das statische Verzeichnis (express.static) und das Laden der index.html für die Route "/" (Zeile app.get("/",...) entsprechend angepasst werden.


2.0 - Ein MongoDB Server muss verfügbar sein. 
--------------------------------------------

2.1 Wenn bereits ein MongoDB Server existiert:

Nur den Connection String anpassen: In der Datei \Index.js im Abschnitt "Database Connection" der Konstante databaseConnectionUrl den Connection String zuweisen und als Datenbank 'giveitaway' eingeben, welche automatisch erstellt wird. Z.B. const databaseConnectionUrl = 'mongodb://localhost/giveitaway';

2.2 Wenn kein MongoDB Server verfügbar ist:

Eine mögliche Alternative ist die lokale Installation des MongoDB Servers. 
MongoDB Community Edition V3.6 nach folgender Anleitung lokal installieren:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

- Gemäss dieser Anleitung auch Datenverzeichnis und Konfigurations File (mongod.cfg) erstellen. Bei Bedarf auch den Windows Service erstellen.

- Im Backend ist der Connection String für die Nutzung der lokalen Installation definiert. Bei abweichender Installation den Connection String gemäss Punkt 2.1 anpassen.

Tipp: Die Installation kann hängen bleiben. Grund: Die Compass Installation (DB Management-Interface) wird per powershell gestartet und bleibt dabei hängen. Im Windows Task Manager kann Powershell beendet werden. Danach die Installation ohne die Auswahl von Compüass durchführen und Compass bei Bedarf nachträglich installieren.


3.0 - Laden der Initialdaten in die Datenbank
---------------------------------------------
Für das Laden der Initialdaten existiert eine Methode createInitialDbEntries() in der Klasse ./models/data.model.
Zurzeit kann auf der Index.js Seite im Abschnitt "Database Connection" der Code unter "// Create initial db entries" dafür einkommentiert werden (danach wieder auskommentieren, andernfalls Fehlermeldungen beim Start).



## Nutzung des Give it away backends
************************************

Das Backend muss gestartet werden, damit das Frontend auf die benötigten Daten zugreifen kann.

Der MongoDB Server nuss verfügbar und gestartet sein. 

## MongoDB starten
Über den Windows Service oder Befehl mongod.exe (im Programmverzeichnis) starten. 

Um die Applikation über das Backend starten zu können muss ein produktives (minimiertes/uglified) Build erstellt werden. 

## Build erstellen
Im Give it away Frontend den Befehl 'npm run build-prod' ausführen.
Es wird ein Verzeichnis /dist-prod im Frontend Projekt erstellt bzw aktualisiert.


## Give it away Backend starten
'npm start' oder 'node index.js' ausführen.


## Produktive Version der Applikation starten:
Im Web Browser (getestet mit Chrome V65) folgende Seite aufrufen:  'http://127.0.0.1:3003/.

## Developer Version der Applikation starten
In der Entwicklungsumgebung im Give it away Frontend Angular Projekt 'npm start' eingeben.

