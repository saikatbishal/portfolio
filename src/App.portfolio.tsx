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

// Lazy load components - Critical path optimization
const ParticleBackground = React.lazy(() => import('./components/interactive/ParticleBackground'));
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Education = React.lazy(() => import('./components/Education'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const TypedIntro = React.lazy(() => import('./components/interactive/TypedIntro'));
const Stats = React.lazy(() => import('./components/interactive/Stats'));

// Optimized loading component for critical path
const MinimalLoader = () => (
  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
);

// Home page component with all portfolio content
const Home = () => (
  <>
    <Suspense fallback={null}>
      <ParticleBackground />
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
// ...existing code...
    <Suspense fallback={<MinimalLoader />}>
      <Footer />
    </Suspense>
  </>
);

// Loading component wrapper
const AppContent = () => {
  const { isDarkMode, isAnimating, handleAnimationComplete } = useTheme();

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300 relative">
      <ThemeTransition isAnimating={isAnimating}
        isDarkMode={isDarkMode}
        onAnimationComplete={handleAnimationComplete} />
      <div className="App relative min-h-screen">
        {/* <CursorEffect /> */}
        <div className="relative z-10">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
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
          {/* Oneko positioned at the very end to ensure highest z-index */}
          <Oneko />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;