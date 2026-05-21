import { Metadata } from "next";
import BlogPageContent from "@/components/BlogPageContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on software engineering, Java, DevOps, Git, and career insights. Deep dives with practical examples and real-world context.",
  alternates: {
    canonical: "https://dailyrefactor.dev/blog",
  },
  openGraph: {
    title: "Blog | DailyRefactor",
    description:
      "Articles on software engineering, Java, DevOps, Git, and career insights.",
    url: "https://dailyrefactor.dev/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@atascg",
    title: "Blog | DailyRefactor",
    description:
      "Articles on software engineering, Java, DevOps, Git, and career insights.",
  },
};

export default function BlogPage() {
  return <BlogPageContent />;
}
