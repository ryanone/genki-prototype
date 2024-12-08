module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@vitest/legacy-all',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:typescript-sort-keys/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['@vitest', 'react-refresh', 'eslint-plugin-react-compiler'],
  rules: {
    'import/extensions': [
      'error',
      'never',
      {
        css: 'always',
        png: 'always',
        json: 'always',
      },
    ],
    'import/no-unresolved': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'max-len': ['error', { code: 120 }],
    'no-console': ['error', { allow: ['error'] }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'react-compiler/react-compiler': 'error',
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
    {
      files: ['vite.config.ts', 'src/tests/**/*.ts', 'src/tests/**/*.tsx'],
      rules: {
        '@vitest/max-expects': 'off',
        '@vitest/no-hooks': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
