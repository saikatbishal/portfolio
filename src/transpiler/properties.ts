// src/transpiler/properties.ts
// CSS property → Tailwind classes. A handler returns null when the value has no exact Tailwind
// equivalent; the compiler then emits an arbitrary property ("[prop:value]") instead of dropping it.
import { theme } from "./theme";
import {
  arbitrary,
  boxClasses,
  colorClass,
  expandBox,
  findKey,
  looksLikeColor,
  normalize,
  scaleClass,
  splitTopLevel,
} from "./values";

export type Handler = (value: string) => string[] | null;

const marginScale = { ...theme.spacing, auto: "auto" };
const paddingScale = theme.spacing;

// --- handler builders ---------------------------------------------------------------------------

/** Fixed keyword → class table. */
const keywords =
  (map: Record<string, string>): Handler =>
  (value) => {
    const cls = map[value.trim().toLowerCase()];
    return cls ? [cls] : null;
  };

/** Keywords whose class is `${prefix}-${keyword}` ("block" → "block" with no prefix). */
const sameNames = (prefix: string, names: string[]): Record<string, string> =>
  Object.fromEntries(names.map((n) => [n, prefix ? `${prefix}-${n}` : n]));

const scale =
  (prefix: string, values: Record<string, string>, options?: Parameters<typeof scaleClass>[3]): Handler =>
  (value) =>
    [scaleClass(prefix, values, value, options)];

const color =
  (prefix: string): Handler =>
  (value) =>
    [colorClass(prefix, value)];

/** Tries a keyword table first, then a fallback handler. */
const either =
  (...handlers: Handler[]): Handler =>
  (value) => {
    for (const h of handlers) {
      const result = h(value);
      if (result) return result;
    }
    return null;
  };

