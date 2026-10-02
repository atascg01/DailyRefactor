# Article rewrite review

Rewrote the 12 non-Jev published articles in place using the requested avoid-ai-writing skill, with the technical-blog context. The Jev article, its drafts and downloads, article metadata, and quizzes were not edited. Existing unrelated working-tree changes were preserved.

## Edits made

Removed stock article narration, promotional claims, repeated setup-and-reveal phrasing, hollow emphasis, and generic sign-offs. Rephrased prose dashes where they interrupted sentences. Kept technical explanations, first-person experience, examples, headings, anchors, and instructional lists.

### git-aliases

File: [article](D:/Work/DailyRefactor/src/content/blog/git-aliases.mdx)

- Before: Git aliases are a powerful way to boost your productivity by creating shortcuts for commonly used Git commands. In this article, we'll explore how to set up and use Git aliases effectively, along with some useful examples that can streamline your workflow.
  After: Git aliases give frequently used commands shorter names. You can use them for a single command or combine several commands into a shortcut.
- Before: Now that we know how to set up aliases, let's explore some useful examples that can enhance your Git workflow.
  After: The following aliases cover status, commits, branches, and logs.
- Before: Git aliases are a powerful tool that can significantly improve your productivity when working with Git. By creating shortcuts for commonly used commands and complex workflows, you can streamline your development process and focus more on writing code rather than typing commands.
  After: Git aliases reduce the typing needed for repeated commands and workflows.
- Before: Whether you're a Git novice or an experienced developer, taking the time to set up and customize your Git aliases will pay dividends in the long run. Start with the basic aliases and gradually add more advanced ones as you become more comfortable with Git and identify areas where you can further optimize your workflow.
  After: Start with basic aliases, then add more complex ones as you find commands you repeat.
- Before: Remember that the best aliases are the ones that match your workflow and make your daily Git operations more efficient.
  After: Choose names you can remember and shortcuts you will use.

### git-ignore

File: [article](D:/Work/DailyRefactor/src/content/blog/git-ignore.mdx)

- Before: Nowadays, every developer out there must be familiar with some version control system. I have now worked in 5 different jobs. Every single one of them was using some kind of version control system.
  After: I have now worked in 5 different jobs. Every single one used some kind of version control system.
- Before: When working on a real project,
  After: When working on a project,
- Before: The article introduction — read on to learn how to manage ignored files in Git.
  After: Git offers shared and local configuration for ignoring files.
- Before: The pros of using this approach are quite evident: we have a **shared file** with all the developers in our team, because this file is uploaded to the git repository.
  After: The `.gitignore` file is shared with the team because it is uploaded to the Git repository.
- Before: But precisely because it's a shared file — what if we want to ignore a private file that shouldn't be uploaded?
  After: For a private file that shouldn't be uploaded, we need a local ignore rule.
- Before: This configuration **won't be pushed** to the repository — it's a private, local configuration.
  After: This configuration won't be pushed to the repository. It stays local.
- Before: This approach is incredibly beneficial for local configuration files.
  After: It is useful for local configuration files.
- Before: But if we run `git status` we'll find a surprise — it's still showing as added!
  After: But `git status` still shows it as added:
- Before: Now that you've learned how to ignore files in git, what are you waiting for? Stop wasting your time modifying that local configuration file — add it to the `excludes` file or talk to your team about adding it to the `.gitignore` file.
  After: For local configuration, add the file to `excludes`. For files the whole team should ignore, discuss adding a rule to `.gitignore`.
- Before: I hope you enjoyed this quick post. Do you know some other ways to ignore files in Git? Let me know!
  After: (Removed empty sign-off.)
- Before: using Maven — imagine
  After: using Maven. Imagine

### java-concurrency

File: [article](D:/Work/DailyRefactor/src/content/blog/java-concurrency.mdx)

- Before: Concurrency in Java is a powerful tool that allows developers to build efficient, high-performance applications capable of executing multiple tasks simultaneously. I want to delve into two pivotal components: <code>ExecutorService</code> and <code>Future</code>. These classes provide a structured way to manage and control asynchronous tasks, making your code more scalable and easier to maintain.
  After: Java provides <code>ExecutorService</code> to manage asynchronous tasks and <code>Future</code> to track their results. Together, they let you submit work, wait for results, and manage task execution without handling each thread directly.
- Before: Unlike traditional thread management, `ExecutorService` abstracts away the complexities of thread creation and management, offering a higher-level API for executing tasks asynchronously.
  After: `ExecutorService` handles thread creation and management through a higher-level API for asynchronous task execution.
- Before: Let's consider an example where we need to perform multiple I/O-bound operations concurrently.
  After: This example runs multiple I/O-bound operations concurrently.
- Before: Let's modify our previous example to use `Future` to handle tasks that return results.
  After: The next version uses `Future` to handle tasks that return results.
- Before: Concurrency is a cornerstone of modern Java applications, and `ExecutorService` and `Future` are essential tools in a developer's toolkit. By abstracting thread management and providing a robust framework for executing and handling asynchronous tasks, they enable you to build scalable, efficient applications.
  After: `ExecutorService` handles thread management and task submission. `Future` lets you retrieve results, check task status, and cancel work.
- Before: Remember to follow best practices to harness their full potential and avoid common pitfalls. With these tools, you can master concurrency in Java and elevate your applications to new heights of performance and responsiveness.
  After: Shut down executors when they are no longer needed, handle task exceptions, and use timeouts to avoid waiting indefinitely. Choose the pool size with resource use and performance in mind.

### java-25-upgrade

