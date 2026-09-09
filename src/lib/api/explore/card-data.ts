export interface TechItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  popularity: number;
}

export const EXPLORE_TECH_ITEMS: TechItem[] = [
  {
    "id": "mongodb",
    "name": "MongoDB",
    "logo": "https://cdn.simpleicons.org/mongodb",
    "category": "Database",
    "summary": "A document-oriented NoSQL database that stores data as flexible JSON-like documents.",
    "description": "MongoDB's schema-less design makes it popular for applications with evolving data models, offering horizontal scaling and a rich query language.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 80
  },
  {
    "id": "expressjs",
    "name": "Express.js",
    "logo": "https://cdn.simpleicons.org/express",
    "category": "Other",
    "summary": "A minimal, unopinionated web framework for Node.js.",
    "description": "Express provides a thin layer of routing and middleware on top of Node.js's HTTP module, making it a common foundation for REST APIs.",
    "tags": ["Medium"],
    "difficulty": "Beginner",
    "popularity": 84
  },
  {
    "id": "react",
    "name": "React",
    "logo": "https://cdn.simpleicons.org/react",
    "category": "Frontend Framework",
    "summary": "A component-based JavaScript library for building user interfaces.",
    "description": "Maintained by Meta, React uses a virtual DOM and a declarative component model, and anchors a massive ecosystem of tools like Next.js and React Native.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 95
  },
  {
    "id": "nodejs",
    "name": "Node.js",
    "logo": "https://cdn.simpleicons.org/nodedotjs",
    "category": "Other",
    "summary": "A JavaScript runtime built on Chrome's V8 engine for server-side apps.",
    "description": "Node.js lets developers run JavaScript outside the browser using a non-blocking, event-driven model, ideal for APIs, real-time apps, and tooling.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 90
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "logo": "https://cdn.simpleicons.org/javascript",
    "category": "Language",
    "summary": "Core scripting language of the web, running in every browser and on servers via Node.js.",
    "description": "JavaScript is a high-level, dynamically-typed language originally built for browsers. It now powers frontend, backend, mobile, and desktop apps through a huge ecosystem of frameworks and tools.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 98
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "logo": "https://cdn.simpleicons.org/typescript",
    "category": "Language",
    "summary": "A statically typed superset of JavaScript that compiles to plain JS.",
    "description": "TypeScript adds optional static typing, interfaces, and modern tooling on top of JavaScript, catching errors at compile time and improving maintainability for large codebases.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 92
  },
  {
    "id": "python",
    "name": "Python",
    "logo": "https://cdn.simpleicons.org/python",
    "category": "Language",
    "summary": "General-purpose language known for readability, widely used in web, data, and AI.",
    "description": "Python's clean syntax and huge library ecosystem make it a top choice for web backends, automation, data science, and machine learning.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 96
  },
  {
    "id": "java",
    "name": "Java",
    "logo": "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
    "category": "Language",
    "summary": "Mature, object-oriented language built for portability with 'write once, run anywhere'.",
    "description": "Java runs on the JVM and is a mainstay for enterprise backends, Android apps, and large-scale distributed systems.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 85
  },
  {
    "id": "go",
    "name": "Go",
    "logo": "https://cdn.simpleicons.org/go",
    "category": "Language",
    "summary": "Compiled, statically typed language from Google built for simplicity and concurrency.",
    "description": "Go emphasizes fast compilation, simple syntax, and built-in support for concurrent programming, making it popular for cloud infrastructure and microservices.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 78
  },
  {
    "id": "rust",
    "name": "Rust",
    "logo": "https://cdn.simpleicons.org/rust",
    "category": "Language",
    "summary": "A systems language focused on memory safety without a garbage collector.",
    "description": "Rust guarantees memory and thread safety at compile time through its ownership model, making it popular for performance-critical and systems-level software.",
    "tags": ["Medium"],
    "difficulty": "Advanced",
    "popularity": 76
  },
  {
    "id": "csharp",
    "name": "C#",
    "logo": "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
    "category": "Language",
    "summary": "A modern, object-oriented language from Microsoft used across web, desktop, and games.",
    "description": "C# powers the .NET ecosystem, ASP.NET web apps, Windows desktop software, and the Unity game engine.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 80
  },
  {
    "id": "vuejs",
    "name": "Vue.js",
    "logo": "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
    "category": "Other",
    "summary": "An approachable, progressive JavaScript framework for building UIs.",
    "description": "Vue combines a gentle learning curve with a powerful component system, reactive data binding, and an official ecosystem covering routing and state management.",
    "tags": ["Medium"],
    "difficulty": "Beginner",
    "popularity": 82
  },
  {
    "id": "angular",
    "name": "Angular",
    "logo": "https://cdn.simpleicons.org/angular",
    "category": "Frontend Framework",
    "summary": "A full-featured, opinionated TypeScript framework for large-scale web apps.",
    "description": "Built by Google, Angular provides a complete platform with dependency injection, routing, forms, and RxJS-based reactivity out of the box.",
    "tags": ["Medium"],
    "difficulty": "Advanced",
    "popularity": 70
  },
  {
    "id": "svelte",
    "name": "Svelte",
    "logo": "https://cdn.simpleicons.org/svelte",
    "category": "Frontend Framework",
    "summary": "A compiler-based framework that shifts work from the browser to build time.",
    "description": "Svelte compiles components into highly optimized vanilla JavaScript at build time, resulting in smaller bundles and less runtime overhead than virtual-DOM frameworks.",
    "tags": ["Low"],
    "difficulty": "Beginner",
    "popularity": 68
  },
  {
    "id": "nextjs",
    "name": "Next.js",
    "logo": "https://cdn.simpleicons.org/nextdotjs",
    "category": "Other",
    "summary": "A React framework for production, with routing, SSR, and SSG built in.",
    "description": "Next.js extends React with file-based routing, server-side rendering, static generation, API routes, and image optimization for full-stack apps.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 88
  },
  {
    "id": "django",
    "name": "Django",
    "logo": "https://cdn.simpleicons.org/django",
    "category": "Backend Framework",
    "summary": "A batteries-included Python web framework for rapid development.",
    "description": "Django follows 'don't repeat yourself' principles and ships with an ORM, admin panel, authentication, and security defaults for building robust web apps fast.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 75
  },
  {
    "id": "flask",
    "name": "Flask",
    "logo": "https://cdn.simpleicons.org/flask",
    "category": "Backend Framework",
    "summary": "A lightweight, flexible Python microframework for web apps and APIs.",
    "description": "Flask gives developers a minimal core with extensions for everything else, making it popular for small services, prototypes, and ML model APIs.",
    "tags": ["Medium"],
    "difficulty": "Beginner",
    "popularity": 72
  },
  {
    "id": "spring-boot",
    "name": "Spring Boot",
    "logo": "https://cdn.simpleicons.org/springboot",
    "category": "Backend Framework",
    "summary": "An opinionated framework that simplifies building production-grade Java apps.",
    "description": "Spring Boot reduces boilerplate for Spring applications with auto-configuration, embedded servers, and a huge ecosystem for enterprise-grade backends.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 79
  },
  {
    "id": "laravel",
    "name": "Laravel",
    "logo": "https://cdn.simpleicons.org/laravel",
    "category": "Backend Framework",
    "summary": "An elegant PHP framework for building modern web applications.",
    "description": "Laravel offers expressive syntax, an ORM (Eloquent), routing, queues, and a rich ecosystem, making PHP development enjoyable and productive.",
    "tags": ["Low"],
    "difficulty": "Intermediate",
    "popularity": 68
  },
  {
    "id": "flutter",
    "name": "Flutter",
    "logo": "https://cdn.simpleicons.org/flutter",
    "category": "Mobile Framework",
    "summary": "Google's UI toolkit for building natively compiled apps from one codebase.",
    "description": "Flutter uses the Dart language and its own rendering engine to build iOS, Android, web, and desktop apps from a single codebase with a rich widget library.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 80
  },
  {
    "id": "react-native",
    "name": "React Native",
    "logo": "https://cdn.simpleicons.org/react",
    "category": "Mobile Framework",
    "summary": "A framework for building native mobile apps using React.",
    "description": "React Native lets developers write mobile apps in JavaScript/TypeScript with React, rendering to native UI components on iOS and Android.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 81
  },
  {
    "id": "swift",
    "name": "Swift",
    "logo": "https://cdn.simpleicons.org/swift",
    "category": "Language",
    "summary": "Apple's modern, safe, and fast language for iOS and macOS development.",
    "description": "Swift replaced Objective-C as Apple's primary language, offering strong type safety, performance, and modern syntax for building apps across Apple platforms.",
    "tags": ["Low"],
    "difficulty": "Intermediate",
    "popularity": 65
  },
  {
    "id": "kotlin",
    "name": "Kotlin",
    "logo": "https://cdn.simpleicons.org/kotlin",
    "category": "Language",
    "summary": "A modern, concise language that's fully interoperable with Java, official for Android.",
    "description": "Kotlin runs on the JVM and is Google's preferred language for Android development, also used for backend and multiplatform projects.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 71
  },
  {
    "id": "postgresql",
    "name": "PostgreSQL",
    "logo": "https://cdn.simpleicons.org/postgresql",
    "category": "Database",
    "summary": "A powerful, open-source object-relational database system.",
    "description": "PostgreSQL is known for standards compliance, extensibility, and advanced features like JSONB, full-text search, and robust transactional integrity.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 87
  },
  {
    "id": "mysql",
    "name": "MySQL",
    "logo": "https://cdn.simpleicons.org/mysql",
    "category": "Database",
    "summary": "One of the world's most popular open-source relational databases.",
    "description": "MySQL is widely used for web applications, valued for its reliability, wide hosting support, and ease of use, and now maintained by Oracle.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 83
  },
  {
    "id": "redis",
    "name": "Redis",
    "logo": "https://cdn.simpleicons.org/redis",
    "category": "Database",
    "summary": "An in-memory data store used as a database, cache, and message broker.",
    "description": "Redis offers extremely fast reads and writes with data structures like strings, hashes, lists, and sets, commonly used for caching and pub/sub messaging.",
    "tags": ["Medium"],
    "difficulty": "Beginner",
    "popularity": 78
  },
  {
    "id": "graphql",
    "name": "GraphQL",
    "logo": "https://cdn.simpleicons.org/graphql",
    "category": "API Technology",
    "summary": "A query language for APIs that lets clients request exactly the data they need.",
    "description": "Developed by Facebook, GraphQL provides a single endpoint with a strongly typed schema, reducing over-fetching and under-fetching common with REST.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 74
  },
  {
    "id": "docker",
    "name": "Docker",
    "logo": "https://cdn.simpleicons.org/docker",
    "category": "DevOps",
    "summary": "A platform for building, shipping, and running applications in containers.",
    "description": "Docker packages applications with their dependencies into portable containers, ensuring consistency across development, testing, and production environments.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 91
  },
  {
    "id": "kubernetes",
    "name": "Kubernetes",
    "logo": "https://cdn.simpleicons.org/kubernetes",
    "category": "DevOps",
    "summary": "An open-source system for automating deployment and scaling of containerized apps.",
    "description": "Originally designed by Google, Kubernetes orchestrates containers across clusters, handling scaling, self-healing, load balancing, and rolling updates.",
    "tags": ["Medium"],
    "difficulty": "Advanced",
    "popularity": 85
  },
  {
    "id": "git",
    "name": "Git",
    "logo": "https://cdn.simpleicons.org/git",
    "category": "Version Control",
    "summary": "A distributed version control system for tracking changes in source code.",
    "description": "Created by Linus Torvalds, Git allows teams to collaborate on codebases with branching, merging, and a full history of changes, underpinning platforms like GitHub.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 97
  },
  {
    "id": "aws",
    "name": "AWS",
    "logo": "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "category": "Cloud Platform",
    "summary": "Amazon's comprehensive cloud computing platform with hundreds of services.",
    "description": "AWS offers compute, storage, databases, machine learning, and networking services on a pay-as-you-go model, and is the largest cloud provider by market share.",
    "tags": ["High"],
    "difficulty": "Advanced",
    "popularity": 89
  },
  {
    "id": "tailwind-css",
    "name": "Tailwind CSS",
    "logo": "https://cdn.simpleicons.org/tailwindcss",
    "category": "CSS Framework",
    "summary": "A utility-first CSS framework for rapidly building custom user interfaces.",
    "description": "Tailwind provides low-level utility classes that let developers build custom designs directly in markup without writing traditional CSS.",
    "tags": ["Low"],
    "difficulty": "Beginner",
    "popularity": 86
  },
  {
    "id": "grpc",
    "name": "gRPC",
    "logo": "https://raw.githubusercontent.com/devicons/devicon/master/icons/grpc/grpc-original.svg",
    "category": "API Technology",
    "summary": "A high-performance, open-source RPC framework using Protocol Buffers.",
    "description": "Developed by Google, gRPC enables fast, strongly typed communication between services, commonly used in microservice architectures.",
    "tags": ["Low"],
    "difficulty": "Advanced",
    "popularity": 62
  }
];