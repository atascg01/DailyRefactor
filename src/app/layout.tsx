import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { webSiteSchema, personSchema } from "@/lib/schema";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: "DailyRefactor — Software Engineering & Tech Insights",
    template: "%s | DailyRefactor",
  },
  description:
    "Your source for the latest in software engineering, tech news, and industry insights. Deep dives into Java, DevOps, and career advice.",
  alternates: { canonical: SITE_URL },
  metadataBase: new URL(SITE_URL),
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
        <JsonLd data={personSchema()} />
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
