/* eslint-env node */
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
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@interceptor/(.*)$': '<rootDir>/src/interceptor/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@layout/(.*)$': '<rootDir>/src/layout/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1'
  },
};
