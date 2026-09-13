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
    "id": "html5",
    "name": "HTML",
    "logo": "https://cdn.simpleicons.org/html5",
    "category": "Language",
    "summary": "The standard markup language for documents designed to be displayed in a web browser.",
    "description": "HTML (HyperText Markup Language) structures the content of web pages using elements such as headings, paragraphs, links, and embedded media.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 99
  },
  {
    "id": "css3",
    "name": "CSS",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    "category": "Styling",
    "summary": "Style sheet language used for describing the presentation of a document written in HTML.",
    "description": "CSS controls layout, colors, fonts, and overall visual appearance, supporting responsive web design across multiple device screen sizes.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 97
  },
  {
    "id": "tailwind-css",
    "name": "Tailwind",
    "logo": "https://cdn.simpleicons.org/tailwindcss",
    "category": "CSS Framework",
    "summary": "A utility-first CSS framework for rapidly building custom user interfaces.",
    "description": "Tailwind provides low-level utility classes that let developers build custom designs directly in markup without writing traditional CSS.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 86
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
    "id": "react",
    "name": "React.js",
    "logo": "https://cdn.simpleicons.org/react",
    "category": "Frontend Framework",
    "summary": "A component-based JavaScript library for building user interfaces.",
    "description": "Maintained by Meta, React uses a virtual DOM and a declarative component model, and anchors a massive ecosystem of tools like Next.js and React Native.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 95
  },
  {
    "id": "nextjs",
    "name": "Next.js",
    "logo": "https://cdn.simpleicons.org/nextdotjs",
    "category": "Frontend Framework",
    "summary": "A React framework for production, with routing, SSR, and SSG built in.",
    "description": "Next.js extends React with file-based routing, server-side rendering, static generation, API routes, and image optimization for full-stack apps.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 88
  },
  {
    "id": "nodejs",
    "name": "Node.js",
    "logo": "https://cdn.simpleicons.org/nodedotjs",
    "category": "Backend Framework",
    "summary": "A JavaScript runtime built on Chrome's V8 engine for server-side apps.",
    "description": "Node.js lets developers run JavaScript outside the browser using a non-blocking, event-driven model, ideal for APIs, real-time apps, and tooling.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 90
  },
  {
    "id": "expressjs",
    "name": "Express.js",
    "logo": "https://cdn.simpleicons.org/express",
    "category": "Backend Framework",
    "summary": "A minimal, unopinionated web framework for Node.js.",
    "description": "Express provides a thin layer of routing and middleware on top of Node.js's HTTP module, making it a common foundation for REST APIs.",
    "tags": ["Medium"],
    "difficulty": "Beginner",
    "popularity": 84
  },
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
    "id": "prisma",
    "name": "Prisma",
    "logo": "https://cdn.simpleicons.org/prisma",
    "category": "Database",
    "summary": "Next-generation Node.js and TypeScript ORM.",
    "description": "Prisma unlocks type safety and autocompletion for database queries with an intuitive schema definition language and automated migrations.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 82
  },
  {
    "id": "mongoose",
    "name": "Mongoose",
    "logo": "https://cdn.simpleicons.org/mongoose",
    "category": "Database",
    "summary": "Elegant MongoDB object modeling for Node.js applications.",
    "description": "Mongoose sits on top of the MongoDB driver, providing schema definitions, built-in validation, middleware hooks, and a query API that makes working with MongoDB from Node.js more structured.",
    "tags": ["Medium"],
    "difficulty": "Intermediate",
    "popularity": 78
  },
  {
    "id": "git-github",
    "name": "Git & GitHub",
    "logo": "https://cdn.simpleicons.org/git",
    "category": "DevOps",
    "summary": "Distributed version control paired with the world's leading Git hosting and collaboration platform.",
    "description": "Git tracks changes to source code through commits, branches, and merges, while GitHub adds remote hosting, pull requests, code review, issues, and CI/CD via Actions on top of it.",
    "tags": ["High"],
    "difficulty": "Beginner",
    "popularity": 96
  },
  {
    "id": "docker",
    "name": "Docker",
    "logo": "https://cdn.simpleicons.org/docker",
    "category": "DevOps",
    "summary": "Platform for building, shipping, and running applications inside lightweight containers.",
    "description": "Docker packages an application with its dependencies into a portable container image, ensuring consistent behavior across development, testing, and production environments via Dockerfiles and Docker Compose.",
    "tags": ["High"],
    "difficulty": "Intermediate",
    "popularity": 89
  }
];