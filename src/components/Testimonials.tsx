import React from "react";
import type { Testimonial } from "../data/testimonials";

const Testimonials: React.FC<{ items: Testimonial[] }> = ({ items }) => (
  <section
    id="testimonials"
    className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
  >
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-10 text-center">
        What people I've worked with say
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {items.map((t) => (
          <figure key={`${t.name}-${t.company}`} className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <blockquote className="font-sans text-lg leading-relaxed text-gray-800 dark:text-gray-200">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4">
              <p className="font-sans font-semibold text-gray-900 dark:text-white">
                {t.url ? (
                  <a href={t.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                    {t.name}
                  </a>
                ) : (
                  t.name
                )}
              </p>
              <p className="font-sans text-sm text-gray-600 dark:text-gray-400">
                {t.role}, {t.company} · {t.relationship}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
