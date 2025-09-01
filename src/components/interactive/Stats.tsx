import { useEffect, useState } from "react";
import CountUp from "react-countup";

interface StatItem {
  end: number;
  label: string;
  suffix?: string;
}

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const stats: StatItem[] = [
    { end: 20, label: "Projects Completed", suffix: "+" },
    { end: 4, label: "Years Experience", suffix: "+" },
    { end: 100, label: "Github Contributions", suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="stats-section"
      className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
        >
          <CountUp
            start={0}
            end={isVisible ? stat.end : 0}
            duration={2.5}
            suffix={stat.suffix}
            className="text-4xl font-bold text-purple-600 dark:text-purple-400"
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
              </div>
            )}
          </CountUp>
        </div>
      ))}
    </div>
  );
};

export default Stats;
