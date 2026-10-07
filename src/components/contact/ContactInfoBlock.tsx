import { Phone, Mail } from "lucide-react";

interface Props {
  hotline: string;
  hotlineRaw: string;
  hotlineContact: string;
  hotlineContactRaw: string;
  emailSales: string;
}

export default function ContactInfoBlock({
  hotline, hotlineRaw, hotlineContact, hotlineContactRaw, emailSales,
}: Props) {
  const items = [
    { icon: <Phone size={15} />, label: "Hotline",  val: hotline,        href: `tel:${hotlineRaw}` },
    { icon: <Phone size={15} />, label: "Liên hệ",  val: hotlineContact, href: `tel:${hotlineContactRaw}` },
    { icon: <Mail  size={15} />, label: "Email",     val: emailSales,     href: `mailto:${emailSales}` },
  ];

  return (
    <div className="bg-navy-800 border-b border-white/10">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-8 py-5">
              <div className="w-9 h-9 bg-orange-500/20 border border-orange-500/30 rounded-xl
                              flex items-center justify-center text-orange-400 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-white/40 text-xs mb-0.5">{item.label}</p>
                <a href={item.href}
                  className="text-white font-semibold text-sm hover:text-orange-400 transition-colors">
                  {item.val}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
