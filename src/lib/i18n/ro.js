/*
 * src/lib/i18n/ro.js
 * ------------------------------------------------------------------
 * Română — traducere a en.js, cheie cu cheie.
 *
 * Aceeași structură, aceleași lungimi de tablou. glossary.terms are
 * exact 33 de înregistrări și se cuplează pe poziție cu GLOSSARY_IDS
 * din glossary/terms.js.
 *
 * `match` nu e traducerea titlului: e lista de forme care, când apar
 * ÎN ACEASTĂ PROZĂ, primesc subliniere. Pluralul, articolul hotărât
 * și genurile românești sunt trecute explicit; matcherul nu știe decât
 * -s/-es englezesc.
 */

export default {
	/* ============================================================== *
	 * Controalele din colț
	 * ============================================================== */
	common: {
		languageLabel: 'Limbă',
		switchLanguage: 'Schimbă limba',
		themeToLight: 'Treci la tema luminoasă',
		themeToDark: 'Treci la tema întunecată',
		backToTop: 'Înapoi sus',
		scoring: 'PUNCTARE'
	},

	/* ============================================================== *
	 * Glosar
	 * ============================================================== */
	glossary: {
		toggleOn: 'Explică termenii tehnici',
		toggleOff: 'Ascunde explicațiile',
		toggleLabel: 'Explicații',
		close: 'Închide',
		explain: 'Ce înseamnă «{term}»?',
		hintTitle: 'Unele cuvinte sunt subliniate.',
		hintBody:
			'Atinge orice cuvânt subliniat pentru o explicație pe înțeles. Le poți opri oricând cu butonul din colț.',
		hintDismiss: 'Am înțeles',

		terms: [
			{
				match: [
					'serviciu de joc',
					'serviciul de joc',
					'serviciului de joc',
					'servicii de joc',
					'serviciile de joc'
				],
				title: 'Serviciu de joc',
				body: 'Provocarea însăși, împachetată ca un program sigilat pe care oricine îl poate descărca și rula. Conține regulile, punctajul și secretul ascuns al celui care l-a creat — ca o lucrare de examen pecetluită care se și corectează singură.',
				more: 'Îl rulezi pe mașina ta. Punctează botul și produce chitanța criptografică pe care blockchainul o va verifica după aceea.'
			},
			{
				match: [
					'serviciu solver',
					'serviciul solver',
					'servicii solver',
					'solver',
					'solverul',
					'solverului',
					'solvere'
				],
				title: 'Serviciu solver',
				body: 'Participarea ta. Botul pe care îl construiești ca să joci, împachetat la fel de sigilat ca să ruleze identic pe orice mașină — strategia ta, într-o singură cutie de luat la drum.',
				more: 'E predat serviciului de joc, care îl rulează izolat și punctează ce a făcut. Codul nu-l vede nimeni în afară de tine.'
			},
			{
				match: ['GoP Web', 'portalul comunității', 'portalul'],
				title: 'GoP Web',
				body: 'Site-ul unde sunt listate jocurile: citești regulile, descarci un joc, publici rezultatul. E un catalog și un instrument de semnare, nu un arbitru — nimic din ce arată nu trebuie crezut pe cuvânt.',
				more: 'Poți rula propria copie. Asta e ideea: dacă cea publică ar dispărea, jocurile ar continua.'
			},
			{
				match: ['Celaut', 'nod Celaut', 'nodul Celaut', 'noduri Celaut'],
				title: 'Celaut',
				body: 'Sistemul care rulează cu adevărat programele sigilate. Îl instalezi o dată și, de-atunci, orice pachet de joc sau de solver poate fi dat mașinii tale și executat în camera lui încuiată.',
				more: 'Face ca «rulează-l tu» să fie realitate, nu slogan: același pachet se poartă la fel pe orice mașină care îl deschide.'
			},
			{
				match: ['nod', 'nodul', 'nodului', 'noduri', 'nodurile'],
				title: 'Nod',
				body: 'Un calculator care participă la o rețea. Laptopul, un desktop ținut deoparte, un server în rack — de îndată ce rulează programul și vorbește cu alte mașini, e un nod.',
				more: 'Aici e pur și simplu mașina care rulează jocurile și solvere. A ta, nu centrul de date al cuiva.'
			},
			{
				match: ['serviciu', 'serviciul', 'serviciului', 'servicii', 'serviciile'],
				title: 'Serviciu',
				body: 'O bucată de software de sine stătătoare, care face o singură treabă și poate fi dată oricărei mașini să o ruleze — mai aproape de un aparat decât de un program întreg pe care îl instalezi.',
				more: 'Ambele jumătăți ale unei competiții sunt servicii: jocul și botul care îl joacă.'
			},
			{
				match: ['blockchain', 'blockchainul', 'blockchainului'],
				title: 'Blockchain',
				body: 'Un registru comun pe care mii de calculatoare țin copii în același timp. Ca să adaugi un rând, ceilalți trebuie să accepte că e valid, iar rândurile vechi nu se rescriu — nimeni nu controlează istoria de unul singur.',
				more: 'Aici e folosit pentru două trebi înguste: să înregistreze cine a revendicat ce punctaj și să plătească câștigătorul. Nimic mai mult.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'Blockchainul anume pe care această platformă înregistrează rezultatele și decontează plățile. ERG e unitatea lui de monedă.',
				more: 'E o alegere, nu o temelie: platforma nu are monedă proprie.'
			},
			{
				match: [
					'contract inteligent',
					'contractul inteligent',
					'contracte inteligente',
					'contractul jocului',
					'contract',
					'contractul',
					'contractului',
					'contracte'
				],
				title: 'Contract inteligent',
				body: 'Un program care trăiește pe blockchain și ține bani după reguli scrise dinainte. Când condițiile sunt îndeplinite, plătește singur — nimeni nu semnează un cec, nimeni nu poate decide să nu plătească.',
				more: 'De-asta premiul e în siguranță înainte ca cineva să-l fi câștigat: fondurile le țin regulile, nu persoana care le-a scris.'
			},
			{
				match: ['on-chain', 'în lanț'],
				title: 'On-chain',
				body: 'Scris în blockchainul însuși, unde toată lumea îl vede și nimeni nu-l poate schimba în tăcere mai târziu — spre deosebire de o bază de date privată a unei companii.'
			},
			{
				match: [
					'angajament criptografic',
					'angajamente criptografice',
					'angajamentul de punctaj',
					'pre-angajament',
					'angajament',
					'angajamentul',
					'angajamente'
				],
				title: 'Angajament',
				body: 'Un plic sigilat. Publici ceva care dovedește ce ai ales, fără să arate ce era — și mai târziu, când plicul se deschide, oricine poate verifica că n-ai schimbat conținutul.',
				more: 'Permite ca un punctaj să fie blocat public cât jocul e încă deschis, fără să le spui rivalilor cât de bine ți-a mers.'
			},
			{
				match: ['jurnale hash-uite', 'hash', 'digest'],
				title: 'Hash',
				body: 'O amprentă scurtă calculată dintr-o bucată de date. Aceleași date dau mereu aceeași amprentă, un singur octet schimbat dă una cu totul alta, și nu poți merge înapoi de la amprentă la date.',
				more: 'Sensul unic e tot trucul: poți dovedi că ceva se potrivește fără să arăți ce e.'
			},
			{
				match: [
					'secret de 256 de biți',
					'secretul jocului',
					'secret',
					'secretul',
					'secrete'
				],
				title: 'Secret',
				body: 'Un număr aleatoriu mare pe care cel care creează jocul îl generează și îl ține ascuns cât jocul e deschis. Fiecare punctaj e sigilat cu el, deci niciunul nu poate fi verificat — ori falsificat — până când îl publică.',
				more: 'Publicarea la final face ca rezultatele tuturor să fie verificabile în același moment, nu unul câte unul.'
			},
			{
				match: ['sămânța jocului', 'sămânță', 'sămânța', 'semințe'],
				title: 'Sămânță',
				body: 'Numărul de start care decide exact ce variantă de provocare întâlnești — ce tablă, ce date de piață, ce puzzle. Aceeași sămânță, aceeași provocare, pentru toată lumea.',
				more: 'E dezvăluită abia după ce se închid înscrierile, ca nimeni să nu-și poată regla botul dinainte pe tura aia anume.'
			},
			{
				match: ['faza de ceremonie', 'perioada de ceremonie', 'ceremonie'],
				title: 'Faza de ceremonie',
				body: 'Fereastra de la începutul unui joc în care jucătorii se înscriu și fiecare înscriere amestecă un pic de imprevizibil în sămânța finală. Ca și cum toți ar arunca un zar în aceeași cupă înainte să se ridice capacul.',
				more: 'Există ca nici cel care a creat jocul să nu cunoască provocarea dinainte — jucătorii o decid împreună, fără să-și propună.'
			},
			{
				match: ['Solver ID', 'identificatorul solverului'],
				title: 'Solver ID',
				body: 'Amprenta unică a botului exact pe care l-ai înscris. Denumește o versiune anume a codului tău, deci un bot nu poate fi schimbat pe tăcute după ce sămânța e dezvăluită.'
			},
			{
				match: ['Paper', 'Paperul', 'Paperul jocului'],
				title: 'Paper',
				body: 'Regulile scrise: ce e provocarea, cum se punctează, ce contează ca participare validă. Se publică înainte ca cineva să poată juca, ca termenii să nu se schimbe după ce oamenii s-au angajat.',
				more: 'Ideea e să-ți poți construi participarea numai din documentul ăsta.'
			},
			{
				match: ['oală', 'oala', 'oalei', 'fond de premii'],
				title: 'Oală',
				body: 'Toate taxele de participare, adunate și ținute de contract până se rezolvă jocul. Cine concurează plătește; câștigătorul ia ce rămâne după tăieturile convenite.'
			},
			{
				match: [
					'taxă de participare',
					'taxa de participare',
					'taxe de participare',
					'taxele de participare',
					'taxă de înscriere'
				],
				title: 'Taxă de participare',
				body: 'Ce costă să trimiți un rezultat pe care vrei să conteze. Intră în oală, nu la organizatori, deci fiecare participare mărește premiul.',
				more: 'O plătești doar dacă decizi că tura a meritat trimisă — rularea jocului pe mașina ta e gratuită.'
			},
			{
				match: [
					'comisionul creatorului',
					'comision',
					'comisionul',
					'comisionului',
					'comisioane'
				],
				title: 'Comision',
				body: 'Felie convenită din oală care se duce la cel care a creat jocul, la judecători și la platformă. Se fixează la vedere când se publică jocul și se ia automat — nu se negociază după.'
			},
			{
				match: [
					'judecător',
					'judecătorul',
					'judecătorului',
					'judecători',
					'judecătorii',
					'judecătorilor'
				],
				title: 'Judecător',
				body: 'Cineva a cărui treabă e să-l verifice pe cel care a creat jocul, nu pe jucători: a punctat jocul cinstit, sunt chitanțele valide? Dacă prinde o trișare, e plătit din partea creatorului.',
				more: 'Să fii plătit ca să găsești frauda, nu ca să aprobi lucruri, e ce face rolul meritat.'
			},
			{
				match: ['NFT', 'NFT-ul jocului'],
				title: 'NFT',
				body: 'Un token unic înregistrat pe blockchain, care poate fi deținut și transferat, dar nu duplicat. Aici e trofeul: dovada publică, permanentă, a cine a câștigat un joc anume.'
			},
			{
				match: ['portofel Ergo', 'portofel', 'portofelul', 'portofele'],
				title: 'Portofel',
				body: 'Aplicația care ține cheile fondurilor tale și semnează acțiunile pe blockchain. Nu e un cont la o firmă — nimeni nu-l poate îngheța, nimeni nu ți-l poate recupera.'
			},
			{
				match: [
					'taxă de gaz a rețelei',
					'taxă de gaz',
					'taxa de gaz',
					'taxe de gaz',
					'taxă de rețea'
				],
				title: 'Taxă de gaz',
				body: 'Mica taxă ca rețeaua să-ți înregistreze tranzacția. Plătește calculatoarele care fac înregistrarea, nu platforma — mai degrabă timbru decât preț de bilet.'
			},
			{
				match: [
					'determinist',
					'deterministă',
					'determinism',
					'reproductibil',
					'reproductibilitate'
				],
				title: 'Determinist',
				body: 'Aceeași intrare, aceeași ieșire, de fiecare dată — ca o rețetă care dă același tort în orice bucătărie, nu una care depinde de bucătar. Nici mașina, nici ziua, nici locul nu schimbă rezultatul.',
				more: 'E ce face un punctaj verificabil de altcineva: poate re-rula și trebuie să iasă numărul tău.'
			},
			{
				match: [
					'mediu izolat sigur',
					'mediu izolat',
					'izolare',
					'izolat',
					'izolată',
					'sigilat',
					'sigilate',
					'sigilată'
				],
				title: 'Izolare',
				body: 'A ține un program în rulare înăuntrul unei granițe pe care n-o poate trece — vede doar ce i s-a dat, nimic din mașina din jur ori din altceva care rulează acolo.',
				more: 'E ce permite unui joc să ruleze în siguranță botul unui străin, și ție să rulezi în siguranță jocul unui străin.'
			},
			{
				match: ['ofuscare', 'ofuscat', 'ofuscată', 'ofusca'],
				title: 'Ofuscare',
				body: 'A încurca un program dinadins ca să ruleze perfect, dar să doară să-l citești — echivalentul software al unui document tipărit fără spații și fără rânduri noi.',
				more: 'Aici ține secretul ascuns al unui joc ascuns, chiar dacă toată lumea are o copie a programului care îl conține.'
			},
			{
				match: ['peer-to-peer', 'P2P', 'de la egal la egal'],
				title: 'Peer-to-peer',
				body: 'Două calculatoare care se ocupă direct unul de altul, ca doi oameni la telefon — în loc să trimită totul printr-o firmă la mijloc, cum merg poșta electronică sau o piață. Fiecare calculator e un «peer»: egali, nimeni la comandă.',
				more: 'Contează aici pentru că firma din mijloc e de obicei cea care pune prețul, își ia partea și te poate da afară.'
			},
			{
				match: [
					'auto-găzduire',
					'auto-găzduit',
					'auto-găzduită',
					'rulare locală'
				],
				title: 'Auto-găzduire',
				body: 'A rula propria copie a unui serviciu pe mașina ta, în loc să o folosești pe a altcuiva. Lucrul continuă să meargă chiar dacă versiunea publică e oprită, cenzurată sau pur și simplu are o zi proastă.'
			},
			{
				match: [
					'punctaj momeală',
					'punctaje momeală',
					'punctaje false',
					'momeală',
					'momeala',
					'momeli'
				],
				title: 'Momeală',
				body: 'O participare dinadins înșelătoare — un punctaj pe care îl publici și care nu e cel real — trimis ca rivalii să ghicească greșit cât de bine ți-a mers. Un bluff, posibil pentru că nimeni nu poate citi un punctaj sigilat.'
			},
			{
				match: [
					'scor ponderat în timp',
					'punctaj ponderat în timp',
					'TimeWeight'
				],
				title: 'Scor ponderat în timp',
				body: 'Un punctaj ajustat după cât de devreme l-ai trimis. Două rezultate identice nu egalează: cel intrat mai devreme contează mai mult, deci să stai pe un răspuns bun până la termen te costă.'
			},
			{
				match: [
					'perioadă de grație',
					'perioada de grație',
					'perioadă de validare',
					'rambursare',
					'rambursări'
				],
				title: 'Perioadă de grație',
				body: 'O fereastră de așteptare scrisă în reguli înainte să se miște banii — timp pentru judecători să obiecteze și pentru jucători să-și ceară taxele înapoi dacă cel care a creat jocul nu-l rezolvă niciodată.',
				more: 'E răspunsul la «ce se întâmplă dacă organizatorul dispare»: contractul lasă pe toată lumea să plece cu banii lor.'
			},
			{
				match: ['CDE', 'variabilitate de scenarii', 'variabilitate mare de scenarii'],
				title: 'Variabilitate de scenarii (CDE)',
				body: 'Cât de diferită poate fi fiecare rulare a unui joc față de cea dinainte. Variabilitate mare înseamnă că botul trebuie să joace cu adevărat bine, pentru că nu există un singur răspuns fix de memorat și bătut în cuie.'
			}
		]
	},

	/* ============================================================== *
	 * Ecran de start
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'SCRIE-ȚI PROMPTURILE. CONSTRUIEȘTE BOTUL. IA TRONUL.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Scrie-ți prompturile. Construiește botul. Ia tronul.',
		description:
			'O platformă competitivă unde cei care creează proiectează servicii de joc ca să evalueze solvere de IA, iar jucătorii construiesc servicii solver ca să-și maximizeze punctajul — pe blockchainul Ergo și Celaut.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Scrie-ți prompturile. Construiește botul. Ia tronul.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Scrie-ți prompturile. <span class="hero-grad">Construiește botul.</span> Ia tronul.',
		lede: 'O platformă competitivă unde cei care creează proiectează servicii de joc ca să evalueze solvere de IA, iar jucătorii construiesc servicii solver ca să-și maximizeze punctajul — totul înregistrat și verificat on-chain.',
		actions: {
			launch: 'Deschide aplicația',
			github: 'Vezi pe GitHub',
			how: 'Vezi cum funcționează'
		},
		stats: [
			{ value: 'P2P', label: 'Descentralizat — serviciile rulează pe propriul nod Celaut' },
			{ value: 'On-chain', label: 'Rezultate angajate și verificate pe Ergo' },
			{ value: 'Fără încredere', label: 'Oala o decontează contractele inteligente, nu o firmă' }
		],
		scroll: 'Derulează'
	},

	/* ============================================================== *
	 * Cele șapte scene
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'Ideea',
			beats: [
				{
					h: 'Cineva publică o provocare.',
					p: 'Cel care creează proiectează un joc cu punctaj măsurabil și îl împachetează ca <strong>serviciu de joc</strong>: un serviciu Celaut imuabil care ține logica jocului și secretul lui.'
				},
				{
					h: 'Ceilalți construiesc un bot ca să-l bată.',
					p: 'Jucătorii scriu <strong>servicii solver</strong> — strategia lor, împachetată la fel. Serviciul de joc rulează fiecare solver într-un mediu izolat sigur și punctează ce a făcut.'
				},
				{
					h: 'Cel mai mare punctaj ia tronul.',
					p: 'Niciun clasament pe care trebuie să-l crezi. Fiecare punctaj e angajat criptografic și <strong>decontat pe blockchainul Ergo</strong>, unde oricine poate reface calculele.',
					note: 'Scrie-ți prompturile. Construiește botul. Ia tronul.'
				}
			]
		},

		components: {
			label: 'Arhitectură',
			beats: [
				{
					h: 'Serviciu de joc',
					p: 'Îl construiesc cei care dezvoltă jocul. Un serviciu autonom care încapsulează logica și secretul. Evaluează performanța solverului, generează punctaje și creează <strong>angajamentele criptografice</strong> necesare validării pe blockchain.'
				},
				{
					h: 'Serviciu solver',
					p: 'Îl construiesc jucătorii. Implementează strategii ca să maximizeze punctajul într-un joc anume. Solverul e împachetat și trimis serviciului de joc, care îl <strong>execută într-un mediu izolat sigur</strong> pentru evaluare.'
				},
				{
					h: 'GoP Web',
					p: 'Portalul comunității. Descoperi jocuri, citești regulile, descarci servicii de joc și publici rezultatele pe blockchainul Ergo. <strong>Suportă auto-găzduirea</strong> pentru o experiență peer-to-peer, fără să depinzi de nimeni.'
				},
				{
					h: 'Totul rulează pe mașina ta.',
					p: 'Serviciile de joc și de solver rulează pe un <strong>nod Celaut local</strong>, care poate funcționa complet offline. GoP Web se poate folosi de pe instanța GitHub.io sau rula local ca serviciu Celaut.',
					note: 'Două tehnologii: Celaut pentru calcul, Ergo pentru decontare.'
				}
			]
		},

		creator: {
			label: 'Fluxul celui care creează jocul',
			beats: [
				{
					h: 'Proiectează un joc.',
					p: 'Creează o provocare cu punctaj măsurabil și variabilitate mare de scenarii (CDE), ca soluțiile bătute în cuie să nu meargă.'
				},
				{
					h: 'Scrie Paperul.',
					p: 'Publică un document cu toate instrucțiunile, regulile și criteriile de evaluare. Jucătorii trebuie să poată înțelege provocarea <strong>înainte</strong> să participe.'
				},
				{
					h: 'Generează un secret.',
					p: 'Un <strong>secret de 256 de biți</strong> unic susține angajamentele criptografice și validarea ulterioară a punctajelor. Nimeni nu-l poate vedea cât jocul e deschis.'
				},
				{
					h: 'Împachetează și publică.',
					p: 'Scoate jocul ca serviciu Celaut și publică-l prin GoP Web cu parametrii: taxă, termen, comision.'
				},
				{
					h: 'Dezvăluie secretul.',
					p: 'Când trece termenul, cel care a creat jocul <strong>dezvăluie secretul on-chain</strong>. Asta rezolvă jocul: validarea punctajelor devine posibilă și contractul inteligent poate determina câștigătorul.',
					note: 'Întâi angajamentul, apoi dezvăluirea. Asta îl face cinstit.'
				}
			]
		},

		player: {
			label: 'Drumul jucătorului',
			beats: [
				{
					h: 'Răsfoiește și citește Paperul.',
					p: 'Găsește un joc pe GoP Web. Citește Paperul ca să înțelegi provocarea, regulile și criteriile de evaluare înainte să te angajezi la ceva.'
				},
				{
					h: 'Implementează solverul.',
					p: 'Construiește serviciul solver numai din Paper, ca să fie gata de concurs în clipa în care cade sămânța.'
				},
				{
					h: 'Înregistrează-ți Solver ID.',
					p: 'Înregistrarea e gratuită — acoperi doar taxa de gaz a rețelei. Acest <strong>pre-angajament</strong> e ce garantează corectitudinea înainte ca sămânța să fie dezvăluită.'
				},
				{
					h: 'Sămânța e dezvăluită.',
					p: 'Când se termină faza de ceremonie, sămânța jocului iese public. Acum — și abia acum — cunoști parametrii exacți ai provocării pe care vei fi evaluat.'
				},
				{
					h: 'Rulează serviciul de joc local.',
					p: 'Serviciul execută solverul într-un mediu sigur cu sămânța dezvăluită, evaluează performanța și generează <strong>angajamentul criptografic</strong> necesar validării on-chain.'
				},
				{
					h: 'Trimite angajamentul și plătește taxa.',
					p: 'Dacă punctajul merită concursul, publică angajamentul on-chain și plătește taxa de participare. <strong>Toate taxele intră în oală</strong> — câștigătorul ia premiul economic, minus comisionul creatorului, judecătorilor și platformei, și primește NFT-ul jocului.',
					note: 'Tu decizi dacă tura merită trimisă.'
				}
			]
		},

		validation: {
			label: 'Validarea punctajelor',
			beats: [
				{
					h: 'Punctajul tău e un hash, nu o afirmație.',
					p: 'Când participi, ce merge on-chain e un <strong>angajament</strong> — un digest. Nimeni, inclusiv cel care a creat jocul, nu-ți poate citi punctajul de pe blockchain cât jocul e încă deschis.'
				},
				{
					h: 'Apoi iese secretul.',
					p: 'După termen, cel care a creat jocul dezvăluie secretul jocului în tranzacția de rezolvare. Ăsta e ingredientul care lipsea — și <strong>deschide verificarea pentru toată lumea deodată</strong>.'
				},
				{
					h: 'Contractul recalculează.',
					p: 'Contractul jocului construiește un angajament pentru fiecare punctaj din <strong>Solver ID, valoarea punctajului, jurnalele hash-uite și secretul dezvăluit</strong>. Nu intervine nicio parte de încredere; e aritmetică.'
				},
				{
					h: 'Dacă se potrivesc, punctajul e real.',
					p: 'Un angajament recalculat egal cu cel publicat dovedește că punctajul e autentic și neatins. Ce nu se potrivește pur și simplu nu e un punctaj.',
					note: 'Transparent și privat totodată: dovedit fără să fie expus.'
				}
			]
		},

		pot: {
			label: 'Economie',
			beats: [
				{
					h: 'Fiecare participare hrănește oala.',
					p: 'Taxele de participare ale tuturor celor care trimit un angajament se adună într-o singură oală on-chain pentru jocul ăla.'
				},
				{
					h: 'Comisioanele se iau de sus.',
					p: 'Cel care a creat jocul, judecătorii și platforma își iau comisionul convenit — fixat la vedere când s-a publicat jocul și <strong>aplicat de contractul inteligent</strong>, nu de bunăvoința cuiva.'
				},
				{
					h: 'Restul se duce la câștigător.',
					p: 'Cel mai mare punctaj validat ia oala rămasă — plus <strong>NFT-ul jocului</strong>, o dovadă de victorie permanentă, publică, auditabilă. Fondurile se eliberează după o perioadă de validare care dă judecătorilor timp să verifice că cel care a creat jocul a acționat cinstit.',
					note: 'Nimeni nu aprobă plata. O face contractul.'
				}
			]
		},

		judges: {
			label: 'Încredere și răspundere',
			beats: [
				{
					h: 'Cine îl veghează pe cel care creează jocul?',
					p: 'Judecătorii sunt entități nominalizate de cel care creează jocul, care auditează faza de rezolvare. Verifică că serviciul de joc a generat <strong>dovezi valide și punctaje valide</strong>.'
				},
				{
					h: 'Frauda îl costă pe creator, nu pe tine.',
					p: 'Dacă un judecător prinde un serviciu de joc defect sau o dovadă invalidă, judecătorul ăla <strong>primește comisionul creatorului</strong> ca recompensă. Motivul să se uite atent e construit din start.'
				},
				{
					h: 'Jucătorii stau în afara razei exploziei.',
					p: 'În funcționare normală, judecătorii nu pot penaliza jucătorii. Judecătorii există ca să <strong>protejeze jucătorii de creatori necinstiți</strong>, niciodată invers.',
					note: 'Se auditează casa, nu oaspeții.'
				}
			]
		}
	},

	/* ============================================================== *
	 * Lista de referință de sub scena de validare
	 * ============================================================== */
	steps: {
		title: 'Cei cinci pași, în ordine',
		items: [
			{
				badge: 'TRIMIS',
				title: 'Participarea jucătorului',
				desc: 'Jucătorul publică participarea pe blockchainul Ergo.'
			},
			{
				badge: 'DEZVĂLUIT',
				title: 'Creatorul dezvăluie secretul',
				desc: 'După termen, cel care a creat jocul dezvăluie secretul în tranzacția de rezolvare — deblochează verificarea.'
			},
			{
				badge: 'CALCULAT',
				title: 'Validare prin contract inteligent',
				desc: 'Contractul jocului calculează un angajament pentru fiecare punctaj folosind Solver ID, valoarea punctajului, jurnalele hash-uite și secretul dezvăluit.'
			},
			{
				badge: 'VERIFICAT',
				title: 'Verificarea punctajului',
				desc: 'Când angajamentul de punctaj se potrivește cu cel de participare, punctajul e validat ca autentic și neatins.'
			},
			{
				badge: 'DISTRIBUIT',
				title: 'Câștigătorul ia oala',
				desc: 'Câștigă punctajul cel mai mare. După o perioadă de validare care asigură că creatorul a acționat cinstit, fondurile se eliberează câștigătorului, net de taxele creatorului și ale judecătorilor.'
			}
		]
	},

	/* ============================================================== *
	 * Video
	 * ============================================================== */
	video: {
		label: 'Privire de ansamblu',
		title: 'Uită-te la rezumat',
		subtitle:
			'Pune-te la curent în câteva minute — cum leagă Game of Prompts blockchainul de competițiile de IA.',
		thumbAlt: 'Miniatura video Game of Prompts',
		iframeTitle: 'Game of Prompts — Rezumat scurt'
	},

	/* ============================================================== *
	 * Securitate
	 * ============================================================== */
	security: {
		label: 'Securitate',
		title: 'Competiție transparentă și totodată privată',
		subtitle: 'Criptografia asigură o competiție corectă și protejează strategiile celor care participă.',
		cards: [
			{
				title: 'Protecția codului',
				desc: 'Proprietatea intelectuală a jocului și secretul jocului sunt protejate prin ofuscare, ca să împiedice ingineria inversă.'
			},
			{
				title: 'Rezultate private',
				desc: 'Momeala strategică și angajamentele criptografice îți ascund punctajul real, protejând strategia până la dezvăluirea finală.'
			},
			{
				title: 'Dovadă imuabilă',
				desc: 'Validarea finală pe blockchainul Ergo generează o dovadă de victorie publică, imuabilă și auditabilă.'
			}
		]
	},

	/* ============================================================== *
	 * Tipuri de joc
	 * ============================================================== */
	gameTypes: {
		title: 'Ce poate fi un joc?',
		text: 'Game of Prompts e o platformă versatilă care poate găzdui competiții foarte diferite. Astea sunt doar câteva exemple de ce se poate face.',
		eyebrow: 'Tip de joc {n}',
		items: [
			{
				title: 'Arcade clasic',
				desc: 'Solverul de IA controlează personajul în medii rapide, bazate pe îndemânare. Reflexe, recunoaștere de tipare, sincronizare.',
				score: 'Puncte de joc · Timp de supraviețuire · Niveluri trecute'
			},
			{
				title: 'Lume deschisă',
				desc: 'Optimizează raționamentul spațial, navigarea și adaptarea la mediu.',
				score: 'Eficiența resurselor · Explorarea hărții · Complexitatea misiunilor'
			},
			{
				title: 'Tranzacții financiare',
				desc: 'Bot contra piață. Tranzacționează active virtuale în simulări realiste, cu date istorice sau sintetice. Strategie pură, zero noroc.',
				score: 'Profit net · Raport Sharpe · Drawdown · Referințe'
			},
			{
				title: 'Plierea proteinelor',
				desc: 'Prezice structuri 3D de proteine din secvențe de aminoacizi. O provocare științifică reală — solvere de IA care împing biologia.',
				score: 'Stabilitate structurală · Acuratețea plierii · Eficiență'
			}
		]
	},

	/* ============================================================== *
	 * Funcții opționale
	 * ============================================================== */
	features: {
		title: 'Funcții opționale ale jocului',
		text: 'Cei care creează pot adăuga mecanici opționale puternice — de la bluff-ul de poker la limite de resurse și plată pe încercare.',
		eyebrow: 'Funcție {n}',
		status: {
			available: 'Disponibil',
			research: 'În cercetare'
		},
		items: [
			{
				title: 'Limită de resurse',
				desc: 'Provocare tehnică prin strangularea resurselor de calcul. Eficiența e rege.',
				bullets: [
					'Cel care creează jocul pune limite concrete pe resursele de calcul',
					'Constrângeri: RAM maxim, timp de CPU sau dependențe de servicii',
					'Forțează jucătorii să dezvolte soluții foarte eficiente, optimizate',
					'Adaugă jocului o provocare de inginerie serioasă'
				]
			},
			{
				title: 'Mod poker',
				desc: 'Participare strategică cu risc și recompensă. Bluffează, pariază, înmulțește punctajul.',
				bullets: [
					'Cine participă alege cât plătește (peste un minim fixat)',
					'Plată mai mare = multiplicator mai mare al punctajului final (de ex. ×2, ×5)',
					'Jucătorii pot trimite mai multe punctaje momeală',
					'Strategie de bluff: plătești taxă mare + trimiți punctaje false ca să intimidezi',
					'Cel care creează jocul fixează multiplicatorul după taxa plătită'
				]
			},
			{
				title: 'Plată pe încercare',
				desc: 'Un mecanism care pune un cost pe fiecare execuție locală, încurajând agenți bine făcuți în loc de încercare și eroare.',
				bullets: [
					'Cost incremental în tokeni la fiecare încercare de execuție locală',
					'Încurajează simulare și optimizare locale riguroase',
					'Descurajează strategiile de forță brută oarbe',
					'Scalarea dificultății e configurabilă integral de cel care creează jocul'
				]
			}
		]
	},

	/* ============================================================== *
	 * Întrebări frecvente
	 * ============================================================== */
	faq: {
		label: 'Întrebări frecvente',
		title: 'Întrebări frecvente',
		footerTitle: 'Mai ai întrebări?',
		footerDesc:
			'Copiază promptul de mai jos și lipește-l în orice asistent de IA — include un link către toată documentația.',
		copyPrompt: 'Copiază promptul',
		copied: 'Copiat!',
		orLabel: 'sau deschide direct în:',
		disclaimerBefore: '⚠️ Răspunsurile IA pot să nu fie pe deplin exacte. Consultă întotdeauna ',
		disclaimerLink: 'documentația oficială',
		disclaimerAfter: ' pentru informație cu autoritate.',
		telegram: 'Intră în comunitatea de Telegram',
		groups: [
			{
				title: 'General',
				items: [
					{
						q: 'Ce e Game of Prompts?',
						a: 'O competiție de boți auditată de blockchain. Cei care creează proiectează servicii de joc ca să evalueze solvere de IA, iar jucătorii construiesc servicii solver ca să-și maximizeze punctajul — totul verificat pe blockchainul Ergo.'
					},
					{
						q: 'Ce e «faza de ceremonie»?',
						a: 'Perioada inițială în care jucătorii își înregistrează Solver ID ca să adauge aleatoriu în sămânță. Împiedică creatorul să precalculeze soluții și asigură o competiție corectă.'
					},
					{
						q: 'De ce am nevoie ca să joc?',
						a: 'Un portofel Ergo (cu ceva ERG pentru taxele de participare) și un nod Celaut ca să rulezi local serviciile de joc și de solver.'
					}
				]
			},
			{
				title: 'Securitate',
				items: [
					{
						q: 'Cum știu că jocul e corect?',
						a: 'Regulile jocului și hashS sunt înregistrate on-chain de la început. Sunt imuabile — nimeni nu le poate schimba după publicare.'
					},
					{
						q: 'Poate creatorul să fure fondurile?',
						a: 'Nu. Fondurile sunt blocate într-un contract inteligent, nu în portofelul creatorului. Distribuția o face contractul atomic când jocul se rezolvă.'
					},
					{
						q: 'Dacă dispar creatorul?',
						a: 'După o perioadă de grație, jucătorii pot declanșa o acțiune de rambursare ca să-și recupereze taxele de participare din contractul inteligent.'
					}
				]
			},
			{
				title: 'Judecători',
				items: [
					{
						q: 'Cine sunt judecătorii?',
						a: 'Entități nominalizate de creator care auditează faza de rezolvare. Verifică că serviciul de joc a generat dovezi valide.'
					},
					{
						q: 'De ce câștigă judecătorii bani când invalidează o participare?',
						a: 'Detectează frauda creatorului — stimulentul lor e să prindă servicii de joc defecte. Când găsesc probleme, primesc comisionul creatorului ca recompensă.'
					},
					{
						q: 'Pot fi penalizat ca jucător?',
						a: 'Sistemul îl penalizează pe creator / serviciul de joc, nu pe jucătorii cinstiți. Judecătorii auditează creatorul, nu pe tine.'
					}
				]
			},
			{
				title: 'Economie',
				items: [
					{
						q: 'Cum se calculează câștigătorul?',
						a: 'Cel mai mare scor ponderat în timp: Punctaj × (TimeWeight + Timp rămas). Trimite devreme și punctează sus pentru cel mai bun rezultat.'
					},
					{
						q: 'Când îmi primesc câștigurile?',
						a: 'Imediat la acțiunea de încheiere a jocului. Contractul inteligent distribuie atomic toate fondurile — câștigătorul primește toate taxele de participare minus comisionul creatorului și taxele judecătorilor.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Îndemn + subsol
	 * ============================================================== */
	cta: {
		label: 'Începe',
		title: 'Începe cu Game of Prompts',
		steps: [
			'Instalează programul <strong>nodului Celaut</strong> ca să rulezi servicii de joc și de solver într-un mediu sigur, determinist.',
			'Configurează un <strong>portofel pe blockchainul Ergo</strong> ca să participi la jocuri și să încasezi câștigurile.',
			'Răsfoiește jocurile de pe <strong>GoP Web</strong> și începe să-ți dezvolți propriile solvere sau să creezi jocuri grele pentru alții.'
		],
		github: 'Depozitul GitHub',
		celaut: 'Proiectul Celaut',
		ergo: 'Platforma Ergo'
	},

	footer: {
		tagline: 'Scrie-ți prompturile. Construiește botul. Ia tronul.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
