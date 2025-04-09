"use client";

import Link from 'next/link';
import Image from 'next/image';
import { article as javaConcurrencyArticle } from './articles/1-java-concurrency';
import { article as gitAliasesArticle } from './articles/2-git-aliases';
import { article as gitIgnoreArticle } from './articles/3-git-ignore';


// Import articles from their individual files
const articles = [
    javaConcurrencyArticle,
    gitAliasesArticle,
    gitIgnoreArticle,
];

// Get unique categories from articles
const categories = Array.from(new Set(articles.map(article => article.category)));

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>

            {/* Categories */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <Link
                            key={category}
                            href={`/blog?category=${category}`}
                            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map(article => (
                    <Link
                        key={article.id}
                        href={`/blog/${article.id}`}
                        className="group block h-full"
                    >
                        <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform group-hover:scale-105 h-full flex flex-col">
                            <div className="relative h-48">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center mb-2">
                                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        {article.category}
                                    </span>
                                    <span className="text-gray-400 text-sm ml-4">{article.readTime}</span>
                                </div>
                                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">
                                    {article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                </p>
                                <div className="flex items-center mt-auto">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                                        <Image
                                            src={article.author.avatar}
                                            alt={article.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{article.author.name}</p>
                                        <p className="text-xs text-gray-400">{article.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 