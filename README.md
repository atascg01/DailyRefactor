# DailyRefactor

A software engineering blog and interview practice site built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and local MDX content.

## Local development

Use Node.js 22.18 or later (Node 24 recommended) and npm. The Node requirement supports the TypeScript regression tests as well as Next.js.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start
```

Geist fonts are bundled locally, so builds do not fetch Google Fonts. Cover images use Next.js image optimization and require access to images.unsplash.com at runtime. No environment variables or backend services are required.

## Checks

```sh
npm run lint -- --max-warnings=0
npm run typecheck
npm test
npm run build
```

Production builds enforce TypeScript validation. GitHub Actions runs all four checks on pushes and pull requests. Regression tests cover first-answer scoring, invalid/repeated answers, completion, empty sessions, and restart. Browser validation is still needed for rendering, navigation, and accessibility.

## Source layout

- `src/app`: routes, layouts, global CSS, metadata, sitemap, and robots.
- `src/components`: reusable UI, shared quiz session, reading tools, navigation, and themes.
- `src/content/articles.ts`: article metadata, ordered newest first.
- `src/content/blog`: MDX article bodies.
- `src/content/quiz-questions.ts`: five questions per article, answers, and explanations.
- `src/lib`: site URL/category helpers, structured data, and quiz state transitions.
- `public`: favicon, static assets, and author photo.
- `tests`: Node regression tests.

## Adding content

1. Add an article to `src/content/articles.ts` with a unique ID and slug. Use a valid publication date; set optional `updatedAt` when editing published content.
2. Add the matching `src/content/blog/<slug>.mdx` file. Use headings and fenced code blocks; check manual table-of-contents links.
3. Add questions under the same slug in `src/content/quiz-questions.ts`. Import `Quiz` and render `<Quiz slug="your-slug" />` in the article.
4. For a new category, add explanatory copy in `src/app/blog/category/[name]/page.tsx`.
5. Run the checks, preview the article and quiz, then deploy the new build through your hosting provider.

The newsletter displays a Coming soon notice. It does not accept email addresses or promise subscriptions. Quiz sessions are browser state; scores count the first response to each question, and Retry restarts the same topics.

See [PROJECT_MAP.md](PROJECT_MAP.md) for the architecture review and remediation record. No license grant is declared in this repository.
