module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["@typescript-eslint", "react-native", "prettier"],
  parserOptions: {
    sourceType: "module"
  },
  extends: ["airbnb", "plugin:@typescript-eslint/recommended", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".native.js"]
      }
    }
  },
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "react/prop-types":"off",
    "import/extensions": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-empty-interface": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": 1,
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/explicit-member-accessibility": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react-native/no-unused-styles": 1,
    "react-native/split-platform-components": 1,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 1,
    "react-native/no-raw-text": 0,
    "prettier/prettier": "off"
  }
};
