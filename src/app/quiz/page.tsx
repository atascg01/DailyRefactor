import { siteUrl } from "@/lib/site";
import { Metadata } from "next";
import QuizPageContent from "@/components/QuizPageContent";

export const metadata: Metadata = {
  title: "Interview Prep Quiz",
  description:
    "Test your software engineering knowledge with interactive quizzes on Java, Git, Architecture, AI, and more. Real technical interview questions with detailed explanations.",
  alternates: {
    canonical: siteUrl("/quiz"),
  },
  openGraph: {
    title: "Interview Prep Quiz | DailyRefactor",
    description:
      "Test your software engineering knowledge with interactive quizzes on Java, Git, Architecture, AI, and more.",
    url: siteUrl("/quiz"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@atascg",
    title: "Interview Prep Quiz | DailyRefactor",
    description:
      "Test your software engineering knowledge with interactive quizzes — real technical interview questions with detailed explanations.",
  },
};

export default function QuizPage() {
  return <QuizPageContent />;
}
