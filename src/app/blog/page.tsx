"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const categories = [
    'All',
    'Java'
];

const articles = [
    {
        id: 1,
        title: 'Concurrency in Java: A guide to ExecutorService and Future',
        excerpt: 'Learn how to effectively use ExecutorService and Future for concurrent programming in Java.',
        category: 'Java',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        date: 'May 19, 2024',
        readTime: '10 min read',
    }
];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                <p className="text-xl text-gray-600">
                    Explore our latest articles on software engineering and technology
                </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                    <article
                        key={article.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-48">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {article.category}
                                </span>
                                <span className="text-gray-500 text-sm ml-4">{article.date}</span>
                                <span className="text-gray-500 text-sm ml-4">{article.readTime}</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {article.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{article.excerpt}</p>
                            <Link
                                href={`/blog/${article.id}`}
                                className="text-blue-600 font-medium hover:text-blue-800"
                            >
                                Read more →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                        Previous
                    </button>
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        1
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                        2
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                        3
                    </button>
                    <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                        Next
                    </button>
                </nav>
            </div>
        </div>
    );
} 