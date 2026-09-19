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
  services: string[];
}
export const EXPLORE_TECH_ITEMS: TechItem[] = [
  {
    id: "html5",
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Frontend",
    summary: "The standard markup language for creating and structuring web pages.",
    description:
      "HTML provides the semantic structure of web applications and works as the foundation for modern frontend development.",
    tags: ["HTML5", "Semantic HTML", "Accessibility", "SEO", "Forms"],
    difficulty: "Beginner",
    popularity: 98,
    services: [
      "Semantic HTML & Document Structure",
      "Forms, Validation & Input Handling",
      "Accessibility & ARIA",
      "SEO & Metadata",
      "Images, Video & Modern HTML APIs",
    ],
  },

  {
    id: "css3",
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Frontend",
    summary: "A stylesheet language used to design, style, and create responsive user interfaces.",
    description:
      "CSS controls the visual presentation, layout, responsiveness, animations, and overall user experience of web applications.",
    tags: ["CSS3", "Flexbox", "Grid", "Responsive Design", "Animations"],
    difficulty: "Beginner",
    popularity: 97,
    services: [
      "Flexbox & CSS Grid Layout",
      "Responsive Design & Media Queries",
      "Box Model, Specificity & Cascade",
      "Animations, Transitions & Transforms",
      "Positioning, Stacking & Z-Index",
    ],
  },

  {
    id: "tailwind-css",
    name: "Tailwind",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "Frontend",
    summary: "A utility-first CSS framework for rapidly building modern responsive interfaces.",
    description:
      "Tailwind CSS provides composable utility classes for building consistent, responsive, and customizable user interfaces.",
    tags: ["Tailwind CSS", "Utility First", "Responsive", "Dark Mode", "UI"],
    difficulty: "Beginner",
    popularity: 94,
    services: [
      "Utility-First CSS Workflow",
      "Responsive Design & Breakpoints",
      "Custom Themes & Design Tokens",
      "Dark Mode & State Variants",
      "Reusable Component Styling",
    ],
  },

  {
    id: "javascript",
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Frontend",
    summary: "A programming language that powers interactive and dynamic web applications.",
    description:
      "JavaScript is the core programming language of the web and enables dynamic interfaces, asynchronous operations, APIs, and application logic.",
    tags: ["JavaScript", "ES6+", "Async", "DOM", "Web APIs"],
    difficulty: "Intermediate",
    popularity: 99,
    services: [
      "Event Loop & Asynchronous JavaScript",
      "Closures, Scope, Prototypes & this",
      "Promises, Async/Await & Error Handling",
      "Debouncing, Throttling & Performance",
      "Memory Management & Garbage Collection",
    ],
  },

  {
    id: "typescript",
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Frontend",
    summary: "A strongly typed superset of JavaScript for building scalable applications.",
    description:
      "TypeScript adds static typing and powerful developer tooling to JavaScript, helping teams build safer and more maintainable applications.",
    tags: ["TypeScript", "Types", "Generics", "Interfaces", "Type Safety"],
    difficulty: "Intermediate",
    popularity: 96,
    services: [
      "Type Inference & Structural Typing",
      "Generics & Reusable Types",
      "Union Types & Type Narrowing",
      "Utility Types & Advanced Type Manipulation",
      "any, unknown, never & Type Safety",
    ],
  },

  {
    id: "react",
    name: "React.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
    summary: "A component-based JavaScript library for building modern user interfaces.",
    description:
      "React enables developers to build reusable component-driven interfaces with efficient rendering and predictable state management.",
    tags: ["React", "Components", "Hooks", "State", "Virtual DOM"],
    difficulty: "Intermediate",
    popularity: 99,
    services: [
      "Components, Props & State",
      "Hooks & Component Lifecycle",
      "Virtual DOM & Reconciliation",
      "Memoization & Rendering Performance",
      "Context, Custom Hooks & State Management",
    ],
  },

  {
    id: "nextjs",
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
    summary: "A React framework for building production-ready full-stack web applications.",
    description:
      "Next.js extends React with routing, server rendering, data fetching, caching, optimization, and full-stack application capabilities.",
    tags: ["Next.js", "React", "SSR", "App Router", "Full Stack"],
    difficulty: "Advanced",
    popularity: 97,
    services: [
      "Server & Client Components",
      "App Router, Layouts & Dynamic Routes",
      "SSR, SSG & ISR",
      "Data Fetching, Caching & Revalidation",
      "Performance, Images & Metadata Optimization",
    ],
  },

  {
    id: "nodejs",
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
    summary: "A JavaScript runtime for building scalable server-side applications.",
    description:
      "Node.js enables JavaScript to run on the server and is widely used for APIs, real-time applications, and backend services.",
    tags: ["Node.js", "Backend", "Event Loop", "APIs", "Async"],
    difficulty: "Intermediate",
    popularity: 96,
    services: [
      "Event Loop & Event-Driven Architecture",
      "Async Programming & Non-Blocking I/O",
      "Streams, Buffers & Backpressure",
      "Libuv & Thread Pool",
      "Memory Management & Performance",
    ],
  },

  {
    id: "expressjs",
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "Backend",
    summary: "A lightweight Node.js framework for building APIs and web servers.",
    description:
      "Express provides routing, middleware, request handling, and other building blocks for developing Node.js backend applications.",
    tags: ["Express", "Node.js", "REST API", "Middleware", "Backend"],
    difficulty: "Intermediate",
    popularity: 94,
    services: [
      "Routing & Middleware",
      "REST API Design & HTTP Methods",
      "Error Handling & Validation",
      "Authentication & Authorization",
      "API Security & Rate Limiting",
    ],
  },

  {
    id: "mongodb",
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Database",
    summary: "A document-oriented NoSQL database designed for flexible and scalable applications.",
    description:
      "MongoDB stores data as flexible BSON documents and provides powerful querying, indexing, aggregation, and scalability features.",
    tags: ["MongoDB", "NoSQL", "Database", "Aggregation", "Indexes"],
    difficulty: "Intermediate",
    popularity: 95,
    services: [
      "Documents, Collections & BSON",
      "CRUD Operations & Query Methods",
      "Indexes & Query Performance",
      "Aggregation Pipelines",
      "Transactions, Replication & Scaling",
    ],
  },

  {
    id: "postgresql",
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "Database",
    summary: "A powerful open-source relational database known for reliability and advanced SQL capabilities.",
    description:
      "PostgreSQL provides strong consistency, relational modeling, advanced SQL features, indexing, and powerful query optimization.",
    tags: ["PostgreSQL", "SQL", "Relational", "ACID", "Database"],
    difficulty: "Advanced",
    popularity: 94,
    services: [
      "ACID Transactions & Isolation Levels",
      "JOINs, Subqueries & CTEs",
      "Indexes & Query Optimization",
      "MVCC & Concurrency",
      "EXPLAIN ANALYZE & Performance Tuning",
    ],
  },

  {
    id: "prisma",
    name: "Prisma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    category: "Database",
    summary: "A modern type-safe ORM for working with databases in TypeScript applications.",
    description:
      "Prisma provides a type-safe database client, schema management, migrations, and developer-friendly database workflows.",
    tags: ["Prisma", "ORM", "TypeScript", "Database", "SQL"],
    difficulty: "Intermediate",
    popularity: 91,
    services: [
      "Prisma Schema & Data Modeling",
      "Migrations & Database Management",
      "Type-Safe CRUD Operations",
      "Relations, Filtering & Pagination",
      "Query Optimization & N+1 Problems",
    ],
  },

  {
    id: "mongoose",
    name: "Mongoose",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg",
    category: "Database",
    summary: "An ODM library that provides schema-based data modeling for MongoDB and Node.js.",
    description:
      "Mongoose adds schemas, validation, middleware, relationships, and convenient data modeling capabilities to MongoDB applications.",
    tags: ["Mongoose", "MongoDB", "ODM", "Schemas", "Node.js"],
    difficulty: "Intermediate",
    popularity: 90,
    services: [
      "Schemas, Models & Validation",
      "CRUD Operations & Query Building",
      "Middleware & Lifecycle Hooks",
      "Population & Document Relationships",
      "Virtuals, Methods & Custom Validators",
    ],
  },

  {
    id: "git-github",
    name: "Git & GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools",
    summary: "Version control and collaboration tools for managing source code and development workflows.",
    description:
      "Git and GitHub enable developers to track changes, collaborate on code, manage branches, review pull requests, and automate workflows.",
    tags: ["Git", "GitHub", "Version Control", "GitHub Actions", "Collaboration"],
    difficulty: "Beginner",
    popularity: 99,
    services: [
      "Branching, Merging & Rebasing",
      "Conflict Resolution & Recovery",
      "Cherry-Pick & Interactive Rebase",
      "Pull Requests & Code Reviews",
      "GitHub Actions & Repository Workflows",
    ],
  },

  {
    id: "docker",
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "DevOps",
    summary: "A containerization platform for packaging and running applications consistently across environments.",
    description:
      "Docker packages applications with their dependencies into portable containers, simplifying development, testing, and deployment.",
    tags: ["Docker", "Containers", "DevOps", "CI/CD", "Deployment"],
    difficulty: "Intermediate",
    popularity: 92,
    services: [
      "Dockerfiles & Image Building",
      "Containers & Container Lifecycle",
      "Docker Compose & Multi-Container Apps",
      "Volumes & Container Networking",
      "Multi-Stage Builds & CI/CD",
    ],
  },
];