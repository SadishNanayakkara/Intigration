# IntegralMaster: Integration by Parts

Explore how the LIATE rule helps you choose which part of a product becomes **u** and which becomes **dv**, supporting conceptual understanding in line with modern technology‑in‑mathematics education.

> Built with **React (Vite)** and **Tailwind CSS** in a dark, glassmorphism‑inspired UI.

---

## ✨ Preview



<img width="2878" height="1614" alt="image" src="https://github.com/user-attachments/assets/0694e792-550a-4891-918c-3592ce698bcd" />


---

## 🧠 What Is IntegralMaster?

**IntegralMaster** is an interactive visual tool for **Integration by Parts**. Instead of silently doing the algebra, it focuses on the _decision step_: choosing which factor of a product should be **u** (to differentiate) and which should be **dv** (to integrate).

The app uses the **LIATE rule**:

> **L**ogarithmic → **I**nverse trig → **A**lgebraic → **T**rig → **E**xponential

Given an expression like `x * ln(x)` or `e^x * x^2`, IntegralMaster:

1. Splits the integrand into factors.
2. Classifies each factor as Logarithmic / Inverse Trig / Algebraic / Trig / Exponential.
3. Chooses **u** from the highest‑priority LIATE category.
4. Groups the remaining factor(s) into **dv**.

The emphasis is on **transparency and reasoning**, not on outsourcing the whole solution.

---

## 🎯 Key Features

- **LIATE Rule Identifier**
  - Type a product like `x * ln(x)` or `x * sin(x)`.
  - See which factor becomes **u** and which becomes **dv** according to LIATE.

- **Dark, Glassmorphism UI**
  - Modern dark theme with blue / purple accents.
  - Glossy cards, soft glows, and pill‑shaped tags for u and dv.

- **Visual Formula Panel**
  - Highlights the core formula:

    > ∫ u dv = uv − ∫ v du

  - Color‑coded **u**, **v**, **du**, and **dv** for quick recognition.

- **Factor Classification Chips**
  - Each factor is tagged as **Logarithmic**, **Algebraic**, **Trig**, **Exponential**, etc.
  - Helps students practice identifying categories instead of memorizing blindly.

- **Education‑First Design**
  - Text explanations emphasize _why_ a choice is made.
  - Encourages experimentation: change the integrand and observe how LIATE responds.

---

## 🧩 How the LIATE Logic Works

Implementation: [`src/liateLogic.js`](src/liateLogic.js)

1. **Parse the expression**
   - Splits the input on `*` to get a list of factors.

2. **Classify each factor**
   - Checks for common patterns:
     - `ln`, `log` → **Logarithmic**
     - `arcsin`, `arccos`, `arctan`, … → **Inverse Trig**
     - `sin`, `cos`, `tan`, … → **Trig**
     - `exp(x)`, `e^x`, etc. → **Exponential**
     - Anything else non‑empty → **Algebraic** (by default)

3. **Apply LIATE priority**
   - Search factors in the order `L > I > A > T > E`.
   - The first match becomes **u**.
   - The product of the remaining factors becomes **dv**.

4. **Surface the result visually**
   - Colored badges show which factor was chosen as **u** and **dv**.
   - Additional chips summarize how each factor was classified.

This simple rule‑based classification is meant for **learning** and **discussion**, not as a full symbolic CAS.

---

## 🛠 Tech Stack

- **Frontend:** React 18 (Vite)
- **Styling:** Tailwind CSS
- **Tooling:** Vite dev server, PostCSS, Autoprefixer

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SadishNanayakkara/Intigration.git
cd Intigration
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173/`).

---

## 📚 Classroom & Self‑Study Ideas

- **Prediction first:** Ask students to choose **u** and **dv** themselves, then use the app to compare with LIATE.
- **Category practice:** Give a list of factors and let students classify them as L, I, A, T, or E before typing them into the tool.
- **What if…:** Change the order of factors (e.g., `ln(x) * x` vs `x * ln(x)`) and discuss why the LIATE choice for **u** stays the same.
- **Link to full solutions:** After selecting **u** and **dv**, continue by hand (or in a CAS) to compute the full integral.

The goal is to **make thinking visible**, not to hide it behind automation.

---

## 🤝 Contributing

Suggestions, issues, or ideas for new visualizations are welcome!

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/my-idea`.
3. Commit your changes and open a pull request.

---

## 📄 License

This project is for educational use. Feel free to use and adapt it in your own teaching or learning environments. (Add a formal license here if you choose, for example MIT.)
