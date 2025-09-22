import React, { useState, useMemo, useCallback } from "react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  attribution: string;
  photographerUrl: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
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
      className={`px-6 py-3 rounded-full transition-all duration-300 ${
        isActive ? "btn-primary" : "btn-glass"
      }`}
      style={{
        fontSize: "1rem",
        fontWeight: 500,
      }}
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
}>(({ project, index }) => {
  return (
    <div
      className={`project-card card-glass group animate-fade-in ${
        index % 2 === 0 ? "md:mt-0" : "md:mt-12"
      }`}
      style={{
        animationDelay: `${index * 0.2}s`,
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
      }}
    >
      {/* Project Image */}
      <div
        className="relative overflow-hidden mb-6"
        style={{ borderRadius: "var(--radius-lg)" }}
      >
        <img
          src={project.image}
          alt={`${project.title} - ${project.attribution}`}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            width: "100%",
            height: "256px",
          }}
          loading="lazy" // Add lazy loading for better performance
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Project Links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.liveUrl}
            className="p-2 rounded-full glass text-white hover:scale-110 transition-transform"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <ArrowOutwardOutlinedIcon style={{ fontSize: "1.25rem" }} />
          </a>
          <a
            href={project.githubUrl}
            className="p-2 rounded-full glass text-white hover:scale-110 transition-transform"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <LinkOutlinedIcon style={{ fontSize: "1.25rem" }} />
          </a>
        </div>
      </div>

      {/* Project Content */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-heading"
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {project.title}
          </h3>
          <span
            className="text-caption px-3 py-1 rounded-full"
            style={{
              background: "rgba(99, 102, 241, 0.1)",
              color: "var(--primary)",
              fontSize: "0.875rem",
            }}
          >
            {project.category}
          </span>
        </div>

        <p
          className="text-body mb-4"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-caption px-3 py-1 rounded-full"
              style={{
                background: "rgba(6, 182, 212, 0.1)",
                color: "var(--accent)",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {tech}
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
        title: "Analytics Dashboard",
        description:
          "A comprehensive analytics dashboard with real-time data visualization, interactive charts, and customizable widgets for business intelligence.",
        image:
          "https://images.unsplash.com/photo-1486927181919-3ac1fc3a8082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjB3ZWIlMjBhcHBsaWNhdGlvbnxlbnwwfDB8fGJsdWV8MTc1NjY0Njg5MXww&ixlib=rb-4.1.0&q=85",
        attribution: "Luca Bravo on Unsplash",
        photographerUrl: "https://unsplash.com/@lucabravo",
        technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
        category: "Web App",
        liveUrl: "#",
        githubUrl: "#",
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

  return (
    <section
      id="projects"
      className="py-20 relative min-h-screen bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-40 right-20 w-64 h-64 rounded-full animate-float bg-gradient-to-br from-purple-500/5 to-cyan-500/5 dark:from-purple-400/10 dark:to-cyan-400/10 blur-[40px]"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-caption px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-400/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 dark:border-cyan-400/30 backdrop-blur-md mb-4 inline-block">
            💼 My Work
          </span>

          <h2
            className="text-display mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              marginBottom: "var(--spacing-lg)",
            }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <p
            className="text-body max-w-3xl mx-auto"
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
            }}
          >
            A showcase of my recent work, featuring innovative solutions and
            creative approaches to complex challenges across various domains.
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
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
