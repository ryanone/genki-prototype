import { FlatCompat } from '@eslint/eslintrc';
import vitest from '@vitest/eslint-plugin';
import { fixupConfigRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactCompiler from 'eslint-plugin-react-compiler';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  ...[
    {
      ignores: [
        '**/dist',
        '.eslintrc.cjs',
        '.pnp.cjs',
        '.pnp.loader.mjs',
        '.prettierrc.cjs',
        '.storybook/**',
        '.yarn/**',
        'eslint.config.mjs',
      ],
    },
    ...fixupConfigRules(
      compat.extends(
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:typescript-sort-keys/recommended',
        'prettier',
      ),
    ),
    jsxA11y.flatConfigs.recommended,
    importPlugin.flatConfigs.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    ...storybook.configs['flat/recommended'],
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: {
        'react-refresh': reactRefresh,
        'react-compiler': reactCompiler,
      },

      languageOptions: {
        globals: {
          ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 2024,
        sourceType: 'module',

        parserOptions: {
          project: ['./tsconfig.json', './tsconfig.node.json'],
        },
      },

      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
        },
        react: {
          version: 'detect',
        },
      },

      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'jsx-a11y/label-has-associated-control': [
          'error',
          {
            assert: 'either',
          },
        ],

        'max-len': [
          'error',
          {
            code: 120,
          },
        ],

        'no-console': [
          'error',
          {
            allow: ['error'],
          },
        ],

        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: true,
          },
        ],

        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],

        'react/jsx-no-target-blank': 'off',
        'react/no-array-index-key': 'error',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react-compiler/react-compiler': 'error',
      },
    },
    {
      files: ['src/features/**/*Slice.ts'],

      rules: {
        'no-param-reassign': [
          'error',
          {
            props: false,
          },
        ],
      },
    },
    {
      files: ['src/tests/**/*.ts', 'src/tests/**/*.tsx'],

      plugins: {
        vitest,
      },

      rules: {
        ...vitest.configs.recommended.rules,
        'vitest/max-expects': 'off',
        'vitest/no-hooks': 'off',
        'vitest/prefer-expect-assertions': 'error',
      },
    },
    {
      files: ['src/tests/setup.ts'],

      rules: {
        'vitest/require-top-level-describe': 'off',
      },
    },
  ],
);
