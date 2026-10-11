// src/transpiler/values.ts
// Helpers that turn a CSS value into a Tailwind class suffix: a theme key when the value is
// on Tailwind's scale, otherwise an arbitrary value in brackets.
import { theme } from "./theme";

type Scale = Record<string, string>;

/**
 * Canonical form used to compare a CSS value with a theme value:
 * lowercase, single spaces, ", " and " / " separators, leading zeros (".5" → "0.5"),
 * px/rem lengths as px (16px root), and seconds as ms.
 */
export const normalize = (value: string): string => {
  const s = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/(^|[^\d.])\.(\d)/g, "$10.$2");

  const length = /^(-?\d*\.?\d+)(px|rem)$/.exec(s);
  if (length) return `${+(Number(length[1]) * (length[2] === "rem" ? 16 : 1)).toFixed(4)}px`;

  const seconds = /^(-?\d*\.?\d+)s$/.exec(s);
  if (seconds) return `${+(Number(seconds[1]) * 1000).toFixed(4)}ms`;

  const number = /^(-?\d*\.?\d+)(em|%|ms|deg|vh|vw|ch)?$/.exec(s);
  if (number) return `${Number(number[1])}${number[2] ?? ""}`;

  return s;
};

// A bare "0" is unitless; theme zeros carry a unit ("0px", "0em", "0s", "0deg").
const ZERO_FORMS = ["0", "0px", "0em", "0ms", "0deg", "0%"];

const lookups = new WeakMap<Scale, Map<string, string>>();

/**
 * Reverse lookup: CSS value → theme key. The first key wins when two share a value ("1/2" over "2/4").
 * DEFAULT is skipped when the scale has no bare class for it (there's no plain "ease" or "duration").
 */
export const findKey = (scale: Scale, value: string, allowDefault = true): string | undefined => {
  let map = lookups.get(scale);
  if (!map) {
    map = new Map();
    for (const [key, val] of Object.entries(scale)) {
      const norm = normalize(val);
      if (!map.has(norm)) map.set(norm, key);
    }
    lookups.set(scale, map);
  }
  if (!allowDefault) {
    const key = findKey(scale, value);
    if (key !== "DEFAULT") return key;
    const norm = normalize(value);
    return Object.entries(scale).find(([k, v]) => k !== "DEFAULT" && normalize(v) === norm)?.[0];
  }
  const norm = normalize(value);
  if (norm === "0" || norm === "0px") {
    for (const zero of ZERO_FORMS) if (map.has(zero)) return map.get(zero);
  }
  return map.get(norm);
};

/** Arbitrary value: Tailwind reads "_" as a space inside brackets. */
export const arbitrary = (value: string): string =>
  value.trim().replace(/\s*,\s*/g, ",").replace(/\s+/g, "_");

/** Joins a prefix and a theme key; the DEFAULT key is the bare prefix ("rounded", "border"). */
const join = (prefix: string, key: string) => (key === "DEFAULT" ? prefix : `${prefix}-${key}`);

interface ScaleOptions {
  /** Allow "-m-2" style negatives for negative values. */
  negative?: boolean;
  /** Type hint for arbitrary values that Tailwind can't infer, e.g. "length". */
  hint?: string;
  /** The scale's DEFAULT key has no bare class. */
  noDefault?: boolean;
}

/** Class for a value on a theme scale, or an arbitrary value when it's off-scale. */
export const scaleClass = (prefix: string, scale: Scale, value: string, options: ScaleOptions = {}): string => {
  const key = findKey(scale, value, !options.noDefault);
  if (key !== undefined) return join(prefix, key);

  if (options.negative && value.trim().startsWith("-")) {
    const positiveKey = findKey(scale, value.trim().slice(1), !options.noDefault);
    if (positiveKey !== undefined && positiveKey !== "DEFAULT") return `-${prefix}-${positiveKey}`;
  }
  const hint = options.hint ? `${options.hint}:` : "";
  return `${prefix}-[${hint}${arbitrary(value)}]`;
};

/** Splits on top-level separators only, so "rgb(0, 0, 0) 1px" or "repeat(2, 1fr)" stay whole. */
export const splitTopLevel = (value: string, separator: " " | "," = " "): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let current = "";
  for (const char of value.trim()) {
    if (quote) {
      if (char === quote) quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === "(") {
      depth++;
    } else if (char === ")") {
      depth--;
    } else if (depth === 0 && (separator === " " ? /\s/.test(char) : char === separator)) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
};

/**
 * Expands the 1–4 value box shorthand (margin, padding, border-width, …) to [top, right, bottom, left].
 * Returns null for anything else.
 */
export const expandBox = (value: string): [string, string, string, string] | null => {
  const parts = splitTopLevel(value);
  switch (parts.length) {
    case 1: return [parts[0], parts[0], parts[0], parts[0]];
    case 2: return [parts[0], parts[1], parts[0], parts[1]];
    case 3: return [parts[0], parts[1], parts[2], parts[1]];
    case 4: return [parts[0], parts[1], parts[2], parts[3]];
    default: return null;
  }
};

