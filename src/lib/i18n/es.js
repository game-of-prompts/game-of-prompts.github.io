/*
 * src/lib/i18n/es.js
 * ------------------------------------------------------------------
 * Español — traducción de en.js, clave por clave.
 *
 * Misma estructura, mismas longitudes de array. `glossary.terms` tiene
 * exactamente 33 entradas y se empareja por posición con GLOSSARY_IDS
 * en src/lib/glossary/terms.js.
 *
 * `match` no es texto traducido: es la lista de palabras que, cuando
 * aparecen EN ESTA PROSA, se subrayan y abren la definición. Las
 * formas listadas son las que realmente se usan aquí, con sus plurales
 * y concordancias de género.
 */

export default {
	/* ============================================================== *
	 * Controles del grupo de la esquina
	 * ============================================================== */
	common: {
		languageLabel: 'Idioma',
		switchLanguage: 'Cambiar de idioma',
		themeToLight: 'Cambiar al tema claro',
		themeToDark: 'Cambiar al tema oscuro',
		backToTop: 'Volver arriba',
		scoring: 'PUNTUANDO'
	},

	/* ============================================================== *
	 * Glosario
	 * ============================================================== */
	glossary: {
		toggleOn: 'Explicar los términos técnicos',
		toggleOff: 'Ocultar las explicaciones',
		toggleLabel: 'Explicaciones',
		close: 'Cerrar',
		explain: '¿Qué significa «{term}»?',
		hintTitle: 'Algunas palabras están subrayadas.',
		hintBody:
			'Toca cualquier palabra subrayada para leer una explicación en lenguaje llano. Puedes desactivarlas cuando quieras con el botón de la esquina.',
		hintDismiss: 'Entendido',

		terms: [
			{
				match: ['servicio de juego', 'servicios de juego', 'game-service', 'game-services'],
				title: 'Servicio de juego',
				body: 'El propio reto, empaquetado como un programa sellado que cualquiera puede descargar y ejecutar. Contiene las reglas, la puntuación y el secreto oculto de quien lo creó: como un examen precintado que además se corrige solo.',
				more: 'Lo ejecutas en tu propia máquina. Puntúa tu bot y produce el recibo criptográfico que la blockchain comprobará después.'
			},
			{
				match: ['servicio solver', 'servicios solver', 'solver', 'solvers'],
				title: 'Servicio solver',
				body: 'Tu participación. El bot que construyes para jugar, empaquetado del mismo modo sellado para que funcione igual en cualquier máquina: tu estrategia dentro de una única caja portátil.',
				more: 'Se entrega al servicio de juego, que lo ejecuta aislado y puntúa lo que hizo. Nadie ve tu código salvo tú.'
			},
			{
				match: ['GoP Web', 'portal GoP', 'el portal'],
				title: 'GoP Web',
				body: 'La web donde se listan los juegos: leer las reglas, descargar un juego, publicar tu resultado. Es un directorio y una herramienta de firma, no un árbitro: nada de lo que muestra hay que creérselo por fe.',
				more: 'Puedes ejecutar tu propia copia. De eso se trata: si la pública desapareciera, los juegos seguirían.'
			},
			{
				match: ['Celaut', 'nodo Celaut', 'nodos Celaut'],
				title: 'Celaut',
				body: 'El sistema que ejecuta de verdad los programas sellados. Lo instalas una vez y, a partir de ahí, cualquier paquete de juego o de solver puede entregarse a tu máquina y ejecutarse en su propia habitación cerrada.',
				more: 'Es lo que hace que «ejecútalo tú mismo» sea realista y no un eslogan: el mismo paquete se comporta igual en cualquier máquina que lo abra.'
			},
			{
				match: ['nodo', 'nodos'],
				title: 'Nodo',
				body: 'Un ordenador que participa en una red. Tu portátil, un sobremesa que tenías guardado, un servidor en un armario: en cuanto ejecuta el software y empieza a hablar con otras máquinas, es un nodo.',
				more: 'Aquí es sencillamente la máquina que ejecuta los juegos y los solvers. La tuya, no el centro de datos de nadie.'
			},
			{
				match: ['servicio', 'servicios'],
				title: 'Servicio',
				body: 'Una pieza de software autocontenida que hace un solo trabajo y puede entregarse a cualquier máquina para que la ejecute: más parecido a un electrodoméstico que a un programa que instalas.',
				more: 'Las dos mitades de una competición son servicios: el juego y el bot que lo juega.'
			},
			{
				match: ['blockchain', 'blockchains', 'cadena de bloques'],
				title: 'Blockchain',
				body: 'Un libro de registro compartido del que miles de ordenadores guardan copia a la vez. Añadir una entrada exige que los demás acepten que es válida, y las entradas pasadas no se pueden reescribir: nadie controla la historia por su cuenta.',
				more: 'Aquí se usa para dos tareas concretas: dejar constancia de quién reclamó qué puntuación y pagar al ganador. Nada más.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'La blockchain concreta en la que esta plataforma registra resultados y liquida pagos. ERG es su unidad de moneda.',
				more: 'Es una elección, no un cimiento: la plataforma no tiene moneda propia.'
			},
			{
				match: [
					'contrato inteligente',
					'contratos inteligentes',
					'contrato',
					'contratos',
					'contrato del juego'
				],
				title: 'Contrato inteligente',
				body: 'Un programa que vive en la blockchain y custodia dinero bajo reglas escritas de antemano. Cuando se cumplen las condiciones, paga por sí mismo: nadie firma un cheque y nadie puede decidir que no.',
				more: 'Por eso el premio está seguro antes de que nadie haya ganado: los fondos los guardan las reglas, no la persona que las escribió.'
			},
			{
				match: ['on-chain', 'en cadena'],
				title: 'On-chain',
				body: 'Escrito dentro de la propia blockchain, donde todo el mundo puede verlo y nadie puede cambiarlo en silencio más tarde, en vez de estar en la base de datos privada de una empresa.'
			},
			{
				match: [
					'compromiso criptográfico',
					'compromisos criptográficos',
					'compromiso de puntuación',
					'compromiso',
					'compromisos'
				],
				title: 'Compromiso',
				body: 'Un sobre lacrado. Publicas algo que demuestra qué elegiste sin revelar qué era y, más tarde, al abrir el sobre, cualquiera puede comprobar que no cambiaste el contenido.',
				more: 'Es lo que permite fijar una puntuación en público mientras el juego sigue abierto, sin contarles a tus rivales qué tal te fue.'
			},
			{
				match: ['hash', 'hashes', 'registros hasheados', 'hasheados', 'huella criptográfica'],
				title: 'Hash',
				body: 'Una huella corta calculada a partir de un dato. El mismo dato da siempre la misma huella, cambiar un solo byte da una completamente distinta, y no se puede ir hacia atrás desde la huella hasta el dato.',
				more: 'Ese sentido único es todo el truco: permite demostrar que algo coincide sin enseñar qué es.'
			},
			{
				match: ['secreto del juego', 'secreto de 256 bits', 'secreto', 'secretos'],
				title: 'Secreto',
				body: 'Un número aleatorio muy grande que quien crea el juego genera y mantiene oculto mientras el juego está abierto. Cada puntuación se sella con él, así que ninguna puede verificarse —ni falsificarse— hasta que lo publique.',
				more: 'Publicarlo al final es lo que hace que los resultados de todos sean comprobables en el mismo instante, y no de uno en uno.'
			},
			{
				match: ['semilla', 'semillas', 'semilla del juego'],
				title: 'Semilla',
				body: 'El número inicial que decide exactamente a qué versión del reto te enfrentas: qué tablero, qué datos de mercado, qué rompecabezas. Misma semilla, mismo reto, para todo el mundo.',
				more: 'Se revela solo cuando cierran las inscripciones, para que nadie pueda afinar su bot de antemano para esa partida concreta.'
			},
			{
				match: ['fase de ceremonia', 'ceremonia', 'periodo de ceremonia'],
				title: 'Fase de ceremonia',
				body: 'La ventana del inicio de un juego en la que los jugadores se inscriben y cada inscripción remueve un poco de azar dentro de la semilla final. Como si todos echaran un dado en el mismo cubilete antes de destaparlo.',
				more: 'Existe para que quien creó el juego tampoco pueda conocer el reto de antemano: lo deciden entre todos los jugadores sin proponérselo.'
			},
			{
				match: ['Solver ID', 'Solver IDs', 'ID del solver', 'identificador del solver'],
				title: 'Solver ID',
				body: 'La huella única del bot exacto que inscribiste. Nombra una versión concreta de tu código, de modo que no se pueda cambiar un bot por otro en silencio después de revelarse la semilla.'
			},
			{
				match: ['Paper', 'el Paper', 'Paper del juego'],
				title: 'Paper',
				body: 'Las reglas escritas: en qué consiste el reto, cómo se puntúa, qué cuenta como participación válida. Se publica antes de que nadie pueda jugar, para que las condiciones no cambien una vez la gente se ha comprometido.',
				more: 'La idea es que puedas construir tu participación solo con ese documento.'
			},
			{
				match: ['bote', 'el bote', 'pozo'],
				title: 'Bote',
				body: 'Todas las cuotas de entrada, juntadas y custodiadas por el contrato hasta que el juego se resuelve. Quien compite paga; quien gana se lleva lo que queda tras los recortes acordados.'
			},
			{
				match: [
					'cuota de participación',
					'cuotas de participación',
					'cuota de entrada',
					'cuotas de entrada'
				],
				title: 'Cuota de participación',
				body: 'Lo que cuesta enviar un resultado para que cuente. Va al bote, no a los organizadores, así que cada participación agranda el premio.',
				more: 'Solo la pagas si decides que tu partida merecía la pena presentarla: ejecutar el juego en tu máquina es gratis.'
			},
			{
				match: ['comisión', 'comisiones', 'comisión del creador'],
				title: 'Comisión',
				body: 'La parte acordada del bote que va a quien creó el juego, a sus jueces y a la plataforma. Se fija a la vista de todos cuando se publica el juego y se cobra automáticamente, sin negociarla después.'
			},
			{
				match: ['juez', 'jueces'],
				title: 'Juez',
				body: 'Alguien cuyo trabajo es vigilar a quien creó el juego, no a los jugadores: ¿puntuó el juego con honestidad?, ¿son válidos sus recibos? Si pilla una trampa, cobra de la parte del creador.',
				more: 'Que se cobre por detectar fraude, y no por aprobar cosas, es lo que hace que el papel merezca la pena.'
			},
			{
				match: ['NFT', 'NFTs', 'NFT del juego'],
				title: 'NFT',
				body: 'Un token único registrado en la blockchain, que se puede poseer y transferir pero no duplicar. Aquí es el trofeo: prueba pública y permanente de quién ganó un juego concreto.'
			},
			{
				match: ['monedero', 'monederos', 'wallet', 'monedero de Ergo'],
				title: 'Monedero',
				body: 'La aplicación que guarda las llaves de tus fondos y firma tus acciones en la blockchain. No es una cuenta en una empresa: nadie puede congelarlo, y nadie puede recuperarlo por ti.'
			},
			{
				match: ['comisión de gas', 'comisiones de gas', 'gas', 'comisión de red'],
				title: 'Comisión de gas',
				body: 'El pequeño cargo por que la red registre tu transacción. Paga a los ordenadores que hacen el registro, no a la plataforma: se parece más al sello de una carta que al precio de una entrada.'
			},
			{
				match: ['determinista', 'deterministas', 'determinismo', 'reproducible', 'reproducibilidad'],
				title: 'Determinista',
				body: 'La misma entrada da la misma salida, siempre: como una receta que produce un pastel idéntico en cualquier cocina, en vez de depender de quien cocina. Ni la máquina, ni el día, ni el lugar cambian el resultado.',
				more: 'Es lo que hace que otra persona pueda comprobar una puntuación: puede repetir la ejecución y tiene que salirle tu número.'
			},
			{
				match: [
					'entorno seguro y aislado',
					'entorno aislado',
					'aislamiento',
					'aislado',
					'aislada',
					'sellado',
					'sellados',
					'sellada'
				],
				title: 'Aislamiento',
				body: 'Mantener un programa en ejecución dentro de una frontera que no puede cruzar: solo ve lo que se le entregó, y nada de la máquina que lo rodea ni de lo demás que se ejecuta ahí.',
				more: 'Es lo que permite que un juego ejecute el bot de un desconocido sin riesgo, y que tú ejecutes el juego de un desconocido sin riesgo.'
			},
			{
				match: ['ofuscación', 'ofuscado', 'ofuscada', 'ofuscar'],
				title: 'Ofuscación',
				body: 'Enredar un programa a propósito para que siga funcionando perfectamente pero resulte doloroso de leer: el equivalente informático de un documento impreso sin espacios ni saltos de línea.',
				more: 'Aquí sirve para que el secreto oculto de un juego siga oculto, aunque todo el mundo tenga una copia del programa que lo contiene.'
			},
			{
				match: ['peer-to-peer', 'P2P', 'de igual a igual'],
				title: 'Peer-to-peer',
				body: 'Dos ordenadores tratando directamente entre sí, como dos personas en una llamada de teléfono, en lugar de mandarlo todo a través de una empresa intermedia, como funcionan el correo o un marketplace. Cada ordenador es un «par»: iguales, sin nadie al mando.',
				more: 'Importa aquí porque la empresa del medio suele ser la que pone el precio, se lleva su parte y puede echarte.'
			},
			{
				match: ['autoalojamiento', 'autoalojado', 'autoalojada', 'autoalojar'],
				title: 'Autoalojamiento',
				body: 'Ejecutar tu propia copia de un servicio en tu propia máquina en vez de usar la de otro. La cosa sigue funcionando aunque la versión pública se apague, la censuren o simplemente tenga un mal día.'
			},
			{
				match: [
					'puntuación señuelo',
					'puntuaciones señuelo',
					'puntuaciones falsas',
					'señuelo',
					'señuelos'
				],
				title: 'Señuelo',
				body: 'Una participación deliberadamente engañosa: una puntuación que publicas y que no es la real, enviada para que tus rivales se equivoquen al calcular qué tal te fue. Un farol, posible porque nadie puede leer una puntuación sellada.'
			},
			{
				match: [
					'puntuación ponderada por tiempo',
					'puntuación ponderada en el tiempo',
					'ponderada por tiempo',
					'TimeWeight'
				],
				title: 'Puntuación ponderada por tiempo',
				body: 'Una puntuación ajustada según lo pronto que la enviaste. Dos resultados idénticos no empatan: el que entró antes cuenta más, así que sentarse sobre una buena respuesta hasta el último día te sale caro.'
			},
			{
				match: [
					'periodo de gracia',
					'período de gracia',
					'periodo de validación',
					'reembolso',
					'reembolsos'
				],
				title: 'Periodo de gracia',
				body: 'Una ventana de espera incluida en las reglas antes de que se mueva el dinero: tiempo para que los jueces objeten y para que los jugadores recuperen sus cuotas si quien creó el juego nunca lo resuelve.',
				more: 'Es la respuesta a «¿y si el organizador desaparece?»: el contrato deja que todos se marchen con su dinero.'
			},
			{
				match: ['CDE', 'variabilidad de escenarios', 'alta variabilidad de escenarios'],
				title: 'Variabilidad de escenarios (CDE)',
				body: 'Cuánto puede diferenciarse cada partida de un juego de la anterior. Mucha variabilidad significa que el bot tiene que jugar bien de verdad, porque no hay una única respuesta fija que memorizar y dejar escrita a fuego.'
			}
		]
	},

	/* ============================================================== *
	 * Splash
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'ESCRIBE TUS PROMPTS. CONSTRUYE TU BOT. GANA EL TRONO.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Escribe tus prompts. Construye tu bot. Gana el trono.',
		description:
			'Una plataforma competitiva donde quienes crean diseñan servicios de juego para evaluar solvers de IA, mientras los jugadores construyen servicios solver para maximizar su puntuación — con Ergo y Celaut por debajo.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Escribe tus prompts. Construye tu bot. Gana el trono.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Escribe tus prompts. <span class="hero-grad">Construye tu bot.</span> Gana el trono.',
		lede: 'Una plataforma competitiva donde quienes crean diseñan servicios de juego para evaluar solvers de IA, y los jugadores construyen servicios solver para maximizar su puntuación — todo registrado y verificado on-chain.',
		actions: {
			launch: 'Abrir la app',
			github: 'Ver en GitHub',
			how: 'Ver cómo funciona'
		},
		stats: [
			{ value: 'P2P', label: 'Descentralizado: los servicios corren en tu propio nodo Celaut' },
			{ value: 'On-chain', label: 'Resultados comprometidos y verificados en Ergo' },
			{ value: 'Sin confianza', label: 'El bote lo reparten contratos inteligentes, no una empresa' }
		],
		scroll: 'Desplázate'
	},

	/* ============================================================== *
	 * Las siete escenas
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'La idea',
			beats: [
				{
					h: 'Alguien publica un reto.',
					p: 'Quien lo crea diseña un juego con una puntuación medible y lo empaqueta como <strong>servicio de juego</strong>: un servicio Celaut inmutable que guarda la lógica del juego y su secreto.'
				},
				{
					h: 'Los demás construyen un bot para batirlo.',
					p: 'Los jugadores escriben <strong>servicios solver</strong>: su estrategia, empaquetada igual. El servicio de juego ejecuta cada solver en un entorno seguro y aislado, y puntúa lo que hizo.'
				},
				{
					h: 'La puntuación más alta gana el trono.',
					p: 'Ninguna clasificación que haya que creerse. Cada puntuación se compromete criptográficamente y se <strong>liquida en la blockchain de Ergo</strong>, donde cualquiera puede rehacer las cuentas.',
					note: 'Escribe tus prompts. Construye tu bot. Gana el trono.'
				}
			]
		},

		components: {
			label: 'Arquitectura',
			beats: [
				{
					h: 'Servicio de juego',
					p: 'Lo construye quien desarrolla el juego. Un servicio autónomo que encapsula la lógica y el secreto. Evalúa el rendimiento del solver, genera puntuaciones y crea los <strong>compromisos criptográficos</strong> que la blockchain necesita para validar.'
				},
				{
					h: 'Servicio solver',
					p: 'Lo construyen los jugadores. Implementa estrategias para maximizar la puntuación en un juego concreto. El solver se empaqueta y se envía al servicio de juego, que lo <strong>ejecuta en un entorno seguro y aislado</strong> para evaluarlo.'
				},
				{
					h: 'GoP Web',
					p: 'El portal de la comunidad. Descubre juegos, lee las reglas, descarga servicios de juego y publica tus resultados en la blockchain de Ergo. <strong>Admite el autoalojamiento</strong> para una experiencia peer-to-peer sin depender de nadie.'
				},
				{
					h: 'Todo corre en tu máquina.',
					p: 'Los servicios de juego y de solver corren en un <strong>nodo Celaut local</strong>, que puede funcionar completamente sin conexión. GoP Web se puede usar desde su instancia en GitHub.io o ejecutarse en local como servicio Celaut.',
					note: 'Dos tecnologías: Celaut para computar, Ergo para liquidar.'
				}
			]
		},

		creator: {
			label: 'Flujo de quien crea el juego',
			beats: [
				{
					h: 'Diseña un juego.',
					p: 'Crea un reto con puntuación medible y alta variabilidad de escenarios (CDE), para que las soluciones escritas a fuego no funcionen.'
				},
				{
					h: 'Escribe el Paper.',
					p: 'Publica un documento con todas las instrucciones, reglas y criterios de evaluación. Los jugadores tienen que poder entender el reto <strong>antes</strong> de participar.'
				},
				{
					h: 'Genera un secreto.',
					p: 'Un <strong>secreto de 256 bits</strong> único respalda los compromisos criptográficos y la posterior validación de puntuaciones. Nadie puede verlo mientras el juego está abierto.'
				},
				{
					h: 'Empaqueta y publica.',
					p: 'Publica el juego como servicio Celaut a través de GoP Web con sus parámetros: cuota, fecha límite y comisión.'
				},
				{
					h: 'Revela el secreto.',
					p: 'Cuando pasa la fecha límite, quien creó el juego <strong>revela el secreto on-chain</strong>. Eso resuelve el juego: la validación de puntuaciones se vuelve posible y el contrato inteligente puede determinar al ganador.',
					note: 'Comprometerse primero, revelar después. Eso es lo que lo hace justo.'
				}
			]
		},

		player: {
			label: 'El recorrido del jugador',
			beats: [
				{
					h: 'Explora y lee el Paper.',
					p: 'Encuentra un juego en GoP Web. Lee el Paper para entender el reto, las reglas y los criterios de evaluación antes de comprometerte con nada.'
				},
				{
					h: 'Implementa tu solver.',
					p: 'Construye tu servicio solver solo a partir del Paper, para que esté listo en cuanto caiga la semilla.'
				},
				{
					h: 'Registra tu Solver ID.',
					p: 'Registrarse es gratis: solo cubres la comisión de gas de la red. Este <strong>compromiso previo</strong> es lo que garantiza que sea justo antes de revelarse la semilla.'
				},
				{
					h: 'Se revela la semilla.',
					p: 'Cuando termina la fase de ceremonia, la semilla del juego se hace pública. Ahora —y solo ahora— conoces los parámetros exactos del reto con el que te van a evaluar.'
				},
				{
					h: 'Ejecuta el servicio de juego en local.',
					p: 'El servicio ejecuta tu solver en un entorno seguro con la semilla revelada, evalúa su rendimiento y genera el <strong>compromiso criptográfico</strong> que hace falta para la validación on-chain.'
				},
				{
					h: 'Envía tu compromiso y paga la cuota.',
					p: 'Si la puntuación merece la pena, publica el compromiso on-chain y paga la cuota de participación. <strong>Todas las cuotas van al bote</strong>: quien gana se lleva el premio económico, menos la comisión de creador, jueces y plataforma, y recibe el NFT del juego.',
					note: 'Tú decides si tu partida merece enviarse.'
				}
			]
		},

		validation: {
			label: 'Validación de puntuaciones',
			beats: [
				{
					h: 'Tu puntuación es un hash, no una afirmación.',
					p: 'Cuando participas, lo que va on-chain es un <strong>compromiso</strong>. Nadie, ni siquiera quien creó el juego, puede leer tu puntuación en la blockchain mientras el juego sigue abierto.'
				},
				{
					h: 'Después sale el secreto.',
					p: 'Pasada la fecha límite, quien creó el juego revela el secreto en la transacción de resolución. Ese es el ingrediente que faltaba, y <strong>abre la verificación para todos a la vez</strong>.'
				},
				{
					h: 'El contrato lo recalcula.',
					p: 'El contrato del juego construye un compromiso para cada puntuación a partir del <strong>Solver ID, el valor de la puntuación, los registros hasheados y el secreto revelado</strong>. No interviene ninguna parte de confianza: es aritmética.'
				},
				{
					h: 'Si coinciden, la puntuación es real.',
					p: 'Un compromiso recalculado que coincide con el publicado demuestra que la puntuación es auténtica e inalterable. Lo que no coincide sencillamente no es una puntuación.',
					note: 'Transparente y privado a la vez: demostrado sin quedar expuesto.'
				}
			]
		},

		pot: {
			label: 'Economía',
			beats: [
				{
					h: 'Cada participación alimenta el bote.',
					p: 'Las cuotas de participación de todo el que envía un compromiso se acumulan en un único bote on-chain para ese juego.'
				},
				{
					h: 'Las comisiones salen de arriba.',
					p: 'Quien creó el juego, los jueces y la plataforma se llevan la comisión acordada, fijada a la vista de todos cuando se publicó el juego y <strong>aplicada por el contrato inteligente</strong> y no por la buena voluntad de nadie.'
				},
				{
					h: 'El resto va para quien gana.',
					p: 'La puntuación validada más alta se lleva el bote restante, más el <strong>NFT del juego</strong>: una prueba de victoria permanente, pública y auditable. Los fondos se liberan tras un periodo de validación que da tiempo a los jueces a comprobar que quien creó el juego actuó honestamente.',
					note: 'Nadie aprueba el pago. Lo hace el contrato.'
				}
			]
		},

		judges: {
			label: 'Confianza y rendición de cuentas',
			beats: [
				{
					h: '¿Quién vigila a quien crea el juego?',
					p: 'Los jueces son entidades nombradas por quien crea el juego que auditan la fase de resolución. Verifican que su servicio de juego generó <strong>pruebas válidas y puntuaciones válidas</strong>.'
				},
				{
					h: 'El fraude le cuesta al creador, no a ti.',
					p: 'Si un juez detecta un servicio de juego defectuoso o una prueba inválida, ese juez <strong>recibe la comisión del creador</strong> como recompensa. El incentivo para mirar de cerca está incorporado.'
				},
				{
					h: 'Los jugadores quedan fuera del radio de la explosión.',
					p: 'En funcionamiento normal, los jueces no pueden penalizar a los jugadores. Los jueces existen para <strong>proteger a los jugadores de creadores deshonestos</strong>, nunca al revés.',
					note: 'Se audita la casa, no a los invitados.'
				}
			]
		}
	},

	/* ============================================================== *
	 * Lista de referencia bajo la escena de validación
	 * ============================================================== */
	steps: {
		title: 'Los cinco pasos, en orden',
		items: [
			{
				badge: 'ENVIADO',
				title: 'Participación del jugador',
				desc: 'El jugador publica su participación en la blockchain de Ergo.'
			},
			{
				badge: 'REVELADO',
				title: 'El creador revela el secreto',
				desc: 'Pasada la fecha límite, quien creó el juego revela el secreto en la transacción de resolución, lo que abre la verificación.'
			},
			{
				badge: 'CALCULADO',
				title: 'Validación por contrato inteligente',
				desc: 'El contrato del juego calcula un compromiso para cada puntuación usando el Solver ID, el valor de la puntuación, los registros hasheados y el secreto revelado.'
			},
			{
				badge: 'VERIFICADO',
				title: 'Verificación de la puntuación',
				desc: 'Cuando el compromiso de la puntuación coincide con el de la participación, esa puntuación queda validada como auténtica e inalterable.'
			},
			{
				badge: 'REPARTIDO',
				title: 'Quien gana se lleva el bote',
				desc: 'Gana la puntuación más alta. Tras un periodo de validación que asegura que el creador actuó honestamente, los fondos se liberan al ganador, descontadas las comisiones de creador y jueces.'
			}
		]
	},

	/* ============================================================== *
	 * Vídeo
	 * ============================================================== */
	video: {
		label: 'Visión general',
		title: 'Mira el resumen',
		subtitle:
			'Ponte al día en minutos: cómo Game of Prompts junta blockchain y competiciones de IA.',
		thumbAlt: 'Miniatura del vídeo de Game of Prompts',
		iframeTitle: 'Game of Prompts — Resumen breve'
	},

	/* ============================================================== *
	 * Seguridad
	 * ============================================================== */
	security: {
		label: 'Seguridad',
		title: 'Competición transparente y privada a la vez',
		subtitle: 'La criptografía garantiza una competición justa y protege las estrategias de quienes participan.',
		cards: [
			{
				title: 'Protección del código',
				desc: 'La propiedad intelectual del juego y su secreto se protegen mediante ofuscación para impedir la ingeniería inversa.'
			},
			{
				title: 'Resultados privados',
				desc: 'Los señuelos estratégicos y los compromisos criptográficos ocultan tu puntuación real y protegen tu estrategia hasta la revelación final.'
			},
			{
				title: 'Prueba inmutable',
				desc: 'La validación final en la blockchain de Ergo genera una prueba de victoria pública, inmutable y auditable.'
			}
		]
	},

	/* ============================================================== *
	 * Tipos de juego
	 * ============================================================== */
	gameTypes: {
		title: '¿Qué puede ser un juego?',
		text: 'Game of Prompts es una plataforma versátil capaz de albergar competiciones muy distintas. Estos son solo algunos ejemplos de lo que se puede hacer.',
		eyebrow: 'Tipo de juego {n}',
		items: [
			{
				title: 'Arcade clásico',
				desc: 'El solver de IA controla al personaje en entornos rápidos y de habilidad. Reflejos, reconocimiento de patrones, sincronización.',
				score: 'Puntos · Tiempo de supervivencia · Niveles superados'
			},
			{
				title: 'Mundo abierto',
				desc: 'Optimiza el razonamiento espacial, la navegación y la adaptación al entorno.',
				score: 'Eficiencia de recursos · Exploración del mapa · Complejidad de las misiones'
			},
			{
				title: 'Trading financiero',
				desc: 'Bot contra mercado. Opera activos virtuales en simulaciones realistas con datos históricos o sintéticos. Estrategia pura, cero suerte.',
				score: 'Beneficio neto · Ratio de Sharpe · Drawdown · Referencias'
			},
			{
				title: 'Plegamiento de proteínas',
				desc: 'Predice estructuras 3D de proteínas a partir de secuencias de aminoácidos. Un reto científico real: solvers de IA que hacen avanzar la biología.',
				score: 'Estabilidad estructural · Precisión del plegado · Eficiencia'
			}
		]
	},

	/* ============================================================== *
	 * Funciones opcionales
	 * ============================================================== */
	features: {
		title: 'Funciones opcionales del juego',
		text: 'Quien crea un juego puede añadirle mecánicas opcionales potentes: desde faroles de póker hasta límites de recursos y modelos de pago por intento.',
		eyebrow: 'Función {n}',
		status: {
			available: 'Disponible',
			research: 'En investigación'
		},
		items: [
			{
				title: 'Límite de recursos',
				desc: 'Reto técnico por la vía de restringir los recursos de cómputo. Manda la eficiencia.',
				bullets: [
					'Quien crea el juego fija límites concretos de recursos de cómputo',
					'Restricciones: RAM máxima, tiempo de CPU o dependencias de servicios',
					'Obliga a los jugadores a desarrollar soluciones muy eficientes y optimizadas',
					'Añade al juego un reto de ingeniería considerable'
				]
			},
			{
				title: 'Modo póker',
				desc: 'Participación estratégica con riesgo y recompensa. Farolea, apuesta y multiplica tu puntuación.',
				bullets: [
					'Quien participa elige cuánto paga (por encima de un mínimo fijado)',
					'Pagar más = mayor multiplicador de la puntuación final (p. ej. ×2, ×5)',
					'Los jugadores pueden enviar varias puntuaciones señuelo',
					'Estrategia de farol: pagar una cuota alta y enviar puntuaciones falsas para intimidar',
					'Quien crea el juego fija el multiplicador según la cuota pagada'
				]
			},
			{
				title: 'Pago por intento',
				desc: 'Un mecanismo que asigna un coste a cada ejecución local y fomenta agentes bien construidos frente al ensayo y error.',
				bullets: [
					'Coste incremental en tokens por cada intento de ejecución local',
					'Fomenta una simulación y optimización locales rigurosas',
					'Desincentiva las estrategias de fuerza bruta a ciegas',
					'Escalado de dificultad totalmente configurable por quien crea el juego'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 * ============================================================== */
	faq: {
		label: 'Preguntas frecuentes',
		title: 'Preguntas frecuentes',
		footerTitle: '¿Te quedan dudas?',
		footerDesc:
			'Copia el prompt de abajo y pégalo en cualquier asistente de IA: incluye un enlace a toda nuestra documentación.',
		copyPrompt: 'Copiar prompt',
		copied: '¡Copiado!',
		orLabel: 'o ábrelo directamente en:',
		disclaimerBefore: '⚠️ Las respuestas de IA pueden no ser del todo exactas. Consulta siempre la ',
		disclaimerLink: 'documentación oficial',
		disclaimerAfter: ' para obtener información fiable.',
		telegram: 'Únete a la comunidad de Telegram',
		groups: [
			{
				title: 'General',
				items: [
					{
						q: '¿Qué es Game of Prompts?',
						a: 'Una competición de bots auditada por blockchain. Quienes crean diseñan servicios de juego para evaluar solvers de IA, mientras los jugadores construyen servicios solver para maximizar su puntuación, todo verificado en la blockchain de Ergo.'
					},
					{
						q: '¿Qué es la «fase de ceremonia»?',
						a: 'El periodo inicial en el que los jugadores registran sus Solver ID para añadir azar a la semilla. Impide que el creador precalcule soluciones y garantiza una competición justa.'
					},
					{
						q: '¿Qué necesito para jugar?',
						a: 'Un monedero de Ergo (con algo de ERG para las cuotas de participación) y un nodo Celaut para ejecutar en local los servicios de juego y de solver.'
					}
				]
			},
			{
				title: 'Seguridad',
				items: [
					{
						q: '¿Cómo sé que el juego es justo?',
						a: 'Las reglas del juego y el hashS quedan registrados on-chain desde el principio. Son inmutables: nadie puede cambiarlos tras la publicación.'
					},
					{
						q: '¿Puede el creador robar los fondos?',
						a: 'No. Los fondos quedan bloqueados en un contrato inteligente, no en el monedero del creador. El reparto lo hace el contrato de forma atómica cuando el juego se resuelve.'
					},
					{
						q: '¿Y si el creador desaparece?',
						a: 'Pasado un periodo de gracia, los jugadores pueden lanzar una acción de reembolso para recuperar del contrato inteligente sus cuotas de participación.'
					}
				]
			},
			{
				title: 'Jueces',
				items: [
					{
						q: '¿Quiénes son los jueces?',
						a: 'Entidades nombradas por el creador que auditan la fase de resolución. Verifican que el servicio de juego generó pruebas válidas.'
					},
					{
						q: '¿Por qué cobran los jueces al invalidar una participación?',
						a: 'Porque detectan fraude del creador: su incentivo es pillar servicios de juego defectuosos. Cuando encuentran problemas, reciben la comisión del creador como recompensa.'
					},
					{
						q: '¿Pueden penalizarme como jugador?',
						a: 'El sistema penaliza al creador y a su servicio de juego, no a los jugadores honestos. Los jueces auditan al creador, no a ti.'
					}
				]
			},
			{
				title: 'Economía',
				items: [
					{
						q: '¿Cómo se calcula el ganador?',
						a: 'Por la puntuación ponderada por tiempo más alta: puntuación × (TimeWeight + tiempo restante). Envía pronto y puntúa alto para el mejor resultado.'
					},
					{
						q: '¿Cuándo recibo mis ganancias?',
						a: 'En cuanto se ejecuta la acción de fin de juego. El contrato inteligente reparte todos los fondos de forma atómica: quien gana recibe todas las cuotas de participación menos la comisión del creador y la de los jueces.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Llamada a la acción + pie
	 * ============================================================== */
	cta: {
		label: 'Empezar',
		title: 'Empieza con Game of Prompts',
		steps: [
			'Instala el software del <strong>nodo Celaut</strong> para ejecutar servicios de juego y de solver en un entorno seguro y determinista.',
			'Configura un <strong>monedero de la blockchain Ergo</strong> para participar en juegos y cobrar tus ganancias.',
			'Explora los juegos disponibles en <strong>GoP Web</strong> y empieza a desarrollar tus propios solvers o a crear juegos difíciles para los demás.'
		],
		github: 'Repositorio de GitHub',
		celaut: 'Proyecto Celaut',
		ergo: 'Plataforma Ergo'
	},

	footer: {
		tagline: 'Escribe tus prompts. Construye tu bot. Gana el trono.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
