export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

const quizData: Record<string, QuizData> = {
  "dependency-injection-java": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What is Dependency Injection?",
        options: [
          "A Spring-specific feature that requires @Autowired annotations",
          "A design principle where an object receives its dependencies from the outside rather than creating them internally",
          "A pattern where all classes must have a corresponding interface",
          "A database technique for managing transaction dependencies",
        ],
        correctIndex: 1,
        explanation:
          "Dependency Injection is a design principle, not a framework feature. It means objects receive what they need through constructors or setters instead of creating dependencies internally with `new`. Spring, Guice, and Dagger implement DI, but you can do DI in plain Java with no framework at all — just pass dependencies into the constructor.",
      },
      {
        question: "Why is constructor injection generally preferred over field injection?",
        options: [
          "Because @Autowired is deprecated in Spring 6",
          "Because constructor injection makes dependencies explicit, supports `final` fields, and works without a DI framework for testing",
          "Because field injection is slower at runtime",
          "Because constructor injection requires less code",
        ],
        correctIndex: 1,
        explanation:
          "Constructor injection puts dependencies right in the constructor signature where anyone can see them. It allows `final` fields (immutability), guarantees the object can't be created in an invalid state, and lets you write tests with `new Service(fakeRepo)` instead of needing Spring's reflection. Field injection hides dependencies and requires framework magic to set private fields.",
      },
      {
        question: "How does DI improve testability?",
        options: [
          "It automatically generates test cases for every injected dependency",
          "It eliminates the need to write tests by making code correct by construction",
          "It lets you replace real dependencies (databases, HTTP clients) with fake or mock implementations, isolating business logic in tests",
          "It makes Spring tests run faster by caching the application context",
        ],
        correctIndex: 2,
        explanation:
          "DI makes testing easy because you can swap real infrastructure dependencies for controlled doubles. Instead of starting PostgreSQL and sending real emails in every test, you inject an in-memory repository and a fake notification sender. Tests run in milliseconds and test business logic, not infrastructure plumbing. Without DI, you'd need the real database for every test because the class creates its own connection internally.",
      },
      {
        question: "Do you need an interface for every injected dependency?",
        options: [
          "Yes — Spring requires all injected beans to implement an interface",
          "Yes — it's a best practice that prevents tight coupling in all cases",
          "No — interfaces are useful at real seams like external APIs and multiple implementations, but creating `FooService`/`FooServiceImpl` for every class is noise",
          "No — interfaces are only needed for JPA repositories",
        ],
        correctIndex: 2,
        explanation:
          "Use interfaces at meaningful boundaries: external systems (payment gateways, message queues), multiple implementations (shipping calculators), or domain abstractions. Don't create `UserService`/`UserServiceImpl` pairs for classes with a single implementation — it's ceremony without value. Mocking frameworks can mock concrete classes directly for testing.",
      },
      {
        question: "What's the problem with `new PostgresUserRepository()` inside a service class?",
        options: [
          "It's a syntax error because repository classes must be created by Spring",
          "It tightly couples the service to PostgreSQL, hides the dependency from the constructor, and makes unit testing impossible without a real database",
          "It causes a memory leak because the repository is never garbage collected",
          "Nothing — this is the recommended pattern in modern Java",
        ],
        correctIndex: 1,
        explanation:
          "Calling `new PostgresUserRepository()` inside a service creates tight coupling — the service is forever tied to PostgreSQL. The dependency is hidden (the constructor has no parameters, so you can't tell the class needs a database). And testing becomes integration testing: every test must connect to a real database. With DI, you pass `UserRepository` (an interface) into the constructor, and tests inject a fake implementation that runs in memory.",
      },
    ],
  },
  "thread-safety-java": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What is a race condition?",
        options: [
          "When two threads try to start at exactly the same time",
          "When program correctness depends on the timing or interleaving of thread execution",
          "When one thread runs faster than another thread",
          "When the JVM garbage collector pauses all application threads",
        ],
        correctIndex: 1,
        explanation:
          "A race condition occurs when the correctness of your program depends on the specific timing or ordering of thread execution. You get the correct result for some thread interleavings but incorrect results for others — and you have no control over which interleaving happens at runtime. The classic example is two threads incrementing a shared counter: both read the same value, both increment, both write back, and one increment is lost.",
      },
      {
        question: "What does the `volatile` keyword guarantee in Java?",
        options: [
          "Atomicity of all operations on the variable",
          "Visibility — writes to the variable are immediately visible to all threads",
          "Exclusive access — only one thread can access the variable at a time",
          "That the variable is stored in a CPU register for faster access",
        ],
        correctIndex: 1,
        explanation:
          "`volatile` guarantees visibility: a write to a volatile variable is immediately flushed to main memory and visible to all other threads. It does NOT guarantee atomicity. A compound operation like `counter++` is still unsafe with `volatile` because the read-increment-write sequence can be interleaved. `volatile` is appropriate for simple flags where one thread writes and others read (like a shutdown signal), but not for read-modify-write operations.",
      },
      {
        question: "Why is `counter++` not thread-safe in Java?",
        options: [
          "Because the `++` operator is deprecated for multi-threaded use",
          "Because it's a compound operation: read, increment, write — and another thread can interleave between these steps",
          "Because Java doesn't support integer arithmetic across threads",
          "Because the increment value depends on the platform's CPU architecture",
        ],
        correctIndex: 1,
        explanation:
          "`counter++` compiles into multiple bytecode instructions: read the current value, increment it, write the new value. Between 'read' and 'write', another thread can read the same old value. Both threads then write their incremented result, and one increment is effectively lost. This is a classic lost-update race condition. To make it safe, use `AtomicInteger.incrementAndGet()` or wrap the operation in a `synchronized` block.",
      },
      {
        question: "Is `ConcurrentHashMap` alone enough to make business logic thread-safe?",
        options: [
          "Yes, because all ConcurrentHashMap methods are synchronized",
          "Yes, as long as you use `computeIfAbsent` for all operations",
          "No — it protects the map's internal state, but compound operations on the values stored in the map still need their own synchronization",
          "No, because ConcurrentHashMap is deprecated in Java 21+",
        ],
        correctIndex: 2,
        explanation:
          "`ConcurrentHashMap` guarantees that the map's internal data structures are never corrupted — no lost entries, no infinite loops during iteration, no `NullPointerException` from concurrent structural modifications. But it doesn't make operations on the *values* stored in the map atomic. If two threads get the same value from the map and independently modify it, they can still produce incorrect results. You need additional synchronization (like `synchronized` on the value object or atomic fields within it) at the business-logic level.",
      },
      {
        question: "In a distributed backend with multiple JVM instances hitting the same PostgreSQL database, why is `synchronized` in Java not enough to protect a wallet balance?",
        options: [
          "Because PostgreSQL doesn't support the Java `synchronized` keyword",
          "Because `synchronized` only protects in-process concurrency — it doesn't prevent two different JVM instances from reading and updating the same database row",
          "Because Java thread synchronization has a maximum timeout of 5 seconds",
          "Because the database connection pool bypasses Java's synchronization mechanisms",
        ],
        correctIndex: 1,
        explanation:
          "`synchronized` protects concurrent access within a single JVM process. When you have multiple application instances behind a load balancer, each has its own JVM with its own locks. Two requests routed to different instances can both read the same wallet balance from the database before either writes back. To protect against this, you need database-level concurrency control: pessimistic locking (`SELECT ... FOR UPDATE`) or optimistic locking (a version column that detects conflicts at write time).",
      },
    ],
  },
  "hashcode-equals-java": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What is a hashcode in Java?",
        options: [
          "A unique identifier guaranteed to be different for every object",
          "An integer representation of an object, used to quickly locate it in hash-based collections",
          "A cryptographic checksum of the object's field values",
          "The exact memory address of the object as an int",
        ],
        correctIndex: 1,
        explanation:
          "A hashcode is an integer that represents an object — it's a fingerprint, not a unique ID. Different objects can (and do) produce the same hashcode; this is called a collision and is completely normal. The hashcode's purpose is to give hash-based collections like HashMap a fast way to narrow down which bucket to search in.",
      },
      {
        question:
          "During a HashMap lookup, what happens when two different keys land in the same bucket?",
        options: [
          "The map throws a CollisionException",
          "The newer entry overwrites the older one silently",
          "The map traverses the bucket's linked list or tree, calling equals() to find the correct key",
          "The map immediately rehashes all entries into a larger array",
        ],
        correctIndex: 2,
        explanation:
          "Hash collisions are expected and handled gracefully. When multiple entries share a bucket, HashMap stores them in a linked list (or a red-black tree in Java 8+ when collisions exceed 8). It walks through them and calls equals() on each key until it finds a match. Hash collisions impact performance but never produce wrong results — as long as equals() is correct.",
      },
      {
        question: "What is the worst-case time complexity for a HashMap lookup?",
        options: [
          "O(1) always, regardless of hashcode quality",
          "O(log n) with treeification in Java 8+, O(n) otherwise — when all keys collide into the same bucket",
          "O(n²) due to nested probing",
          "O(n log n) due to tree balancing overhead",
        ],
        correctIndex: 1,
        explanation:
          "When all keys produce the same hashcode, every entry piles into a single bucket. In older Java (pre-8), this means a linear O(n) scan through a linked list. Java 8+ mitigates this by converting large collision chains into a red-black tree, improving the search to O(log n). But it's still far from the ideal O(1). This is why a bad hashCode() implementation degrades performance — and why hash-collision DoS attacks were a real threat before Java 7u6's String.hashCode() fix.",
      },
      {
        question: "If a.equals(b) is true, what must also be true?",
        options: [
          "a and b must be the exact same object (a == b)",
          "a.hashCode() must equal b.hashCode()",
          "a and b must have different hashcodes to avoid collisions",
          "Nothing — equals() and hashCode() are completely independent methods",
        ],
        correctIndex: 1,
        explanation:
          "This is the golden rule: equal objects must have equal hashcodes. If they didn't, HashMap would put them in different buckets and a get(b) call would never find the entry stored with a — even though a.equals(b) is true. This is the most common bug when overriding equals() without hashCode().",
      },
      {
        question:
          "You override equals() in a class but NOT hashCode(), then use instances as HashMap keys. What happens?",
        options: [
          "Nothing breaks — the code compiles and runs correctly",
          "Objects that are equal according to equals() won't be found when used as HashMap keys, because they land in different buckets",
          "The JVM throws an IllegalStateException at runtime",
          "The equals() method stops working and always returns false",
        ],
        correctIndex: 1,
        explanation:
          "Without a matching hashCode() override, two equal objects (according to your equals()) will use Object.hashCode(), which is based on memory addresses. They'll get different hashcodes, land in different buckets, and HashMap will never find the entry. This produces that maddening bug: you put something in the map, an 'equal' key can't find it, but everything compiles and no exceptions are thrown. Always override both together.",
      },
    ],
  },

  "java-concurrency": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What is the main advantage of ExecutorService over manually creating Thread instances?",
        options: [
          "ExecutorService executes individual tasks faster than raw Threads",
          "It manages a reusable thread pool, avoiding the overhead of thread creation and destruction for each task",
          "It guarantees tasks execute exactly in FIFO order",
          "It automatically retries failed tasks indefinitely",
        ],
        correctIndex: 1,
        explanation:
          "Creating and destroying threads is expensive. ExecutorService maintains a pool of worker threads that are reused across multiple tasks. This decouples task submission from thread lifecycle management, making concurrent code cleaner and more efficient. The Executors utility class provides several pre-configured pool types for different workloads.",
      },
      {
        question: "Which method would you use to submit a task that returns a result?",
        options: [
          "executorService.execute(runnable)",
          "executorService.submit(callable)",
          "executorService.invoke(runnable)",
          "executorService.run(callable)",
        ],
        correctIndex: 1,
        explanation:
          "execute(Runnable) is fire-and-forget — it doesn't return anything. submit(Callable<T>) returns a Future<T> that lets you retrieve the result (or exception) once the task completes. Callable is like Runnable but its call() method returns a value and can throw checked exceptions.",
      },
      {
        question: "What does executorService.shutdown() do?",
        options: [
          "Forcefully terminates all running tasks immediately",
          "Prevents new tasks from being submitted but lets already-submitted tasks run to completion",
          "Pauses the executor until resume() is called",
          "Restarts the thread pool with its original configuration",
        ],
        correctIndex: 1,
        explanation:
          "shutdown() initiates a graceful shutdown: no new tasks are accepted, but previously submitted tasks continue executing. Use shutdownNow() if you need to attempt to stop running tasks immediately. Forgetting to call shutdown() can prevent the JVM from exiting, since executor threads are non-daemon by default.",
      },
      {
        question: "Which thread pool type creates new threads as needed and reuses previously constructed ones when available?",
        options: [
          "Executors.newFixedThreadPool(n)",
          "Executors.newSingleThreadExecutor()",
          "Executors.newCachedThreadPool()",
          "Executors.newScheduledThreadPool(n)",
        ],
        correctIndex: 2,
        explanation:
          "newCachedThreadPool creates a pool that grows dynamically: it spawns new threads on demand and reuses idle ones. Threads that remain idle for 60 seconds are terminated. This is ideal for short-lived asynchronous tasks but can be dangerous under unbounded load — it will keep creating threads until system resources are exhausted.",
      },
      {
        question: "How can you check if a Future's result is ready without blocking?",
        options: [
          "Call future.peek()",
          "Call future.isDone()",
          "Call future.poll()",
          "You can't — Future always blocks on get()",
        ],
        correctIndex: 1,
        explanation:
          "future.isDone() returns true if the task completed (normally, with an exception, or was cancelled). You can then safely call future.get() without blocking. This pattern is useful for polling progress from a UI thread or implementing timeouts: check isDone() in a loop with Thread.sleep() between checks, rather than blocking indefinitely on get().",
      },
    ],
  },

  "git-aliases": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What does the `!` prefix in a Git alias command signify?",
        options: [
          "The alias is disabled",
          "The command is treated as a Git subcommand",
          "The command is executed as an external shell command, not a Git subcommand",
          "The alias has elevated permissions",
        ],
        correctIndex: 2,
        explanation:
          "Without the `!`, Git assumes the alias value is a Git subcommand (like 'status', 'log', etc.). The `!` tells Git to run the rest of the line through the shell instead. This lets you chain commands with `&&`, use pipes, or call non-Git executables — like `git visual` running `gitk`.",
      },
      {
        question: "What command sets a global alias `git st` for `git status`?",
        options: [
          "git alias add st status",
          "git set-alias --global st status",
          "git config --global alias.st status",
          "git alias --global st = status",
        ],
        correctIndex: 2,
        explanation:
          "Git aliases are stored as config values under the alias.* namespace. The `--global` flag writes to ~/.gitconfig, making the alias available across all your repositories. You can also edit ~/.gitconfig directly and add entries under the [alias] section.",
      },
      {
        question: "Where are global Git aliases physically stored?",
        options: [
          ".git/aliases inside each repository",
          "~/.gitconfig in your home directory",
          "/etc/git/aliases.conf (system-wide)",
          "Inside the repository's .git/config file",
        ],
        correctIndex: 1,
        explanation:
          "Global aliases live in ~/.gitconfig (or %USERPROFILE%\\.gitconfig on Windows). Repository-specific aliases go in .git/config. System-wide aliases (for all users on a machine) are in /etc/gitconfig. The scope hierarchy is: local overrides global, which overrides system.",
      },
      {
        question: "Which command correctly creates an alias `git unstage` that runs `git reset HEAD --`?",
        options: [
          "git config alias.unstage \"reset HEAD --\"",
          "git config --global alias.unstage \"reset HEAD --\"",
          "git alias unstage reset HEAD --",
          "Both A and B work, depending on whether you want it local or global",
        ],
        correctIndex: 3,
        explanation:
          "Both commands are valid — the difference is scope. Without --global, the alias is stored in the current repository's .git/config and only works there. With --global, it's stored in ~/.gitconfig and works everywhere. The alias value 'reset HEAD --' is a standard Git subcommand, so no `!` prefix is needed.",
      },
      {
        question: "What's wrong with setting `alias.co = checkout` in ~/.gitconfig?",
        options: [
          "Nothing — this is a perfectly valid permanent alias",
          "You can't set aliases directly in .gitconfig; you must use git config",
          "The syntax is wrong; it should be `co = checkout` under `[alias]`",
          "Aliases can only be set with git config, never by editing files",
        ],
        correctIndex: 2,
        explanation:
          "When editing ~/.gitconfig directly, aliases go under an [alias] section header. The correct entry would be:\n\n```ini\n[alias]\n    co = checkout\n```\n\nThe `alias.` prefix is only used with the `git config` CLI command. Both methods (config command and direct file editing) are valid — use whichever you prefer.",
      },
    ],
  },

  "git-ignore": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "Where should you put patterns for files you want Git to ignore in a specific project?",
        options: [
          "~/.gitignore_global",
          ".git/config",
          ".gitignore in the project root directory",
          ".git/exclude",
        ],
        correctIndex: 2,
        explanation:
          ".gitignore in the project root is the standard place for project-specific ignore rules. It's committed to the repository, so the entire team shares the same ignore patterns. You can also have .gitignore files in subdirectories — they only apply to that directory and its children.",
      },
      {
        question: "How do you ignore editor temp files across ALL your Git repositories without editing each project's .gitignore?",
        options: [
          "Create a .gitignore in each repository",
          "Configure a global excludes file via core.excludesFile and put patterns there",
          "Add patterns to /etc/gitignore",
          "Use git config --global ignore \"*.swp\"",
        ],
        correctIndex: 1,
        explanation:
          "Set `git config --global core.excludesFile ~/.gitignore_global` and add your patterns there. This file works exactly like .gitignore but applies to every repository on your machine. It's perfect for OS files (.DS_Store, Thumbs.db) and editor artifacts (*.swp, .vscode/) that are personal to your environment.",
      },
      {
        question: "What is .git/info/exclude used for?",
        options: [
          "The same as .gitignore, but committed to the repo for the whole team",
          "Repository-specific ignore rules that are NOT shared with other contributors",
          "A global ignore file for all repositories on the machine",
          "A temporary file to disable .gitignore rules",
        ],
        correctIndex: 1,
        explanation:
          ".git/info/exclude is a per-repository ignore file that stays local and is never committed. It's ideal for patterns specific to your workflow that the team doesn't need — like ignoring a local config file you use for testing, or build outputs in a non-standard directory you use personally.",
      },
      {
        question: "Which pattern ignores ALL .log files in any directory of the project?",
        options: [
          "/logs/*.log",
          "*.log",
          "log/*.log",
          ".log/",
        ],
        correctIndex: 1,
        explanation:
          "`*.log` matches any file ending in .log, at any depth in the project tree. `/logs/*.log` would only match .log files directly inside the logs/ directory at the repo root. The leading `/` anchors the pattern to the .gitignore file's directory. `**/*.log` would also work for any depth, but `*.log` is simpler and already recursive in Git.",
      },
      {
        question: "A file is already tracked by Git. You add its pattern to .gitignore. What happens?",
        options: [
          "Git immediately stops tracking the file",
          "The file is deleted from the working directory",
          "Nothing changes — .gitignore only affects untracked files; you must also run `git rm --cached`",
          "Git warns you that the file is already tracked and asks for confirmation",
        ],
        correctIndex: 2,
        explanation:
          ".gitignore only prevents Git from tracking new, untracked files. If a file is already tracked, adding it to .gitignore does nothing. To stop tracking it, you need `git rm --cached <file>` (which removes it from the index but keeps the local file). After committing that removal, the .gitignore rule will take effect for future changes.",
      },
    ],
  },

  "java-25-upgrade": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "Which feature became production-ready (finalized) in Java 25?",
        options: [
          "Virtual Threads",
          "Scoped Values",
          "Pattern Matching for switch",
          "String Templates",
        ],
        correctIndex: 1,
        explanation:
          "Scoped Values graduated from preview/incubator to a finalized API in Java 25. They provide a safer, more performant alternative to ThreadLocal for sharing immutable data across threads — especially useful in the Virtual Threads world where thread locals cause performance and correctness issues. Virtual Threads were finalized earlier (Java 21), and Pattern Matching for switch arrived in Java 21 as well.",
      },
      {
        question: "What's the practical benefit of Java 25's smaller object headers?",
        options: [
          "Less memory per object, which means more objects fit in cache and less GC pressure",
          "Faster serialization and deserialization of objects",
          "Improved JIT compilation speed for hot methods",
          "Reduced class loading time during application startup",
        ],
        correctIndex: 0,
        explanation:
          "Smaller object headers directly reduce memory consumption. Every Java object has a header — on 64-bit JVMs with compressed OOPs, the classic header is 12 bytes. Reducing this by even a few bytes per object adds up massively in heap-heavy applications (think millions of objects). Less memory means better cache locality and fewer GC cycles. This is part of Project Lilliput's ongoing work.",
      },
      {
        question: "What does the 'code before super()' feature in Java 25 allow?",
        options: [
          "You can call any method on the subclass before calling super()",
          "You can declare local variables and perform simple computations before the super() call in a constructor — as long as they don't reference `this`",
          "You can skip calling super() entirely in certain cases",
          "You can define anonymous inner classes before calling super()",
        ],
        correctIndex: 1,
        explanation:
          "Before Java 25, `super()` had to be the first statement in a constructor — no exceptions. Java 25 relaxes this (JEP 447 / Flexible Constructor Bodies, previewed earlier): you can now declare variables and perform computations before calling super(), as long as they don't access `this`. This eliminates awkward workarounds like static factory methods when you need to validate or transform arguments before passing them to the superclass constructor.",
      },
      {
        question: "Why is Java 25 particularly significant in the release cycle?",
        options: [
          "It's the last Java release before the language is replaced",
          "It introduced the first preview of Virtual Threads",
          "It's an LTS (Long-Term Support) release — meaning years of support and a recommended upgrade target",
          "It's the first release to remove 32-bit support entirely",
        ],
        correctIndex: 2,
        explanation:
          "Java releases every 6 months, but LTS releases (every 2 years) are the ones enterprises target for upgrades. Java 25 is the latest LTS release, which means Oracle, Azul, and other vendors will provide updates and security patches for years. For companies still on Java 21 LTS or (worse) Java 17 LTS, Java 25 is the natural next upgrade destination — and it bundles features from Java 22, 23, 24, and 25 into one supported release.",
      },
      {
        question: "What does ScopedValue replace, and why is the replacement important?",
        options: [
          "It replaces Optional<T> with better performance",
          "It replaces ThreadLocal<T> — Scoped Values are immutable, automatically cleaned up, and work correctly with Virtual Threads",
          "It replaces synchronized blocks with a more granular locking mechanism",
          "It replaces System.getProperty() with a type-safe alternative",
        ],
        correctIndex: 1,
        explanation:
          "ThreadLocal has two major problems with Virtual Threads: (1) Virtual threads are lightweight and numerous — each having its own ThreadLocal map wastes memory, and (2) ThreadLocal values must be manually cleaned up, which is error-prone with virtual thread pooling. Scoped Values are immutable, bound to a scope (not a specific thread), and automatically cleared when the scope exits. They're designed for the millions-of-virtual-threads world.",
      },
    ],
  },

  "build-mcp-server": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What are the three primitives an MCP server can expose to clients?",
        options: [
          "Endpoints, Middleware, Handlers",
          "Tools, Resources, Prompts",
          "Models, Actions, Schemas",
          "Clients, Servers, Transports",
        ],
        correctIndex: 1,
        explanation:
          "The MCP specification defines three primitives: Tools (callable functions the LLM invokes to perform actions), Resources (structured data or files the LLM can read), and Prompts (pre-defined prompt templates users can invoke). Most servers focus on Tools, but a well-rounded server uses all three where appropriate.",
      },
      {
        question: "What transport does a typical local MCP server use to communicate with a client?",
        options: [
          "HTTP REST API",
          "WebSockets",
          "stdio (standard input/output)",
          "gRPC",
        ],
        correctIndex: 2,
        explanation:
          "Local MCP servers communicate via stdio: the client spawns the server process and exchanges JSON-RPC messages over stdin/stdout. This is zero-config and secure by default (no network exposure). Remote MCP servers typically use HTTP with SSE (Server-Sent Events) for streaming, but stdio remains the standard for local development and single-machine deployments.",
      },
      {
        question: "What is the fundamental difference between Tools and Resources in MCP?",
        options: [
          "Tools are read-only; Resources can modify data",
          "Tools perform actions or computations; Resources expose data or content for the LLM to read",
          "There is no difference — they're aliases for the same concept",
          "Tools are for debugging; Resources are for production use only",
        ],
        correctIndex: 1,
        explanation:
          "A Tool is something the LLM can DO — run a query, send an email, create a file. A Resource is something the LLM can READ — a document, a database schema, a log file. The distinction matters: Tools have side effects and should require user confirmation for destructive operations; Resources are read-only and safe to access freely.",
      },
      {
        question: "When building a production MCP server, which practice is essential?",
        options: [
          "Only implementing the tools/list method and skipping other protocol methods",
          "Proper error handling with standard JSON-RPC error codes and descriptive messages",
          "Hard-coding API keys directly in the server source code",
          "Using polling instead of the protocol's notification system",
        ],
        correctIndex: 1,
        explanation:
          "MCP uses JSON-RPC 2.0 as its message format. When something goes wrong, you must return proper JSON-RPC error responses with standard error codes (-32700 for parse errors, -32600 for invalid requests, -32601 for unknown methods, etc.) and descriptive messages. Without this, clients can't distinguish between a temporary failure and a permanent one — leading to confusing LLM behavior or silent failures.",
      },
      {
        question: "Why should you separate your MCP server's transport layer from its business logic?",
        options: [
          "It's only a stylistic preference with no practical benefit",
          "It makes the server run faster by avoiding network overhead",
          "The same tool implementations can be reused across different transports (stdio, HTTP+SSE, WebSocket) without changes",
          "Java doesn't support mixing transport and logic in the same class",
        ],
        correctIndex: 2,
        explanation:
          "Transport-agnostic design means your tool handlers don't know or care whether they're being called over stdio or HTTP. You can start with a local stdio server, then expose the exact same tools remotely via SSE without rewriting any business logic. This also makes testing dramatically easier — you can test tool logic directly without setting up transport infrastructure.",
      },
    ],
  },

  "java-immutability": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What does it mean for an object to be immutable in Java?",
        options: [
          "Its fields are private, but setters can still modify them",
          "Its state cannot be changed after the object is constructed",
          "It can only be accessed by one thread at a time",
          "It automatically serializes to JSON without configuration",
        ],
        correctIndex: 1,
        explanation:
          "An immutable object's state is fixed at construction time and can never change. This means no setters, no methods that modify fields, and no way for external code to alter the object's data. String is the classic example — every method that 'modifies' a String actually returns a new String.",
      },
      {
        question: "Which of these is NOT one of the five rules for making a class immutable?",
        options: [
          "Don't provide setters",
          "Make the class final",
          "Use synchronized blocks on all getters",
          "Defensive copy mutable fields on the way in and out",
        ],
        correctIndex: 2,
        explanation:
          "Immutable objects don't need synchronization because their state never changes — that's one of the main benefits! The five rules are: no setters, final class, final fields, private fields, and defensive copying of mutable references. Thread safety comes for free with immutability.",
      },
      {
        question: "Why are Strings immutable in Java?",
        options: [
          "It's a historical accident with no real purpose",
          "Security (prevents tampering), string pool sharing, thread safety, and hashcode caching",
          "The JVM can't allocate mutable text efficiently",
          "The Java Language Specification requires all primitive wrappers to be immutable, and String is a wrapper",
        ],
        correctIndex: 1,
        explanation:
          "String immutability serves multiple practical purposes: security (a malicious library can't modify file paths or credentials between validation and use), the string pool (shared interned strings would break if mutable), inherent thread safety, and reliable hashcode caching (String caches its hash for fast HashMap lookups). It's one of the best design decisions in the Java platform.",
      },
      {
        question: "What's the key difference between Collections.unmodifiableList() and List.copyOf()?",
        options: [
          "unmodifiableList() works in Java 8; List.copyOf() doesn't",
          "unmodifiableList() returns a view — if the backing list changes, the 'unmodifiable' list reflects those changes. List.copyOf() creates an independent immutable copy.",
          "List.copyOf() is faster because it uses SIMD instructions",
          "There is no difference; they're aliases for the same implementation",
        ],
        correctIndex: 1,
        explanation:
          "This is the most common pitfall with unmodifiableList(): it's a wrapper/view, not a snapshot. If someone modifies the original backing list, the 'unmodifiable' wrapper sees the changes. List.copyOf() (Java 10+) eagerly copies the data into a new immutable list, guaranteeing independence from the source. If the source is already immutable, copyOf() returns the same reference — an O(1) optimization.",
      },
      {
        question: "You create an immutable List<Car> with List.of(car1, car2). Car has a setYear() method. Is the list truly immutable?",
        options: [
          "Yes — List.of() guarantees complete immutability",
          "The list structure is immutable (can't add/remove/replace), but the Car objects inside can still be mutated if Car is mutable",
          "No — List.of() doesn't actually prevent mutation",
          "Yes, but only if you also wrap each Car with Collections.unmodifiableObject()",
        ],
        correctIndex: 1,
        explanation:
          "List.of() and List.copyOf() make the collection itself immutable — you can't add, remove, or replace elements. But they don't make the elements immutable. If Car has a setYear() method, calling car1.setYear(2023) will mutate the Car inside the 'immutable' list. True deep immutability requires both: an immutable collection of immutable elements. This is where Java records shine — they're immutable by default.",
      },
    ],
  },

  "acid-transactions": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What does the 'A' in ACID stand for?",
        options: [
          "Availability",
          "Atomicity",
          "Asynchronous",
          "Aggregation",
        ],
        correctIndex: 1,
        explanation:
          "Atomicity means a transaction is all-or-nothing. Either every operation in the transaction completes successfully, or none of them do. If the database crashes halfway through a bank transfer (debit account A but before crediting account B), atomicity ensures the debit is rolled back — no money disappears into the void.",
      },
      {
        question: "A database crashes mid-transaction during a bank transfer from account A to account B. What ACID property ensures money isn't lost?",
        options: [
          "Consistency — it checks that both accounts remain valid",
          "Isolation — it prevents other transfers from interfering",
          "Atomicity — the partial transaction is rolled back completely",
          "Durability — the committed data survives the crash",
        ],
        correctIndex: 2,
        explanation:
          "Atomicity guarantees that incomplete transactions are rolled back entirely. If the crash happens after debiting A but before crediting B, the database undoes the debit during recovery. Neither account ends up in a half-updated state. Durability only applies AFTER a transaction commits — it doesn't help with in-flight transactions.",
      },
      {
        question: "What does Isolation guarantee in a database transaction?",
        options: [
          "Transactions execute strictly one after another",
          "Concurrently executing transactions don't interfere with each other",
          "All data is backed up before any transaction begins",
          "Transactions are isolated from the operating system's file system",
        ],
        correctIndex: 1,
        explanation:
          "Isolation means that even when multiple transactions run concurrently, the final result is the same as if they had run one after another (serially). The actual isolation level (Read Uncommitted, Read Committed, Repeatable Read, Serializable) determines how strictly this is enforced — stronger isolation prevents more anomalies but reduces concurrency.",
      },
      {
        question: "After a transaction commits successfully, what ACID property guarantees the data won't be lost due to a power failure?",
        options: [
          "Atomicity",
          "Consistency",
          "Isolation",
          "Durability",
        ],
        correctIndex: 3,
        explanation:
          "Durability ensures that once a transaction is committed, it stays committed — no matter what. Databases achieve this by writing changes to a write-ahead log (WAL) on persistent storage before acknowledging the commit. Even if the server loses power immediately after, the log can be replayed during recovery to restore all committed transactions.",
      },
      {
        question: "What does the Consistency property actually mean in ACID?",
        options: [
          "The database never has more than one user connected at a time",
          "A transaction transforms the database from one valid state to another, preserving all defined constraints (foreign keys, checks, uniqueness)",
          "All query results are returned in the same consistent order",
          "The database guarantees 99.999% uptime (five nines)",
        ],
        correctIndex: 1,
        explanation:
          "Consistency means your data integrity rules survive transactions. If a table has a CHECK constraint that balance must be ≥ 0, a transaction that would create a negative balance must fail — the database rejects it before commit. Foreign key constraints, unique indexes, and NOT NULL constraints are all enforced as part of consistency. Note: in the CAP theorem context, 'consistency' means something different (all nodes see the same data), which is a common source of confusion.",
      },
    ],
  },
  "testing-java-backends": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What is the main purpose of the testing pyramid?",
        options: [
          "To mandate that 70% of all tests must be unit tests",
          "To guide the distribution of tests across unit, integration, and E2E levels — balancing speed, confidence, and cost",
          "To prove that E2E tests are always the most valuable type of test",
          "To eliminate the need for integration tests entirely",
        ],
        correctIndex: 1,
        explanation:
          "The testing pyramid is a guideline, not a rigid rule. It suggests having many fast, focused unit tests; fewer but broader integration tests; and a small number of full-system E2E tests. The tradeoff is always speed vs. confidence — unit tests run in milliseconds but can't prove database queries work; E2E tests prove the full flow but are slow and fragile. The right distribution depends on your system's architecture and risk profile.",
      },
      {
        question: "Why is mocking the database for repository logic generally a bad idea?",
        options: [
          "Because Mockito doesn't support JDBC mocking",
          "Because it proves Mockito works, not that your SQL queries are correct — your test passes even with broken SQL",
          "Because database mocking requires an enterprise Mockito license",
          "Because mocked databases are always slower than real databases",
        ],
        correctIndex: 1,
        explanation:
          "When you mock a repository or JDBC template, you're testing your mock configuration, not the actual database interaction. Your test passes even if the SQL has a syntax error, the column names are wrong, the join produces incorrect results, or a constraint would be violated. Use Testcontainers to run a real PostgreSQL instance for repository tests — it catches problems unit tests structurally cannot.",
      },
      {
        question: "How would you test that two concurrent wallet debits of 80 EUR from a 100 EUR wallet don't both succeed?",
        options: [
          "Write a unit test that mocks the database and returns different balances each time",
          "Use ExecutorService, CountDownLatch, and multiple threads to submit simultaneous debit requests; assert exactly one succeeds, one fails, and the final balance is 20 EUR",
          "Call debit() twice in a for loop — the second call will always fail because the first one already ran",
          "Concurrency testing is impossible — just rely on code review",
        ],
        correctIndex: 1,
        explanation:
          "Use ExecutorService with a CountDownLatch to release multiple threads simultaneously, maximizing the race window. Each thread attempts to debit 80 EUR from a 100 EUR wallet. Assert exactly one thread succeeds (success counter = 1), exactly one fails with InsufficientFundsException (failure counter = 1), and the final wallet balance in the database is 20 EUR. Run multiple times to reduce false positives. Complement with deterministic database-level locking tests.",
      },
      {
        question: "What are contract tests and when are they most valuable?",
        options: [
          "Legal documents that define service level agreements between teams",
          "Tests that verify the interface shape between systems (API schemas, event formats, consumer expectations) — most valuable when teams evolve services independently in a microservices architecture",
          "Tests that verify the full system works by simulating real user contracts",
          "A type of unit test that verifies constructor contracts",
        ],
        correctIndex: 1,
        explanation:
          "Contract tests verify compatibility, not behavior. They ensure that a REST API response matches its OpenAPI spec, a Kafka event conforms to its JSON schema, or a consumer's expectations (defined via Pact) are satisfied by the provider. In microservices, where teams change services independently, contract tests catch breaking changes — like renaming a field or changing a type — before they reach production, without requiring full integration environments.",
      },
      {
        question: "Is high code coverage (90%+) always a sign of a well-tested system?",
        options: [
          "Yes — high coverage guarantees the system works correctly",
          "No — coverage measures what code was executed, not what behavior was verified; 90% line coverage with no transaction, concurrency, or failure-path tests provides false confidence",
          "Yes, as long as SonarQube says the quality gate passed",
          "No — but anything below 80% is automatically a poorly tested system",
        ],
        correctIndex: 1,
        explanation:
          "Code coverage is a measurement, not a goal. You can achieve 100% line coverage with tests that have no meaningful assertions — the code runs, but nothing verifies the output is correct. What matters is what's tested at what level: are transaction boundaries verified? Are concurrency paths covered? Are failure modes tested? A system with 60% coverage that tests critical business rules, failure paths, and integration points is far more reliable than one with 95% coverage from happy-path-only unit tests.",
      },
    ],
  },
  "domain-driven-design": {
    title: "Test Your Understanding",
    questions: [
      {
        question: "What distinguishes an Entity from a Value Object in DDD?",
        options: [
          "Entities are mutable, Value Objects are immutable",
          "Entities are defined by identity, Value Objects are defined by their attributes",
          "Entities live in the database, Value Objects are computed on the fly",
          "Entities have methods, Value Objects only have getters",
        ],
        correctIndex: 1,
        explanation:
          "The fundamental difference is that Entities have a stable identity that persists through changes. Two customers with identical names, emails, and addresses are still different customers — identity matters. Value Objects, like Money or Address, have no identity: two instances with the same fields are interchangeable. While Entities are typically mutable and Value Objects are typically immutable, that's a consequence of their nature, not the defining characteristic.",
      },
      {
        question: "What is an Aggregate in DDD?",
        options: [
          "A collection of all entities stored in the same database table",
          "A design pattern that combines multiple repository queries into one",
          "A cluster of domain objects treated as a single unit, accessed only through its aggregate root",
          "A batch job that recalculates derived values across all records",
        ],
        correctIndex: 2,
        explanation:
          "An Aggregate is a consistency boundary. It's a cluster of Entities and Value Objects that are always accessed through a single root entity. External code never references objects inside the aggregate directly — all changes go through the root, which enforces the invariants. For example, an Order (root) contains OrderLines; you can't add a line item except by calling order.addLine().",
      },
      {
        question: "Where should cross-aggregate business invariants be enforced?",
        options: [
          "Inside the aggregate root, the same as single-aggregate invariants",
          "In the application layer or a domain service, not inside either aggregate",
          "In the database using SQL constraints only",
          "In the API controller before any domain code runs",
        ],
        correctIndex: 1,
        explanation:
          "Cross-aggregate invariants (e.g., 'a suspended customer cannot place orders') span two aggregates — Customer and Order. Neither aggregate should reach into the other. Instead, the application service loads both aggregates and calls a domain service to enforce the rule. The domain service checks the precondition and then delegates to the aggregate root's method. SQL constraints can provide a safety net but shouldn't be the primary enforcement mechanism.",
      },
      {
        question: "In the DDD layered architecture, which layer should have zero framework dependencies?",
        options: [
          "The API layer (controllers, DTOs)",
          "The Application layer (use cases)",
          "The Domain layer (entities, value objects, ports)",
          "The Infrastructure layer (repositories, JPA entities)",
        ],
        correctIndex: 2,
        explanation:
          "The Domain layer is the innermost ring and should depend on nothing but the standard library. It defines interfaces (ports) for what it needs but never imports Spring, JPA, Jackson, or any framework. This keeps business rules testable with plain JUnit and makes the domain survivable through framework changes. The Infrastructure layer implements those ports using actual frameworks — but the domain never knows about them.",
      },
      {
        question: "Which scenario is the worst fit for Domain-Driven Design?",
        options: [
          "An insurance claims processing system with complex state transitions and regulatory rules",
          "A simple admin dashboard that performs CRUD operations on five database tables",
          "An e-commerce platform with pricing rules, inventory management, and order fulfillment",
          "A healthcare scheduling system with complex patient-provider booking logic",
        ],
        correctIndex: 1,
        explanation:
          "DDD is overkill for simple CRUD applications. If your domain has no complex business rules — just create, read, update, and delete records — you're better off with simpler patterns like Spring Data REST or a thin service layer. DDD shines when business complexity is the core challenge: insurance claims, e-commerce, healthcare, banking. The heuristic: if a domain expert can explain a rule that your code doesn't currently express, you might need DDD.",
      },
    ],
  },
};

export function getQuizData(slug: string): QuizData | undefined {
  return quizData[slug];
}
