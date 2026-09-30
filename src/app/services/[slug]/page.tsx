import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight, ArrowRight, CheckCircle, Phone,
  Plane, Ship, Boxes, Truck, FileText, Star,
} from "lucide-react";
import TestimonialsBlock from "@/components/shared/TestimonialsBlock";
import CTABlock          from "@/components/shared/CTABlock";

const iconMap: Record<string, React.ReactNode> = {
  "van-chuyen-duong-khong": <Plane size={32} />,
  "van-chuyen-duong-bien":  <Ship size={32} />,
  "gom-hang-le-lcl":        <Boxes size={32} />,
  "van-chuyen-duong-bo":    <Truck size={32} />,
  "khai-thue-hai-quan":     <FileText size={32} />,
  "hang-dac-biet-du-an":    <Star size={32} />,
};

const colorMap: Record<string, string> = {
  "van-chuyen-duong-khong": "bg-blue-100 text-blue-600",
  "van-chuyen-duong-bien":  "bg-cyan-100 text-cyan-600",
  "gom-hang-le-lcl":        "bg-teal-100 text-teal-600",
  "van-chuyen-duong-bo":    "bg-green-100 text-green-600",
  "khai-thue-hai-quan":     "bg-orange-100 text-orange-600",
  "hang-dac-biet-du-an":    "bg-rose-100 text-rose-600",
};

type ServiceData = {
  title: string;
  intro: string;
  description: string;
  advantages: { title: string; desc: string }[];
  limitations: string[];
  types: { name: string; desc: string }[];
  suitableGoods: string[];
  process: { step: string; title: string; desc: string }[];
  documents: string[];
  additionalServices: string[];
};

