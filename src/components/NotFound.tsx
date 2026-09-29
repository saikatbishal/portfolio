import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <main className="min-h-[70vh] flex items-center justify-center px-6 pt-24 bg-white dark:bg-gray-950">
    <div className="text-center max-w-md">
      <p className="font-sans text-sm text-gray-500 dark:text-gray-400">404</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold font-sans tracking-tight text-gray-900 dark:text-white">
        This page doesn't exist
      </h1>
      <p className="mt-4 font-sans text-gray-600 dark:text-gray-400">
        The link may be old or mistyped. Here's where to go instead:
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="btn btn-primary">Go to the home page</Link>
        <Link to="/blogs" className="btn btn-secondary">Read my writing</Link>
      </div>
    </div>
  </main>
);

export default NotFound;
