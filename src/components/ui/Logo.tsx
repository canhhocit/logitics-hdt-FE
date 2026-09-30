import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "default", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { width: 120, height: 60 },
    md: { width: 160, height: 80 },
    lg: { width: 200, height: 100 },
  };

  const { width, height } = sizeMap[size];

  // Supports both PNG (priority) and SVG fallback
  const logoSrc = "/images/logo.png";

  return (
    <Link href="/" className="flex items-center flex-shrink-0">
      <Image
        src={logoSrc}
        alt="HDT Logistics - Kết nối hành trình, vươn tới tương lai"
        width={width}
        height={height}
        className="object-contain"
        priority
        onError={(e) => {
          // fallback to SVG if PNG not found
          (e.target as HTMLImageElement).src = "/images/logo.svg";
        }}
      />
    </Link>
  );
}
