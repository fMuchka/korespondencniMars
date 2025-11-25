/**
 * ESLint config for the project
 * - TypeScript
 * - React
 * - Integrates Prettier as a formatting rule
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Prettier issues will show up as warnings - keep the codebase consistent
    'prettier/prettier': ['warn'],

    // project preferences
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // using TS for props validation
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {},
    },
    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
