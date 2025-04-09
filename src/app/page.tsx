import Link from 'next/link';
import Image from 'next/image';

const featuredArticles = [
  {
    id: 1,
    title: 'Concurrency in Java: A guide to ExecutorService and Future',
    excerpt: 'Learn how to use ExecutorService and Future in Java to build efficient, concurrent applications. This comprehensive guide covers thread pools, task submission, and asynchronous programming patterns.',
    category: 'Java',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: 'May 19, 2024',
    readTime: '10 min read',
  },
  {
    id: 2,
    title: 'Get to know Git aliases',
    excerpt: 'Discover how to boost your productivity with Git aliases. Learn how to create custom shortcuts for common Git commands and streamline your development workflow.',
    category: 'Git',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: 'May 20, 2024',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'How to ignore files in Git',
    excerpt: 'Learn how to effectively manage files in Git using .gitignore and global exclude files. Discover the differences between shared and private ignore patterns, and master the art of keeping your repository clean while maintaining local configurations.',
    category: 'Git',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: 'May 21, 2024',
    readTime: '8 min read',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stay Updated with Tech Trends
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your source for the latest in software engineering and technology news
            </p>
            <Link
              href="/blog"
              className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full"
              >
                <article className="flex flex-col h-full">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-4">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{article.excerpt}</p>
                    <span className="text-blue-600 font-medium hover:text-blue-800 mt-auto inline-flex items-center">
                      Read more
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
