import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { webSiteSchema, organizationSchema } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DailyRefactor — Software Engineering & Tech Insights",
    template: "%s | DailyRefactor",
  },
  description:
    "Your source for the latest in software engineering, tech news, and industry insights. Deep dives into Java, DevOps, and career advice.",
  metadataBase: new URL("https://dailyrefactor.dev"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "DailyRefactor — Software Engineering & Tech Insights",
    description:
      "Your source for the latest in software engineering, tech news, and industry insights.",
    siteName: "DailyRefactor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@atascg",
    title: "DailyRefactor — Software Engineering & Tech Insights",
    description:
      "Your source for the latest in software engineering, tech news, and industry insights.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <JsonLd data={webSiteSchema()} />
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