File: [article](D:/Work/DailyRefactor/src/content/blog/java-25-upgrade.mdx)

- Before: and I'll be honest: most version upgrades
  After: and most version upgrades
- Before: Java 25 is different. It's an LTS release, sure — but more importantly, it ships features that actually change how you write code day to day.
  After: Java 25 is an LTS release with features that change how you write code day to day.
- Before: Real stuff.
  After: (Removed empty sign-off.)
- Before: Let me walk through the four that matter most, with code you can steal.
  After: These are the four features I consider most useful, with code examples.
- Before: Anywhere inside `processRequest` — no matter how deep the call stack — you just call:
  After: Anywhere inside `processRequest`, regardless of call-stack depth, you can call:
- Before: No parameters to thread through. No ThreadLocal cleanup to forget. The scope dies when `run()` completes, and the value goes with it.
  After: You do not need to pass the value through method parameters or clean up a ThreadLocal. The scope ends when `run()` completes, and the value goes with it.
- Before: What does that mean in practice? Every single object in your heap — every `String`, every `HashMap$Node`, every `Optional` — just got smaller.
  After: Every object in your heap, including every `String`, `HashMap$Node`, and `Optional`, just got smaller.
- Before: If your app has millions of objects (and it does), the memory savings add up fast.
  After: For an app with millions of objects, the memory savings add up.
- Before: Smaller objects mean less GC pressure, which means fewer pauses. For free.
  After: Smaller objects mean less GC pressure and fewer pauses.
- Before: That's the kind of improvement you'd normally need a refactoring sprint to achieve.
  After: That can save memory without a refactoring sprint.
- Before: Remember when Java added `var` and suddenly your code got shorter without losing clarity? Module imports hit the same sweet spot.
  After: Like `var`, module imports can shorten code without losing clarity.
- Before: And yes, it resolves transitive dependencies — if you `import module java.sql`, you get `java.xml` for free.
  After: It also resolves transitive dependencies: if you `import module java.sql`, you get `java.xml` too.
- Before: A few other things worth knowing about:
  After: Java 25 also includes:
- Before: this is a big deal.
  After: this adds generational collection to your existing GC.
- Before: Java 25 isn't a flashy release. It doesn't have a headliner like virtual threads or pattern matching. But it's packed with quality-of-life improvements that compound:
  After: Java 25 focuses on improvements such as
- Before: If you're maintaining a real application and you're still on 21, it's time. The upgrade is low-risk and the memory savings alone justify it.
  After: For applications still on 21, I consider the upgrade low-risk and justified by the memory savings.
- Before: For applications still on 21, I consider the upgrade low-risk and justified by the memory savings.
  After: For applications still on 21, the upgrade is low-risk and the memory savings justify it.

### acid-transactions

File: [article](D:/Work/DailyRefactor/src/content/blog/acid-transactions.mdx)

- Before: ACID is one of those terms that gets thrown around in interviews and architecture docs, but most developers only half-remember what it means. Let me fix that.
  After: ACID describes four properties of database transactions. It comes up in interviews and architecture decisions because these properties determine what happens when a transaction fails or runs alongside another.
- Before: ACID stands for Atomicity, Consistency, Isolation, and Durability — four properties that guarantee database transactions are reliable, even when everything goes wrong. A crash, a power failure, two users hitting the same row at the same time — ACID is the reason your data doesn't turn into garbage.
  After: ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties protect transactions against failures and concurrent access, including crashes, power failures, and two users changing the same row.
- Before: fully rolls back — the crash means
  After: fully rolls back. The crash means
- Before: All constraints — primary keys, foreign keys, check constraints, NOT NULL — must hold
  After: All constraints, including primary keys, foreign keys, check constraints, and NOT NULL, must hold
- Before: The key insight: consistency isn't something the transaction *does* — it's something the database *enforces*.
  After: The database enforces consistency through constraints.
- Before: Durability guarantees that once a transaction commits, it survives crashes, power failures, and anything short of the data center catching fire.
  After: Durability guarantees that committed transactions survive crashes and power failures, though destruction of the data center is a different matter.
- Before: the data is permanent — even through system failures.
  After: the data remains permanent through system failures.
- Before: Let's walk through a single bank transfer and see how each ACID property protects it.
  After: A bank transfer shows how the four properties work together.
- Before: Alice keeps her $1,200. No money vanishes into the void. Without atomicity, Alice loses $500 and Bob gets nothing — the worst possible outcome.
  After: Alice keeps her $1,200. Without atomicity, Alice loses $500 and Bob gets nothing.
- Before: They see either the before-state ($1,200) or the after-state ($700) — never the in-between.
  After: They see either the before-state ($1,200) or the after-state ($700), without an intermediate state.
- Before: PostgreSQL, MySQL with InnoDB, Oracle, SQL Server — they all have this covered.
  After: PostgreSQL, MySQL with InnoDB, Oracle, and SQL Server all support these properties.
- Before: But here's the thing — for financial data, inventory, and anything where correctness matters more than raw throughput, ACID is non-negotiable.
  After: For financial data, inventory, and other workloads where correctness matters more than throughput, ACID is non-negotiable.
- Before: The trade-offs are real, but the tools exist.
  After: These tools come with trade-offs.
- Before: ACID isn't academic trivia — it's the reason your bank doesn't lose money, your inventory doesn't go negative, and your database doesn't corrupt itself under concurrent load.
  After: ACID protects database operations against partial updates, invalid states, concurrent interference, and the loss of committed data.
