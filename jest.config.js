module.exports = {
  // preset: 'ts-jest',
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    "ts-jest": {
      diagnostics: true,
    },
  },
  setupFiles: ['./src/setupTests.ts'],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer",
  ],
  moduleNameMapper: {
    "^~\\/(.*)$": "<rootDir>/src$1",
  },
};
