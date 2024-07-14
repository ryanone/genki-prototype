module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'react-refresh'
  ],
  rules: {
    'max-len': [
      'error',
      { code: 120 }
    ],
    'no-console': [
      'error',
      { allow: ['error'] },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // feel free to replace with your preferred file pattern - eg. 'src/**/*Slice.ts'
      files: ['src/features/*Slice.ts'],
      // avoid state param assignment
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
