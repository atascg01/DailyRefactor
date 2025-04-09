import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';
import { article as javaConcurrencyArticle } from '../articles/1-java-concurrency';
import { article as gitAliasesArticle } from '../articles/2-git-aliases';
import { article as gitIgnoreArticle } from '../articles/3-git-ignore';

// Import articles from their individual files
const articles = [
    javaConcurrencyArticle,
    gitAliasesArticle,
    gitIgnoreArticle
];

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const article = articles.find(a => a.id === parseInt(params.id));

    if (!article) {
        return {
            title: 'Article Not Found | Daily Refactor',
            description: 'The requested article could not be found.',
        };
    }

    return {
        title: `${article.title} | Daily Refactor`,
        description: article.content.replace(/<[^>]*>/g, '').substring(0, 160),
    };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
    // Ensure params is resolved before using it
    const resolvedParams = await Promise.resolve(params);
    const articleId = parseInt(resolvedParams.id);

    const article = articles.find(a => a.id === articleId);

    if (!article) {
        notFound();
    }

    // Create sharing data
    const shareData = {
        title: article.title,
        text: `Check out this article on ${article.title} from Daily Refactor`,
        url: `https://dailyrefactor.com/blog/${article.id}`,
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Back to Blog */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Article Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                            {article.category}
                        </span>
                        <span className="text-gray-400 text-sm ml-4">{article.readTime}</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                    <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
                            <Image
                                src={article.author.avatar}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium">{article.author.name}</p>
                            <p className="text-sm text-gray-400">{article.date}</p>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Article Content */}
                <div
                    className="prose prose-lg prose-invert max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share Section */}
                <div className="border-t border-gray-700 pt-8">
                    <h2 className="text-2xl font-bold mb-4">Share this article</h2>
                    <ShareButtons {...shareData} />
                </div>
            </div>
        </div>
    );
} 