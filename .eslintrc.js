const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('react-ts', {
  rules: {
    'react-hooks/exhaustive-deps': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/member-ordering': 0,
  },
});
