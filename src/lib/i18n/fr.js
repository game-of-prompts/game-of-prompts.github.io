/*
 * src/lib/i18n/fr.js
 * ------------------------------------------------------------------
 * Français — traduction de en.js, clé par clé.
 *
 * Même structure, mêmes longueurs de tableau. `glossary.terms` a
 * exactement 33 entrées, appariées par position avec GLOSSARY_IDS dans
 * src/lib/glossary/terms.js.
 *
 * `match` n'est pas du texte à traduire : c'est la liste des mots qui,
 * lorsqu'ils apparaissent DANS CETTE PROSE, se soulignent et ouvrent
 * la définition. Les formes listées sont celles réellement utilisées
 * ici, avec leurs pluriels et accords.
 */

export default {
	/* ============================================================== *
	 * Contrôles du groupe du coin
	 * ============================================================== */
	common: {
		languageLabel: 'Langue',
		switchLanguage: 'Changer de langue',
		themeToLight: 'Passer au thème clair',
		themeToDark: 'Passer au thème sombre',
		backToTop: 'Retour en haut',
		scoring: 'NOTATION'
	},

	/* ============================================================== *
	 * Glossaire
	 * ============================================================== */
	glossary: {
		toggleOn: 'Expliquer les termes techniques',
		toggleOff: 'Masquer les explications',
		toggleLabel: 'Explications',
		close: 'Fermer',
		explain: 'Que signifie «{term}» ?',
		hintTitle: 'Certains mots sont soulignés.',
		hintBody:
			'Touchez un mot souligné pour une explication en langage simple. Vous pouvez les désactiver à tout moment avec le bouton dans le coin.',
		hintDismiss: 'Compris',

		terms: [
			{
				match: ['service de jeu', 'services de jeu'],
				title: 'Service de jeu',
				body: 'Le défi lui-même, emballé comme un programme scellé que n\u2019importe qui peut télécharger et exécuter. Il contient les règles, la notation et le secret caché de son créateur \u2014 comme un sujet d\u2019examen scellé qui se note tout seul.',
				more: 'Vous l\u2019exécutez sur votre propre machine. Il note votre bot et produit le reçu cryptographique que la blockchain vérifiera ensuite.'
			},
			{
				match: ['service solver', 'services solver', 'solver', 'solvers'],
				title: 'Service solver',
				body: 'Votre participation. Le bot que vous construisez pour jouer, emballé de la même façon scellée pour qu\u2019il s\u2019exécute à l\u2019identique sur n\u2019importe quelle machine \u2014 votre stratégie dans une seule boîte portable.',
				more: 'Il est remis au service de jeu, qui l\u2019exécute isolé et note ce qu\u2019il a fait. Personne ne voit votre code, sauf vous.'
			},
			{
				match: ['GoP Web', 'le portail', 'portail'],
				title: 'GoP Web',
				body: 'Le site où les jeux sont listés : lire les règles, télécharger un jeu, publier votre résultat. C\u2019est un annuaire et un outil de signature, pas un arbitre \u2014 rien de ce qu\u2019il montre n\u2019a à être cru sur parole.',
				more: 'Vous pouvez exécuter votre propre copie. C\u2019est tout l\u2019intérêt : si la version publique disparaissait, les jeux continueraient.'
			},
			{
				match: ['Celaut', 'nœud Celaut', 'nœuds Celaut'],
				title: 'Celaut',
				body: 'Le système qui exécute vraiment les programmes scellés. Vous l\u2019installez une fois, et ensuite n\u2019importe quel paquet de jeu ou de solver peut être remis à votre machine et s\u2019exécuter dans sa propre pièce fermée.',
				more: 'C\u2019est ce qui rend « exécutez-le vous-même » réaliste plutôt qu\u2019un slogan : le même paquet se comporte de la même façon sur chaque machine qui l\u2019ouvre.'
			},
			{
				match: ['nœud', 'nœuds'],
				title: 'Nœud',
				body: 'Un ordinateur qui participe à un réseau. Votre portable, un bureau de rechange, un serveur dans une baie \u2014 dès qu\u2019il exécute le logiciel et commence à parler aux autres machines, c\u2019est un nœud.',
				more: 'Ici, c\u2019est simplement la machine qui exécute les jeux et les solvers. La vôtre, pas le centre de données de quelqu\u2019un d\u2019autre.'
			},
			{
				match: ['service', 'services'],
				title: 'Service',
				body: 'Un morceau de logiciel autonome qui fait un seul travail et peut être remis à n\u2019importe quelle machine pour s\u2019exécuter \u2014 plus proche d\u2019un appareil que d\u2019un programme que l\u2019on installe.',
				more: 'Les deux moitiés d\u2019une compétition sont des services : le jeu et le bot qui y joue.'
			},
			{
				match: ['blockchain', 'blockchains', 'chaîne de blocs'],
				title: 'Blockchain',
				body: 'Un livre de comptes partagé dont des milliers d\u2019ordinateurs gardent une copie en même temps. Ajouter une entrée exige que les autres acceptent qu\u2019elle est valide, et les entrées passées ne peuvent pas être réécrites \u2014 aucun participant ne contrôle l\u2019historique à lui seul.',
				more: 'Ici, elle sert à deux tâches précises : enregistrer qui a revendiqué quel score, et payer le gagnant. Rien de plus.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'La blockchain particulière sur laquelle cette plateforme enregistre les résultats et règle les paiements. ERG est son unité de monnaie.',
				more: 'C\u2019est un choix, pas une fondation : la plateforme n\u2019a pas de monnaie à elle.'
			},
			{
				match: [
					'contrat intelligent',
					'contrats intelligents',
					'contrat du jeu',
					'contrat',
					'contrats'
				],
				title: 'Contrat intelligent',
				body: 'Un programme qui vit sur la blockchain et détient de l\u2019argent selon des règles écrites à l\u2019avance. Quand les conditions sont remplies, il paie tout seul \u2014 personne ne signe de chèque, et personne ne peut décider de ne pas le faire.',
				more: 'C\u2019est pourquoi le prix est en sécurité avant que quiconque l\u2019ait gagné : les fonds sont détenus par les règles, pas par la personne qui les a écrites.'
			},
			{
				match: ['on-chain'],
				title: 'On-chain',
				body: 'Écrit dans la blockchain elle-même, où tout le monde peut le voir et personne ne peut le modifier en silence plus tard \u2014 par opposition à une base de données privée d\u2019une entreprise.'
			},
			{
				match: [
					'engagement cryptographique',
					'engagements cryptographiques',
					'pré-engagement',
					'engagement',
					'engagements'
				],
				title: 'Engagement',
				body: 'Une enveloppe scellée. Vous publiez quelque chose qui prouve ce que vous avez choisi, sans révéler ce que c\u2019était \u2014 et plus tard, quand l\u2019enveloppe est ouverte, chacun peut vérifier que vous n\u2019avez pas échangé le contenu.',
				more: 'C\u2019est ce qui permet de figer un score en public pendant que le jeu tourne encore, sans dire à vos rivaux à quel point vous avez réussi.'
			},
			{
				match: ['journaux hachés', 'hash', 'hashes', 'haché', 'hachés'],
				title: 'Hash',
				body: 'Une courte empreinte calculée à partir d\u2019une donnée. Les mêmes données donnent toujours la même empreinte, un seul octet changé en donne une complètement différente, et on ne peut pas remonter de l\u2019empreinte jusqu\u2019aux données.',
				more: 'Cette propriété à sens unique est tout le truc : elle permet de prouver qu\u2019une chose correspond sans montrer ce que c\u2019est.'
			},
			{
				match: ['secret du jeu', 'secret de 256 bits', 'secret', 'secrets'],
				title: 'Secret',
				body: 'Un grand nombre aléatoire que le créateur génère et garde caché tant que le jeu est ouvert. Chaque score est scellé avec lui, donc aucun score ne peut être vérifié \u2014 ni falsifié \u2014 tant que le créateur ne l\u2019a pas publié.',
				more: 'Le publier à la fin, c\u2019est ce qui rend les résultats de tout le monde vérifiables au même instant, plutôt qu\u2019un par un.'
			},
			{
				match: ['graine du jeu', 'graine', 'graines'],
				title: 'Graine',
				body: 'Le nombre de départ qui décide exactement quelle version du défi vous affrontez \u2014 quel plateau, quelles données de marché, quelle énigme. Même graine, même défi, pour tout le monde.',
				more: 'Elle n\u2019est révélée qu\u2019après la clôture des participations, pour que personne ne puisse régler son bot à l\u2019avance sur cette manche précise.'
			},
			{
				match: ['phase de cérémonie', 'cérémonie', 'période de cérémonie'],
				title: 'Phase de cérémonie',
				body: 'La fenêtre au début d\u2019un jeu où les joueurs s\u2019inscrivent et où chaque inscription mélange un peu d\u2019imprévu dans la graine finale. Comme si tout le monde jetait un dé dans le même gobelet avant d\u2019en retirer le couvercle.',
				more: 'Elle existe pour que le créateur ne puisse pas non plus connaître le défi à l\u2019avance \u2014 les joueurs le décident collectivement, sans le vouloir.'
			},
			{
				match: ['Solver ID', 'Solver IDs', 'identifiant du solver'],
				title: 'Solver ID',
				body: 'L\u2019empreinte unique du bot exact que vous avez inscrit. Elle nomme une version précise de votre code, pour qu\u2019un bot ne puisse pas être échangé en silence contre un autre après la révélation de la graine.'
			},
			{
				match: ['Paper', 'le Paper', 'Paper du jeu'],
				title: 'Paper',
				body: 'Les règles écrites : quel est le défi, comment on le note, ce qui compte comme une participation valide. Publié avant que quiconque puisse jouer, pour que les conditions ne changent plus une fois que les gens se sont engagés.',
				more: 'L\u2019idée est que vous puissiez construire votre participation à partir de ce seul document.'
			},
			{
				match: ['cagnotte', 'la cagnotte'],
				title: 'Cagnotte',
				body: 'Tous les frais d\u2019entrée, mis en commun et détenus par le contrat jusqu\u2019à la résolution du jeu. Quiconque concourt paie ; le gagnant prend ce qui reste après les parts convenues.'
			},
			{
				match: [
					'frais de participation',
					'frais d\u2019entrée'
				],
				title: 'Frais de participation',
				body: 'Ce que coûte l\u2019envoi d\u2019un résultat que vous voulez voir compter. Il va dans la cagnotte, pas aux organisateurs, donc chaque participation agrandit le prix.',
				more: 'Vous ne les payez que si vous jugez que votre manche valait la peine d\u2019être présentée \u2014 exécuter le jeu en local est gratuit.'
			},
			{
				match: ['commission du créateur', 'commission', 'commissions'],
				title: 'Commission',
				body: 'La part convenue de la cagnotte qui va au créateur du jeu, à ses juges et à la plateforme. Fixée au grand jour à la publication du jeu, et prélevée automatiquement \u2014 pas négociée après coup.'
			},
			{
				match: ['juge', 'juges'],
				title: 'Juge',
				body: 'Quelqu\u2019un dont le travail est de contrôler le créateur, pas les joueurs : le jeu a-t-il vraiment noté honnêtement, et ses reçus sont-ils valides ? S\u2019ils attrapent une triche, ils sont payés sur la part du créateur.',
				more: 'Être payé pour trouver la fraude, plutôt que pour approuver, c\u2019est ce qui rend le rôle utile.'
			},
			{
				match: ['NFT du jeu', 'NFT', 'NFTs'],
				title: 'NFT',
				body: 'Un jeton unique enregistré sur la blockchain, que l\u2019on peut posséder et transférer mais pas dupliquer. Ici, c\u2019est le trophée : la preuve permanente et publique de qui a gagné un jeu donné.'
			},
			{
				match: ['portefeuille Ergo', 'portefeuille', 'portefeuilles'],
				title: 'Portefeuille',
				body: 'L\u2019application qui détient les clés de vos fonds et signe vos actions sur la blockchain. Ce n\u2019est pas un compte chez une entreprise \u2014 personne ne peut le geler, et personne ne peut le récupérer à votre place.'
			},
			{
				match: ['frais de gaz', 'frais de réseau'],
				title: 'Frais de gaz',
				body: 'Le petit coût pour que le réseau enregistre votre transaction. Il paie les ordinateurs qui font l\u2019enregistrement, pas la plateforme \u2014 plutôt un timbre-poste qu\u2019un prix d\u2019entrée.'
			},
			{
				match: ['déterministe', 'déterministes', 'déterminisme'],
				title: 'Déterministe',
				body: 'Même entrée, même sortie, à chaque fois \u2014 comme une recette qui produit un gâteau identique dans n\u2019importe quelle cuisine, plutôt qu\u2019une qui dépend du cuisinier. Ni la machine, ni le jour, ni le lieu ne changent le résultat.',
				more: 'C\u2019est ce qui rend un score vérifiable par quelqu\u2019un d\u2019autre : il peut le relancer et doit obtenir votre nombre.'
			},
			{
				match: [
					'environnement sûr et isolé',
					'environnement isolé',
					'isolation',
					'isolé',
					'isolée',
					'scellé',
					'scellés',
					'scellée'
				],
				title: 'Isolation',
				body: 'Garder un programme en cours d\u2019exécution à l\u2019intérieur d\u2019une frontière qu\u2019il ne peut pas franchir \u2014 il ne voit que ce qu\u2019on lui a donné, et rien de la machine autour ni de tout ce qui s\u2019y exécute aussi.',
				more: 'C\u2019est ce qui permet à un jeu d\u2019exécuter le bot d\u2019un inconnu sans risque, et à vous d\u2019exécuter le jeu d\u2019un inconnu sans risque.'
			},
			{
				match: ['obfuscation', 'obfusqué', 'obfusquée', 'obfusquer'],
				title: 'Obfuscation',
				body: 'Embrouiller un programme exprès pour qu\u2019il s\u2019exécute parfaitement mais soit pénible à lire \u2014 l\u2019équivalent logiciel d\u2019un document imprimé sans espaces ni retours à la ligne.',
				more: 'Ici, ça sert à garder caché le secret d\u2019un jeu, même si tout le monde a une copie du programme qui le contient.'
			},
			{
				match: ['pair-à-pair', 'peer-to-peer', 'P2P'],
				title: 'Pair-à-pair',
				body: 'Deux ordinateurs qui traitent directement l\u2019un avec l\u2019autre, comme deux personnes au téléphone \u2014 au lieu de tout faire transiter par une entreprise au milieu, comme le font le courrier ou une place de marché. Chaque ordinateur est un « pair » : égaux, personne aux commandes.',
				more: 'Ça compte ici parce que l\u2019entreprise du milieu est en général celle qui fixe le prix, prend sa part, et peut vous retirer.'
			},
			{
				match: ['auto-hébergement', 'auto-hébergé', 'auto-hébergée'],
				title: 'Auto-hébergement',
				body: 'Exécuter votre propre copie d\u2019un service sur votre propre machine au lieu d\u2019utiliser celle de quelqu\u2019un d\u2019autre. La chose continue de marcher même si la version publique est éteinte, censurée, ou a simplement une mauvaise journée.'
			},
			{
				match: [
					'scores leurre',
					'score leurre',
					'scores faux',
					'leurre',
					'leurres'
				],
				title: 'Leurre',
				body: 'Une participation volontairement trompeuse \u2014 un score que vous publiez et qui n\u2019est pas le vrai \u2014 envoyée pour que vos rivaux se trompent sur votre réel niveau. Un bluff, possible parce que personne ne peut lire un score scellé.'
			},
			{
				match: [
					'score pondéré par le temps',
					'pondéré par le temps',
					'TimeWeight'
				],
				title: 'Score pondéré par le temps',
				body: 'Un score ajusté selon la précocité de l\u2019envoi. Deux résultats identiques ne font pas égalité : celui entré plus tôt compte davantage, donc garder une bonne réponse jusqu\u2019à la date limite vous coûte.'
			},
			{
				match: [
					'délai de grâce',
					'période de grâce',
					'période de validation',
					'remboursement'
				],
				title: 'Délai de grâce',
				body: 'Une fenêtre d\u2019attente inscrite dans les règles avant que l\u2019argent ne bouge \u2014 le temps pour les juges de s\u2019opposer, et pour les joueurs de récupérer leurs frais si le créateur ne résout jamais le jeu.',
				more: 'C\u2019est la réponse à « et si l\u2019organisateur disparaît ? » : le contrat laisse tout le monde partir avec son argent.'
			},
			{
				match: ['CDE', 'variabilité des scénarios', 'forte variabilité des scénarios'],
				title: 'Variabilité des scénarios (CDE)',
				body: 'À quel point chaque manche d\u2019un jeu peut différer de la précédente. Une forte variabilité veut dire que le bot doit vraiment bien jouer, parce qu\u2019il n\u2019y a pas une seule réponse fixe à mémoriser et durcir dans le code.'
			}
		]
	},

	/* ============================================================== *
	 * Splash
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'ÉCRIVEZ VOS PROMPTS. CONSTRUISEZ VOTRE BOT. GAGNEZ LE TRÔNE.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Écrivez vos prompts. Construisez votre bot. Gagnez le trône.',
		description:
			'Une plateforme de compétition où les créateurs conçoivent des services de jeu pour évaluer des solvers d\u2019IA, tandis que les joueurs construisent des services solver pour maximiser leur score \u2014 porté par la blockchain Ergo et Celaut.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Écrivez vos prompts. Construisez votre bot. Gagnez le trône.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Écrivez vos prompts. <span class="hero-grad">Construisez votre bot.</span> Gagnez le trône.',
		lede: 'Une plateforme de compétition où les créateurs conçoivent des services de jeu pour évaluer des solvers d\u2019IA, et les joueurs construisent des services solver pour maximiser leur score \u2014 le tout enregistré et vérifié on-chain.',
		actions: {
			launch: 'Ouvrir l\u2019app',
			github: 'Voir sur GitHub',
			how: 'Voir comment ça marche'
		},
		stats: [
			{ value: 'P2P', label: 'Décentralisé — les services s\u2019exécutent sur votre propre nœud Celaut' },
			{ value: 'On-chain', label: 'Résultats engagés et vérifiés sur Ergo' },
			{ value: 'Sans confiance', label: 'Des contrats intelligents règlent la cagnotte, pas une entreprise' }
		],
		scroll: 'Défiler'
	},

	/* ============================================================== *
	 * Les sept scènes
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'L\u2019idée',
			beats: [
				{
					h: 'Quelqu\u2019un publie un défi.',
					p: 'Un créateur conçoit un jeu avec une notation mesurable \u2014 et l\u2019emballe comme un <strong>service de jeu</strong> : un service Celaut immuable qui contient la logique du jeu et son secret.'
				},
				{
					h: 'Tous les autres construisent un bot pour le battre.',
					p: 'Les joueurs écrivent des <strong>services solver</strong> \u2014 leur stratégie, emballée de la même façon. Le service de jeu exécute chaque solver dans un environnement sûr et isolé, et note ce qu\u2019il a fait.'
				},
				{
					h: 'Le score le plus haut gagne le trône.',
					p: 'Aucun classement à croire sur parole. Chaque score est engagé cryptographiquement et <strong>réglé sur la blockchain Ergo</strong>, où n\u2019importe qui peut vérifier les calculs.',
					note: 'Écrivez vos prompts. Construisez votre bot. Gagnez le trône.'
				}
			]
		},

		components: {
			label: 'Architecture',
			beats: [
				{
					h: 'Service de jeu',
					p: 'Construit par les développeurs de jeux. Un service autonome qui encapsule la logique d\u2019un jeu et le secret. Il évalue la performance du solver, génère des scores et crée les <strong>engagements cryptographiques</strong> nécessaires à la validation sur la blockchain.'
				},
				{
					h: 'Service solver',
					p: 'Construit par les joueurs. Il met en œuvre des stratégies pour maximiser le score dans un jeu donné. Le solver est emballé et envoyé au service de jeu, qui l\u2019<strong>exécute dans un environnement sûr et isolé</strong> pour l\u2019évaluation.'
				},
				{
					h: 'GoP Web',
					p: 'Le portail de la communauté. Découvrir des jeux, lire les règles, télécharger des services de jeu, publier vos résultats sur la blockchain Ergo. Il <strong>prend en charge l\u2019auto-hébergement</strong> pour une expérience pair-à-pair sans tiers de confiance.'
				},
				{
					h: 'Tout s\u2019exécute sur votre machine.',
					p: 'Les services de jeu et de solver s\u2019exécutent tous deux sur un <strong>nœud Celaut local</strong>, qui peut fonctionner entièrement hors ligne. GoP Web s\u2019utilise via son instance GitHub.io ou s\u2019exécute en local comme service Celaut.',
					note: 'Deux technologies : Celaut pour le calcul, Ergo pour le règlement.'
				}
			]
		},

		creator: {
			label: 'Parcours du créateur',
			beats: [
				{
					h: 'Concevez un jeu.',
					p: 'Créez un défi avec une notation mesurable et une forte variabilité des scénarios (CDE), pour que les solutions durcies dans le code ne marchent pas.'
				},
				{
					h: 'Rédigez le Paper.',
					p: 'Publiez un document avec toutes les instructions, règles et critères d\u2019évaluation. Les joueurs doivent pouvoir comprendre le défi <strong>avant</strong> de participer.'
				},
				{
					h: 'Générez un secret.',
					p: 'Un <strong>secret de 256 bits</strong> unique garantit les engagements cryptographiques et la validation ultérieure des scores. Personne ne peut le voir tant que le jeu est ouvert.'
				},
				{
					h: 'Emballez et publiez.',
					p: 'Livrez le jeu comme service Celaut et publiez-le via GoP Web avec ses paramètres : frais, date limite et commission.'
				},
				{
					h: 'Révélez le secret.',
					p: 'Quand la date limite est passée, le créateur <strong>révèle le secret on-chain</strong>. Cela résout le jeu : la validation des scores devient possible et le contrat intelligent peut désigner le gagnant.',
					note: 'S\u2019engager d\u2019abord, révéler ensuite. C\u2019est ce qui le rend équitable.'
				}
			]
		},

		player: {
			label: 'Le parcours du joueur',
			beats: [
				{
					h: 'Parcourez et lisez le Paper.',
					p: 'Trouvez un jeu sur GoP Web. Lisez le Paper du créateur pour comprendre le défi, les règles et les critères d\u2019évaluation avant de vous engager.'
				},
				{
					h: 'Implémentez votre solver.',
					p: 'Construisez votre service solver à partir du Paper seul, pour qu\u2019il soit prêt à concourir dès que la graine tombe.'
				},
				{
					h: 'Enregistrez votre Solver ID.',
					p: 'L\u2019inscription est gratuite \u2014 vous ne couvrez que les frais de gaz du réseau. Ce <strong>pré-engagement</strong> est ce qui garantit l\u2019équité avant la révélation de la graine.'
				},
				{
					h: 'La graine est révélée.',
					p: 'Une fois la phase de cérémonie terminée, la graine du jeu devient publique. Maintenant \u2014 et seulement maintenant \u2014 vous connaissez les paramètres exacts du défi sur lequel vous serez évalué.'
				},
				{
					h: 'Exécutez le service de jeu en local.',
					p: 'Le service exécute votre solver dans un environnement sûr avec la graine révélée, évalue sa performance et génère l\u2019<strong>engagement cryptographique</strong> nécessaire à la validation on-chain.'
				},
				{
					h: 'Soumettez votre engagement et payez les frais.',
					p: 'Si le score mérite de concourir, publiez l\u2019engagement on-chain et payez les frais de participation. <strong>Tous les frais vont dans la cagnotte</strong> \u2014 le gagnant prend le prix économique, moins la commission du créateur, des juges et de la plateforme, et reçoit le NFT du jeu.',
					note: 'C\u2019est vous qui décidez si votre manche vaut d\u2019être envoyée.'
				}
			]
		},

		validation: {
			label: 'Validation des scores',
			beats: [
				{
					h: 'Votre score est un hash, pas une affirmation.',
					p: 'Quand vous participez, ce qui va on-chain est un <strong>engagement</strong> \u2014 un condensé. Personne, pas même le créateur, ne peut lire votre score sur la blockchain tant que le jeu est ouvert.'
				},
				{
					h: 'Puis le secret sort.',
					p: 'Après la date limite, le créateur révèle le secret du jeu dans la transaction de résolution. C\u2019est l\u2019ingrédient manquant \u2014 et ça <strong>déverrouille la vérification pour tout le monde en même temps</strong>.'
				},
				{
					h: 'Le contrat le recalcule.',
					p: 'Le contrat du jeu construit un engagement pour chaque score à partir du <strong>Solver ID, de la valeur du score, des journaux hachés et du secret révélé</strong>. Aucune partie de confiance n\u2019intervient ; c\u2019est de l\u2019arithmétique.'
				},
				{
					h: 'S\u2019ils correspondent, le score est réel.',
					p: 'Un engagement recalculé égal à celui publié prouve que le score est authentique et infalsifiable. Ce qui ne correspond pas n\u2019est tout simplement pas un score.',
					note: 'Transparent et pourtant privé : prouvé sans être exposé.'
				}
			]
		},

		pot: {
			label: 'Économie',
			beats: [
				{
					h: 'Chaque participation alimente la cagnotte.',
					p: 'Les frais de participation de tous ceux qui soumettent un engagement s\u2019accumulent dans une seule cagnotte on-chain pour ce jeu.'
				},
				{
					h: 'Les commissions se prennent sur le dessus.',
					p: 'Le créateur, les juges et la plateforme prennent leur commission convenue \u2014 le tout fixé au grand jour à la publication du jeu, et <strong>appliqué par le contrat intelligent</strong> plutôt que par la bonne volonté de quiconque.'
				},
				{
					h: 'Le reste va au gagnant.',
					p: 'Le score validé le plus haut prend la cagnotte restante \u2014 plus le <strong>NFT du jeu</strong>, une preuve de victoire permanente, publique et auditable. Les fonds sont libérés après une période de validation qui laisse aux juges le temps de vérifier que le créateur a agi honnêtement.',
					note: 'Personne n\u2019approuve le paiement. Le contrat le fait.'
				}
			]
		},

		judges: {
			label: 'Confiance et responsabilité',
			beats: [
				{
					h: 'Qui surveille le créateur ?',
					p: 'Les juges sont des entités nommées par le créateur qui auditent la phase de résolution. Ils vérifient que le service de jeu du créateur a généré des <strong>preuves valides et des scores valides</strong>.'
				},
				{
					h: 'La fraude coûte au créateur, pas à vous.',
					p: 'Si un juge attrape un service de jeu défectueux ou une preuve invalide, ce juge <strong>reçoit la commission du créateur</strong> comme récompense. L\u2019incitation à regarder de près est intégrée.'
				},
				{
					h: 'Les joueurs restent hors du rayon de l\u2019explosion.',
					p: 'En fonctionnement normal, les juges ne peuvent pas pénaliser les joueurs. Les juges existent pour <strong>protéger les joueurs des créateurs malhonnêtes</strong>, jamais l\u2019inverse.',
					note: 'On audite la maison, pas les invités.'
				}
			]
		}
	},

	/* ============================================================== *
	 * Liste de référence sous la scène de validation
	 * ============================================================== */
	steps: {
		title: 'Les cinq étapes, dans l\u2019ordre',
		items: [
			{
				badge: 'ENVOYÉ',
				title: 'Participation du joueur',
				desc: 'Le joueur publie sa participation sur la blockchain Ergo.'
			},
			{
				badge: 'RÉVÉLÉ',
				title: 'Le créateur révèle le secret',
				desc: 'Passée la date limite, le créateur révèle le secret du jeu dans la transaction de résolution \u2014 ce qui ouvre la vérification.'
			},
			{
				badge: 'CALCULÉ',
				title: 'Validation par contrat intelligent',
				desc: 'Le contrat du jeu calcule un engagement pour chaque score à partir du Solver ID, de la valeur du score, des journaux hachés et du secret révélé.'
			},
			{
				badge: 'VÉRIFIÉ',
				title: 'Vérification du score',
				desc: 'Quand l\u2019engagement du score correspond à celui de la participation, ce score est validé comme authentique et infalsifiable.'
			},
			{
				badge: 'RÉPARTI',
				title: 'Le gagnant prend la cagnotte',
				desc: 'Le score le plus haut gagne. Après une période de validation qui assure que le créateur a agi honnêtement, les fonds sont libérés au gagnant, déduction faite des commissions du créateur et des juges.'
			}
		]
	},

	/* ============================================================== *
	 * Vidéo
	 * ============================================================== */
	video: {
		label: 'Aperçu',
		title: 'Voir le décryptage',
		subtitle:
			'Mettez-vous à jour en quelques minutes \u2014 comment Game of Prompts réunit blockchain et compétitions d\u2019IA.',
		thumbAlt: 'Miniature de la vidéo Game of Prompts',
		iframeTitle: 'Game of Prompts — Décryptage court'
	},

	/* ============================================================== *
	 * Sécurité
	 * ============================================================== */
	security: {
		label: 'Sécurité',
		title: 'Compétition transparente et pourtant privée',
		subtitle:
			'La cryptographie assure une compétition équitable tout en protégeant les stratégies des participants.',
		cards: [
			{
				title: 'Protection du code',
				desc: 'La propriété intellectuelle du jeu et son secret sont protégés par obfuscation pour empêcher la rétro-ingénierie.'
			},
			{
				title: 'Résultats privés',
				desc: 'Les leurres stratégiques et les engagements cryptographiques masquent votre vrai score et protègent votre stratégie jusqu\u2019à la révélation finale.'
			},
			{
				title: 'Preuve immuable',
				desc: 'La validation finale sur la blockchain Ergo produit une preuve de victoire publique, immuable et auditable.'
			}
		]
	},

	/* ============================================================== *
	 * Types de jeu
	 * ============================================================== */
	gameTypes: {
		title: 'Qu\u2019est-ce qui peut être un jeu ?',
		text: 'Game of Prompts est une plateforme polyvalente, capable d\u2019accueillir des compétitions très diverses. Voici seulement quelques exemples de ce qui est possible.',
		eyebrow: 'Type de jeu {n}',
		items: [
			{
				title: 'Arcade classique',
				desc: 'Le solver d\u2019IA contrôle le personnage dans des environnements rapides, fondés sur l\u2019adresse. Réflexes, reconnaissance de motifs, synchronisation.',
				score: 'Points de jeu · Temps de survie · Niveaux terminés'
			},
			{
				title: 'Monde ouvert',
				desc: 'Optimiser le raisonnement spatial, la navigation et l\u2019adaptation à l\u2019environnement.',
				score: 'Efficacité des ressources · Exploration de la carte · Complexité des missions'
			},
			{
				title: 'Trading financier',
				desc: 'Bot contre marché. Négocier des actifs virtuels dans des simulations réalistes, avec des données historiques ou synthétiques. Stratégie pure, zéro chance.',
				score: 'Profit net · Ratio de Sharpe · Drawdown · Références'
			},
			{
				title: 'Repliement de protéines',
				desc: 'Prédire les structures 3D de protéines à partir de séquences d\u2019acides aminés. Un vrai défi scientifique \u2014 des solvers d\u2019IA qui font avancer la biologie.',
				score: 'Stabilité structurelle · Précision du repliement · Efficacité'
			}
		]
	},

	/* ============================================================== *
	 * Fonctions optionnelles
	 * ============================================================== */
	features: {
		title: 'Fonctions optionnelles du jeu',
		text: 'Les créateurs peuvent enrichir leurs jeux avec des mécaniques optionnelles puissantes \u2014 du bluff façon poker aux limites de ressources et aux modèles de paiement à l\u2019essai.',
		eyebrow: 'Fonction {n}',
		status: {
			available: 'Disponible',
			research: 'En recherche'
		},
		items: [
			{
				title: 'Limitation des ressources',
				desc: 'Défi technique par la contrainte des ressources de calcul. L\u2019efficacité est reine.',
				bullets: [
					'Le créateur du jeu fixe des limites précises sur les ressources de calcul',
					'Contraintes : RAM maximale, temps CPU, ou dépendances de services',
					'Oblige les joueurs à développer des solutions très efficaces et optimisées',
					'Ajoute au jeu un défi d\u2019ingénierie considérable'
				]
			},
			{
				title: 'Mode poker',
				desc: 'Participation stratégique avec risque et récompense. Bluffez, misez, multipliez votre score.',
				bullets: [
					'Les participants choisissent combien payer (au-dessus d\u2019un minimum fixé)',
					'Payer plus = plus grand multiplicateur du score final (p. ex. ×2, ×5)',
					'Les joueurs peuvent envoyer plusieurs scores leurre',
					'Stratégie de bluff : payer des frais élevés et envoyer des scores faux pour intimider',
					'Le créateur du jeu fixe le multiplicateur selon les frais payés'
				]
			},
			{
				title: 'Paiement à l\u2019essai',
				desc: 'Un mécanisme qui assigne un coût à chaque exécution locale, et favorise des agents bien construits plutôt que l\u2019essai-erreur.',
				bullets: [
					'Coût incrémental en jetons par tentative d\u2019exécution locale',
					'Encourage une simulation et une optimisation locales rigoureuses',
					'Désincite les stratégies de force brute à l\u2019aveugle',
					'Réglage de la difficulté entièrement configurable par le créateur du jeu'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 * ============================================================== */
	faq: {
		label: 'FAQ',
		title: 'Questions fréquentes',
		footerTitle: 'Encore des questions ?',
		footerDesc:
			'Copiez le prompt ci-dessous et collez-le dans n\u2019importe quel assistant d\u2019IA \u2014 il contient un lien vers toute notre documentation.',
		copyPrompt: 'Copier le prompt',
		copied: 'Copié !',
		orLabel: 'ou ouvrir directement dans :',
		disclaimerBefore: '⚠️ Les réponses d\u2019IA peuvent ne pas être entièrement exactes. Consultez toujours la ',
		disclaimerLink: 'documentation officielle',
		disclaimerAfter: ' pour une information faisant autorité.',
		telegram: 'Rejoindre la communauté Telegram',
		groups: [
			{
				title: 'Général',
				items: [
					{
						q: 'Qu\u2019est-ce que Game of Prompts ?',
						a: 'Une compétition de bots auditée par la blockchain. Les créateurs conçoivent des services de jeu pour évaluer des solvers d\u2019IA, tandis que les joueurs construisent des services solver pour maximiser leur score \u2014 le tout vérifié sur la blockchain Ergo.'
					},
					{
						q: 'Qu\u2019est-ce que la « phase de cérémonie » ?',
						a: 'La période initiale où les joueurs enregistrent leurs Solver ID pour ajouter de l\u2019aléa à la graine. Cela empêche le créateur de précalculer des solutions et garantit une compétition équitable.'
					},
					{
						q: 'De quoi ai-je besoin pour jouer ?',
						a: 'Un portefeuille Ergo (avec un peu d\u2019ERG pour les frais de participation) et un nœud Celaut pour exécuter en local les services de jeu et de solver.'
					}
				]
			},
			{
				title: 'Sécurité',
				items: [
					{
						q: 'Comment savoir que le jeu est équitable ?',
						a: 'Les règles du jeu et les hashes sont enregistrés on-chain dès le départ. Ils sont immuables \u2014 personne ne peut les changer après publication.'
					},
					{
						q: 'Le créateur peut-il voler les fonds ?',
						a: 'Non. Les fonds sont verrouillés dans un contrat intelligent, pas dans le portefeuille du créateur. La distribution est faite de façon atomique par le contrat quand le jeu se résout.'
					},
					{
						q: 'Et si le créateur disparaît ?',
						a: 'Après un délai de grâce, les joueurs peuvent déclencher une action de remboursement pour récupérer leurs frais de participation auprès du contrat intelligent.'
					}
				]
			},
			{
				title: 'Juges',
				items: [
					{
						q: 'Qui sont les juges ?',
						a: 'Des entités nommées par le créateur qui auditent la phase de résolution. Elles vérifient que le service de jeu a généré des preuves valides.'
					},
					{
						q: 'Pourquoi les juges gagnent-ils de l\u2019argent en invalidant une participation ?',
						a: 'Ils détectent la fraude du créateur \u2014 leur incitation est d\u2019attraper des services de jeu défectueux. Quand ils trouvent des problèmes, ils reçoivent la commission du créateur comme récompense.'
					},
					{
						q: 'Puis-je être pénalisé en tant que joueur ?',
						a: 'Le système pénalise le créateur et son service de jeu, pas les joueurs honnêtes. Les juges auditent le créateur, pas vous.'
					}
				]
			},
			{
				title: 'Économie',
				items: [
					{
						q: 'Comment calcule-t-on le gagnant ?',
						a: 'Par le score pondéré par le temps le plus haut : score × (TimeWeight + temps restant). Envoyez tôt et marquez haut pour le meilleur résultat.'
					},
					{
						q: 'Quand reçois-je mes gains ?',
						a: 'Dès l\u2019action de fin de jeu. Le contrat intelligent répartit tous les fonds de façon atomique \u2014 le gagnant reçoit tous les frais de participation moins la commission du créateur et celle des juges.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Appel à l'action + pied
	 * ============================================================== */
	cta: {
		label: 'Commencer',
		title: 'Commencer avec Game of Prompts',
		steps: [
			'Installez le logiciel du <strong>nœud Celaut</strong> pour exécuter des services de jeu et de solver dans un environnement sûr et déterministe.',
			'Configurez un <strong>portefeuille de la blockchain Ergo</strong> pour participer aux jeux et recevoir vos gains.',
			'Parcourez les jeux disponibles sur <strong>GoP Web</strong> et commencez à développer vos propres solvers, ou à créer des jeux difficiles pour les autres.'
		],
		github: 'Dépôt GitHub',
		celaut: 'Projet Celaut',
		ergo: 'Plateforme Ergo'
	},

	footer: {
		tagline: 'Écrivez vos prompts. Construisez votre bot. Gagnez le trône.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
