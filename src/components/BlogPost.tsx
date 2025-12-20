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
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-500 mb-8 transition-colors"
        >
          <ArrowBackIcon fontSize="small" />
          Back to Blogs
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
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 font-mono text-sm">
            <time>{post.date}</time>
            <span>•</span>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-blue-500">#{tag}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none markdown-content">
          <ReactMarkdown
            components={{
              h1: ({ node: _node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300" {...props} />,
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />,
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
                      className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-400 inline-flex items-center align-middle whitespace-pre border border-gray-200 dark:border-gray-700 max-w-max"
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
                      className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-400 inline-flex items-center align-middle max-w-max whitespace-pre"
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
              a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
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
