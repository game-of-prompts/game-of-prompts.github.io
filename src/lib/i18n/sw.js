/*
 * src/lib/i18n/sw.js
 * ------------------------------------------------------------------
 * Kiswahili — tafsiri ya en.js, ufunguo kwa ufunguo.
 * `match` ni maneno-chochezi YALIYOTUMIKA katika nakala hii.
 */

export default {
	/* ============================================================== *
	 * Chrome shared by every control in the corner cluster
	 * ============================================================== */
	common: {
		languageLabel: 'Lugha',
		switchLanguage: 'Badilisha lugha',
		themeToLight: 'Badili kwenda mandhari angavu',
		themeToDark: 'Badili kwenda mandhari ya giza',
		backToTop: 'Rudi juu',
		scoring: 'ALAMA'
	},

	/* ============================================================== *
	 * The glossary
	 * ============================================================== */
	glossary: {
		/* Chrome */
		toggleOn: 'Eleza maneno ya kitaalamu',
		toggleOff: 'Ficha maelezo ya maneno',
		toggleLabel: 'Maelezo',
		close: 'Funga',
		explain: '"{term}" maana yake nini?',
		hintTitle: 'Maneno mengine yamepigwa mstari.',
		hintBody:
			'Gusa neno lolote lililopigwa mstari ili upate maelezo ya lugha ya kawaida. Zima wakati wowote kwa kitufe kilicho konani.',
		hintDismiss: 'Nimeelewa',

		terms: [
			{
				match: ['huduma-ya-mchezo', 'huduma ya mchezo'],
				title: 'Huduma-ya-mchezo',
				body: 'Changamoto yenyewe, imefungwa kama programu iliyofungwa ambayo mtu yeyote anaweza kupakua na kuendesha. Inashika sheria, alama, na siri iliyofichwa ya muundaji \u2014 kama karatasi ya mtihani iliyofungwa ambayo inajipima yenyewe.',
				more: 'Unaendesha kwenye mashine yako. Inatoa alama kwa bot yako na kutengeneza risiti ya kriptografia ambayo blockchain itakagua baadaye.'
			},
			{
				match: ['huduma-ya-solver', 'huduma ya solver', 'solver'],
				title: 'Huduma-ya-solver',
				body: 'Ingizo lako. Bot unayojenga ili kucheza mchezo, imefungwa namna iyo hiyo ili iende sawa kwenye mashine yoyote \u2014 mkakati wako kama sanduku moja linalosafirishwa.',
				more: 'Inakabidhiwa kwa huduma-ya-mchezo, ambayo inaiendesha peke yake na kutoa alama kwa alichofanya. Msimbo wako hauonekani na mtu mwingine.'
			},
			{
				match: ['GoP Web'],
				title: 'GoP Web',
				body: 'Tovuti ambako michezo inaorodheshwa: soma sheria, pakua mchezo, chapisha matokeo. Ni orodha na chombo cha kusaini, si mwamuzi \u2014 kilichoonyeshwa hakihitaji kuaminiwa tu.',
				more: 'Unaweza kuendesha nakala yako. Hiyo ndiyo maana: toleo la umma likipotea, michezo inaendelea.'
			},
			{
				match: ['Celaut'],
				title: 'Celaut',
				body: 'Mfumo unaoendesha kweli programu zilizofungwa. Unasakinisha mara moja, kisha kifurushi chochote cha mchezo au solver kinaweza kukabidhiwa mashine yako na kuendeshwa katika chumba chake kilichofungwa.',
				more: 'Ndiyo inayofanya "endesha mwenyewe" kuwa jambo halisi, si kauli: kifurushi kile kile kinafanya vile vile kwenye kila mashine inayokifungua.'
			},
			{
				match: ['node'],
				title: 'Node',
				body: 'Kompyuta moja inayoshiriki mtandao. Laptop yako, desktop ya ziada, seva kwenye rafu \u2014 ikiendesha programu na kuanza kuongea na mashine nyingine, hiyo ni node.',
				more: 'Hapa ni tu mashine inayoendesha michezo na solver. Yako, si kituo cha data cha mtu mwingine.'
			},
			{
				match: ['huduma'],
				title: 'Huduma',
				body: 'Kipande cha programu kinachojitegemea, kinachofanya kazi moja, na kinachoweza kukabidhiwa mashine yoyote kuendeshwa \u2014 karibu na kifaa kimoja kuliko programu nzima unayosakinisha.',
				more: 'Pande zote mbili za shindano hapa ni huduma: mchezo na bot inayoucheza.'
			},
			{
				match: ['blockchain'],
				title: 'Blockchain',
				body: 'Kitabu cha kumbukumbu kinachoshirikiwa, nakala zake zikiwa kwenye maelfu ya kompyuta pamoja. Kuongeza ingizo kunahitaji wengine wakubali ni halali, na yaliyopita hayawezi kuandikwa upya \u2014 hivyo mshiriki mmoja hashiki historia.',
				more: 'Inatumika hapa kwa kazi mbili nyembamba: kurekodi nani alidai alama gani, na kulipa mshindi. Si zaidi.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'Blockchain mahususi ambako jukwaa hili linarekodi matokeo na kumaliza malipo. ERG ni kitengo chake cha fedha.',
				more: 'Ni chaguo, si msingi: jukwaa halina sarafu yake.'
			},
			{
				match: ['smart contract', 'mkataba wa mchezo'],
				title: 'Smart contract',
				body: 'Programu inayoishi kwenye blockchain na kushika pesa chini ya sheria zilizoandikwa mapema. Masharti yakitimizwa inalipa yenyewe \u2014 hakuna anayesaini hundi, wala anayeweza kukataa.',
				more: 'Ndiyo maana zawadi iko salama kabla mtu hajashinda: fedha zinashikiliwa na sheria, si na aliyeziandika.'
			},
			{
				match: ['on-chain'],
				title: 'On-chain',
				body: 'Imeandikwa kwenye blockchain yenyewe, mahali kila mtu anaona na hakuna anayeweza kubadilisha kimya baadaye \u2014 tofauti na kukaa kwenye hifadhidata ya kampuni.'
			},
			{
				match: ['commitment', 'pre-commitment'],
				title: 'Commitment',
				body: 'Bahasha iliyofungwa. Unachapisha kitu kinachothibitisha ulichochagua, bila kufichua ni nini \u2014 na baadaye, bahasha ikifunguliwa, kila mtu anaweza kukagua hukubadilisha yaliyomo.',
				more: 'Ndiyo inayoruhusu alama kufungwa hadharani mchezo ukiwa bado unaendelea, bila kuwaambia wapinzani ulicheza vema kiasi gani.'
			},
			{
				match: ['hash', 'kumbukumbu zilizo-hash'],
				title: 'Hash',
				body: 'Alama fupi ya vidole inayokokotolewa kutoka data. Data ile ile daima inatoa alama ile ile, baiti moja ikibadilika inatoa nyingine kabisa, na huwezi kurudi nyuma kutoka alama hadi data.',
				more: 'Sifa hiyo ya njia moja ndiyo ujanja wote: unathibitisha kitu kinalingana bila kuonyesha ni nini.'
			},
			{
				match: ['siri', 'siri ya mchezo', 'siri ya biti 256'],
				title: 'Siri',
				body: 'Namba kubwa ya bahati nasibu ambayo muundaji hutengeneza na kuificha mchezo ukiwa wazi. Kila alama hufungwa kwayo, hivyo hakuna alama inayoweza kuthibitishwa \u2014 wala kughushiwa \u2014 hadi muundaji aichapisha.',
				more: 'Kuichapisha mwishoni ndiyo inayofanya matokeo ya kila mtu yakaguliwe wakati mmoja, si moja baada ya nyingine.'
			},
			{
				match: ['seed'],
				title: 'Seed',
				body: 'Namba ya kuanzia inayoamua hasa toleo gani la changamoto utakaloona \u2014 ubao upi, data gani ya soko, fumbo lipi. Seed ile ile, changamoto ile ile, kwa kila mtu.',
				more: 'Inafichuliwa tu baada ya maingizo kufungwa, ili mtu asirekebishe bot kwa mchezo mahususi mapema.'
			},
			{
				match: ['awamu ya sherehe', 'sherehe'],
				title: 'Awamu ya sherehe',
				body: 'Dirisha la mwanzo wa mchezo wachezaji wanapojisajili, na kila usajili unachanganya kidogo kutotabirika kwenye seed ya mwisho. Kama kila mtu anavyotupa kete kwenye kikombe kimoja kabla kifuniko hakijavuliwa.',
				more: 'Ipo ili muundaji naye asijue changamoto mapema \u2014 wachezaji kwa pamoja wanaiamua bila kukusudia.'
			},
			{
				match: ['Solver ID'],
				title: 'Solver ID',
				body: 'Alama ya kipekee ya vidole ya bot hasa uliyoisajili. Inataja toleo moja mahususi la msimbo wako, ili bot isibadilishwe kimya baada ya seed kufichuliwa.'
			},
			{
				match: ['Karatasi'],
				title: 'Karatasi',
				body: 'Sheria zilizoandikwa: changamoto ni nini, inapimwaje, nini huhesabiwa kuwa ingizo halali. Inachapishwa kabla mtu hajacheza, ili masharti yasibadilike watu wakiisha kujitolea.',
				more: 'Unatarajiwa kuweza kujenga ingizo lako kutoka hati hii peke yake.'
			},
			{
				match: ['mfuko'],
				title: 'Mfuko',
				body: 'Ada zote za kujiunga, zimekusanywa na kushikiliwa na mkataba hadi mchezo utakapotatuliwa. Kila anayeshindana analipa; mshindi anachukua kilichobaki baada ya makato yaliyokubaliwa.'
			},
			{
				match: ['ada ya kushiriki', 'ada ya kujiunga'],
				title: 'Ada ya kushiriki',
				body: 'Gharama ya kuwasilisha matokeo unayotaka yahesabiwe. Inaingia mfukoni, si kwa waandaaji, hivyo kila ingizo linakuza zawadi.',
				more: 'Unalipa tu ukiamua mchezo wako unafaa kuwasilishwa \u2014 kuendesha mchezo kwenye mashine yako ni bure.'
			},
			{
				match: ['kamisheni'],
				title: 'Kamisheni',
				body: 'Sehemu iliyokubaliwa ya mfuko inayokwenda kwa muundaji wa mchezo, mahakimu, na jukwaa. Inawekwa wazi mchezo unapochapishwa, na inakatwa moja kwa moja \u2014 si kujadiliwa baadaye.'
			},
			{
				match: ['hakimu', 'mahakimu'],
				title: 'Hakimu',
				body: 'Mtu kazi yake ni kukagua muundaji, si wachezaji: je mchezo ulitoa alama kwa uaminifu, na risiti zake ni halali? Akikamata udanganyifu, analipwa kutoka sehemu ya muundaji.',
				more: 'Kulipwa kwa kugundua ulaghai, si kwa kuidhinisha, ndiyo inayofanya nafasi hii kuwa na maana.'
			},
			{
				match: ['NFT'],
				title: 'NFT',
				body: 'Tokeni ya kipekee iliyorekodiwa kwenye blockchain, inayoweza kumilikiwa na kuhamishwa lakini si kunakiliwa. Hapa ni kombe: uthibitisho wa kudumu, wa umma, wa nani alishinda mchezo fulani.'
			},
			{
				match: ['wallet'],
				title: 'Wallet',
				body: 'Programu inayoshika funguo za fedha zako na kusaini vitendo vyako kwenye blockchain. Si akaunti ya kampuni \u2014 hakuna anayeweza kuifunga, wala anayeweza kuirejesha kwa ajili yako.'
			},
			{
				match: ['gas fee', 'ada ya mtandao'],
				title: 'Gas fee',
				body: 'Malipo madogo ili mtandao urekodi muamala wako. Inalipa kompyuta zinazorekodi, si jukwaa \u2014 kama stempu, si bei ya tiketi.'
			},
			{
				match: ['deterministic', 'determinism', 'inayojirudia'],
				title: 'Deterministic',
				body: 'Ingizo lile lile, tokeo lile lile, kila mara \u2014 kama kichocheo kinachotoa keki sawa katika jiko lolote, si kinachotegemea mpishi. Mashine, siku, wala mahali havibadilishi tokeo.',
				more: 'Ndiyo inayofanya alama ikaguliwe na mtu mwingine: anaweza kuendesha tena na lazima apate namba yako.'
			},
			{
				match: ['isolation', 'imetengwa', 'imefungwa', 'mazingira yaliyotengwa'],
				title: 'Isolation',
				body: 'Kuweka programu inayoenda ndani ya mpaka isioweza kuvuka \u2014 inaona tu kile ilichopewa, si mashine jirani wala kitu kingine kinachoenda pale.',
				more: 'Ndiyo inayoruhusu mchezo kuendesha bot ya mgeni kwa usalama, na wewe kuendesha mchezo wa mgeni kwa usalama.'
			},
			{
				match: ['obfuscation'],
				title: 'Obfuscation',
				body: 'Kuchanganya programu kwa makusudi ili iende vizuri kabisa lakini iwe ngumu kusoma \u2014 kama hati iliyochapishwa bila nafasi wala mistari mipya.',
				more: 'Inatumika hapa kuficha siri ya mchezo, hata kila mtu akiwa na nakala ya programu inayoishika.'
			},
			{
				match: ['peer-to-peer', 'P2P'],
				title: 'Peer-to-peer',
				body: 'Kompyuta mbili zinazoshughulikiana moja kwa moja, kama watu wawili kwenye simu \u2014 si wote kutuma kila kitu kupitia kampuni katikati, kama barua pepe au soko. Kila kompyuta ni "rika": sawa, hakuna mwenye mamlaka.',
				more: 'Inahusu hapa kwa sababu kampuni katikati ndiyo kawaida inayoweka bei, kuchukua sehemu, na kukuondoa.'
			},
			{
				match: ['self-hosting', 'self-hosted', 'endesha kwenye mashine yako', 'inaendeshwa kwenye mashine yako'],
				title: 'Self-hosting',
				body: 'Kuendesha nakala yako ya huduma kwenye mashine yako badala ya kutumia ya mtu mwingine. Kitu kinaendelea kufanya kazi hata toleo la umma likizimwa, likifichwa, au likiwa na siku mbaya.'
			},
			{
				match: ['decoy', 'alama za decoy', 'alama za juu bandia'],
				title: 'Decoy',
				body: 'Ingizo la kupotosha kwa makusudi \u2014 alama unazochapisha si za kweli \u2014 ili wapinzani wakisie vibaya jinsi ulivyocheza. Bluff, inawezekana kwa sababu hakuna anayeweza kusoma alama iliyofungwa.'
			},
			{
				match: ['alama yenye uzito wa muda', 'TimeWeight'],
				title: 'Alama yenye uzito wa muda',
				body: 'Alama iliyorekebishwa kulingana na ulivyowasilisha mapema. Matokeo mawili sawa hayafungamani: yaliyoingia mapema yanahesabiwa zaidi, hivyo kukaa na jibu zuri hadi tarehe ya mwisho kunakugharimu.'
			},
			{
				match: ['kipindi cha neema', 'kipindi cha uthibitisho', 'rejesho'],
				title: 'Kipindi cha neema',
				body: 'Dirisha la kusubiri lililojengwa katika sheria kabla pesa hazijahama \u2014 muda mahakimu kupinga, na muda wachezaji kudai ada zao zirejeshwe muundaji asiposuluhisha mchezo kabisa.',
				more: 'Ndiyo jibu la "je mratibu akatoweka tu": mkataba unawaruhusu wote waondoke na pesa zao.'
			},
			{
				match: ['CDE', 'utofauti wa hali'],
				title: 'Utofauti wa hali (CDE)',
				body: 'Kila endesho la mchezo linaweza kutofautiana kiasi gani na lile lililopita. Utofauti mkubwa unamaanisha bot inapaswa kucheza kweli, kwa sababu hakuna jibu moja tulivu la kukariri na kuweka gumu kwenye msimbo.'
			}
		]
	},

	/* ============================================================== *
	 * Splash screen
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'ANDIKA PROMPT ZAKO. JENGA BOT YAKO. SHINDA KITI CHA ENZI.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts \u2014 Andika prompt zako. Jenga bot yako. Shinda kiti cha enzi.',
		description:
			'Jukwaa la shindano ambapo waundaji hutengeneza huduma-ya-mchezo kupima solver za AI, huku wachezaji wakijenga huduma-ya-solver kuongeza alama \u2014 inayoendeshwa na blockchain ya Ergo na Celaut.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Andika prompt zako. Jenga bot yako. Shinda kiti cha enzi.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Andika prompt zako. <span class="hero-grad">Jenga bot yako.</span> Shinda kiti cha enzi.',
		lede: 'Jukwaa la shindano ambapo waundaji hutengeneza huduma-ya-mchezo kupima solver za AI, na wachezaji hujenga huduma-ya-solver kuongeza alama \u2014 zote zikirekodiwa na kuthibitishwa on-chain.',
		actions: {
			launch: 'Fungua Programu',
			github: 'Tazama kwenye GitHub',
			how: 'Ona jinsi inavyofanya kazi'
		},
		stats: [
			{ value: 'P2P', label: 'Imeenezwa \u2014 huduma zinaenda kwenye node yako ya Celaut' },
			{ value: 'On-chain', label: 'Matokeo yamewekwa commitment na kuthibitishwa kwenye Ergo' },
			{ value: 'Bila mpatanishi', label: 'Smart contract ndiyo inayosuluhisha mfuko, si kampuni' }
		],
		scroll: 'Sogeza'
	},

	/* ============================================================== *
	 * The seven pinned scenes
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'Wazo',
			beats: [
				{
					h: 'Mtu anaweka changamoto.',
					p: 'Muundaji anaunda mchezo wenye alama zinazopimika \u2014 na kuufunga kama <strong>huduma-ya-mchezo</strong>: huduma ya Celaut isiyobadilika inayoshika mantiki ya mchezo na siri yake.'
				},
				{
					h: 'Wengine wanajenga bot kuishinda.',
					p: 'Wachezaji huandika <strong>huduma-ya-solver</strong> \u2014 mkakati wao, umefungwa namna iyo hiyo. Huduma-ya-mchezo huendesha kila solver katika mazingira salama yaliyotengwa na kutoa alama kwa alichofanya.'
				},
				{
					h: 'Alama ya juu inashinda kiti cha enzi.',
					p: 'Hakuna jedwali la viongozi unalopaswa kuamini. Kila alama hufungwa kriptografia na <strong>kukamilishwa kwenye blockchain ya Ergo</strong>, ambako mtu yeyote anaweza kukagua hisabati.',
					note: 'Andika prompt zako. Jenga bot yako. Shinda kiti cha enzi.'
				}
			]
		},

		components: {
			label: 'Muundo',
			beats: [
				{
					h: 'Huduma ya Mchezo',
					p: 'Inajengwa na watengenezaji wa michezo. Huduma inayojitegemea inayofunga mantiki ya mchezo na siri. Inapima utendaji wa solver, kutengeneza alama, na kuunda <strong>commitment za kriptografia</strong> zinazohitajika kuthibitisha kwenye blockchain.'
				},
				{
					h: 'Huduma ya Solver',
					p: 'Inajengwa na wachezaji. Inatekeleza mikakati ya kuongeza alama katika mchezo mahususi. Solver inafungwa na kutumwa kwa huduma-ya-mchezo, ambayo <strong>inaiendesha katika mazingira salama yaliyotengwa</strong> ili ipimwe.'
				},
				{
					h: 'GoP Web',
					p: 'Lango la jamii. Gundua michezo, soma sheria, pakua huduma-ya-mchezo, na chapisha matokeo kwenye blockchain ya Ergo. <strong>Inaunga mkono self-hosting</strong> kwa uzoefu kamili bila mpatanishi, peer-to-peer.'
				},
				{
					h: 'Kila kitu kinaenda kwenye mashine yako.',
					p: 'Huduma za mchezo na solver zote zinaenda kwenye <strong>node ya Celaut ya hapa</strong>, inayoweza kufanya kazi nje ya mtandao kabisa. GoP Web inaweza kutumika kupitia GitHub.io au kuendeshwa kwenye mashine yako kama huduma ya Celaut.',
					note: 'Teknolojia mbili: Celaut kwa hesabu, Ergo kwa malipo.'
				}
			]
		},

		creator: {
			label: 'Mtiririko wa muundaji',
			beats: [
				{
					h: 'Buni mchezo.',
					p: 'Tengeneza changamoto yenye alama zinazopimika na utofauti mkubwa wa hali (CDE), ili suluhu zilizowekwa gumu zisifanye kazi.'
				},
				{
					h: 'Andika Karatasi.',
					p: 'Chapisha hati yenye maagizo yote, sheria, na vigezo vya kupima. Wachezaji wanapaswa kuelewa changamoto <strong>kabla</strong> hawajashiriki.'
				},
				{
					h: 'Tengeneza siri.',
					p: '<strong>Siri ya biti 256</strong> ya kipekee inategemeza commitment za kriptografia na uthibitisho wa alama baadaye. Hakuna anayeiona mchezo ukiwa wazi.'
				},
				{
					h: 'Funga na chapisha.',
					p: 'Tuma mchezo kama huduma ya Celaut na uuchapishe kupitia GoP Web pamoja na vigezo: ada, tarehe ya mwisho, na kamisheni.'
				},
				{
					h: 'Fichua siri.',
					p: 'Tarehe ya mwisho ikipita, muundaji <strong>anafichua siri on-chain</strong>. Hiyo inasuluhisha mchezo: uthibitisho wa alama unawezekana na smart contract inaweza kubaini mshindi.',
					note: 'Weka commitment kwanza, fichua baadaye. Ndiyo inayofanya iwe sawa.'
				}
			]
		},

		player: {
			label: 'Safari ya mchezaji',
			beats: [
				{
					h: 'Vinjari na soma Karatasi.',
					p: 'Tafuta mchezo kwenye GoP Web. Soma Karatasi ya muundaji ili uelewe changamoto, sheria, na vigezo vya kupima kabla hujajitolea chochote.'
				},
				{
					h: 'Tengeneza solver yako.',
					p: 'Jenga huduma-ya-solver kutoka Karatasi peke yake, ili iwe tayari kushindana seed inaposhuka.'
				},
				{
					h: 'Sajili Solver ID yako.',
					p: 'Usajili ni bure \u2014 unalipa tu gas fee ya mtandao. <strong>Pre-commitment</strong> hii ndiyo inayohakikisha usawa kabla seed haijafichuliwa.'
				},
				{
					h: 'Seed inafichuliwa.',
					p: 'Awamu ya sherehe ikisha, seed ya mchezo inakuwa ya umma. Sasa \u2014 na sasa tu \u2014 unajua vigezo hasa vya changamoto utakavyopimwa navyo.'
				},
				{
					h: 'Endesha huduma-ya-mchezo kwenye mashine yako.',
					p: 'Huduma inaiendesha solver yako katika mazingira salama pamoja na seed iliyofichuliwa, inapima utendaji, na kutengeneza <strong>commitment ya kriptografia</strong> inayohitajika kuthibitisha on-chain.'
				},
				{
					h: 'Wasilisha commitment na lipa ada.',
					p: 'Ikiwa alama inafaa kushindania, chapisha commitment on-chain na lipa ada ya kushiriki. <strong>Ada zote zinaingia mfukoni</strong> \u2014 mshindi anachukua zawadi ya kiuchumi, kukiwa kumeondolewa kamisheni ya muundaji, hakimu, na jukwaa, na anapokea NFT ya mchezo.',
					note: 'Wewe unaamua kama mchezo wako unafaa kuwasilishwa.'
				}
			]
		},

		validation: {
			label: 'Uthibitisho wa alama',
			beats: [
				{
					h: 'Alama yako ni hash, si dai.',
					p: 'Unaposhiriki, kinachoenda on-chain ni <strong>commitment</strong> \u2014 hash fupi. Hakuna mtu, wakiwemo muundaji, anayeweza kusoma alama yako kutoka blockchain mchezo ukiwa bado wazi.'
				},
				{
					h: 'Kisha siri inatoka.',
					p: 'Baada ya tarehe ya mwisho, muundaji anafichua siri ya mchezo katika muamala wa suluhisho. Hicho ndicho kiungo kilichokosekana \u2014 na <strong>kinafungua uthibitisho kwa kila mtu pamoja</strong>.'
				},
				{
					h: 'Mkataba unahesabu tena.',
					p: 'Mkataba wa mchezo huunda commitment kwa kila alama kutoka <strong>Solver ID, thamani ya alama, kumbukumbu zilizo-hash, na siri iliyofichuliwa</strong>. Hakuna mtu wa kuaminiwa; ni hisabati.'
				},
				{
					h: 'Zikilingana, alama ni halisi.',
					p: 'Commitment iliyohesabiwa tena ikilingana na iliyochapishwa inathibitisha alama ni halisi na haijachezewa. Kisicholingana si alama.',
					note: 'Wazi lakini binafsi: imethibitishwa bila kufichuliwa.'
				}
			]
		},

		pot: {
			label: 'Uchumi',
			beats: [
				{
					h: 'Kila ingizo linalisha mfuko.',
					p: 'Ada za kushiriki kutoka kila anayewasilisha commitment zinakusanyika katika mfuko mmoja on-chain wa mchezo huo.'
				},
				{
					h: 'Kamisheni zinakatwa mbele.',
					p: 'Muundaji, mahakimu, na jukwaa wanachukua kamisheni iliyokubaliwa \u2014 yote yaliwekwa wazi mchezo ulipochapishwa, na <strong>yanatekelezwa na smart contract</strong> si wema wa mtu.'
				},
				{
					h: 'Kilichobaki kwenda kwa mshindi.',
					p: 'Alama ya juu iliyothibitishwa inachukua mfuko uliobaki \u2014 pamoja na <strong>NFT ya mchezo</strong>, uthibitisho wa ushindi wa kudumu, wa umma, unaoweza kukaguliwa. Fedha zinatolewa baada ya kipindi cha uthibitisho kinachowapa mahakimu muda wa kukagua muundaji alifanya kwa uaminifu.',
					note: 'Hakuna anayeidhinisha malipo. Mkataba ndiyo unafanya.'
				}
			]
		},

		judges: {
			label: 'Imani na uwajibikaji',
			beats: [
				{
					h: 'Nani anamwangalia muundaji?',
					p: 'Mahakimu ni taasisi zilizoteuliwa na muundaji kukagua awamu ya suluhisho. Wanathibitisha kuwa huduma-ya-mchezo ya muundaji ilizalisha <strong>ithibati halali na alama halali</strong>.'
				},
				{
					h: 'Ulaghai unamgharimu muundaji, si wewe.',
					p: 'Hakimu akikamata huduma-ya-mchezo yenye hitilafu au ithibati batili, hakimu huyo <strong>anapokea kamisheni ya muundaji</strong> kama tuzo. Motisha ya kutazama kwa makini imejengwa ndani.'
				},
				{
					h: 'Wachezaji wako nje ya eneo la mlipuko.',
					p: 'Katika utendaji wa kawaida wachezaji hawawezi kuadhibiwa na mahakimu. Mahakimu wapo <strong>kulinda wachezaji dhidi ya waundaji wasioaminika</strong>, kamwe kinyume chake.',
					note: 'Kagua nyumba, si wageni.'
				}
			]
		}
	},

	/* ============================================================== *
	 * The readable reference list under the validation scene
	 * ============================================================== */
	steps: {
		title: 'Hatua tano, kwa mpangilio',
		items: [
			{
				badge: 'TUMWA',
				title: 'Ushiriki wa Mchezaji',
				desc: 'Mchezaji anachapisha ushiriki wake kwenye blockchain ya Ergo.'
			},
			{
				badge: 'FICHUA',
				title: 'Muundaji Anafichua Siri',
				desc: 'Baada ya tarehe ya mwisho, muundaji anafichua siri ya mchezo katika muamala wa suluhisho \u2014 kufungua uthibitisho.'
			},
			{
				badge: 'HESABU',
				title: 'Uthibitisho wa Smart Contract',
				desc: 'Mkataba wa mchezo huhesabu commitment kwa kila alama ukitumia Solver ID, thamani ya alama, kumbukumbu zilizo-hash, na siri iliyofichuliwa.'
			},
			{
				badge: 'SAHIHI',
				title: 'Uthibitisho wa Alama',
				desc: 'Commitment ya alama ikilingana na commitment ya ushiriki, alama hiyo inathibitishwa kuwa halisi na haijachezewa.'
			},
			{
				badge: 'GAWA',
				title: 'Mshindi Anachukua Mfuko',
				desc: 'Alama ya juu inashinda. Baada ya kipindi cha uthibitisho kuhakikisha muundaji alifanya kwa uaminifu, fedha zinatolewa kwa mshindi, baada ya ada za muundaji na hakimu.'
			}
		]
	},

	/* ============================================================== *
	 * Video
	 * ============================================================== */
	video: {
		label: 'Muhtasari',
		title: 'Tazama Maelezo',
		subtitle:
			'Elewa kwa dakika chache \u2014 ona jinsi Game of Prompts inavyounganisha blockchain na mashindano ya AI.',
		thumbAlt: 'Picha ndogo ya video ya Game of Prompts',
		iframeTitle: 'Game of Prompts \u2014 Maelezo Fupi'
	},

	/* ============================================================== *
	 * Security
	 * ============================================================== */
	security: {
		label: 'Usalama',
		title: 'Shindano Lililo Wazi Lakini Binafsi',
		subtitle:
			'Kriptografia inahakikisha shindano la haki huku ikilinda mikakati ya washiriki.',
		cards: [
			{
				title: 'Ulinzi wa Msimbo',
				desc: 'Mali miliki ya mchezo na siri ya mchezo zinalindwa kwa obfuscation ili kuzuia kugeuzwa nyuma.'
			},
			{
				title: 'Matokeo Binafsi',
				desc: 'Decoy za kimkakati na commitment za kriptografia zinaficha alama yako ya kweli, zikilinda mkakati hadi kufichuliwa mwisho.'
			},
			{
				title: 'Ithibati Isiyobadilika',
				desc: 'Uthibitisho wa mwisho kwenye blockchain ya Ergo unazalisha ithibati ya ushindi ya umma, isiyobadilika, na inayoweza kukaguliwa.'
			}
		]
	},

	/* ============================================================== *
	 * Game types
	 * ============================================================== */
	gameTypes: {
		title: 'Nini Kinaweza Kuwa Mchezo?',
		text: 'Game of Prompts ni jukwaa lenye matumizi mengi linaloweza kuchukua mashindano ya aina nyingi. Hivi ni mifano michache tu ya yanayowezekana.',
		eyebrow: 'Aina ya Mchezo {n}',
		items: [
			{
				title: 'Arcade ya Kale',
				desc: 'Solver ya AI inadhibiti mhusika katika mazingira ya mchezo ya kasi yanayotegemea ustadi. Mwitikio, kutambua mifumo, muda.',
				score: 'Pointi za mchezo \u00b7 Muda wa kudumu \u00b7 Viwango vilivyomalizika'
			},
			{
				title: 'Dunia Wazi',
				desc: 'Boresha hoja za nafasi, urambazaji, na kuzoea mazingira.',
				score: 'Ufanisi wa rasilimali \u00b7 Ugunduzi wa ramani \u00b7 Ugumu wa misheni'
			},
			{
				title: 'Biashara ya Fedha',
				desc: 'Bot dhidi ya soko. Nunua na uza mali pepe katika uigaji wa kweli ukitumia data ya historia au iliyotengenezwa. Mkakati mtupu, bahati sifuri.',
				score: 'Faida halisi \u00b7 Uwiano wa Sharpe \u00b7 Drawdown \u00b7 Viwango'
			},
			{
				title: 'Kukunja Protini',
				desc: 'Tabiri miundo ya protini ya 3D kutoka mfuatano wa asidi amino. Changamoto ya kweli ya sayansi \u2014 solver za AI zikiendeleza biolojia.',
				score: 'Uthabiti wa muundo \u00b7 Usahihi wa kukunja \u00b7 Ufanisi'
			}
		]
	},

	/* ============================================================== *
	 * Optional features
	 * ============================================================== */
	features: {
		title: 'Vipengele vya Hiari vya Mchezo',
		text: 'Waundaji wanaweza kuboresha michezo yao kwa mitambo ya hiari yenye nguvu \u2014 kutoka bluff ya poker hadi mipaka ya rasilimali na malipo-kwa-jaribio.',
		eyebrow: 'Kipengele {n}',
		status: {
			available: 'Inapatikana',
			research: 'Bado inatafitiwa'
		},
		items: [
			{
				title: 'Kikomo cha Rasilimali',
				desc: 'Changamoto ya kiufundi kwa kuzuia rasilimali za kompyuta. Ufanisi ndio mfalme.',
				bullets: [
					'Muundaji wa mchezo anaweka mipaka mahususi ya rasilimali za kompyuta',
					'Vizuizi: RAM ya juu, muda wa CPU, au tegemezi za huduma',
					'Inawalazimisha wachezaji kutengeneza suluhu zilizoboreshwa sana',
					'Inaongeza changamoto kubwa ya uhandisi kwenye mchezo'
				]
			},
			{
				title: 'Hali ya Poker',
				desc: 'Ushiriki wa kimkakati wenye hatari na tuzo. Bluff, beti, na zidisha alama zako.',
				bullets: [
					'Washiriki wanachagua kiasi cha kulipa (juu ya kiwango cha chini kilichowekwa)',
					'Malipo makubwa = kizidishi kikubwa cha alama ya mwisho (k.m. \u00d72, \u00d75)',
					'Wachezaji wanaweza kuwasilisha alama kadhaa za decoy',
					'Mkakati wa bluff: lipa ada kubwa + wasilisha alama za juu bandia kuogopesha',
					'Muundaji wa mchezo anaweka kizidishi cha alama kulingana na ada iliyolipwa'
				]
			},
			{
				title: 'Lipa kwa Jaribio',
				desc: 'Utaratibu unaoweka gharama kwa kila endesho la hapa, ukihimiza uundaji wa mawakala wa ubora badala ya kujaribu-na-kosa.',
				bullets: [
					'Gharama ya tokeni inayoongezeka kwa kila jaribio la kuendesha hapa',
					'Inahimiza uigaji mkali wa hapa na uboreshaji',
					'Inakatisha tamaa mikakati ya brute-force ya kipofu',
					'Kupanda kwa ugumu kunarekebishwa kabisa na muundaji wa mchezo'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 * ============================================================== */
	faq: {
		label: 'FAQ',
		title: 'Maswali Yanayoulizwa Mara kwa Mara',
		footerTitle: 'Bado una maswali?',
		footerDesc:
			'Nakili prompt hapa chini na ubandike kwenye msaidizi wowote wa AI \u2014 inajumuisha kiungo cha nyaraka zetu kamili.',
		copyPrompt: 'Nakili prompt',
		copied: 'Imenakiliwa!',
		orLabel: 'au fungua moja kwa moja katika:',
		disclaimerBefore: '⚠️ Majibu ya AI yanaweza yasiwe sahihi kabisa. Daima rejelea ',
		disclaimerLink: 'nyaraka rasmi',
		disclaimerAfter: ' kwa taarifa zenye mamlaka.',
		telegram: 'Jiunge na Jamii ya Telegram',
		groups: [
			{
				title: 'Jumla',
				items: [
					{
						q: 'Game of Prompts ni nini?',
						a: 'Shindano la bot linalokaguliwa na blockchain. Waundaji hutengeneza huduma-ya-mchezo kupima solver za AI, huku wachezaji wakijenga huduma-ya-solver kuongeza alama \u2014 zote zikithibitishwa kwenye blockchain ya Ergo.'
					},
					{
						q: '"Awamu ya Sherehe" ni nini?',
						a: 'Kipindi cha awali ambapo wachezaji wanasajili Solver ID zao ili kuongeza nasibu kwenye seed. Hii inamzuia Muundaji kuhesabu suluhu mapema na inahakikisha shindano la haki.'
					},
					{
						q: 'Nahitaji nini ili kucheza?',
						a: 'Wallet ya Ergo (yenye ERG kidogo kwa ada za kushiriki) na Node ya Celaut kuendesha huduma za mchezo na solver kwenye mashine yako.'
					}
				]
			},
			{
				title: 'Usalama',
				items: [
					{
						q: 'Najuaje mchezo ni wa haki?',
						a: 'Sheria za mchezo na hash zinasajiliwa on-chain tangu mwanzo. Haziwezi kubadilishwa \u2014 hakuna anayeweza kuzibadilisha baada ya kuchapishwa.'
					},
					{
						q: 'Je Muundaji anaweza kuiba fedha?',
						a: 'Hapana. Fedha zimefungwa katika Smart Contract, si wallet ya Muundaji. Ugawaji unashughulikiwa kwa pamoja na mkataba mchezo unapotatuliwa.'
					},
					{
						q: 'Je Muundaji akatoweka?',
						a: 'Baada ya Kipindi cha Neema, wachezaji wanaweza kuanzisha Hatua ya Rejesho ili kurudisha ada za kushiriki kutoka smart contract.'
					}
				]
			},
			{
				title: 'Mahakimu',
				items: [
					{
						q: 'Mahakimu ni nani?',
						a: 'Taasisi zilizoteuliwa na Muundaji kukagua awamu ya suluhisho. Wanathibitisha kuwa huduma-ya-mchezo ilizalisha ithibati halali.'
					},
					{
						q: 'Kwa nini Mahakimu wanapata pesa kwa kubatilisha ushiriki?',
						a: 'Wanagundua ulaghai wa Muundaji \u2014 motisha yao ni kukamata huduma-ya-mchezo yenye hitilafu. Wakipata matatizo, wanapokea kamisheni ya Muundaji kama tuzo.'
					},
					{
						q: 'Naweza kuadhibiwa kama mchezaji?',
						a: 'Mfumo unamuadhibu Muundaji/Huduma-ya-Mchezo, si wachezaji waaminifu. Mahakimu wanamkagua Muundaji, si wewe.'
					}
				]
			},
			{
				title: 'Uchumi',
				items: [
					{
						q: 'Mshindi anahesabiwaje?',
						a: 'Alama yenye Uzito wa Muda ya juu: Alama \u00d7 (TimeWeight + MudaUliobaki). Wasilisha mapema na pata alama za juu kwa tokeo bora.'
					},
					{
						q: 'Nitapokea lini ushindi wangu?',
						a: 'Mara moja kwenye hatua ya Maliza Mchezo. Smart Contract inagawanya fedha zote kwa pamoja \u2014 mshindi anapokea ada zote za kushiriki kukiwa kumeondolewa kamisheni ya muundaji na ada za hakimu.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Call to action + footer
	 * ============================================================== */
	cta: {
		label: 'Anza',
		title: 'Anza na Game of Prompts',
		steps: [
			'Sakinisha programu ya <strong>node ya Celaut</strong> ili kuendesha Huduma za Mchezo na Solver katika mazingira salama, deterministic.',
			'Weka <strong>wallet ya blockchain ya Ergo</strong> ili kushiriki michezo na kupokea ushindi.',
			'Vinjari michezo inayopatikana kwenye <strong>GoP Web</strong> na anza kutengeneza solver zako au unda michezo migumu kwa wengine.'
		],
		github: 'Hifadhi ya GitHub',
		celaut: 'Mradi wa Celaut',
		ergo: 'Jukwaa la Ergo'
	},

	footer: {
		tagline: 'Andika prompt zako. Jenga bot yako. Shinda kiti cha enzi.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
