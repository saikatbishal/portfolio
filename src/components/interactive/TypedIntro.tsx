const steps = [
  { label: "Decisions", note: "written down" },
  { label: "Tokens", note: "one source of truth" },
  { label: "Components", note: "typed contracts" },
  { label: "Screens", note: "consistent by default" },
];

const TypedIntro = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="mb-6">
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
            // how_i_work
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-10 text-gray-900 dark:text-white">
          From Figma to production.
        </h2>

        <ol className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 text-left">
          {steps.map((step, i) => (
            <li
              key={step.label}
              className="relative border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 md:border-r-0 md:last:border-r"
            >
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                0{i + 1}
              </span>
              <p className="mt-1 font-sans font-bold text-gray-900 dark:text-white">
                {step.label}
              </p>
              <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                {step.note}
              </p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs text-gray-500"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default TypedIntro;
