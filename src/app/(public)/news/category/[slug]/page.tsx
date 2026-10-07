import type { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * /news/category/[slug] → redirect sang /news?categorySlug=[slug]
 * Giữ nguyên URL cũ tương thích, không cần hardcode newsCategories nữa.
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: "Tin tức theo chuyên mục",
    description: "Xem bài viết theo chuyên mục tại HDT Logistics.",
  };
}

export default function NewsCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/news?categorySlug=${params.slug}`);
}