- Before: **Atomicity**: All or nothing.**Consistency**: Only valid states.**Isolation**: No interference between transactions.**Durability**: Committed means permanent.
  After: Atomicity means all or nothing. Consistency means only valid states. Isolation prevents interference between transactions. Durability makes committed changes permanent.
- Before: second read — a
  After: second read, a

### build-mcp-server

File: [article](D:/Work/DailyRefactor/src/content/blog/build-mcp-server.mdx)

- Before: MCP — the Model Context Protocol — is the closest thing we have to a universal plug for AI applications. Think USB-C, but for connecting LLMs to your tools, data, and workflows.
  After: MCP, the Model Context Protocol, connects AI applications to tools, data, and workflows through a common interface.
- Before: Let me walk you through the primitives, show you real code, and then give you the rules that make the difference.
  After: The examples below cover the protocol's primitives and the work needed to prepare a server for production.
- Before: Let's break each one down with code.
  After: Each capability has a different role.
- Before: Tools are the powerhouse. The model decides when to call them, and the server executes.
  After: The model decides when to call tools, and the server executes them.
- Before: Here's a real tool definition
  After: Here's a tool definition
- Before: The `z.string().describe(...)` isn't decoration — it's how the model knows what to pass.
  After: The `z.string().describe(...)` tells the model what to pass.
- Before: The wrong tool description will make your server useless because the model won't know when to reach for it.
  After: An unclear tool description can leave the model unsure when to use it.
- Before: Resources can also have templates — dynamic URIs with path parameters:
  After: Resources can also have templates: dynamic URIs with path parameters.
- Before: Let's build a practical server — a bookmark manager that lets an AI assistant save, search, and retrieve bookmarks. We'll use TypeScript with the official SDK.
  After: The example server is a bookmark manager that lets an AI assistant save, search, and retrieve bookmarks. It uses TypeScript with the official SDK.
- Before: But this is a proof of concept. Let's talk about what it takes to make it production-grade.
  After: This is a proof of concept. A production server needs the validation, error handling, and testing described below.
- Before: This is the most common bug and the hardest to debug. The stdio transport uses stdout
  After: The stdio transport uses stdout
- Before: A tool called `manage_project` that creates, updates, deletes, and lists projects is bad. The model has to guess which parameters to pass, and the description becomes a novel.
  After: A tool called `manage_project` that creates, updates, deletes, and lists projects makes the model guess which parameters to pass and requires a long description.
- Before: The model is better at choosing the right tool than at figuring out which parameters to send to a Swiss Army knife.
  After: Separate tools let the model choose an operation without also selecting among several parameter sets.
- Before: Don't make the model work harder than it has to.
  After: (Removed empty sign-off.)
- Before: Never let an unhandled exception bubble up. The model gets a cryptic error, the user gets confused, and you get a support headache.
  After: Handle exceptions so the model and user receive a useful error message.
- Before: connecting it to a real model.
  After: connecting it to a model.
- Before: FastMCP uses type hints and docstrings for tool definitions — no Zod equivalent needed.
  After: FastMCP uses type hints and docstrings for tool definitions, without needing a Zod equivalent.
- Before: MCP servers are less about the protocol and more about good API design. The protocol handles the plumbing. What makes your server useful is clear descriptions, focused tools, and graceful error handling.
  After: Clear descriptions, focused tools, and useful error responses make an MCP server easier for a model to use. The protocol provides the connection; API design determines how well the tools work through it.
- Before: If you take one thing away: write descriptions like you're onboarding a new developer. The model is that developer — it's smart, it can figure things out, but it needs you to tell it what your tools do and when to use them.
  After: Write descriptions as you would for a new developer: explain what each tool does and when to use it.
- Before: — clone it, extend it, break it.
  After: . You can clone it and try extending it.
- Before: They're not automatic — the user picks them
  After: The user picks them explicitly
- Before: cleanly to the user.
  After: cleanly to the user.

### dependency-injection-java

File: [article](D:/Work/DailyRefactor/src/content/blog/dependency-injection-java.mdx)

- Before: DI isn't Spring magic. It's a design principle that existed long before Spring did — and it solves real problems in real codebases regardless of which framework you use. This article explains DI from first principles, with backend-style examples that'll actually help you in interviews and code reviews.
  After: DI is a design principle that predates Spring and applies regardless of framework. The backend examples below show how it makes dependencies explicit and lets you replace them in tests.
- Before: That's it. No framework, no annotations, no XML — just a design choice about how objects get what they need.
  After: It is a design choice about how objects get what they need, without requiring a framework, annotations, or XML.
- Before: Same class, same behavior — but
  After: The class has the same behavior, but
- Before: That one change — passing a dependency in instead of `new`-ing it internally — is the core idea.
  After: Passing a dependency in instead of `new`-ing it internally is the core idea.
- Before: it's permanently married to that implementation.
  After: it is tied to that implementation.
- Before: DI makes dependencies explicit — they're right there in the constructor signature.
  After: DI makes dependencies explicit in the constructor signature.
- Before: **Untestable code.** This is the killer. Try unit-testing the bad version:
  After: **Untestable code.** Try unit-testing the bad version:
- Before: DI fixes this instantly: pass in a fake repository and test the actual business logic in milliseconds.
  After: With DI, you can pass in a fake repository and test business logic in milliseconds.
- Before: **Real backend examples of dependencies you should inject:**
  After: Examples of backend dependencies to inject:
- Before: now the timestamp is deterministic and your assertions work.
  After: the timestamp is deterministic and your assertions work.
- Before: Constructor injection is the gold standard for required dependencies. The idea is simple:
  After: Use constructor injection for required dependencies:
