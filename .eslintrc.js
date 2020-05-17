module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['standard', 'eslint:recommended', 'plugin:node/recommended', 'plugin:prettier/recommended'],
  plugins: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'comma-dangle': 0,
    semi: ['error', 'always'],
    'no-throw-literal': 'off',
  },
};
