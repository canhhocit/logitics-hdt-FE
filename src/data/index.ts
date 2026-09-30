// ─────────────────────────────────────────────
//  COMPANY INFO  (dùng toàn site)
// ─────────────────────────────────────────────
export const company = {
  name: "Công ty TNHH Đầu Tư Kinh Doanh Và Xây Dựng Hải Đăng",
  shortName: "HDT Logistics",
  taxCode: "4601607741",
  licenseDate: "15/07/2023",
  licenseOrg: "Sở Tài Chính Thái Nguyên",
  hotline: "+84 929 959 699",
  hotlineRaw: "0929959699",
  hotlineContact: "0563 877 509",   // trang Liên hệ
  hotlineContactRaw: "0563877509",
  email: "info@hdtlogistics.vn",
  emailSales: "sales@hdtlogistics.vn",
  workingHours: "06:00 – 22:00",
  social: {
    facebook: "https://facebook.com/hdtlogistics",
    instagram: "https://instagram.com/hdtlogistics",
    twitter: "https://twitter.com/hdtlogistics",
    email: "mailto:info@hdtlogistics.vn",
  },
};

// ─────────────────────────────────────────────
//  OFFICES  (M01.03, M07.02)
// ─────────────────────────────────────────────
export const offices = [
  {
    region: "Miền Bắc",
    branches: [
      {
        name: "Chi nhánh Hà Nội",
        address: "Tầng 5, Tòa nhà Logistics, 123 Đường Vận Tải, Quận Bắc Từ Liêm, Hà Nội",
        tel: "(024) 1234 5678",
        telRaw: "02412345678",
      },
      {
        name: "Chi nhánh Thái Nguyên",
        address: "Số 45 Đường Thống Nhất, TP. Thái Nguyên, Thái Nguyên",
        tel: "(0208) 123 4567",
        telRaw: "02081234567",
      },
      {
        name: "Chi nhánh Hải Phòng",
        address: "Khu Công nghiệp VSIP, Số 12 Đường Cảng, Quận Hải An, Hải Phòng",
        tel: "(0225) 123 4567",
        telRaw: "02251234567",
      },
    ],
  },
  {
    region: "Miền Trung",
    branches: [
      {
        name: "Chi nhánh Đà Nẵng",
        address: "Số 89 Đường Cảng Biển, Quận Sơn Trà, TP. Đà Nẵng",
        tel: "(0236) 123 4567",
        telRaw: "02361234567",
      },
    ],
  },
  {
    region: "Miền Nam",
    branches: [
      {
        name: "Chi nhánh TP. Hồ Chí Minh",
        address: "Tầng 3, 456 Đường Vận Tải, Phường Bình Hưng Hòa, Quận Bình Tân, TP. HCM",
        tel: "(028) 1234 5678",
        telRaw: "02812345678",
      },
    ],
  },
];

// ─────────────────────────────────────────────
//  CONTACTS  (M07.01)
// ─────────────────────────────────────────────
export const contacts = [
  {
    name: "Nguyễn Văn Minh",
    title: "Giám đốc Khu vực Miền Bắc",
    email: "minhngv@hdtlogistics.vn",
    region: "Miền Bắc",
    initials: "NVM",
  },
  {
    name: "Trần Thị Lan",
    title: "Giám đốc Khu vực Trung – Nam",
    email: "lantth@hdtlogistics.vn",
    region: "Miền Trung – Nam",
    initials: "TTL",
  },
  {
    name: "Lê Quốc Hùng",
    title: "Phó Giám đốc Kinh doanh Hà Nội",
    email: "hunglq@hdtlogistics.vn",
    region: "Hà Nội",
    initials: "LQH",
  },
  {
    name: "Phạm Thu Hằng",
    title: "Giám đốc Chi nhánh TP. HCM",
    email: "hangpt@hdtlogistics.vn",
    region: "TP. HCM",
    initials: "PTH",
  },
  {
    name: "Đỗ Mạnh Tuấn",
    title: "Quản lý Văn phòng Thái Nguyên",
    email: "tuandm@hdtlogistics.vn",
    region: "Thái Nguyên",
    initials: "ĐMT",
  },
];

