//eslint.config.js
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
  eslint.configs.recommended,
  // ...tseslint.configs.recommended,
  // ...tseslint.configs.strict,
  // ...tseslint.configs.stylistic,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    // files: ['src/**/*', 'tests/**/*'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      // jest: jestPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    rules: {
      semi: ['error', 'always'],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/semi': ['error', 'always'],
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      '**/build/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      'src/some/file/to/ignore.ts',
    ],
  },
  // {
  //   // enable jest rules on test files
  //   files: ['test/**'],
  //   ...jestPlugin.configs['flat/recommended'],
  // },
);
