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
        <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white border-b-4 border-blue-500 inline-block pb-2">
          Blog Posts
        </h2>
        
        <div className="grid gap-8">
          {blogs.map((blog) => (
            <Link 
              to={`/blogs/${blog.slug}`} 
              key={blog.slug}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {blog.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-2 md:mt-0">
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
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
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
