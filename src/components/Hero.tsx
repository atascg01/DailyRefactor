import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900" />
      {/* Animated mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.4),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.3),transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full 
                        bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            New articles every week
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Stay Updated with{" "}
            <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Tech Trends
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Your source for the latest in software engineering and technology news. 
            Deep dives into Java, DevOps, and career insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-blue-700 
                         font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-lg
                         hover:shadow-xl active:scale-100"
            >
              Explore Articles
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 
                         text-white font-medium hover:bg-white/10 transition-all duration-200 hover:scale-105 
                         active:scale-100"
            >
              About Me
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M0 60C240 120 480 0 720 30C960 60 1200 0 1440 50V120H0V60Z"
            className="fill-[var(--background)]"
          />
        </svg>
      </div>
    </section>
  );
}
