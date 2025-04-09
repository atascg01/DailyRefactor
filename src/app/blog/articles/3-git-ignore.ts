export const article = {
  id: 3,
  title: 'How to ignore files in Git',
  category: 'Git',
  image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  date: 'February 25, 2023',
  author: {
    name: 'Andres Tascon',
    avatar: '/images/pic_photo.jpg',
    role: 'Senior Software Engineer',
  },
  readTime: '5 min read',
  content: `
    <div class="prose prose-lg prose-invert max-w-none">
      <h2 class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">Table of Contents</h2>
      <ul class="space-y-2">
        <li>1. Introduction</li>
        <li>2. .Gitignore file</li>
        <li>3. Global exclude file</li>
        <li>4. Example</li>
        <li>5. Conclusion</li>
      </ul>

      <h2 class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">1. Introduction</h2>
      <p class="my-6">
      Nowadays, every developer out there must be familiar with some version control system. I have now worked in 5 different jobs. Every single one of them was using some kind of version control system.
      </p>

      <p class="my-6">
      Even though there are many of them, the most used by far is Git.
      </p>

      <p class="my-6">
      When working on a real project, we often need to create or modify a file we don't want to be added to the repository.
      </p>

      <p class="my-6">
      The most common scenario for a backend developer is probably some local file configuration to access to a local database or some kind of parameters that need to be passed to the execution of the server itself.
      </p>

      <p class="my-6">
      For a frontend developer, you may be sick of hearing this but in case you forgot it, I'll remind you: Never upload the node-modules folder! The node-modules folder is a folder that contains all dependencies of a project. It is usually generated over a \`npm install\` command that installs all dependencies for a given project (shoutout to all of us who someday did upload a node-modules folder 😅). This is equivalent to the folder of a Java project using Maven that contains all the dependencies. Imagine uploading that to your Git repository.
      </p>

      <h2 class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">2. .Gitignore file</h2>
      <p class="my-6">
      The most used approach is probably the .gitignore file. It is a file that is located in every local git project. As you can imagine, and given that the file starts with a dot, it is a hidden file.
      </p>

      <p class="my-6">
      Now, it may vary its exact location depending on which IDE you're using. I know for a fact that if you are using IntelliJ Idea it is located inside the \`.idea\` folder.
      </p>

      <p class="my-6">
      Its content will vary but this just so you have an idea of what it looks like, this is the default one for a generated Java project using IntelliJ Idea:
      </p>

      <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-bash"># Default ignored files
/shelf/
/workspace.xml</code></pre>

      <p class="my-6">
      In some other IDEs such as Visual Studio it is usually placed in the same project's main path. If we use \`npm\` we will probably have a structure like this one.
      </p>

      <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-bash"># See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*</code></pre>

      <p class="my-6">
      As you can see, the \`/node_modules\` folder is already added by default to the \`.gitignore\` file.
      </p>

      <p class="my-6">
      How do we make a file not eligible to be added to our git staging area? Well, we can just add its path to this \`.gitignore\` file.
      </p>

      <p class="my-6">
      The pros of using this approach are quite evident. We have a shared file with all the developers in our team, because this file is uploaded to the git repository.
      </p>

      <p class="my-6">
      If we, as a team, want to ignore some files or folders for all of us, the developers, all we have to do is to add those in the \`.gitignore\` file.
      </p>

      <p class="my-6">
      Precisely, because it's a shared file, what if we just want to ignore a private file that won't be uploaded to the repo? We can't do it by adding it to our \`.gitignore\` file.
      </p>

      <p class="my-6">
      But fear no more! Because in those cases we can make use of the following approach.
      </p>

      <h2 class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">3. Global exclude file</h2>
      <p class="my-6">
      There is one file, which path is \`.git/info/excludes\` that its purpose is to ignore private files. This configuration won't be pushed to the repository, therefore it's a private configuration.
      </p>

      <p class="my-6">
      The idea behind this is pretty much the same than the \`.gitignore\` file but it's worth to notice that this file won't be uploaded to the remote repository.
      </p>

      <p class="my-6">
      This approach allows us to untrack some files without sharing this configuration with our team. This is incredibly beneficial for local configuration files, for instance.
      </p>

      <h2 class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">4. Example</h2>
      <p class="my-6">
      With the following project structure
      </p>

      <p class="my-6">Project structure</p>

      <p class="my-6">
      I do have a newly added \`Main.java\` file and a \`local.conf\` file. But let's say I only want to add the \`Main.java\` file to the remote repository.
      </p>

      <p class="my-6">
      Since this \`local.conf\` is my personal and private local configuration that won't be shared with the rest of the developers, I will add it to the \`.git/info/excludes\` file as we explained before.
      </p>

      <p class="my-6">
      Therefore, I will just open the file in a text editor and add it there:
      </p>

      <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-bash"># git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~
local.conf</code></pre>

      <p class="my-6">
      As you can see I just added \`local.conf\` to the file.
      </p>

      <p class="my-6">
      But if we run a git status we will find a surprise! It's still showing as added:
      </p>

      <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-bash">PS D:\\Projects\\git-testing> git status
On branch feature-foo
Your branch is up to date with 'origin/feature-foo'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   local.conf
        new file:   src/main/java/Main.java

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .idea/</code></pre>

      <p class="my-6">
      Have in mind that if the file was previously checked in, we will have to run the following command in order to be removed:
      </p>

      <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-bash">git rm --cached local.conf</code></pre>

      <p class="my-6">
      Note: Sometimes we will have to use the \`-f\` (force) flag.
      </p>

      <p class="my-6">
      If we run \`git status\` again we will see that our \`local.conf\` file has disappeared:
      </p>

      <pre class="my-10 bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-bash">PS D:\\Projects\\git-testing> git status
On branch feature-foo
Your branch is up to date with 'origin/feature-foo'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   src/main/java/Main.java

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .idea/</code></pre>

      <h2 class="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-gray-700">5. Conclusion</h2>
      <p class="my-6">
      Now that you've learned how to ignore files in git, what are you waiting for? Stop wasting your time modifying that local configuration file that we don't want to push to our repo, add it to the \`excludes\` file or talk to your team about adding it to the \`.gitignore\` file.
      </p>

      <p class="my-6">
      I hope you enjoyed this quick post, do you know some other ways to ignore files in Git? Let me know in the comments!
      </p>
    </div>`,
}; 