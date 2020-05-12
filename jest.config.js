module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
  coverageReporters: [
    "json-summary", 
    "text",
    "lcov"
  ]
};
