module.exports = {
  extends: [
    'standard-with-typescript',
    'standard-jsx',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
}
