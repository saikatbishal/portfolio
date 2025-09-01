import { ReactTyped } from "react-typed";

const TypedIntro = () => {
  return (
    <section className="py-16 from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 particle-section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <span className="text-caption px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-400/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 dark:border-purple-400/30 backdrop-blur-md">
            ✨ What I Do
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          I'm a{" "}
          <span className="gradient-text">
            <ReactTyped
              strings={[
                "Frontend Developer",
                "UI/UX Enthusiast", 
                "Problem Solver",
                "Full Stack Developer",
                "React Specialist",
                "JavaScript Expert"
              ]}
              typeSpeed={50}
              backSpeed={30}
              backDelay={2000}
              loop
              className="inline-block"
            />
          </span>
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Passionate about creating exceptional digital experiences through clean code, 
          innovative design, and user-centered development. I bring ideas to life with 
          modern technologies and creative problem-solving.
        </p>
      </div>
    </section>
  );
};

export default TypedIntro;