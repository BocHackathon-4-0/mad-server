module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double"],
    "no-console": 0,
    "comma-dangle": "off",
    "operator-linebreak": "off",
    "consistent-return": "off",
    "no-else-return": "off",
    camelcase: "off",
    "no-await-in-loop": "off",
    // "no-restricted-syntax": []
    "no-restricted-syntax": [
      "off",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "ForOfStatement",
        message:
          "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
    "guard-for-in": "off",
    "object-curly-newline": "off",
    "no-underscore-dangle": "off",
  },
};
