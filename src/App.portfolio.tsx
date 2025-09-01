import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorEffect from './components/interactive/CursorEffect';
import ParticleBackground from './components/interactive/ParticleBackground';
import TypedIntro from './components/interactive/TypedIntro';
import Stats from './components/interactive/Stats';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App relative min-h-screen">
        <CursorEffect />
        <ParticleBackground />
        <div className="relative z-10">
          <Navigation />
          <main>
            <Hero />
            <TypedIntro />
            <Projects />
            <div className="max-w-7xl mx-auto px-6">
              <Stats />
            </div>
            <Experience />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;