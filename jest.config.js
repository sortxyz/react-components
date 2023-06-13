module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@styles/(.*)$': '<rootDir>/src/components/styles/$1',
    '^@globalStyles/(.*)$': '<rootDir>/src/components/styles/$1',
  },
};
