/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/tests/__mocks__/fileMock.ts',
    '\\.(css|less)$': ['<rootDir>/tests/__mocks__/styleMock.ts', '<rootDir>/tests/__mocks__/chromeMock.ts'],
  },
  testEnvironment: 'jsdom',
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
};

export default config;
