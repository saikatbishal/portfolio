import React, { useState, useMemo, useCallback } from "react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ledgerflow from "../../public/ledgerflow.png";
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

// Memoized filter button component to prevent unnecessary re-renders
const FilterButton = React.memo<{
  category: string;
  isActive: boolean;
  onClick: (category: string) => void;
}>(({ category, isActive, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(category);
  }, [category, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-sm font-mono border transition-all duration-300 ${isActive
          ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white"
          : "bg-transparent text-gray-600 border-gray-200 hover:border-gray-400 dark:text-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
        }`}
    >
      {category}
    </button>
  );
});

FilterButton.displayName = "FilterButton";

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = React.memo<{
  project: Project;
  index: number;
  onVideoClick: (videoUrl: string) => void;
}>(({ project, index, onVideoClick }) => {
  return (
    <div
      className={`project-card group animate-fade-in flex flex-col h-full ${index % 2 === 0 ? "md:mt-0" : "md:mt-12"
        } bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-0 hover:border-gray-900 dark:hover:border-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
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
          <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white leading-tight">
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

  // Memoize categories to prevent recreation on every render
  const categories = useMemo(
    () => ["All", "Web App", "Mobile App", "UI/UX"],
    []
  );

  // Move projects data outside component or memoize to prevent recreation on every render
  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "Ledgerflow",
        description:
          "A comprehensive financial management platform with real-time tracking, interactive dashboards, and powerful analytics for business intelligence.",
        image: ledgerflow,
        attribution: "Ledgerflow Screenshot",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
        ],

        category: "UI/UX",
        liveUrl: "https://folio-one-brown.vercel.app",
        githubUrl: "#",
        videoUrl: "https://www.loom.com/embed/c6a640fe96a9428f9ab49bac36315d86",
      },
      {
        id: 2,
        title: "Mobile Banking App",
        description:
          "Secure mobile banking application with biometric authentication, transaction history, and seamless money transfer capabilities.",
        image:
          "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxtb2JpbGUlMjBhcHAlMjBzbWFydHBob25lJTIwZGVzaWdufGVufDB8MXx8cHVycGxlfDE3NTY2NDY4OTF8MA&ixlib=rb-4.1.0&q=85",
        attribution: "Daniel Korpai on Unsplash",
        photographerUrl: "https://unsplash.com/@danielkorpai",
        technologies: ["React Native", "Firebase", "Redux", "Stripe API"],
        category: "Mobile App",
        liveUrl: "#",
        githubUrl: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "E-commerce Platform",
        description:
          "Full-featured e-commerce platform with inventory management, payment processing, and advanced search functionality.",
        image:
          "https://images.unsplash.com/photo-1629363447922-1f421b470828?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wJTIwc2hvcHBpbmd8ZW58MHwwfHxncmVlbnwxNzU2NjQ2ODkxfDA&ixlib=rb-4.1.0&q=85",
        attribution: "Tim Schmidbauer on Unsplash",
        photographerUrl: "https://unsplash.com/@timschmidbauer",
        technologies: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
        category: "Web App",
        liveUrl: "#",
        githubUrl: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Task Management Tool",
        description:
          "Collaborative task management application with real-time updates, team collaboration features, and project tracking.",
        image:
          "https://images.unsplash.com/photo-1659035260002-11d486d6e9f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjB3ZWIlMjBhcHBsaWNhdGlvbnxlbnwwfDB8fGJsdWV8MTc1NjY0Njg5MXww&ixlib=rb-4.1.0&q=85",
        attribution: "2H Media on Unsplash",
        photographerUrl: "https://unsplash.com/@2hmedia",
        technologies: ["Vue.js", "Express.js", "Socket.io", "MySQL"],
        category: "Web App",
        liveUrl: "#",
        githubUrl: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
    []
  );

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  // Memoize the filter handler to prevent unnecessary re-renders of FilterButton components
  const handleFilterChange = useCallback(
    (category: string) => {
      if (category !== activeFilter) {
        setActiveFilter(category);
      }
    },
    [activeFilter]
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
            // portfolio
          </span>

          <h2
            className="font-sans text-gray-900 dark:text-white mb-6 tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
            }}
          >
            Featured Projects
          </h2>

          <p
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            style={{
              fontSize: "1.125rem",
            }}
          >
            A selection of recent work demonstrating full-stack capabilities and attention to detail.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <FilterButton
              key={category}
              category={category}
              isActive={activeFilter === category}
              onClick={handleFilterChange}
            />
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
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
