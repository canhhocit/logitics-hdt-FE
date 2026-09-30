"use client";

import { Facebook, Twitter, Link2, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator?.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-3 mt-10 pt-8 border-t border-gray-100">
      <span className="text-navy-500 text-sm font-semibold flex items-center gap-1.5">
        <Share2 size={14} /> Chia sẻ:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white
                   text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
      >
        <Facebook size={13} /> Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white
                   text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
      >
        <Twitter size={13} /> Twitter
      </a>
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-navy-600
                   text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
      >
        <Link2 size={13} />
        {copied ? "Đã copy!" : "Copy link"}
      </button>
    </div>
  );
}
