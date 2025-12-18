import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import solid from 'eslint-plugin-solid/configs/typescript';
import * as tsParser from '@typescript-eslint/parser';

export default defineConfig([
  eslintConfigPrettier,
  {
    ignores: [
      '**/node_modules/',
      '**/.git/',
      'dist',
      'package-lock.json',
      'tsconfig*.json',
      '**/index.css',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    ignores: [
      'pwa-assets.config.ts',
      'eslint.config.ts',
      'steiger.config.ts',
      './types/global.d.ts',
    ],
    extends: [tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['pwa-assets.config.ts', 'eslint.config.ts', 'steiger.config.ts'],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        project: 'tsconfig.json',
      },
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    files: ['server.js'],
    languageOptions: { globals: globals.node },
  },
]);
