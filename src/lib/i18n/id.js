/*
 * src/lib/i18n/id.js
 * ------------------------------------------------------------------
 * Bahasa Indonesia — terjemahan dari en.js, kunci demi kunci.
 * `match` adalah kata pemicu YANG DIPAKAI di salinan ini.
 */

export default {
	/* ============================================================== *
	 * Chrome shared by every control in the corner cluster
	 * ============================================================== */
	common: {
		languageLabel: 'Bahasa',
		switchLanguage: 'Ganti bahasa',
		themeToLight: 'Beralih ke tema terang',
		themeToDark: 'Beralih ke tema gelap',
		backToTop: 'Kembali ke atas',
		scoring: 'NILAI'
	},

	/* ============================================================== *
	 * The glossary
	 * ============================================================== */
	glossary: {
		/* Chrome */
		toggleOn: 'Jelaskan istilah teknis',
		toggleOff: 'Sembunyikan penjelasan istilah',
		toggleLabel: 'Penjelasan',
		close: 'Tutup',
		explain: 'Apa arti "{term}"?',
		hintTitle: 'Beberapa kata digarisbawahi.',
		hintBody:
			'Ketuk kata yang digarisbawahi untuk penjelasan bahasa sehari-hari. Matikan kapan saja dengan tombol di sudut.',
		hintDismiss: 'Mengerti',

		terms: [
			{
				match: ['layanan-game', 'layanan game'],
				title: 'Layanan-game',
				body: 'Tantangannya sendiri, dikemas sebagai program tersegel yang siapa pun bisa unduh dan jalankan. Isinya aturan, penilaian, dan rahasia tersembunyi pembuatnya \u2014 seperti kertas ujian tersegel yang ikut menandai sendiri.',
				more: 'Anda menjalankannya di mesin sendiri. Ia menilai bot Anda dan membuat tanda terima kriptografis yang nanti diperiksa blockchain.'
			},
			{
				match: ['layanan-solver', 'layanan solver', 'solver'],
				title: 'Layanan-solver',
				body: 'Entri Anda. Bot yang Anda bangun untuk bermain, dikemas dengan cara tersegel yang sama agar berjalan identik di mesin mana pun \u2014 strategi Anda dalam satu kotak yang bisa dibawa.',
				more: 'Diserahkan ke layanan-game, yang menjalankannya terpisah dan menilai apa yang dilakukannya. Kode Anda hanya Anda yang melihat.'
			},
			{
				match: ['GoP Web'],
				title: 'GoP Web',
				body: 'Situs tempat game didaftar: baca aturan, unduh game, terbitkan hasil. Ini direktori dan alat tanda tangan, bukan wasit \u2014 apa yang ditampilkannya tidak wajib dipercaya begitu saja.',
				more: 'Anda bisa menjalankan salinan sendiri. Itulah intinya: jika yang publik hilang, gamenya tetap jalan.'
			},
			{
				match: ['Celaut'],
				title: 'Celaut',
				body: 'Sistem yang benar-benar menjalankan program tersegel. Dipasang sekali, lalu paket game atau solver mana pun bisa diserahkan ke mesin Anda dan dijalankan di ruang terkunci sendiri.',
				more: 'Inilah yang membuat "jalankan sendiri" nyata, bukan slogan: paket yang sama berperilaku sama di setiap mesin yang membukanya.'
			},
			{
				match: ['node'],
				title: 'Node',
				body: 'Satu komputer yang ikut dalam jaringan. Laptop Anda, desktop cadangan, server di rak \u2014 begitu menjalankan perangkat lunaknya dan mulai bicara dengan mesin lain, itu sebuah node.',
				more: 'Di sini itu hanya mesin yang menjalankan game dan solver. Milik Anda, bukan pusat data orang lain.'
			},
			{
				match: ['layanan'],
				title: 'Layanan',
				body: 'Sepotong perangkat lunak mandiri yang mengerjakan satu tugas dan bisa diserahkan ke mesin mana pun untuk dijalankan \u2014 lebih dekat ke satu alat daripada program utuh yang Anda instal.',
				more: 'Kedua belah sisi kompetisi di sini adalah layanan: gamenya dan bot yang memainkannya.'
			},
			{
				match: ['blockchain'],
				title: 'Blockchain',
				body: 'Buku catatan bersama yang disalin ribuan komputer sekaligus. Menambah entri mensyaratkan yang lain setuju itu sah, dan entri lama tidak bisa ditulis ulang \u2014 jadi tidak ada satu peserta pun yang menguasai sejarahnya.',
				more: 'Dipakai di sini untuk dua pekerjaan sempit: mencatat siapa mengklaim skor berapa, dan membayar pemenang. Tidak lebih.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'Blockchain khusus tempat platform ini mencatat hasil dan menyelesaikan pembayaran. ERG adalah satuan mata uangnya.',
				more: 'Ini pilihan, bukan fondasi: platform ini tidak punya koin sendiri.'
			},
			{
				match: ['kontrak pintar', 'kontrak game'],
				title: 'Kontrak pintar',
				body: 'Program yang tinggal di blockchain dan menahan uang menurut aturan yang ditulis di muka. Ketika syarat terpenuhi ia membayar sendiri \u2014 tidak ada yang menandatangani cek, dan tidak ada yang bisa membatalkan.',
				more: 'Itulah sebabnya hadiah aman sebelum ada yang menang: dananya dipegang aturan, bukan orang yang menulisnya.'
			},
			{
				match: ['on-chain'],
				title: 'On-chain',
				body: 'Tertulis di blockchain itu sendiri, tempat semua orang bisa melihatnya dan tidak ada yang bisa mengubahnya diam-diam nanti \u2014 lawan dari duduk di basis data pribadi sebuah perusahaan.'
			},
			{
				match: ['komitmen', 'pra-komitmen'],
				title: 'Komitmen',
				body: 'Amplop tersegel. Anda menerbitkan sesuatu yang membuktikan apa yang Anda pilih, tanpa membuka isinya \u2014 dan nanti, ketika amplop dibuka, semua orang bisa memeriksa Anda tidak menukar isinya.',
				more: 'Inilah yang membuat skor terkunci di muka umum sementara game masih berjalan, tanpa memberi tahu lawan seberapa baik hasil Anda.'
			},
			{
				match: ['hash', 'log yang di-hash'],
				title: 'Hash',
				body: 'Sidik jari pendek yang dihitung dari sepotong data. Data yang sama selalu memberi sidik jari yang sama, satu byte berubah memberi yang sama sekali berbeda, dan Anda tidak bisa bekerja mundur dari sidik jari ke datanya.',
				more: 'Sifat satu arah itu seluruh triknya: Anda bisa membuktikan sesuatu cocok tanpa menunjukkan apa itu.'
			},
			{
				match: ['rahasia', 'rahasia game', 'rahasia 256-bit'],
				title: 'Rahasia',
				body: 'Bilangan acak besar yang dibuat pembuat dan disembunyikan selama game terbuka. Setiap skor disegel memakainya, jadi tidak ada skor yang bisa diverifikasi \u2014 atau dipalsukan \u2014 sampai pembuatnya menerbitkannya.',
				more: 'Menerbitkannya di akhir membuat hasil semua orang bisa dicek pada saat yang sama, bukan satu per satu.'
			},
			{
				match: ['seed'],
				title: 'Seed',
				body: 'Angka awal yang memutuskan persis versi tantangan mana yang Anda hadapi \u2014 papan yang mana, data pasar yang mana, teka-teki yang mana. Seed sama, tantangan sama, untuk semua orang.',
				more: 'Diungkap hanya setelah entri ditutup, jadi tidak ada yang bisa menyetel bot untuk putaran spesifik itu di muka.'
			},
			{
				match: ['fase upacara', 'upacara'],
				title: 'Fase upacara',
				body: 'Jendela di awal game ketika pemain mendaftar dan setiap pendaftaran mencampur sedikit ketidakpastian ke seed akhir. Seperti semua orang melempar dadu ke cangkir yang sama sebelum tutupnya dibuka.',
				more: 'Ada supaya pembuat pun tidak bisa tahu tantangan di muka \u2014 para pemain bersama-sama memutuskannya tanpa bermaksud.'
			},
			{
				match: ['Solver ID'],
				title: 'Solver ID',
				body: 'Sidik jari unik bot persis yang Anda daftarkan. Ia menamai satu versi spesifik kode Anda, jadi bot tidak bisa ditukar diam-diam setelah seed diungkap.'
			},
			{
				match: ['Paper'],
				title: 'Paper',
				body: 'Aturan tertulis: apa tantangannya, bagaimana dinilai, apa yang dihitung sebagai entri sah. Diterbitkan sebelum siapa pun bermain, jadi syarat tidak bisa berubah setelah orang terlanjur masuk.',
				more: 'Anda seharusnya bisa membangun entri dari dokumen ini saja.'
			},
			{
				match: ['pot'],
				title: 'Pot',
				body: 'Semua biaya entri, dikumpulkan dan ditahan kontrak sampai game selesai. Setiap peserta membayar masuk; pemenang mengambil sisa setelah potongan yang disepakati.'
			},
			{
				match: ['biaya partisipasi', 'biaya entri'],
				title: 'Biaya partisipasi',
				body: 'Ongkos untuk mengirimkan hasil yang ingin dihitung. Masuk ke pot, bukan ke penyelenggara, jadi setiap entri memperbesar hadiah.',
				more: 'Anda hanya membayarnya jika memutuskan putaran Anda layak dikirim \u2014 menjalankan game secara lokal gratis.'
			},
			{
				match: ['komisi'],
				title: 'Komisi',
				body: 'Irisan pot yang disepakati untuk pembuat game, juri, dan platform. Ditetapkan terang-terangan saat game diterbitkan, dan dipotong otomatis \u2014 bukan dinegosiasi belakangan.'
			},
			{
				match: ['juri'],
				title: 'Juri',
				body: 'Orang yang tugasnya memeriksa pembuat, bukan pemain: apakah game benar-benar menilai jujur, dan apakah tanda terimanya sah? Jika mereka menangkap kecurangan, mereka dibayar dari bagian pembuat.',
				more: 'Dibayar karena menemukan penipuan, bukan karena menyetujui, itulah yang membuat peran ini berharga.'
			},
			{
				match: ['NFT'],
				title: 'NFT',
				body: 'Token unik yang dicatat di blockchain, bisa dimiliki dan dipindahkan tetapi tidak diduplikasi. Di sini itu trofi: bukti tetap, publik, siapa yang memenangkan game tertentu.'
			},
			{
				match: ['dompet'],
				title: 'Dompet',
				body: 'Aplikasi yang memegang kunci dana Anda dan menandatangani tindakan Anda di blockchain. Bukan akun di sebuah perusahaan \u2014 tidak ada yang bisa membekukannya, dan tidak ada yang bisa memulihkannya untuk Anda.'
			},
			{
				match: ['biaya gas', 'biaya jaringan'],
				title: 'Biaya gas',
				body: 'Biaya kecil agar jaringan mencatat transaksi Anda. Membayar komputer yang mencatat, bukan platform \u2014 seperti perangko, bukan harga tiket.'
			},
			{
				match: ['deterministik', 'determinisme', 'reproduktif', 'reproduktibilitas'],
				title: 'Deterministik',
				body: 'Input sama, output sama, setiap kali \u2014 seperti resep yang menghasilkan kue identik di dapur mana pun, bukan yang bergantung pada kokinya. Mesin, hari, atau lokasi tidak mengubah hasil.',
				more: 'Inilah yang membuat skor bisa dicek orang lain: mereka menjalankan ulang dan harus mendapat angka Anda.'
			},
			{
				match: ['isolasi', 'terisolasi', 'tersegel', 'sandbox', 'lingkungan terisolasi'],
				title: 'Isolasi',
				body: 'Menahan program yang sedang berjalan di dalam batas yang tidak bisa dilampauinya \u2014 ia hanya melihat apa yang diberikan, bukan mesin di sekitarnya atau apa pun lain yang ikut berjalan.',
				more: 'Inilah yang membuat game bisa menjalankan bot orang asing dengan aman, dan Anda bisa menjalankan game orang asing dengan aman.'
			},
			{
				match: ['ofuskasi', 'terofuskasi'],
				title: 'Ofuskasi',
				body: 'Sengaja mengacak program agar tetap berjalan sempurna tetapi menyakitkan untuk dibaca \u2014 setara perangkat lunak dari dokumen yang dicetak tanpa spasi atau jeda baris.',
				more: 'Dipakai di sini agar rahasia tersembunyi game tetap tersembunyi, meskipun semua orang punya salinan program yang memuatnya.'
			},
			{
				match: ['peer-to-peer', 'P2P'],
				title: 'Peer-to-peer',
				body: 'Dua komputer berurusan langsung, seperti dua orang teleponan \u2014 bukan keduanya mengirim segala sesuatu lewat perusahaan di tengah, seperti email atau pasar. Setiap komputer adalah "peer": setara, tidak ada yang berkuasa.',
				more: 'Penting di sini karena perusahaan di tengah biasanya yang menentukan harga, mengambil irisan, dan bisa menyingkirkan Anda.'
			},
			{
				match: ['self-hosting', 'self-hosted', 'dijalankan secara lokal', 'jalan secara lokal'],
				title: 'Self-hosting',
				body: 'Menjalankan salinan layanan di mesin sendiri bukan memakai milik orang lain. Barangnya tetap bekerja meski versi publik dimatikan, disensor, atau sedang buruk hari.'
			},
			{
				match: ['umpan', 'skor umpan', 'skor tinggi palsu'],
				title: 'Umpan',
				body: 'Entri yang sengaja menyesatkan \u2014 skor yang Anda terbitkan bukan yang asli \u2014 dikirim supaya lawan salah menebak seberapa baik hasil Anda. Bluff, dimungkinkan karena tidak ada yang bisa membaca skor tersegel.'
			},
			{
				match: ['skor berbobot waktu', 'TimeWeight'],
				title: 'Skor berbobot waktu',
				body: 'Skor yang disesuaikan menurut seberapa awal Anda mengirimkannya. Dua hasil identik tidak imbang: yang masuk lebih dulu dihitung lebih besar, jadi mendudukkan jawaban bagus sampai tenggat merugikan Anda.'
			},
			{
				match: ['masa tenggang', 'periode validasi', 'pengembalian dana'],
				title: 'Masa tenggang',
				body: 'Jendela tunggu yang dibangun ke dalam aturan sebelum uang bergerak \u2014 waktu bagi juri untuk keberatan, dan waktu bagi pemain untuk menarik kembali biayanya jika pembuat tidak pernah menyelesaikan game sama sekali.',
				more: 'Inilah jawaban untuk "bagaimana jika penyelenggara hilang": kontrak membiarkan semua orang pergi membawa uangnya.'
			},
			{
				match: ['CDE', 'variabilitas skenario'],
				title: 'Variabilitas skenario (CDE)',
				body: 'Seberapa berbeda setiap putaran game dari yang sebelumnya. Variabilitas tinggi berarti bot harus benar-benar bermain baik, karena tidak ada satu jawaban tetap untuk dihafal dan dikode keras.'
			}
		]
	},

	/* ============================================================== *
	 * Splash screen
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'TULIS PROMPT ANDA. BANGUN BOT ANDA. REBUT TAHTANYA.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts \u2014 Tulis prompt Anda. Bangun bot Anda. Rebut tahtanya.',
		description:
			'Platform kompetisi tempat pembuat merancang layanan-game untuk menilai solver AI, sementara pemain membangun layanan-solver untuk memaksimalkan skor \u2014 didukung blockchain Ergo dan Celaut.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Tulis prompt Anda. Bangun bot Anda. Rebut tahtanya.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Tulis prompt Anda. <span class="hero-grad">Bangun bot Anda.</span> Rebut tahtanya.',
		lede: 'Platform kompetisi tempat pembuat merancang layanan-game untuk menilai solver AI, dan pemain membangun layanan-solver untuk memaksimalkan skor \u2014 semua dicatat dan diverifikasi on-chain.',
		actions: {
			launch: 'Buka Aplikasi',
			github: 'Lihat di GitHub',
			how: 'Lihat cara kerjanya'
		},
		stats: [
			{ value: 'P2P', label: 'Terdesentralisasi \u2014 layanan berjalan di node Celaut Anda sendiri' },
			{ value: 'On-chain', label: 'Hasil dikomitmenkan dan diverifikasi di Ergo' },
			{ value: 'Tanpa perantara', label: 'Kontrak pintar yang menyelesaikan pot, bukan perusahaan' }
		],
		scroll: 'Gulir'
	},

	/* ============================================================== *
	 * The seven pinned scenes
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'Idenya',
			beats: [
				{
					h: 'Seseorang memasang tantangan.',
					p: 'Pembuat merancang game dengan penilaian yang terukur \u2014 dan mengemasnya sebagai <strong>layanan-game</strong>: layanan Celaut yang tidak berubah, memegang logika game dan rahasianya.'
				},
				{
					h: 'Yang lain membangun bot untuk mengalahkannya.',
					p: 'Pemain menulis <strong>layanan-solver</strong> \u2014 strategi mereka, dikemas dengan cara yang sama. Layanan-game menjalankan setiap solver di lingkungan terisolasi yang aman dan menilai apa yang dilakukannya.'
				},
				{
					h: 'Skor tertinggi memenangkan tahta.',
					p: 'Tidak ada papan peringkat yang harus Anda percayai. Setiap skor dikomitmenkan secara kriptografis dan <strong>diselesaikan di blockchain Ergo</strong>, tempat siapa pun bisa memeriksa hitungannya.',
					note: 'Tulis prompt Anda. Bangun bot Anda. Rebut tahtanya.'
				}
			]
		},

		components: {
			label: 'Arsitektur',
			beats: [
				{
					h: 'Layanan Game',
					p: 'Dibangun pengembang game. Layanan otonom yang merangkum logika game dan rahasianya. Ia menilai kinerja solver, menghasilkan skor, dan membuat <strong>komitmen kriptografis</strong> yang dibutuhkan untuk validasi blockchain.'
				},
				{
					h: 'Layanan Solver',
					p: 'Dibangun pemain. Menerapkan strategi untuk memaksimalkan skor di game tertentu. Solver dikemas dan dikirim ke layanan-game, yang <strong>menjalankannya di lingkungan terisolasi yang aman</strong> untuk dinilai.'
				},
				{
					h: 'GoP Web',
					p: 'Portal komunitas. Temukan game, baca aturan, unduh layanan-game, dan terbitkan hasil di blockchain Ergo. Ia <strong>mendukung self-hosting</strong> untuk pengalaman sepenuhnya tanpa perantara, peer-to-peer.'
				},
				{
					h: 'Semuanya berjalan di mesin Anda.',
					p: 'Layanan game dan solver sama-sama berjalan di <strong>node Celaut lokal</strong>, yang bisa beroperasi sepenuhnya luring. GoP Web bisa dipakai lewat instans GitHub.io-nya atau dijalankan secara lokal sebagai layanan Celaut.',
					note: 'Dua teknologi: Celaut untuk komputasi, Ergo untuk penyelesaian.'
				}
			]
		},

		creator: {
			label: 'Alur pembuat game',
			beats: [
				{
					h: 'Rancang sebuah game.',
					p: 'Buat tantangan dengan penilaian terukur dan variabilitas skenario tinggi (CDE), supaya solusi yang dikode keras tidak jalan.'
				},
				{
					h: 'Tulis Paper-nya.',
					p: 'Terbitkan dokumen berisi semua instruksi, aturan, dan kriteria penilaian. Pemain harus bisa memahami tantangan <strong>sebelum</strong> mereka ikut.'
				},
				{
					h: 'Hasilkan sebuah rahasia.',
					p: '<strong>Rahasia 256-bit</strong> unik menopang komitmen kriptografis dan validasi skor nanti. Tidak ada yang bisa melihatnya selama game terbuka.'
				},
				{
					h: 'Kemas dan terbitkan.',
					p: 'Kirim game sebagai layanan Celaut dan terbitkan lewat GoP Web beserta parameternya: biaya, tenggat, dan komisi.'
				},
				{
					h: 'Ungkap rahasianya.',
					p: 'Ketika tenggat lewat, pembuat <strong>mengungkap rahasia on-chain</strong>. Itu menyelesaikan game: validasi skor menjadi mungkin dan kontrak pintar bisa menentukan pemenang.',
					note: 'Komit dulu, ungkap nanti. Itulah yang membuatnya adil.'
				}
			]
		},

		player: {
			label: 'Perjalanan pemain',
			beats: [
				{
					h: 'Jelajahi dan baca Paper.',
					p: 'Cari game di GoP Web. Baca Paper pembuat untuk memahami tantangan, aturan, dan kriteria penilaian sebelum mengikat diri pada apa pun.'
				},
				{
					h: 'Implementasikan solver Anda.',
					p: 'Bangun layanan-solver dari Paper saja, supaya siap bersaing begitu seed dijatuhkan.'
				},
				{
					h: 'Daftarkan Solver ID Anda.',
					p: 'Pendaftaran gratis \u2014 Anda hanya menanggung biaya gas jaringan. <strong>Pra-komitmen</strong> inilah yang menjamin keadilan sebelum seed diungkap.'
				},
				{
					h: 'Seed diungkap.',
					p: 'Setelah fase upacara berakhir, seed game menjadi publik. Baru sekarang \u2014 dan hanya sekarang \u2014 Anda tahu parameter tantangan persis yang akan dipakai menilai Anda.'
				},
				{
					h: 'Jalankan layanan-game secara lokal.',
					p: 'Layanan menjalankan solver Anda di lingkungan aman dengan seed yang sudah diungkap, menilai kinerjanya, dan menghasilkan <strong>komitmen kriptografis</strong> yang dibutuhkan untuk validasi on-chain.'
				},
				{
					h: 'Kirim komitmen dan bayar biayanya.',
					p: 'Jika skornya layak dilombakan, terbitkan komitmen on-chain dan bayar biaya partisipasi. <strong>Semua biaya masuk ke pot</strong> \u2014 pemenang mengambil hadiah ekonomi, dikurangi komisi pembuat, juri, dan platform, serta menerima NFT game.',
					note: 'Anda yang memutuskan apakah putaran Anda layak dikirim.'
				}
			]
		},

		validation: {
			label: 'Validasi skor',
			beats: [
				{
					h: 'Skor Anda adalah hash, bukan klaim.',
					p: 'Ketika Anda berpartisipasi, yang masuk on-chain adalah <strong>komitmen</strong> \u2014 sebuah ringkasan. Tidak seorang pun, termasuk pembuat, bisa membaca skor Anda dari blockchain selama game masih terbuka.'
				},
				{
					h: 'Lalu rahasianya keluar.',
					p: 'Setelah tenggat, pembuat mengungkap rahasia game dalam transaksi penyelesaian. Itu bahan yang hilang \u2014 dan ia <strong>membuka verifikasi untuk semua orang sekaligus</strong>.'
				},
				{
					h: 'Kontrak menghitungnya ulang.',
					p: 'Kontrak game membangun komitmen untuk setiap skor dari <strong>Solver ID, nilai skor, log yang di-hash, dan rahasia yang diungkap</strong>. Tidak ada pihak terpercaya; ini aritmetika.'
				},
				{
					h: 'Jika cocok, skornya nyata.',
					p: 'Komitmen yang dihitung ulang sama dengan yang diterbitkan membuktikan skor autentik dan tidak bisa diutak-atik. Yang tidak cocok bukan skor.',
					note: 'Transparan sekaligus privat: terbukti tanpa dibuka.'
				}
			]
		},

		pot: {
			label: 'Ekonomi',
			beats: [
				{
					h: 'Setiap entri mengisi pot.',
					p: 'Biaya partisipasi dari setiap orang yang mengirim komitmen menumpuk dalam satu pot on-chain untuk game itu.'
				},
				{
					h: 'Komisi dipotong di depan.',
					p: 'Pembuat, juri, dan platform mengambil komisi yang disepakati \u2014 semuanya ditetapkan terang-terangan saat game diterbitkan, dan <strong>diberlakukan kontrak pintar</strong> bukan itikad baik siapa pun.'
				},
				{
					h: 'Sisanya ke pemenang.',
					p: 'Skor tervalidasi tertinggi mengambil sisa pot \u2014 ditambah <strong>NFT game</strong>, bukti kemenangan yang tetap, publik, dan bisa diaudit. Dana dilepas setelah periode validasi yang memberi juri waktu memeriksa pembuat bertindak jujur.',
					note: 'Tidak ada yang menyetujui pembayaran. Kontraknya yang melakukannya.'
				}
			]
		},

		judges: {
			label: 'Kepercayaan dan akuntabilitas',
			beats: [
				{
					h: 'Siapa yang mengawasi pembuat?',
					p: 'Juri adalah entitas yang dicalonkan pembuat untuk mengaudit fase penyelesaian. Mereka memverifikasi bahwa layanan-game pembuat menghasilkan <strong>bukti sah dan skor sah</strong>.'
				},
				{
					h: 'Penipuan merugikan pembuat, bukan Anda.',
					p: 'Jika juri menangkap layanan-game cacat atau bukti tidak sah, juri itu <strong>menerima komisi pembuat</strong> sebagai imbalan. Insentif untuk melihat dekat sudah tertanam.'
				},
				{
					h: 'Pemain di luar radius ledakan.',
					p: 'Dalam operasi normal pemain tidak bisa dihukum juri. Juri ada untuk <strong>melindungi pemain dari pembuat yang tidak jujur</strong>, tidak pernah sebaliknya.',
					note: 'Audit rumahnya, bukan tamunya.'
				}
			]
		}
	},

	/* ============================================================== *
	 * The readable reference list under the validation scene
	 * ============================================================== */
	steps: {
		title: 'Lima langkah, berurutan',
		items: [
			{
				badge: 'TERKIRIM',
				title: 'Partisipasi Pemain',
				desc: 'Pemain menerbitkan partisipasinya di blockchain Ergo.'
			},
			{
				badge: 'TERUNGKAP',
				title: 'Pembuat Mengungkap Rahasia',
				desc: 'Setelah tenggat, pembuat mengungkap rahasia game dalam transaksi penyelesaian \u2014 membuka verifikasi.'
			},
			{
				badge: 'DIHITUNG',
				title: 'Validasi Kontrak Pintar',
				desc: 'Kontrak game menghitung komitmen untuk setiap skor memakai Solver ID, nilai skor, log yang di-hash, dan rahasia yang diungkap.'
			},
			{
				badge: 'SAH',
				title: 'Verifikasi Skor',
				desc: 'Ketika komitmen skor cocok dengan komitmen partisipasi, skor itu divalidasi sebagai autentik dan tidak bisa diutak-atik.'
			},
			{
				badge: 'DIBAGI',
				title: 'Pemenang Mengambil Pot',
				desc: 'Skor tertinggi menang. Setelah periode validasi untuk memastikan pembuat game bertindak jujur, dana dilepas ke pemenang, bersih dari biaya pembuat dan juri.'
			}
		]
	},

	/* ============================================================== *
	 * Video
	 * ============================================================== */
	video: {
		label: 'Ikhtisar',
		title: 'Tonton Uraiannya',
		subtitle:
			'Pahami dalam hitungan menit \u2014 lihat bagaimana Game of Prompts mempertemukan blockchain dan kompetisi AI.',
		thumbAlt: 'Gambar mini video Game of Prompts',
		iframeTitle: 'Game of Prompts \u2014 Uraian Singkat'
	},

	/* ============================================================== *
	 * Security
	 * ============================================================== */
	security: {
		label: 'Keamanan',
		title: 'Kompetisi Transparan Sekaligus Privat',
		subtitle:
			'Kriptografi menjamin kompetisi adil sambil melindungi strategi peserta.',
		cards: [
			{
				title: 'Perlindungan Kode',
				desc: 'Kekayaan intelektual game dan rahasia game dilindungi ofuskasi agar tidak direkayasa balik.'
			},
			{
				title: 'Hasil Privat',
				desc: 'Umpan strategis dan komitmen kriptografis menyembunyikan skor asli Anda, melindungi strategi sampai pengungkapan akhir.'
			},
			{
				title: 'Bukti Abadi',
				desc: 'Validasi akhir di blockchain Ergo menghasilkan bukti kemenangan yang publik, tidak berubah, dan bisa diaudit.'
			}
		]
	},

	/* ============================================================== *
	 * Game types
	 * ============================================================== */
	gameTypes: {
		title: 'Apa yang Bisa Jadi Game?',
		text: 'Game of Prompts adalah platform serbaguna yang bisa menampung aneka kompetisi. Ini hanya beberapa contoh yang mungkin.',
		eyebrow: 'Jenis Game {n}',
		items: [
			{
				title: 'Arkade Klasik',
				desc: 'Solver AI mengendalikan karakter di lingkungan game cepat berbasis keterampilan. Refleks, pengenalan pola, timing.',
				score: 'Poin game \u00b7 Waktu bertahan \u00b7 Level dilalui'
			},
			{
				title: 'Dunia Terbuka',
				desc: 'Optimalkan penalaran spasial, navigasi, dan adaptasi lingkungan.',
				score: 'Efisiensi sumber daya \u00b7 Eksplorasi peta \u00b7 Kompleksitas misi'
			},
			{
				title: 'Perdagangan Finansial',
				desc: 'Bot lawan pasar. Perdagangkan aset virtual dalam simulasi realistis memakai data historis atau sintetis. Murni strategi, nol keberuntungan.',
				score: 'Laba bersih \u00b7 Rasio Sharpe \u00b7 Drawdown \u00b7 Tolok ukur'
			},
			{
				title: 'Pelipatan Protein',
				desc: 'Prediksi struktur protein 3D dari urutan asam amino. Tantangan ilmiah nyata \u2014 solver AI memajukan biologi.',
				score: 'Stabilitas struktur \u00b7 Akurasi pelipatan \u00b7 Efisiensi'
			}
		]
	},

	/* ============================================================== *
	 * Optional features
	 * ============================================================== */
	features: {
		title: 'Fitur Game Opsional',
		text: 'Pembuat bisa memperkaya gamenya dengan mekanik opsional yang kuat \u2014 dari bluff ala poker sampai batasan sumber daya dan model bayar-per-percobaan.',
		eyebrow: 'Fitur {n}',
		status: {
			available: 'Tersedia',
			research: 'Masih Diteliti'
		},
		items: [
			{
				title: 'Batasan Sumber Daya',
				desc: 'Tantangan teknis dengan membatasi sumber daya komputasi. Efisiensi adalah raja.',
				bullets: [
					'Pembuat game menetapkan batas spesifik pada sumber daya komputasi',
					'Kendala: RAM maksimum, waktu CPU, atau ketergantungan layanan',
					'Memaksa pemain mengembangkan solusi yang sangat efisien dan teroptimasi',
					'Menambah tantangan rekayasa yang signifikan ke dalam game'
				]
			},
			{
				title: 'Mode Poker',
				desc: 'Partisipasi strategis dengan risiko dan imbalan. Bluff, taruhan, dan kalikan skor Anda.',
				bullets: [
					'Peserta memilih berapa yang dibayar (di atas minimum yang ditetapkan)',
					'Pembayaran lebih tinggi = pengali skor akhir lebih tinggi (mis. \u00d72, \u00d75)',
					'Pemain bisa mengirim beberapa skor umpan',
					'Strategi bluff: bayar biaya tinggi + kirim skor tinggi palsu untuk menakut-nakuti',
					'Pembuat game menetapkan pengali skor berdasarkan biaya yang dibayar'
				]
			},
			{
				title: 'Bayar per Percobaan',
				desc: 'Mekanisme yang memasang ongkos pada setiap eksekusi lokal, mendorong pengembangan agen berkualitas tinggi alih-alih coba-coba.',
				bullets: [
					'Biaya token bertahap per percobaan eksekusi lokal',
					'Mendorong simulasi lokal yang ketat dan optimasi',
					'Mengurangi strategi brute-force membabi buta',
					'Penskalaan kesulitan sepenuhnya diatur pembuat game'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 * ============================================================== */
	faq: {
		label: 'FAQ',
		title: 'Pertanyaan yang Sering Diajukan',
		footerTitle: 'Masih ada pertanyaan?',
		footerDesc:
			'Salin prompt di bawah dan tempel ke asisten AI mana pun \u2014 sudah termasuk tautan ke dokumentasi lengkap kami.',
		copyPrompt: 'Salin prompt',
		copied: 'Tersalin!',
		orLabel: 'atau buka langsung di:',
		disclaimerBefore: '⚠️ Jawaban AI mungkin tidak sepenuhnya akurat. Selalu rujuk ke ',
		disclaimerLink: 'dokumentasi resmi',
		disclaimerAfter: ' untuk informasi yang berwenang.',
		telegram: 'Gabung Komunitas Telegram',
		groups: [
			{
				title: 'Umum',
				items: [
					{
						q: 'Apa itu Game of Prompts?',
						a: 'Kompetisi bot yang diaudit blockchain. Pembuat merancang layanan-game untuk menilai solver AI, sementara pemain membangun layanan-solver untuk memaksimalkan skor \u2014 semua diverifikasi di blockchain Ergo.'
					},
					{
						q: 'Apa itu "Fase Upacara"?',
						a: 'Periode awal ketika pemain mendaftarkan Solver ID mereka untuk menambah keacakan pada seed. Ini mencegah Pembuat menghitung solusi di muka dan menjamin kompetisi yang adil.'
					},
					{
						q: 'Apa yang saya butuhkan untuk bermain?',
						a: 'Dompet Ergo (dengan sedikit ERG untuk biaya partisipasi) dan Node Celaut untuk menjalankan layanan game dan solver secara lokal.'
					}
				]
			},
			{
				title: 'Keamanan',
				items: [
					{
						q: 'Bagaimana saya tahu gamenya adil?',
						a: 'Aturan game dan hash didaftarkan on-chain dari awal. Mereka tidak bisa diubah \u2014 tidak ada yang bisa mengubahnya setelah diterbitkan.'
					},
					{
						q: 'Bisakah Pembuat mencuri dananya?',
						a: 'Tidak. Dana terkunci di Kontrak Pintar, bukan dompet Pembuat. Distribusi ditangani secara atomik oleh kontrak ketika game selesai.'
					},
					{
						q: 'Bagaimana jika Pembuat menghilang?',
						a: 'Setelah Masa Tenggang, pemain bisa memicu Aksi Pengembalian Dana untuk menarik biaya partisipasi dari kontrak pintar.'
					}
				]
			},
			{
				title: 'Juri',
				items: [
					{
						q: 'Siapa Juri itu?',
						a: 'Entitas yang dicalonkan Pembuat untuk mengaudit fase penyelesaian. Mereka memverifikasi bahwa layanan-game menghasilkan bukti sah.'
					},
					{
						q: 'Mengapa Juri mendapat uang karena membatalkan partisipasi?',
						a: 'Mereka mendeteksi penipuan Pembuat \u2014 insentifnya menangkap layanan-game yang cacat. Ketika menemukan masalah, mereka menerima komisi Pembuat sebagai imbalan.'
					},
					{
						q: 'Bisakah saya dihukum sebagai pemain?',
						a: 'Sistem menghukum Pembuat/Layanan-Game, bukan pemain jujur. Juri mengaudit Pembuat, bukan Anda.'
					}
				]
			},
			{
				title: 'Ekonomi',
				items: [
					{
						q: 'Bagaimana pemenang dihitung?',
						a: 'Skor Berbobot Waktu tertinggi: Skor \u00d7 (TimeWeight + SisaWaktu). Kirim awal dan skor tinggi untuk hasil terbaik.'
					},
					{
						q: 'Kapan saya menerima kemenangan saya?',
						a: 'Langsung pada aksi Akhiri Game. Kontrak Pintar mendistribusikan semua dana secara atomik \u2014 pemenang menerima semua biaya partisipasi dikurangi komisi pembuat dan biaya juri.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Call to action + footer
	 * ============================================================== */
	cta: {
		label: 'Mulai',
		title: 'Mulai dengan Game of Prompts',
		steps: [
			'Pasang perangkat lunak <strong>node Celaut</strong> untuk menjalankan Layanan Game dan Solver di lingkungan aman dan deterministik.',
			'Siapkan <strong>dompet blockchain Ergo</strong> untuk ikut game dan menerima kemenangan.',
			'Jelajahi game yang tersedia di <strong>GoP Web</strong> dan mulai kembangkan solver sendiri atau buat game menantang untuk orang lain.'
		],
		github: 'Repositori GitHub',
		celaut: 'Proyek Celaut',
		ergo: 'Platform Ergo'
	},

	footer: {
		tagline: 'Tulis prompt Anda. Bangun bot Anda. Rebut tahtanya.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
