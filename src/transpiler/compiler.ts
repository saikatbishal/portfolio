// src/transpiler/compiler.ts
import * as csstree from "css-tree";
import { CSS_TO_TAILWIND } from "./mappings";
import { DYNAMIC_CSS_TO_TW } from "./dynamicRules";

interface CompilerResult {
  ast: object | null;
  tailwindClasses: string[];
  error: string | null;
}

export const compileCssToTailwind = (cssInput: string): CompilerResult => {
  const tailwindClasses: string[] = [];
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
      if (node.type === "Declaration") {
        const property = node.property; // e.g., "text-align"

        // Handle the 'value' node which is usually a specific type
        let value = "";
        if (node.value.type === "Raw") {
          value = node.value.value.trim();
        } else if (node.value.type === "Value") {
          // Use csstree.generate to reconstruct the full value string
          value = csstree.generate(node.value).trim();
        }

        // 3. TRANSFORM: Check against our Dictionary
        const propertyMap = CSS_TO_TAILWIND[property];
        if (propertyMap && propertyMap[value]) {
          tailwindClasses.push(propertyMap[value]);
        } else {
          // 4. DYNAMIC RULES: Regex-based matching
          const declarationStr = `${property}: ${value}`;

          for (const rule of DYNAMIC_CSS_TO_TW) {
            const match = rule.pattern.exec(declarationStr);
            if (match) {
              // @ts-expect-error - dynamicRules transform expects spread arguments from regex match
              const result = rule.transform(...match);
              if (result) {
                tailwindClasses.push(result);
                break; // Stop after first match
              }
            }
          }
        }
      }
    });

    return { ast, tailwindClasses, error: null };
  } catch (err: any) {
    // Graceful error handling
    return {
      ast: null,
      tailwindClasses: [],
      error: err.message || "Syntax Error",
    };
  }
};
