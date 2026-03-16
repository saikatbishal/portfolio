const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-6">
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
            // origin_story
          </span>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-sans">
            I was supposed to be a metallurgist. COVID had other plans. When the economic crisis hit and labs shut down, I pivoted out of desperation—grabbed whatever opportunity came my way, and React happened to be it. But here's the thing: I fell in love. Not with the job security (though that helped), but with the fact that code is honest. It either works or it doesn't. There's no gray area, no politics, just pure logic and creativity colliding. Every bug felt like a puzzle, every feature shipped felt like victory. Years of landing whatever job I could find during uncertain times turned into a genuine craft. Now, I'm a fulltime developer—not because I needed to survive the crisis, but because I genuinely can't imagine doing anything else.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
