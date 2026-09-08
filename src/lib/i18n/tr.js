/*
 * src/lib/i18n/tr.js
 * ------------------------------------------------------------------
 * Türkçe — en.js çevirisi, anahtar anahtar.
 *
 * Aynı yapı, aynı dizi uzunlukları. glossary.terms tam 33 kayıt
 * ve glossary/terms.js içindeki GLOSSARY_IDS ile konumla eşleşir.
 *
 * `match` başlık çevirisi değil: BU metinde altı çizilip tanımı açan
 * sözcükler. İngilizce -s/-es ekleri Türkçe çekime yetmez; kullanılan
 * çoğullar ve ekler (servisi, taahhüdü, yargıçlar…) açıkça yazılır.
 */

export default {
	/* ============================================================== *
	 * Köşe kümesinin ortak kontrolleri
	 * ============================================================== */
	common: {
		languageLabel: 'Dil',
		switchLanguage: 'Dili değiştir',
		themeToLight: 'Açık temaya geç',
		themeToDark: 'Koyu temaya geç',
		backToTop: 'Başa dön',
		scoring: 'PUANLANIYOR'
	},

	/* ============================================================== *
	 * Sözlük
	 * ============================================================== */
	glossary: {
		toggleOn: 'Teknik terimleri açıkla',
		toggleOff: 'Terim açıklamalarını gizle',
		toggleLabel: 'Açıklamalar',
		close: 'Kapat',
		explain: '«{term}» ne demek?',
		hintTitle: 'Bazı sözcüklerin altı çizili.',
		hintBody:
			'Altı çizili herhangi bir sözcüğe dokun, sade bir açıklama çıkar. İstediğin an köşedeki düğmeyle kapatırsın.',
		hintDismiss: 'Anladım',

		terms: [
			{
				match: [
					'oyun servisi',
					'oyun servisini',
					'oyun servisinin',
					'oyun servisleri',
					'oyun servislerini'
				],
				title: 'Oyun servisi',
				body: 'Görevin kendisi, herkesin indirip çalıştırabileceği mühürlü bir program olarak paketlenmiş. Kurallar, puanlama ve yaratanın gizlediği sır içinde durur — kendi kendini de notlayan, mühürlü bir sınav kâğıdı gibi.',
				more: 'Kendi makinenizde çalıştırırsınız. Botunuzu puanlar ve blokzincirin sonra kontrol edeceği kriptografik makbuzu üretir.'
			},
			{
				match: [
					'çözücü servisi',
					'çözücü servisini',
					'çözücü servisleri',
					'çözücü',
					'çözücüyü',
					'çözücüler',
					'çözücülerin'
				],
				title: 'Çözücü servisi',
				body: 'Sizin katılımınız. Oyunu oynamak için kurduğunuz bot, aynı mühürlü yolla paketlenir ki her makinede aynı çalışsın — stratejiniz, taşınabilir tek bir kutu.',
				more: 'Oyun servisine verilir; o da onu yalıtarak çalıştırır ve ne yaptığını puanlar. Kodu sizden başka kimse görmez.'
			},
			{
				match: ['GoP Web', 'topluluk portalı'],
				title: 'GoP Web',
				body: 'Oyunların listelendiği site: kuralları oku, bir oyunu indir, sonucunu yayınla. Bir dizin ve imza aracıdır, hakem değildir — gösterdiği hiçbir şeye güvenmek zorunda değilsiniz.',
				more: 'Kendi kopyanızı çalıştırabilirsiniz. Mesele bu: kamuya açık olan yok olsa da oyunlar sürer.'
			},
			{
				match: ['Celaut', 'Celaut düğümü', 'Celaut düğümünde'],
				title: 'Celaut',
				body: 'Mühürlü programları gerçekten çalıştıran sistem. Bir kez kurarsınız; o andan sonra herhangi bir oyun veya çözücü paketi makinenize verilip kendi kilitli odasında çalıştırılabilir.',
				more: '«Kendin çalıştır»ı slogan olmaktan çıkarıp gerçek yapan şey budur: aynı paket, onu açan her makinede aynı davranır.'
			},
			{
				match: ['düğüm', 'düğümü', 'düğümde', 'düğümler'],
				title: 'Düğüm',
				body: 'Ağa katılan bir bilgisayar. Dizüstü, kenarda duran bir masaüstü, raftaki bir sunucu — yazılımı çalıştırıp başka makinelerle konuşmaya başlayınca düğüm olur.',
				more: 'Burada yalnızca oyunları ve çözücüleri çalıştıran makinedir. Sizinki; birinin veri merkezi değil.'
			},
			{
				match: ['servis', 'servisi', 'servisler', 'servislerin'],
				title: 'Servis',
				body: 'Tek iş yapan, kendi başına duran bir yazılım parçası; herhangi bir makineye verilip çalıştırılabilir — kurduğunuz koca bir programdan çok, tek işlevli bir aygıta yakındır.',
				more: 'Bir yarışmanın iki yarısı da servistir: oyun ve onu oynayan bot.'
			},
			{
				match: [
					'blokzincir',
					'blokzinciri',
					'blokzincirde',
					'blokzincirin',
					'blokzincirinde'
				],
				title: 'Blokzincir',
				body: 'Binlerce bilgisayarın aynı anda kopyasını tuttuğu ortak bir kayıt defteri. Bir satır eklemek için diğerlerinin geçerli olduğunu kabul etmesi gerekir; geçmiş satırlar yeniden yazılamaz — tarihi tek kişi kontrol edemez.',
				more: 'Burada dar iki iş için kullanılır: kimin hangi puanı iddia ettiğini kaydetmek ve kazananı ödemek. Başka bir şey değil.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'Bu platformun sonuçları kaydettiği ve ödemeleri tasfiye ettiği belirli blokzincir. ERG onun para birimidir.',
				more: 'Bir seçimdir, temel değil: platformun kendi coini yoktur.'
			},
			{
				match: [
					'akıllı sözleşme',
					'akıllı sözleşmeler',
					'akıllı sözleşmenin',
					'oyun sözleşmesi',
					'sözleşme',
					'sözleşmesi',
					'sözleşmenin',
					'sözleşmeler'
				],
				title: 'Akıllı sözleşme',
				body: 'Blokzincirde yaşayan ve parayı önceden yazılmış kurallarla tutan bir program. Koşullar sağlanınca kendi öder — çek imzalayan yoktur, ödememeye karar veren de yoktur.',
				more: 'Kimse kazanmadan önce ödülün güvende olmasının nedeni budur: fonları tutan kurallardır, onları yazan kişi değil.'
			},
			{
				match: ['zincir üstü', 'on-chain'],
				title: 'Zincir üstü',
				body: 'Blokzincirin kendisine yazılmış; herkes görür, kimse sonra sessizce değiştirmez — bir şirketin özel veritabanında durmanın tersi.'
			},
			{
				match: [
					'kriptografik taahhüt',
					'kriptografik taahhüdü',
					'kriptografik taahhütler',
					'puan taahhüdü',
					'ön taahhüt',
					'taahhüt',
					'taahhüdü',
					'taahhütler'
				],
				title: 'Taahhüt',
				body: 'Mühürlü bir zarf. Ne seçtiğinizi kanıtlayan bir şey yayımlarsınız, ne olduğunu göstermeden — sonra zarf açılınca herkes içeriği değiştirmediğinizi denetleyebilir.',
				more: 'Oyun hâlâ açıkken bir puanın kamuya kilitlenmesini sağlar, rakiplere ne kadar iyi yaptığınızı söylemeden.'
			},
			{
				match: ['hashlenmiş günlükler', 'hash', 'özet değer'],
				title: 'Hash',
				body: 'Bir veri parçasından hesaplanan kısa parmak izi. Aynı veri her zaman aynı izi verir, tek bayt değişince iz bambaşka olur, izden veriye geri gidilemez.',
				more: 'Bu tek yönlülük bütün numara: ne olduğunu göstermeden eşleşmeyi kanıtlar.'
			},
			{
				match: [
					'256 bitlik sır',
					'oyun sırrı',
					'oyunun sırrı',
					'sır',
					'sırrı',
					'sırrın'
				],
				title: 'Sır',
				body: 'Yaratanın ürettiği ve oyun açıkken gizlediği büyük bir rastgele sayı. Her puan bununla mühürlenir; yaratan yayımlayana dek hiçbir puan doğrulanamaz — ya da sahte üretilemez.',
				more: 'Sonda yayımlamak, herkesin sonucunun aynı anda denetlenebilir olmasını sağlar; tek tek değil.'
			},
			{
				match: ['oyun tohumu', 'tohum', 'tohumu', 'tohumlar'],
				title: 'Tohum',
				body: 'Hangi görev sürümüyle karşılaşacağınızı kararlaştıran başlangıç sayısı — hangi tahta, hangi piyasa verisi, hangi bulmaca. Aynı tohum, herkes için aynı görev.',
				more: 'Kayıtlar kapandıktan sonra açıklanır; kimse o koşuya özel botunu önceden ayarlamasın diye.'
			},
			{
				match: ['tören evresi', 'tören dönemi', 'tören'],
				title: 'Tören evresi',
				body: 'Oyunun başında oyuncuların kaydolduğu pencere; her kayıt, nihai tohuma biraz öngörülemezlik katar. Kapak açılmadan herkesin aynı kaba zar atması gibi.',
				more: 'Yaratanın da görevi önceden bilememesi için vardır — oyuncular, istemeden, birlikte karar verir.'
			},
			{
				match: ['Solver ID', 'çözücü kimliği'],
				title: 'Solver ID',
				body: 'Kaydettiğiniz tam botun benzersiz parmak izi. Kodunuzun belirli bir sürümünü adlandırır; tohum açıklandıktan sonra bot sessizce başka biriyle değiştirilemez.'
			},
			{
				match: ['Paper', 'oyun Paper'],
				title: 'Paper',
				body: 'Yazılı kurallar: görev nedir, nasıl puanlanır, ne geçerli katılım sayılır. Kimse oynamadan önce yayımlanır; insanlar taahhüt ettikten sonra koşullar değişemesin diye.',
				more: 'Katılımınızı yalnızca bu belgeden kurabilmeniz beklenir.'
			},
			{
				match: ['havuz', 'havuzu', 'ödül havuzu'],
				title: 'Havuz',
				body: 'Tüm katılım ücretleri, oyun çözülene dek sözleşmenin tuttuğu tek yerde toplanır. Yarışan herkes yatırır; kazanan, kararlaştırılmış kesintilerden sonra kalanı alır.'
			},
			{
				match: [
					'katılım ücreti',
					'katılım ücretleri',
					'katılım ücretini',
					'giriş ücreti'
				],
				title: 'Katılım ücreti',
				body: 'Sayılmasını istediğiniz bir sonucu göndermenin bedeli. Düzenleyenlere değil havuza gider; her katılım ödülü büyütür.',
				more: 'Yalnızca o koşuyu göndermeye değer bulursanız ödersiniz — oyunu yerelde çalıştırmak ücretsizdir.'
			},
			{
				match: [
					'yaratan komisyonu',
					'komisyon',
					'komisyonu',
					'komisyonlar',
					'komisyonunu'
				],
				title: 'Komisyon',
				body: 'Havuzun, oyunun yaratanına, yargıçlarına ve platforma giden kararlaştırılmış dilimi. Oyun yayımlanırken açıkça konur ve otomatik alınır — sonradan pazarlık edilmez.'
			},
			{
				match: ['yargıç', 'yargıcı', 'yargıca', 'yargıçlar', 'yargıçların'],
				title: 'Yargıç',
				body: 'İşi oyuncuları değil yaratanı denetlemek olan kişi: oyun gerçekten dürüstçe mi puanladı, makbuzlar geçerli mi? Hile yakalarsa, yaratanın payından ödenir.',
				more: 'Onaylamak için değil dolandırıcılık bulmak için ödenmesi, bu rolü değerli kılar.'
			},
			{
				match: ['NFT', 'oyun NFT'],
				title: 'NFT',
				body: 'Blokzincire kaydedilmiş, sahip olunup devredilebilen ama kopyalanamayan tekil bir jeton. Burada kupa: belirli bir oyunu kimin kazandığının kalıcı, kamuya açık kanıtı.'
			},
			{
				match: ['Ergo cüzdanı', 'cüzdan', 'cüzdanı', 'cüzdanlar'],
				title: 'Cüzdan',
				body: 'Fonlarınızın anahtarlarını tutan ve blokzincirdeki işlemlerinize imza atan uygulama. Bir şirketteki hesap değil — kimse donduramaz, kimse sizin yerinize kurtaramaz.'
			},
			{
				match: ['ağ gaz ücreti', 'gaz ücreti', 'gaz ücretini', 'ağ ücreti'],
				title: 'Gaz ücreti',
				body: 'Ağın işleminizi kaydetmesi için alınan küçük ücret. Platforma değil, kaydı yapan bilgisayarlara gider — bilet fiyatından çok pul ücreti.'
			},
			{
				match: [
					'deterministik',
					'determinizm',
					'yeniden üretilebilir',
					'yeniden üretilebilirlik'
				],
				title: 'Deterministik',
				body: 'Aynı girdi, her seferinde aynı çıktı — aşçıya bağlı bir yemek değil, her mutfakta aynı pastayı veren bir tarif. Makine, gün, yer sonucu değiştirmez.',
				more: 'Bir puanın başkası tarafından denetlenebilmesinin nedeni budur: yeniden çalıştırınca sizin sayınız çıkmalıdır.'
			},
			{
				match: [
					'güvenli yalıtılmış ortam',
					'yalıtılmış ortam',
					'yalıtım',
					'yalıtarak',
					'mühürlü',
					'kum havuzu'
				],
				title: 'Yalıtım',
				body: 'Çalışan bir programı aşamayacağı bir sınırın içinde tutmak — yalnızca kendisine verileni görür; çevresindeki makineden ve orada çalışan başka her şeyden habersizdir.',
				more: 'Bir oyunun yabancı bir botu güvenle çalıştırmasını, sizin de yabancı bir oyunu güvenle çalıştırmanızı sağlayan şey budur.'
			},
			{
				match: ['gizleme', 'gizlenmiş', 'ofuskasyon'],
				title: 'Gizleme',
				body: 'Bir programı kasten karıştırmak; kusursuz çalışsın ama okuması acı versin — boşluksuz, satır sonu olmadan basılmış bir belgenin yazılım karşılığı.',
				more: 'Burada, herkes programın bir kopyasına sahip olsa bile oyunun gizlediği sırrı gizli tutmak için kullanılır.'
			},
			{
				match: ['eşler arası', 'peer-to-peer', 'P2P'],
				title: 'Eşler arası',
				body: 'İki bilgisayarın doğrudan muhatap olması, iki kişinin telefon konuşması gibi — e-posta veya bir pazar yeri gibi her şeyi ortadaki bir şirkete göndermek yerine. Her bilgisayar bir «eş»: eşit, kimse amir değil.',
				more: 'Burada önemlidir çünkü ortadaki şirket genellikle fiyatı koyan, payını alan ve sizi çıkarabilen taraftır.'
			},
			{
				match: [
					'kendi barındırma',
					'kendi barındırmayı',
					'yerelde çalıştırma',
					'yerelde çalıştırmak'
				],
				title: 'Kendi barındırma',
				body: 'Bir hizmetin kopyasını başkasınınkinde değil, kendi makinenizde çalıştırmak. Kamuya açık sürüm kapatılsa, sansürlense ya da yalnızca kötü bir gün geçirse bile iş yürümeye devam eder.'
			},
			{
				match: [
					'yem skor',
					'yem skorlar',
					'sahte yüksek skorlar',
					'yem',
					'yemler'
				],
				title: 'Yem',
				body: 'Kasten yanıltıcı bir katılım — gerçek olmayan, yayımladığınız bir puan — rakiplerin gerçekte ne kadar iyi yaptığınızı yanlış tahmin etmesi için. Mühürlü bir puanı kimse okuyamadığı için mümkün olan bir blöf.'
			},
			{
				match: ['zamana ağırlıklı skor', 'TimeWeight'],
				title: 'Zamana ağırlıklı skor',
				body: 'Ne kadar erken gönderdiğinize göre ayarlanmış bir puan. İki özdeş sonuç berabere kalmaz: önce giren daha ağır basar; iyi bir yanıtı son güne kadar bekletmek size mal olur.'
			},
			{
				match: ['ek süre', 'doğrulama süresi', 'iade', 'iadesi'],
				title: 'Ek süre',
				body: 'Para hareket etmeden önce kurallara gömülmüş bir bekleme penceresi — yargıçların itiraz etmesi, yaratan oyunu hiç çözmezse oyuncuların ücretlerini geri alması için zaman.',
				more: '«Düzenleyen ortadan kaybolursa» sorusunun yanıtıdır: sözleşme herkesin parasıyla çekip gitmesine izin verir.'
			},
			{
				match: ['CDE', 'senaryo değişkenliği', 'yüksek senaryo değişkenliği'],
				title: 'Senaryo değişkenliği (CDE)',
				body: 'Oyunun her çalışmasının bir öncekinden ne kadar farklı olabileceği. Yüksek değişkenlik, botun gerçekten iyi oynaması gerektiği demektir: ezberleyip koda gömülecek tek bir sabit yanıt yoktur.'
			}
		]
	},

	/* ============================================================== *
	 * Açılış ekranı
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'PROMPTUNU YAZ. BOTUNU KUR. TAHTI KAZAN.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Promptunu yaz. Botunu kur. Tahtı kazan.',
		description:
			'Yaratanların AI çözücüleri değerlendirmek için oyun servisleri tasarladığı, oyuncuların puanını yükseltmek için çözücü servisleri kurduğu rekabet platformu — Ergo blokzinciri ve Celaut ile.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Promptunu yaz. Botunu kur. Tahtı kazan.'
	},

	/* ============================================================== *
	 * Kahraman bölümü
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Promptunu yaz. <span class="hero-grad">Botunu kur.</span> Tahtı kazan.',
		lede: 'Yaratanların AI çözücüleri değerlendirmek için oyun servisleri tasarladığı, oyuncuların puanını yükseltmek için çözücü servisleri kurduğu rekabet platformu — kayıt ve doğrulama zincir üstü.',
		actions: {
			launch: 'Uygulamayı aç',
			github: 'GitHub üzerinde gör',
			how: 'Nasıl çalıştığını gör'
		},
		stats: [
			{ value: 'P2P', label: 'Merkeziyetsiz — servisler kendi Celaut düğümünüzde çalışır' },
			{ value: 'Zincir üstü', label: 'Sonuçlar taahhüt edilir ve Ergo üzerinde doğrulanır' },
			{ value: 'Güvene gerek yok', label: 'Havuzu şirket değil akıllı sözleşmeler tasfiye eder' }
		],
		scroll: 'Kaydır'
	},

	/* ============================================================== *
	 * Yedi sahne
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'Fikir',
			beats: [
				{
					h: 'Biri bir görev yayımlar.',
					p: 'Yaratan, ölçülebilir puanlaması olan bir oyun tasarlar ve onu <strong>oyun servisi</strong> olarak paketler: oyunun mantığını ve sırrını tutan, değişmez bir Celaut servisi.'
				},
				{
					h: 'Ötekiler onu yenecek bir bot kurar.',
					p: 'Oyuncular <strong>çözücü servisleri</strong> yazar — aynı yolla paketlenmiş stratejileri. Oyun servisi her çözücüyü güvenli, yalıtılmış bir ortamda çalıştırır ve ne yaptığını puanlar.'
				},
				{
					h: 'En yüksek puan tahtı kazanır.',
					p: 'Güvenmek zorunda olduğunuz bir sıralama yok. Her puan kriptografik olarak taahhüt edilir ve <strong>Ergo blokzincirinde tasfiye edilir</strong>; matematiği herkes denetleyebilir.',
					note: 'Promptunu yaz. Botunu kur. Tahtı kazan.'
				}
			]
		},

		components: {
			label: 'Mimari',
			beats: [
				{
					h: 'Oyun servisi',
					p: 'Oyun geliştirenler kurar. Mantığı ve sırrı kapsayan özerk bir servis. Çözücü başarımını değerlendirir, puan üretir ve blokzincir doğrulaması için gereken <strong>kriptografik taahhütleri</strong> oluşturur.'
				},
				{
					h: 'Çözücü servisi',
					p: 'Oyuncular kurar. Belirli bir oyunda puanı yükseltecek stratejileri uygular. Çözücü paketlenip oyun servisine gönderilir; o da değerlendirme için onu <strong>güvenli, yalıtılmış bir ortamda çalıştırır</strong>.'
				},
				{
					h: 'GoP Web',
					p: 'Topluluk portalı. Oyunları keşfedin, kuralları okuyun, oyun servislerini indirin, sonuçlarınızı Ergo blokzincirinde yayımlayın. Güvene gerek duymayan, eşler arası bir deneyim için <strong>kendi barındırmayı destekler</strong>.'
				},
				{
					h: 'Her şey sizin makinenizde çalışır.',
					p: 'Oyun ve çözücü servisleri bir <strong>yerel Celaut düğümünde</strong> çalışır; tamamen çevrimdışı da işleyebilir. GoP Web, GitHub.io örneğinden kullanılabilir veya Celaut servisi olarak yerelde çalıştırılabilir.',
					note: 'İki teknoloji: hesap için Celaut, tasfiye için Ergo.'
				}
			]
		},

		creator: {
			label: 'Oyun yaratanın akışı',
			beats: [
				{
					h: 'Bir oyun tasarla.',
					p: 'Ölçülebilir puanlama ve yüksek senaryo değişkenliği (CDE) olan bir görev oluşturun; koda gömülü çözümler işe yaramasın.'
				},
				{
					h: 'Paper yaz.',
					p: 'Tüm yönergeleri, kuralları ve değerlendirme ölçütlerini içeren bir belge yayımlayın. Oyuncular görevi katılmadan <strong>önce</strong> anlayabilmelidir.'
				},
				{
					h: 'Bir sır üret.',
					p: 'Benzersiz bir <strong>256 bitlik sır</strong> kriptografik taahhütleri ve sonraki puan doğrulamasını taşır. Oyun açıkken kimse göremez.'
				},
				{
					h: 'Paketle ve yayımlayın.',
					p: 'Oyunu bir Celaut servisi olarak çıkarın ve GoP Web üzerinden parametreleriyle yayımlayın: ücret, son tarih, komisyon.'
				},
				{
					h: 'Sırrı açıkla.',
					p: 'Son tarih geçince yaratan <strong>sırrı zincir üstünde açıklar</strong>. Oyun çözülür: puan doğrulaması mümkün olur ve akıllı sözleşme kazananı belirleyebilir.',
					note: 'Önce taahhüt, sonra açıklama. Adalet bundan gelir.'
				}
			]
		},

		player: {
			label: 'Oyuncunun yolu',
			beats: [
				{
					h: 'Gezin ve Paper oku.',
					p: 'GoP Web üzerinde bir oyun bulun. Bir şeye taahhüt etmeden önce Paper belgesini okuyup görevi, kuralları ve değerlendirme ölçütlerini anlayın.'
				},
				{
					h: 'Çözücünü uygula.',
					p: 'Çözücü servisini yalnızca Paperdan kurun; tohum düşer düşmez yarışmaya hazır olsun.'
				},
				{
					h: 'Solver ID kaydet.',
					p: 'Kayıt ücretsizdir — yalnızca ağ gaz ücretini karşılarsınız. Bu <strong>ön taahhüt</strong>, tohum açıklanmadan önce adaleti güvenceye alır.'
				},
				{
					h: 'Tohum açıklanır.',
					p: 'Tören evresi bitince oyun tohumu kamuya açılır. Şimdi — ve yalnızca şimdi — değerlendirileceğiniz tam görev parametrelerini bilirsiniz.'
				},
				{
					h: 'Oyun servisini yerelde çalıştır.',
					p: 'Servis, açıklanan tohumla çözücünüzü güvenli bir ortamda çalıştırır, başarımını değerlendirir ve zincir üstü doğrulama için gereken <strong>kriptografik taahhüdü</strong> üretir.'
				},
				{
					h: 'Taahhüdünü gönder ve ücreti öde.',
					p: 'Puan yarışmaya değiyorsa taahhüdü zincir üstünde yayımlayın ve katılım ücretini ödeyin. <strong>Tüm ücretler havuza gider</strong> — kazanan ekonomik ödülü alır, yaratan, yargıç ve platform komisyonu düşülür, oyun NFT verilir.',
					note: 'Koşunuzu göndermeye değip değmediğine siz karar verirsiniz.'
				}
			]
		},

		validation: {
			label: 'Puan doğrulama',
			beats: [
				{
					h: 'Puanınız bir iddia değil, bir hash.',
					p: 'Katıldığınızda zincir üstüne giden şey bir <strong>taahhüt</strong> — bir özet değer. Yaratan dahil kimse, oyun açıkken puanınızı blokzincirden okuyamaz.'
				},
				{
					h: 'Sonra sır ortaya çıkar.',
					p: 'Son tarihten sonra yaratan, çözüm işleminde oyun sırrını açıklar. Eksik malzeme odur — ve <strong>herkes için doğrulamayı bir anda açar</strong>.'
				},
				{
					h: 'Sözleşme yeniden hesaplar.',
					p: 'Oyun sözleşmesi her puan için <strong>çözücü kimliği, puan değeri, hashlenmiş günlükler ve açıklanan sır</strong>dan bir taahhüt kurar. Güvenilen taraf yoktur; aritmetiktir.'
				},
				{
					h: 'Eşleşirlerse puan gerçektir.',
					p: 'Yeniden hesaplanan taahhüt yayımlananla eşitse puanın özgün ve dokunulmamış olduğunu kanıtlar. Eşleşmeyen şey puan değildir.',
					note: 'Hem şeffaf hem özel: ifşa etmeden kanıtlanmış.'
				}
			]
		},

		pot: {
			label: 'Ekonomi',
			beats: [
				{
					h: 'Her katılım havuzu besler.',
					p: 'Taahhüt gönderen herkesin katılım ücretleri, o oyun için tek bir zincir üstü havuzda birikir.'
				},
				{
					h: 'Komisyonlar tepeden kesilir.',
					p: 'Yaratan, yargıçlar ve platform kararlaştırılmış komisyonunu alır — oyun yayımlanırken açıkça konmuş ve kimsenin iyiniyetiyle değil <strong>akıllı sözleşmeyle uygulanır</strong>.'
				},
				{
					h: 'Kalan kazananın.',
					p: 'En yüksek doğrulanmış puan kalan havuzu alır — artı <strong>oyun NFT</strong>, kalıcı, kamuya açık, denetlenebilir bir zafer kanıtı. Fonlar, yargıçlara yaratanın dürüst davrandığını kontrol edecek doğrulama süresinden sonra salınır.',
					note: 'Ödemeyi kimse onaylamaz. Sözleşme yapar.'
				}
			]
		},

		judges: {
			label: 'Güven ve hesap verebilirlik',
			beats: [
				{
					h: 'Yaratanı kim izler?',
					p: 'Yargıçlar, yaratanın aday gösterdiği ve çözüm evresini denetleyen taraflardır. Oyun servisinin <strong>geçerli kanıtlar ve geçerli puanlar</strong> ürettiğini doğrularlar.'
				},
				{
					h: 'Dolandırıcılık yaratanıya patlar, size değil.',
					p: 'Bir yargıç kusurlu bir oyun servisi veya geçersiz bir kanıt yakalarsa, o yargıç ödül olarak <strong>yaratan komisyonunu alır</strong>. Yakından bakma dürtüsü baştan gömülüdür.'
				},
				{
					h: 'Oyuncular patlama yarıçapının dışında kalır.',
					p: 'Normal işleyişte yargıçlar oyuncuları cezalandıramaz. Yargıçlar <strong>oyuncuları dürüst olmayan yaratanlardan korumak</strong> için vardır, tersi için değil.',
					note: 'Evi denetle, konukları değil.'
				}
			]
		}
	},

	/* ============================================================== *
	 * Doğrulama sahnesinin altındaki başvuru listesi
	 * ============================================================== */
	steps: {
		title: 'Beş adım, sırayla',
		items: [
			{
				badge: 'GÖNDERİLDİ',
				title: 'Oyuncu katılımı',
				desc: 'Oyuncu katılımını Ergo blokzincirinde yayımlar.'
			},
			{
				badge: 'AÇIKLANDI',
				title: 'Yaratan sırrı açıklar',
				desc: 'Son tarihten sonra yaratan, çözüm işleminde oyun sırrını açıklar — doğrulamayı açar.'
			},
			{
				badge: 'HESAPLANDI',
				title: 'Akıllı sözleşme doğrulaması',
				desc: 'Oyun sözleşmesi her puan için çözücü kimliği, puan değeri, hashlenmiş günlükler ve açıklanan sırla bir taahhüt hesaplar.'
			},
			{
				badge: 'DOĞRULANDI',
				title: 'Puan doğrulaması',
				desc: 'Puan taahhüdü katılım taahhüdüyle eşleşince o puan özgün ve dokunulmamış sayılır.'
			},
			{
				badge: 'DAĞITILDI',
				title: 'Kazanan havuzu alır',
				desc: 'En yüksek puan kazanır. Oyun yaratanının dürüst davrandığını doğrulayan bir süreden sonra fonlar, yaratan ve yargıç kesintileri düşülerek kazanana salınır.'
			}
		]
	},

	/* ============================================================== *
	 * Video
	 * ============================================================== */
	video: {
		label: 'Genel bakış',
		title: 'Özeti izle',
		subtitle:
			'Dakikalar içinde yetişin — Game of Prompts blokzinciri ve AI yarışmalarını nasıl bir araya getirir.',
		thumbAlt: 'Game of Prompts video küçük resmi',
		iframeTitle: 'Game of Prompts — Kısa özet'
	},

	/* ============================================================== *
	 * Güvenlik
	 * ============================================================== */
	security: {
		label: 'Güvenlik',
		title: 'Hem şeffaf hem özel yarışma',
		subtitle: 'Kriptografi adil yarışmayı sağlar, katılımcıların stratejisini korur.',
		cards: [
			{
				title: 'Kod koruması',
				desc: 'Oyunun fikri mülkiyeti ve oyun sırrı, tersine mühendisliği önlemek için gizleme ile korunur.'
			},
			{
				title: 'Özel sonuçlar',
				desc: 'Stratejik yemler ve kriptografik taahhütler gerçek puanınızı gizler, stratejinizi son açıklamaya dek korur.'
			},
			{
				title: 'Değişmez kanıt',
				desc: 'Ergo blokzincirindeki nihai doğrulama kamuya açık, değişmez ve denetlenebilir bir zafer kanıtı üretir.'
			}
		]
	},

	/* ============================================================== *
	 * Oyun türleri
	 * ============================================================== */
	gameTypes: {
		title: 'Ne bir oyun olabilir?',
		text: 'Game of Prompts, çok farklı yarışmaları barındırabilen esnek bir platformdur. Bunlar yapılabileceklerin yalnızca birkaç örneği.',
		eyebrow: 'Oyun türü {n}',
		items: [
			{
				title: 'Klasik arcade',
				desc: 'AI çözücü, hızlı ve beceriye dayalı oyun ortamlarında karakteri kontrol eder. Refleks, örüntü tanıma, zamanlama.',
				score: 'Oyun puanı · Hayatta kalma süresi · Geçilen seviyeler'
			},
			{
				title: 'Açık dünya',
				desc: 'Uzamsal akıl yürütme, gezinme ve çevreye uyumu eniyileyin.',
				score: 'Kaynak verimi · Harita keşfi · Görev karmaşıklığı'
			},
			{
				title: 'Finansal alım satım',
				desc: 'Bot piyasaya karşı. Tarihsel veya sentetik veriyle gerçekçi simülasyonlarda sanal varlık ticareti. Saf strateji, sıfır şans.',
				score: 'Net kâr · Sharpe oranı · Düşüş · Kıyaslar'
			},
			{
				title: 'Protein katlama',
				desc: 'Amino asit dizilerinden 3B protein yapılarını tahmin edin. Gerçek bir bilim görevi — biyolojiyi ileri taşıyan AI çözücüler.',
				score: 'Yapısal kararlılık · Katlama doğruluğu · Verim'
			}
		]
	},

	/* ============================================================== *
	 * İsteğe bağlı özellikler
	 * ============================================================== */
	features: {
		title: 'İsteğe bağlı oyun özellikleri',
		text: 'Yaratanlar oyunlarına güçlü isteğe bağlı mekanikler ekleyebilir — poker blöfünden kaynak kısıtlarına ve deneme başı ödemeye.',
		eyebrow: 'Özellik {n}',
		status: {
			available: 'Hazır',
			research: 'Araştırma altında'
		},
		items: [
			{
				title: 'Kaynak sınırı',
				desc: 'Hesap kaynaklarını kısarak teknik görev. Verim kraldır.',
				bullets: [
					'Oyun yaratanı hesap kaynaklarına somut sınırlar koyar',
					'Kısıtlar: azami RAM, CPU süresi veya servis bağımlılıkları',
					'Oyuncuları son derece verimli, eniyilenmiş çözümler geliştirmeye zorlar',
					'Oyuna ciddi bir mühendislik görevi katar'
				]
			},
			{
				title: 'Poker kipi',
				desc: 'Risk ve ödülle stratejik katılım. Blöf yapın, bahis koyun, puanınızı çarpın.',
				bullets: [
					'Katılımcılar (konmuş bir tabanın üstünde) ne kadar ödeyeceğini seçer',
					'Daha yüksek ödeme = daha yüksek nihai puan çarpanı (ör. ×2, ×5)',
					'Oyuncular birden fazla yem skor gönderebilir',
					'Blöf stratejisi: yüksek ücret öde + sahte yüksek skorlar gönder, korkut',
					'Oyun yaratanı, ödenen ücrete göre puan çarpanını koyar'
				]
			},
			{
				title: 'Deneme başı ödeme',
				desc: 'Her yerel çalıştırmaya bir maliyet bağlayan, deneme-yanılmadan çok iyi kurulmuş etmenleri teşvik eden bir düzenek.',
				bullets: [
					'Her yerel çalıştırma denemesinde artan jeton maliyeti',
					'Sıkı yerel simülasyon ve eniyilemeyi teşvik eder',
					'Kör kaba kuvvet stratejilerini caydırır',
					'Zorluk ölçeklemesi oyun yaratanı tarafından tamamen ayarlanır'
				]
			}
		]
	},

	/* ============================================================== *
	 * SSS
	 * ============================================================== */
	faq: {
		label: 'SSS',
		title: 'Sık sorulan sorular',
		footerTitle: 'Hâlâ sorunuz mu var?',
		footerDesc:
			'Aşağıdaki promptu kopyalayıp herhangi bir AI asistanına yapıştırın — tam belgelere bir bağlantı içerir.',
		copyPrompt: 'Promptu kopyala',
		copied: 'Kopyalandı!',
		orLabel: 'veya doğrudan şurada açın:',
		disclaimerBefore: '⚠️ AI yanıtları tam doğru olmayabilir. Yetkin bilgi için her zaman ',
		disclaimerLink: 'resmi belgelere',
		disclaimerAfter: ' bakın.',
		telegram: 'Telegram topluluğuna katıl',
		groups: [
			{
				title: 'Genel',
				items: [
					{
						q: 'Game of Prompts nedir?',
						a: 'Blokzincirin denetlediği bir bot yarışması. Yaratanlar AI çözücüleri değerlendirmek için oyun servisleri tasarlar, oyuncular puanını yükseltmek için çözücü servisleri kurar — hepsi Ergo blokzincirinde doğrulanır.'
					},
					{
						q: '«Tören evresi» nedir?',
						a: 'Oyuncuların Solver ID kaydederek tohuma rastgelelik kattığı ilk dönem. Yaratanın çözümleri önceden hesaplamasını engeller ve adil yarışmayı güvenceye alır.'
					},
					{
						q: 'Oynamak için ne gerekir?',
						a: 'Bir Ergo cüzdanı (katılım ücretleri için biraz ERG) ve oyun ile çözücü servislerini yerelde çalıştırmak için bir Celaut düğümü.'
					}
				]
			},
			{
				title: 'Güvenlik',
				items: [
					{
						q: 'Oyunun adil olduğunu nasıl bilirim?',
						a: 'Oyun kuralları ve hashS baştan zincir üstüne kaydedilir. Değişmezdir — yayımladıktan sonra kimse değiştiremez.'
					},
					{
						q: 'Yaratan fonları çalabilir mi?',
						a: 'Hayır. Fonlar yaratanın cüzdanında değil, bir akıllı sözleşmede kilitlidir. Dağıtımı, oyun çözülünce sözleşme atomik olarak yapar.'
					},
					{
						q: 'Yaratan ortadan kaybolursa?',
						a: 'Bir ek süre sonra oyuncular bir iade eylemi tetikleyip katılım ücretlerini akıllı sözleşmeden geri alabilir.'
					}
				]
			},
			{
				title: 'Yargıçlar',
				items: [
					{
						q: 'Yargıçlar kim?',
						a: 'Yaratanın aday gösterdiği, çözüm evresini denetleyen taraflar. Oyun servisinin geçerli kanıtlar ürettiğini doğrularlar.'
					},
					{
						q: 'Yargıçlar bir katılımı geçersiz kılınca neden para kazanır?',
						a: 'Yaratan dolandırıcılığını yakalarlar — dürtüleri kusurlu oyun servislerini bulmaktır. Sorun bulunca ödül olarak yaratan komisyonunu alırlar.'
					},
					{
						q: 'Oyuncu olarak cezalandırılabilir miyim?',
						a: 'Sistem dürüst oyuncuları değil yaratanı / oyun servisini cezalandırır. Yargıçlar sizi değil yaratanı denetler.'
					}
				]
			},
			{
				title: 'Ekonomi',
				items: [
					{
						q: 'Kazanan nasıl hesaplanır?',
						a: 'En yüksek zamana ağırlıklı skor: Puan × (TimeWeight + Kalan süre). En iyi sonuç için erken gönderin ve yüksek puan alın.'
					},
					{
						q: 'Kazancımı ne zaman alırım?',
						a: 'Oyun bitirme eylemi olur olmaz. Akıllı sözleşme tüm fonları atomik dağıtır — kazanan, yaratan komisyonu ve yargıç ücretleri düşülmüş bütün katılım ücretlerini alır.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Çağrı + altbilgi
	 * ============================================================== */
	cta: {
		label: 'Başla',
		title: 'Game of Prompts ile başla',
		steps: [
			'Oyun ve çözücü servislerini güvenli, deterministik bir ortamda çalıştırmak için <strong>Celaut düğümü</strong> yazılımını kurun.',
			'Oyunlara katılmak ve kazanç almak için bir <strong>Ergo blokzincir cüzdanı</strong> kurun.',
			'<strong>GoP Web</strong> üzerindeki oyunlara bakın; kendi çözücülerinizi geliştirmeye veya başkaları için zor oyunlar yaratmaya başlayın.'
		],
		github: 'GitHub deposu',
		celaut: 'Celaut projesi',
		ergo: 'Ergo platformu'
	},

	footer: {
		tagline: 'Promptunu yaz. Botunu kur. Tahtı kazan.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
