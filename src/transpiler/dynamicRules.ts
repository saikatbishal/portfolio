// src/transpiler/dynamicRules.ts

export interface DynamicRule {
  pattern: RegExp;
  transform: (value: string) => string | null;
}

export const DYNAMIC_CSS_TO_TW: DynamicRule[] = [
  /**
   * Margin / Padding (px → Tailwind spacing scale)
   * Example: margin: 8px → m-2
   */
  {
    pattern:
      /^(margin|margin-top|margin-bottom|margin-left|margin-right):\s*([\d.]+)px$/i,
    transform: (_, prop, px) => {
      const scale = Number(px) / 4; // Tailwind scale approximation
      const prefix = {
        margin: "m",
        "margin-top": "mt",
        "margin-bottom": "mb",
        "margin-left": "ml",
        "margin-right": "mr",
      }[prop];
      return `${prefix}-${scale}`;
    },
  },

  {
    pattern:
      /^(padding|padding-top|padding-bottom|padding-left|padding-right):\s*([\d.]+)px$/i,
    transform: (_, prop, px) => {
      const scale = Number(px) / 4;
      const prefix = {
        padding: "p",
        "padding-top": "pt",
        "padding-bottom": "pb",
        "padding-left": "pl",
        "padding-right": "pr",
      }[prop];
      return `${prefix}-${scale}`;
    },
  },

  /**
   * Width / Height from px → Tailwind w-[value] (arbitrary values)
   */
  {
    pattern: /^(width|height):\s*([\d.]+)px$/i,
    transform: (_, prop, px) => {
      const prefix = prop === "width" ? "w" : "h";
      return `${prefix}-[${px}px]`;
    },
  },

  /**
   * Width / Height in percentage
   * Example: width: 50% → w-1/2
   */
  {
    pattern: /^(width|height):\s*(\d+)%$/i,
    transform: (_, prop, percent) => {
      const prefix = prop === "width" ? "w" : "h";
      const fractionMap: Record<string, string> = {
        "100": "full",
        "50": "1/2",
        "33": "1/3",
        "66": "2/3",
        "25": "1/4",
        "75": "3/4",
      };
      const mapped = fractionMap[percent];
      return mapped ? `${prefix}-${mapped}` : `${prefix}-[${percent}%]`;
    },
  },

  /**
   * Opacity (decimal → Tailwind opacity scale)
   * example: opacity: 0.45 → opacity-45
   */
  {
    pattern: /^opacity:\s*([\d.]+)$/i,
    transform: (_, val) => {
      const level = Math.round(Number(val) * 100);
      return `opacity-${level}`;
    },
  },

  /**
   * Border radius (px, %, rem, em)
   */
  {
    pattern: /^border-radius:\s*(.+)$/i,
    transform: (_, val) => `rounded-[${val}]`,
  },

  /**
   * Gap (px → gap-N scale)
   */
  {
    pattern: /^gap:\s*([\d.]+)px$/i,
    transform: (_, px) => {
      const scale = Number(px) / 4;
      return `gap-${scale}`;
    },
  },

  /**
   * Arbitrary Color: Hex → Tailwind arbitrary color
   * Example: color: #ff0000 → text-[#ff0000]
   */
  {
    pattern: /^(color|background-color|border-color):\s*(#[0-9a-fA-F]{3,6})$/i,
    transform: (_, prop, hex) => {
      const prefix = {
        color: "text",
        "background-color": "bg",
        "border-color": "border",
      }[prop];
      return `${prefix}-[${hex}]`;
    },
  },

  /**
   * RGB / RGBA color → Tailwind arbitrary color
   * Example: background-color: rgb(255, 0, 0) → bg-[rgb(255,0,0)]
   */
  {
    pattern: /^(color|background-color|border-color):\s*(rgb[a]?\(.*\))$/i,
    transform: (_, prop, color) => {
      const prefix = {
        color: "text",
        "background-color": "bg",
        "border-color": "border",
      }[prop];
      // Remove spaces because Tailwind arbitrary values cannot contain spaces
      return `${prefix}-[${color.replace(/\s+/g, "")}]`;
    },
  },

  /**
   * Font size (px → text-[value])
   */
  {
    pattern: /^font-size:\s*([\d.]+)px$/i,
    transform: (_, px) => `text-[${px}px]`,
  },

  /**
   * Line height (px → leading-[value])
   */
  {
    pattern: /^line-height:\s*([\d.]+)px$/i,
    transform: (_, px) => `leading-[${px}px]`,
  },

  /**
   * Letter spacing (px → tracking-[value])
   */
  {
    pattern: /^letter-spacing:\s*([\d.-]+)px$/i,
    transform: (_, px) => `tracking-[${px}px]`,
  },

  /**
   * Translate Values (e.g. transform: translateX(10px))
   */
  {
    pattern: /^transform:\s*translateX\(([\d.-]+)px\)$/i,
    transform: (_, px) => `translate-x-[${px}px]`,
  },
  {
    pattern: /^transform:\s*translateY\(([\d.-]+)px\)$/i,
    transform: (_, px) => `translate-y-[${px}px]`,
  },

  /**
   * Z-index
   */
  {
    pattern: /^z-index:\s*(\d+)$/i,
    transform: (_, z) => `z-[${z}]`,
  },

  /**
   * Flex basis (px or %)
   */
  {
    pattern: /^flex-basis:\s*(.*)$/i,
    transform: (_, val) => `basis-[${val}]`,
  },

  /**
   * Border Shorthand
   * Example: border: 2px solid blue
   */
  {
    pattern: /^border:\s*(.+)$/i,
    transform: (_, val) => {
      const classes = [];

      // 1. Width
      const width = val.match(/\d+(?:px|rem|em|%)/);
      if (width) classes.push(`border-[${width[0]}]`);

      // 2. Style
      const style = val.match(/(solid|dashed|dotted|double|none|hidden)/);
      if (style) classes.push(`border-${style[0]}`);

      // 3. Color
      // Try Hex
      const hex = val.match(/#[0-9a-fA-F]{3,6}/);
      if (hex) {
        classes.push(`border-[${hex[0]}]`);
      } else {
        // Try RGB/RGBA
        const rgb = val.match(/rgb[a]?\([^)]+\)/);
        if (rgb) {
          classes.push(`border-[${rgb[0].replace(/\s+/g, "")}]`);
        } else {
          // Try Named Color
          // Remove width and style from string, what's left is color?
          let remaining = val;
          if (width) remaining = remaining.replace(width[0], "");
          if (style) remaining = remaining.replace(style[0], "");
          const color = remaining.trim();
          if (color) {
            classes.push(`border-[${color}]`);
          }
        }
      }

      return classes.join(" ");
    },
  },
];
