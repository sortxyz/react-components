module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@styles/(.*)$': '<rootDir>/src/components/styles/$1',
    '^@globalStyles/(.*)$': '<rootDir>/src/components/styles/$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/lib/'],
};
