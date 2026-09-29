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
    duration: "2017 – 2021",
    location: "Jamshedpur, India",
    gpa: "7.01",
    achievements: [
      "Majors in Metallurgical and Materials Engineering",
      "Core project: Fuels, Furnaces and Refractories"
    ],
  },
];