// ─────────────────────────────────────────────
//  SERVICES  (M02.02, M04)
// ─────────────────────────────────────────────
export const services = [
  {
    no: "01",
    slug: "van-chuyen-duong-khong",
    title: "Vận Chuyển Đường Không",
    shortDesc: "Air freight quốc tế tốc độ cao — hàng giá trị, hàng gấp, hàng công nghệ. Kết nối 50+ hãng bay, tính cước theo kg thể tích.",
    icon: "plane",
    color: "blue",
  },
  {
    no: "02",
    slug: "van-chuyen-duong-bien",
    title: "Vận Chuyển Đường Biển",
    shortDesc: "FCL, LCL, container lạnh, hàng rời — tới 100+ cảng biển toàn cầu. Booking trực tiếp Yang Ming, SITC, CMA CGM...",
    icon: "ship",
    color: "cyan",
  },
  {
    no: "03",
    slug: "gom-hang-le-lcl",
    title: "Gom Hàng Lẻ (LCL)",
    shortDesc: "Ghép hàng lẻ vào container chung, tính cước theo CBM. Lịch gom hàng cố định hàng tuần, tiết kiệm chi phí tối đa.",
    icon: "boxes",
    color: "teal",
  },
  {
    no: "04",
    slug: "van-chuyen-duong-bo",
    title: "Vận Chuyển Đường Bộ",
    shortDesc: "Vận tải nội địa Bắc–Trung–Nam và xuyên biên giới ASEAN. Xe tải/container 1–40 tấn, GPS tracking 24/7.",
    icon: "truck",
    color: "green",
  },
  {
    no: "05",
    slug: "khai-thue-hai-quan",
    title: "Khai Thuê Hải Quan",
    shortDesc: "Khai báo tờ khai điện tử VNACCS, phân luồng, thông quan, nộp thuế. Tỷ lệ thông quan lần đầu >95%.",
    icon: "file-text",
    color: "orange",
  },
  {
    no: "06",
    slug: "hang-dac-biet-du-an",
    title: "Hàng Đặc Biệt / Hàng Dự Án",
    shortDesc: "Hàng OOG, siêu trường siêu trọng, thiết bị dự án, hàng nguy hiểm/lạnh. Xử lý kịp thời, an toàn, chi phí hợp lý.",
    icon: "star",
    color: "rose",
  },
];

// ─────────────────────────────────────────────
//  PARTNERS – SHIPPING LINES  (M02.05)
// ─────────────────────────────────────────────
export const shippingLines = [
  "Yang Ming", "SITC", "RCL", "PIL",
  "OOCL", "ONE", "COSCO", "CMA CGM",
];

// ─────────────────────────────────────────────
//  ASSOCIATIONS  (M02.06)
// ─────────────────────────────────────────────
export const associations = [
  "FIATA", "IATA", "Lognet", "MLN",
  "Neptune", "OLO", "VIFFAS", "VLA",
];

// ─────────────────────────────────────────────
//  STATS  (M02.04)
// ─────────────────────────────────────────────
export const stats = [
  { target: 50,   suffix: "+", label: "Nhân Sự",     sub: "Chuyên môn nghiệp vụ" },
  { target: 5,    suffix: "",  label: "Văn Phòng",    sub: "3 miền toàn quốc" },
  { target: 1500, suffix: "+", label: "Chuyến Hàng",  sub: "Đã thực hiện thành công" },
];

