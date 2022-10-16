module.exports = {
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    quotes: ["error", "single", { avoidEscape: true }],
    "comma-dangle": ["error", "always-multiline"],
  },
};
