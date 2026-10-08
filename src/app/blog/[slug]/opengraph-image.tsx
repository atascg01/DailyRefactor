import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { articles, getArticleBySlug } from "@/content/articles";

// Link previews (LinkedIn, X, Slack...) can't render SVG covers, so every
// article gets a PNG share card generated at build time.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DailyRefactor article";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");

// Same grid and palette as the illustrated covers, without a diagram.
const GRID_STRIP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 170">
  <rect width="1200" height="170" fill="#E8E5DC"/>
  <g stroke="#768064" stroke-width="2" opacity=".18">
    <path d="M0 42H1200M0 127H1200"/>
    <path d="M150 0V170M300 0V170M450 0V170M600 0V170M750 0V170M900 0V170M1050 0V170"/>
  </g>
  <path d="M0 85H1200" stroke="#555F43" stroke-width="5" opacity=".5"/>
</svg>`;

// Render every card at build time, so the fonts and SVG covers are read from the
// project on disk rather than from inside a serverless function.
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? "DailyRefactor";

  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
  ]);

  // Local SVG covers become a strip along the bottom. Articles with remote photo
  // covers get the plain grid instead, so the build never fetches images.
  let illustration = `data:image/svg+xml;base64,${Buffer.from(GRID_STRIP).toString("base64")}`;
  if (article?.image.startsWith("/images/") && article.image.endsWith(".svg")) {
    const svg = await readFile(join(process.cwd(), "public", article.image));
    illustration = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f6f5f0",
          color: "#181a17",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: "56px 64px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 28,
            }}
          >
            <div style={{ display: "flex", fontWeight: 600 }}>DailyRefactor</div>
            {article && (
              <div
                style={{
                  display: "flex",
                  padding: "6px 18px",
                  borderRadius: 999,
                  background: "#555f43",
                  color: "#f6f5f0",
                  fontSize: 22,
                }}
              >
                {article.category}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: title.length > 70 ? 54 : 64,
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: 24,
              color: "#686c60",
            }}
          >
            {article ? `${article.author.name} · dailyrefactor.dev` : "dailyrefactor.dev"}
          </div>
        </div>
        <img
          src={illustration}
          alt=""
          width={1200}
          height={170}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