/**
 * Builds the shortest set of side classes for [top, right, bottom, left]:
 * one class when all sides match, x/y pairs when opposite sides match, single sides otherwise.
 */
export const boxClasses = (
  sides: [string, string, string, string],
  make: (side: "" | "x" | "y" | "t" | "r" | "b" | "l", value: string) => string
): string[] => {
  const [t, r, b, l] = sides.map(normalize);
  if (t === r && r === b && b === l) return [make("", sides[0])];
  const classes: string[] = [];
  if (t === b) classes.push(make("y", sides[0]));
  else classes.push(make("t", sides[0]), make("b", sides[2]));
  if (r === l) classes.push(make("x", sides[1]));
  else classes.push(make("r", sides[1]), make("l", sides[3]));
  return classes;
};

// ---------------------------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------------------------

// CSS keywords with an exact Tailwind equivalent. Other CSS names ("red") differ from the palette ("red-500").
const COLOR_KEYWORDS: Record<string, string> = {
  transparent: "transparent",
  currentcolor: "current",
  inherit: "inherit",
  black: "black",
  white: "white",
};

const hexToName = new Map<string, string>();
for (const [name, hex] of Object.entries(theme.colors)) {
  const full = expandHex(hex);
  if (full && !hexToName.has(full)) hexToName.set(full, name);
}

function expandHex(hex: string): string | null {
  const h = hex.replace("#", "").toLowerCase();
  if (/^[0-9a-f]{3,4}$/.test(h)) return `#${[...h].map((c) => c + c).join("")}`;
  if (/^[0-9a-f]{6}([0-9a-f]{2})?$/.test(h)) return `#${h}`;
  return null;
}

/** Parses hex and rgb()/rgba() into a 6-digit hex plus alpha (0–1). Other formats return null. */
const parseColor = (value: string): { hex: string; alpha: number } | null => {
  const v = value.trim().toLowerCase();
  if (v.startsWith("#")) {
    const full = expandHex(v);
    if (!full) return null;
    const alpha = full.length === 9 ? parseInt(full.slice(7), 16) / 255 : 1;
    return { hex: full.slice(0, 7), alpha };
  }
  const rgb = /^rgba?\((.+)\)$/.exec(v);
  if (!rgb) return null;
  const parts = rgb[1].split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3 || parts.length > 4) return null;
  const channels = parts.slice(0, 3).map((p) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p)));
  if (channels.some((c) => Number.isNaN(c) || c < 0 || c > 255)) return null;
  const a = parts[3];
  const alpha = a === undefined ? 1 : a.endsWith("%") ? parseFloat(a) / 100 : parseFloat(a);
  if (Number.isNaN(alpha)) return null;
  const hex = `#${channels.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
  return { hex, alpha };
};

const isColorFunction = (v: string) => /^(#|rgba?\(|hsla?\()/i.test(v.trim());

/** Recognises a color value well enough to pull it out of a shorthand like "1px solid #333". */
export const looksLikeColor = (value: string): boolean => {
  const v = value.trim().toLowerCase();
  return isColorFunction(v) || v in COLOR_KEYWORDS || v.startsWith("var(") || NAMED_COLORS.has(v);
};

/**
 * Color class: a palette name when the color matches Tailwind's palette exactly
 * ("#2563eb" → "bg-blue-600", "rgba(37, 99, 235, .5)" → "bg-blue-600/50"), otherwise an arbitrary value.
 */
export const colorClass = (prefix: string, value: string): string => {
  const v = value.trim();
  const keyword = COLOR_KEYWORDS[v.toLowerCase()];
  if (keyword) return `${prefix}-${keyword}`;

  const parsed = parseColor(v);
  if (parsed) {
    const name = hexToName.get(parsed.hex);
    if (name) {
      if (parsed.alpha >= 1) return `${prefix}-${name}`;
      const opacityKey = findKey(theme.opacity, String(+parsed.alpha.toFixed(4)));
      return `${prefix}-${name}/${opacityKey ?? `[${+parsed.alpha.toFixed(4)}]`}`;
    }
  }
  // Hex, rgb() and hsl() are recognised as colors inside brackets; names and var() need a hint.
  return isColorFunction(v) ? `${prefix}-[${arbitrary(v)}]` : `${prefix}-[color:${arbitrary(v)}]`;
};

// CSS named colors (CSS Color 4), so shorthands like "border: 1px solid tomato" find the color part.
const NAMED_COLORS = new Set(
  (
    "aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown " +
    "burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan " +
    "darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid " +
    "darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet " +
    "deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro " +
    "ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki " +
    "lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow " +
    "lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray " +
    "lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine " +
    "mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise " +
    "mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab " +
    "orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru " +
    "pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown " +
    "seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan " +
    "teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen"
  ).split(" ")
);
