module.exports = {
  extends: 'rtablada',
  globals: {
    use: true,
  },
  env: {
    node: true,
  },
  rules: {
    'no-console': 0,
    'require-yield': 0,
    "comma-dangle": ['error', 'always-multiline'],
  },
};
