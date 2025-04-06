import Image from 'next/image';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

// This would typically come from a database or API
const article = {
    id: 1,
    title: 'The Future of Web Development: What to Expect in 2025',
    content: `
    <p>The landscape of web development is constantly evolving, and 2025 promises to bring exciting new trends and technologies. In this comprehensive guide, we'll explore what's on the horizon for web developers.</p>

    <h2>1. Web Components and Custom Elements</h2>
    <p>Web Components are becoming increasingly popular as they provide a way to create reusable custom elements with encapsulated styles and functionality. This technology allows developers to build more maintainable and scalable applications.</p>

    <h2>2. Server-Side Rendering and Static Site Generation</h2>
    <p>Performance and SEO remain crucial factors in web development. Server-side rendering (SSR) and static site generation (SSG) continue to gain traction, with frameworks like Next.js and Astro leading the way.</p>

    <h2>3. WebAssembly (Wasm)</h2>
    <p>WebAssembly is revolutionizing web performance by allowing developers to run high-performance code in the browser. This technology is particularly useful for applications that require complex computations or need to handle large amounts of data.</p>

    <h2>4. Progressive Web Apps (PWAs)</h2>
    <p>PWAs are becoming more sophisticated, offering native app-like experiences while maintaining the accessibility and ease of web applications. Expect to see more businesses adopting PWA technology in 2025.</p>

    <h2>5. AI and Machine Learning Integration</h2>
    <p>The integration of AI and machine learning in web applications is becoming more commonplace. From intelligent chatbots to personalized user experiences, AI is transforming how we interact with web applications.</p>
  `,
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: 'March 15, 2025',
    author: {
        name: 'Andres Tascon',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        role: 'Senior Software Engineer @Oracle',
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

export default function BlogPost({ params }: { params: { id: string } }) {
    // In a real application, you would fetch the article based on the ID
    // For now, we'll just use the static article
    console.log('Blog post id:', params.id);

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-900">
            {/* Article Header */}
            <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Link
                        href="/blog"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                        Blog
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-300">{article.category}</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
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
                            <p className="font-medium text-white">{article.author.name}</p>
                            <p className="text-sm text-gray-300">{article.author.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
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
                className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share Section */}
            <ShareButtons title={article.title} />
        </article>
    );
} 