/*
 * src/lib/i18n/pt.js
 * ------------------------------------------------------------------
 * Português — tradução de en.js, chave por chave.
 *
 * Mesma estrutura, mesmos comprimentos de array. `glossary.terms` tem
 * exatamente 33 entradas e emparelha por posição com GLOSSARY_IDS em
 * src/lib/glossary/terms.js.
 *
 * `match` não é texto traduzido: é a lista de palavras que, quando
 * aparecem NESTA PROSA, ficam sublinhadas e abrem a definição. As
 * formas listadas são as que realmente se usam aqui, com plurais e
 * concordancias de género.
 */

export default {
	/* ============================================================== *
	 * Controlos do grupo do canto
	 * ============================================================== */
	common: {
		languageLabel: 'Idioma',
		switchLanguage: 'Mudar de idioma',
		themeToLight: 'Mudar para o tema claro',
		themeToDark: 'Mudar para o tema escuro',
		backToTop: 'Voltar ao topo',
		scoring: 'A PONTUAR'
	},

	/* ============================================================== *
	 * Glossário
	 * ============================================================== */
	glossary: {
		toggleOn: 'Explicar os termos técnicos',
		toggleOff: 'Ocultar as explicações',
		toggleLabel: 'Explicações',
		close: 'Fechar',
		explain: 'O que significa «{term}»?',
		hintTitle: 'Algumas palavras estão sublinhadas.',
		hintBody:
			'Toca em qualquer palavra sublinhada para ler uma explicação em linguagem simples. Podes desligá-las quando quiseres com o botão do canto.',
		hintDismiss: 'Percebi',

		terms: [
			{
				match: ['serviço de jogo', 'serviços de jogo', 'game-service', 'game-services'],
				title: 'Serviço de jogo',
				body: 'O próprio desafio, empacotado como um programa selado que qualquer pessoa pode descarregar e executar. Contém as regras, a pontuação e o segredo oculto de quem o criou: como um exame lacrado que ainda por cima se corrige sozinho.',
				more: 'Executas-no na tua própria máquina. Pontua o teu bot e produz o recibo criptográfico que a blockchain verifica depois.'
			},
			{
				match: ['serviço solver', 'serviços solver', 'solver', 'solvers'],
				title: 'Serviço solver',
				body: 'A tua participação. O bot que constróis para jogar, empacotado do mesmo modo selado para funcionar igual em qualquer máquina: a tua estratégia dentro de uma única caixa portátil.',
				more: 'Entrega-se ao serviço de jogo, que o executa isolado e pontua o que fez. Ninguém vê o teu código a não ser tu.'
			},
			{
				match: ['GoP Web', 'portal GoP', 'o portal'],
				title: 'GoP Web',
				body: 'O site onde se listam os jogos: ler as regras, descarregar um jogo, publicar o teu resultado. É um diretório e uma ferramenta de assinatura, não um árbitro: nada do que mostra tem de se aceitar por fé.',
				more: 'Podes executar a tua própria cópia. É esse o ponto: se a pública desaparecesse, os jogos continuariam.'
			},
			{
				match: ['Celaut', 'nodo Celaut', 'nodos Celaut'],
				title: 'Celaut',
				body: 'O sistema que de facto executa os programas selados. Instalas-no uma vez e, a partir daí, qualquer pacote de jogo ou de solver pode ser entregue à tua máquina e executado no seu próprio quarto fechado.',
				more: 'É o que torna «executa tu mesmo» realista e não um slogan: o mesmo pacote comporta-se igual em qualquer máquina que o abra.'
			},
			{
				match: ['nodo', 'nodos'],
				title: 'Nodo',
				body: 'Um computador que participa numa rede. O teu portátil, um secretária que tinhas guardado, um servidor num armário: assim que executa o software e começa a falar com outras máquinas, é um nodo.',
				more: 'Aqui é simplesmente a máquina que executa os jogos e os solvers. A tua, não o centro de dados de ninguém.'
			},
			{
				match: ['serviço', 'serviços'],
				title: 'Serviço',
				body: 'Uma peça de software autónomo que faz um só trabalho e pode ser entregue a qualquer máquina para a executar: mais parecido com um eletrodoméstico do que com um programa que instala.',
				more: 'As duas metades de uma competição são serviços: o jogo e o bot que o joga.'
			},
			{
				match: ['blockchain', 'blockchains', 'cadeia de blocos'],
				title: 'Blockchain',
				body: 'Um livro de registo partilhado do qual milhares de computadores guardam cópia ao mesmo tempo. Acrescentar uma entrada exige que os outros aceitem que é válida, e as entradas passadas não se podem reescrever: ninguém controla a história sozinho.',
				more: 'Aqui usa-se para duas tarefas concretas: deixar constância de quem reclamou que pontuação e pagar ao vencedor. Nada mais.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'A blockchain concreta em que esta plataforma regista resultados e liquida pagamentos. ERG é a sua unidade de moeda.',
				more: 'É uma escolha, não um alicerce: a plataforma não tem moeda própria.'
			},
			{
				match: [
					'contrato inteligente',
					'contratos inteligentes',
					'contrato',
					'contratos',
					'contrato do jogo'
				],
				title: 'Contrato inteligente',
				body: 'Um programa que vive na blockchain e guarda dinheiro sob regras escritas de antemão. Quando as condições se cumprem, paga por si: ninguém assina um cheque e ninguém pode decidir que não.',
				more: 'Por isso o prémio está seguro antes de alguém ter ganhado: os fundos guardam-nos as regras, não a pessoa que as escreveu.'
			},
			{
				match: ['on-chain', 'em cadeia'],
				title: 'On-chain',
				body: 'Escrito dentro da própria blockchain, onde toda a gente o pode ver e ninguém o pode mudar em silêncio mais tarde, em vez de estar na base de dados privada de uma empresa.'
			},
			{
				match: [
					'compromisso criptográfico',
					'compromissos criptográficos',
					'compromisso de pontuação',
					'compromisso',
					'compromissos',
					'pré-compromisso'
				],
				title: 'Compromisso',
				body: 'Um envelope lacrado. Publicas algo que prova o que escolheste sem revelar o que era e, mais tarde, ao abrir o envelope, qualquer pessoa pode verificar que não trocaste o conteúdo.',
				more: 'É o que permite fixar uma pontuação em público enquanto o jogo continua aberto, sem contar aos rivais como te correu.'
			},
			{
				match: ['hash', 'hashes', 'registos hasheados', 'hasheados', 'impressão criptográfica'],
				title: 'Hash',
				body: 'Uma impressão curta calculada a partir de um dado. O mesmo dado dá sempre a mesma impressão, mudar um único byte dá uma completamente diferente, e não se consegue ir para trás da impressão até ao dado.',
				more: 'Esse sentido único é todo o truque: permite provar que algo coincide sem mostrar o que é.'
			},
			{
				match: ['segredo do jogo', 'segredo de 256 bits', 'segredo', 'segredos'],
				title: 'Segredo',
				body: 'Um número aleatório muito grande que quem cria o jogo gera e mantém oculto enquanto o jogo está aberto. Cada pontuação se lacreia com ele, portanto nenhuma pode verificar-se — nem falsificar-se — até que o publique.',
				more: 'Publicá-lo no fim é o que torna os resultados de todos verificáveis no mesmo instante, e não um a um.'
			},
			{
				match: ['semente', 'sementes', 'semente do jogo'],
				title: 'Semente',
				body: 'O número inicial que decide exatamente que versão do desafio enfrentas: que tabuleiro, que dados de mercado, que puzzle. Mesma semente, mesmo desafio, para toda a gente.',
				more: 'Revela-se só quando fecham as inscrições, para que ninguém possa afinar o bot de antemão para essa partida concreta.'
			},
			{
				match: ['fase de cerimónia', 'cerimónia', 'período de cerimónia'],
				title: 'Fase de cerimónia',
				body: 'A janela do início de um jogo em que os jogadores se inscrevem e cada inscrição mistura um pouco de acaso na semente final. Como se todos atirassem um dado para o mesmo copo antes de destapá-lo.',
				more: 'Existe para que quem criou o jogo também não possa conhecer o desafio de antemão: decidem-no entre todos os jogadores sem o pretender.'
			},
			{
				match: ['Solver ID', 'Solver IDs', 'ID do solver', 'identificador do solver'],
				title: 'Solver ID',
				body: 'A impressão única do bot exato que inscreveste. Nomeia uma versão concreta do teu código, de modo que não se possa trocar um bot por outro em silêncio depois de se revelar a semente.'
			},
			{
				match: ['Paper', 'o Paper', 'Paper do jogo'],
				title: 'Paper',
				body: 'As regras escritas: em que consiste o desafio, como se pontua, o que conta como participação válida. Publica-se antes de alguém poder jogar, para que as condições não mudem depois de as pessoas se terem comprometido.',
				more: 'A ideia é que possas construir a tua participação só com esse documento.'
			},
			{
				match: ['pote', 'o pote', 'poço de prémios'],
				title: 'Pote',
				body: 'Todas as taxas de inscrição, juntadas e guardadas pelo contrato até o jogo se resolver. Quem compete paga; quem ganha leva o que resta depois dos cortes combinados.'
			},
			{
				match: [
					'taxa de participação',
					'taxas de participação',
					'taxa de inscrição',
					'taxas de inscrição'
				],
				title: 'Taxa de participação',
				body: 'O que custa enviar um resultado para que conte. Vai para o pote, não para os organizadores, portanto cada participação aumenta o prémio.',
				more: 'Só a pagas se decidires que a tua partida merecia ser apresentada: executar o jogo na tua máquina é grátis.'
			},
			{
				match: ['comissão', 'comissões', 'comissão do criador'],
				title: 'Comissão',
				body: 'A parte combinada do pote que vai para quem criou o jogo, para os seus juízes e para a plataforma. Fixa-se à vista de todos quando se publica o jogo e cobra-se automaticamente, sem negociá-la depois.'
			},
			{
				match: ['juiz', 'juízes'],
				title: 'Juiz',
				body: 'Alguém cujo trabalho é vigiar quem criou o jogo, não os jogadores: o jogo pontuou com honestidade? São válidos os seus recibos? Se apanha uma batota, cobra da parte do criador.',
				more: 'Cobrar por detetar fraude, e não por aprovar coisas, é o que faz o papel valer a pena.'
			},
			{
				match: ['NFT', 'NFTs', 'NFT do jogo'],
				title: 'NFT',
				body: 'Um token único registado na blockchain, que se pode possuir e transferir mas não duplicar. Aqui é o troféu: prova pública e permanente de quem ganhou um jogo concreto.'
			},
			{
				match: ['carteira', 'carteiras', 'wallet', 'carteira de Ergo'],
				title: 'Carteira',
				body: 'A aplicação que guarda as chaves dos teus fundos e assina as tuas ações na blockchain. Não é uma conta numa empresa: ninguém a pode congelar, e ninguém a pode recuperar por ti.'
			},
			{
				match: ['taxa de gás', 'taxas de gás', 'gás', 'taxa de rede'],
				title: 'Taxa de gás',
				body: 'A pequena cobrança para que a rede registe a tua transação. Paga aos computadores que fazem o registo, não à plataforma: parece-se mais com o selo de uma carta do que com o preço de um bilhete.'
			},
			{
				match: ['determinista', 'deterministas', 'determinismo', 'reproduzível', 'reproduzibilidade'],
				title: 'Determinista',
				body: 'A mesma entrada dá a mesma saída, sempre: como uma receita que produz um bolo idêntico em qualquer cozinha, em vez de depender de quem cozinha. Nem a máquina, nem o dia, nem o lugar mudam o resultado.',
				more: 'É o que faz outra pessoa poder verificar uma pontuação: pode repetir a execução e tem de lhe sair o teu número.'
			},
			{
				match: [
					'ambiente seguro e isolado',
					'ambiente isolado',
					'isolamento',
					'isolado',
					'isolada',
					'selado',
					'selados',
					'selada'
				],
				title: 'Isolamento',
				body: 'Manter um programa em execução dentro de uma fronteira que não pode atravessar: só vê o que lhe foi entregue, e nada da máquina à volta nem do resto que corre ali.',
				more: 'É o que permite que um jogo execute o bot de um desconhecido sem risco, e que tu executes o jogo de um desconhecido sem risco.'
			},
			{
				match: ['ofuscação', 'ofuscado', 'ofuscada', 'ofuscar'],
				title: 'Ofuscação',
				body: 'Embaralhar um programa de propósito para que continue a funcionar perfeitamente mas doa lê-lo: o equivalente informático de um documento impresso sem espaços nem quebras de linha.',
				more: 'Aqui serve para que o segredo oculto de um jogo continue oculto, embora toda a gente tenha uma cópia do programa que o contém.'
			},
			{
				match: ['peer-to-peer', 'P2P', 'de igual para igual'],
				title: 'Peer-to-peer',
				body: 'Dois computadores a tratar diretamente um com o outro, como duas pessoas numa chamada de telefone, em vez de mandar tudo através de uma empresa no meio, como funcionam o correio ou um marketplace. Cada computador é um «par»: iguais, sem ninguém no comando.',
				more: 'Importa aqui porque a empresa do meio costuma ser quem põe o preço, leva a sua parte e te pode expulsar.'
			},
			{
				match: ['autoalojamento', 'autoalojado', 'autoalojada', 'autoalojar'],
				title: 'Autoalojamento',
				body: 'Executar a tua própria cópia de um serviço na tua própria máquina em vez de usar a de outro. A coisa continua a funcionar mesmo que a versão pública se desligue, a censurem ou simplesmente tenha um mau dia.'
			},
			{
				match: [
					'pontuação isca',
					'pontuações isca',
					'pontuações falsas',
					'isca',
					'iscas'
				],
				title: 'Isca',
				body: 'Uma participação deliberadamente enganosa: uma pontuação que publicas e que não é a real, enviada para que os rivais se enganem ao calcular como te correu. Um blefe, possível porque ninguém consegue ler uma pontuação selada.'
			},
			{
				match: [
					'pontuação ponderada pelo tempo',
					'pontuação ponderada no tempo',
					'ponderada pelo tempo',
					'TimeWeight'
				],
				title: 'Pontuação ponderada pelo tempo',
				body: 'Uma pontuação ajustada segundo o quão cedo a enviaste. Dois resultados idênticos não empatam: o que entrou primeiro conta mais, portanto sentar-se sobre uma boa resposta até ao último dia sai caro.'
			},
			{
				match: [
					'período de graça',
					'periodo de graça',
					'período de validação',
					'reembolso',
					'reembolsos'
				],
				title: 'Período de graça',
				body: 'Uma janela de espera incluída nas regras antes de o dinheiro se mover: tempo para os juízes objetarem e para os jogadores recuperarem as taxas se quem criou o jogo nunca o resolver.',
				more: 'É a resposta a «e se o organizador desaparece?»: o contrato deixa que todos saiam com o seu dinheiro.'
			},
			{
				match: ['CDE', 'variabilidade de cenários', 'alta variabilidade de cenários'],
				title: 'Variabilidade de cenários (CDE)',
				body: 'Quanto cada partida de um jogo se pode diferenciar da anterior. Muita variabilidade significa que o bot tem de jogar mesmo bem, porque não há uma única resposta fixa para memorizar e deixar escrita a ferro.'
			}
		]
	},

	/* ============================================================== *
	 * Splash
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'ESCREVE OS TEUS PROMPTS. CONSTRÓI O TEU BOT. GANHA O TRONO.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Escreve os teus prompts. Constrói o teu bot. Ganha o trono.',
		description:
			'Uma plataforma competitiva em que quem cria desenha serviços de jogo para avaliar solvers de IA, enquanto os jogadores constroem serviços solver para maximizar a pontuação — com Ergo e Celaut por baixo.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Escreve os teus prompts. Constrói o teu bot. Ganha o trono.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Escreve os teus prompts. <span class="hero-grad">Constrói o teu bot.</span> Ganha o trono.',
		lede: 'Uma plataforma competitiva em que quem cria desenha serviços de jogo para avaliar solvers de IA, e os jogadores constroem serviços solver para maximizar a pontuação — tudo registado e verificado on-chain.',
		actions: {
			launch: 'Abrir a app',
			github: 'Ver no GitHub',
			how: 'Ver como funciona'
		},
		stats: [
			{ value: 'P2P', label: 'Descentralizado: os serviços correm no teu próprio nodo Celaut' },
			{ value: 'On-chain', label: 'Resultados comprometidos e verificados na Ergo' },
			{ value: 'Sem confiança', label: 'O pote repartem-no contratos inteligentes, não uma empresa' }
		],
		scroll: 'Desliza'
	},

	/* ============================================================== *
	 * As sete cenas
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'A ideia',
			beats: [
				{
					h: 'Alguém publica um desafio.',
					p: 'Quem o cria desenha um jogo com uma pontuação mensurável e empacota-o como <strong>serviço de jogo</strong>: um serviço Celaut imutável que guarda a lógica do jogo e o seu segredo.'
				},
				{
					h: 'Os outros constroem um bot para o vencer.',
					p: 'Os jogadores escrevem <strong>serviços solver</strong>: a sua estratégia, empacotada igual. O serviço de jogo executa cada solver num ambiente seguro e isolado, e pontua o que fez.'
				},
				{
					h: 'A pontuação mais alta ganha o trono.',
					p: 'Nenhuma classificação em que seja preciso acreditar. Cada pontuação se compromete criptograficamente e se <strong>liquida na blockchain da Ergo</strong>, onde qualquer pessoa pode refazer as contas.',
					note: 'Escreve os teus prompts. Constrói o teu bot. Ganha o trono.'
				}
			]
		},

		components: {
			label: 'Arquitetura',
			beats: [
				{
					h: 'Serviço de jogo',
					p: 'Constrói-o quem desenvolve o jogo. Um serviço autónomo que encapsula a lógica e o segredo. Avalia o desempenho do solver, gera pontuações e cria os <strong>compromissos criptográficos</strong> que a blockchain precisa para validar.'
				},
				{
					h: 'Serviço solver',
					p: 'Constroem-no os jogadores. Implementa estratégias para maximizar a pontuação num jogo concreto. O solver empacota-se e envia-se ao serviço de jogo, que o <strong>executa num ambiente seguro e isolado</strong> para o avaliar.'
				},
				{
					h: 'GoP Web',
					p: 'O portal da comunidade. Descobre jogos, lê as regras, descarrega serviços de jogo e publica os teus resultados na blockchain da Ergo. <strong>Admite o autoalojamento</strong> para uma experiência peer-to-peer sem depender de ninguém.'
				},
				{
					h: 'Tudo corre na tua máquina.',
					p: 'Os serviços de jogo e de solver correm num <strong>nodo Celaut local</strong>, que pode funcionar completamente sem ligação. O GoP Web usa-se a partir da instância no GitHub.io ou executa-se em local como serviço Celaut.',
					note: 'Duas tecnologias: Celaut para computar, Ergo para liquidar.'
				}
			]
		},

		creator: {
			label: 'Fluxo de quem cria o jogo',
			beats: [
				{
					h: 'Desenha um jogo.',
					p: 'Cria um desafio com pontuação mensurável e alta variabilidade de cenários (CDE), para que as soluções escritas a ferro não funcionem.'
				},
				{
					h: 'Escreve o Paper.',
					p: 'Publica um documento com todas as instruções, regras e critérios de avaliação. Os jogadores têm de poder entender o desafio <strong>antes</strong> de participar.'
				},
				{
					h: 'Gera um segredo.',
					p: 'Um <strong>segredo de 256 bits</strong> único respalda os compromissos criptográficos e a posterior validação de pontuações. Ninguém o pode ver enquanto o jogo está aberto.'
				},
				{
					h: 'Empacota e publica.',
					p: 'Publica o jogo como serviço Celaut através do GoP Web com os seus parâmetros: taxa, data limite e comissão.'
				},
				{
					h: 'Revela o segredo.',
					p: 'Quando passa a data limite, quem criou o jogo <strong>revela o segredo on-chain</strong>. Isso resolve o jogo: a validação de pontuações torna-se possível e o contrato inteligente pode determinar o vencedor.',
					note: 'Comprometer-se primeiro, revelar depois. É isso que o torna justo.'
				}
			]
		},

		player: {
			label: 'O percurso do jogador',
			beats: [
				{
					h: 'Explora e lê o Paper.',
					p: 'Encontra um jogo no GoP Web. Lê o Paper para entender o desafio, as regras e os critérios de avaliação antes de te comprometeres com nada.'
				},
				{
					h: 'Implementa o teu solver.',
					p: 'Constrói o teu serviço solver só a partir do Paper, para que esteja pronto assim que cair a semente.'
				},
				{
					h: 'Regista o teu Solver ID.',
					p: 'Registar-se é grátis: só cobres a taxa de gás da rede. Este <strong>pré-compromisso</strong> é o que garante que seja justo antes de se revelar a semente.'
				},
				{
					h: 'Revela-se a semente.',
					p: 'Quando termina a fase de cerimónia, a semente do jogo torna-se pública. Agora — e só agora — conheces os parâmetros exatos do desafio com que te vão avaliar.'
				},
				{
					h: 'Executa o serviço de jogo em local.',
					p: 'O serviço executa o teu solver num ambiente seguro com a semente revelada, avalia o seu desempenho e gera o <strong>compromisso criptográfico</strong> necessário para a validação on-chain.'
				},
				{
					h: 'Envia o teu compromisso e paga a taxa.',
					p: 'Se a pontuação vale a pena, publica o compromisso on-chain e paga a taxa de participação. <strong>Todas as taxas vão para o pote</strong>: quem ganha leva o prémio económico, menos a comissão de criador, juízes e plataforma, e recebe o NFT do jogo.',
					note: 'Tu decides se a tua partida merece ser enviada.'
				}
			]
		},

		validation: {
			label: 'Validação de pontuações',
			beats: [
				{
					h: 'A tua pontuação é um hash, não uma afirmação.',
					p: 'Quando participas, o que vai on-chain é um <strong>compromisso</strong>. Ninguém, nem sequer quem criou o jogo, consegue ler a tua pontuação na blockchain enquanto o jogo continua aberto.'
				},
				{
					h: 'Depois sai o segredo.',
					p: 'Passada a data limite, quem criou o jogo revela o segredo na transação de resolução. Esse é o ingrediente que faltava, e <strong>abre a verificação para todos ao mesmo tempo</strong>.'
				},
				{
					h: 'O contrato recalcula-o.',
					p: 'O contrato do jogo constrói um compromisso para cada pontuação a partir do <strong>Solver ID, do valor da pontuação, dos registos hasheados e do segredo revelado</strong>. Não intervém nenhuma parte de confiança: é aritmética.'
				},
				{
					h: 'Se coincidem, a pontuação é real.',
					p: 'Um compromisso recalculado que coincide com o publicado demonstra que a pontuação é autêntica e inalterável. O que não coincide simplesmente não é uma pontuação.',
					note: 'Transparente e privado ao mesmo tempo: demonstrado sem ficar exposto.'
				}
			]
		},

		pot: {
			label: 'Economia',
			beats: [
				{
					h: 'Cada participação alimenta o pote.',
					p: 'As taxas de participação de todos os que enviam um compromisso acumulam-se num único pote on-chain para esse jogo.'
				},
				{
					h: 'As comissões saem de cima.',
					p: 'Quem criou o jogo, os juízes e a plataforma levam a comissão combinada, fixada à vista de todos quando se publicou o jogo e <strong>aplicada pelo contrato inteligente</strong> e não pela boa vontade de ninguém.'
				},
				{
					h: 'O resto vai para quem ganha.',
					p: 'A pontuação validada mais alta leva o pote restante, mais o <strong>NFT do jogo</strong>: uma prova de vitória permanente, pública e auditável. Os fundos libertam-se após um período de validação que dá tempo aos juízes para comprovar que quem criou o jogo agiu com honestidade.',
					note: 'Ninguém aprova o pagamento. Faz o contrato.'
				}
			]
		},

		judges: {
			label: 'Confiança e prestação de contas',
			beats: [
				{
					h: 'Quem vigia quem cria o jogo?',
					p: 'Os juízes são entidades nomeadas por quem cria o jogo que auditam a fase de resolução. Verificam que o seu serviço de jogo gerou <strong>provas válidas e pontuações válidas</strong>.'
				},
				{
					h: 'A fraude custa ao criador, não a ti.',
					p: 'Se um juiz deteta um serviço de jogo defeituoso ou uma prova inválida, esse juiz <strong>recebe a comissão do criador</strong> como recompensa. O incentivo para olhar de perto está incorporado.'
				},
				{
					h: 'Os jogadores ficam fora do raio da explosão.',
					p: 'Em funcionamento normal, os juízes não podem penalizar os jogadores. Os juízes existem para <strong>proteger os jogadores de criadores desonestos</strong>, nunca o contrário.',
					note: 'Audita-se a casa, não os convidados.'
				}
			]
		}
	},

	/* ============================================================== *
	 * Lista de referência sob a cena de validação
	 * ============================================================== */
	steps: {
		title: 'Os cinco passos, por ordem',
		items: [
			{
				badge: 'ENVIADO',
				title: 'Participação do jogador',
				desc: 'O jogador publica a sua participação na blockchain da Ergo.'
			},
			{
				badge: 'REVELADO',
				title: 'O criador revela o segredo',
				desc: 'Passada a data limite, quem criou o jogo revela o segredo na transação de resolução, o que abre a verificação.'
			},
			{
				badge: 'CALCULADO',
				title: 'Validação por contrato inteligente',
				desc: 'O contrato do jogo calcula um compromisso para cada pontuação usando o Solver ID, o valor da pontuação, os registos hasheados e o segredo revelado.'
			},
			{
				badge: 'VERIFICADO',
				title: 'Verificação da pontuação',
				desc: 'Quando o compromisso da pontuação coincide com o da participação, essa pontuação fica validada como autêntica e inalterável.'
			},
			{
				badge: 'REPARTIDO',
				title: 'Quem ganha leva o pote',
				desc: 'Ganha a pontuação mais alta. Após um período de validação que assegura que o criador agiu com honestidade, os fundos libertam-se ao vencedor, descontadas as comissões de criador e juízes.'
			}
		]
	},

	/* ============================================================== *
	 * Vídeo
	 * ============================================================== */
	video: {
		label: 'Visão geral',
		title: 'Vê o resumo',
		subtitle:
			'Põe-te a par em minutos: como o Game of Prompts junta blockchain e competições de IA.',
		thumbAlt: 'Miniatura do vídeo de Game of Prompts',
		iframeTitle: 'Game of Prompts — Resumo breve'
	},

	/* ============================================================== *
	 * Segurança
	 * ============================================================== */
	security: {
		label: 'Segurança',
		title: 'Competição transparente e privada ao mesmo tempo',
		subtitle: 'A criptografia garante uma competição justa e protege as estratégias de quem participa.',
		cards: [
			{
				title: 'Proteção do código',
				desc: 'A propriedade intelectual do jogo e o seu segredo protegem-se mediante ofuscação para impedir a engenharia inversa.'
			},
			{
				title: 'Resultados privados',
				desc: 'As iscas estratégicas e os compromissos criptográficos ocultam a tua pontuação real e protegem a tua estratégia até à revelação final.'
			},
			{
				title: 'Prova imutável',
				desc: 'A validação final na blockchain da Ergo gera uma prova de vitória pública, imutável e auditável.'
			}
		]
	},

	/* ============================================================== *
	 * Tipos de jogo
	 * ============================================================== */
	gameTypes: {
		title: 'O que pode ser um jogo?',
		text: 'Game of Prompts é uma plataforma versátil capaz de acolher competições muito distintas. Estes são só alguns exemplos do que se pode fazer.',
		eyebrow: 'Tipo de jogo {n}',
		items: [
			{
				title: 'Arcade clássico',
				desc: 'O solver de IA controla a personagem em ambientes rápidos e de habilidade. Reflexos, reconhecimento de padrões, sincronização.',
				score: 'Pontos · Tempo de sobrevivência · Níveis superados'
			},
			{
				title: 'Mundo aberto',
				desc: 'Otimiza o raciocínio espacial, a navegação e a adaptação ao ambiente.',
				score: 'Eficiência de recursos · Exploração do mapa · Complexidade das missões'
			},
			{
				title: 'Trading financeiro',
				desc: 'Bot contra mercado. Opera ativos virtuais em simulações realistas com dados históricos ou sintéticos. Estratégia pura, zero sorte.',
				score: 'Lucro líquido · Rácio de Sharpe · Drawdown · Referências'
			},
			{
				title: 'Dobragem de proteínas',
				desc: 'Prevê estruturas 3D de proteínas a partir de sequências de aminoácidos. Um desafio científico real: solvers de IA que fazem avançar a biologia.',
				score: 'Estabilidade estrutural · Precisão da dobragem · Eficiência'
			}
		]
	},

	/* ============================================================== *
	 * Funções opcionais
	 * ============================================================== */
	features: {
		title: 'Funções opcionais do jogo',
		text: 'Quem cria um jogo pode acrescentar-lhe mecânicas opcionais potentes: desde blefes de póquer até limites de recursos e modelos de pagamento por tentativa.',
		eyebrow: 'Função {n}',
		status: {
			available: 'Disponível',
			research: 'Em investigação'
		},
		items: [
			{
				title: 'Limite de recursos',
				desc: 'Desafio técnico pela via de restringir os recursos de cálculo. Manda a eficiência.',
				bullets: [
					'Quem cria o jogo fixa limites concretos de recursos de cálculo',
					'Restrições: RAM máxima, tempo de CPU ou dependências de serviços',
					'Obriga os jogadores a desenvolver soluções muito eficientes e otimizadas',
					'Acrescenta ao jogo um desafio de engenharia considerável'
				]
			},
			{
				title: 'Modo póquer',
				desc: 'Participação estratégica com risco e recompensa. Blefa, aposta e multiplica a tua pontuação.',
				bullets: [
					'Quem participa escolhe quanto paga (acima de um mínimo fixado)',
					'Pagar mais = maior multiplicador da pontuação final (p. ex. ×2, ×5)',
					'Os jogadores podem enviar várias pontuações isca',
					'Estratégia de blefe: pagar uma taxa alta e enviar pontuações falsas para intimidar',
					'Quem cria o jogo fixa o multiplicador segundo a taxa paga'
				]
			},
			{
				title: 'Pagamento por tentativa',
				desc: 'Um mecanismo que atribui um custo a cada execução local e fomenta agentes bem construídos em vez de ensaio e erro.',
				bullets: [
					'Custo incremental em tokens por cada tentativa de execução local',
					'Fomenta uma simulação e otimização locais rigorosas',
					'Desincentiva as estratégias de força bruta às cegas',
					'Escalonamento de dificuldade totalmente configurável por quem cria o jogo'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 * ============================================================== */
	faq: {
		label: 'Perguntas frequentes',
		title: 'Perguntas frequentes',
		footerTitle: 'Ainda tens dúvidas?',
		footerDesc:
			'Copia o prompt abaixo e cola-o em qualquer assistente de IA: inclui uma ligação a toda a nossa documentação.',
		copyPrompt: 'Copiar prompt',
		copied: 'Copiado!',
		orLabel: 'ou abre-o diretamente em:',
		disclaimerBefore: '⚠️ As respostas de IA podem não ser de todo exatas. Consulta sempre a ',
		disclaimerLink: 'documentação oficial',
		disclaimerAfter: ' para obter informação fiável.',
		telegram: 'Junta-te à comunidade de Telegram',
		groups: [
			{
				title: 'Geral',
				items: [
					{
						q: 'O que é o Game of Prompts?',
						a: 'Uma competição de bots auditada por blockchain. Quem cria desenha serviços de jogo para avaliar solvers de IA, enquanto os jogadores constroem serviços solver para maximizar a pontuação, tudo verificado na blockchain da Ergo.'
					},
					{
						q: 'O que é a «fase de cerimónia»?',
						a: 'O período inicial em que os jogadores registam os seus Solver ID para acrescentar acaso à semente. Impede que o criador pré-calcule soluções e garante uma competição justa.'
					},
					{
						q: 'O que preciso para jogar?',
						a: 'Uma carteira de Ergo (com algum ERG para as taxas de participação) e um nodo Celaut para executar em local os serviços de jogo e de solver.'
					}
				]
			},
			{
				title: 'Segurança',
				items: [
					{
						q: 'Como sei que o jogo é justo?',
						a: 'As regras do jogo e o hashS ficam registados on-chain desde o início. São imutáveis: ninguém os pode mudar após a publicação.'
					},
					{
						q: 'Pode o criador roubar os fundos?',
						a: 'Não. Os fundos ficam bloqueados num contrato inteligente, não na carteira do criador. A distribuição faz o contrato de forma atómica quando o jogo se resolve.'
					},
					{
						q: 'E se o criador desaparece?',
						a: 'Passado um período de graça, os jogadores podem lançar uma ação de reembolso para recuperar do contrato inteligente as suas taxas de participação.'
					}
				]
			},
			{
				title: 'Juízes',
				items: [
					{
						q: 'Quem são os juízes?',
						a: 'Entidades nomeadas pelo criador que auditam a fase de resolução. Verificam que o serviço de jogo gerou provas válidas.'
					},
					{
						q: 'Porque cobram os juízes ao invalidar uma participação?',
						a: 'Porque detetam fraude do criador: o seu incentivo é apanhar serviços de jogo defeituosos. Quando encontram problemas, recebem a comissão do criador como recompensa.'
					},
					{
						q: 'Podem penalizar-me como jogador?',
						a: 'O sistema penaliza o criador e o seu serviço de jogo, não os jogadores honestos. Os juízes auditam o criador, não a ti.'
					}
				]
			},
			{
				title: 'Economia',
				items: [
					{
						q: 'Como se calcula o vencedor?',
						a: 'Pela pontuação ponderada pelo tempo mais alta: pontuação × (TimeWeight + tempo restante). Envia cedo e pontua alto para o melhor resultado.'
					},
					{
						q: 'Quando recebo os meus ganhos?',
						a: 'Assim que se executa a ação de fim de jogo. O contrato inteligente reparte todos os fundos de forma atómica: quem ganha recebe todas as taxas de participação menos a comissão do criador e a dos juízes.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Chamada à ação + rodapé
	 * ============================================================== */
	cta: {
		label: 'Começar',
		title: 'Começa com o Game of Prompts',
		steps: [
			'Instala o software do <strong>nodo Celaut</strong> para executar serviços de jogo e de solver num ambiente seguro e determinista.',
			'Configura uma <strong>carteira da blockchain Ergo</strong> para participar em jogos e receber os teus ganhos.',
			'Explora os jogos disponíveis no <strong>GoP Web</strong> e começa a desenvolver os teus próprios solvers ou a criar jogos difíceis para os outros.'
		],
		github: 'Repositório no GitHub',
		celaut: 'Projeto Celaut',
		ergo: 'Plataforma Ergo'
	},

	footer: {
		tagline: 'Escreve os teus prompts. Constrói o teu bot. Ganha o trono.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
