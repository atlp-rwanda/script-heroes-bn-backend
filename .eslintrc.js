module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'object-curly-newline': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__']
      }
    ],
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'new-cap': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    curly: ['error', 'multi-line'],
    'import/no-unresolved': [2, { commonjs: true }],
    'no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
    'valid-jsdoc': 0,
    'require-jsdoc': 0
  }
};
