export interface ArticleMeta {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

export const articles: ArticleMeta[] = [
  {
    id: 1,
    slug: "java-concurrency",
    title: "Concurrency in Java: A guide to ExecutorService and Future",
    excerpt:
      "Learn how to use ExecutorService and Future in Java to build efficient, concurrent applications. This comprehensive guide covers thread pools, task submission, and asynchronous programming patterns.",
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "May 19, 2024",
    readTime: "10 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer",
    },
  },
  {
    id: 2,
    slug: "git-aliases",
    title: "Get to know Git aliases",
    excerpt:
      "Discover how to boost your productivity with Git aliases. Learn how to create custom shortcuts for common Git commands and streamline your development workflow.",
    category: "Git",
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "May 20, 2024",
    readTime: "8 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer",
    },
  },
  {
    id: 3,
    slug: "git-ignore",
    title: "How to ignore files in Git",
    excerpt:
      "Learn how to effectively manage files in Git using .gitignore and global exclude files. Discover the differences between shared and private ignore patterns.",
    category: "Git",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "February 25, 2023",
    readTime: "5 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer",
    },
  },
  {
    id: 4,
    slug: "java-25-upgrade",
    title: "Java 25 is here — and it's actually worth upgrading for",
    excerpt:
      "Scoped Values are production-ready, object headers just got smaller, and you can finally write code before super(). Here's why Java 25 is the LTS release you shouldn't skip.",
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "May 18, 2026",
    readTime: "8 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
];

export function getArticle(id: number): ArticleMeta | undefined {
  return articles.find((a) => a.id === id);
}
