# IBM Cloud Garage — TDD Exercises

A hands-on TDD workshop using **Jest** and **Babel** on Node.js.

---

## Set up your project

### 1. Clone the repository

```bash
git clone git@github.com:thitipongroo/ibm-cloud-garage-tdd.git
cd ibm-cloud-garage-tdd
```

If you haven't set up SSH access to GitHub yet, follow [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

### 2. Install Node.js (v20 or above)

- **Mac/Linux:** Install [nvm](https://github.com/nvm-sh/nvm), then run `nvm use` in the project directory (the `.nvmrc` file pins the version automatically).
- **Windows:** Download and install Node.js from [nodejs.org](https://nodejs.org/en/download/).

### 3. Install dependencies

```bash
npm install
```

This installs Jest, Babel, and Husky — everything you need is already configured in `package.json`.

---

## Running tests

| Command | Description |
| --- | --- |
| `npm test` | Run all tests once (use this in CI / before committing) |
| `npm run tdd` | Watch mode — reruns tests related to changed files |
| `npm run test:coverage` | Run all tests and generate a coverage report |

---

## Pre-commit hooks

Husky is already configured. A `pre-commit` hook runs `npm test` automatically before every commit, preventing broken code from being committed.

No additional setup is required — the hook is installed when you run `npm install`.

---

## Configure your IDE

### VS Code

Install the [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) extension for inline test results and run/debug support.

### IntelliJ / WebStorm

In **Preferences**:

1. Under **Language & Frameworks > JavaScript**, set the JavaScript language version to **ECMAScript 6**.
2. Under **Language & Frameworks > JavaScript > Libraries**, download and enable both `jest` and `node`.

---

## Explore the canary test

Open `server/00-canary/canary.spec.js` and note:

1. Jest discovers test files named with a `.spec.js` or `.test.js` extension, or placed in a `__tests__` folder.

2. `describe` groups related tests into a suite. Suites can be nested.

3. `it` takes a description string and a function containing the test expectations.

4. `expect` gives you access to **matchers** that let you validate values. See the [Jest matchers docs](https://jestjs.io/docs/expect) for the full list.

5. The descriptions in `describe` and `it` blocks are combined in the test output — name them so the output reads like a requirements spec.

---

## Let's get started

Work through the exercises in order, applying the **Four Rules of Simple Design** and the **Transformation Priority Premise** as you go.

### [The Four Rules of Simple Design](https://martinfowler.com/bliki/BeckDesignRules.html)

- **Passes the tests**
- **Reveals intention**
- **No duplication**
- **Fewest elements**

### [Transformation Priority Premise](https://8thlight.com/blog/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html)

```text
(01) [{} –> nil]          no code => return nil
(02) [nil->constant]      nil => simple constant
(03) [constant->constant+] simple constant => complex constant
(04) [constant->scalar]   complex constant => variable or argument
(05) [statement->statements] adding unconditional statements
(06) [unconditional->if]  splitting the execution path
(07) [scalar->array]
(08) [array->container]
(09) [statement->recursion]
(10) [if->while]
(11) [expression->function] replacing an expression with a function or algorithm
(12) [variable->assignment] replacing the value of a variable
```

### [Simplified Transformation Priority Premise](https://8thlight.com/blog/micah-martin/2012/11/17/transformation-priority-premise-applied.html)

```text
(01) constant    => a value
(02) scalar      => a local binding, or variable
(03) invocation  => calling a function/method
(04) conditional => if/switch/case/cond
(05) while loop  => applies to for loops as well
(06) assignment  => replacing the value of a variable
```
