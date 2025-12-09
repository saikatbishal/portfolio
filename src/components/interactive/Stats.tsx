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
          className="text-center p-6 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-[#39ff14] dark:hover:border-[#39ff14] transition-colors duration-300 group"
        >
          <CountUp
            start={0}
            end={isVisible ? stat.end : 0}
            duration={2.5}
            suffix={stat.suffix}
            className="text-4xl font-bold font-mono text-gray-900 dark:text-white group-hover:text-[#16a34a] dark:group-hover:text-[#39ff14] transition-colors duration-300"
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
                <p className="mt-2 text-sm font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
