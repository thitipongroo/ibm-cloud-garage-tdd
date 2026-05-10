# IBM Cloud Garage — TDD Exercises

[![Tests](https://img.shields.io/badge/tests-Jest%2029-green)](https://jestjs.io)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)

A hands-on TDD workshop using **Jest 29** and **Babel** on Node.js, following the Four Rules of Simple Design and the Transformation Priority Premise.

---

## Architecture

```text
Developer commits code
         │
         ▼ git commit
  ┌──────────────────┐
  │  Husky pre-commit │  ← blocks commit on failure
  │   hook (npm test) │
  └────────┬─────────┘
           │ passes
           ▼
  ┌──────────────────────────────┐
  │         Jest 29 Runner       │
  │                              │
  │  *.spec.js / *.test.js       │
  │  __tests__/ directories      │
  │                              │
  │  Babel transpiles ES2015+    │
  │  to CommonJS on the fly      │
  └────────────┬─────────────────┘
               │
       ┌───────┴──────────┐
       ▼                  ▼
  Test Results       Coverage Report
  (stdout)           (lcov / text)
  PASS / FAIL        server/**/*.js
```

---

## Tech Stack

| Tool | Version | Why |
| ---- | ------- | --- |
| [Jest](https://jestjs.io) | ^29.x | Batteries-included: runner, assertions, mocks, coverage — no glue config needed |
| [@babel/preset-env](https://babeljs.io) | ^7.x | Transpiles modern JS (`import`/`export`, optional chaining) to what the Node target supports |
| [Husky](https://typicode.github.io/husky) | ^9.x | Hooks are installed automatically on `npm install` via the `prepare` script — no manual setup |

**Why Jest over Mocha/Chai?**
Mocha requires wiring in a separate assertion library (Chai) and a coverage tool (nyc). Jest ships all three plus snapshot testing and fake timers in one dependency. For a workshop that should start immediately, Jest removes friction.

---

## Project Structure

```text
ibm-cloud-garage-tdd/
├── server/
│   ├── 00-canary/
│   │   └── canary.spec.js          # Sanity test — confirm Jest is working
│   ├── 01-*/                       # Exercises 01–N, one directory each
│   │   ├── *.js                    # Implementation file
│   │   └── *.spec.js               # Test file
│   └── ...
├── .babel.config.json              # { "presets": ["@babel/preset-env"] }
├── .husky/
│   └── pre-commit                  # npm test
├── .nvmrc                          # Pins Node version (≥20)
└── package.json
```

---

## System Flow

```text
1. Clone repo & npm install
      ↓ Husky installs .husky/pre-commit hook automatically
2. Open an exercise directory (server/NN-*)
3. Read the failing spec → understand the requirement
4. Write the minimum implementation to make it pass (Red → Green)
5. Refactor without breaking tests (Green → Refactor)
6. git commit
      ↓ Husky pre-commit fires npm test
      ↓ All tests must pass before commit is accepted
7. Repeat for the next exercise
```

---

## Running Tests

| Command | Description |
| ------- | ----------- |
| `npm test` | Run all tests once — use before committing or in CI |
| `npm run tdd` | Watch mode — reruns only tests related to changed files |
| `npm run test:coverage` | Run all tests and generate a coverage report |

---

## Setup

### 1. Clone

```bash
git clone git@github.com:thitipongroo/ibm-cloud-garage-tdd.git
cd ibm-cloud-garage-tdd
```

### 2. Install Node.js (v20+)

```bash
# Mac / Linux — nvm picks the version from .nvmrc
nvm use

# Windows — download from nodejs.org
```

### 3. Install dependencies

```bash
npm install   # also installs Husky pre-commit hook
```

---

## Pre-commit Hook

Husky enforces a quality gate on every commit:

```bash
# .husky/pre-commit
npm test
```

If any test fails, the commit is rejected. The hook is installed automatically on `npm install` — no extra setup needed.

---

## IDE Configuration

### VS Code

Install the [Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) for inline pass/fail indicators and one-click run/debug per test.

### IntelliJ / WebStorm

1. **Preferences → Language & Frameworks → JavaScript** — set version to **ECMAScript 6**.
2. **Preferences → Language & Frameworks → JavaScript → Libraries** — download and enable `jest` and `node`.

---

## TDD Principles in Practice

### Four Rules of Simple Design (Kent Beck)

1. **Passes the tests** — code does what the tests say
2. **Reveals intention** — names communicate purpose
3. **No duplication** — DRY at the logic level
4. **Fewest elements** — no premature abstractions

### Transformation Priority Premise (Uncle Bob)

Apply transformations in this order — simpler transformations first:

```text
(1) constant       a literal value
(2) scalar         a variable or argument
(3) invocation     calling a function
(4) conditional    if / switch / case
(5) while loop     for loops too
(6) assignment     mutating a variable's value
```

Prefer a higher-priority transformation when multiple can make a test pass — the result is simpler code.

---

## Tradeoffs

| Decision | Alternative | Reasoning |
| -------- | ----------- | --------- |
| `--onlyChanged` in watch mode | Run full suite | Speeds up the red-green-refactor loop during active development |
| Babel transpilation | Native ESM with `--experimental-vm-modules` | Babel is stable and well-supported in Jest 29; native ESM in Jest is still maturing |
| Husky pre-commit blocks commit | CI-only quality gate | Catches failures locally before they hit the remote — faster feedback loop for a workshop |

---

## Scaling Considerations

| Concern | Approach |
| ------- | -------- |
| Slow test suite as exercises grow | `jest --maxWorkers=50%` runs suites in parallel across CPU cores |
| Pinning Node version across machines | `.nvmrc` + nvm ensures consistent runtime — add a CI node-version matrix to catch regressions |
| Coverage regression | Add `coverageThreshold` in `package.json` to block merges below a minimum line coverage |