// ─────────────────────────────────────────────
//  TESTIMONIALS  (M02.08, M04.02.06)
// ─────────────────────────────────────────────
export const testimonials = [
  {
    quote:
      "HDT Logistics hỗ trợ rất sát trong khâu chứng từ và lịch tàu. Các lô hàng xuất đi được theo dõi liên tục, cập nhật rõ ràng từng chặng. Khi có thay đổi về lịch, đội ngũ xử lý nhanh và đề xuất phương án thay thế ngay, không làm gián đoạn kế hoạch giao hàng của chúng tôi.",
    type: "Doanh nghiệp",
    industry: "Sản xuất linh kiện",
  },
  {
    quote:
      "Điểm tốt là tư vấn tuyến vận chuyển và thủ tục hải quan khá chi tiết. Hồ sơ được rà soát trước nên tỷ lệ phải bổ sung chứng từ thấp. Thời gian phản hồi nhanh, dễ phối hợp, phù hợp với doanh nghiệp cần xử lý nhiều lô hàng mỗi tháng.",
    type: "Công ty",
    industry: "Thương mại xuất nhập khẩu",
  },
  {
    quote:
      "Chúng tôi cần đối tác logistics làm việc theo quy trình và có báo cáo rõ. HDT Logistics đáp ứng tốt yêu cầu theo dõi tiến độ, bảng kê chi phí minh bạch và hỗ trợ xử lý phát sinh ngoài giờ khi cần. Mức độ phối hợp ổn định và chuyên nghiệp.",
    type: "Doanh nghiệp",
    industry: "FDI ngành công nghiệp",
  },
];

// ─────────────────────────────────────────────
//  NEWS  (M06)
// ─────────────────────────────────────────────
export type NewsCategory = "huong-dan-va-thu-tuc" | "tin-nganh-logistics";

export const newsCategories = [
  { slug: "huong-dan-va-thu-tuc",  label: "Hướng dẫn và Thủ tục" },
  { slug: "tin-nganh-logistics",   label: "Tin ngành Logistics" },
];

