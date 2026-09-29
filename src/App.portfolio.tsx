import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import './index.css';

// Lazy load components - Critical path optimization
const Games = React.lazy(() => import('./components/Games'));
const PerfDashboard = React.lazy(() =>
  import('@saikat786/react-perf-dashboard').then((m) => ({ default: m.PerfDashboard }))
);
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const Blogs = React.lazy(() => import('./components/Blogs'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));
const AstTranspiler = React.lazy(() => import('./components/AstTranspiler'));

// Optimized loading component for critical path
const MinimalLoader = () => (
  <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
);

// Home page component with all portfolio content
const Home = () => (
  <main>
      <Hero />
      <About />
      <Suspense fallback={<MinimalLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<MinimalLoader />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<MinimalLoader />}>
        <Education />
      </Suspense>
      <Suspense fallback={<MinimalLoader />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<MinimalLoader />}>
        <Footer />
      </Suspense>
    </main>
);

// Loading component wrapper
const AppContent = () => {
  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300 relative flex justify-center">
      {/* Full-height stylized borders - positioned outside content */}
      <div className="fixed opacity-20 top-0 h-screen w-10 border-r border-r-gray-300 dark:border-r-gray-200 bg-[image:repeating-linear-gradient(315deg,_currentColor_0,_currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-md:w-6 pointer-events-none z-10" style={{ left: "calc(50% - min(40vw, 500px) - 40px)" }}></div>
      <div className="fixed opacity-20 top-0 h-screen w-10 border-l border-l-gray-300 dark:border-l-gray-200 bg-[image:repeating-linear-gradient(315deg,_currentColor_0,_currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-md:w-6 pointer-events-none z-10" style={{ right: "calc(50% - min(40vw,500px) - 40px)" }}></div>
      <div className="App relative min-h-screen" style={{ maxWidth: "min(80vw, 1000px)" }}>
        <div className="relative z-10">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={
              <Suspense fallback={<MinimalLoader />}>
                <Games />
              </Suspense>
            } />
            <Route path="/blogs" element={
              <Suspense fallback={<MinimalLoader />}>
                <Blogs />
              </Suspense>
            } />
            <Route path="/blogs/:slug" element={
              <Suspense fallback={<MinimalLoader />}>
                <BlogPost />
              </Suspense>
            } />
            <Route path="/ast-transpiler" element={
              <Suspense fallback={<MinimalLoader />}>
                <AstTranspiler />
              </Suspense>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showPerfMonitor, setShowPerfMonitor] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);

      // Windows/Linux: Ctrl+Shift+D
      // Mac: Cmd+Shift+D
      const keyLower = e.key.toLowerCase();
      const isValidShortcut = (isMac ? e.metaKey : e.ctrlKey) && e.shiftKey && keyLower === 'd';

      if (isValidShortcut) {
        e.preventDefault();
        setShowPerfMonitor(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      {showPerfMonitor && (
        <Suspense fallback={null}>
          <PerfDashboard />
        </Suspense>
      )}

      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;