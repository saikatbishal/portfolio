const milestones = [
  {
    when: "2017",
    title: "Metallurgy, NIT Jamshedpur",
    note: "Trained to engineer materials, not software.",
  },
  {
    when: "2020",
    title: "COVID shut the labs",
    note: "React was the opportunity that showed up. I took it.",
  },
  {
    when: "2021–25",
    title: "Four years shipping",
    note: "Backends, chatbots, ERP component libraries.",
  },
  {
    when: "2026",
    title: "Rifa.ai",
    note: "Design systems for AI product UI.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="mb-8 font-sans text-lg font-semibold text-gray-900 dark:text-white">
          How I got here
        </h2>

        {/* Mobile: vertical rail. Desktop: four stops on one line. */}
        <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4 border-l md:border-l-0 md:border-t border-gray-300 dark:border-gray-700 pl-6 md:pl-0 md:pt-6">
          {milestones.map((m, i) => (
            <li key={m.when} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[29px] top-1.5 md:left-0 md:-top-[29px] w-2.5 h-2.5 rounded-full border-2 ${
                  i === milestones.length - 1
                    ? "bg-[#39ff14] border-[#16a34a]"
                    : "bg-white dark:bg-gray-900 border-gray-400 dark:border-gray-500"
                }`}
              />
              <p className="font-mono text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {m.when}
              </p>
              <p className="mt-1 font-sans font-bold text-gray-900 dark:text-white">
                {m.title}
              </p>
              <p className="mt-1 font-sans text-sm text-gray-600 dark:text-gray-400">
                {m.note}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 font-sans text-gray-600 dark:text-gray-400">
          React, TypeScript, Tailwind, design tokens and Figma; Node and Python when the feature needs them.
        </p>
      </div>
    </section>
  );
};

export default About;
