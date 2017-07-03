const path = require('path');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier', 'plugin:import/errors', 'plugin:import/warnings'],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js')
      }
    }
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],
    'import/no-internal-modules': [
      1,
      {
        allow: ['**/{common,assets,components}/**']
      }
    ],
    'import/no-duplicates': 2
  }
};
