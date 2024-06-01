# ReactPokemon

Pokemon list first generation

This project was generated with [Vite](https://vitejs.dev/guide/) version 5.2.11
`npm install -g vite` and `npm create vite@latest react-pokemon -- --template react-ts`
Node - Version 20.12.2
Npm - Version 10.5.0

## Development server

Run `npm run dev` for a dev server and navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Errors

> If Husky doesn't work on MacOS, run the command (Within the project): _`chmod ug+x .husky/*`_

> If you need see prettier console objects in testing, use this: `console.log(JSON.stringify(obj, undefined, 2));`

## Commits

Structure for commits:

> _`Subject is sentence-case`_ 

- `feat: Subject`
- `fix: Subject`
- `styles: Subject`
- `docs: Subject`
- `test: Subject`
- `refactor: Subject`

## Husky & Lint Staged

Install & configure Husky (Git Hooks), Lint Staged (Commits Staged Linter), Commit Lint (Conventional Commits) and Prettier (Code Rules)

- `npm i -D husky lint-staged @commitlint/types @commitlint/cli @commitlint/config-conventional prettier eslint-plugin-react@latest`
- Script and Exec (Once) -> `"prepare": "husky install"` (That will create _`.husky`_ folder in the root)
- Exec -> `npx eslint --init` (See file _`.eslintrc.json`_ & _`.lintstagedrc`_)
- (Optional) Script -> `"lint": "eslint ."` (Exec linter)
- (Optional) Script -> `"lint:fix": "eslint --fix ."` (Fix errors by linter)
- (Optional) Script -> `"lint:commit": "npx lint-staged"` (Exec linter but only files in staged)
- (Optional) Script -> `"pretier": "prettier . --write"` (Exec prettier for all files). (Add file _`.prettierrc.json`_ and _`.editorconfig`_)
- Create _`commitlint.config.ts`_ and configure.
- Create a git hook to make a commit-msg and thus run a regular expression validator before each commit
  - (Old version) `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'`
  - (New version) `echo "npx --no -- commitlint --edit \${1}" > .husky/commit-msg`
- Create a git hook to do a pre-commit and this run the lint-staged (prettier and eslint) and test before each commit
  - Script -> `"test:staged": "git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false"`
    - `git diff` Show changes in files
    - `--cached` Only files in staged
    - `--diff-filter=d` Ignore files spec deleted
    - `--name-only` Only names of files
    - `'*.test.ts'` Only files test.ts
    - `|` Redirect before command to after command
    - `xargs` Take a list of elements and pass like arguments to another command
    - `-I {}` Save list of elements in {}
    - `npm run test` Exec test
    - `--include={}` Include save list of elements to testing each
    - `--browsers=ChromeHeadless` Tests must be proved in browser chrome headless (Exec chrome without GUI)
    - `--watch=false` Don't open browser window
  - (Old version) `npx husky add .husky/pre-commit "npx lint-staged && git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false"`
  - (New version) `echo "npx lint-staged && git diff --cached --diff-filter=d --name-only -- '*.test.tsx' | xargs -I {} npm run test --include={} --browsers=ChromeHeadless --watch=false" > .husky/pre-commit`
- Create a git hook to do a pre-push and this run HERE ANYTHING COMMAND each push
  - (Old version) `npx husky add .husky/pre-push "#HERE ANYTHING COMMAND"`
  - (New version) `echo "#HERE ANYTHING COMMAND" > .husky/pre-push`

## Testing

Jest to testing application

- `npm install --save-dev jest @types/jest jest-transform-stub @testing-library/react @testing-library/jest-dom @babel/preset-env @babel/preset-react react-test-renderer ts-jest jest-environment-jsdom @types/jest @babel/preset-typescript babel-plugin-transform-import-meta @babel/plugin-transform-runtime babel-plugin-transform-vite-meta-env`
- Create file _`jest.config.cjs`_ and paste this:
  module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": [
        "ts-jest",
        {
          tsconfig: false,
          useESM: true,
          babelConfig: true,
          plugins: ["babel-plugin-transform-vite-meta-env"],
        }
      ],
    }
  };
- Create file _`babel.config.cjs`_ and paste this:
  module.exports = function (api) {
    api.cache(true);
    const presets = [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
      "@babel/preset-react",
    ];
    return {
      presets,
      plugins: [
        "@babel/plugin-transform-runtime",
        "babel-plugin-transform-import-meta",
        "babel-plugin-transform-vite-meta-env",
      ],
    };
  };

- Add to package.json script `"test": "jest"`

## Aliases

Config Alias to import files

- Add in _`tsconfig.json`_:
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"],
    "@components/*": ["src/components/*"],
    "@otherFolder/*": ["src/otherFolder/*"]
  }
- Add in _`vite.config.ts`_
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@otherFolder': path.resolve(__dirname, './src/otherFolder')
    }
  }
- Add in _`jest.config.cjs`_
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@otherFolder/(.*)$': '<rootDir>/src/otherFolder/$1'
  }


> Developed By: __`Diego Villa`__. - Website: [https://www.cabuweb.com](https://www.cabuweb.com)