- Before: easier to reason about — no field changes after construction.
  After: easier to reason about because fields do not change after construction.
- Before: Constructor injection has been the Spring team's recommendation since 4.x. Use it. Field injection works, but every senior engineer who's maintained a large codebase will tell you the same thing: constructor injection ages better.
  After: Constructor injection has been the Spring team's recommendation since 4.x. Field injection works, but constructor injection makes dependencies clearer and tests easier to set up.
- Before: where you genuinely need multiple implementations.
  After: where you need multiple implementations.
- Before: Here's the magic of DI in a real test. No database, no network, no Spring context — just the business logic:
  After: This test exercises the business logic without a database, network connection, or Spring context:
- Before: That's what DI buys you: isolating the logic you care about from the infrastructure you don't.
  After: DI isolates the business logic from the infrastructure.
- Before: Spring doesn't invent DI — it automates the wiring.
  After: Spring automates dependency wiring.
- Before: **Real implications for product development:**
  After: Implications for product development:
- Before: Dependency Injection isn't about which annotation you use. It's about a single design choice: **give objects what they need instead of making them find it themselves.**
  After: Dependency Injection means giving objects their dependencies instead of making them find or create those dependencies themselves.
- Before: The real payoff shows up over time.
  After: The benefit shows up as the codebase changes.
- Before: Use interfaces at real boundaries, not as ceremony.
  After: Use interfaces at boundaries that need replaceable implementations.
- Before: `Clock.fixed(...)` — the timestamp
  After: `Clock.fixed(...)`, so the timestamp
- Before: `new OrderService(fakeRepo, fakeGateway, fakeSender, fixedClock)` — done. No Spring context, no mocking library, no magic.
  After: `new OrderService(fakeRepo, fakeGateway, fakeSender, fixedClock)` works without a Spring context or mocking library.
- Before: it's not a DI problem — it's a design smell.
  After: it is a design smell.
- Before: seams — boundaries
  After: seams: boundaries
- Before: implementation — the rest
  After: implementation, and the rest
- Before: Mockito — you don't need the interface. Interfaces should earn their keep.
  After: Mockito without creating an interface.
- Before: It tests real behavior —
  After: It tests behavior:
- Before: — without a database, without Stripe, and without Spring Boot
  After: without a database, Stripe, or Spring Boot
- Before: runtime — probably
  After: runtime, probably
- Before: The design principle —
  After: The design principle,
- Before: — works with any DI framework
  After: , works with any DI framework
- Before: The dependency graph isn't hidden in XML files or reflection — it's encoded in constructors, visible to anyone reading the code.
  After: Constructors encode the dependency graph, making it visible to anyone reading the code rather than hiding it in XML files or reflection.
- Before: `EmailSenderFactory.getInstance()` — these
  After: `EmailSenderFactory.getInstance()` are
- Before: Kotlin script — anywhere
  After: Kotlin script, anywhere
- Before: PostgreSQL forever — you
  After: PostgreSQL; you
- Before: DI makes dependencies explicit — they're constructor parameters.
  After: DI makes dependencies explicit through constructor parameters.
- Before: Spring automates DI — it doesn't invent the concept.
  After: Spring automates this design principle.
- Before: a test double — all
  After: a test double, all
- Before: Java project — with
  After: Java project, with
- Before: setters for truly optional ones.
  After: setters for optional ones.
- Before: internally" , works
  After: internally", works
- Before: And remember: DI is a design idea,
  After: DI is a design idea,

### domain-driven-design

File: [article](D:/Work/DailyRefactor/src/content/blog/domain-driven-design.mdx)

- Before: Domain-Driven Design sounds like one of those enterprise buzzwords that consultants use to sell you a $50,000 workshop. But strip away the jargon and DDD is just a set of practical ideas for modeling complex business logic in code — ideas that developers independently rediscover after years of maintaining
  After: Domain-Driven Design is a set of practical ideas for modeling complex business logic in code. Developers often encounter these problems while maintaining
- Before: DDD is not a silver bullet. It has a specific sweet spot:
  After: DDD fits some kinds of work better than others:
- Before: DDD provides a vocabulary of patterns. Here are the ones you'll use every day, with real Java code.
  After: DDD provides patterns for identity, values, consistency boundaries, and business rules. The Java examples below show how they fit together.
- Before: different customers — identity is what matters.
  After: different customers because their identities differ.
- Before: Java records are perfect for Value Objects — they're immutable by default and implement
  After: Java records suit Value Objects because they're immutable by default and implement
- Before: Let's wire up everything we've built into a real feature. We'll implement
  After: The next example combines these objects to implement
- Before: The application layer is thin by design. Its job: load aggregates, delegate to domain, save. No business logic — that lives in the domain.
  After: The application layer loads aggregates, delegates to the domain, and saves the result. Business logic lives in the domain.
- Before: No Spring context. No database. No HTTP. Just the domain.
  After: These tests exercise the domain without a Spring context, database, or HTTP calls.
- Before: DDD isn't about the patterns — it's about the mindset. The patterns (Entities, Value Objects, Aggregates) are tools; the mindset is:
  After: Entities, Value Objects, and Aggregates support the same design principle:
- Before: If it does, you've understood DDD. If it doesn't, the domain might not be complex enough to need it — and that's fine too. The best architecture is the one you don't fight.
  After: If the code becomes easier to change, the model is helping. If it doesn't, the domain might not be complex enough to need DDD.
- Before: _ubiquitous language_ — the same
  After: _ubiquitous language_: the same
