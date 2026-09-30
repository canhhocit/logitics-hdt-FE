import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật",
  description: "Chính sách bảo mật thông tin của HDT Logistics.",
};

export default function PrivacyPage() {
  const sections = [
    { title: "1. Giới thiệu", body: "Công ty Cổ phần HDT Logistics cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng, đối tác sử dụng website và dịch vụ. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn." },
    { title: "2. Thông tin chúng tôi thu thập", body: "Chúng tôi có thể thu thập: thông tin nhận dạng (họ tên, email, số điện thoại, địa chỉ), thông tin công ty (tên công ty, mã số thuế), thông tin giao dịch (lịch sử đặt dịch vụ, vận đơn), và thông tin kỹ thuật (địa chỉ IP, trình duyệt, thời gian truy cập)." },
    { title: "3. Mục đích sử dụng", body: "Thông tin được sử dụng để: cung cấp và cải thiện dịch vụ logistics, xử lý đơn hàng và vận đơn, liên hệ tư vấn và hỗ trợ khách hàng, gửi thông tin dịch vụ khi bạn đồng ý, và tuân thủ quy định pháp luật." },
    { title: "4. Bảo mật thông tin", body: "Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân khỏi truy cập trái phép. Hệ thống được mã hóa SSL và tuân thủ tiêu chuẩn bảo mật quốc tế." },
    { title: "5. Chia sẻ thông tin", body: "Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân với bên thứ ba vì mục đích thương mại. Thông tin chỉ được chia sẻ khi thực hiện dịch vụ với đối tác vận chuyển, tuân thủ yêu cầu pháp lý, hoặc khi bạn đã đồng ý." },
    { title: "6. Quyền của bạn", body: "Bạn có quyền truy cập và xem lại thông tin cá nhân, yêu cầu chỉnh sửa thông tin không chính xác, yêu cầu xóa thông tin theo quy định, và hủy đăng ký nhận thông tin tiếp thị bất kỳ lúc nào." },
  ];

  return (
    <div className="bg-white">
      <section className="hero-bg py-16">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Chính Sách Bảo Mật</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Chính Sách Bảo Mật</h1>
          <p className="text-white/40 text-sm">Cập nhật lần cuối: 01/09/2026</p>
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
            <div className="card p-7">
              <h2 className="font-bold text-navy-800 mb-3">7. Liên hệ</h2>
              <p className="text-navy-500 text-sm leading-[1.85]">
                Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ:{" "}
                <a href="mailto:info@hdtlogistics.vn" className="text-orange-500 font-semibold hover:underline">
                  info@hdtlogistics.vn
                </a>{" "}
                hoặc gọi hotline{" "}
                <a href="tel:19001234" className="text-orange-500 font-semibold hover:underline">
                  1900 1234
                </a>.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/" className="text-navy-400 hover:text-orange-500 transition-colors text-sm font-semibold inline-flex items-center gap-2">
              ← Quay về trang chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
