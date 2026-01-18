import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  // 1. Configurações padrão do Next.js
  ...nextVitals,
  ...nextTs,

  // 2. Configuração do Prettier (Isso fará o erro de linhas aparecer!)
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...prettierConfig.rules, // Desativa regras do ESLint que conflitam com Prettier
      "prettier/prettier": [
        "error",
        {
          trailingComma: "none",
          endOfLine: "auto"
        }
      ],
      // Força erro se houver mais de 1 linha vazia (backup caso o prettier falhe)
      "no-multiple-empty-lines": ["error", { max: 1 }]
    }
  },

  // 3. Ignorar pastas
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**"
    ]
  }
]);

export default eslintConfig;
