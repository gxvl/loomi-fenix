import * as tailwindPlugin from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  printWidth: 80,
  plugins: [tailwindPlugin]
};

export default config;
