import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'space-before-function-paren': 'off',
      semi: ['error', 'always'],
      // 'no-console': 'warn',
      // 'no-debugger': 'warn',
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];
