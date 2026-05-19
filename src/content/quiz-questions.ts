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
};

export function getQuizData(slug: string): QuizData | undefined {
  return quizData[slug];
}
