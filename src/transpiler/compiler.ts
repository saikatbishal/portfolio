// src/transpiler/compiler.ts
import * as csstree from "css-tree";
import { PROPERTY_HANDLERS } from "./properties";
import { arbitrary } from "./values";

interface CompilerResult {
  ast: object | null;
  tailwindClasses: string[];
  error: string | null;
}

/** Classes for one declaration. Unmapped properties become a Tailwind arbitrary property: [prop:value]. */
const declarationToClasses = (property: string, value: string): string[] => {
  const prop = property.toLowerCase();
  // Custom properties keep their case; vendor-prefixed ones use the standard handler when there's no specific one.
  const handler = prop.startsWith("--")
    ? undefined
    : PROPERTY_HANDLERS[prop] ?? PROPERTY_HANDLERS[prop.replace(/^-(webkit|moz|ms|o)-/, "")];
  return handler?.(value) ?? [`[${property}:${arbitrary(value)}]`];
};

export const compileCssToTailwind = (cssInput: string): CompilerResult => {
  const tailwindClasses = new Set<string>();
  let ast = null;

  try {
    // 1. PARSE: Convert string -> AST
    ast = csstree.parse(cssInput, {
      parseValue: false, // Keep values as simple strings for easier matching
      positions: true, // specific line/column numbers (good for visualization)
    });

    // 2. TRAVERSE (WALK): Recursive algorithm to find nodes
    csstree.walk(ast, (node) => {
      // We only care about CSS Declarations (e.g., "color: red")
      if (node.type !== "Declaration") return;

      const value =
        node.value.type === "Raw" ? node.value.value.trim() : csstree.generate(node.value).trim();
      if (!value) return;

      // 3. TRANSFORM: property handlers (see properties.ts), with "!" for !important
      for (const cls of declarationToClasses(node.property, value)) {
        tailwindClasses.add(node.important ? `!${cls}` : cls);
      }
    });

    return { ast, tailwindClasses: [...tailwindClasses], error: null };
  } catch (err: unknown) {
    // Graceful error handling
    return {
      ast: null,
      tailwindClasses: [],
      error: err instanceof Error ? err.message : "Syntax Error",
    };
  }
};