- Before: accounting, payroll — use existing software
  After: accounting, payroll; use existing software
- Before: business intent — `changeEmail`, `suspend`. Not `setEmail`, `setStatus`.
  After: business intent, such as `changeEmail` and `suspend`, instead of `setEmail` and `setStatus`.
- Before: interchangeable — like two $10 bills.
  After: interchangeable, like two $10 bills.
- Before: _root_ — the only
  After: _root_, the only
- Before: Why? Because business invariants need a boundary.
  After: Business invariants need a boundary.
- Before: — this rule can only be enforced
  After: can only be enforced
- Before: **`lines` is private — no external code adds lines directly.**
  After: `lines` is private, so external code cannot add lines directly.
- Before: There is no `setTotal()` — it's derived.
  After: `total` is derived without a `setTotal()` method.
- Before: (ports) — with zero framework dependencies.
  After: (ports), with zero framework dependencies.
- Before: pattern — the domain owns the ports.
  After: pattern: the domain owns the ports.
- Before: It doesn't contain business rules — it wires domain objects together and manages transactions.
  After: It wires domain objects together and manages transactions, while business rules live in the domain.
- Before: This isn't DDD — it's procedural code with fancy class names.
  After: This leaves the code procedural despite the domain class names.

### hashcode-equals-java

File: [article](D:/Work/DailyRefactor/src/content/blog/hashcode-equals-java.mdx)

- Before: Most of us can recite it by heart — but fewer can explain <em>why</em> it exists in the first place. In this article, I'll walk through what hashcodes actually are, how a HashMap uses them under the hood, and why getting this contract right (or wrong) can make or break your application.
  After: The contract follows from how HashMap uses hashcodes to locate a bucket and <code>equals()</code> to find a key within it. Getting either method wrong can make stored entries impossible to find.
- Before: Their real superpower shows up in hash-based collections like
  After: They are used by hash-based collections such as
- Before: To understand why, let's look at how a HashMap actually finds your data.
  After: HashMap lookup shows why the equality contract matters.
- Before: That would be `O(n)` — fine for a dozen entries, terrible for a million.
  After: That would be `O(n)`, which becomes expensive for a million entries.
- Before: array index — large hashcodes would blow past any reasonable array size.
  After: array index because large hashcodes would exceed any reasonable array size.
- Before: Here's the contract engraved in the `Object` Javadoc — and in every Java interview ever:
  After: The `Object` Javadoc defines the contract:
- Before: Let's unpack both halves.
  After: The two directions have different implications.
- Before: different bucket</em> — and never finds the entry.
  After: different bucket</em> and never finds the entry.
- Before: HashCode and equals aren't obscure trivia for certification exams. They're the foundation of every HashMap, HashSet, and cache in your application. Get them right and your collections work like magic — `O(1)` lookups, correct deduplication, predictable behavior. Get them wrong and you get phantom nulls, memory leaks from unfindable entries, and production incidents that are nearly impossible to reproduce.
  After: HashCode and equals determine how hash-based collections find and distinguish objects. Correct implementations support `O(1)` lookups and deduplication. Incorrect ones can produce unexpected nulls and memory leaks from entries that can no longer be found.
- Before: Hand-writing these methods is a code smell in 2026 — there's almost always a better way.
  After: Generated implementations usually remove the need to write these methods by hand.
- Before: Just remember: override both or override neither. Halfway is where the bugs live.
  After: Override both methods or leave both defaults in place.
- Before: fingerprint — not unique
  After: fingerprint: not unique
- Before: same hashcode — they contain
  After: same hashcode because they contain
- Before: outcome — one hash computation, one array access, done.
  After: outcome, requiring one hash computation and one array access.
- Before: map — return `null`.
  After: map, so the lookup returns `null`.
- Before: a linked list — each node
  After: a linked list; each node
- Before: entire map — `O(n)`.
  After: entire map, taking `O(n)` time.
- Before: `O(1)` — and the treeification
  After: `O(1)`, and the treeification
- Before: identity — it's literally `this == obj`.
  After: identity using `this == obj`.
- Before: same person — same name, same age.
  After: same person, with the same name and age.
- Before: information — collisions are
  After: information, so collisions are
- Before: results — <em>as long as equals() is correct</em>.
  After: results <em>as long as equals() is correct</em>.
- Before: equal — even if one
  After: equal even if one
- Before: controllers — things
  After: controllers: things
- Before: But be careful — this is a fragile assumption.
  After: This is a fragile assumption.
- Before: input streams — where
  After: input streams, where
- Before: <code>age</code> — no more, no less.
  After: <code>age</code>, with no additional or missing fields.
- Before: unfindable — a silent data leak.
  After: unfindable, causing a silent data leak.
- Before: <code>hashCode()</code> — and vice versa.
  After: <code>hashCode()</code>, and vice versa.
- Before: Future maintainers — including your future self — will thank you.
  After: This gives future maintainers the reason for the choice.

### java-immutability

File: [article](D:/Work/DailyRefactor/src/content/blog/java-immutability.mdx)

- Before: Immutability is one of those concepts that sounds academic until the day you spend four hours debugging a bug caused by someone modifying an object you didn't expect to change. In this article, I'll explain what immutability actually means in Java, how to enforce it in your own classes, why String works the way it does, and all the different ways to make a List immutable — with their tradeoffs.
  After: An immutable object keeps its state after construction, so callers cannot change data you expected to stay fixed. In Java, that requires attention to fields, references, and collection contents. String and the list APIs show both the benefits and the tradeoffs.
