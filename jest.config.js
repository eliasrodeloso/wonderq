// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["/src/"],
  coveragePathIgnorePatterns: ["/node_modules/", "/src/config/"],
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s"],
  testPathIgnorePatterns: ["/node_modules/"],
}
