module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:typescript-sort-keys/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: [
    'react-refresh'
  ],
  rules: {
    'import/extensions': [
      'error',
      'never',
      {
        css: 'always',
        png: 'always',
        json: 'always',
      }
    ],
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
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
  overrides: [
    {
      // feel free to replace with your preferred file pattern - eg. 'src/**/*Slice.ts'
      files: ['src/features/**/*Slice.ts'],
      // avoid state param assignment
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
    {
      files: ['src/stories/**/*.tsx'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