const services: Record<string, ServiceData> = {
  "van-chuyen-duong-khong": {
    title: "Vận Chuyển Đường Không",
    intro: "Air freight quốc tế tốc độ cao, phù hợp hàng giá trị, hàng gấp và hàng công nghệ. Cước tính theo kg thể tích (volumetric weight).",
    description:
      "Vận tải hàng không đã không còn xa lạ với các doanh nghiệp xuất nhập khẩu. HDT Logistics kết nối với hơn 50 hãng hàng không quốc tế, cung cấp dịch vụ Express và Economy linh hoạt. Chúng tôi theo dõi lịch bay liên tục và chủ động đề xuất phương án thay thế khi có thay đổi.",
    advantages: [
      { title: "Tốc độ vượt trội", desc: "Thời gian transit 1–5 ngày tùy tuyến, lý tưởng cho hàng gấp và hàng có yêu cầu thời gian nghiêm ngặt." },
      { title: "Độ tin cậy cao", desc: "Lịch bay cố định, ít biến động hơn đường biển, tỷ lệ giao đúng hẹn cao." },
      { title: "An toàn tối đa", desc: "Quy trình kiểm tra an ninh nghiêm ngặt, tỷ lệ mất/hỏng hàng thấp nhất trong các phương thức vận tải." },
      { title: "Booking linh hoạt", desc: "Đặt chỗ nhanh 1–2 ngày trước ngày bay, phù hợp đơn hàng khẩn cấp phát sinh đột xuất." },
    ],
    limitations: [
      "Chi phí cao hơn đường biển và đường bộ",
      "Hạn chế kích thước và loại hàng (DGR, hàng quá khổ)",
      "Phụ thuộc vào lịch bay của hãng hàng không",
    ],
    types: [
      { name: "Express (Door-to-door)", desc: "Giao tận nơi, nhanh nhất 1–3 ngày. Phù hợp hàng mẫu, tài liệu quan trọng." },
      { name: "Economy Air Freight", desc: "Vận chuyển qua cảng hàng không, 3–7 ngày. Chi phí thấp hơn Express." },
      { name: "Air Charter", desc: "Thuê nguyên chuyến bay cho lô hàng lớn hoặc khẩn cấp cực cao." },
    ],
    suitableGoods: [
      "Hàng điện tử, linh kiện công nghệ cao",
      "Hàng thời trang, hàng hiệu giá trị cao",
      "Dược phẩm, thiết bị y tế",
      "Tài liệu, hồ sơ pháp lý quan trọng",
      "Hàng mẫu thương mại",
      "Thực phẩm tươi sống có yêu cầu nhiệt độ",
    ],
    process: [
      { step: "01", title: "Tiếp nhận & Phân tích", desc: "Nhận thông tin hàng, điểm đi, điểm đến. Đề xuất hãng bay và dịch vụ phù hợp." },
      { step: "02", title: "Booking chuyến bay", desc: "Đặt chỗ với hãng hàng không, xác nhận Airwaybill (AWB)." },
      { step: "03", title: "Chuẩn bị chứng từ", desc: "Commercial Invoice, Packing List, AWB, giấy phép xuất khẩu nếu có." },
      { step: "04", title: "Khai báo hải quan xuất", desc: "Khai VNACCS, thông quan xuất khẩu, đưa hàng ra sân bay." },
      { step: "05", title: "Vận chuyển & Tracking", desc: "Hàng lên tàu bay, cập nhật AWB tracking liên tục." },
      { step: "06", title: "Thông quan nhập & Giao hàng", desc: "Phối hợp đại lý đầu đến, thông quan nhập khẩu, giao tận kho." },
    ],
    documents: [
      "Airwaybill (AWB) – vận đơn hàng không",
      "Commercial Invoice – hóa đơn thương mại",
      "Packing List – phiếu đóng gói",
      "Certificate of Origin (C/O) – nếu hưởng ưu đãi thuế",
      "Giấy phép xuất nhập khẩu (nếu hàng quản lý chuyên ngành)",
      "Dangerous Goods Declaration (nếu có hàng DGR)",
    ],
    additionalServices: [
      "Sea freight FCL/LCL", "Khai thuê hải quan", "Door to door",
      "Hàng lạnh kiểm soát nhiệt độ", "Theo dõi lô hàng real-time",
    ],
  },

  "van-chuyen-duong-bien": {
    title: "Vận Chuyển Đường Biển",
    intro: "FCL, LCL, container lạnh, hàng rời — tới 100+ cảng biển toàn cầu. Booking trực tiếp Yang Ming, SITC, RCL, PIL, OOCL, ONE, COSCO, CMA CGM.",
    description:
      "Vận tải đường biển là phương thức kinh tế nhất cho hàng hóa khối lượng lớn. HDT Logistics có quan hệ trực tiếp với các hãng tàu lớn, đảm bảo booking sớm, không rớt hàng và theo dõi container xuyên suốt hành trình.",
    advantages: [
      { title: "Chi phí tối ưu", desc: "Cước biển thấp nhất trong các phương thức vận tải, đặc biệt với hàng khối lượng lớn." },
      { title: "Đa dạng loại container", desc: "Standard 20'/40', Reefer, Open Top, Flat Rack, Bulk – đáp ứng mọi loại hàng." },
      { title: "Mạng lưới rộng khắp", desc: "100+ cảng đích toàn cầu, phủ sóng mọi thị trường xuất nhập khẩu." },
      { title: "Không giới hạn khối lượng", desc: "Phù hợp cho lô hàng từ vài tấn đến hàng nghìn tấn." },
    ],
    limitations: [
      "Thời gian transit dài hơn đường không (5–35 ngày tùy tuyến)",
      "Phụ thuộc lịch tàu cố định, cần booking trước 1–2 tuần",
      "Rủi ro từ thời tiết và tắc cảng",
    ],
    types: [
      { name: "FCL (Full Container Load)", desc: "Thuê nguyên container. Phù hợp lô hàng ≥15 CBM. An toàn và nhanh hơn LCL." },
      { name: "LCL (Less Container Load)", desc: "Ghép hàng chung container. Phù hợp lô hàng <15 CBM. Tiết kiệm chi phí." },
      { name: "Container lạnh (Reefer)", desc: "Kiểm soát nhiệt độ -25°C đến +25°C. Cho thực phẩm, dược phẩm, hóa chất." },
      { name: "Hàng rời (Bulk/Break Bulk)", desc: "Hàng không đóng container: nông sản, hóa chất rời, thiết bị lớn." },
    ],
    suitableGoods: [
      "Hàng công nghiệp, máy móc thiết bị",
      "Hàng tiêu dùng, đồ gia dụng",
      "Nguyên vật liệu sản xuất",
      "Nông sản xuất khẩu",
      "Hóa chất công nghiệp",
      "Hàng may mặc, giày dép",
    ],
    process: [
      { step: "01", title: "Tư vấn & Báo giá", desc: "Phân tích lô hàng, đề xuất FCL hay LCL, chọn tuyến và hãng tàu tối ưu." },
      { step: "02", title: "Booking tàu", desc: "Đặt chỗ với hãng tàu, nhận Shipping Order (S/O) và thông tin tàu." },
      { step: "03", title: "Đóng hàng & Vận chuyển nội địa", desc: "Giám sát đóng hàng vào container, vận chuyển container ra cảng." },
      { step: "04", title: "Khai báo hải quan xuất", desc: "Nộp tờ khai điện tử, thông quan xuất khẩu, đưa container vào cảng." },
      { step: "05", title: "Lên tàu & Phát hành B/L", desc: "Container lên tàu, nhận Bill of Lading (B/L) chính thức." },
      { step: "06", title: "Vận chuyển biển & Tracking", desc: "Theo dõi tàu qua hệ thống tracking, cập nhật ETA liên tục." },
      { step: "07", title: "Thông quan nhập đầu đến", desc: "Phối hợp đại lý đầu đến, nộp chứng từ thông quan nhập khẩu." },
      { step: "08", title: "Dỡ hàng & Giao nhận", desc: "Dỡ container tại cảng đích, vận chuyển và giao hàng tại kho người nhận." },
      { step: "09", title: "Quyết toán chi phí", desc: "Thanh toán cước và các phụ phí, cung cấp bảng kê chi phí chi tiết." },
      { step: "10", title: "Hoàn thành & Lưu hồ sơ", desc: "Bàn giao đầy đủ chứng từ gốc, lưu trữ hồ sơ lô hàng." },
    ],
    documents: [
      "Bill of Lading (B/L) – vận đơn đường biển",
      "Commercial Invoice – hóa đơn thương mại",
      "Packing List – phiếu đóng gói",
      "Certificate of Origin (C/O) – nếu hưởng ưu đãi FTA",
      "Hợp đồng mua bán ngoại thương",
      "Bảo hiểm hàng hóa",
      "Giấy phép chuyên ngành (nếu có)",
    ],
    additionalServices: [
      "Air freight quốc tế", "Khai thuê hải quan", "Door-to-door",
      "Port-to-port", "Container lạnh", "Hàng dự án OOG",
      "Theo dõi container real-time",
    ],
  },

  "gom-hang-le-lcl": {
    title: "Gom Hàng Lẻ (LCL)",
    intro: "Ghép hàng lẻ vào container chung, tính cước theo CBM (mét khối). Lịch gom hàng cố định hàng tuần, tiết kiệm tối đa chi phí cho lô hàng nhỏ.",
    description:
      "Dịch vụ gom hàng lẻ LCL của HDT Logistics cho phép doanh nghiệp vận chuyển hàng hóa khối lượng nhỏ mà không cần thuê nguyên container. Chúng tôi gom nhiều lô hàng của các khách hàng khác nhau vào một container, chia sẻ chi phí và tối ưu giá cước.",
    advantages: [
      { title: "Tiết kiệm chi phí", desc: "Chỉ trả cước theo khối lượng thực tế, không phải trả cho cả container." },
      { title: "Lịch cố định", desc: "Lịch cut-off và ETD rõ ràng hàng tuần, dễ lên kế hoạch sản xuất và kinh doanh." },
      { title: "Linh hoạt", desc: "Phù hợp từ 0.1 CBM trở lên, không giới hạn tối thiểu quá lớn như FCL." },
      { title: "Không cần hàng đủ container", desc: "Giao hàng ngay khi có, không cần chờ đủ hàng như FCL." },
    ],
    limitations: [
      "Thời gian transit dài hơn FCL do phải chờ gom đủ hàng và deconsolidate đầu đến",
      "Rủi ro lây nhiễm mùi/hư hỏng từ hàng khác trong cùng container",
      "Thủ tục hải quan phức tạp hơn FCL",
    ],
    types: [
      { name: "LCL Import", desc: "Nhập khẩu hàng lẻ từ nước ngoài về Việt Nam theo lịch cố định." },
      { name: "LCL Export", desc: "Xuất khẩu hàng lẻ từ Việt Nam đi nước ngoài, nhiều tuyến hàng tuần." },
      { name: "LCL Cross Trade", desc: "Vận chuyển hàng lẻ giữa hai nước không qua Việt Nam." },
    ],
    suitableGoods: [
      "Hàng mẫu, hàng thử nghiệm",
      "Lô hàng nhỏ dưới 15 CBM",
      "Hàng tiêu dùng, đồ gia dụng",
      "Phụ tùng, linh kiện",
      "Nguyên vật liệu sản xuất nhỏ lẻ",
      "Hàng thương mại điện tử B2B",
    ],
    process: [
      { step: "01", title: "Đăng ký & Báo giá", desc: "Cung cấp thông tin hàng (CBM, GW, hàng hóa, tuyến đi). Nhận báo giá trong 2 giờ." },
      { step: "02", title: "Book space", desc: "Xác nhận space trên lịch gom hàng. Nhận cut-off date và ETD." },
      { step: "03", title: "Đóng gói & Giao hàng vào kho CFS", desc: "Giao hàng tại kho CFS (Container Freight Station) trước cut-off." },
      { step: "04", title: "Khai báo hải quan xuất", desc: "Khai tờ khai LCL, thông quan và đóng hàng vào container." },
      { step: "05", title: "Vận chuyển & Theo dõi", desc: "Tracking container, cập nhật ETA đến cảng đích." },
      { step: "06", title: "Deconsolidate & Giao hàng", desc: "Tại cảng đích, tách hàng ra khỏi container, thông quan và giao nhận." },
    ],
    documents: [
      "House B/L – vận đơn nội bộ của đại lý gom hàng",
      "Commercial Invoice",
      "Packing List",
      "Certificate of Origin (C/O)",
      "Tờ khai hải quan LCL",
    ],
    additionalServices: [
      "FCL full container", "Air freight", "Khai thuê hải quan",
      "Door to door", "Kho bãi & Phân phối",
    ],
  },

  "van-chuyen-duong-bo": {
    title: "Vận Chuyển Đường Bộ",
    intro: "Vận tải nội địa Bắc–Trung–Nam và xuyên biên giới ASEAN, Trung Quốc. Nhanh hơn đường biển, tiết kiệm hơn đường không.",
    description:
      "HDT Logistics vận hành đội xe đa dạng tải trọng 1–40 tấn, phủ sóng 63 tỉnh thành trong nước và các tuyến xuyên biên giới sang Lào, Campuchia, Thái Lan và Trung Quốc. GPS tracking 24/7 và bảo hiểm hàng hóa toàn trình.",
    advantages: [
      { title: "Linh hoạt door-to-door", desc: "Lấy hàng tận nhà kho, giao tận điểm đích không cần trung chuyển qua cảng." },
      { title: "Thời gian hợp lý", desc: "Nhanh hơn đường biển đáng kể. Hà Nội – TP.HCM khoảng 2–3 ngày." },
      { title: "Chi phí trung bình", desc: "Cước thấp hơn hàng không, phù hợp hàng không quá khẩn cấp nhưng cần nhanh hơn tàu biển." },
      { title: "Theo dõi real-time", desc: "GPS gắn trên xe, theo dõi vị trí và hành trình 24/7." },
    ],
    limitations: [
      "Phụ thuộc điều kiện giao thông và thời tiết",
      "Hạn chế tải trọng tại một số tuyến đường",
      "Chi phí cao hơn đường biển cho lô hàng lớn",
    ],
    types: [
      { name: "Xe tải nội địa", desc: "Vận chuyển hàng trong nước 63 tỉnh thành, tải trọng 1–40 tấn." },
      { name: "Xuyên biên giới ASEAN", desc: "Tuyến Việt Nam – Lào, Campuchia, Thái Lan." },
      { name: "Xuyên biên giới Trung Quốc", desc: "Tuyến Việt Nam – Trung Quốc qua Lạng Sơn, Lào Cai, Móng Cái." },
      { name: "Container trucking", desc: "Vận chuyển container từ/đến cảng biển và ICD." },
    ],
    suitableGoods: [
      "Hàng công nghiệp, sản xuất",
      "Hàng tiêu dùng, bán lẻ",
      "Nông sản và thực phẩm",
      "Nguyên vật liệu xây dựng",
      "Thiết bị máy móc",
      "Hàng xuất nhập khẩu từ/đến cảng",
    ],
    process: [
      { step: "01", title: "Nhận yêu cầu", desc: "Xác nhận điểm lấy, điểm giao, loại hàng, tải trọng và yêu cầu đặc biệt." },
      { step: "02", title: "Báo giá & Xác nhận", desc: "Báo giá trong 1 giờ, ký xác nhận đơn hàng." },
      { step: "03", title: "Phân công xe & Lái xe", desc: "Chọn xe phù hợp, phân công lái xe có kinh nghiệm tuyến đường." },
      { step: "04", title: "Lấy hàng", desc: "Xe đến đúng giờ, kiểm tra hàng, ký biên bản, kích hoạt GPS." },
      { step: "05", title: "Vận chuyển", desc: "Theo dõi hành trình real-time, cập nhật trạng thái định kỳ." },
      { step: "06", title: "Giao hàng & Xác nhận", desc: "Giao đúng địa điểm, ký biên bản giao nhận, chụp ảnh xác nhận." },
    ],
    documents: [
      "Lệnh điều xe (Delivery Order)",
      "Phiếu giao nhận hàng hóa",
      "Hóa đơn dịch vụ vận chuyển",
      "Chứng từ hải quan (đối với hàng xuyên biên giới)",
    ],
    additionalServices: [
      "Sea freight FCL/LCL", "Air freight", "Khai thuê hải quan",
      "Kho bãi & Phân phối", "Container trucking",
    ],
  },

  "khai-thue-hai-quan": {
    title: "Khai Thuê Hải Quan",
    intro: "Khai báo tờ khai điện tử VNACCS/VCIS, phân luồng, thông quan, nộp thuế. Tỷ lệ thông quan lần đầu >95%.",
    description:
      "Đội ngũ chuyên viên hải quan của HDT Logistics được đào tạo bài bản, am hiểu sâu về phân loại hàng hóa, quy định thuế quan và thủ tục thông quan. Hồ sơ được rà soát 2 cấp trước khi nộp.",
    advantages: [
      { title: "Hồ sơ rà soát 2 cấp", desc: "Giảm tối đa tỷ lệ bổ sung chứng từ, thông quan nhanh lần đầu." },
      { title: "Am hiểu quy định", desc: "Cập nhật liên tục chính sách hải quan, biểu thuế FTA và quy định chuyên ngành." },
      { title: "Hỗ trợ xử lý luồng đỏ", desc: "Đội kiểm tra thực tế hàng hóa chuyên nghiệp, giảm thiểu rủi ro truy thu." },
      { title: "Tư vấn tối ưu thuế", desc: "Xác định tuyến FTA phù hợp, tối ưu thuế nhập khẩu hợp pháp." },
    ],
    limitations: [
      "Phụ thuộc vào hệ thống VNACCS của Tổng cục Hải quan",
      "Một số mặt hàng quản lý chuyên ngành cần thêm thời gian xin giấy phép",
    ],
    types: [
      { name: "Khai xuất khẩu", desc: "Khai tờ khai xuất khẩu cho hàng xuất từ Việt Nam." },
      { name: "Khai nhập khẩu", desc: "Khai tờ khai nhập khẩu cho hàng về Việt Nam." },
      { name: "Tạm nhập tái xuất", desc: "Hàng nhập tạm để tái xuất hoặc gia công." },
      { name: "Quá cảnh", desc: "Hàng quá cảnh qua lãnh thổ Việt Nam." },
    ],
    suitableGoods: [
      "Mọi loại hàng hóa xuất nhập khẩu hợp pháp",
      "Hàng gia công, sản xuất xuất khẩu",
      "Hàng tạm nhập tái xuất",
      "Hàng mẫu, hàng triển lãm",
      "Thiết bị máy móc nhập khẩu",
      "Nguyên liệu sản xuất",
    ],
    process: [
      { step: "01", title: "Nhận & Kiểm tra chứng từ", desc: "Kiểm tra Invoice, P/L, B/L, C/O và giấy phép chuyên ngành." },
      { step: "02", title: "Phân loại HS Code", desc: "Xác định mã HS chính xác, tính thuế suất áp dụng." },
      { step: "03", title: "Rà soát hồ sơ", desc: "Kiểm tra 2 cấp độc lập trước khi nộp tờ khai." },
      { step: "04", title: "Khai báo điện tử", desc: "Nộp tờ khai VNACCS, chờ phân luồng." },
      { step: "05", title: "Xử lý luồng kiểm tra", desc: "Luồng vàng/đỏ: giải trình hồ sơ và kiểm tra thực tế nếu cần." },
      { step: "06", title: "Thông quan & Giao nhận", desc: "Nhận lệnh thông quan, phối hợp giao nhận hàng từ cảng/kho." },
    ],
    documents: [
      "Tờ khai hải quan điện tử (VNACCS)",
      "Commercial Invoice",
      "Packing List",
      "Bill of Lading / Airwaybill",
      "Hợp đồng mua bán",
      "Certificate of Origin (C/O)",
      "Giấy phép chuyên ngành (nếu cần)",
      "Bảo hiểm hàng hóa",
    ],
    additionalServices: [
      "Vận chuyển đường biển FCL/LCL", "Vận chuyển hàng không",
      "Tư vấn hải quan", "Door-to-door", "Xin giấy phép nhập khẩu",
    ],
  },

  "hang-dac-biet-du-an": {
    title: "Hàng Đặc Biệt / Hàng Dự Án",
    intro: "Hàng OOG (Out of Gauge), siêu trường siêu trọng, thiết bị dự án, hàng nguy hiểm/lạnh. Xử lý kịp thời, an toàn, chi phí hợp lý.",
    description:
      "HDT Logistics có kinh nghiệm xử lý nhiều dự án vận chuyển thiết bị nặng, máy móc công nghiệp và hàng OOG. Chúng tôi lập kế hoạch vận chuyển chi tiết, phối hợp với cơ quan chức năng để đảm bảo an toàn và đúng tiến độ dự án.",
    advantages: [
      { title: "Kinh nghiệm dự án lớn", desc: "Đã xử lý nhiều dự án vận chuyển thiết bị nhà máy, turbine điện, cấu kiện công nghiệp." },
      { title: "Giải pháp trọn gói", desc: "Lập kế hoạch vận chuyển, xin phép, thuê thiết bị nâng hạ, đoàn hộ tống." },
      { title: "Phối hợp đa phương thức", desc: "Kết hợp đường biển + đường bộ + cẩu và vận chuyển nội bộ." },
      { title: "An toàn tối đa", desc: "Tuân thủ nghiêm ngặt quy định về hàng nguy hiểm và quá khổ." },
    ],
    limitations: [
      "Chi phí cao hơn hàng thông thường",
      "Thời gian lên kế hoạch dài, cần chuẩn bị sớm 2–4 tuần",
      "Phụ thuộc vào điều kiện đường sá và cơ sở hạ tầng",
    ],
    types: [
      { name: "Hàng OOG (Out of Gauge)", desc: "Hàng vượt kích thước container tiêu chuẩn, cần flat rack hoặc open top." },
      { name: "Hàng siêu trường siêu trọng", desc: "Trọng lượng và kích thước vượt giới hạn thông thường, cần xe đặc chủng." },
      { name: "Hàng nguy hiểm (DGR/IMO)", desc: "Hóa chất, vật liệu nổ, chất phóng xạ theo quy định IATA/IMDG." },
      { name: "Hàng lạnh siêu đông", desc: "Yêu cầu nhiệt độ đặc biệt dưới -18°C hoặc kiểm soát ATP." },
    ],
    suitableGoods: [
      "Tuabin điện gió, mặt trời",
      "Máy móc thiết bị nhà máy",
      "Cấu kiện cầu đường, xây dựng",
      "Xe cơ giới, thiết bị khai thác mỏ",
      "Hóa chất công nghiệp nguy hiểm",
      "Hàng triển lãm, nghệ thuật",
    ],
    process: [
      { step: "01", title: "Khảo sát & Phân tích kỹ thuật", desc: "Nhận thông số kỹ thuật, khảo sát tuyến đường, đánh giá rủi ro và lập phương án." },
      { step: "02", title: "Lập kế hoạch vận chuyển", desc: "Kế hoạch chi tiết: phương tiện, tuyến đường, thời gian, thiết bị hỗ trợ." },
      { step: "03", title: "Xin phép lưu thông", desc: "Xin giấy phép vận chuyển hàng quá khổ từ cơ quan có thẩm quyền." },
      { step: "04", title: "Đóng gói & Gia cố", desc: "Đóng gói chuyên nghiệp, gia cố theo tiêu chuẩn quốc tế." },
      { step: "05", title: "Vận chuyển có giám sát", desc: "Vận chuyển với đoàn hộ tống, GPS tracking, báo cáo tiến độ liên tục." },
      { step: "06", title: "Bàn giao & Nghiệm thu", desc: "Hỗ trợ hạ hàng, định vị, bàn giao có biên bản nghiệm thu đầy đủ." },
    ],
    documents: [
      "Giấy phép vận chuyển hàng quá khổ",
      "Survey Report – báo cáo khảo sát",
      "Dangerous Goods Declaration (nếu DGR)",
      "Packing Certificate",
      "Bill of Lading / Airwaybill",
      "Insurance Certificate",
    ],
    additionalServices: [
      "Sea freight FCL/OOG", "Air charter", "Khai thuê hải quan",
      "Thuê cẩu & xe đặc chủng", "Project management",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const svc = services[params.slug];
  if (!svc) return {};
  return { title: svc.title, description: svc.intro };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = services[params.slug];
  if (!svc) notFound();

  const otherSlugs = Object.keys(services).filter((s) => s !== params.slug).slice(0, 3);
  const color = colorMap[params.slug] || "bg-navy-100 text-navy-700";

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg py-20 relative overflow-hidden">
        <div className="wrap relative z-10">
          <nav aria-label="Breadcrumb"
            className="flex items-center gap-2 text-white/40 text-xs mb-6 flex-wrap">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white">Dịch Vụ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{svc.title}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${color}`}>
                {iconMap[params.slug]}
              </div>
              <h1 className="h1 text-white mb-5">{svc.title}</h1>
              <p className="text-white/65 text-lg leading-relaxed mb-8">{svc.intro}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-orange">Nhận Báo Giá <ArrowRight size={15} /></Link>
                <a href="tel:0929959699" className="btn-ghost-white"><Phone size={14} /> Tư Vấn Ngay</a>
              </div>
            </div>
            {/* Advantages */}
            <div className="grid sm:grid-cols-2 gap-3">
              {svc.advantages.map((a, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-4">
                  <p className="text-orange-300 font-bold text-xs mb-1">{a.title}</p>
                  <p className="text-white/65 text-xs leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Description + Process */}
      <section className="py-20">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <p className="eyebrow mb-5">Tổng Quan Dịch Vụ</p>
              <h2 className="h2 text-navy-800 mb-5">{svc.title}</h2>
              <p className="text-navy-500 text-lg leading-[1.85] mb-7">{svc.description}</p>

              {/* Suitable goods */}
              <div>
                <h3 className="font-bold text-navy-800 mb-4">Loại hàng phù hợp</h3>
                <div className="grid grid-cols-2 gap-2">
                  {svc.suitableGoods.map((g) => (
                    <div key={g} className="flex items-center gap-2 text-sm text-navy-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Service types */}
              <p className="eyebrow mb-5">Các Phương Thức</p>
              <div className="space-y-3 mb-8">
                {svc.types.map((t, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:border-orange-100 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 font-bold text-xs
                                    flex items-center justify-center flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="font-bold text-navy-800 text-sm mb-1">{t.name}</p>
                      <p className="text-navy-500 text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-bold text-amber-700 text-sm mb-3">Lưu ý & Hạn chế</h3>
                <ul className="space-y-2">
                  {svc.limitations.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-xs text-amber-700">
                      <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <p className="eyebrow mb-5">Quy Trình Thực Hiện</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {svc.process.map((p, i) => (
                <div key={p.step}
                  className="flex gap-4 p-5 rounded-2xl border border-gray-100 shadow-card
                             hover:shadow-card-hover hover:border-orange-200 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 font-bold text-sm
                                  flex items-center justify-center flex-shrink-0
                                  group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {p.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-800 mb-1 text-sm group-hover:text-orange-500 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-navy-500 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="eyebrow mb-5">Chứng Từ Cần Thiết</p>
              <ul className="space-y-2.5">
                {svc.documents.map((d) => (
                  <li key={d} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-gray-100 text-sm text-navy-600">
                    <CheckCircle size={14} className="text-orange-400 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">Dịch Vụ Kèm Theo</p>
              <ul className="space-y-2.5">
                {svc.additionalServices.map((s) => (
                  <li key={s} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-gray-100 text-sm text-navy-600">
                    <ArrowRight size={14} className="text-navy-300 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="wrap">
          <div className="flex items-center justify-between mb-8">
            <p className="eyebrow">Dịch Vụ Khác</p>
            <Link href="/services"
              className="text-sm font-semibold text-navy-400 hover:text-orange-500 transition-colors inline-flex items-center gap-1">
              Xem tất cả <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {otherSlugs.map((slug) => {
              const s = services[slug];
              const c = colorMap[slug] || "bg-navy-100 text-navy-700";
              return (
                <Link key={slug} href={`/services/${slug}`} className="group card p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${c}`}>
                    {iconMap[slug]}
                  </div>
                  <h4 className="font-bold text-navy-800 text-sm mb-2 group-hover:text-orange-500 transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-navy-500 text-xs leading-relaxed line-clamp-2">{s.intro}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-navy-400 group-hover:text-orange-500 transition-colors">
                    Xem chi tiết <ArrowRight size={11} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shared blocks */}
      <TestimonialsBlock />
      <CTABlock />
    </div>
  );
}