const isLength = (v: string) => /^-?(\d*\.?\d+)(px|rem|em|%|vw|vh|vmin|vmax|ch|ex|dvh|svh|lvh)?$/.test(v.trim());
const isTime = (v: string) => /^-?\d*\.?\d+m?s$/.test(v.trim());
const isMathOrVar = (v: string) => /^(calc|min|max|clamp|var)\(/.test(v.trim());

// --- spacing ------------------------------------------------------------------------------------

/** margin / padding / inset style 1–4 value shorthands. */
const boxShorthand =
  (prefixes: Record<"" | "x" | "y" | "t" | "r" | "b" | "l", string>, values: Record<string, string>, negative: boolean): Handler =>
  (value) => {
    const sides = expandBox(value);
    if (!sides) return null;
    return boxClasses(sides, (side, v) => scaleClass(prefixes[side], values, v, { negative }));
  };

const sidePrefixes = (base: string) => ({
  "": base, x: `${base}x`, y: `${base}y`, t: `${base}t`, r: `${base}r`, b: `${base}b`, l: `${base}l`,
});

/** padding-inline / margin-block style logical pairs: one value, or start + end. */
const logicalPair =
  (both: string, start: string, end: string, values: Record<string, string>, negative: boolean): Handler =>
  (value) => {
    const parts = splitTopLevel(value);
    if (parts.length === 1) return [scaleClass(both, values, parts[0], { negative })];
    if (parts.length !== 2) return null;
    if (normalize(parts[0]) === normalize(parts[1])) return [scaleClass(both, values, parts[0], { negative })];
    return [scaleClass(start, values, parts[0], { negative }), scaleClass(end, values, parts[1], { negative })];
  };

// --- borders ------------------------------------------------------------------------------------

const BORDER_STYLES = ["solid", "dashed", "dotted", "double", "hidden", "none"];
const LINE_WIDTH_KEYWORDS = ["thin", "medium", "thick"];

/** "1px solid #e5e7eb" (any order) for border and border-top/right/bottom/left. */
const borderShorthand =
  (side: "" | "t" | "r" | "b" | "l"): Handler =>
  (value) => {
    const prefix = side ? `border-${side}` : "border";
    const v = value.trim().toLowerCase();
    if (v === "none" || v === "0") return side ? [`${prefix}-0`] : [v === "none" ? "border-none" : "border-0"];

    const classes: string[] = [];
    for (const token of splitTopLevel(value)) {
      const t = token.toLowerCase();
      if (BORDER_STYLES.includes(t)) {
        // border-style has no per-side utility in Tailwind v3. Preflight already makes every border
        // solid, so a solid side needs no class; any other side style can't be expressed.
        if (side && t !== "solid") return null;
        if (!side) classes.push(`border-${t}`);
      } else if (isLength(t) || LINE_WIDTH_KEYWORDS.includes(t) || (isMathOrVar(t) && !looksLikeColor(t))) {
        classes.push(scaleClass(prefix, theme.borderWidth, token, isMathOrVar(t) ? { hint: "length" } : {}));
      } else if (looksLikeColor(token)) {
        classes.push(colorClass(prefix, token));
      } else {
        return null;
      }
    }
    return classes;
  };

const radiusCorners = (value: string): string[] | null => {
  if (value.includes("/")) return [`rounded-[${arbitrary(value)}]`];
  const corners = expandBox(value); // CSS order: top-left, top-right, bottom-right, bottom-left
  if (!corners) return null;
  const [tl, tr, br, bl] = corners;
  const n = corners.map(normalize);
  const r = (suffix: string, v: string) => scaleClass(`rounded${suffix}`, theme.borderRadius, v);
  if (n[0] === n[1] && n[1] === n[2] && n[2] === n[3]) return [r("", tl)];
  if (n[0] === n[1] && n[2] === n[3]) return [r("-t", tl), r("-b", br)];
  if (n[0] === n[3] && n[1] === n[2]) return [r("-l", tl), r("-r", tr)];
  return [r("-tl", tl), r("-tr", tr), r("-br", br), r("-bl", bl)];
};

const OUTLINE_STYLES: Record<string, string> = {
  solid: "outline", dashed: "outline-dashed", dotted: "outline-dotted", double: "outline-double", none: "outline-none",
};

const outlineShorthand: Handler = (value) => {
  const v = value.trim().toLowerCase();
  if (v === "none" || v === "0") return [v === "none" ? "outline-none" : "outline-0"];
  const classes: string[] = [];
  for (const token of splitTopLevel(value)) {
    const t = token.toLowerCase();
    if (OUTLINE_STYLES[t]) classes.push(OUTLINE_STYLES[t]);
    else if (isLength(t) || LINE_WIDTH_KEYWORDS.includes(t)) classes.push(scaleClass("outline", theme.outlineWidth, token));
    else if (looksLikeColor(token)) classes.push(colorClass("outline", token));
    else return null;
  }
  return classes;
};

// --- typography ---------------------------------------------------------------------------------

const fontSize: Handler = (value) => {
  const key = findKey(theme.fontSize, value);
  if (key) return [`text-${key}`];
  if (isLength(value)) return [`text-[${arbitrary(value)}]`];
  if (isMathOrVar(value)) return [`text-[length:${arbitrary(value)}]`];
  return null;
};

const fontWeight: Handler = (value) => {
  const v = value.trim().toLowerCase();
  const named: Record<string, string> = { normal: "400", bold: "700" };
  const numeric = named[v] ?? v;
  const key = findKey(theme.fontWeight, numeric);
  if (key) return [`font-${key}`];
  return /^\d+$/.test(numeric) ? [`font-[${numeric}]`] : null;
};

const GENERIC_FAMILIES: Record<string, string> = {
  "sans-serif": "font-sans", "system-ui": "font-sans", "ui-sans-serif": "font-sans",
  serif: "font-serif", "ui-serif": "font-serif",
  monospace: "font-mono", "ui-monospace": "font-mono",
};

const fontFamily: Handler = (value) => {
  const stack = splitTopLevel(value, ",");
  if (stack.length === 1 && GENERIC_FAMILIES[stack[0].toLowerCase()]) return [GENERIC_FAMILIES[stack[0].toLowerCase()]];
  // Quote names with spaces so "_" can stand in for the space: font-['Open_Sans',sans-serif].
  const families = stack.map((f) => (/\s/.test(f) && !/^["']/.test(f) ? `'${f}'` : f.replace(/^"(.*)"$/, "'$1'")));
  return [`font-[${arbitrary(families.join(","))}]`];
};

const lineHeight: Handler = (value) => {
  const key = findKey(theme.lineHeight, value);
  return [key ? `leading-${key}` : `leading-[${arbitrary(value)}]`];
};

const letterSpacing: Handler = (value) =>
  value.trim().toLowerCase() === "normal" ? ["tracking-normal"] : [scaleClass("tracking", theme.letterSpacing, value)];

const DECORATION_LINES: Record<string, string> = {
  underline: "underline", overline: "overline", "line-through": "line-through", none: "no-underline",
};
const DECORATION_STYLES = ["solid", "double", "dotted", "dashed", "wavy"];

const textDecoration: Handler = (value) => {
  const classes: string[] = [];
  for (const token of splitTopLevel(value)) {
    const t = token.toLowerCase();
    if (DECORATION_LINES[t]) classes.push(DECORATION_LINES[t]);
    else if (DECORATION_STYLES.includes(t)) classes.push(`decoration-${t}`);
    else if (isLength(t) || t === "auto" || t === "from-font")
      classes.push(scaleClass("decoration", theme.textDecorationThickness, token));
    else if (looksLikeColor(token)) classes.push(colorClass("decoration", token));
    else return null;
  }
  return classes;
};

const listStyle: Handler = (value) => {
  const classes: string[] = [];
  for (const token of splitTopLevel(value)) {
    const t = token.toLowerCase();
    if (t === "inside" || t === "outside") classes.push(`list-${t}`);
    else if (findKey(theme.listStyleType, t)) classes.push(`list-${findKey(theme.listStyleType, t)}`);
    else return null;
  }
  return classes;
};

const content: Handler = (value) => {
  const v = value.trim();
  if (v === "none") return ["content-none"];
  // Tailwind wants single quotes inside the brackets.
  return [`content-[${arbitrary(v.replace(/^"(.*)"$/, "'$1'"))}]`];
};

// --- backgrounds --------------------------------------------------------------------------------

const isImage = (v: string) => /^(url|(repeating-)?(linear|radial|conic)-gradient|image-set)\(/i.test(v.trim());

const BG_REPEAT: Record<string, string> = {
  repeat: "bg-repeat", "no-repeat": "bg-no-repeat", "repeat-x": "bg-repeat-x", "repeat-y": "bg-repeat-y",
  round: "bg-repeat-round", space: "bg-repeat-space",
};
const BG_ATTACHMENT = sameNames("bg", ["fixed", "local", "scroll"]);

const backgroundImage: Handler = (value) => {
  if (value.trim().toLowerCase() === "none") return ["bg-none"];
  return isImage(value) ? [`bg-[${arbitrary(value)}]`] : null;
};

const backgroundPosition: Handler = (value) => {
  const key = findKey(theme.backgroundPosition, value);
  return [key ? `bg-${key}` : `bg-[position:${arbitrary(value)}]`];
};

const backgroundSize: Handler = (value) => {
  const key = findKey(theme.backgroundSize, value);
  return [key ? `bg-${key}` : `bg-[length:${arbitrary(value)}]`];
};

/** The background shorthand, for the common single-layer cases; anything with position/size falls back. */
const background: Handler = (value) => {
  if (splitTopLevel(value, ",").length > 1 || /\//.test(value.replace(/\([^)]*\)/g, ""))) return null;
  const classes: string[] = [];
  for (const token of splitTopLevel(value)) {
    const t = token.toLowerCase();
    if (t === "none") classes.push("bg-none");
    else if (isImage(token)) classes.push(`bg-[${arbitrary(token)}]`);
    else if (BG_REPEAT[t]) classes.push(BG_REPEAT[t]);
    else if (BG_ATTACHMENT[t]) classes.push(BG_ATTACHMENT[t]);
    else if (looksLikeColor(token)) classes.push(colorClass("bg", token));
    else return null;
  }
  return classes;
};

// --- effects ------------------------------------------------------------------------------------

const boxShadow: Handler = (value) => {
  if (value.trim().toLowerCase() === "none") return ["shadow-none"];
  const key = findKey(theme.boxShadow, value);
  return [key ? (key === "DEFAULT" ? "shadow" : `shadow-${key}`) : `shadow-[${arbitrary(value)}]`];
};

const toFraction = (v: string) => (v.trim().endsWith("%") ? String(parseFloat(v) / 100) : v);

const opacity: Handler = (value) => [scaleClass("opacity", theme.opacity, toFraction(value))];

const BLEND_MODES = [
  "normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light",
  "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity",
];

/** filter / backdrop-filter function lists: "blur(4px) brightness(.9)". */
const filterList =
  (prefix: "" | "backdrop-"): Handler =>
  (value) => {
    if (value.trim().toLowerCase() === "none") return [prefix ? "backdrop-filter-none" : "filter-none"];
    const classes: string[] = [];
    for (const fn of splitTopLevel(value)) {
      const m = /^([a-z-]+)\((.*)\)$/i.exec(fn);
      if (!m) return null;
      const [, name, rawArg] = m;
      const arg = rawArg.trim();
      const p = (n: string) => `${prefix}${n}`;
      switch (name.toLowerCase()) {
        case "blur":
          classes.push(scaleClass(p("blur"), prefix ? theme.backdropBlur : theme.blur, arg || "0"));
          break;
        case "brightness":
        case "contrast":
        case "saturate": {
          const values = theme[name.toLowerCase() as "brightness" | "contrast" | "saturate"];
          classes.push(scaleClass(p(name.toLowerCase()), values, toFraction(arg)));
          break;
        }
        case "grayscale":
        case "invert":
        case "sepia": {
          const amount = arg === "" ? "1" : toFraction(arg);
          const n = Number(amount);
          if (n === 1) classes.push(p(name.toLowerCase()));
          else if (n === 0) classes.push(`${p(name.toLowerCase())}-0`);
          else classes.push(`${p(name.toLowerCase())}-[${arbitrary(arg)}]`);
          break;
        }
        case "hue-rotate":
          classes.push(scaleClass(p("hue-rotate"), theme.hueRotate, arg, { negative: true }));
          break;
        case "opacity":
          if (!prefix) return null; // filter: opacity() isn't a Tailwind v3 utility
          classes.push(scaleClass("backdrop-opacity", theme.opacity, toFraction(arg)));
          break;
        case "drop-shadow":
          if (prefix) return null;
          classes.push(`drop-shadow-[${arbitrary(arg)}]`);
          break;
        default:
          return null;
      }
    }
    return classes;
  };

// --- transforms ---------------------------------------------------------------------------------

// Tailwind composes transforms in this fixed order, so only CSS that already follows it converts exactly.
const TRANSFORM_ORDER = ["translate", "rotate", "skewX", "skewY", "scale"] as const;

const transform: Handler = (value) => {
  if (value.trim().toLowerCase() === "none") return ["transform-none"];
  const classes: string[] = [];
  let lastStep = -1;
  const step = (kind: (typeof TRANSFORM_ORDER)[number]) => {
    const index = TRANSFORM_ORDER.indexOf(kind);
    if (index <= lastStep) return false;
    lastStep = index;
    return true;
  };

  for (const fn of splitTopLevel(value)) {
    const m = /^([a-z]+)\((.*)\)$/i.exec(fn);
    if (!m) return null;
    const name = m[1];
    const args = splitTopLevel(m[2], ",");
    const translate = (axis: "x" | "y", v: string) =>
      classes.push(scaleClass(`translate-${axis}`, theme.translate, v, { negative: true }));
    const scaleAxis = (axis: "" | "-x" | "-y", v: string) => classes.push(scaleClass(`scale${axis}`, theme.scale, toFraction(v)));
    const skew = (axis: "x" | "y", v: string) => classes.push(scaleClass(`skew-${axis}`, theme.skew, v, { negative: true }));

    switch (name) {
      case "translate":
        if (!step("translate") || args.length > 2) return null;
        translate("x", args[0]);
        if (args[1] && normalize(args[1]) !== "0") translate("y", args[1]);
        break;
      case "translateX":
      case "translateY":
        // translateX() then translateY() share one Tailwind translate() step.
        if (lastStep > 0) return null;
        lastStep = 0;
        translate(name === "translateX" ? "x" : "y", args[0]);
        break;
      case "rotate":
        if (!step("rotate")) return null;
        classes.push(scaleClass("rotate", theme.rotate, args[0], { negative: true }));
        break;
      case "skew":
        if (!step("skewX")) return null;
        skew("x", args[0]);
        if (args[1]) {
          lastStep = TRANSFORM_ORDER.indexOf("skewY");
          skew("y", args[1]);
        }
        break;
      case "skewX":
        if (!step("skewX")) return null;
        skew("x", args[0]);
        break;
      case "skewY":
        if (!step("skewY")) return null;
        skew("y", args[0]);
        break;
      case "scale":
        if (!step("scale") || args.length > 2) return null;
        if (args.length === 1 || normalize(args[0]) === normalize(args[1])) scaleAxis("", args[0]);
        else {
          scaleAxis("-x", args[0]);
          scaleAxis("-y", args[1]);
        }
        break;
      case "scaleX":
      case "scaleY":
        if (lastStep > TRANSFORM_ORDER.indexOf("scale")) return null;
        lastStep = TRANSFORM_ORDER.indexOf("scale");
        scaleAxis(name === "scaleX" ? "-x" : "-y", args[0]);
        break;
      default:
        // matrix(), 3D functions and perspective() have no v3 utilities.
        return null;
    }
  }
  return classes;
};

// --- transitions --------------------------------------------------------------------------------

// CSS keywords map to Tailwind's curves of the same name (Tailwind's are slightly different beziers).
const EASING_KEYWORDS: Record<string, string> = {
  linear: "ease-linear", "ease-in": "ease-in", "ease-out": "ease-out", "ease-in-out": "ease-in-out",
};

const timingFunction: Handler = (value) => {
  const keyword = EASING_KEYWORDS[value.trim().toLowerCase()];
  if (keyword) return [keyword];
  return [scaleClass("ease", theme.transitionTimingFunction, value, { noDefault: true })];
};

const transitionProperty: Handler = (value) => {
  const key = findKey(theme.transitionProperty, value);
  if (key) return [key === "DEFAULT" ? "transition" : `transition-${key}`];
  return [`transition-[${arbitrary(value)}]`];
};

const duration = scale("duration", theme.transitionDuration, { noDefault: true });
const delay = scale("delay", theme.transitionDelay, { noDefault: true });

/** Single-transition shorthand: "opacity 200ms ease-out 50ms". Several comma-separated transitions fall back. */
const transition: Handler = (value) => {
  if (splitTopLevel(value, ",").length > 1) return null;
  if (value.trim().toLowerCase() === "none") return ["transition-none"];
  let property: string | null = null;
  const times: string[] = [];
  let easing: string | null = null;
  for (const token of splitTopLevel(value)) {
    if (isTime(token)) times.push(token);
    else if (/^(ease|ease-in|ease-out|ease-in-out|linear|step-start|step-end)$/i.test(token) || /^(cubic-bezier|steps)\(/i.test(token))
      easing = token;
    else if (!property) property = token;
    else return null;
  }
  const classes = transitionProperty(property ?? "all")!;
  if (times[0]) classes.push(...duration(times[0])!);
  if (easing) classes.push(...timingFunction(easing)!);
  if (times[1]) classes.push(...delay(times[1])!);
  return classes;
};

const animation: Handler = (value) => {
  const key = findKey(theme.animation, value);
  return [key ? `animate-${key}` : `animate-[${arbitrary(value)}]`];
};

// --- flexbox & grid -----------------------------------------------------------------------------

const FLEX_DIRECTION: Record<string, string> = {
  row: "flex-row", "row-reverse": "flex-row-reverse", column: "flex-col", "column-reverse": "flex-col-reverse",
};
const FLEX_WRAP: Record<string, string> = { wrap: "flex-wrap", "wrap-reverse": "flex-wrap-reverse", nowrap: "flex-nowrap" };

const FLEX_KEYWORDS: Record<string, string> = { none: "none", auto: "1 1 auto", initial: "0 1 auto" };

/** Expands the flex shorthand to "grow shrink basis" so it can be compared with the theme. */
const flex: Handler = (value) => {
  const v = value.trim().toLowerCase();
  const isNumber = (t: string) => /^\d*\.?\d+$/.test(t);
  const parts = splitTopLevel(v);
  let expanded: string;
  if (FLEX_KEYWORDS[v]) expanded = FLEX_KEYWORDS[v];
  else if (parts.length === 1) expanded = isNumber(parts[0]) ? `${parts[0]} 1 0%` : `1 1 ${parts[0]}`;
  else if (parts.length === 2) expanded = isNumber(parts[1]) ? `${parts[0]} ${parts[1]} 0%` : `${parts[0]} 1 ${parts[1]}`;
  else if (parts.length === 3) expanded = v;
  else return null;
  // A zero basis is the same with or without a unit.
  expanded = expanded.replace(/ (0|0px)$/, " 0%");
  const key = findKey(theme.flex, expanded);
  return [key ? `flex-${key}` : `flex-[${arbitrary(expanded)}]`];
};

const gap: Handler = (value) => {
  const parts = splitTopLevel(value);
  if (parts.length === 1 || (parts.length === 2 && normalize(parts[0]) === normalize(parts[1])))
    return [scaleClass("gap", theme.gap, parts[0])];
  if (parts.length !== 2) return null;
  return [scaleClass("gap-y", theme.gap, parts[0]), scaleClass("gap-x", theme.gap, parts[1])];
};

/** grid-column / grid-row: "span 2", "1 / -1", "2 / 4". */
const gridLine =
  (prefix: "col" | "row", spans: Record<string, string>, starts: Record<string, string>, ends: Record<string, string>): Handler =>
  (value) => {
    const v = normalize(value);
    const asSpan = /^span \d+$/.test(v) ? `${v} / ${v}` : v;
    const key = findKey(spans, asSpan);
    if (key) return [`${prefix}-${key}`];
    const lines = v.split(" / ");
    if (lines.length === 2 && lines.every((l) => /^-?\d+$/.test(l) || l === "auto")) {
      return [scaleClass(`${prefix}-start`, starts, lines[0]), scaleClass(`${prefix}-end`, ends, lines[1])];
    }
    return [`${prefix}-[${arbitrary(value)}]`];
  };

const GRID_FLOW: Record<string, string> = {
  row: "grid-flow-row", column: "grid-flow-col", dense: "grid-flow-dense",
  "row dense": "grid-flow-row-dense", "column dense": "grid-flow-col-dense",
};

const JUSTIFY_CONTENT: Record<string, string> = {
  normal: "justify-normal", start: "justify-start", "flex-start": "justify-start", left: "justify-start",
  end: "justify-end", "flex-end": "justify-end", right: "justify-end", center: "justify-center",
  "space-between": "justify-between", "space-around": "justify-around", "space-evenly": "justify-evenly",
  stretch: "justify-stretch",
};
const ALIGN_ITEMS: Record<string, string> = {
  start: "items-start", "flex-start": "items-start", end: "items-end", "flex-end": "items-end",
  center: "items-center", baseline: "items-baseline", stretch: "items-stretch",
};
const ALIGN_CONTENT: Record<string, string> = {
  normal: "content-normal", center: "content-center", start: "content-start", "flex-start": "content-start",
  end: "content-end", "flex-end": "content-end", "space-between": "content-between",
  "space-around": "content-around", "space-evenly": "content-evenly", baseline: "content-baseline",
  stretch: "content-stretch",
};
const ALIGN_SELF: Record<string, string> = {
  auto: "self-auto", start: "self-start", "flex-start": "self-start", end: "self-end", "flex-end": "self-end",
  center: "self-center", stretch: "self-stretch", baseline: "self-baseline",
};
const PLACE_CONTENT: Record<string, string> = {
  center: "place-content-center", start: "place-content-start", end: "place-content-end",
  "space-between": "place-content-between", "space-around": "place-content-around",
  "space-evenly": "place-content-evenly", baseline: "place-content-baseline", stretch: "place-content-stretch",
};

const aspectRatio: Handler = (value) => {
  const v = normalize(value);
  const ratio = /^\d*\.?\d+$/.test(v) ? `${v} / 1` : v;
  const key = findKey(theme.aspectRatio, ratio);
  return [key ? `aspect-${key}` : `aspect-[${ratio.replace(/\s+/g, "")}]`];
};

const overflow =
  (prefix: string): Handler =>
  (value) => {
    const allowed = ["auto", "hidden", "clip", "visible", "scroll"];
    const parts = splitTopLevel(value.toLowerCase());
    if (!parts.every((p) => allowed.includes(p))) return null;
    if (parts.length === 1) return [`${prefix}-${parts[0]}`];
    if (parts.length === 2 && prefix === "overflow") {
      if (parts[0] === parts[1]) return [`overflow-${parts[0]}`];
      return [`overflow-x-${parts[0]}`, `overflow-y-${parts[1]}`];
    }
    return null;
  };

const overscroll = (prefix: string) => keywords(sameNames(prefix, ["auto", "contain", "none"]));

const borderSpacing: Handler = (value) => {
  const parts = splitTopLevel(value);
  if (parts.length === 1 || normalize(parts[0]) === normalize(parts[1]))
    return [scaleClass("border-spacing", theme.borderSpacing, parts[0])];
  if (parts.length !== 2) return null;
  return [scaleClass("border-spacing-x", theme.borderSpacing, parts[0]), scaleClass("border-spacing-y", theme.borderSpacing, parts[1])];
};

const scrollSnapType: Handler = (value) => {
  const map: Record<string, string> = {
    none: "snap-none", x: "snap-x", y: "snap-y", both: "snap-both", mandatory: "snap-mandatory", proximity: "snap-proximity",
  };
  const classes = splitTopLevel(value.toLowerCase()).map((t) => map[t]);
  return classes.every(Boolean) ? classes : null;
};

const fontVariantNumeric: Handler = (value) => {
  const map: Record<string, string> = sameNames("", [
    "ordinal", "slashed-zero", "lining-nums", "oldstyle-nums", "proportional-nums", "tabular-nums",
    "diagonal-fractions", "stacked-fractions",
  ]);
  map.normal = "normal-nums";
  const classes = splitTopLevel(value.toLowerCase()).map((t) => map[t]);
  return classes.every(Boolean) ? classes : null;
};

// --- the table ----------------------------------------------------------------------------------

export const PROPERTY_HANDLERS: Record<string, Handler> = {
  // Layout
  display: keywords({
    ...sameNames("", [
      "block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption",
      "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group",
      "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item",
    ]),
    none: "hidden",
  }),
  position: keywords(sameNames("", ["static", "fixed", "absolute", "relative", "sticky"])),
  inset: boxShorthand(
    { "": "inset", x: "inset-x", y: "inset-y", t: "top", r: "right", b: "bottom", l: "left" },
    theme.inset,
    true
  ),
  top: scale("top", theme.inset, { negative: true }),
  right: scale("right", theme.inset, { negative: true }),
  bottom: scale("bottom", theme.inset, { negative: true }),
  left: scale("left", theme.inset, { negative: true }),
  "inset-inline": logicalPair("inset-x", "start", "end", theme.inset, true),
  "inset-block": logicalPair("inset-y", "top", "bottom", theme.inset, true),
  "inset-inline-start": scale("start", theme.inset, { negative: true }),
  "inset-inline-end": scale("end", theme.inset, { negative: true }),
  "z-index": scale("z", theme.zIndex, { negative: true }),
  visibility: keywords({ visible: "visible", hidden: "invisible", collapse: "collapse" }),
  float: keywords(sameNames("float", ["left", "right", "none"])),
  clear: keywords(sameNames("clear", ["left", "right", "both", "none"])),
  "box-sizing": keywords({ "border-box": "box-border", "content-box": "box-content" }),
  isolation: keywords({ isolate: "isolate", auto: "isolation-auto" }),
  "object-fit": keywords(sameNames("object", ["contain", "cover", "fill", "none", "scale-down"])),
  "object-position": (v) => {
    const key = findKey(theme.objectPosition, v);
    return [key ? `object-${key}` : `object-[${arbitrary(v)}]`];
  },
  overflow: overflow("overflow"),
  "overflow-x": overflow("overflow-x"),
  "overflow-y": overflow("overflow-y"),
  "overscroll-behavior": overscroll("overscroll"),
  "overscroll-behavior-x": overscroll("overscroll-x"),
  "overscroll-behavior-y": overscroll("overscroll-y"),
  "aspect-ratio": aspectRatio,
  columns: scale("columns", theme.columns),
  "box-decoration-break": keywords(sameNames("box-decoration", ["slice", "clone"])),

  // Flexbox & grid
  "flex-direction": keywords(FLEX_DIRECTION),
  "flex-wrap": keywords(FLEX_WRAP),
  "flex-flow": (v) => {
    const classes = splitTopLevel(v.toLowerCase()).map((t) => FLEX_DIRECTION[t] ?? FLEX_WRAP[t]);
    return classes.every(Boolean) ? classes : null;
  },
  flex,
  "flex-grow": scale("grow", theme.flexGrow),
  "flex-shrink": scale("shrink", theme.flexShrink),
  "flex-basis": scale("basis", theme.flexBasis),
  order: scale("order", theme.order, { negative: true }),
  gap,
  "row-gap": scale("gap-y", theme.gap),
  "column-gap": scale("gap-x", theme.gap),
  "grid-template-columns": scale("grid-cols", theme.gridTemplateColumns),
  "grid-template-rows": scale("grid-rows", theme.gridTemplateRows),
  "grid-column": gridLine("col", theme.gridColumn, theme.gridColumnStart, theme.gridColumnEnd),
  "grid-row": gridLine("row", theme.gridRow, theme.gridRowStart, theme.gridRowEnd),
  "grid-column-start": scale("col-start", theme.gridColumnStart),
  "grid-column-end": scale("col-end", theme.gridColumnEnd),
  "grid-row-start": scale("row-start", theme.gridRowStart),
  "grid-row-end": scale("row-end", theme.gridRowEnd),
  "grid-auto-flow": (v) => keywords(GRID_FLOW)(normalize(v)),
  "grid-auto-columns": scale("auto-cols", theme.gridAutoColumns),
  "grid-auto-rows": scale("auto-rows", theme.gridAutoRows),
  "justify-content": keywords(JUSTIFY_CONTENT),
  "justify-items": keywords(sameNames("justify-items", ["start", "end", "center", "stretch"])),
  "justify-self": keywords(sameNames("justify-self", ["auto", "start", "end", "center", "stretch"])),
  "align-items": keywords(ALIGN_ITEMS),
  "align-content": keywords(ALIGN_CONTENT),
  "align-self": keywords(ALIGN_SELF),
  "place-content": keywords(PLACE_CONTENT),
  "place-items": keywords(sameNames("place-items", ["start", "end", "center", "baseline", "stretch"])),
  "place-self": keywords(sameNames("place-self", ["auto", "start", "end", "center", "stretch"])),

  // Spacing
  margin: boxShorthand(sidePrefixes("m"), marginScale, true),
  "margin-top": scale("mt", marginScale, { negative: true }),
  "margin-right": scale("mr", marginScale, { negative: true }),
  "margin-bottom": scale("mb", marginScale, { negative: true }),
  "margin-left": scale("ml", marginScale, { negative: true }),
  "margin-inline": logicalPair("mx", "ms", "me", marginScale, true),
  "margin-block": logicalPair("my", "mt", "mb", marginScale, true),
  "margin-inline-start": scale("ms", marginScale, { negative: true }),
  "margin-inline-end": scale("me", marginScale, { negative: true }),
  padding: boxShorthand(sidePrefixes("p"), paddingScale, false),
  "padding-top": scale("pt", paddingScale),
  "padding-right": scale("pr", paddingScale),
  "padding-bottom": scale("pb", paddingScale),
  "padding-left": scale("pl", paddingScale),
  "padding-inline": logicalPair("px", "ps", "pe", paddingScale, false),
  "padding-block": logicalPair("py", "pt", "pb", paddingScale, false),
  "padding-inline-start": scale("ps", paddingScale),
  "padding-inline-end": scale("pe", paddingScale),

  // Sizing
  width: scale("w", theme.width),
  height: scale("h", theme.height),
  "min-width": scale("min-w", theme.minWidth),
  "max-width": scale("max-w", theme.maxWidth),
  "min-height": scale("min-h", theme.minHeight),
  "max-height": scale("max-h", theme.maxHeight),

  // Typography
  "font-family": fontFamily,
  "font-size": fontSize,
  "font-weight": fontWeight,
  "font-style": keywords({ italic: "italic", normal: "not-italic" }),
  "font-variant-numeric": fontVariantNumeric,
  "-webkit-font-smoothing": keywords({ antialiased: "antialiased", auto: "subpixel-antialiased" }),
  "-moz-osx-font-smoothing": keywords({ grayscale: "antialiased", auto: "subpixel-antialiased" }),
  "line-height": lineHeight,
  "letter-spacing": letterSpacing,
  "text-align": keywords(sameNames("text", ["left", "center", "right", "justify", "start", "end"])),
  color: color("text"),
  "text-decoration": textDecoration,
  "text-decoration-line": textDecoration,
  "text-decoration-color": color("decoration"),
  "text-decoration-style": keywords(sameNames("decoration", DECORATION_STYLES)),
  "text-decoration-thickness": scale("decoration", theme.textDecorationThickness),
  "text-underline-offset": scale("underline-offset", theme.textUnderlineOffset),
  "text-transform": keywords({ uppercase: "uppercase", lowercase: "lowercase", capitalize: "capitalize", none: "normal-case" }),
  "text-overflow": keywords({ ellipsis: "text-ellipsis", clip: "text-clip" }),
  "text-indent": scale("indent", theme.textIndent, { negative: true }),
  "vertical-align": either(
    keywords(sameNames("align", ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super"])),
    (v) => [`align-[${arbitrary(v)}]`]
  ),
  "white-space": keywords(sameNames("whitespace", ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"])),
  "word-break": keywords({ "break-all": "break-all", "keep-all": "break-keep", normal: "break-normal" }),
  "overflow-wrap": keywords({ "break-word": "break-words" }),
  "word-wrap": keywords({ "break-word": "break-words" }),
  hyphens: keywords(sameNames("hyphens", ["none", "manual", "auto"])),
  "list-style": listStyle,
  "list-style-type": (v) => {
    const key = findKey(theme.listStyleType, v);
    return [key ? `list-${key}` : `list-[${arbitrary(v)}]`];
  },
  "list-style-position": keywords({ inside: "list-inside", outside: "list-outside" }),
  "-webkit-line-clamp": either(keywords({ none: "line-clamp-none" }), scale("line-clamp", theme.lineClamp)),
  "line-clamp": either(keywords({ none: "line-clamp-none" }), scale("line-clamp", theme.lineClamp)),
  content,

  // Backgrounds
  background,
  "background-color": color("bg"),
  "background-image": backgroundImage,
  "background-size": backgroundSize,
  "background-position": backgroundPosition,
  "background-repeat": keywords(BG_REPEAT),
  "background-attachment": keywords(BG_ATTACHMENT),
  "background-clip": keywords({
    "border-box": "bg-clip-border", "padding-box": "bg-clip-padding", "content-box": "bg-clip-content", text: "bg-clip-text",
  }),
  "background-origin": keywords({
    "border-box": "bg-origin-border", "padding-box": "bg-origin-padding", "content-box": "bg-origin-content",
  }),
  "background-blend-mode": keywords(sameNames("bg-blend", BLEND_MODES)),

  // Borders
  border: borderShorthand(""),
  "border-top": borderShorthand("t"),
  "border-right": borderShorthand("r"),
  "border-bottom": borderShorthand("b"),
  "border-left": borderShorthand("l"),
  "border-width": (v) => {
    const sides = expandBox(v);
    if (!sides) return null;
    return boxClasses(sides, (side, w) => scaleClass(side ? `border-${side}` : "border", theme.borderWidth, w));
  },
  "border-top-width": scale("border-t", theme.borderWidth),
  "border-right-width": scale("border-r", theme.borderWidth),
  "border-bottom-width": scale("border-b", theme.borderWidth),
  "border-left-width": scale("border-l", theme.borderWidth),
  "border-style": keywords(sameNames("border", BORDER_STYLES)),
  "border-color": (v) => {
    const sides = expandBox(v);
    if (!sides) return null;
    return boxClasses(sides, (side, c) => colorClass(side ? `border-${side}` : "border", c));
  },
  "border-top-color": color("border-t"),
  "border-right-color": color("border-r"),
  "border-bottom-color": color("border-b"),
  "border-left-color": color("border-l"),
  "border-radius": radiusCorners,
  "border-top-left-radius": scale("rounded-tl", theme.borderRadius),
  "border-top-right-radius": scale("rounded-tr", theme.borderRadius),
  "border-bottom-right-radius": scale("rounded-br", theme.borderRadius),
  "border-bottom-left-radius": scale("rounded-bl", theme.borderRadius),
  "border-collapse": keywords({ collapse: "border-collapse", separate: "border-separate" }),
  "border-spacing": borderSpacing,
  "table-layout": keywords({ auto: "table-auto", fixed: "table-fixed" }),
  "caption-side": keywords({ top: "caption-top", bottom: "caption-bottom" }),
  outline: outlineShorthand,
  "outline-width": scale("outline", theme.outlineWidth),
  "outline-style": keywords(OUTLINE_STYLES),
  "outline-color": color("outline"),
  "outline-offset": scale("outline-offset", theme.outlineOffset),

  // Effects & filters
  "box-shadow": boxShadow,
  opacity,
  "mix-blend-mode": keywords(sameNames("mix-blend", [...BLEND_MODES, "plus-lighter"])),
  filter: filterList(""),
  "backdrop-filter": filterList("backdrop-"),

  // Transforms
  transform,
  "transform-origin": (v) => {
    const key = findKey(theme.transformOrigin, v);
    return [key ? `origin-${key}` : `origin-[${arbitrary(v)}]`];
  },

  // Transitions & animation
  transition,
  "transition-property": transitionProperty,
  "transition-duration": duration,
  "transition-timing-function": timingFunction,
  "transition-delay": delay,
  animation,
  "will-change": (v) => {
    const key = findKey(theme.willChange, v);
    return [key ? `will-change-${key}` : `will-change-[${arbitrary(v)}]`];
  },

  // Interactivity
  cursor: (v) => {
    const key = findKey(theme.cursor, v);
    return [key ? `cursor-${key}` : `cursor-[${arbitrary(v)}]`];
  },
  "pointer-events": keywords({ none: "pointer-events-none", auto: "pointer-events-auto" }),
  resize: keywords({ none: "resize-none", both: "resize", vertical: "resize-y", horizontal: "resize-x" }),
  "user-select": keywords(sameNames("select", ["none", "text", "all", "auto"])),
  "scroll-behavior": keywords({ auto: "scroll-auto", smooth: "scroll-smooth" }),
  "scroll-snap-type": scrollSnapType,
  "scroll-snap-align": keywords({ start: "snap-start", end: "snap-end", center: "snap-center", none: "snap-align-none" }),
  "scroll-snap-stop": keywords({ normal: "snap-normal", always: "snap-always" }),
  appearance: keywords({ none: "appearance-none" }),
  "touch-action": keywords(
    sameNames("touch", ["auto", "none", "pan-x", "pan-left", "pan-right", "pan-y", "pan-up", "pan-down", "pinch-zoom", "manipulation"])
  ),
  "accent-color": either(keywords({ auto: "accent-auto" }), color("accent")),
  "caret-color": color("caret"),

  // SVG
  fill: either(keywords({ none: "fill-none" }), color("fill")),
  stroke: either(keywords({ none: "stroke-none" }), color("stroke")),
  "stroke-width": scale("stroke", theme.strokeWidth),
};
