/*
 * src/lib/i18n/de.js
 * ------------------------------------------------------------------
 * Deutsch — Übersetzung von en.js, Schlüssel für Schlüssel.
 *
 * Gleiche Struktur, gleiche Array-Längen. `glossary.terms` hat
 * genau 33 Einträge und wird positionsweise mit GLOSSARY_IDS in
 * src/lib/glossary/terms.js gepaart.
 *
 * `match` ist kein zu übersetzender Text: es ist die Liste der Wörter,
 * die in DIESER Prosa unterstrichen werden und die Definition öffnen.
 * Deutsche Komposita, Pluralformen und Fälle sind explizit gelistet.
 *
 * Apostrophe: \u2019. Ein rohes ' zerbricht die Datei.
 */

export default {
	/* ============================================================== *
	 * Steuerung der Eckengruppe
	 * ============================================================== */
	common: {
		languageLabel: 'Sprache',
		switchLanguage: 'Sprache ändern',
		themeToLight: 'Zum hellen Design wechseln',
		themeToDark: 'Zum dunklen Design wechseln',
		backToTop: 'Nach oben',
		scoring: 'WERTUNG'
	},

	/* ============================================================== *
	 * Glossar
	 * ============================================================== */
	glossary: {
		toggleOn: 'Fachbegriffe erklären',
		toggleOff: 'Erklärungen ausblenden',
		toggleLabel: 'Erklärungen',
		close: 'Schließen',
		explain: 'Was bedeutet «{term}»?',
		hintTitle: 'Manche Wörter sind unterstrichen.',
		hintBody:
			'Tippe auf ein unterstrichenes Wort für eine Erklärung in einfacher Sprache. Du kannst sie jederzeit über den Knopf in der Ecke abschalten.',
		hintDismiss: 'Verstanden',

		terms: [
			{
				match: ['Spieldienst', 'Spieldienste', 'Spieldienstes'],
				title: 'Spieldienst',
				body: 'Die Herausforderung selbst, verpackt als versiegeltes Programm, das jeder herunterladen und ausführen kann. Darin stecken die Regeln, die Wertung und das versteckte Geheimnis des Erstellers — wie eine versiegelte Klausur, die sich selbst benotet.',
				more: 'Du führst es auf deinem eigenen Rechner aus. Es wertet deinen Bot und erzeugt die kryptographische Quittung, die die Blockchain später prüft.'
			},
			{
				match: ['Solver-Dienst', 'Solver-Dienste', 'Solver-Dienstes', 'Solver'],
				title: 'Solver-Dienst',
				body: 'Dein Beitrag. Der Bot, den du baust, um das Spiel zu spielen, genauso versiegelt verpackt, damit er auf jeder Maschine identisch läuft — deine Strategie in einer einzigen, tragbaren Kiste.',
				more: 'Er wird dem Spieldienst übergeben, der ihn isoliert ausführt und wertet, was er getan hat. Deinen Code sieht niemand außer dir.'
			},
			{
				match: ['GoP Web'],
				title: 'GoP Web',
				body: 'Die Website, auf der Spiele gelistet sind: Regeln lesen, ein Spiel herunterladen, dein Ergebnis veröffentlichen. Es ist ein Verzeichnis und ein Signaturwerkzeug, kein Schiedsrichter — nichts, was es zeigt, muss man auf Treu und Glauben hinnehmen.',
				more: 'Du kannst deine eigene Kopie betreiben. Das ist der Punkt: wenn die öffentliche verschwände, liefen die Spiele weiter.'
			},
			{
				match: ['Celaut-Knoten', 'Celaut-Dienst', 'Celaut'],
				title: 'Celaut',
				body: 'Das System, das die versiegelten Programme wirklich ausführt. Du installierst es einmal, und von da an kann jedes Spiel- oder Solver-Paket an deinen Rechner übergeben und in seinem eigenen abgeschlossenen Raum ausgeführt werden.',
				more: 'Es macht «führ es selbst aus» realistisch statt zur Floskel: dasselbe Paket verhält sich auf jeder Maschine, die es öffnet, gleich.'
			},
			{
				match: ['Knoten', 'Knotens'],
				title: 'Knoten',
				body: 'Ein Rechner, der an einem Netz teilnimmt. Dein Laptop, ein Ersatz-Desktop, ein Server im Rack — sobald er die Software ausführt und mit anderen Maschinen spricht, ist er ein Knoten.',
				more: 'Hier ist er einfach die Maschine, die die Spiele und die Solver ausführt. Deine, nicht das Rechenzentrum von jemand anderem.'
			},
			{
				match: ['Dienst', 'Dienste', 'Dienstes'],
				title: 'Dienst',
				body: 'Ein in sich geschlossenes Stück Software, das eine Aufgabe erledigt und an jede Maschine zum Ausführen gegeben werden kann — näher an einem einzelnen Gerät als an einem ganzen Programm, das du installierst.',
				more: 'Beide Hälften eines Wettbewerbs sind hier Dienste: das Spiel und der Bot, der es spielt.'
			},
			{
				match: ['Blockchain', 'Blockchains'],
				title: 'Blockchain',
				body: 'Ein gemeinsames Register, von dem Tausende Rechner gleichzeitig eine Kopie halten. Ein Eintrag braucht die Zustimmung der anderen, dass er gültig ist, und alte Einträge lassen sich nicht umschreiben — niemand kontrolliert die Geschichte allein.',
				more: 'Hier dient sie zwei engen Aufgaben: festzuhalten, wer welche Punktzahl beansprucht hat, und den Gewinner auszuzahlen. Mehr nicht.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'Die bestimmte Blockchain, auf der diese Plattform Ergebnisse festhält und Zahlungen abrechnet. ERG ist ihre Währungseinheit.',
				more: 'Das ist eine Wahl, kein Fundament: die Plattform hat keine eigene Münze.'
			},
			{
				match: [
					'Smart Contract',
					'Smart Contracts',
					'Spielvertrag',
					'Vertrag',
					'Verträge'
				],
				title: 'Smart Contract',
				body: 'Ein Programm, das auf der Blockchain lebt und Geld unter im Voraus geschriebenen Regeln hält. Sind die Bedingungen erfüllt, zahlt es von selbst aus — niemand unterschreibt einen Scheck, und niemand kann sich dagegen entscheiden.',
				more: 'Deshalb ist der Preis sicher, bevor ihn jemand gewonnen hat: die Mittel hält das Regelwerk, nicht die Person, die es geschrieben hat.'
			},
			{
				match: ['on-chain'],
				title: 'On-chain',
				body: 'In die Blockchain selbst geschrieben, wo es jeder sehen und niemand später still ändern kann — im Gegensatz zu der privaten Datenbank einer Firma.'
			},
			{
				match: [
					'kryptographischen Festlegungen',
					'kryptographische Festlegungen',
					'kryptographische Festlegung',
					'Vorab-Festlegung',
					'Festlegung',
					'Festlegungen'
				],
				title: 'Festlegung',
				body: 'Ein versiegelter Umschlag. Du veröffentlichst etwas, das beweist, was du gewählt hast, ohne zu zeigen, was es war — und später, wenn der Umschlag geöffnet wird, kann jeder prüfen, dass du den Inhalt nicht ausgetauscht hast.',
				more: 'So lässt sich eine Punktzahl öffentlich festhalten, während das Spiel noch läuft, ohne den Rivalen zu verraten, wie gut du abgeschnitten hast.'
			},
			{
				match: ['gehashten Protokollen', 'gehashte Protokolle', 'gehashten', 'Digest', 'Hash', 'Hashes'],
				title: 'Hash',
				body: 'Ein kurzer Fingerabdruck, berechnet aus einem Stück Daten. Dieselben Daten ergeben immer denselben Fingerabdruck, ein einziges geändertes Byte einen völlig anderen, und vom Fingerabdruck kommt man nicht zu den Daten zurück.',
				more: 'Diese Einbahn ist der ganze Trick: du kannst beweisen, dass etwas passt, ohne zu zeigen, was es ist.'
			},
			{
				match: [
					'256-Bit-Geheimnis',
					'Spielgeheimnis',
					'Geheimnis',
					'Geheimnisse',
					'Geheimnisses'
				],
				title: 'Geheimnis',
				body: 'Eine große Zufallszahl, die der Ersteller erzeugt und versteckt hält, solange das Spiel offen ist. Jede Punktzahl wird damit versiegelt, deshalb kann keine geprüft — oder gefälscht — werden, bis der Ersteller sie veröffentlicht.',
				more: 'Sie am Ende zu veröffentlichen macht die Ergebnisse aller im selben Moment prüfbar, statt nacheinander.'
			},
			{
				match: ['Spiel-Seed', 'Seed', 'Seeds'],
				title: 'Seed',
				body: 'Die Startzahl, die genau entscheidet, welcher Fassung einer Herausforderung du gegenüberstehst — welches Brett, welche Marktdaten, welches Rätsel. Gleicher Seed, gleiche Herausforderung, für alle.',
				more: 'Er wird erst aufgedeckt, wenn die Beiträge geschlossen sind, damit niemand einen Bot im Voraus auf genau diesen Lauf zuschneiden kann.'
			},
			{
				match: ['Zeremoniephase', 'Zeremonie'],
				title: 'Zeremoniephase',
				body: 'Das Fenster am Anfang eines Spiels, in dem sich Spieler anmelden und jede Anmeldung ein wenig Unvorhersagbarkeit in den endgültigen Seed rührt. Als würfen alle einen Würfel in denselben Becher, bevor der Deckel abgeht.',
				more: 'Es existiert, damit auch der Ersteller die Herausforderung nicht im Voraus kennt — die Spieler entscheiden sie gemeinsam, ohne es zu wollen.'
			},
			{
				match: ['Solver ID', 'Solver IDs'],
				title: 'Solver ID',
				body: 'Der einzigartige Fingerabdruck des genauen Bots, den du registriert hast. Er benennt eine bestimmte Fassung deines Codes, damit ein Bot nicht still gegen einen anderen getauscht werden kann, nachdem der Seed aufgedeckt ist.'
			},
			{
				match: ['Paper', 'das Paper'],
				title: 'Paper',
				body: 'Die geschriebenen Regeln: worin die Herausforderung besteht, wie sie gewertet wird, was als gültiger Beitrag zählt. Veröffentlicht, bevor jemand spielen kann, damit die Bedingungen nicht mehr wechseln, sobald Leute sich festgelegt haben.',
				more: 'Du sollst deinen Beitrag aus diesem einen Dokument bauen können.'
			},
			{
				match: ['Pott'],
				title: 'Pott',
				body: 'Alle Teilnahmegebühren, zusammengelegt und vom Vertrag gehalten, bis das Spiel aufgelöst wird. Wer antritt, zahlt ein; der Gewinner nimmt, was nach den vereinbarten Abzügen übrig ist.'
			},
			{
				match: ['Teilnahmegebühr', 'Teilnahmegebühren'],
				title: 'Teilnahmegebühr',
				body: 'Was es kostet, ein Ergebnis einzureichen, das zählen soll. Sie fließt in den Pott, nicht an die Veranstalter, deshalb macht jeder Beitrag den Preis größer.',
				more: 'Du zahlst sie nur, wenn du deinen Lauf fürs Einreichen wert hältst — das Spiel lokal auszuführen ist kostenlos.'
			},
			{
				match: ['Provision des Erstellers', 'Provision', 'Provisionen'],
				title: 'Provision',
				body: 'Die vereinbarte Scheibe vom Pott, die an den Ersteller des Spiels, seine Prüfer und die Plattform geht. Offen festgelegt, wenn das Spiel veröffentlicht wird, und automatisch genommen — nicht hinterher verhandelt.'
			},
			{
				match: ['Prüfer', 'Prüfern', 'Prüfers'],
				title: 'Prüfer',
				body: 'Jemand, dessen Auftrag es ist, den Ersteller zu kontrollieren, nicht die Spieler: hat das Spiel ehrlich gewertet, und sind seine Quittungen gültig? Erwischt er Betrug, wird er aus dem Anteil des Erstellers bezahlt.',
				more: 'Dafür bezahlt zu werden, Betrug zu finden, statt Dinge abzunicken, macht die Rolle erst wert, sie zu haben.'
			},
			{
				match: ['Spiel-NFT', 'NFT', 'NFTs'],
				title: 'NFT',
				body: 'Ein einmaliges Token, auf der Blockchain festgehalten, das man besitzen und übertragen, aber nicht verdoppeln kann. Hier ist es die Trophäe: dauerhafter, öffentlicher Beweis, wer ein bestimmtes Spiel gewonnen hat.'
			},
			{
				match: ['Ergo-Wallet', 'Wallet', 'Wallets'],
				title: 'Wallet',
				body: 'Die App, die die Schlüssel zu deinen Mitteln hält und deine Aktionen auf der Blockchain signiert. Kein Konto bei einer Firma — niemand kann sie einfrieren, und niemand kann sie für dich wiederherstellen.'
			},
			{
				match: ['Gasgebühr', 'Netzgebühr'],
				title: 'Gasgebühr',
				body: 'Die kleine Gebühr dafür, dass das Netz deine Transaktion festhält. Sie zahlt die Rechner, die das Festhalten erledigen, nicht die Plattform — eher Porto als Ticketpreis.'
			},
			{
				match: [
					'deterministisch',
					'deterministischen',
					'deterministische',
					'Determinismus'
				],
				title: 'Deterministisch',
				body: 'Gleiche Eingabe, gleiche Ausgabe, jedes Mal — wie ein Rezept, das in jeder Küche denselben Kuchen ergibt, statt vom Koch abzuhängen. Weder die Maschine noch der Tag noch der Ort ändern das Ergebnis.',
				more: 'Das macht eine Punktzahl für jemand anderen prüfbar: er kann sie erneut ausführen und muss auf deine Zahl kommen.'
			},
			{
				match: [
					'sicheren, isolierten Umgebung',
					'isolierten Umgebung',
					'isolierte Umgebung',
					'Isolierung',
					'isoliert',
					'isolierten',
					'isolierte'
				],
				title: 'Isolierung',
				body: 'Ein laufendes Programm hinter einer Grenze halten, die es nicht überschreiten kann — es sieht nur, was ihm gegeben wurde, und nichts vom Rechner ringsum und nichts von allem anderen, das dort läuft.',
				more: 'Deshalb kann ein Spiel den Bot eines Fremden gefahrlos ausführen, und du kannst das Spiel eines Fremden gefahrlos ausführen.'
			},
			{
				match: ['Verschleierung'],
				title: 'Verschleierung',
				body: 'Ein Programm absichtlich so zu verdrehen, dass es weiter perfekt läuft, aber schmerzhaft zu lesen ist — das softwareseitige Gegenstück zu einem Dokument ohne Leerzeichen und Zeilenumbrüche.',
				more: 'Hier hält sie das versteckte Geheimnis eines Spiels versteckt, obwohl jeder eine Kopie des Programms hat, das es enthält.'
			},
			{
				match: ['Peer-to-Peer', 'P2P'],
				title: 'Peer-to-Peer',
				body: 'Zwei Rechner, die direkt miteinander zu tun haben, wie zwei Menschen am Telefon — statt alles über eine Firma in der Mitte zu schicken, wie E-Mail oder ein Marktplatz. Jeder Rechner ist ein «Peer»: gleichrangig, niemand hat das Sagen.',
				more: 'Das zählt hier, weil die Firma in der Mitte meist die ist, die den Preis setzt, ihren Anteil nimmt und dich entfernen kann.'
			},
			{
				match: ['Selbsthosting'],
				title: 'Selbsthosting',
				body: 'Deine eigene Kopie eines Dienstes auf deinem eigenen Rechner betreiben, statt die von jemand anderem zu nutzen. Die Sache läuft weiter, selbst wenn die öffentliche Fassung abgeschaltet, zensiert oder einfach nur einen schlechten Tag hat.'
			},
			{
				match: [
					'Köderpunktzahlen',
					'Köderpunktzahl',
					'falsche hohe Punktzahlen',
					'Köder'
				],
				title: 'Köder',
				body: 'Ein absichtlich irreführender Beitrag — eine Punktzahl, die du veröffentlichst und die nicht deine echte ist — eingereicht, damit Rivalen falsch raten, wie gut du wirklich warst. Ein Bluff, möglich weil niemand eine versiegelte Punktzahl lesen kann.'
			},
			{
				match: ['zeitgewichtete Punktzahl', 'zeitgewichteten Punktzahl', 'TimeWeight'],
				title: 'Zeitgewichtete Punktzahl',
				body: 'Eine Punktzahl, angepasst danach, wie früh du sie eingereicht hast. Zwei identische Ergebnisse sind kein Gleichstand: die früher eingetragene zählt mehr, deshalb kostet es, auf einer guten Antwort bis zur Frist zu sitzen.'
			},
			{
				match: ['Schonfrist', 'Prüfperiode', 'Rückerstattung'],
				title: 'Schonfrist',
				body: 'Ein Wartefenster in den Regeln, bevor Geld fließt — Zeit für Prüfer, Einspruch einzulegen, und Zeit für Spieler, ihre Gebühren zurückzuholen, falls der Ersteller das Spiel nie auflöst.',
				more: 'Die Antwort auf «und wenn der Veranstalter einfach verschwindet?»: der Vertrag lässt alle mit ihrem Geld gehen.'
			},
			{
				match: [
					'hohen Szenariovariabilität',
					'hoher Szenariovariabilität',
					'Szenariovariabilität',
					'CDE'
				],
				title: 'Szenariovariabilität (CDE)',
				body: 'Wie stark sich jeder Lauf eines Spiels vom letzten unterscheiden kann. Hohe Variabilität heißt, ein Bot muss wirklich gut spielen, weil es keine einzelne feste Antwort gibt, die man auswendig lernen und fest einbauen kann.'
			}
		]
	},

	/* ============================================================== *
	 * Startbildschirm
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'SCHREIB DEINE PROMPTS. BAU DEINEN BOT. GEWINNE DEN THRON.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Schreib deine Prompts. Bau deinen Bot. Gewinne den Thron.',
		description:
			'Eine Wettbewerbsplattform, auf der Ersteller Spieldienste entwerfen, um KI-Solver zu bewerten, während Spieler Solver-Dienste bauen, um ihre Punktzahl zu maximieren — getragen von der Ergo-Blockchain und Celaut.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Schreib deine Prompts. Bau deinen Bot. Gewinne den Thron.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Schreib deine Prompts. <span class="hero-grad">Bau deinen Bot.</span> Gewinne den Thron.',
		lede: 'Eine Wettbewerbsplattform, auf der Ersteller Spieldienste entwerfen, um KI-Solver zu bewerten, und Spieler Solver-Dienste bauen, um ihre Punktzahl zu maximieren — alles on-chain festgehalten und geprüft.',
		actions: {
			launch: 'App starten',
			github: 'Auf GitHub ansehen',
			how: 'So funktioniert es'
		},
		stats: [
			{ value: 'P2P', label: 'Dezentral — Dienste laufen auf deinem eigenen Celaut-Knoten' },
			{ value: 'On-chain', label: 'Ergebnisse festgelegt und auf Ergo geprüft' },
			{ value: 'Vertrauensfrei', label: 'Smart Contracts zahlen den Pott aus, keine Firma' }
		],
		scroll: 'Scrollen'
	},

	/* ============================================================== *
	 * Die sieben Szenen
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'Die Idee',
			beats: [
				{
					h: 'Jemand veröffentlicht eine Herausforderung.',
					p: 'Ein Ersteller entwirft ein Spiel mit messbarer Wertung — und packt es als <strong>Spieldienst</strong>: ein unveränderlicher Celaut-Dienst, der die Spiellogik und das Geheimnis enthält.'
				},
				{
					h: 'Alle anderen bauen einen Bot, der sie schlägt.',
					p: 'Spieler schreiben <strong>Solver-Dienste</strong> — ihre Strategie, genauso verpackt. Der Spieldienst führt jeden Solver in einer sicheren, isolierten Umgebung aus und wertet, was er getan hat.'
				},
				{
					h: 'Die höchste Punktzahl gewinnt den Thron.',
					p: 'Keine Rangliste, der du glauben musst. Jede Punktzahl wird kryptographisch festgelegt und <strong>auf der Ergo-Blockchain abgerechnet</strong>, wo jeder die Rechnung prüfen kann.',
					note: 'Schreib deine Prompts. Bau deinen Bot. Gewinne den Thron.'
				}
			]
		},

		components: {
			label: 'Architektur',
			beats: [
				{
					h: 'Spieldienst',
					p: 'Gebaut von Spieleentwicklern. Ein autonomer Dienst, der Spiellogik und Geheimnis kapselt. Er bewertet die Leistung des Solvers, erzeugt Punktzahlen und erstellt die <strong>kryptographischen Festlegungen</strong>, die die Blockchain zur Prüfung braucht.'
				},
				{
					h: 'Solver-Dienst',
					p: 'Gebaut von Spielern. Er setzt Strategien um, um die Punktzahl in einem bestimmten Spiel zu maximieren. Der Solver wird verpackt und an den Spieldienst geschickt, der ihn <strong>in einer sicheren, isolierten Umgebung ausführt</strong>.'
				},
				{
					h: 'GoP Web',
					p: 'Das Community-Portal. Spiele entdecken, Regeln lesen, Spieldienste herunterladen und Ergebnisse auf der Ergo-Blockchain veröffentlichen. Es <strong>unterstützt Selbsthosting</strong> für ein vollständig vertrauensfreies Peer-to-Peer-Erlebnis.'
				},
				{
					h: 'Alles läuft auf deinem Rechner.',
					p: 'Spiel- und Solver-Dienste laufen beide auf einem <strong>lokalen Celaut-Knoten</strong>, der vollständig offline arbeiten kann. GoP Web lässt sich über die GitHub.io-Instanz nutzen oder lokal als Celaut-Dienst betreiben.',
					note: 'Zwei Technologien: Celaut für die Berechnung, Ergo für die Abrechnung.'
				}
			]
		},

		creator: {
			label: 'Ablauf für Ersteller',
			beats: [
				{
					h: 'Entwirf ein Spiel.',
					p: 'Erstelle eine Herausforderung mit messbarer Wertung und hoher Szenariovariabilität (CDE), damit fest verdrahtete Lösungen nicht greifen.'
				},
				{
					h: 'Schreib das Paper.',
					p: 'Veröffentliche ein Dokument mit allen Anweisungen, Regeln und Bewertungskriterien. Spieler müssen die Herausforderung <strong>verstehen, bevor</strong> sie teilnehmen.'
				},
				{
					h: 'Erzeuge ein Geheimnis.',
					p: 'Ein einzigartiges <strong>256-Bit-Geheimnis</strong> trägt die kryptographischen Festlegungen und die spätere Punkteprüfung. Niemand kann es sehen, solange das Spiel offen ist.'
				},
				{
					h: 'Verpacken und veröffentlichen.',
					p: 'Liefere das Spiel als Celaut-Dienst und veröffentliche es über GoP Web mit seinen Parametern: Gebühr, Frist und Provision.'
				},
				{
					h: 'Das Geheimnis aufdecken.',
					p: 'Wenn die Frist vorbei ist, <strong>deckt der Ersteller das Geheimnis on-chain auf</strong>. Das löst das Spiel: die Punkteprüfung wird möglich und der Smart Contract kann den Gewinner bestimmen.',
					note: 'Erst festlegen, dann aufdecken. Genau das macht es fair.'
				}
			]
		},

		player: {
			label: 'Der Weg des Spielers',
			beats: [
				{
					h: 'Stöbern und das Paper lesen.',
					p: 'Finde ein Spiel auf GoP Web. Lies das Paper des Erstellers, um Herausforderung, Regeln und Bewertungskriterien zu verstehen, bevor du dich auf etwas festlegst.'
				},
				{
					h: 'Setze deinen Solver um.',
					p: 'Baue deinen Solver-Dienst allein aus dem Paper, damit er startklar ist, sobald der Seed fällt.'
				},
				{
					h: 'Registriere deine Solver ID.',
					p: 'Die Registrierung ist kostenlos — du zahlst nur die Gasgebühr des Netzes. Diese <strong>Vorab-Festlegung</strong> garantiert Fairness, bevor der Seed aufgedeckt wird.'
				},
				{
					h: 'Der Seed wird aufgedeckt.',
					p: 'Sobald die Zeremoniephase endet, wird der Spiel-Seed öffentlich. Jetzt — und erst jetzt — kennst du die genauen Herausforderungsparameter, gegen die du bewertet wirst.'
				},
				{
					h: 'Führe den Spieldienst lokal aus.',
					p: 'Der Dienst führt deinen Solver in einer sicheren Umgebung mit dem aufgedeckten Seed aus, bewertet seine Leistung und erzeugt die <strong>kryptographische Festlegung</strong> für die on-chain-Prüfung.'
				},
				{
					h: 'Reiche deine Festlegung ein und zahle die Gebühr.',
					p: 'Wenn die Punktzahl den Wettbewerb wert ist, veröffentliche die Festlegung on-chain und zahle die Teilnahmegebühr. <strong>Alle Gebühren fließen in den Pott</strong> — der Gewinner nimmt den wirtschaftlichen Preis, abzüglich der Provision für Ersteller, Prüfer und Plattform, und erhält das Spiel-NFT.',
					note: 'Du entscheidest, ob dein Lauf das Einreichen wert ist.'
				}
			]
		},

		validation: {
			label: 'Punkteprüfung',
			beats: [
				{
					h: 'Deine Punktzahl ist ein Hash, keine Behauptung.',
					p: 'Wenn du teilnimmst, geht on-chain eine <strong>Festlegung</strong> — ein Digest. Niemand, auch der Ersteller nicht, kann deine Punktzahl von der Blockchain lesen, solange das Spiel noch offen ist.'
				},
				{
					h: 'Dann kommt das Geheimnis raus.',
					p: 'Nach der Frist deckt der Ersteller das Spielgeheimnis in der Auflösungstransaktion auf. Das ist die fehlende Zutat — und sie <strong>schaltet die Prüfung für alle gleichzeitig frei</strong>.'
				},
				{
					h: 'Der Vertrag rechnet es nach.',
					p: 'Der Spielvertrag baut eine Festlegung für jede Punktzahl aus <strong>Solver ID, Punktewert, gehashten Protokollen und aufgedecktem Geheimnis</strong>. Keine Vertrauenspartei ist beteiligt; es ist Arithmetik.'
				},
				{
					h: 'Wenn sie übereinstimmen, ist die Punktzahl echt.',
					p: 'Eine nachgerechnete Festlegung, die der veröffentlichten gleicht, beweist, dass die Punktzahl echt und unverfälschbar ist. Was nicht passt, ist einfach keine Punktzahl.',
					note: 'Transparent und trotzdem privat: bewiesen, ohne offenzuliegen.'
				}
			]
		},

		pot: {
			label: 'Ökonomie',
			beats: [
				{
					h: 'Jeder Beitrag füttert den Pott.',
					p: 'Teilnahmegebühren aller, die eine Festlegung einreichen, sammeln sich in einem einzigen on-chain-Pott für dieses Spiel.'
				},
				{
					h: 'Provisionen gehen oben runter.',
					p: 'Ersteller, Prüfer und Plattform nehmen ihre vereinbarte Provision — alles offen festgelegt, als das Spiel veröffentlicht wurde, und <strong>vom Smart Contract durchgesetzt</strong>, nicht durch irgendjemandes Wohlwollen.'
				},
				{
					h: 'Der Rest geht an den Gewinner.',
					p: 'Die höchste geprüfte Punktzahl nimmt den restlichen Pott — plus das <strong>Spiel-NFT</strong>, ein dauerhafter, öffentlicher, prüfbarer Siegesnachweis. Die Mittel werden nach einer Prüfperiode freigegeben, die den Prüfern Zeit gibt, zu kontrollieren, dass der Ersteller ehrlich gehandelt hat.',
					note: 'Niemand genehmigt die Auszahlung. Der Vertrag tut es.'
				}
			]
		},

		judges: {
			label: 'Vertrauen und Rechenschaft',
			beats: [
				{
					h: 'Wer kontrolliert den Ersteller?',
					p: 'Prüfer sind vom Ersteller benannte Stellen, die die Auflösungsphase prüfen. Sie verifizieren, dass der Spieldienst des Erstellers <strong>gültige Beweise und gültige Punktzahlen</strong> erzeugt hat.'
				},
				{
					h: 'Betrug kostet den Ersteller, nicht dich.',
					p: 'Wenn ein Prüfer einen fehlerhaften Spieldienst oder einen ungültigen Beweis erwischt, <strong>erhält dieser Prüfer die Provision des Erstellers</strong> als Belohnung. Der Anreiz, genau hinzusehen, ist eingebaut.'
				},
				{
					h: 'Spieler bleiben außerhalb des Sprengradius.',
					p: 'Im Normalbetrieb können Prüfer Spieler nicht bestrafen. Prüfer gibt es, um <strong>Spieler vor unehrlichen Erstellern zu schützen</strong>, nie umgekehrt.',
					note: 'Das Haus prüfen, nicht die Gäste.'
				}
			]
		}
	},

	/* ============================================================== *
	 * Referenzliste unter der Prüfungsszene
	 * ============================================================== */
	steps: {
		title: 'Die fünf Schritte, der Reihe nach',
		items: [
			{
				badge: 'EINGEREICHT',
				title: 'Teilnahme des Spielers',
				desc: 'Der Spieler veröffentlicht seine Teilnahme auf der Ergo-Blockchain.'
			},
			{
				badge: 'AUFGEDECKT',
				title: 'Der Ersteller deckt das Geheimnis auf',
				desc: 'Nach der Frist deckt der Ersteller das Spielgeheimnis in der Auflösungstransaktion auf — das schaltet die Prüfung frei.'
			},
			{
				badge: 'BERECHNET',
				title: 'Prüfung durch Smart Contract',
				desc: 'Der Spielvertrag berechnet eine Festlegung für jede Punktzahl aus Solver ID, Punktewert, gehashten Protokollen und aufgedecktem Geheimnis.'
			},
			{
				badge: 'GEPRÜFT',
				title: 'Prüfung der Punktzahl',
				desc: 'Wenn die Punkte-Festlegung der Teilnahme-Festlegung gleicht, ist diese Punktzahl als echt und unverfälschbar bestätigt.'
			},
			{
				badge: 'AUSGEZAHLT',
				title: 'Der Gewinner nimmt den Pott',
				desc: 'Die höchste Punktzahl gewinnt. Nach einer Prüfperiode, die sicherstellt, dass der Ersteller ehrlich gehandelt hat, werden die Mittel an den Gewinner freigegeben, abzüglich der Provisionen für Ersteller und Prüfer.'
			}
		]
	},

	/* ============================================================== *
	 * Video
	 * ============================================================== */
	video: {
		label: 'Überblick',
		title: 'Die Kurzübersicht ansehen',
		subtitle:
			'In Minuten im Bild — wie Game of Prompts Blockchain und KI-Wettbewerbe zusammenbringt.',
		thumbAlt: 'Vorschaubild des Videos zu Game of Prompts',
		iframeTitle: 'Game of Prompts — kurze Übersicht'
	},

	/* ============================================================== *
	 * Sicherheit
	 * ============================================================== */
	security: {
		label: 'Sicherheit',
		title: 'Wettbewerb, transparent und trotzdem privat',
		subtitle:
			'Kryptographie sorgt für fairen Wettbewerb und schützt die Strategien der Teilnehmenden.',
		cards: [
			{
				title: 'Codeschutz',
				desc: 'Das geistige Eigentum des Spiels und das Spielgeheimnis werden durch Verschleierung geschützt, um Reverse Engineering zu verhindern.'
			},
			{
				title: 'Private Ergebnisse',
				desc: 'Strategische Köder und kryptographische Festlegungen verbergen deine echte Punktzahl und schützen deine Strategie bis zur endgültigen Aufdeckung.'
			},
			{
				title: 'Unveränderlicher Beweis',
				desc: 'Die endgültige Prüfung auf der Ergo-Blockchain erzeugt einen öffentlichen, unveränderlichen und prüfbaren Siegesnachweis.'
			}
		]
	},

	/* ============================================================== *
	 * Spieltypen
	 * ============================================================== */
	gameTypes: {
		title: 'Was kann ein Spiel sein?',
		text: 'Game of Prompts ist eine vielseitige Plattform, die sehr unterschiedliche Wettbewerbe aufnehmen kann. Hier nur ein paar Beispiele, was möglich ist.',
		eyebrow: 'Spieltyp {n}',
		items: [
			{
				title: 'Klassische Arcade',
				desc: 'Der KI-Solver steuert die Figur in schnellen, geschicklichkeitsbasierten Spielumgebungen. Reflexe, Mustererkennung, Timing.',
				score: 'Spielpunkte · Überlebenszeit · geschaffte Level'
			},
			{
				title: 'Offene Welt',
				desc: 'Räumliches Denken, Navigation und Anpassung an die Umgebung optimieren.',
				score: 'Ressourceneffizienz · Kartenerkundung · Missionskomplexität'
			},
			{
				title: 'Finanzhandel',
				desc: 'Bot gegen Markt. Virtuelle Werte in realistischen Simulationen handeln, mit historischen oder synthetischen Daten. Reine Strategie, null Glück.',
				score: 'Nettogewinn · Sharpe-Ratio · Drawdown · Vergleichswerte'
			},
			{
				title: 'Proteinfaltung',
				desc: '3-D-Proteinstrukturen aus Aminosäuresequenzen vorhersagen. Eine echte wissenschaftliche Herausforderung — KI-Solver, die die Biologie voranbringen.',
				score: 'strukturelle Stabilität · Faltungsgenauigkeit · Effizienz'
			}
		]
	},

	/* ============================================================== *
	 * Optionale Funktionen
	 * ============================================================== */
	features: {
		title: 'Optionale Spielfunktionen',
		text: 'Ersteller können ihre Spiele mit optionalen Mechaniken anreichern — vom Bluff wie beim Poker über Ressourcengrenzen bis zum Bezahl-pro-Versuch-Modell.',
		eyebrow: 'Funktion {n}',
		status: {
			available: 'Verfügbar',
			research: 'In der Forschung'
		},
		items: [
			{
				title: 'Ressourcenbegrenzung',
				desc: 'Technische Herausforderung durch knappe Rechenressourcen. Effizienz ist König.',
				bullets: [
					'Der Ersteller setzt konkrete Grenzen für Rechenressourcen',
					'Beschränkungen: maximaler RAM, CPU-Zeit oder Dienstabhängigkeiten',
					'Zwingt Spieler, sehr effiziente, optimierte Lösungen zu entwickeln',
					'Fügt dem Spiel eine erhebliche ingenieurtechnische Herausforderung hinzu'
				]
			},
			{
				title: 'Poker-Modus',
				desc: 'Strategische Teilnahme mit Risiko und Gewinn. Bluffe, setze, und multipliziere deine Punktzahl.',
				bullets: [
					'Teilnehmende wählen, wie viel sie zahlen (über einem festgelegten Minimum)',
					'Höhere Zahlung = höherer Multiplikator der Endpunktzahl (z. B. ×2, ×5)',
					'Spieler können mehrere Köderpunktzahlen einreichen',
					'Bluff-Strategie: hohe Gebühr zahlen und falsche hohe Punktzahlen einreichen, um einzuschüchtern',
					'Der Ersteller setzt den Multiplikator nach gezahlter Gebühr'
				]
			},
			{
				title: 'Bezahl pro Versuch',
				desc: 'Ein Mechanismus, der jeder lokalen Ausführung Kosten zuweist und gut gebaute Agenten gegenüber Versuch und Irrtum fördert.',
				bullets: [
					'Steigende Token-Kosten je lokalem Ausführungsversuch',
					'Fördert gründliche lokale Simulation und Optimierung',
					'Entmutigt blinde Brute-Force-Strategien',
					'Skalierung der Schwierigkeit vollständig vom Ersteller konfigurierbar'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 * ============================================================== */
	faq: {
		label: 'FAQ',
		title: 'Häufige Fragen',
		footerTitle: 'Noch Fragen?',
		footerDesc:
			'Kopiere den Prompt unten und füge ihn in einen beliebigen KI-Assistenten ein — er enthält einen Link zu unserer vollständigen Dokumentation.',
		copyPrompt: 'Prompt kopieren',
		copied: 'Kopiert!',
		orLabel: 'oder direkt öffnen in:',
		disclaimerBefore: '⚠️ KI-Antworten können ungenau sein. Lies immer die ',
		disclaimerLink: 'offizielle Dokumentation',
		disclaimerAfter: ' für verbindliche Informationen.',
		telegram: 'Telegram-Community beitreten',
		groups: [
			{
				title: 'Allgemein',
				items: [
					{
						q: 'Was ist Game of Prompts?',
						a: 'Ein Bot-Wettbewerb, den eine Blockchain prüft. Ersteller entwerfen Spieldienste, um KI-Solver zu bewerten, während Spieler Solver-Dienste bauen, um ihre Punktzahl zu maximieren — alles auf der Ergo-Blockchain geprüft.'
					},
					{
						q: 'Was ist die «Zeremoniephase»?',
						a: 'Der Anfangszeitraum, in dem Spieler ihre Solver IDs registrieren, um Zufall in den Seed zu mischen. Das hindert den Ersteller daran, Lösungen vorzurechnen, und sorgt für fairen Wettbewerb.'
					},
					{
						q: 'Was brauche ich zum Spielen?',
						a: 'Eine Ergo-Wallet (mit etwas ERG für Teilnahmegebühren) und einen Celaut-Knoten, um Spiel- und Solver-Dienste lokal auszuführen.'
					}
				]
			},
			{
				title: 'Sicherheit',
				items: [
					{
						q: 'Woher weiß ich, dass das Spiel fair ist?',
						a: 'Die Spielregeln und der hashS sind von Anfang an on-chain registriert. Sie sind unveränderlich — niemand kann sie nach der Veröffentlichung ändern.'
					},
					{
						q: 'Kann der Ersteller die Mittel stehlen?',
						a: 'Nein. Die Mittel liegen in einem Smart Contract fest, nicht in der Wallet des Erstellers. Die Verteilung übernimmt der Vertrag atomar, wenn das Spiel aufgelöst wird.'
					},
					{
						q: 'Was, wenn der Ersteller verschwindet?',
						a: 'Nach einer Schonfrist können Spieler eine Rückerstattung auslösen und ihre Teilnahmegebühren vom Smart Contract zurückholen.'
					}
				]
			},
			{
				title: 'Prüfer',
				items: [
					{
						q: 'Wer sind die Prüfer?',
						a: 'Vom Ersteller benannte Stellen, die die Auflösungsphase prüfen. Sie verifizieren, dass der Spieldienst gültige Beweise erzeugt hat.'
					},
					{
						q: 'Warum verdienen Prüfer Geld, wenn sie eine Teilnahme ungültig machen?',
						a: 'Sie erkennen Betrug des Erstellers — ihr Anreiz ist, fehlerhafte Spieldienste zu erwischen. Finden sie Probleme, erhalten sie die Provision des Erstellers als Belohnung.'
					},
					{
						q: 'Kann ich als Spieler bestraft werden?',
						a: 'Das System bestraft den Ersteller und seinen Spieldienst, nicht ehrliche Spieler. Prüfer prüfen den Ersteller, nicht dich.'
					}
				]
			},
			{
				title: 'Wirtschaft',
				items: [
					{
						q: 'Wie wird der Gewinner berechnet?',
						a: 'Die höchste zeitgewichtete Punktzahl: Punktzahl × (TimeWeight + Restzeit). Früh einreichen und hoch punkten für das beste Ergebnis.'
					},
					{
						q: 'Wann erhalte ich meine Gewinne?',
						a: 'Sofort bei der Aktion Spielende. Der Smart Contract verteilt alle Mittel atomar — der Gewinner erhält alle Teilnahmegebühren minus Provision des Erstellers und der Prüfer.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Aufruf + Fußzeile
	 * ============================================================== */
	cta: {
		label: 'Loslegen',
		title: 'Mit Game of Prompts loslegen',
		steps: [
			'Installiere die Software des <strong>Celaut-Knotens</strong>, um Spiel- und Solver-Dienste in einer sicheren, deterministischen Umgebung auszuführen.',
			'Richte eine <strong>Wallet der Ergo-Blockchain</strong> ein, um an Spielen teilzunehmen und Gewinne zu empfangen.',
			'Durchsuche verfügbare Spiele auf <strong>GoP Web</strong> und fang an, eigene Solver zu entwickeln oder schwierige Spiele für andere zu erstellen.'
		],
		github: 'GitHub-Repository',
		celaut: 'Celaut-Projekt',
		ergo: 'Ergo-Plattform'
	},

	footer: {
		tagline: 'Schreib deine Prompts. Bau deinen Bot. Gewinne den Thron.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
