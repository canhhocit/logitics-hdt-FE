/**
 * Nội dung chi tiết cho từng bài viết
 * Viết chuyên sâu, thực tế về nghiệp vụ XNK và logistics Việt Nam
 */

export type ArticleSection = {
  type: "heading" | "paragraph" | "list" | "table" | "note" | "subheading";
  content?: string;
  items?: string[];
  rows?: { label: string; value: string }[];
};

export const articleContent: Record<string, ArticleSection[]> = {

  // ─────────────────────────────────────────────────────────────────
  "chinh-sach-thu-tuc-xuat-nhap-khau": [
    {
      type: "paragraph",
      content:
        "Năm 2026, khung pháp lý về xuất nhập khẩu tại Việt Nam tiếp tục có nhiều thay đổi quan trọng theo hướng đơn giản hóa thủ tục, cắt giảm điều kiện kinh doanh và tận dụng tối đa các ưu đãi từ các Hiệp định Thương mại Tự do (FTA) mà Việt Nam đã ký kết. Doanh nghiệp cần cập nhật kịp thời để tối ưu chi phí và tránh rủi ro pháp lý.",
    },
    {
      type: "heading",
      content: "1. Cập nhật Biểu thuế xuất nhập khẩu ưu đãi đặc biệt (FTA)",
    },
    {
      type: "paragraph",
      content:
        "Việt Nam hiện là thành viên của 16 FTA có hiệu lực, trong đó các FTA thế hệ mới như CPTPP, EVFTA và RCEP mang lại mức thuế suất ưu đãi 0% cho phần lớn nhóm hàng xuất khẩu. Để được hưởng ưu đãi, hàng hóa phải đáp ứng quy tắc xuất xứ (Rules of Origin) và có giấy chứng nhận xuất xứ (C/O) hợp lệ.",
    },
    {
      type: "table",
      rows: [
        { label: "CPTPP",  value: "Nhật Bản, Canada, Mexico, Peru, Chile, Úc, New Zealand, Singapore, Malaysia, Brunei, Vietnam" },
        { label: "EVFTA",  value: "27 quốc gia thành viên EU – thuế về 0% theo lộ trình 7–10 năm" },
        { label: "RCEP",   value: "ASEAN + Trung Quốc, Nhật Bản, Hàn Quốc, Úc, New Zealand" },
        { label: "UKVFTA", value: "Vương quốc Anh – lộ trình ưu đãi tương tự EVFTA" },
      ],
    },
    {
      type: "note",
      content:
        "Lưu ý: Mỗi FTA có bộ quy tắc xuất xứ riêng (CTC, RVC, SP...). Doanh nghiệp cần xác định quy tắc phù hợp với từng mặt hàng trước khi xin C/O.",
    },
    {
      type: "heading",
      content: "2. Những thay đổi trong Danh mục hàng hóa quản lý chuyên ngành",
    },
    {
      type: "paragraph",
      content:
        "Nghị định 69/2018/NĐ-CP và các văn bản sửa đổi quy định rõ danh mục hàng hóa cần giấy phép nhập khẩu, kiểm tra chuyên ngành trước thông quan hoặc sau thông quan. Năm 2026, một số nhóm hàng được chuyển từ kiểm tra trước sang kiểm tra sau thông quan, giúp rút ngắn thời gian lưu kho tại cảng.",
    },
    {
      type: "list",
      items: [
        "Thực phẩm nhập khẩu: chuyển phần lớn sang kiểm tra sau thông quan (trừ thực phẩm tươi sống)",
        "Thiết bị điện, điện tử: kiểm tra chứng nhận hợp quy (CQ) theo QCVN",
        "Hóa chất công nghiệp: vẫn yêu cầu giấy phép nhập khẩu từ Bộ Công Thương",
        "Mỹ phẩm: công bố sản phẩm tại Bộ Y tế trước khi nhập khẩu",
        "Phân bón, thuốc BVTV: Bộ Nông nghiệp cấp phép",
        "Dược phẩm, y tế: Bộ Y tế cấp số đăng ký lưu hành",
      ],
    },
    {
      type: "heading",
      content: "3. Khai báo hải quan điện tử VNACCS/VCIS – Cập nhật 2026",
    },
    {
      type: "paragraph",
      content:
        "Hệ thống thông quan điện tử VNACCS (Vietnam Automated Cargo Clearance System) tiếp tục được nâng cấp lên phiên bản mới trong năm 2026, tích hợp thêm tính năng khai báo tự động cho hàng chuyển phát nhanh (Express), hàng thương mại điện tử và kết nối với hệ thống một cửa quốc gia (NSW).",
    },
    {
      type: "list",
      items: [
        "Tỷ lệ luồng xanh (thông quan tự động không cần kiểm tra): >73% tổng số tờ khai",
        "Luồng vàng (kiểm tra hồ sơ): khoảng 20% – phải nộp chứng từ bổ sung nếu yêu cầu",
        "Luồng đỏ (kiểm tra thực tế hàng hóa): ~7% – thực hiện kiểm tra tại cảng",
        "Thời gian thông quan trung bình luồng xanh: 2–4 giờ làm việc",
        "Thời gian thông quan luồng đỏ: 2–5 ngày tùy loại hàng và cửa khẩu",
      ],
    },
    {
      type: "heading",
      content: "4. Chính sách hoàn thuế xuất khẩu và ưu đãi sản xuất",
    },
    {
      type: "paragraph",
      content:
        "Doanh nghiệp sản xuất hàng xuất khẩu được hoàn thuế nhập khẩu nguyên liệu, thuế GTGT theo quy định tại Luật Thuế xuất khẩu, nhập khẩu số 107/2016/QH13 và các Nghị định hướng dẫn. Thủ tục hoàn thuế năm 2026 được đơn giản hóa, cho phép hoàn thuế điện tử qua Cổng thông tin điện tử Hải quan.",
    },
    {
      type: "note",
      content:
        "HDT Logistics cung cấp dịch vụ tư vấn hải quan toàn diện: phân loại mã HS, xác định chính sách thuế, xin C/O theo FTA và hỗ trợ hoàn thuế xuất khẩu. Liên hệ ngay để được tư vấn miễn phí.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "thu-tuc-nhap-khau-hang-hoa-quy-trinh-ho-so": [
    {
      type: "paragraph",
      content:
        "Nhập khẩu hàng hóa vào Việt Nam là quy trình đòi hỏi sự phối hợp chặt chẽ giữa doanh nghiệp, công ty logistics và cơ quan hải quan. Hiểu đúng từng bước trong quy trình giúp doanh nghiệp chủ động trong kế hoạch kinh doanh, giảm chi phí lưu kho và tránh các rủi ro phát sinh.",
    },
    {
      type: "heading",
      content: "Quy trình nhập khẩu hàng hóa 8 bước",
    },
    {
      type: "list",
      items: [
        "Bước 1: Đàm phán và ký kết Hợp đồng ngoại thương (Sales Contract)",
        "Bước 2: Mở thư tín dụng (L/C) hoặc thỏa thuận phương thức thanh toán T/T, D/P, D/A",
        "Bước 3: Người bán giao hàng và cung cấp bộ chứng từ gốc",
        "Bước 4: Vận chuyển hàng về cảng đến (theo điều kiện Incoterms đã thỏa thuận)",
        "Bước 5: Khai báo hải quan nhập khẩu điện tử trên hệ thống VNACCS",
        "Bước 6: Nộp thuế nhập khẩu và thuế GTGT (nếu có)",
        "Bước 7: Thông quan và nhận lệnh phát hàng (D/O – Delivery Order)",
        "Bước 8: Vận chuyển hàng về kho người nhận",
      ],
    },
    {
      type: "heading",
      content: "Bộ chứng từ nhập khẩu bắt buộc",
    },
    {
      type: "paragraph",
      content:
        "Bộ hồ sơ hải quan nhập khẩu tiêu chuẩn bao gồm các chứng từ sau. Tùy theo loại hàng hóa và thị trường xuất xứ, có thể cần thêm chứng từ chuyên ngành.",
    },
    {
      type: "table",
      rows: [
        { label: "Tờ khai hải quan",           value: "Khai điện tử trên hệ thống VNACCS – bắt buộc với mọi lô hàng" },
        { label: "Commercial Invoice",          value: "Hóa đơn thương mại ghi rõ tên hàng, số lượng, đơn giá, tổng trị giá, điều kiện giao hàng" },
        { label: "Packing List",                value: "Phiếu đóng gói chi tiết: số kiện, trọng lượng, kích thước từng kiện" },
        { label: "Bill of Lading (B/L)",        value: "Vận đơn đường biển gốc – cần thiết để nhận hàng tại cảng" },
        { label: "Certificate of Origin (C/O)", value: "Giấy chứng nhận xuất xứ – cần thiết nếu hưởng ưu đãi thuế FTA" },
        { label: "Hợp đồng mua bán",            value: "Bản gốc hoặc bản sao có xác nhận – trình khi hải quan yêu cầu" },
        { label: "Chứng từ bảo hiểm",          value: "Nếu mua theo điều kiện CIF hoặc CIP" },
        { label: "Giấy phép chuyên ngành",      value: "Tùy loại hàng: thực phẩm, dược phẩm, hóa chất, thiết bị điện..." },
      ],
    },
    {
      type: "heading",
      content: "Các khoản thuế và phí phát sinh khi nhập khẩu",
    },
    {
      type: "list",
      items: [
        "Thuế nhập khẩu (Import Duty): dao động 0–50% tùy mã HS và thị trường xuất xứ. Có thể được ưu đãi về 0% theo FTA",
        "Thuế GTGT (VAT): thường là 10% trên (trị giá hải quan + thuế nhập khẩu). Một số hàng thiết yếu chịu 5% hoặc 0%",
        "Thuế tiêu thụ đặc biệt: áp dụng với ô tô, xe máy, thuốc lá, rượu bia, điều hòa...",
        "Phí cảng (THC – Terminal Handling Charge): tính theo container, thu tại cảng đến",
        "Phí D/O (Delivery Order): phí phát hành lệnh giao hàng, thu bởi hãng tàu/đại lý",
        "Phí lưu container (Detention) và phí lưu bãi (Demurrage): phát sinh nếu chậm lấy hàng",
      ],
    },
    {
      type: "heading",
      content: "Phân luồng kiểm tra hải quan",
    },
    {
      type: "paragraph",
      content:
        "Sau khi khai tờ khai điện tử, hệ thống VNACCS tự động phân luồng kiểm tra dựa trên hồ sơ doanh nghiệp, mặt hàng và lịch sử vi phạm. Hiểu rõ các luồng giúp doanh nghiệp chuẩn bị tốt hơn:",
    },
    {
      type: "table",
      rows: [
        { label: "Luồng Xanh",  value: "Thông quan tự động, không kiểm tra. ~73% tờ khai. Thời gian: 2–4 giờ làm việc" },
        { label: "Luồng Vàng",  value: "Kiểm tra hồ sơ chứng từ, không kiểm tra hàng thực tế. ~20%. Thời gian: 1–2 ngày" },
        { label: "Luồng Đỏ",   value: "Kiểm tra thực tế hàng hóa tại cảng. ~7%. Thời gian: 2–5 ngày" },
      ],
    },
    {
      type: "note",
      content:
        "Mẹo thực tế: Chuẩn bị bộ chứng từ đầy đủ, chính xác ngay từ đầu là cách hiệu quả nhất để đạt luồng xanh. HDT Logistics có đội chuyên viên hải quan kinh nghiệm rà soát hồ sơ 2 cấp, giúp tỷ lệ thông quan lần đầu luôn >95%.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "thu-tuc-xuat-khau-hang-hoa-quy-trinh-ho-so": [
    {
      type: "paragraph",
      content:
        "Xuất khẩu hàng hóa thành công đòi hỏi doanh nghiệp nắm vững toàn bộ quy trình từ khâu đàm phán thương mại, chuẩn bị hàng hóa, đến hoàn thiện bộ chứng từ và khai báo hải quan. Sai sót ở bất kỳ bước nào cũng có thể dẫn đến chậm tiến độ giao hàng, bị khách hàng phạt vi phạm hợp đồng hoặc tốn kém chi phí phát sinh.",
    },
    {
      type: "heading",
      content: "Bước 1: Đàm phán Hợp đồng Ngoại thương",
    },
    {
      type: "paragraph",
      content:
        "Hợp đồng ngoại thương (Sales Contract/Purchase Contract) là nền tảng pháp lý cho toàn bộ giao dịch xuất khẩu. Các điều khoản quan trọng cần thỏa thuận rõ ràng bao gồm:",
    },
    {
      type: "list",
      items: [
        "Mô tả hàng hóa: tên hàng, mã HS, tiêu chuẩn chất lượng, quy cách đóng gói",
        "Số lượng và đơn vị tính: MT, CBM, PCS, SET, KGS...",
        "Đơn giá và tổng trị giá: đồng tiền thanh toán (USD/EUR/JPY...)",
        "Điều kiện giao hàng Incoterms 2020: EXW, FOB, CIF, DAP, DDP...",
        "Phương thức và điều kiện thanh toán: L/C at sight, T/T 30% advance, D/P...",
        "Cảng/sân bay xuất – cảng/sân bay đến",
        "Thời gian giao hàng và hình thức xử lý vi phạm",
        "Luật áp dụng và điều khoản trọng tài",
      ],
    },
    {
      type: "heading",
      content: "Bước 2: Chuẩn bị hàng hóa và bộ chứng từ xuất khẩu",
    },
    {
      type: "paragraph",
      content:
        "Bộ chứng từ xuất khẩu chuẩn bao gồm các tài liệu sau. Một số thị trường có yêu cầu riêng về chứng nhận:",
    },
    {
      type: "table",
      rows: [
        { label: "Commercial Invoice",              value: "Hóa đơn thương mại – cơ sở tính thuế và khai hải quan" },
        { label: "Packing List",                    value: "Phiếu đóng gói chi tiết từng kiện, thùng, container" },
        { label: "Bill of Lading / Airwaybill",     value: "Vận đơn – do hãng tàu hoặc hãng bay cấp sau khi nhận hàng" },
        { label: "Certificate of Origin (C/O)",     value: "Form A (GSP), Form D (ASEAN), Form E (ACFTA), EUR.1 (EVFTA)..." },
        { label: "Phytosanitary Certificate",       value: "Kiểm dịch thực vật – bắt buộc với nông sản, thực phẩm từ thực vật" },
        { label: "Health Certificate",              value: "Chứng nhận vệ sinh an toàn thực phẩm – theo yêu cầu thị trường đến" },
        { label: "Fumigation Certificate",          value: "Chứng nhận hun trùng – yêu cầu bắt buộc của nhiều thị trường" },
        { label: "Certificate of Analysis (COA)",   value: "Phân tích chất lượng – dành cho hóa chất, thực phẩm chế biến" },
      ],
    },
    {
      type: "heading",
      content: "Bước 3: Khai báo hải quan xuất khẩu",
    },
    {
      type: "paragraph",
      content:
        "Khai báo hải quan xuất khẩu thực hiện trên hệ thống VNACCS trước khi hàng hóa được đưa vào khu vực giám sát hải quan tại cảng. Doanh nghiệp hoặc đại lý hải quan ủy quyền thực hiện khai và chịu trách nhiệm về tính chính xác của thông tin khai báo.",
    },
    {
      type: "list",
      items: [
        "Thời điểm khai: trước khi đưa hàng vào cảng/kho ngoại quan ít nhất 2 giờ",
        "Thông tin bắt buộc: tên hàng, mã HS, trị giá, xuất xứ, số lượng, trọng lượng, điều kiện giao hàng",
        "Số tiêu thụ đặc biệt và VAT: xác định nghĩa vụ thuế xuất khẩu (nếu có – chủ yếu với một số tài nguyên khoáng sản)",
        "Đăng ký kiểm tra: nếu hàng thuộc danh mục kiểm tra chuyên ngành",
      ],
    },
    {
      type: "heading",
      content: "Incoterms 2020 – Chọn điều kiện phù hợp",
    },
    {
      type: "paragraph",
      content:
        "Lựa chọn điều kiện Incoterms ảnh hưởng trực tiếp đến chi phí, rủi ro và trách nhiệm giữa người bán và người mua. Đây là yếu tố quan trọng cần cân nhắc kỹ khi đàm phán hợp đồng:",
    },
    {
      type: "table",
      rows: [
        { label: "EXW (Ex Works)",    value: "Người mua chịu mọi chi phí và rủi ro từ kho người bán. Ít rủi ro nhất cho người bán" },
        { label: "FOB (Free on Board)", value: "Người bán chịu đến khi hàng lên tàu tại cảng đi. Phổ biến nhất trong XNK Việt Nam" },
        { label: "CIF (Cost, Insurance, Freight)", value: "Người bán chịu cước biển và bảo hiểm đến cảng đến. Thông dụng trong nhập khẩu" },
        { label: "DAP (Delivered at Place)", value: "Người bán giao tận địa điểm quy định ở nước đến, chưa thông quan nhập" },
        { label: "DDP (Delivered Duty Paid)", value: "Người bán chịu toàn bộ đến tay người mua, kể cả thuế nhập khẩu" },
      ],
    },
    {
      type: "note",
      content:
        "Khuyến nghị: Doanh nghiệp Việt Nam xuất khẩu nên ưu tiên điều kiện FOB để kiểm soát phần cước và bảo hiểm về phía người mua, tránh rủi ro phát sinh khi chưa quen với thị trường đến. Khi đã có kinh nghiệm, có thể chuyển sang CIF để tăng doanh thu từ cước phí.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "cap-nhat-van-tai-chuoi-cung-ung-2026": [
    {
      type: "paragraph",
      content:
        "Ngành logistics và chuỗi cung ứng toàn cầu năm 2026 đang trong giai đoạn tái cấu trúc sâu sắc sau những năm biến động do dịch bệnh, xung đột địa chính trị và biến đổi khí hậu. Việt Nam, với vị trí địa lý chiến lược và lực lượng lao động dồi dào, đang nổi lên như một trung tâm logistics mới của khu vực ASEAN.",
    },
    {
      type: "heading",
      content: "1. Biến động cước vận tải biển 2026",
    },
    {
      type: "paragraph",
      content:
        "Cước container đường biển trong năm 2026 tiếp tục ghi nhận biến động mạnh. Tuyến Á-Âu tăng cao do các hãng tàu phải đi đường vòng qua mũi Hảo Vọng (Cape of Good Hope) thay vì kênh đào Suez để tránh rủi ro an ninh ở Biển Đỏ, làm tăng thêm 10–15 ngày hành trình và chi phí nhiên liệu đáng kể.",
    },
    {
      type: "table",
      rows: [
        { label: "Châu Á – Châu Âu (FCL 40')", value: "6,500–8,000 USD (tăng ~35% so với Q1/2025)" },
        { label: "Châu Á – Bờ Đông Mỹ (FCL 40')", value: "5,000–6,500 USD (tăng ~20%)" },
        { label: "Intra-Asia (nội Á)",             value: "800–1,500 USD (ổn định)" },
        { label: "Việt Nam – Nhật Bản (FCL 20')", value: "600–900 USD (ổn định)" },
      ],
    },
    {
      type: "note",
      content:
        "Lưu ý: Cước vận tải biển thay đổi theo tuần. Liên hệ HDT Logistics để nhận báo giá cập nhật nhất.",
    },
    {
      type: "heading",
      content: "2. Xu hướng China Plus One – Cơ hội cho Việt Nam",
    },
    {
      type: "paragraph",
      content:
        "Chiến lược \"China Plus One\" (đa dạng hóa sản xuất ngoài Trung Quốc) đang được hầu hết các tập đoàn đa quốc gia Mỹ, Nhật, EU triển khai mạnh mẽ. Việt Nam là điểm đến ưu tiên nhờ: chi phí lao động cạnh tranh, hệ thống FTA rộng khắp, cơ sở hạ tầng cảng biển phát triển và môi trường đầu tư cải thiện nhanh.",
    },
    {
      type: "list",
      items: [
        "Samsung: đã chuyển phần lớn sản xuất smartphone từ Trung Quốc về Việt Nam (Thái Nguyên, Bắc Ninh)",
        "Intel: nhà máy kiểm định chip lớn nhất thế giới đặt tại TP. HCM",
        "Nike, Adidas: hơn 50% sản phẩm giày dép sản xuất tại Việt Nam",
        "Apple: đang đẩy mạnh sản xuất MacBook, iPad, AirPods tại Việt Nam",
        "LG: nhà máy linh kiện điện tử tại Hải Phòng phục vụ xuất khẩu toàn cầu",
      ],
    },
    {
      type: "heading",
      content: "3. Số hóa logistics – Xu hướng không thể đảo ngược",
    },
    {
      type: "paragraph",
      content:
        "Chuyển đổi số trong ngành logistics đang diễn ra với tốc độ nhanh chưa từng có. Các công nghệ như AI, IoT, Blockchain và Big Data đang được ứng dụng rộng rãi để tối ưu vận hành, giảm chi phí và nâng cao trải nghiệm khách hàng.",
    },
    {
      type: "list",
      items: [
        "TMS (Transportation Management System): tối ưu lộ trình, giảm 15–25% chi phí vận tải",
        "WMS (Warehouse Management System): quản lý kho thời gian thực, giảm sai sót đóng gói",
        "Tracking & Visibility Platform: theo dõi lô hàng end-to-end, cập nhật real-time",
        "e-Customs: khai báo hải quan điện tử 100%, giảm thời gian thông quan",
        "Blockchain: truy xuất nguồn gốc hàng hóa, chống gian lận chứng từ",
        "AI Demand Forecasting: dự báo nhu cầu chính xác, tối ưu tồn kho",
      ],
    },
    {
      type: "heading",
      content: "4. Logistics xanh – Xu hướng bắt buộc từ thị trường EU",
    },
    {
      type: "paragraph",
      content:
        "Quy định Carbon Border Adjustment Mechanism (CBAM) của EU chính thức có hiệu lực đầy đủ từ 2026, áp thuế carbon lên hàng nhập khẩu vào EU với mức phát thải vượt tiêu chuẩn. Các doanh nghiệp xuất khẩu vào EU cần tính toán và giảm dấu chân carbon (carbon footprint) trong toàn bộ chuỗi cung ứng, bao gồm cả quá trình vận chuyển.",
    },
    {
      type: "note",
      content:
        "HDT Logistics đang triển khai các giải pháp vận tải bền vững: tối ưu trọng tải xe để giảm số chuyến, ưu tiên tuyến đường sắt thay đường bộ dài ngày, và đang nghiên cứu đội xe điện cho vận chuyển nội địa.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "huong-dan-thu-tuc-xnk-tai-lieu-logistics-dn": [
    {
      type: "paragraph",
      content:
        "Trong hoạt động xuất nhập khẩu, việc nắm vững nghiệp vụ thực tế không chỉ giúp doanh nghiệp tự tin hơn khi làm việc với đối tác quốc tế mà còn giúp tối ưu chi phí, tránh các bẫy pháp lý phổ biến. Bài viết này tổng hợp những kiến thức thực hành quan trọng nhất mà bộ phận logistics và xuất nhập khẩu cần nắm vững.",
    },
    {
      type: "heading",
      content: "Phần 1: Mã HS (Harmonized System Code) – Nền tảng của mọi thủ tục hải quan",
    },
    {
      type: "paragraph",
      content:
        "Mã HS (Harmonized System Code) là hệ thống phân loại hàng hóa quốc tế, gồm 6 chữ số do Tổ chức Hải quan Thế giới (WCO) quy định. Việt Nam sử dụng mã HS 8 chữ số (thêm 2 chữ số quốc gia). Mã HS quyết định: mức thuế suất nhập khẩu, chính sách quản lý chuyên ngành, và tuyến FTA được hưởng ưu đãi.",
    },
    {
      type: "list",
      items: [
        "2 chữ số đầu: Chương (Chapter) – nhóm hàng lớn (ví dụ: 84 = Máy móc cơ khí)",
        "4 chữ số: Nhóm (Heading) – phân loại cụ thể hơn (ví dụ: 8471 = Máy tính)",
        "6 chữ số: Phân nhóm quốc tế (Subheading) – chuẩn toàn cầu",
        "8 chữ số: Phân nhóm Việt Nam – dùng trong khai hải quan",
        "Tra cứu mã HS: tại website Tổng cục Hải quan (customs.gov.vn) hoặc liên hệ HDT Logistics",
      ],
    },
    {
      type: "note",
      content:
        "Cảnh báo: Khai sai mã HS là lỗi vi phạm hải quan nghiêm trọng. Tùy mức độ, có thể bị phạt tiền 20–100% trị giá hàng vi phạm, thậm chí bị tịch thu hàng hóa nếu cố tình gian lận.",
    },
    {
      type: "heading",
      content: "Phần 2: Tính thuế nhập khẩu – Công thức và ví dụ thực tế",
    },
    {
      type: "paragraph",
      content:
        "Thuế nhập khẩu được tính trên Trị giá Hải quan (Customs Value), xác định theo phương pháp Trị giá Giao dịch (Transaction Value) theo Hiệp định Trị giá WTO. Công thức cơ bản:",
    },
    {
      type: "list",
      items: [
        "Trị giá hải quan = Giá CIF (Cost + Insurance + Freight đến cảng Việt Nam)",
        "Thuế nhập khẩu = Trị giá hải quan × Thuế suất (theo mã HS và thị trường xuất xứ)",
        "Thuế GTGT = (Trị giá hải quan + Thuế nhập khẩu) × 10%",
        "Ví dụ: Nhập 1 container máy móc từ Đức, CIF = 50,000 USD, thuế suất MFN 5%",
        "→ Thuế NK = 50,000 × 5% = 2,500 USD",
        "→ Nếu có C/O EUR.1 (EVFTA): thuế suất 0% = tiết kiệm 2,500 USD",
      ],
    },
    {
      type: "heading",
      content: "Phần 3: Giấy chứng nhận xuất xứ (C/O) – Công cụ tiết kiệm thuế quan trọng",
    },
    {
      type: "paragraph",
      content:
        "C/O (Certificate of Origin) xác nhận hàng hóa có xuất xứ từ một quốc gia cụ thể, cho phép được hưởng mức thuế ưu đãi theo FTA. Mỗi FTA có mẫu C/O riêng và quy tắc xuất xứ khác nhau:",
    },
    {
      type: "table",
      rows: [
        { label: "Form D",     value: "ATIGA – ASEAN nội khối. Do Phòng Quản lý XNK cấp" },
        { label: "Form E",     value: "ACFTA – ASEAN–Trung Quốc. Thuế suất ưu đãi tuyến Trung Quốc" },
        { label: "Form AJ",    value: "AJCEP – ASEAN–Nhật Bản" },
        { label: "Form AK",    value: "AKFTA – ASEAN–Hàn Quốc" },
        { label: "EUR.1",      value: "EVFTA – Việt Nam–EU. Do Phòng Quản lý XNK hoặc VCCI cấp" },
        { label: "C/O CPTPP",  value: "CPTPP – 11 quốc gia. Dạng tự chứng nhận hoặc do cơ quan có thẩm quyền cấp" },
        { label: "Form RCEP",  value: "RCEP – ASEAN+. Hiệu lực từ 2022" },
        { label: "Form A/GSP", value: "Hệ thống ưu đãi thuế quan phổ cập – vào Mỹ, Nhật Bản..." },
      ],
    },
    {
      type: "heading",
      content: "Phần 4: Quản lý rủi ro trong vận chuyển quốc tế",
    },
    {
      type: "paragraph",
      content:
        "Bảo hiểm hàng hóa vận chuyển (Cargo Insurance) là biện pháp bảo vệ tài chính quan trọng, đặc biệt với hàng giá trị cao. Có 3 loại điều kiện bảo hiểm theo Institute Cargo Clauses (ICC):",
    },
    {
      type: "table",
      rows: [
        { label: "ICC (A) – All Risks",    value: "Rủi ro toàn diện nhất. Bồi thường mọi tổn thất trừ các loại trừ cụ thể. Phí bảo hiểm cao nhất" },
        { label: "ICC (B)",               value: "Bảo hiểm rủi ro cơ bản: hỏa hoạn, cháy nổ, mắc cạn, đắm tàu, động đất..." },
        { label: "ICC (C) – Minimum",     value: "Chỉ bồi thường tổn thất chung (General Average) và một số rủi ro tối thiểu. Phí thấp nhất" },
      ],
    },
    {
      type: "note",
      content:
        "Khuyến nghị: Luôn mua bảo hiểm điều kiện ICC (A) cho hàng điện tử, hàng giá trị cao và hàng dễ vỡ. Với hàng nguyên liệu, vật liệu xây dựng thô có thể dùng ICC (C) để tiết kiệm phí. HDT Logistics có thể hỗ trợ mua bảo hiểm hàng hóa với mức phí cạnh tranh.",
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  "hdt-logistics-giai-phap-van-chuyen-hai-quan-dn": [
    {
      type: "paragraph",
      content:
        "Trong bối cảnh hoạt động xuất nhập khẩu ngày càng phức tạp với nhiều quy định pháp lý thay đổi liên tục, chi phí vận tải biến động và yêu cầu ngày càng cao từ khách hàng quốc tế, việc lựa chọn đúng đối tác logistics có thể tạo ra lợi thế cạnh tranh đáng kể cho doanh nghiệp.",
    },
    {
      type: "heading",
      content: "Mô hình dịch vụ 3 trong 1 của HDT Logistics",
    },
    {
      type: "paragraph",
      content:
        "HDT Logistics xây dựng mô hình dịch vụ tích hợp 3 nhóm chức năng cốt lõi: Vận chuyển (Transportation) – Hải quan (Customs Brokerage) – Tư vấn chuỗi cung ứng (Supply Chain Consulting). Sự tích hợp này giúp doanh nghiệp tiết kiệm thời gian làm việc với nhiều nhà cung cấp, giảm rủi ro thông tin không đồng bộ và kiểm soát chi phí tổng thể hiệu quả hơn.",
    },
    {
      type: "heading",
      content: "Triết lý vận hành: High Delivery – High Discipline – High Reliability",
    },
    {
      type: "list",
      items: [
        "High Delivery (Tốc độ xử lý cao): Báo giá trong 2 giờ, booking trong ngày, cập nhật trạng thái liên tục",
        "High Discipline (Kỷ luật chứng từ): Hồ sơ rà soát 2 cấp trước khi nộp, tỷ lệ thông quan lần đầu >95%",
        "High Reliability (Độ tin cậy cao): Cam kết tiến độ, báo cáo minh bạch, xử lý phát sinh 24/7",
      ],
    },
    {
      type: "heading",
      content: "Đối tượng khách hàng trọng tâm",
    },
    {
      type: "paragraph",
      content:
        "HDT Logistics chuyên phục vụ khách hàng doanh nghiệp (B2B), tập trung vào 3 nhóm đối tượng:",
    },
    {
      type: "table",
      rows: [
        { label: "Doanh nghiệp sản xuất", value: "Nhà máy cần nhập khẩu nguyên liệu định kỳ và xuất khẩu thành phẩm. Cần đối tác logistics ổn định, linh hoạt theo mùa vụ sản xuất" },
        { label: "Công ty thương mại XNK", value: "Công ty xuất nhập khẩu nhiều lô hàng mỗi tháng, cần tư vấn tuyến tối ưu và xử lý hồ sơ nhanh chóng" },
        { label: "Doanh nghiệp FDI", value: "Công ty vốn nước ngoài cần đối tác logistics am hiểu quy định VN, hỗ trợ tiếng Anh/Nhật/Hàn và báo cáo chuẩn quốc tế" },
      ],
    },
    {
      type: "heading",
      content: "Mạng lưới hoạt động",
    },
    {
      type: "list",
      items: [
        "5 văn phòng: Hà Nội (trụ sở), Thái Nguyên, Hải Phòng, Đà Nẵng, TP. Hồ Chí Minh",
        "Đối tác hãng tàu trực tiếp: Yang Ming, SITC, RCL, PIL, OOCL, ONE, COSCO, CMA CGM",
        "Thành viên hiệp hội: FIATA, IATA, VIFFAS, VLA và các hiệp hội logistics quốc tế",
        "Phủ sóng tuyến biển: Châu Á, Châu Âu, Bắc Mỹ, Trung Đông, Châu Phi",
        "Vận tải nội địa: 63 tỉnh thành, xuyên biên giới ASEAN và Trung Quốc",
      ],
    },
    {
      type: "note",
      content:
        "Bạn cần tư vấn giải pháp logistics cho doanh nghiệp? Liên hệ HDT Logistics qua hotline +84 929 959 699 hoặc điền form yêu cầu tư vấn. Đội ngũ chuyên gia sẵn sàng phân tích và đề xuất phương án phù hợp nhất trong vòng 2 giờ làm việc.",
    },
  ],
};
