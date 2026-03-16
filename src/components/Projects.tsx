import React, { useState, useMemo, useCallback } from "react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import sumipImage from "../../public/sumip.png";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  attribution: string;
  photographerUrl?: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  videoUrl?: string;
}

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = React.memo<{
  project: Project;
  index: number;
  onVideoClick: (videoUrl: string) => void;
}>(({ project, index, onVideoClick }) => {
  return (
    <div
      className={`project-card group animate-fade-in flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-0 hover:border-[#39ff14] dark:hover:border-[#39ff14] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <img
          src={project.image}
          alt={`${project.title} - ${project.attribution}`}
          className="w-full h-56 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />

        {/* Overlay with Links - Centered for modern look */}
        <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          {project.videoUrl && (
            <button
              onClick={() => onVideoClick(project.videoUrl!)}
              className="p-2 bg-white text-gray-900 hover:bg-gray-200 transition-all hover:scale-110 duration-200"
              title="Watch Demo"
            >
              <PlayCircleOutlineIcon style={{ fontSize: "1.5rem" }} />
            </button>
          )}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white text-gray-900 hover:bg-gray-200 transition-all hover:scale-110 duration-200"
            title="View Live"
          >
            <ArrowOutwardOutlinedIcon style={{ fontSize: "1.5rem" }} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white text-gray-900 hover:bg-gray-200 transition-all hover:scale-110 duration-200"
            title="View Code"
          >
            <LinkOutlinedIcon style={{ fontSize: "1.5rem" }} />
          </a>
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

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-sans">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              #{tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

const Projects: React.FC = () => {
  useGSAPAnimations();
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

  // Move projects data outside component or memoize to prevent recreation on every render
  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "Sumip",
        description:
          "A vibrant party planner website showcasing modern UI design with interactive components, smooth animations, and playful interactions. A frontend showcase of contemporary web design trends.",
        image: sumipImage,
        attribution: "Sumip Party Planner",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Next.js",
        ],
        category: "Web App",
        liveUrl: "https://sumip-frontend.vercel.app/",
        githubUrl: "https://github.com/saikatbishal/sumip-frontend",
      },
      {
        id: 2,
        title: "React Performance Dashboard",
        description:
          "A lightweight npm package that provides a real-time performance dashboard for React applications. It tracks FPS, API request/response times, and status codes to help developers optimize their apps.",
        image:
          "/image.png",
        attribution: "Saikat Bishal",
        photographerUrl: "/perfmonitor.png",
        technologies: ["React", "TypeScript", "NPM", "Performance"],
        category: "Web App",
        liveUrl: "https://www.npmjs.com/package/@saikat786/react-perf-dashboard",
        githubUrl: "https://github.com/saikatbishal/react-perf-dashboard",
      },
    ],
    []
  );

  // Video modal handlers
  const handleVideoClick = useCallback((videoUrl: string) => {
    setVideoModalUrl(videoUrl);
  }, []);

  const handleCloseModal = useCallback(() => {
    setVideoModalUrl(null);
  }, []);

  return (
    <section
      id="projects"
      className="py-20 relative min-h-screen bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-4 inline-block">
            // digital_artifacts
          </span>

          <h2
            className="font-sans text-gray-900 dark:text-white mb-6 tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
            }}
          >
            Proof of Concept
          </h2>

          <p
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            style={{
              fontSize: "1.125rem",
            }}
          >
            Proof of concepts turned into reality. A gallery of logic and design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {videoModalUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <CloseIcon style={{ fontSize: "2rem" }} />
            </button>
            <div
              className="relative w-full bg-black rounded-lg overflow-hidden border border-gray-800"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoModalUrl}
                title="Project video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
