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
    id: 11,
    slug: "dependency-injection-java",
    title: "Dependency Injection in Java: Why It Matters Beyond Spring Magic",
    excerpt:
      "Learn DI from first principles — constructor vs field injection, interfaces, testability, and why it's a design idea, not a Spring feature.",
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "April 2, 2026",
    readTime: "14 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
  {
    id: 10,
    slug: "thread-safety-java",
    title: "Thread Safety in Java: Race Conditions, Shared State, and How to Fix Them",
    excerpt:
      "Understand thread safety from first principles — race conditions, shared mutable state, and five practical fixes from `volatile` to database locking. Complete fintech wallet example included.",
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "April 9, 2026",
    readTime: "16 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
  {
    id: 9,
    slug: "domain-driven-design",
    title: "Domain-Driven Design: Models That Actually Mean Something",
    excerpt:
      "Learn what DDD really is, when it makes sense, and how Entities, Value Objects, Aggregates, and Invariants work — with a complete feature walkthrough from domain layer to API.",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "April 15, 2026",
    readTime: "15 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
  {
    id: 8,
    slug: "java-immutability",
    title: "Immutability in Java: Why Your Objects Should Be Stone Tablets, Not Whiteboards",
    excerpt:
      "Learn what immutability really means in Java, how to make objects immutable (the five rules), why Strings work the way they do, and every way to make collections immutable — with tradeoffs.",
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "April 21, 2026",
    readTime: "12 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
  {
    id: 7,
    slug: "hashcode-equals-java",
    title: "HashCode vs Equals in Java: The Contract Every Developer Must Understand",
    excerpt:
      "Understand what hashcodes really are, how HashMap lookups work under the hood, and why the hashCode-equals contract is the foundation of every cache and collection in your application.",
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "April 28, 2026",
    readTime: "11 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
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
  {
    id: 5,
    slug: "build-mcp-server",
    title: "How to properly build an MCP server",
    excerpt:
      "A practical guide to building Model Context Protocol servers — covering tools, resources, and prompts, plus the rules that separate production servers from proof-of-concepts.",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "May 13, 2026",
    readTime: "12 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
  {
    id: 6,
    slug: "acid-transactions",
    title: "ACID: Four letters that keep your data safe",
    excerpt:
      "A practical guide to Atomicity, Consistency, Isolation, and Durability — with SQL examples and a bank transfer walkthrough showing all four properties in action.",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "May 4, 2026",
    readTime: "10 min read",
    author: {
      name: "Andres Tascon",
      avatar: "/images/pic_photo.jpg",
      role: "Senior Software Engineer @ Oracle",
    },
  },
];

// Sort by published date (newest first)
articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getArticle(id: number): ArticleMeta | undefined {
  return articles.find((a) => a.id === id);
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}
