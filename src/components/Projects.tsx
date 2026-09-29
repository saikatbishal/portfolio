import React, { useMemo } from "react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useNavigate } from "react-router-dom";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  attribution: string;
  photographerUrl?: string;
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Short, scannable facts shown as chips instead of more description. */
  highlights?: string[];
  /** Slug of the post in src/blog/ that tells this project's story. */
  blogSlug?: string;
}

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = React.memo<{
  project: Project;
  index: number;
}>(({ project, index }) => {
  const navigate = useNavigate();
  const blogPath = project.blogSlug ? `/blogs/${project.blogSlug}` : undefined;

  const openBlog = () => {
    if (blogPath) navigate(blogPath);
  };

  // The overlay links (live, code) keep their own behaviour and must
  // not also open the blog post.
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div
      onClick={openBlog}
      onKeyDown={(e) => {
        if (blogPath && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          openBlog();
        }
      }}
      role={blogPath ? "link" : undefined}
      tabIndex={blogPath ? 0 : undefined}
      aria-label={blogPath ? `Read the story behind ${project.title}` : undefined}
      className={`project-card group ${blogPath ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] dark:focus-visible:ring-[#39ff14]" : ""} animate-fade-in flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-0 hover:border-[#39ff14] dark:hover:border-[#39ff14] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <img
          src={project.image}
          alt={`${project.title} - ${project.attribution}`}
          className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />

        {/* Overlay with Links - Centered for modern look */}
        <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            onKeyDown={stop}
            className="p-2 bg-white text-gray-900 hover:bg-gray-200 transition-all hover:scale-110 duration-200"
            title="View Live"
          >
            <ArrowOutwardOutlinedIcon style={{ fontSize: "1.5rem" }} />
          </a>
          )}
          {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            onKeyDown={stop}
            className="p-2 bg-white text-gray-900 hover:bg-gray-200 transition-all hover:scale-110 duration-200"
            title="View Code"
          >
            <LinkOutlinedIcon style={{ fontSize: "1.5rem" }} />
          </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white group-hover:text-[#16a34a] dark:group-hover:text-[#39ff14] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <span className="text-xs font-mono px-2 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 font-sans">
          {project.description}
        </p>

        {project.highlights && (
          <ul className="flex flex-wrap gap-2 mb-4">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="text-xs font-sans font-medium px-2 py-1 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        {blogPath && (
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 group-hover:text-[#16a34a] dark:group-hover:text-[#39ff14] transition-colors duration-300 mb-4">
            Read the story →
          </span>
        )}
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Projects: React.FC = () => {
  useGSAPAnimations();
  // Move projects data outside component or memoize to prevent recreation on every render
  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "Platform",
        description:
          "A phone-first map of every train journey I've taken across India, on a design system sampled from real railway paint.",
        highlights: ["13 typed components", "21 guideline pages", "15 product decisions"],
        image: "/project-platform.png",
        attribution: "Platform rail journey map",
        category: "Product + DS",
        liveUrl: "https://www.saikatbishal.com/platform",
        githubUrl: "https://github.com/saikatbishal/platform",
        blogSlug: "platform",
      },
      {
        id: 2,
        title: "React Performance Dashboard",
        description:
          "A live overlay for React apps: FPS, memory and API timings, without leaving the page.",
        highlights: ["npm package", "Zero dependencies", "Core Web Vitals"],
        image:
          "/image.png",
        attribution: "Saikat Bishal",
        photographerUrl: "/perfmonitor.png",
        category: "Web App",
        liveUrl: "https://www.npmjs.com/package/@saikat786/react-perf-dashboard",
        githubUrl: "https://github.com/saikatbishal/react-perf-dashboard",
        blogSlug: "perf-monitor",
      },
    ],
    []
  );

  return (
    <section
      id="projects"
      className="py-20 relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="font-sans text-gray-900 dark:text-white mb-6 tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
            }}
          >
            Selected Work
          </h2>

        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;
