# Coder Dojo Jump & Run

## ToDo

* Gegner hinzufügen
* Welt ausbauen
* Smooth Player Animation

Ein Beispiel-Spiel für das Coder Dojo.

## Spiel starten

Um das Spiel zu starten braucht man einen Webserver, der die Requests abfertigt. Andernfalls können die Assets nicht geladen werden. Einfach die HTML Datei im Browser aufmachen funktioniert also leider nicht.

> Auf Cloud9 ist das dann später kein Problem. Da die HTML-Dateien dort direkt gehosted werden und über das http-Protokoll ausgeliefert werden, muss man dort keinen Webserver starten, sondern kann wie gehabt den Link zu der Datei aufrufen. Das macht es für die Kids einfach, denn es muss kein Shell-Kommando eingegeben werden (obwohl das ja geht, was man Cloud9 sehr zugute halten muss).

Zunächst einmal sollte das Repo geklont werden.

### Unix (OS X & Linux)

Mit installiertem Python in den Projektordner wechseln und

`python -m SimpleHTTPServer`

ausführen. Das startet einen Webserver auf Port 8000. Mit installiertem Netcat alternativ: `nc -l 8000`.

Das Spiel ist danach unter http://localhost:8000/part1.html verfügbar, respektive http://localhost:8000/part9.html usw.

Darüber hinaus kann das Projekt auch in den Ordner eines Webservers eurer Wahl (nginx, apache, usw.) gelegt werden. Wenn ihr das macht, wisst ihr ja schon, was ihr tut ;)

