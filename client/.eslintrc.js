export default {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'no-relative-import-paths'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'max-len': ['error', 120],

    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true, rootDir: 'src', prefix: '~' },
    ],
    'prefer-destructuring': ['off'],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'arrow-body-style': ['off'],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'no-unused-vars': ['error', { args: 'none' }],
    'import/prefer-default-export': ['off'],
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': ['off'],
    'object-curly-newline': ['off'],
    'no-await-in-loop': ['off'],
    'no-restricted-syntax': ['off'],
    'no-continue': ['off'],
    'no-constant-condition': ['off'],
    'class-methods-use-this': ['off'],
    'operator-linebreak': [
      'error',
      'before',
      { overrides: { '=': 'after', '||': 'after', '&&': 'after', '-': 'after', '+': 'after' } },
    ],
    '@typescript-eslint/lines-between-class-members': ['off'],
    '@typescript-eslint/no-throw-literal': ['off'],
    '@typescript-eslint/naming-convention': ['off'],
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-unnecessary-condition': ['error'],
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
