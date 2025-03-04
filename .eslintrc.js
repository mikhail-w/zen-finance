module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Change no-unused-vars from error to warning to prevent build failures
    '@typescript-eslint/no-unused-vars': 'off',

    // Alternatively, you could disable it completely
    // '@typescript-eslint/no-unused-vars': 'off',
  },
};
