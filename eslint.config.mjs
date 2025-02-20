import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/coverage', '**/dist', '**/docs'],
  },
  ...compat.extends('eslint-config-unjs'),
  {
    rules: {
      'no-extra-semi': 'off',
      'unicorn/filename-case': 'off',
      '@typescript-eslint/no-extra-semi': 'off',
      'quote-props': 'off',
      'object-shorthand': 'off',
      camelcase: 'off',
      'unicorn/text-encoding-identifier-case': 'off',
    },
  },
];
