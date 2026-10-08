import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlogBySlug, BlogPost as BlogPostType } from '../data/blogLoader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Arriving from a project card mid-page would otherwise keep the old scroll.
    window.scrollTo(0, 0);
    if (slug) {
      const foundPost = getBlogBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        // Handle 404 or redirect
        navigate('/blogs');
      }
      setLoading(false);
    }
  }, [slug, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!post) return null;

  return (
    <article className="py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowBackIcon fontSize="small" />
          All writing
        </Link>

        <header className="mb-10">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8 shadow-lg"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 font-sans text-sm">
            <time>{post.date}</time>
            <span>•</span>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="font-sans text-gray-500 dark:text-gray-400">{tag}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="markdown-content max-w-[68ch]">
          <ReactMarkdown
            components={{
              h1: ({ node: _node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-outside pl-5 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-outside pl-5 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />,
              pre: ({ node, children, ...props }: any) => {
                const child = Array.isArray(children) ? children[0] : children;
                const isSnippet =
                  child &&
                  typeof child === 'object' &&
                  'props' in child &&
                  typeof child.props?.className === 'string' &&
                  child.props.className.includes('language-snippet');

                if (isSnippet) {
                  return (
                    <code
                      className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200 inline-flex items-center align-middle whitespace-pre border border-gray-200 dark:border-gray-700 max-w-max"
                    >
                      {child.props.children}
                    </code>
                  );
                }

                return (
                  <pre
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto border border-gray-200 dark:border-gray-700"
                    {...props}
                  >
                    {children}
                  </pre>
                );
              },
              code: ({ node, inline, className, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code
                      className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200 inline-flex items-center align-middle max-w-max whitespace-pre"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              a: ({ node, ...props }) => <a className="text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-400 hover:decoration-gray-900 dark:hover:decoration-white" {...props} />,
              img: ({ node, ...props }) => <img className="rounded-lg shadow-md my-6 max-w-full" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