export const newsItems = [
  {
    id: 1,
    slug: "chinh-sach-thu-tuc-xuat-nhap-khau",
    title: "Chính sách & Thủ tục Xuất Nhập Khẩu — Tổng hợp mới nhất 2026",
    excerpt:
      "Tổng hợp các chính sách và thủ tục xuất nhập khẩu mới nhất năm 2026. Doanh nghiệp cần nắm rõ các quy định về mã HS, giấy phép chuyên ngành và biểu thuế ưu đãi theo các FTA thế hệ mới CPTPP, EVFTA, RCEP.",
    date: "30/01/2026",
    dateISO: "2026-01-30",
    readMinutes: 8,
    category: "huong-dan-va-thu-tuc" as NewsCategory,
    categoryLabel: "Hướng dẫn và Thủ tục",
    image: "/images/news/news-xnk-policy.jpg",
    imageAlt: "Hàng hóa container tại cảng biển Việt Nam",
    imageCredit: "Photo by Unsplash",
  },
  {
    id: 2,
    slug: "thu-tuc-nhap-khau-hang-hoa-quy-trinh-ho-so",
    title: "Thủ tục Nhập khẩu hàng hóa — Quy trình & Hồ sơ chi tiết",
    excerpt:
      "Hướng dẫn chi tiết quy trình nhập khẩu hàng hóa vào Việt Nam: từ ký hợp đồng ngoại thương, mở L/C, vận chuyển về cảng đến khai báo hải quan điện tử VNACCS và thông quan nhận hàng.",
    date: "30/01/2026",
    dateISO: "2026-01-30",
    readMinutes: 10,
    category: "huong-dan-va-thu-tuc" as NewsCategory,
    categoryLabel: "Hướng dẫn và Thủ tục",
    image: "/images/news/news-import.jpg",
    imageAlt: "Container tàu biển nhập khẩu hàng hóa tại cảng",
    imageCredit: "Photo by Unsplash",
  },
  {
    id: 3,
    slug: "thu-tuc-xuat-khau-hang-hoa-quy-trinh-ho-so",
    title: "Thủ tục Xuất khẩu hàng hóa — Quy trình & Hồ sơ chi tiết",
    excerpt:
      "Quy trình xuất khẩu hàng hóa từ Việt Nam ra nước ngoài: đàm phán hợp đồng ngoại thương, xác định Incoterms phù hợp, chuẩn bị bộ chứng từ hoàn chỉnh (Invoice, P/L, B/L, C/O) và khai báo hải quan.",
    date: "30/01/2026",
    dateISO: "2026-01-30",
    readMinutes: 9,
    category: "huong-dan-va-thu-tuc" as NewsCategory,
    categoryLabel: "Hướng dẫn và Thủ tục",
    image: "/images/news/news-export.jpg",
    imageAlt: "Máy bay chở hàng tại sân bay quốc tế",
    imageCredit: "Photo by Unsplash",
  },
  {
    id: 4,
    slug: "cap-nhat-van-tai-chuoi-cung-ung-2026",
    title: "Cập nhật Vận tải & Chuỗi cung ứng — Xu hướng và thách thức 2026",
    excerpt:
      "Ngành logistics toàn cầu năm 2026 đối mặt với nhiều biến động: cước biển tăng mạnh do tình trạng tắc nghẽn kênh đào Suez, chuỗi cung ứng dịch chuyển sang Đông Nam Á và xu hướng số hóa logistics.",
    date: "30/01/2026",
    dateISO: "2026-01-30",
    readMinutes: 6,
    category: "tin-nganh-logistics" as NewsCategory,
    categoryLabel: "Tin ngành Logistics",
    image: "/images/news/news-logistics-trend.jpg",
    imageAlt: "Tàu container vận tải biển quốc tế",
    imageCredit: "Photo by Unsplash",
  },
  {
    id: 5,
    slug: "huong-dan-thu-tuc-xnk-tai-lieu-logistics-dn",
    title: "Hướng dẫn & Thủ tục XNK — Tài liệu thực hành cho Doanh nghiệp",
    excerpt:
      "Bộ tài liệu thực hành xuất nhập khẩu dành cho doanh nghiệp: phân loại mã HS chính xác, tính thuế nhập khẩu, xin giấy chứng nhận xuất xứ C/O theo các FTA và quản lý rủi ro trong vận chuyển quốc tế.",
    date: "30/01/2026",
    dateISO: "2026-01-30",
    readMinutes: 12,
    category: "huong-dan-va-thu-tuc" as NewsCategory,
    categoryLabel: "Hướng dẫn và Thủ tục",
    image: "/images/news/news-guide-xnk.jpg",
    imageAlt: "Kho hàng logistics hiện đại với hệ thống quản lý WMS",
    imageCredit: "Photo by Unsplash",
  },
  {
    id: 6,
    slug: "hdt-logistics-giai-phap-van-chuyen-hai-quan-dn",
    title: "HDT Logistics — Giải pháp vận chuyển & hải quan toàn diện cho Doanh nghiệp",
    excerpt:
      "HDT Logistics cung cấp dịch vụ logistics tổng thể theo mô hình High Delivery – High Discipline – High Reliability: vận chuyển đa phương thức, khai thuê hải quan và tối ưu chuỗi cung ứng cho doanh nghiệp B2B.",
    date: "30/01/2026",
    dateISO: "2026-01-30",
    readMinutes: 5,
    category: "tin-nganh-logistics" as NewsCategory,
    categoryLabel: "Tin ngành Logistics",
    image: "/images/news/news-hd-intro.jpg",
    imageAlt: "Đội ngũ chuyên gia logistics HDT Logistics tư vấn doanh nghiệp",
    imageCredit: "Photo by Unsplash",
  },
];

