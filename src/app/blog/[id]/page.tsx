import Image from 'next/image';
import Link from 'next/link';

// This would typically come from a database or API
const article = {
    id: 1,
    title: 'The Future of Web Development: What to Expect in 2024',
    content: `
    <p>The landscape of web development is constantly evolving, and 2024 promises to bring exciting new trends and technologies. In this comprehensive guide, we'll explore what's on the horizon for web developers.</p>

    <h2>1. Web Components and Custom Elements</h2>
    <p>Web Components are becoming increasingly popular as they provide a way to create reusable custom elements with encapsulated styles and functionality. This technology allows developers to build more maintainable and scalable applications.</p>

    <h2>2. Server-Side Rendering and Static Site Generation</h2>
    <p>Performance and SEO remain crucial factors in web development. Server-side rendering (SSR) and static site generation (SSG) continue to gain traction, with frameworks like Next.js and Astro leading the way.</p>

    <h2>3. WebAssembly (Wasm)</h2>
    <p>WebAssembly is revolutionizing web performance by allowing developers to run high-performance code in the browser. This technology is particularly useful for applications that require complex computations or need to handle large amounts of data.</p>

    <h2>4. Progressive Web Apps (PWAs)</h2>
    <p>PWAs are becoming more sophisticated, offering native app-like experiences while maintaining the accessibility and ease of web applications. Expect to see more businesses adopting PWA technology in 2024.</p>

    <h2>5. AI and Machine Learning Integration</h2>
    <p>The integration of AI and machine learning in web applications is becoming more commonplace. From intelligent chatbots to personalized user experiences, AI is transforming how we interact with web applications.</p>
  `,
    category: 'Web Development',
    image: '/images/web-dev.jpg',
    date: 'March 15, 2024',
    author: {
        name: 'John Doe',
        avatar: '/images/author.jpg',
        role: 'Senior Web Developer',
    },
    readTime: '5 min read',
};

export function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' }
    ];
}


export default function BlogPost({ }) {
    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Article Header */}
            <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        href="/blog"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Blog
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">{article.category}</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <p className="font-medium text-gray-900">{article.author.name}</p>
                            <p className="text-sm text-gray-500">{article.author.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Article Content */}
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex gap-4">
                    <button className="text-gray-600 hover:text-gray-900">
                        <span className="sr-only">Share on Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                        <span className="sr-only">Share on LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                        <span className="sr-only">Share on Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
} 