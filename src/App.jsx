import React, { useState } from "react";
import { analyzeExpression } from "./liateLogic.js";

function Pill({ label, value, variant }) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border backdrop-blur-sm";
  const styles =
    variant === "u"
      ? "border-sky-400/50 bg-sky-400/10 text-sky-300"
      : variant === "dv"
        ? "border-violet-400/50 bg-violet-400/10 text-violet-300"
        : "border-slate-500/40 bg-slate-700/40 text-slate-200";

  return (
    <span className={`${base} ${styles}`}>
      <span className="uppercase tracking-wide text-[0.6rem] opacity-80">
        {label}
      </span>
      <span className="text-xs">{value}</span>
    </span>
  );
}

export default function App() {
  const [input, setInput] = useState("x * ln(x)");
  const [result, setResult] = useState(() => analyzeExpression("x * ln(x)"));

  const handleAnalyze = (e) => {
    e.preventDefault();
    setResult(analyzeExpression(input));
  };

  const { u, dv, factors, error } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-sm">
            IntegralMaster: Integration by Parts
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Explore how LIATE helps you choose which part of a product becomes{" "}
            <span className="text-sky-300 font-semibold">u</span> and which
            becomes <span className="text-violet-300 font-semibold">dv</span>,
            supporting conceptual understanding in line with modern
            technology-in-mathematics education.
          </p>
        </header>

        <main className="grid gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-start">
          {/* Left: Interaction panel */}
          <section className="bg-slate-900/60 border border-slate-700/60 rounded-3xl shadow-2xl shadow-sky-900/40 backdrop-blur-2xl p-6 md:p-7">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center justify-between">
              LIATE Rule Identifier
              <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-600/60 text-slate-300">
                L &gt; I &gt; A &gt; T &gt; E
              </span>
            </h2>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wide">
                Enter an integrand (product)
                <span className="block text-[0.7rem] text-slate-400 normal-case mt-1">
                  Example: <span className="text-sky-300">x * ln(x)</span>,{" "}
                  <span className="text-sky-300">e^x * x^2</span>,{" "}
                  <span className="text-sky-300">x * sin(x)</span>
                </span>
              </label>

              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-violet-500/10 blur-lg" />
                <div className="relative rounded-2xl bg-slate-900/80 border border-slate-600/70 shadow-inner shadow-black/40 flex items-center px-3">
                  <span className="text-slate-500 text-sm mr-2 select-none">
                    ∫
                  </span>
                  <input
                    className="w-full bg-transparent outline-none text-slate-50 placeholder:text-slate-500 text-sm md:text-base py-3"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type something like x * ln(x)"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 justify-between pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 hover:shadow-sky-700/50 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <span>Identify u and dv</span>
                </button>

                <div className="flex flex-wrap gap-2 text-[0.65rem] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    prefers log / inverse trig
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    remaining factor becomes dv
                  </span>
                </div>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-700/70 space-y-3">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em]">
                Result
              </h3>

              {error && (
                <div className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/40 rounded-2xl px-3 py-2 flex gap-2 items-start">
                  <span className="mt-[2px]">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {!error && u && dv && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      According to LIATE:
                    </span>
                    <Pill label="u" value={u.factor} variant="u" />
                    <Pill label="dv" value={dv.factor} variant="dv" />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    LIATE chooses{" "}
                    <span className="text-sky-300 font-semibold">u</span> from
                    the factor with the highest priority in the order
                    <span className="text-slate-100 font-semibold">
                      {" "}
                      Logarithmic → Inverse trig → Algebraic → Trig →
                      Exponential
                    </span>
                    . The remaining part of the product is grouped into{" "}
                    <span className="text-violet-300 font-semibold">dv</span>.
                  </p>

                  <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 px-3 py-2.5 text-[0.7rem] text-slate-300 space-y-1.5">
                    <div className="flex flex-wrap gap-1">
                      {factors.map((f, idx) => (
                        <Pill
                          key={`${f.factor}-${idx}`}
                          label={f.label}
                          value={f.factor}
                          variant={f === u ? "u" : "neutral"}
                        />
                      ))}
                    </div>
                    <p className="text-[0.65rem] text-slate-400">
                      Hover mentally over each factor: ask yourself which
                      category it belongs to (L, I, A, T, or E). This reinforces
                      conceptual classification rather than memorizing rules
                      mechanically.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right: Formula & explanation */}
          <section className="bg-slate-900/40 border border-slate-700/50 rounded-3xl shadow-xl shadow-black/40 backdrop-blur-2xl p-6 md:p-7 flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Formula Visual
            </h2>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 border border-slate-700/70 px-4 py-5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />

              <p className="text-xs text-slate-300 mb-3">
                Integration by parts:
              </p>
              <div className="text-lg md:text-xl font-semibold text-slate-50 mb-3">
                <span className="text-sky-300">∫ u dv</span> ={" "}
                <span className="text-sky-300">u</span>
                <span className="text-violet-300">v</span> −{" "}
                <span className="text-slate-200">∫</span>
                <span className="text-violet-300"> v</span>
                <span className="text-sky-300"> du</span>
              </div>

              <ul className="text-[0.7rem] text-slate-300 space-y-1.5">
                <li>
                  <span className="text-sky-300 font-semibold">u</span> is
                  chosen to become simpler when differentiated.
                </li>
                <li>
                  <span className="text-violet-300 font-semibold">dv</span> is
                  chosen so that it is easy to integrate to obtain{" "}
                  <span className="text-violet-300 font-semibold">v</span>.
                </li>
                <li>
                  LIATE guides which factor should be{" "}
                  <span className="text-sky-300 font-semibold">u</span>,
                  promoting a structured decision process.
                </li>
              </ul>
            </div>

            <div className="mt-2 text-[0.7rem] text-slate-300 space-y-2">
              <p>
                From a technology-in-mathematics-education perspective, the goal
                of this tool is not to do the integration for you, but to make
                the choice of{" "}
                <span className="text-sky-300 font-semibold">u</span> and{" "}
                <span className="text-violet-300 font-semibold">dv</span>{" "}
                visible, interactive, and discussable.
              </p>
              <p>
                Try changing the integrand and observe how the LIATE priority
                changes the selection. Use the tool to justify your own choices
                and to compare with what the rule suggests.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
