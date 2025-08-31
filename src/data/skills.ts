export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "design";
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  achievements: string[];
  gpa?: string;
}


export const education: EducationItem[]= [
  {
    id: 1,
    institution: "National Institute of Technology, Jamshedpur",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Metallurgical and Materials Engineering",
    duration: "2017 - 2021",
    location: "Jamshedpur, India",
    gpa: "7.01",
    achievements: [
      "Majors in Metallurgical and Materials Engineering",
      "Core project: Fuels, Furnaces and Refractories"
    ],
  },
  {
    id: 2,
    institution: "DAV Bistupur, Jamshedpur",
    degree: "Higher Secondary (12th)",
    field: "Pure Science with Computer Applications",
    duration: "2014 - 2016",
    location: "Jamshedpur, India",
    achievements: [
      "Secured 83% aggregate in CBSE Board Exams",
      "Scored 92% in Computer Applications"
    ],
  },
  {
    id: 3,
    institution: "Sri Krishna Public School",
    degree: "Matriculation (10th)",
    field: "General Education",
    duration: "2002 - 2014",
    location: "Jamshedpur, India",
    achievements: [
      "Secured 87.8% aggregate in matriculation boards",
      "Scored 95% in Computer Applications"
    ],
  }
];

export const skills: Skill[]= [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Redux", level: 85, category: "frontend" },
  { name: "Redux Toolkit", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "frontend" },
  { name: "Styled Components", level: 75, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "CSS3", level: 90, category: "frontend" },
  { name: "HTML5", level: 95, category: "frontend" },

  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "NestJS", level: 85, category: "backend" },
  { name: "RESTful APIs", level: 90, category: "backend" },
  { name: "GraphQL", level: 70, category: "backend" },

  // Tools
  { name: "Docker", level: 85, category: "tools" },
  { name: "PM2", level: 80, category: "tools" },
  { name: "RabbitMQ", level: 75, category: "tools" },
  { name: "AWS Lambda", level: 80, category: "tools" },
  { name: "API Gateway", level: 75, category: "tools" },
  { name: "DynamoDB", level: 75, category: "tools" },
  { name: "AWS S3", level: 75, category: "tools" },
  { name: "ELK Stack", level: 75, category: "tools" },
  { name: "Keycloak", level: 70, category: "tools" },
  { name: "Git", level: 90, category: "tools" },

  // Design
  { name: "UI/UX Design", level: 65, category: "design" },
  { name: "Component Libraries", level: 70, category: "design" }
];