- Before: The key insight: immutability isn't just about missing setters. It's a guarantee that <em>nothing</em> — not your code, not a library, not a different thread — can change this object.
  After: Immutability guarantees that your code, a library, or another thread cannot change the object. Removing setters alone does not provide that guarantee.
- Before: This is the functional-programming style that underpins immutable design.
  After: This is the functional-programming style used in immutable design.
- Before: This is so fundamental that most Java developers don't think about it — until it bites them.
  After: (Removed empty sign-off.)
- Before: This reveals a crucial distinction:
  After: This shows the distinction between the collection and its elements:
- Before: If you're using Google Guava, `ImmutableList` has been the gold standard since before Java 9:
  After: Google Guava provided `ImmutableList` before Java 9:
- Before: The oldest technique, and still the most reliable when you don't trust the caller:
  After: Defensive copying keeps the caller from changing your internal collection:
- Before: Immutability isn't an academic exercise. It delivers real engineering benefits:
  After: Immutability helps with thread safety, caching, and understanding how data changes:
- Before: Immutability isn't a Java quirk — it's a design principle that pays dividends in thread safety, predictability, and maintainability. Java gives you the tools:
  After: Immutability improves thread safety and makes state easier to reason about. Java provides
- Before: And if you're on Java 14+, just use records and let the compiler do the heavy lifting.
  After: On Java 14+, records let the compiler generate the data-carrier methods.
- Before: Make things mutable only when you have a concrete reason — not the other way around. Your future self, debugging a concurrency issue at 2 AM, will be grateful.
  After: Make things mutable only when you have a concrete reason.
- Before: whiteboard — anyone
  After: whiteboard: anyone
- Before: stone tablet — chisel
  After: stone tablet: chisel
- Before: List reference — the caller
  After: List reference, so the caller
- Before: List directly — the caller
  After: List directly, so the caller
- Before: sensitive data — file paths, network addresses, database credentials.
  After: sensitive data such as file paths, network addresses, and database credentials.
- Before: see the change — chaos.
  After: see the change.
- Before: stable forever — making
  After: stable forever, making
- Before: This saves memory — no need for 10,000 copies
  After: This saves memory by avoiding 10,000 copies
- Before: it — `toUpperCase()`, `substring()`, `replace()`, `concat()` — returns
  After: it, such as `toUpperCase()`, `substring()`, `replace()`, or `concat()`, returns
- Before: Fixed content — can't create
  After: Fixed content: can't create
- Before: Wraps without copying — fast, memory-efficient.
  After: Wraps without copying, saving time and memory.
- Before: This is the most common pitfall — developers
  After: A common pitfall is that developers
- Before: immutable — but this relies
  After: immutable, but this relies
- Before: (O(1) identity check) — smart optimization.
  After: (O(1) identity check).
- Before: every time — expensive if called
  After: every time, which is expensive if called
- Before: `List.copyOf()`— then
  After: `List.copyOf()`, then
- Before: <strong>shallowly immutable</strong> — the fields
  After: <strong>shallowly immutable</strong>: the fields
- Before: halfway state — the constructor
  After: halfway state; the constructor
- Before: instead — they're all immutable.
  After: instead; they're all immutable.
- Before: Future maintainers will thank you — and think twice before adding that setter.
  After: The documentation tells future maintainers to preserve immutability when adding methods.
- Before: Creates a truly independent, immutable copy:
  After: Creates an independent, immutable copy:
- Before: can never change.
  After: can never change.
- Before: The mental model is simple: <strong>don't let anyone change what you've built</strong>.
  After: Keep objects unchanged after construction.

### thread-safety-java

File: [article](D:/Work/DailyRefactor/src/content/blog/thread-safety-java.mdx)

- Before: Picture this: you're building a payment service.
  After: Consider a payment service.
- Before: Somebody just got two iPads for the price of one, and your finance team just got a headache.
  After: The service has approved more spending than the balance allows.
- Before: And here's the thing most tutorials skip:
  After: The distinction is that
- Before: This article walks through the hard part.
  After: The examples below show how to protect that shared data.
- Before: That's it. No magical definition. If two threads
  After: If two threads
- Before: Instance fields and static fields? Those are the danger zone.
  After: Instance fields and static fields can be shared between threads.
- Before: The bank is not going to be happy.
  After: (Removed empty sign-off.)
- Before: Why is shared mutable state so dangerous? Because it creates
  After: Shared mutable state creates
- Before: all bets are off.
  After: you need to coordinate access.
- Before: The single best thread-safety technique isn't a keyword or a library. It's a design choice: **don't share mutable state in the first place**.
  After: Avoid sharing mutable state where you can. This design choice removes the need to synchronize access to that state.
- Before: Everybody knows `HashMap` isn't thread-safe. What fewer people know is that even
  After: `HashMap` isn't thread-safe. Even
- Before: The concurrent collection is just one piece of the puzzle.
  After: The collection does not protect mutations to the wallet.
- Before: Let's bring it all together. Here's the full evolution of our wallet, from unsafe to production-ready.
  After: The wallet example starts with an unsafe in-memory version, adds synchronization, then addresses database access across JVMs.
- Before: In a real backend,
  After: In a database-backed service,
- Before: Thread safety boils down to one idea: **control access to shared mutable state**.
  After: Thread safety requires controlling access to shared mutable state.
- Before: And in real backend systems, remember that Java thread safety is only half the story.
  After: In backend systems, Java thread safety also needs to be considered alongside database consistency.
- Before: Thread safety isn't something you add at the end. It's something you design from the start — or pay for later in production incidents at 3 AM.
  After: Design for thread safety from the start to avoid concurrency failures in production.
