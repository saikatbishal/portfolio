interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  type: 'work' | 'freelance';
}

  export const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: 'Ramco Systems',
    position: 'Software Developer',
    duration: 'Feb 2024 - Present',
    location: 'India',
    description: [
      'Engineered and deployed an API Proxy application for Machine Learning APIs, implementing asynchronous request/response handling and persistent logging of API interactions to facilitate continuous model training.',
      'Architected the system for scalability and reliability using Docker containerization, process management with PM2, and message queuing with RabbitMQ.',
      'Integrated ELK (Elasticsearch, Logstash, Kibana) stack for centralized logging, monitoring, and real-time analytics of API traffic and system events.',
      'Developed and maintained a reusable Component Library for Ramco\'s Nebula systems, enabling rapid development of frontend applications across the organization.',
      'Collaborated with design and component library teams to deliver modular UI building blocks in React and Next.js, supporting Ramco’s ERP, HRP, and Aviation platforms.'
    ],
    technologies: ['React', 'Next.js', 'Docker', 'PM2', 'RabbitMQ', 'ELK Stack', 'Redux'],
    type: 'work'
  },
  {
    id: 2,
    company: 'Rezolve.ai',
    position: 'Full Stack Developer',
    duration: 'May 2023 - Jan 2024',
    location: 'India',
    description: [
      'Developed a large-scale, production-grade ChatBot application utilizing React, NestJS, and Tailwind CSS, with robust state management via Redux and Redux Saga.',
      'Integrated Keycloak for authentication and authorization, and implemented dynamic data fetching and rendering through RESTful API integrations.',
      'Led the development of a complex bot configuration and management interface, optimizing for user experience and maintainability.',
      'Conducted code reviews to ensure adherence to best practices and maintain high code quality standards.',
      'Created a highly complex and intuitive bot Configuration and Management application with great User Experience.'
    ],
    technologies: ['React', 'NestJS', 'Tailwind CSS', 'Redux', 'Redux Saga', 'Keycloak'],
    type: 'work'
  },
  {
    id: 3,
    company: 'LTIMindtree (formerly Larsen and Toubro Infotech)',
    position: 'Software Engineer',
    duration: 'Jul 2021 - May 2023',
    location: 'India',
    description: [
      'Designed and implemented scalable backend architectures using Node.js and Express, significantly reducing server response times by 25%.',
      'Led end-to-end application development, including requirements analysis, system design, and cross-functional collaboration.',
      'Developed analytics-driven data models and managed data transformation initiatives in partnership with data engineering teams.',
      'Deployed serverless solutions leveraging AWS Lambda, API Gateway, and DynamoDB, achieving cost-effective scalability and seamless AWS service integration.',
      'Utilized AWS S3 for efficient storage and retrieval of large datasets, enhancing overall system performance.'
    ],
    technologies: ['Node.js', 'Express.js', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'AWS S3'],
    type: 'work'
  },
];
