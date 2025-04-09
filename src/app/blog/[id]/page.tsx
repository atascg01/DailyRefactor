import Image from 'next/image';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

// This would typically come from a database or API
const articles: Record<number, {
    id: number;
    title: string;
    content: string;
    category: string;
    image: string;
    date: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    readTime: string;
}> = {
    1: {
        id: 1,
        title: 'Concurrency in Java: A guide to ExecutorService and Future',
        content: `
        <p>Concurrency in Java is a powerful tool that allows developers to build efficient, high-performance applications capable of executing multiple tasks simultaneously. I want to delve into two pivotal components: <code>ExecutorService</code> and <code>Future</code>. These classes provide a structured way to manage and control asynchronous tasks, making your code more scalable and easier to maintain.</p>

        <div class="table-of-contents bg-black-100 p-6 rounded-lg mb-12">
            <h2 class="text-xl font-bold mb-4">Table of Contents</h2>
            <ul class="space-y-2">
                <li><a href="#understanding-executorservice" class="text-blue-600 hover:text-blue-800">1. Understanding ExecutorService</a>
                    <ul class="ml-4 mt-2 space-y-1">
                        <li><a href="#key-features-executorservice" class="text-blue-600 hover:text-blue-800">1.1 Key Features of ExecutorService</a></li>
                    </ul>
                </li>
                <li><a href="#how-to-instantiate" class="text-blue-600 hover:text-blue-800">2. How to instantiate an ExecutorService</a>
                    <ul class="ml-4 mt-2 space-y-1">
                        <li><a href="#single-thread-executor" class="text-blue-600 hover:text-blue-800">2.1 Single Thread Executor</a></li>
                        <li><a href="#fixed-thread-pool" class="text-blue-600 hover:text-blue-800">2.2 Fixed Thread Pool</a></li>
                        <li><a href="#cached-thread-pool" class="text-blue-600 hover:text-blue-800">2.3 Cached Thread Pool</a></li>
                        <li><a href="#scheduled-thread-pool" class="text-blue-600 hover:text-blue-800">2.4 Scheduled Thread Pool</a></li>
                        <li><a href="#work-stealing-pool" class="text-blue-600 hover:text-blue-800">2.5 Work Stealing Pool</a></li>
                        <li><a href="#custom-thread-pool" class="text-blue-600 hover:text-blue-800">2.6 Custom Thread Pool</a></li>
                    </ul>
                </li>
                <li><a href="#example-executorservice" class="text-blue-600 hover:text-blue-800">3. Example: Using ExecutorService</a></li>
                <li><a href="#introducing-future" class="text-blue-600 hover:text-blue-800">4. Introducing Future</a>
                    <ul class="ml-4 mt-2 space-y-1">
                        <li><a href="#key-features-future" class="text-blue-600 hover:text-blue-800">4.1 Key Features of Future</a></li>
                    </ul>
                </li>
                <li><a href="#example-future" class="text-blue-600 hover:text-blue-800">5. Example: Using Future</a></li>
                <li><a href="#best-practices" class="text-blue-600 hover:text-blue-800">6. Best Practices</a></li>
                <li><a href="#conclusion" class="text-blue-600 hover:text-blue-800">7. Conclusion</a></li>
            </ul>
        </div>

        <div class="mb-12"></div>

        <h2 id="understanding-executorservice" class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">1. Understanding ExecutorService</h2>
        <p class="my-6">The <code>ExecutorService</code> interface is part of the <code>java.util.concurrent</code> package, and represents a pool of threads that can be used to execute tasks concurrently. Unlike traditional thread management, <code>ExecutorService</code> abstracts away the complexities of thread creation and management, offering a higher-level API for executing tasks asynchronously.</p>

        <h3 id="key-features-executorservice" class="text-xl font-semibold mt-12 mb-6">1.1 Key Features of ExecutorService</h3>
        <ol class="my-8">
            <li class="my-3"><strong>Thread Pool Management</strong>: <code>ExecutorService</code> manages a pool of threads, reusing them for executing multiple tasks. This approach reduces the overhead associated with thread creation and destruction.</li>
            <li class="my-3"><strong>Task Submission</strong>: Tasks can be submitted to the <code>ExecutorService</code> using various methods like <code>execute(Runnable command)</code> for fire-and-forget tasks or <code>submit(Callable&lt;T&gt; task)</code> for tasks that return a result.</li>
            <li class="my-3"><strong>Graceful Shutdown</strong>: <code>ExecutorService</code> provides methods like <code>shutdown()</code> and <code>shutdownNow()</code> to stop the execution of tasks gracefully or forcefully.</li>
        </ol>

        <div class="mb-12"></div>

        <h2 id="how-to-instantiate" class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">2. How to instantiate an ExecutorService</h2>
        <p class="my-6">Java provides several ways to instantiate an <code>ExecutorService</code>, each suited to different use cases. The <code>Executors</code> utility class is commonly used to create different types of thread pools. Here, we'll explore the various ways to instantiate an <code>ExecutorService</code>, along with code examples for each.</p>

        <h3 id="single-thread-executor" class="text-xl font-semibold mt-12 mb-6">2.1 Single Thread Executor</h3>
        <p class="my-6">A single-thread executor creates an <code>ExecutorService</code> that uses a single worker thread to execute tasks sequentially. This is useful when tasks need to be executed one at a time, ensuring that no two tasks run concurrently.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SingleThreadExecutorExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        for (int i = 0; i < 5; i++) {
            executorService.execute(new Task(i));
        }

        executorService.shutdown();
    }
}

class Task implements Runnable {
    private final int taskId;

    public Task(int taskId) {
        this.taskId = taskId;
    }

    @Override
    public void run() {
        System.out.println("Executing task " + taskId + " by " + Thread.currentThread().getName());
    }
}</code></pre>

        <div class="mb-8"></div>

        <h3 id="fixed-thread-pool" class="text-xl font-semibold mt-12 mb-6">2.2 Fixed Thread Pool</h3>
        <p class="my-6">A fixed thread pool creates an <code>ExecutorService</code> with a specified number of threads. It is suitable for scenarios where a known number of threads is optimal for the workload.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class FixedThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(3);

        for (int i = 0; i < 10; i++) {
            executorService.execute(new Task(i));
        }

        executorService.shutdown();
    }
}</code></pre>

        <div class="mb-8"></div>

        <h3 id="cached-thread-pool" class="text-xl font-semibold mt-12 mb-6">2.3 Cached Thread Pool</h3>
        <p class="my-6">A cached thread pool creates an <code>ExecutorService</code> that can dynamically create new threads as needed, but will reuse previously constructed threads when available. This is useful for applications with many short-lived tasks.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CachedThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newCachedThreadPool();

        for (int i = 0; i < 10; i++) {
            executorService.execute(new Task(i));
        }

        executorService.shutdown();
    }
}</code></pre>

        <div class="mb-8"></div>

        <h3 id="scheduled-thread-pool" class="text-xl font-semibold mt-12 mb-6">2.4 Scheduled Thread Pool</h3>
        <p class="my-6">A scheduled thread pool creates an <code>ExecutorService</code> that can schedule commands to run after a given delay, or to execute periodically. This is useful for tasks that need to be executed at regular intervals.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduledThreadPoolExample {
    public static void main(String[] args) {
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(2);

        for (int i = 0; i < 5; i++) {
            scheduledExecutorService.schedule(new Task(i), 2, TimeUnit.SECONDS);
        }

        scheduledExecutorService.shutdown();
    }
}</code></pre>

        <div class="mb-8"></div>

        <h3 id="work-stealing-pool" class="text-xl font-semibold mt-12 mb-6">2.5 Work Stealing Pool</h3>
        <p class="my-6">A work stealing pool creates an <code>ExecutorService</code> that maintains enough threads to support a given parallelism level and uses multiple queues to reduce contention. This is suitable for workloads that can be decomposed into smaller tasks.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class WorkStealingPoolExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newWorkStealingPool();

        for (int i = 0; i < 10; i++) {
            executorService.submit(new Task(i));
        }

        executorService.shutdown();
    }
}</code></pre>

        <div class="mb-8"></div>

        <h3 id="custom-thread-pool" class="text-xl font-semibold mt-12 mb-6">2.6 Custom Thread Pool</h3>
        <p class="my-6">In some cases, you may need more control over the thread pool configuration, such as setting custom thread factories or handlers for rejected tasks. You can achieve this using the <code>ThreadPoolExecutor</code> class directly.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class CustomThreadPoolExample {
    public static void main(String[] args) {
        ThreadPoolExecutor executorService = (ThreadPoolExecutor) Executors.newFixedThreadPool(3);

        for (int i = 0; i < 10; i++) {
            executorService.execute(new Task(i));
        }

        executorService.shutdown();
        try {
            executorService.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}</code></pre>

        <div class="mb-12"></div>

        <h2 id="example-executorservice" class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">3. Example: Using ExecutorService</h2>
        <p class="my-6">Let's consider an example where we need to perform multiple I/O-bound operations concurrently. We'll use <code>ExecutorService</code> to manage the execution of these tasks.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(5);

        for (int i = 0; i < 10; i++) {
            executorService.execute(new Task(i));
        }

        executorService.shutdown();
    }
}

class Task implements Runnable {
    private final int taskId;

    public Task(int taskId) {
        this.taskId = taskId;
    }

    @Override
    public void run() {
        System.out.println("Executing task " + taskId + " by " + Thread.currentThread().getName());
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}</code></pre>

        <div class="mb-12"></div>

        <h2 id="introducing-future" class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">4. Introducing Future</h2>
        <p class="my-6">The <code>Future</code> interface represents the result of an asynchronous computation. It provides methods to check if the computation is complete, wait for its completion, and retrieve the result.</p>

        <h3 id="key-features-future" class="text-xl font-semibold mt-12 mb-6">4.1 Key Features of Future</h3>
        <ol class="my-8">
            <li class="my-3"><strong>Result Retrieval</strong>: <code>Future</code> allows you to retrieve the result of a computation once it's done using the <code>get()</code> method. This method blocks until the result is available.</li>
            <li class="my-3"><strong>Cancellation</strong>: You can cancel the execution of a task using the <code>cancel(boolean mayInterruptIfRunning)</code> method.</li>
            <li class="my-3"><strong>Status Check</strong>: <code>Future</code> provides methods like <code>isDone()</code> to check if the task is completed and <code>isCancelled()</code> to check if the task was cancelled.</li>
        </ol>

        <div class="mb-12"></div>

        <h2 id="example-future" class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">5. Example: Using Future</h2>
        <p class="my-6">Let's modify our previous example to use <code>Future</code> to handle tasks that return results.</p>

        <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class FutureExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(5);

        Future<Integer>[] futures = new Future[10];
        for (int i = 0; i < 10; i++) {
            futures[i] = executorService.submit(new TaskWithResult(i));
        }

        for (Future<Integer> future : futures) {
            try {
                System.out.println("Result: " + future.get());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        executorService.shutdown();
        try {
            executorService.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class TaskWithResult implements Callable<Integer> {
    private final int taskId;

    public TaskWithResult(int taskId) {
        this.taskId = taskId;
    }

    @Override
    public Integer call() {
        System.out.println("Executing task " + taskId + " by " + Thread.currentThread().getName());
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return taskId * 2;
    }
}</code></pre>

        <div class="mb-12"></div>

        <h2 id="best-practices" class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">6. Best Practices for Using ExecutorService and Future</h2>
        <ol class="my-8">
            <li class="my-3"><strong>Proper Shutdown</strong>: Always ensure that the <code>ExecutorService</code> is properly shut down using <code>shutdown()</code> or <code>shutdownNow()</code> to free up resources.</li>
            <li class="my-3"><strong>Handling Exceptions</strong>: Be mindful of exceptions in tasks. Use appropriate exception handling in the <code>call</code> or <code>run</code> methods to avoid unexpected crashes.</li>
            <li class="my-3"><strong>Timeouts</strong>: Use timeouts with the <code>get</code> method of <code>Future</code> to prevent indefinite blocking.</li>
            <li class="my-3"><strong>Resource Management</strong>: Be cautious with the number of threads in the pool. Too many threads can lead to resource exhaustion, while too few can cause performance bottlenecks.</li>
            <li class="my-3"><strong>Avoiding Deadlocks</strong>: Ensure tasks do not hold locks or resources for long periods, as this can lead to deadlocks.</li>
        </ol>

        <div class="mb-12"></div>

        <h2 id="conclusion" class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">7. Conclusion</h2>
        <p class="my-6">Concurrency is a cornerstone of modern Java applications, and <code>ExecutorService</code> and <code>Future</code> are essential tools in a developer's toolkit. By abstracting thread management and providing a robust framework for executing and handling asynchronous tasks, they enable you to build scalable, efficient applications. Remember to follow best practices to harness their full potential and avoid common pitfalls. With these tools, you can master concurrency in Java and elevate your applications to new heights of performance and responsiveness.</p>
        `,
        category: 'Java',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        date: 'May 19, 2024',
        author: {
            name: 'Andres Tascon',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
            role: 'Senior Software Engineer',
        },
        readTime: '10 min read',
    }
};

export function generateStaticParams() {
    return [
        { id: '1' }
    ];
}

export default async function BlogPost({ params }: { params: { id: string } }) {
    // Await the params object
    const resolvedParams = await Promise.resolve(params);
    const articleId = parseInt(resolvedParams.id);
    const article = articles[articleId];

    if (!article) {
        return <div>Article not found</div>;
    }

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
                className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-700 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-12 prose-h3:mb-6 prose-p:my-6 prose-p:leading-relaxed prose-ol:my-8 prose-li:my-3 prose-pre:my-10 prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-code:text-blue-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share Section */}
            <ShareButtons title={article.title} />
        </article>
    );
} 