// ─────────────────────────────────────────────
//  CAREERS  (M07 / tuyển dụng)
// ─────────────────────────────────────────────
export const careers = [
  {
    id: 1,
    title: "Nhân viên Kinh doanh Logistics",
    department: "Kinh doanh",
    location: "Hà Nội / TP. Hồ Chí Minh",
    type: "Toàn thời gian",
    salary: "15 – 25 triệu VNĐ",
    deadline: "31/10/2026",
    description:
      "Tìm kiếm và phát triển khách hàng doanh nghiệp trong lĩnh vực vận tải và logistics. Duy trì quan hệ khách hàng, tư vấn giải pháp vận chuyển và hải quan phù hợp.",
    requirements: [
      "Tốt nghiệp Đại học chuyên ngành Kinh tế, Ngoại thương hoặc liên quan",
      "Kinh nghiệm 1–2 năm trong lĩnh vực logistics/vận tải",
      "Kỹ năng giao tiếp và thuyết phục tốt",
      "Chịu được áp lực công việc, tư duy kinh doanh tốt",
    ],
  },
  {
    id: 2,
    title: "Chuyên viên Khai báo Hải quan",
    department: "Hải quan",
    location: "Hà Nội / Hải Phòng",
    type: "Toàn thời gian",
    salary: "12 – 20 triệu VNĐ",
    deadline: "31/10/2026",
    description:
      "Khai báo hải quan điện tử VNACCS/VCIS cho hàng xuất nhập khẩu. Tư vấn phân loại HS Code, xử lý hồ sơ thông quan và làm việc với cơ quan hải quan.",
    requirements: [
      "Tốt nghiệp Đại học Ngoại thương, Hải quan hoặc liên quan",
      "Có chứng chỉ đại lý hải quan là lợi thế",
      "Kinh nghiệm khai báo VNACCS 1+ năm",
      "Am hiểu Incoterms, quy trình XNK",
    ],
  },
  {
    id: 3,
    title: "Nhân viên Điều phối Vận tải",
    department: "Vận hành",
    location: "Hà Nội / TP. HCM",
    type: "Toàn thời gian",
    salary: "10 – 16 triệu VNĐ",
    deadline: "31/10/2026",
    description:
      "Điều phối xe tải, liên hệ đối tác vận chuyển, theo dõi lịch trình và xử lý phát sinh trong quá trình vận chuyển hàng hóa nội địa và quốc tế.",
    requirements: [
      "Tốt nghiệp Đại học/Cao đẳng chuyên ngành liên quan",
      "Kinh nghiệm điều phối vận tải 1+ năm",
      "Kỹ năng giao tiếp tốt, chịu áp lực",
      "Biết sử dụng Excel và phần mềm quản lý vận tải",
    ],
  },
  {
    id: 4,
    title: "Chuyên viên Kinh doanh Hàng Hải (Sea Freight)",
    department: "Kinh doanh",
    location: "Hải Phòng / TP. HCM",
    type: "Toàn thời gian",
    salary: "15 – 28 triệu VNĐ",
    deadline: "31/10/2026",
    description:
      "Phát triển khách hàng sử dụng dịch vụ vận chuyển đường biển FCL/LCL. Đàm phán cước với hãng tàu, tư vấn tuyến phù hợp và theo dõi hành trình container.",
    requirements: [
      "Kinh nghiệm 2+ năm trong lĩnh vực Sea Freight",
      "Có mạng lưới khách hàng xuất nhập khẩu là lợi thế lớn",
      "Tiếng Anh thương mại tốt",
      "Am hiểu Incoterms, B/L và quy trình booking hãng tàu",
    ],
  },
  {
    id: 5,
    title: "Kế toán Logistics",
    department: "Kế toán – Tài chính",
    location: "Hà Nội",
    type: "Toàn thời gian",
    salary: "10 – 15 triệu VNĐ",
    deadline: "31/10/2026",
    description:
      "Hạch toán doanh thu và chi phí dịch vụ logistics, đối chiếu công nợ với khách hàng và đối tác, lập báo cáo tài chính định kỳ.",
    requirements: [
      "Tốt nghiệp Đại học Kế toán, Tài chính",
      "Kinh nghiệm kế toán 1+ năm, ưu tiên ngành logistics",
      "Thành thạo Excel, phần mềm kế toán (MISA, FAST...)",
      "Cẩn thận, tỉ mỉ, trung thực",
    ],
  },
];
