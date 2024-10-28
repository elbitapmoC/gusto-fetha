module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Explicitly use this
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/__tests__/**/*.test.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
};
