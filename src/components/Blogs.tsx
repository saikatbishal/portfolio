import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, BlogPost } from '../data/blogLoader';
import { useTheme } from '../contexts/ThemeContext';

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const loadedBlogs = getBlogs();
    setBlogs(loadedBlogs);
  }, []);

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold font-sans tracking-tight mb-12 text-gray-900 dark:text-white">
          Writing
        </h1>

        <div className="grid gap-8">
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog.slug}`}
              key={blog.slug}
              className="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200"
            >
              {blog.image && (
                <div className="mb-4 overflow-hidden rounded-lg h-48 w-full">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:underline underline-offset-4">
                  {blog.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-sans mt-2 md:mt-0">
                  {blog.date}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {blog.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-sans border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}

          {blogs.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No blog posts found. Check back soon!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
