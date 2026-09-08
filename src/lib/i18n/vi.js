/*
 * src/lib/i18n/vi.js
 * ------------------------------------------------------------------
 * Tiếng Việt — dịch en.js, từng khóa một.
 *
 * Cùng cấu trúc, cùng độ dài mảng. glossary.terms có đúng 33 mục,
 * ghép theo vị trí với GLOSSARY_IDS trong glossary/terms.js.
 *
 * `match` không phải bản dịch tiêu đề: là các từ thật sự xuất hiện
 * TRONG BẢN NÀY, được gạch chân và mở định nghĩa. Tiếng Việt hầu như
 * không biến hình, nên chỉ liệt kê đúng cụm đã dùng. Tránh biệt danh
 * quá ngắn nuốt câu khác (không dùng «ví» trần — sẽ dính «ví dụ»).
 */

export default {
	/* ============================================================== *
	 * Nhóm điều khiển góc
	 * ============================================================== */
	common: {
		languageLabel: 'Ngôn ngữ',
		switchLanguage: 'Đổi ngôn ngữ',
		themeToLight: 'Chuyển sang giao diện sáng',
		themeToDark: 'Chuyển sang giao diện tối',
		backToTop: 'Lên đầu trang',
		scoring: 'CHẤM ĐIỂM'
	},

	/* ============================================================== *
	 * Thuật ngữ
	 * ============================================================== */
	glossary: {
		toggleOn: 'Giải thích thuật ngữ kỹ thuật',
		toggleOff: 'Ẩn giải thích thuật ngữ',
		toggleLabel: 'Giải thích',
		close: 'Đóng',
		explain: '«{term}» nghĩa là gì?',
		hintTitle: 'Một số từ bị gạch chân.',
		hintBody:
			'Chạm bất kỳ từ gạch chân nào để đọc lời giải thích bằng tiếng thường. Tắt bất cứ lúc nào bằng nút ở góc.',
		hintDismiss: 'Đã hiểu',

		terms: [
			{
				match: ['dịch vụ trò chơi', 'game-service', 'game service'],
				title: 'Dịch vụ trò chơi',
				body: 'Bản thân thử thách, đóng gói thành một chương trình niêm phong mà ai cũng tải về và chạy được. Bên trong là luật, cách chấm, và bí mật người tạo giấu đi — như đề thi đã dán kín mà còn tự chấm lấy.',
				more: 'Bạn chạy nó trên máy của mình. Nó chấm bot và tạo biên lai mật mã để blockchain đối chiếu sau.'
			},
			{
				match: ['dịch vụ solver', 'solver', 'solvers'],
				title: 'Dịch vụ solver',
				body: 'Bài dự thi của bạn. Bot bạn dựng để chơi, đóng gói cùng cách niêm phong để chạy giống hệt trên mọi máy — chiến lược nhét trong một hộp mang đi được.',
				more: 'Nó được giao cho dịch vụ trò chơi, chạy trong cô lập rồi chấm những gì nó làm. Không ai thấy mã của bạn ngoài bạn.'
			},
			{
				match: ['GoP Web', 'cổng cộng đồng'],
				title: 'GoP Web',
				body: 'Trang web liệt kê các trò: đọc luật, tải trò, công bố kết quả. Đó là danh mục và công cụ ký, không phải trọng tài — không cần tin những gì nó hiện ra.',
				more: 'Bạn có thể chạy bản sao của riêng mình. Đó là ý: nếu bản công cộng biến mất, các trò vẫn tiếp tục.'
			},
			{
				match: ['Celaut', 'nút Celaut'],
				title: 'Celaut',
				body: 'Hệ thống thật sự chạy các chương trình niêm phong. Cài một lần, rồi mọi gói trò hay solver đều có thể giao cho máy bạn và chạy trong phòng khóa riêng.',
				more: 'Nó biến «tự chạy» thành chuyện thật chứ không phải khẩu hiệu: cùng một gói cư xử giống nhau trên mọi máy mở nó.'
			},
			{
				match: ['nút mạng', 'các nút mạng'],
				title: 'Nút mạng',
				body: 'Một máy tính tham gia mạng. Laptop, máy bàn để dành, máy chủ trong tủ rack — khi đã chạy phần mềm và nói chuyện với máy khác, nó là một nút mạng.',
				more: 'Ở đây đó chỉ là máy chạy trò và solver. Máy của bạn, không phải trung tâm dữ liệu của ai.'
			},
			{
				match: ['dịch vụ'],
				title: 'Dịch vụ',
				body: 'Một mảnh phần mềm tự đủ, làm đúng một việc, giao cho máy nào cũng chạy được — gần một thiết bị gia dụng hơn là cả một chương trình phải cài.',
				more: 'Hai nửa cuộc thi ở đây đều là dịch vụ: trò chơi và bot chơi nó.'
			},
			{
				match: ['blockchain'],
				title: 'Blockchain',
				body: 'Sổ ghi chép dùng chung mà hàng nghìn máy tính giữ bản sao cùng lúc. Thêm một dòng thì những máy kia phải đồng ý là hợp lệ, và dòng cũ không viết lại được — không ai một mình nắm lịch sử.',
				more: 'Ở đây chỉ dùng cho hai việc hẹp: ghi ai tuyên bố điểm nào, và trả tiền người thắng. Không hơn.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'Blockchain cụ thể mà nền tảng này ghi kết quả và thanh toán. ERG là đơn vị tiền của nó.',
				more: 'Đó là một lựa chọn, không phải móng nhà: nền tảng không có coin riêng.'
			},
			{
				match: [
					'hợp đồng thông minh',
					'hợp đồng của trò',
					'hợp đồng'
				],
				title: 'Hợp đồng thông minh',
				body: 'Chương trình sống trên blockchain, giữ tiền theo luật viết sẵn. Điều kiện đủ thì nó tự trả — không ai ký séc, cũng không ai được quyết định không trả.',
				more: 'Vì thế giải thưởng an toàn trước khi ai thắng: tiền do luật giữ, không phải người viết luật.'
			},
			{
				match: ['on-chain', 'trên chuỗi'],
				title: 'On-chain',
				body: 'Được viết vào chính blockchain, nơi ai cũng thấy và không ai lặng lẽ sửa sau — khác với nằm trong cơ sở dữ liệu riêng của một công ty.'
			},
			{
				match: [
					'cam kết mật mã',
					'cam kết điểm',
					'cam kết trước',
					'cam kết'
				],
				title: 'Cam kết',
				body: 'Phong bì niêm phong. Bạn công bố thứ chứng minh mình đã chọn gì, mà không tiết lộ đó là gì — sau này mở phong bì, ai cũng kiểm được là bạn không đổi ruột.',
				more: 'Nó khóa một điểm số trước công chúng khi trò vẫn đang mở, mà không nói cho đối thủ biết bạn làm được tới đâu.'
			},
			{
				match: ['nhật ký đã hash', 'hash', 'digest'],
				title: 'Hash',
				body: 'Vân tay ngắn tính từ một khối dữ liệu. Cùng dữ liệu luôn ra cùng vân tay, đổi một byte là ra vân tay khác hẳn, và không đi ngược từ vân tay về dữ liệu được.',
				more: 'Tính một chiều đó là cả mánh: chứng minh cái gì đó khớp mà không phải đưa ra cái đó.'
			},
			{
				match: ['bí mật 256-bit', 'bí mật của trò', 'bí mật'],
				title: 'Bí mật',
				body: 'Một số ngẫu nhiên lớn mà người tạo sinh ra và giấu khi trò còn mở. Mọi điểm đều được niêm bằng nó, nên không điểm nào kiểm được — hay giả được — cho tới khi người tạo công bố.',
				more: 'Công bố lúc cuối khiến kết quả của mọi người kiểm được cùng một lúc, chứ không từng người một.'
			},
			{
				match: ['seed của trò', 'seed'],
				title: 'Seed',
				body: 'Số khởi đầu quyết định đúng phiên bản thử thách bạn gặp — bàn nào, dữ liệu thị trường nào, câu đố nào. Cùng seed, cùng thử thách, với mọi người.',
				more: 'Chỉ lộ sau khi hết nhận bài, để không ai tinh chỉnh bot sẵn cho đúng lần chạy đó.'
			},
			{
				match: ['giai đoạn lễ', 'lễ khai mạc'],
				title: 'Giai đoạn lễ',
				body: 'Cửa sổ đầu trò, khi người chơi đăng ký và mỗi lượt đăng ký khuấy thêm một chút bất định vào seed cuối. Như mọi người cùng bỏ xúc xắc vào một cốc trước khi mở nắp.',
				more: 'Có mặt để chính người tạo cũng không biết thử thách trước — người chơi cùng quyết định mà không chủ ý.'
			},
			{
				match: ['Solver ID', 'định danh solver'],
				title: 'Solver ID',
				body: 'Vân tay duy nhất của đúng bot bạn đăng ký. Nó đặt tên một phiên bản cụ thể của mã, nên không thể lặng lẽ đổi bot khác sau khi seed lộ.'
			},
			{
				match: ['Paper', 'Paper của trò'],
				title: 'Paper',
				body: 'Luật viết ra: thử thách là gì, chấm thế nào, cái gì tính là bài hợp lệ. Công bố trước khi ai chơi được, nên điều khoản không đổi sau khi người ta đã cam kết.',
				more: 'Ý là bạn dựng được bài chỉ từ đúng tài liệu đó.'
			},
			{
				match: ['hũ thưởng', 'hũ'],
				title: 'Hũ thưởng',
				body: 'Mọi phí tham gia, gom lại và do hợp đồng giữ cho tới khi trò kết. Ai thi thì đóng; người thắng lấy phần còn lại sau các khoản đã thỏa thuận.'
			},
			{
				match: ['phí tham gia', 'lệ phí vào cửa'],
				title: 'Phí tham gia',
				body: 'Cái giá để nộp một kết quả muốn được tính. Nó vào hũ thưởng chứ không vào ban tổ chức, nên mỗi bài làm giải lớn hơn.',
				more: 'Chỉ trả nếu bạn thấy lần chạy đáng nộp — chạy trò trên máy mình thì miễn phí.'
			},
			{
				match: ['hoa hồng người tạo', 'hoa hồng'],
				title: 'Hoa hồng',
				body: 'Phần đã thỏa của hũ thưởng dành cho người tạo trò, giám khảo và nền tảng. Đặt công khai lúc trò được đăng, rồi tự trừ — không mặc cả sau.'
			},
			{
				match: ['giám khảo'],
				title: 'Giám khảo',
				body: 'Việc của họ là kiểm người tạo, không phải người chơi: trò có thật sự chấm trung thực, biên lai có hợp lệ? Bắt được gian thì họ được trả từ phần của người tạo.',
				more: 'Được trả vì tìm gian lận, chứ không vì phê duyệt, mới khiến vai này đáng có.'
			},
			{
				match: ['NFT', 'NFT của trò'],
				title: 'NFT',
				body: 'Token một-của-một ghi trên blockchain, sở hữu và chuyển được nhưng không sao chép được. Ở đây là cúp: bằng chứng công khai, vĩnh viễn về ai thắng một trò cụ thể.'
			},
			{
				match: ['ví Ergo', 'ví tiền'],
				title: 'Ví tiền',
				body: 'Ứng dụng giữ khóa quỹ của bạn và ký hành động trên blockchain. Không phải tài khoản ở một công ty — không ai đóng băng được, và không ai lấy lại hộ bạn được.'
			},
			{
				match: ['phí gas mạng', 'phí gas', 'phí mạng'],
				title: 'Phí gas',
				body: 'Khoản nhỏ để mạng ghi giao dịch của bạn. Trả cho máy đang ghi, không phải nền tảng — giống tem thư hơn giá vé.'
			},
			{
				match: ['tất định', 'tính tất định', 'tái lập được', 'tính tái lập'],
				title: 'Tất định',
				body: 'Cùng đầu vào, cùng đầu ra, mọi lần — như công thức ra đúng một chiếc bánh ở bất kỳ bếp nào, chứ không phụ thuộc người nấu. Máy, ngày, chỗ đều không đổi kết quả.',
				more: 'Đó là thứ khiến người khác kiểm được điểm: họ chạy lại và phải ra đúng số của bạn.'
			},
			{
				match: [
					'môi trường cô lập an toàn',
					'môi trường cô lập',
					'cô lập',
					'niêm phong',
					'sandbox'
				],
				title: 'Cô lập',
				body: 'Giữ chương trình đang chạy trong một ranh giới nó không vượt qua được — chỉ thấy những gì được đưa, không thấy máy xung quanh hay thứ khác đang chạy ở đó.',
				more: 'Nhờ thế một trò chạy bot của người lạ an toàn, và bạn chạy trò của người lạ cũng an toàn.'
			},
			{
				match: ['làm rối mã', 'mã bị làm rối'],
				title: 'Làm rối mã',
				body: 'Cố ý xáo chương trình để nó vẫn chạy hoàn hảo nhưng đọc thì đau — bản phần mềm của một văn bản in không khoảng trắng, không xuống dòng.',
				more: 'Dùng ở đây để bí mật giấu trong trò vẫn giấu, dù ai cũng có bản sao chương trình chứa nó.'
			},
			{
				match: ['ngang hàng', 'peer-to-peer', 'P2P'],
				title: 'Ngang hàng',
				body: 'Hai máy tính giao tiếp trực tiếp, như hai người gọi điện — chứ không gửi hết qua một công ty ở giữa, kiểu thư điện tử hay chợ. Mỗi máy là một «ngang hàng»: bình đẳng, không ai cầm quyền.',
				more: 'Quan trọng ở đây vì công ty ở giữa thường là bên đặt giá, cắt phần, và đuổi bạn được.'
			},
			{
				match: ['tự lưu trữ', 'tự chạy', 'chạy cục bộ'],
				title: 'Tự lưu trữ',
				body: 'Chạy bản sao dịch vụ trên máy mình thay vì dùng của người khác. Thứ đó vẫn chạy dù bản công cộng tắt, bị kiểm duyệt, hay chỉ đang ngày xấu.'
			},
			{
				match: ['điểm mồi', 'điểm cao giả', 'mồi nhử'],
				title: 'Mồi nhử',
				body: 'Bài cố ý đánh lạc hướng — một điểm bạn công bố không phải điểm thật — nộp để đối thủ đoán sai về thành tích. Bluff, làm được vì không ai đọc được điểm đã niêm.'
			},
			{
				match: ['điểm trọng số thời gian', 'TimeWeight'],
				title: 'Điểm trọng số thời gian',
				body: 'Điểm chỉnh theo mức bạn nộp sớm. Hai kết quả giống nhau không hòa: cái vào trước nặng hơn, nên ngồi ôm đáp án hay tới hạn chót là thiệt.'
			},
			{
				match: ['thời gian ân hạn', 'thời gian xác thực', 'hoàn phí'],
				title: 'Thời gian ân hạn',
				body: 'Cửa sổ chờ gắn trong luật trước khi tiền chuyển — giờ cho giám khảo phản đối, và giờ cho người chơi lấy lại phí nếu người tạo không bao giờ kết trò.',
				more: 'Đó là câu trả lời cho «nếu ban tổ chức biến mất»: hợp đồng cho mọi người ra về với tiền của mình.'
			},
			{
				match: ['CDE', 'biến thiên kịch bản', 'biến thiên kịch bản cao'],
				title: 'Biến thiên kịch bản (CDE)',
				body: 'Mỗi lần chạy trò khác lần trước tới mức nào. Biến thiên cao nghĩa là bot phải chơi thật sự giỏi, vì không có một đáp án cố định để thuộc rồi cứng hóa.'
			}
		]
	},

	/* ============================================================== *
	 * Màn hình mở
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'VIẾT PROMPT. DỰNG BOT. CHIẾM NGAI.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Viết prompt. Dựng bot. Chiếm ngai.',
		description:
			'Nền tảng thi đấu: người tạo thiết kế dịch vụ trò chơi để đánh giá solver AI, người chơi dựng dịch vụ solver để đẩy điểm — chạy trên blockchain Ergo và Celaut.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Viết prompt. Dựng bot. Chiếm ngai.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		tagline: 'Viết prompt. <span class="hero-grad">Dựng bot.</span> Chiếm ngai.',
		lede: 'Nền tảng thi đấu nơi người tạo thiết kế dịch vụ trò chơi để đánh giá solver AI, và người chơi dựng dịch vụ solver để đẩy điểm — mọi thứ ghi và xác thực on-chain.',
		actions: {
			launch: 'Mở ứng dụng',
			github: 'Xem trên GitHub',
			how: 'Xem cách hoạt động'
		},
		stats: [
			{ value: 'P2P', label: 'Phi tập trung — dịch vụ chạy trên nút Celaut của bạn' },
			{ value: 'On-chain', label: 'Kết quả được cam kết và xác thực trên Ergo' },
			{ value: 'Không cần tin', label: 'Hợp đồng thông minh chia hũ, không phải một công ty' }
		],
		scroll: 'Cuộn'
	},

	/* ============================================================== *
	 * Bảy cảnh
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'Ý tưởng',
			beats: [
				{
					h: 'Ai đó đăng một thử thách.',
					p: 'Người tạo thiết kế trò có điểm đo được — rồi đóng gói thành <strong>dịch vụ trò chơi</strong>: một dịch vụ Celaut bất biến, giữ logic của trò và bí mật của nó.'
				},
				{
					h: 'Những người kia dựng bot để thắng nó.',
					p: 'Người chơi viết <strong>dịch vụ solver</strong> — chiến lược của họ, đóng gói cùng cách. Dịch vụ trò chơi chạy mỗi solver trong môi trường cô lập an toàn rồi chấm những gì nó làm.'
				},
				{
					h: 'Điểm cao nhất chiếm ngai.',
					p: 'Không có bảng xếp hạng phải tin. Mỗi điểm được cam kết mật mã và <strong>thanh toán trên blockchain Ergo</strong>, nơi ai cũng kiểm được phép tính.',
					note: 'Viết prompt. Dựng bot. Chiếm ngai.'
				}
			]
		},

		components: {
			label: 'Kiến trúc',
			beats: [
				{
					h: 'Dịch vụ trò chơi',
					p: 'Do người làm game dựng. Một dịch vụ tự trị gói logic và bí mật. Nó đánh giá solver, sinh điểm, và tạo <strong>cam kết mật mã</strong> cần cho việc xác thực trên blockchain.'
				},
				{
					h: 'Dịch vụ solver',
					p: 'Do người chơi dựng. Nó hiện thực chiến lược để đẩy điểm trong một trò cụ thể. Solver được đóng gói và gửi tới dịch vụ trò chơi, vốn <strong>chạy nó trong môi trường cô lập an toàn</strong> để đánh giá.'
				},
				{
					h: 'GoP Web',
					p: 'Cổng cộng đồng. Tìm trò, đọc luật, tải dịch vụ trò chơi, công bố kết quả trên blockchain Ergo. Nó <strong>hỗ trợ tự lưu trữ</strong> cho trải nghiệm ngang hàng, không cần tin ai.'
				},
				{
					h: 'Mọi thứ chạy trên máy bạn.',
					p: 'Dịch vụ trò và solver đều chạy trên <strong>nút Celaut cục bộ</strong>, có thể hoạt động hoàn toàn ngoại tuyến. GoP Web dùng bản GitHub.io hoặc chạy cục bộ như một dịch vụ Celaut.',
					note: 'Hai công nghệ: Celaut để tính, Ergo để thanh toán.'
				}
			]
		},

		creator: {
			label: 'Luồng người tạo trò',
			beats: [
				{
					h: 'Thiết kế một trò.',
					p: 'Tạo thử thách có điểm đo được và biến thiên kịch bản cao (CDE), để lời giải cứng hóa không chạy.'
				},
				{
					h: 'Viết Paper.',
					p: 'Công bố tài liệu gồm mọi hướng dẫn, luật và tiêu chí đánh giá. Người chơi phải hiểu thử thách <strong>trước khi</strong> tham gia.'
				},
				{
					h: 'Sinh một bí mật.',
					p: 'Một <strong>bí mật 256-bit</strong> duy nhất chống đỡ các cam kết mật mã và việc xác thực điểm sau này. Không ai thấy khi trò còn mở.'
				},
				{
					h: 'Đóng gói và đăng.',
					p: 'Đưa trò ra như dịch vụ Celaut và đăng qua GoP Web với tham số: phí, hạn, hoa hồng.'
				},
				{
					h: 'Lộ bí mật.',
					p: 'Hết hạn, người tạo <strong>lộ bí mật on-chain</strong>. Thế là trò kết: xác thực điểm trở nên khả thi và hợp đồng thông minh chọn được người thắng.',
					note: 'Cam kết trước, lộ sau. Đó mới công bằng.'
				}
			]
		},

		player: {
			label: 'Hành trình người chơi',
			beats: [
				{
					h: 'Duyệt và đọc Paper.',
					p: 'Tìm trò trên GoP Web. Đọc Paper để hiểu thử thách, luật và tiêu chí đánh giá trước khi cam kết bất cứ điều gì.'
				},
				{
					h: 'Hiện thực solver.',
					p: 'Dựng dịch vụ solver chỉ từ Paper, để sẵn sàng thi ngay lúc seed rơi.'
				},
				{
					h: 'Đăng ký Solver ID.',
					p: 'Đăng ký miễn phí — bạn chỉ trả phí gas mạng. <strong>Cam kết trước</strong> này bảo đảm công bằng trước khi seed lộ.'
				},
				{
					h: 'Seed được lộ.',
					p: 'Giai đoạn lễ kết thúc, seed của trò ra công cộng. Bây giờ — và chỉ bây giờ — bạn biết đúng tham số thử thách sẽ bị chấm.'
				},
				{
					h: 'Chạy dịch vụ trò chơi cục bộ.',
					p: 'Dịch vụ chạy solver trong môi trường an toàn với seed đã lộ, đánh giá hiệu năng, và sinh <strong>cam kết mật mã</strong> cần cho xác thực on-chain.'
				},
				{
					h: 'Nộp cam kết và trả phí.',
					p: 'Nếu điểm đáng thi, công bố cam kết on-chain và trả phí tham gia. <strong>Mọi phí vào hũ thưởng</strong> — người thắng lấy giải kinh tế, trừ hoa hồng người tạo, giám khảo và nền tảng, rồi nhận NFT của trò.',
					note: 'Bạn quyết lần chạy có đáng nộp hay không.'
				}
			]
		},

		validation: {
			label: 'Xác thực điểm',
			beats: [
				{
					h: 'Điểm của bạn là hash, không phải lời tuyên.',
					p: 'Khi tham gia, thứ lên on-chain là một <strong>cam kết</strong> — một digest. Không ai, kể cả người tạo, đọc được điểm từ blockchain khi trò còn mở.'
				},
				{
					h: 'Rồi bí mật được đưa ra.',
					p: 'Sau hạn, người tạo lộ bí mật của trò trong giao dịch kết. Đó là nguyên liệu còn thiếu — và nó <strong>mở xác thực cho mọi người cùng lúc</strong>.'
				},
				{
					h: 'Hợp đồng tính lại.',
					p: 'Hợp đồng của trò dựng một cam kết cho mỗi điểm từ <strong>Solver ID, giá trị điểm, nhật ký đã hash và bí mật đã lộ</strong>. Không bên tin cậy nào xen vào; đó là số học.'
				},
				{
					h: 'Khớp thì điểm là thật.',
					p: 'Cam kết tính lại trùng cam kết đã công bố chứng minh điểm xác thực và không bị sửa. Cái không khớp đơn giản không phải một điểm.',
					note: 'Trong suốt mà vẫn riêng: chứng minh mà không phơi ra.'
				}
			]
		},

		pot: {
			label: 'Kinh tế',
			beats: [
				{
					h: 'Mỗi bài nuôi hũ.',
					p: 'Phí tham gia của ai nộp cam kết cộng dồn vào một hũ thưởng on-chain cho trò đó.'
				},
				{
					h: 'Hoa hồng lấy từ trên.',
					p: 'Người tạo, giám khảo và nền tảng lấy hoa hồng đã thỏa — đặt công khai lúc trò đăng, và <strong>do hợp đồng thông minh thi hành</strong> chứ không phải thiện chí ai.'
				},
				{
					h: 'Phần còn lại cho người thắng.',
					p: 'Điểm đã xác thực cao nhất lấy phần hũ còn lại — cộng <strong>NFT của trò</strong>, bằng chứng chiến thắng vĩnh viễn, công khai, kiểm toán được. Tiền giải phóng sau thời gian xác thực để giám khảo kịp kiểm người tạo có trung thực.',
					note: 'Không ai phê duyệt khoản trả. Hợp đồng làm việc đó.'
				}
			]
		},

		judges: {
			label: 'Tin cậy và trách nhiệm',
			beats: [
				{
					h: 'Ai canh người tạo?',
					p: 'Giám khảo là thực thể do người tạo chỉ định, kiểm toán giai đoạn kết. Họ xác nhận dịch vụ trò chơi đã sinh <strong>bằng chứng hợp lệ và điểm hợp lệ</strong>.'
				},
				{
					h: 'Gian lận tốn người tạo, không tốn bạn.',
					p: 'Nếu giám khảo bắt được dịch vụ trò lỗi hoặc bằng chứng không hợp lệ, giám khảo đó <strong>nhận hoa hồng người tạo</strong> làm thưởng. Động cơ nhìn kỹ đã gắn sẵn.'
				},
				{
					h: 'Người chơi đứng ngoài bán kính nổ.',
					p: 'Vận hành bình thường, giám khảo không phạt người chơi. Giám khảo tồn tại để <strong>bảo vệ người chơi khỏi người tạo bất lương</strong>, không bao giờ ngược lại.',
					note: 'Kiểm nhà, không kiểm khách.'
				}
			]
		}
	},

	/* ============================================================== *
	 * Danh sách tham chiếu dưới cảnh xác thực
	 * ============================================================== */
	steps: {
		title: 'Năm bước, theo thứ tự',
		items: [
			{
				badge: 'ĐÃ NỘP',
				title: 'Người chơi tham gia',
				desc: 'Người chơi công bố phần tham gia trên blockchain Ergo.'
			},
			{
				badge: 'ĐÃ LỘ',
				title: 'Người tạo lộ bí mật',
				desc: 'Sau hạn, người tạo lộ bí mật của trò trong giao dịch kết — mở khóa xác thực.'
			},
			{
				badge: 'ĐÃ TÍNH',
				title: 'Hợp đồng thông minh xác thực',
				desc: 'Hợp đồng của trò tính một cam kết cho mỗi điểm bằng Solver ID, giá trị điểm, nhật ký đã hash, và bí mật đã lộ.'
			},
			{
				badge: 'ĐÃ XÁC NHẬN',
				title: 'Xác nhận điểm',
				desc: 'Khi cam kết điểm khớp cam kết tham gia, điểm đó được xác thực là thật và không bị sửa.'
			},
			{
				badge: 'ĐÃ CHIA',
				title: 'Người thắng lấy hũ',
				desc: 'Điểm cao nhất thắng. Sau thời gian xác thực để bảo đảm người tạo trung thực, tiền được giải phóng cho người thắng, đã trừ phí người tạo và giám khảo.'
			}
		]
	},

	/* ============================================================== *
	 * Video
	 * ============================================================== */
	video: {
		label: 'Tổng quan',
		title: 'Xem phần giải',
		subtitle:
			'Bắt kịp trong vài phút — Game of Prompts gắn blockchain với các cuộc thi AI thế nào.',
		thumbAlt: 'Ảnh thu nhỏ video Game of Prompts',
		iframeTitle: 'Game of Prompts — Giải ngắn'
	},

	/* ============================================================== *
	 * Bảo mật
	 * ============================================================== */
	security: {
		label: 'Bảo mật',
		title: 'Thi đấu trong suốt mà vẫn riêng tư',
		subtitle: 'Mật mã bảo đảm thi công bằng, đồng thời bảo vệ chiến lược người tham gia.',
		cards: [
			{
				title: 'Bảo vệ mã',
				desc: 'Tài sản trí tuệ của trò và bí mật của trò được bảo vệ bằng làm rối mã để chặn kỹ thuật đảo ngược.'
			},
			{
				title: 'Kết quả riêng',
				desc: 'Mồi nhử chiến lược và cam kết mật mã che điểm thật, bảo vệ chiến lược tới lúc lộ cuối.'
			},
			{
				title: 'Bằng chứng bất biến',
				desc: 'Xác thực cuối trên blockchain Ergo sinh bằng chứng chiến thắng công khai, bất biến, kiểm toán được.'
			}
		]
	},

	/* ============================================================== *
	 * Loại trò
	 * ============================================================== */
	gameTypes: {
		title: 'Cái gì có thể là một trò?',
		text: 'Game of Prompts là nền tảng linh hoạt, chứa được nhiều kiểu thi. Đây chỉ là vài ví dụ những gì làm được.',
		eyebrow: 'Loại trò {n}',
		items: [
			{
				title: 'Arcade cổ điển',
				desc: 'Solver AI điều khiển nhân vật trong môi trường nhanh, dựa trên kỹ năng. Phản xạ, nhận dạng mẫu, nhịp.',
				score: 'Điểm trò · Thời gian sống sót · Màn đã phá'
			},
			{
				title: 'Thế giới mở',
				desc: 'Tối ưu suy luận không gian, điều hướng, thích nghi môi trường.',
				score: 'Hiệu quả tài nguyên · Khám phá bản đồ · Độ phức tạp nhiệm vụ'
			},
			{
				title: 'Giao dịch tài chính',
				desc: 'Bot đấu thị trường. Giao dịch tài sản ảo trong mô phỏng thực, dữ liệu lịch sử hoặc tổng hợp. Thuần chiến lược, không may rủi.',
				score: 'Lãi ròng · Tỷ lệ Sharpe · Drawdown · Chuẩn so sánh'
			},
			{
				title: 'Gấp protein',
				desc: 'Dự đoán cấu trúc 3D protein từ chuỗi amino acid. Thử thách khoa học thật — solver AI đẩy sinh học.',
				score: 'Ổn định cấu trúc · Độ chính xác gấp · Hiệu quả'
			}
		]
	},

	/* ============================================================== *
	 * Tính năng tùy chọn
	 * ============================================================== */
	features: {
		title: 'Tính năng trò tùy chọn',
		text: 'Người tạo có thể thêm cơ chế tùy chọn mạnh — từ bluff kiểu poker tới hạn tài nguyên và trả-theo-lần-thử.',
		eyebrow: 'Tính năng {n}',
		status: {
			available: 'Sẵn sàng',
			research: 'Đang nghiên cứu'
		},
		items: [
			{
				title: 'Hạn tài nguyên',
				desc: 'Thử thách kỹ thuật bằng cách siết tài nguyên tính toán. Hiệu quả là vua.',
				bullets: [
					'Người tạo trò đặt hạn cụ thể lên tài nguyên tính toán',
					'Ràng buộc: RAM tối đa, thời gian CPU, hoặc phụ thuộc dịch vụ',
					'Ép người chơi dựng lời giải rất hiệu quả, đã tối ưu',
					'Thêm một thử thách kỹ thuật đáng kể vào trò'
				]
			},
			{
				title: 'Chế độ poker',
				desc: 'Tham gia chiến lược với rủi ro và phần thưởng. Bluff, cược, nhân điểm.',
				bullets: [
					'Người tham gia chọn trả bao nhiêu (trên một mức tối thiểu)',
					'Trả cao hơn = hệ số điểm cuối cao hơn (chẳng hạn ×2, ×5)',
					'Người chơi có thể nộp nhiều điểm mồi',
					'Chiến lược bluff: trả phí cao + nộp điểm cao giả để dọa',
					'Người tạo trò đặt hệ số điểm theo phí đã trả'
				]
			},
			{
				title: 'Trả theo lần thử',
				desc: 'Cơ chế gán chi phí cho mỗi lần chạy cục bộ, khuyến khích dựng agent chất lượng hơn thử-sai mù.',
				bullets: [
					'Chi phí token tăng dần mỗi lần thử chạy cục bộ',
					'Khuyến khích mô phỏng và tối ưu cục bộ kỹ',
					'Làm nản chiến lược vét cạn mù',
					'Độ khó tăng giảm do người tạo trò cấu hình hết'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 * ============================================================== */
	faq: {
		label: 'FAQ',
		title: 'Câu hỏi thường gặp',
		footerTitle: 'Vẫn còn hỏi?',
		footerDesc:
			'Chép prompt bên dưới và dán vào bất kỳ trợ lý AI nào — đã gồm liên kết tới toàn bộ tài liệu.',
		copyPrompt: 'Chép prompt',
		copied: 'Đã chép!',
		orLabel: 'hoặc mở trực tiếp trong:',
		disclaimerBefore: '⚠️ Câu trả lời AI có thể chưa hoàn toàn đúng. Luôn xem ',
		disclaimerLink: 'tài liệu chính thức',
		disclaimerAfter: ' để có thông tin có thẩm quyền.',
		telegram: 'Tham gia cộng đồng Telegram',
		groups: [
			{
				title: 'Chung',
				items: [
					{
						q: 'Game of Prompts là gì?',
						a: 'Cuộc thi bot do blockchain kiểm. Người tạo thiết kế dịch vụ trò chơi để đánh giá solver AI, người chơi dựng dịch vụ solver để đẩy điểm — tất cả xác thực trên blockchain Ergo.'
					},
					{
						q: '«Giai đoạn lễ» là gì?',
						a: 'Khoảng đầu, người chơi đăng Solver ID để thêm ngẫu nhiên vào seed. Ngăn người tạo tính sẵn lời giải và bảo đảm thi công bằng.'
					},
					{
						q: 'Cần gì để chơi?',
						a: 'Một ví Ergo (với ít ERG cho phí tham gia) và một nút Celaut để chạy dịch vụ trò và solver cục bộ.'
					}
				]
			},
			{
				title: 'Bảo mật',
				items: [
					{
						q: 'Làm sao biết trò công bằng?',
						a: 'Luật trò và hashS được ghi on-chain từ đầu. Chúng bất biến — không ai đổi sau khi đăng.'
					},
					{
						q: 'Người tạo có lấy trộm tiền được không?',
						a: 'Không. Tiền khóa trong hợp đồng thông minh, không phải ví tiền của người tạo. Việc chia do hợp đồng làm nguyên tử khi trò kết.'
					},
					{
						q: 'Nếu người tạo biến mất?',
						a: 'Sau thời gian ân hạn, người chơi kích hoạt hành động hoàn phí để lấy lại phí tham gia từ hợp đồng thông minh.'
					}
				]
			},
			{
				title: 'Giám khảo',
				items: [
					{
						q: 'Giám khảo là ai?',
						a: 'Thực thể do người tạo chỉ định, kiểm toán giai đoạn kết. Họ xác nhận dịch vụ trò chơi sinh bằng chứng hợp lệ.'
					},
					{
						q: 'Vì sao giám khảo được tiền khi vô hiệu một bài?',
						a: 'Họ bắt gian của người tạo — động cơ là tìm dịch vụ trò lỗi. Khi thấy vấn đề, họ nhận hoa hồng người tạo làm thưởng.'
					},
					{
						q: 'Tôi có bị phạt với tư cách người chơi?',
						a: 'Hệ thống phạt người tạo/dịch vụ trò, không phạt người chơi trung thực. Giám khảo kiểm người tạo, không kiểm bạn.'
					}
				]
			},
			{
				title: 'Kinh tế',
				items: [
					{
						q: 'Người thắng được tính thế nào?',
						a: 'Điểm trọng số thời gian cao nhất: Điểm × (TimeWeight + Thời gian còn). Nộp sớm và điểm cao thì kết quả tốt nhất.'
					},
					{
						q: 'Khi nào nhận tiền thắng?',
						a: 'Ngay khi hành động Kết trò chạy. Hợp đồng thông minh chia mọi quỹ nguyên tử — người thắng nhận toàn bộ phí tham gia trừ hoa hồng người tạo và phí giám khảo.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Kêu gọi hành động + chân trang
	 * ============================================================== */
	cta: {
		label: 'Bắt đầu',
		title: 'Bắt đầu với Game of Prompts',
		steps: [
			'Cài phần mềm <strong>nút Celaut</strong> để chạy dịch vụ trò và solver trong môi trường an toàn, tất định.',
			'Lập <strong>ví tiền blockchain Ergo</strong> để tham gia trò và nhận tiền thắng.',
			'Duyệt trò trên <strong>GoP Web</strong> rồi bắt đầu dựng solver của mình, hoặc tạo trò khó cho người khác.'
		],
		github: 'Kho GitHub',
		celaut: 'Dự án Celaut',
		ergo: 'Nền tảng Ergo'
	},

	footer: {
		tagline: 'Viết prompt. Dựng bot. Chiếm ngai.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
