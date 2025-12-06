import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from "./contexts/ThemeContext";

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Oneko from './components/interactive/Oneko';
// import CursorEffect from './components/interactive/CursorEffect';
import './index.css';
import ThemeTransition from './components/interactive/ThemeTransition';
import Games from './components/Games';
import Chatbot from './components/Chatbot';
import GlobalSound from './components/interactive/GlobalSound';

// Lazy load components - Critical path optimization
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const TypedIntro = React.lazy(() => import('./components/interactive/TypedIntro'));
const Stats = React.lazy(() => import('./components/interactive/Stats'));
const Blogs = React.lazy(() => import('./components/Blogs'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));

// Optimized loading component for critical path
const MinimalLoader = () => (
  <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
);

// Home page component with all portfolio content
const Home = () => (
  <>
    <Suspense fallback={null}>
      {/* <ParticleBackground /> */}
    </Suspense>
    <main>
      <Hero />
      <Suspense fallback={<MinimalLoader />}>
        <TypedIntro />
      </Suspense>
      <Suspense fallback={<MinimalLoader />}>
        <Projects />
      </Suspense>
      <div className="max-w-7xl mx-auto px-6">
        <Suspense fallback={<MinimalLoader />}>
          <Stats />
        </Suspense>
      </div>
      <Suspense fallback={<MinimalLoader />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<MinimalLoader />}>
        <Education />
      </Suspense>
      <Suspense fallback={<MinimalLoader />}>
        <Contact />
      </Suspense>
    </main>
    <Suspense fallback={<MinimalLoader />}>
      <Footer />
    </Suspense>
  </>
);

// Loading component wrapper
const AppContent = () => {
  const { isDarkMode, isAnimating, handleAnimationComplete } = useTheme();

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300 relative flex justify-center">
      <GlobalSound />
      <ThemeTransition isAnimating={isAnimating}
        isDarkMode={isDarkMode}
        onAnimationComplete={handleAnimationComplete} />
      {/* Full-height stylized borders - positioned outside content */}
      <div className="fixed opacity-20 top-0 h-screen w-10 border-r border-r-gray-300 dark:border-r-gray-200 bg-[image:repeating-linear-gradient(315deg,_currentColor_0,_currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-md:w-6 pointer-events-none z-10" style={{ left: "calc(50% - min(40vw, 500px) - 40px)" }}></div>
      <div className="fixed opacity-20 top-0 h-screen w-10 border-l border-l-gray-300 dark:border-l-gray-200 bg-[image:repeating-linear-gradient(315deg,_currentColor_0,_currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-md:w-6 pointer-events-none z-10" style={{ right: "calc(50% - min(40vw,500px) - 40px)" }}></div>
      <div className="App relative min-h-screen" style={{ maxWidth: "min(80vw, 1000px)" }}>
        {/* <CursorEffect /> */}
        <div className="relative z-10">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
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
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div><AppContent />
          <Oneko />
          <Chatbot />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;