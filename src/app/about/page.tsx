import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Andrés Tascón — Senior Software Engineer at Oracle, working on Java Management Service. Based in León, Spain.",
  alternates: {
    canonical: "https://dailyrefactor.dev/about",
  },
  openGraph: {
    title: "About | DailyRefactor",
    description:
      "Andrés Tascón — Senior Software Engineer at Oracle. Learn more about the person behind DailyRefactor.",
    url: "https://dailyrefactor.dev/about",
    type: "profile",
  },
  twitter: {
    card: "summary",
    creator: "@atascg",
    title: "About | DailyRefactor",
    description:
      "Andrés Tascón — Senior Software Engineer at Oracle. Learn more about the person behind DailyRefactor.",
  },
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-8">About</h1>

      <div className="grid md:grid-cols-[1fr_280px] gap-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            My name is Andrés, I am a Software Engineer, currently working for Oracle in the Java Platform Group.
            I&apos;m helping to develop the{" "}
            <Link
              href="https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              JMS (Java Management Service)
            </Link>{" "}
            which is a free service for all OCI users.
          </p>

          <p>
            I love learning new technologies and using them to build real projects.
          </p>

          <p>
            After some hesitation on whether or not I should start my own blog, I decided to give it a shot.
            I constantly ask my co-workers: give me as much feedback as possible — and I&apos;d ask the same of you!
          </p>

          <p>
            It&apos;s really satisfying to stay up-to-date in the current software ecosystem and I think this blog
            may come in handy for it.
          </p>

          <p>
            I will try to give you the very best in Software Engineering, with a focus on Java, DevOps,
            and career advice you might (or not) find useful.
          </p>

          <p>
            I hope you enjoy my blog. If you have any questions or comments, reach out to me on{" "}
            <Link
              href="https://x.com/atascg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              X (Twitter)
            </Link>{" "}
            or{" "}
            <Link
              href="https://github.com/atascg01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              GitHub
            </Link>.
          </p>
        </div>

        {/* Profile sidebar */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)]">
            <Image
              src="/images/pic_photo.jpg"
              alt="Andrés Tascón"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <h3 className="font-semibold mb-2">Andrés Tascón</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Senior Software Engineer @ Oracle</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">León, Spain</p>

            <div className="flex gap-2 mt-4">
              <Link
                href="https://x.com/atascg"
                target="_blank"
                className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://github.com/atascg01"
                target="_blank"
                className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/andrestascon/"
                target="_blank"
                className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
