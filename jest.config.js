module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  setupFiles: ['<rootDir>/config/enzyme.js'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleNameMapper: {
    "^@components/(.*)": "<rootDir>/components/$1",
    "^@config/(.*)": "<rootDir>/config/$1",
    "^@assets/(.*)": "<rootDir>/assets/$1",
    "^@api/(.*)": "<rootDir>/api/$1",
    "^@providers/(.*)": "<rootDir>/providers/$1"
  },
  coverageDirectory: "coverage",
  collectCoverage: true,
  coverageReporters: [
    "json",
    "html"
  ],
};
