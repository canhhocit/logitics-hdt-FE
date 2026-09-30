import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Điều Khoản Dịch Vụ",
  description: "Điều khoản và điều kiện sử dụng dịch vụ của HD Logistics.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Phạm vi dịch vụ",
      body: "HD Logistics cung cấp dịch vụ vận chuyển đường không, đường biển, đường bộ, gom hàng lẻ LCL, khai thuê hải quan và tư vấn logistics cho khách hàng doanh nghiệp (B2B). Chúng tôi không cung cấp dịch vụ chuyển phát hàng cá nhân, chuyển thư tín hoặc dịch vụ bưu chính.",
    },
    {
      title: "2. Trách nhiệm của các bên",
      body: "Khách hàng có trách nhiệm cung cấp thông tin hàng hóa chính xác, đầy đủ; đảm bảo hàng hóa hợp pháp, không vi phạm quy định pháp luật; chuẩn bị đủ chứng từ theo yêu cầu. HD Logistics có trách nhiệm cung cấp dịch vụ theo thỏa thuận, bảo mật thông tin khách hàng và xử lý khiếu nại kịp thời.",
    },
    {
      title: "3. Trách nhiệm về hàng hóa",
      body: "HD Logistics chịu trách nhiệm về hàng hóa trong phạm vi được quy định tại hợp đồng dịch vụ. Mức bồi thường tối đa theo chuẩn quốc tế áp dụng cho từng phương thức vận tải (theo Công ước Hague-Visby đối với đường biển, Warsaw/Montreal đối với hàng không). Khách hàng được khuyến nghị mua bảo hiểm hàng hóa toàn diện.",
    },
    {
      title: "4. Thanh toán",
      body: "Cước vận chuyển và các phụ phí được xác định theo báo giá đã thống nhất. Thanh toán thực hiện theo điều khoản trong hợp đồng dịch vụ. HD Logistics có quyền giữ hàng cho đến khi công nợ được thanh toán đầy đủ.",
    },
    {
      title: "5. Quyền sở hữu trí tuệ",
      body: "Toàn bộ nội dung website hdlogistics.vn thuộc quyền sở hữu của Công ty TNHH Đầu Tư Kinh Doanh Và Xây Dựng Hải Đăng. Nghiêm cấm sao chép, phân phối hoặc sử dụng nội dung vì mục đích thương mại mà không có sự đồng ý bằng văn bản.",
    },
    {
      title: "6. Giải quyết tranh chấp",
      body: "Mọi tranh chấp phát sinh từ việc sử dụng dịch vụ được ưu tiên giải quyết thông qua thương lượng. Nếu không đạt được thỏa thuận, tranh chấp sẽ được giải quyết tại Tòa án nhân dân có thẩm quyền tại Việt Nam theo pháp luật Việt Nam hiện hành.",
    },
    {
      title: "7. Điều khoản sửa đổi",
      body: "HD Logistics có quyền sửa đổi Điều khoản này bất kỳ lúc nào. Bản sửa đổi có hiệu lực ngay khi được đăng tải trên website. Tiếp tục sử dụng dịch vụ sau khi có sửa đổi đồng nghĩa với việc chấp thuận điều khoản mới.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="hero-bg py-16">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Điều Khoản Dịch Vụ</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Điều Khoản Dịch Vụ</h1>
          <p className="text-white/40 text-sm">Cập nhật lần cuối: 01/01/2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap max-w-3xl">
          <div className="space-y-5">
            {sections.map((s) => (
              <div key={s.title} className="card p-7">
                <h2 className="font-bold text-navy-800 mb-3">{s.title}</h2>
                <p className="text-navy-500 text-sm leading-[1.85]">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/privacy" className="text-orange-500 hover:underline text-sm font-medium">
              Chính sách bảo mật
            </Link>
            <span className="text-gray-300">·</span>
            <Link href="/" className="text-navy-400 hover:text-orange-500 transition-colors text-sm font-medium">
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