- Before: moment — each trying
  After: moment, each trying
- Before: In backend systems — especially fintech, e-commerce, or anything with shared user balances — concurrent requests
  After: In backend systems, especially fintech, e-commerce, or anything with shared user balances, concurrent requests
- Before: invariants hold — balances don't go negative, counters don't skip values, collections don't get corrupted — your code
  After: invariants hold (balances don't go negative, counters don't skip values, collections don't get corrupted), your code
- Before: reach it — an instance field, a static field, or a shared collection — you
  After: reach it, such as an instance field, a static field, or a shared collection, you
- Before: **critical section** — a block
  After: **critical section**, a block
- Before: Safe use — a shutdown flag:
  After: Safe use: a shutdown flag.
- Before: Unsafe use — a counter:
  After: Unsafe use: a counter.
- Before: others read — and the write
  After: others read, and the write
- Before: **compare-and-swap (CAS)** — a hardware-level instruction
  After: **compare-and-swap (CAS)**, a hardware-level instruction
- Before: which helps — but
  After: which helps, but
- Before: internally — different segments of the map can be locked independently — so
  After: internally: different segments of the map can be locked independently, so
- Before: thread-safe — either through
  After: thread-safe, either through
- Before: **Step 3: Enter the database — where thread safety meets ACID**
  After: **Step 3: Protect the database with transactions and locking**
- Before: others — and you
  After: others, and you
- Before: visibility — writes
  After: visibility: writes
- Before: integer — typically
  After: integer, typically
- Before: state — through immutability, thread-confined objects, or message-passing architectures — you
  After: state through immutability, thread-confined objects, or message-passing architectures, you
- Before: Know what each tool guarantees — and what it doesn't.
  After: Know what each tool guarantees and where you need additional protection.
- Before: ends up at -60 EUR.
  After: ends up at -60 EUR.
- Before: The key insight: **local variables are safe, instance/static fields are not**.
  After: **Local variables are safe, instance/static fields are not**.

### testing-java-backends

File: [article](D:/Work/DailyRefactor/src/content/blog/testing-java-backends.mdx)

- Before: Writing unit tests is easy. Designing a testing strategy that gives you real confidence — one that catches concurrency bugs, transaction failures, contract breaks, and edge cases before they hit production — that's a different skill entirely. It's also exactly the kind of thing that comes up in senior engineering interviews.
  After: A testing strategy needs to cover concurrency bugs, transaction failures, contract breaks, and edge cases as well as isolated logic. Choosing the right test for each risk is also a common topic in senior engineering interviews.
- Before: This article is a practical guide to testing Java backends, from unit tests with JUnit and Mockito all the way through integration tests with Testcontainers, contract tests for microservices, and concurrency tests that actually catch race conditions. We'll use a fintech wallet as our running example — because if you can test a money transfer, you can test anything.
  After: The examples use a fintech wallet to show unit tests with JUnit and Mockito, integration tests with Testcontainers, contract tests, and concurrency tests. A transfer combines business rules with database behavior and failures, so it needs coverage at several levels.
- Before: and — crucially — what *not* to test at a given level.
  After: and what *not* to test at a given level.
- Before: Mocking is powerful but easy to misuse. The rule of thumb:
  After: The rule of thumb for mocking is:
- Before: Dependency Injection is one of the most valuable testing tools in Java. Constructor injection in particular makes unit testing trivial — you pass dependencies through the constructor, and tests pass fakes or mocks instead of real infrastructure.
  After: Constructor injection lets tests pass fakes or mocks through the constructor instead of using real infrastructure.
- Before: No Spring, no database, no network — but we've verified the core orchestration logic of the transfer.
  After: The test verifies the transfer's core orchestration without Spring, a database, or network calls.
- Before: The simplest and most reliable way to run integration tests in Java is with **Testcontainers**.
  After: **Testcontainers** runs integration tests against real infrastructure.
- Before: Concurrency bugs are the hardest to reproduce, the hardest to debug, and among the most dangerous in financial systems.
  After: Concurrency bugs can be difficult to reproduce and debug, especially when they affect financial data.
- Before: that would create money out of thin air.
  After: that would approve debits exceeding the balance.
- Before: Testing isn't just about catching bugs — it's about protecting product behavior.
  After: Tests protect product behavior as well as catching bugs.
- Before: A good testing strategy isn't about hitting a coverage number. It's about distributing confidence across the right levels so that when you push to production at 5 PM on a Friday, you're not holding your breath.
  After: Choose test levels according to the behavior and risks you need to verify. A coverage number alone cannot tell you whether a transfer rolls back or handles concurrent requests correctly.
- Before: The practical takeaway is straightforward:
  After: Apply each level where it can verify the relevant behavior:
- Before: The wallet example throughout this article isn't just pedagogical. Financial systems are pure stress tests for testing strategy — they require correctness, consistency, concurrency safety, and failure resilience, all at once. If you can test a money transfer thoroughly, you can test anything.
  After: The wallet example needs tests for correctness, consistency, concurrent access, and failure handling. Each level covers a different part of those requirements.
- Before: — you'll have the test that answers.
  After: , you'll have the test that answers.
- Before: level — usually unit tests,
  After: level, usually unit tests,
- Before: `Wallet.debit()` all day — checking
  After: `Wallet.debit()` repeatedly, checking
- Before: pure domain logic — no database, no HTTP, no Spring context.
  After: pure domain logic without a database, HTTP calls, or a Spring context.
- Before: too much — and when it fails,
  After: too much. When it fails,
- Before: behave — which tells
  After: behave, which tells
- Before: real infrastructure — a real database, a real message broker, a real filesystem.
  After: real infrastructure, such as a database, message broker, or filesystem.
- Before: provide — but only if
  After: provide, but only if
- Before: both succeed — that would
  After: both succeed, since that would
- Before: *false positive* — the test
  After: *false positive*: the test
- Before: two systems — whether it's a REST API, a gRPC service, or a message schema — matches
  After: two systems, whether it's a REST API, a gRPC service, or a message schema, matches
- Before: breaking changes — like renaming
  After: breaking changes, such as renaming
- Before: exception — the unit test covers that.
  After: exception; the unit test covers that.
- Before: entire system — real HTTP calls, real database, real (or simulated) external services.
  After: entire system, using real HTTP calls, a real database, and real (or simulated) external services.
- Before: environmental flakiness — network glitches, container startup races, test data collisions.
  After: environmental flakiness, including network glitches, container startup races, and test data collisions.
- Before: user journeys — the flows where failure
  After: user journeys, the flows where failure
- Before: it's not just a code problem; it's a product protection mechanism that just fired.
  After: it identifies a product rule that the refactor has broken.
- Before: No edge cases, no error conditions, no boundary values.
  After: The tests omit edge cases, error conditions, and boundary values.
- Before: security — they all pass,
  After: security: they all pass,
- Before: — famous last words.
  After: is an unsafe assumption.
- Before: external systems — real databases, real HTTP calls, real message brokers.
  After: external systems, including real databases, HTTP calls, and message brokers.
- Before: Dependency Injection — specifically constructor injection — lets
  After: Dependency Injection, specifically constructor injection, lets
- Before: not changed — proving
  After: not changed, proving
- Before: They don't test behavior — they test *shape*.
  After: They test *shape* rather than behavior.
- Before: critical — test them
  After: critical; test them
- Before: lower risk — unit tests
  After: lower risk; unit tests
- Before: regressions — even if the original engineer
  After: regressions even if the original engineer

## Verification

- Editing passes: one of a maximum of two for most files; two for java-25-upgrade, build-mcp-server, dependency-injection-java, java-immutability, thread-safety-java. The second pass repaired punctuation or whitespace and removed remaining local filler.
- Checks: the deterministic detector ran before and after with technical context and rendered-markdown input; the quote/apostrophe normalizer ran on changed editable spans; the preservation validator ran against saved originals with residual-policy warn. All 12 files passed mechanical preservation checks. The facts, stance, and meaning assessment is model-only, not a factual audit.
- Residuals: original headings such as "Bottom line", "Conclusion", "Best Practices", and dash-separated headings remain to preserve structure and existing anchors. Table-of-contents links trigger hashtag/list flags; those links are navigation, not social hashtags. Bold technical labels, interview questions, and list labels remain intentional. Dashes in tables and examples remain protected. In Java 25, the quoted incubator-module example remains; in immutability, "truly immutable" retains the source distinction from a view.
- Stop reason: no further justified wording edit was identified within this structure-preserving pass. Broader restructuring and factual corrections need separate work.

Detector finding counts are diagnostics, not authorship scores or acceptance criteria:

| Article | Before | After |
|---|---:|---:|
| git-aliases | 6 | 5 |
| git-ignore | 2 | 1 |
| java-concurrency | 12 | 5 |
| java-25-upgrade | 4 | 4 |
| acid-transactions | 5 | 4 |
| build-mcp-server | 4 | 4 |
| dependency-injection-java | 6 | 3 |
| domain-driven-design | 3 | 3 |
| hashcode-equals-java | 4 | 2 |
| java-immutability | 4 | 4 |
| thread-safety-java | 4 | 4 |
| testing-java-backends | 7 | 4 |

The validator also issued numeral warnings for deleted rhetorical examples: the $50,000 workshop, the 2026 code-smell label, 2 AM/3 AM debugging scenes, and the Friday 5 PM deployment scene. These were removed as unsupported promotional/dramatic framing, rather than measurements or example inputs. The Java 25 warning concerns a repeated release number already in the source. No mechanical preservation errors were reported.

## Technical passages for a separate fact-check

These are review candidates found in the original text, not corrections made or claims independently verified in this pass:

- Git aliases: the distinction between "temporary" aliases configured with `--global` and aliases entered directly in the configuration file.
- Git ignore: IDE-dependent `.gitignore` locations, the claim that private ignore rules cannot use `.gitignore`, and the "Global exclude file" label for `.git/info/exclude`.
- Java 25: compact object header activation and benchmark attribution, removed APIs, and Security Manager status.
- ACID: isolation guarantees at different levels, the "phantom read" example, CAP framing, and whether sagas supply the stated ACID guarantees.
- Equality and immutability: default hashcode implementation, collision/tree lookup claims, records release versions, immutable versus unmodifiable collections, cache invalidation, and final-field publication claims.
- DI and DDD: guarantees about null dependencies or compile-time validation, mandatory entity mutability, and replacing infrastructure without changing business logic.
- Thread safety and testing: ConcurrentHashMap internals, volatile semantics, contention mechanisms in tests, and claims of deterministic concurrency-test coverage.

Final site checks: `npm run build` passed after the corrective pass, including MDX compilation, TypeScript, and all 26 static pages. `git diff --check` passed. A separate deterministic comparison confirmed imports, quiz components, headings and link destinations are unchanged for all 12 articles. The Jev file changed independently during this session; this rewrite did not write to it or restore an earlier version. No browser visual inspection ran.
