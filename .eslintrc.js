module.exports = {
  extends: ['standard-jsx', 'plugin:react-hooks/recommended'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['standard-with-typescript', 'prettier'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['standard', 'prettier'],
    },
  ],
}
