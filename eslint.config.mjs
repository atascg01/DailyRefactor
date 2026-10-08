import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    // Share images are rendered by Satori, which needs a plain <img>; next/image doesn't apply.
    files: ["src/app/**/opengraph-image.tsx", "src/app/**/twitter-image.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", ".agents/**", ".claude/**", ".codex/**", "next-env.d.ts"]),
]);
