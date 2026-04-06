const LIATE_ORDER = [
  "logarithmic",
  "inverse-trig",
  "algebraic",
  "trig",
  "exponential",
];

function classifyFactor(raw) {
  const text = raw.trim();
  const lower = text.toLowerCase();

  if (/(ln|log)/.test(lower)) {
    return { factor: text, type: "logarithmic", label: "Logarithmic" };
  }

  if (/(arcsin|arccos|arctan|arccot|arcsec|arccsc)/.test(lower)) {
    return {
      factor: text,
      type: "inverse-trig",
      label: "Inverse Trigonometric",
    };
  }

  if (/(sin|cos|tan|cot|sec|csc)/.test(lower) && !/arc/.test(lower)) {
    return { factor: text, type: "trig", label: "Trigonometric" };
  }

  if (/exp\(|e\^|\^x/.test(lower)) {
    return { factor: text, type: "exponential", label: "Exponential" };
  }

  if (text.length > 0) {
    return { factor: text, type: "algebraic", label: "Algebraic" };
  }

  return { factor: text, type: "unknown", label: "Unknown" };
}

export function analyzeExpression(expression) {
  if (!expression || !expression.trim()) {
    return {
      u: null,
      dv: null,
      factors: [],
      error: "Please enter an expression involving a product.",
    };
  }

  const rawFactors = expression
    .split("*")
    .map((f) => f.trim())
    .filter(Boolean);

  if (rawFactors.length < 2) {
    return {
      u: null,
      dv: null,
      factors: [],
      error: "For LIATE, provide a product like x * ln(x) or e^x * x^2.",
    };
  }

  const classified = rawFactors.map(classifyFactor);

  let chosen = null;
  for (const kind of LIATE_ORDER) {
    const candidate = classified.find((f) => f.type === kind);
    if (candidate) {
      chosen = candidate;
      break;
    }
  }

  if (!chosen) {
    return {
      u: null,
      dv: null,
      factors: classified,
      error:
        "Could not classify the factors using LIATE. Try simpler notation.",
    };
  }

  const u = chosen;
  const remaining = classified
    .filter((f) => f !== chosen)
    .map((f) => f.factor)
    .join(" * ");

  const dv = {
    factor: remaining,
    type: "dv",
    label: "Remaining factor(s)",
  };

  return { u, dv, factors: classified, error: null };
}
