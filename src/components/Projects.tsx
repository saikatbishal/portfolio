import React from "react";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  description: string;
  /** One plain sentence on what it achieves, for readers who don't read code. */
  outcome: string;
  image?: string;
  imageAlt?: string;
  /** object-position for the thumbnail crop */
  imagePosition?: string;
  /** Shown in place of an image: a real input/output pair from the tool. */
  codePreview?: { input: string; output: string };
  /** Spans both grid columns, with the media beside the text on md+. */
  wide?: boolean;
  category: string;
  /** In-site route to the working tool. */
  appPath?: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Short, scannable facts shown as chips instead of more description. */
  highlights?: string[];
  /** Slug of the post in src/blog/ that tells this project's story. */
  blogSlug?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Platform",
    description:
      "A phone-first map of every train journey I've taken across India, on a design system sampled from real railway paint.",
    outcome: "Logging a journey takes under 15 seconds, and you don't need an account to try it.",
    highlights: ["13 typed components", "21 guideline pages", "15 product decisions"],
    image: "/project-platform.png",
    imageAlt: "Platform: a map of India with train journeys drawn as coloured lines",
    category: "Personal product · In progress",
    liveUrl: "https://platform.saikatbishal.com",
    githubUrl: "https://github.com/saikatbishal/platform",
    blogSlug: "platform",
  },
  {
    id: 2,
    title: "React Perf Dashboard",
    description:
      "A live overlay for React apps: FPS, memory, Web Vitals and API timings, without leaving the page.",
    outcome: "Shows developers the moment a page gets slow, while they're still looking at it.",
    highlights: ["npm package", "Zero dependencies", "Core Web Vitals"],
    image: "/performance-monitor.png",
    imageAlt: "React Perf Dashboard overlay showing FPS, memory and Web Vitals on a live page",
    imagePosition: "left center",
    category: "npm package",
    liveUrl: "https://www.npmjs.com/package/@saikat786/react-perf-dashboard",
    githubUrl: "https://github.com/saikatbishal/react-perf-dashboard",
    blogSlug: "perf-monitor",
  },
  {
    id: 3,
    title: "CSS to Tailwind",
    description:
      "A browser tool that parses CSS into a syntax tree and maps each declaration to a Tailwind class, with a live preview and the tree alongside.",
    outcome: "Paste CSS and get the Tailwind classes back as you type.",
    highlights: ["AST-based (css-tree)", "Live preview", "Runs in the browser"],
    // Output is what compileCssToTailwind actually returns for this input.
    codePreview: {
      input:
        ".card {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 24px;\n  border-radius: 8px;\n  background-color: #2563eb;\n}",
      output: "flex items-center gap-4 p-6 rounded-md bg-[#2563eb]",
    },
    wide: true,
    category: "Developer tool",
    appPath: "/ast-transpiler",
    githubUrl: "https://github.com/saikatbishal/portfolio/tree/main/src/transpiler",
  },
];

const textLink =
  "font-sans text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white";

const codeLabel = "block font-sans text-xs text-gray-500 dark:text-gray-400 mb-2";

const CodePreview: React.FC<{ input: string; output: string }> = ({ input, output }) => (
  <div className="h-full p-5 bg-gray-50 dark:bg-gray-950 font-mono text-sm leading-relaxed">
    <span className={codeLabel}>CSS</span>
    <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{input}</pre>
    <span className={`${codeLabel} mt-4`}>Tailwind</span>
    <pre className="text-gray-900 dark:text-white whitespace-pre-wrap">{output}</pre>
  </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const blogPath = project.blogSlug ? `/blogs/${project.blogSlug}` : undefined;

  return (
    <article
      className={`project-card flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200 ${
        project.wide ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      {/* The image is a shortcut to the case study; the text links below are the accessible path. */}
      <div
        className={`overflow-hidden border-b border-gray-200 dark:border-gray-800 ${
          project.wide ? "md:w-1/2 md:shrink-0 md:border-b-0 md:border-r" : ""
        }`}
      >
        {project.codePreview ? (
          <CodePreview {...project.codePreview} />
        ) : blogPath ? (
          <Link to={blogPath} tabIndex={-1} aria-hidden="true">
            <img
              src={project.image}
              alt=""
              className="w-full h-56 object-cover"
              style={{ objectPosition: project.imagePosition }}
              loading="lazy"
            />
          </Link>
        ) : (
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-56 object-cover"
            style={{ objectPosition: project.imagePosition }}
            loading="lazy"
          />
        )}
      </div>

      <div className="flex flex-col flex-grow p-5">
        <p className="font-sans text-xs text-gray-500 dark:text-gray-400 mb-2">{project.category}</p>
        <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white leading-tight mb-3">
          {blogPath ? (
            <Link to={blogPath} className="hover:underline underline-offset-4">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        <p className="font-sans text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-2">
          {project.outcome}
        </p>
        <p className="font-sans text-base leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>

        {project.highlights && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="font-sans text-xs px-2 py-1 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
          {blogPath && (
            <Link to={blogPath} className={textLink}>
              Read the case study →
            </Link>
          )}
          {project.appPath && (
            <Link to={project.appPath} className={textLink}>
              Try it →
            </Link>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
              Open live ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
              Code ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects: React.FC = () => (
  <section
    id="projects"
    className="py-20 relative bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
  >
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-12 text-center">
        Selected work
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
