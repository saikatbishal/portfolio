import frontMatter from "front-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

export const getBlogs = (): BlogPost[] => {
  const modules = import.meta.glob("/src/blog/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const blogs = Object.entries(modules).map(([path, content]) => {
    const slug = path.split("/").pop()?.replace(".md", "") || "";
    // content is unknown, cast to string
    const { attributes, body } = frontMatter<any>(content as string);

    return {
      slug,
      title: attributes.title || "Untitled",
      date: attributes.date || "",
      description: attributes.description || "",
      tags: attributes.tags || [],
      content: body,
    };
  });

  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.slug === slug);
};
