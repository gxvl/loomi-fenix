import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  // 1. Configurações base do Next.js
  ...nextVitals,
  ...nextTs,

  // 2. Configuração recomendada do Tailwind (Flat Config)

  // 3. Regras e Integração com Prettier
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      // Desativa todas as regras de estilo do ESLint que conflitam com o Prettier
      ...prettierConfig.rules,

      // Regra principal: Roda o Prettier como se fosse um erro de Lint.
      // { usePrettierrc: true } manda ele ler seu prettier.config.mjs ou .prettierrc
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],

      // Garante erro em linhas vazias duplas (backup de segurança)
      "no-multiple-empty-lines": ["error", { max: 1 }],

      // --- Regras do Tailwind ---
      // IMPORTANTE: Desligamos o aviso de ordem do ESLint.
      // Quem vai ordenar é o plugin do Prettier quando você der Ctrl+S.
      "tailwindcss/classnames-order": "off",

      // Opcional: Permite classes que não existem no Tailwind (útil para libs externas)
      "tailwindcss/no-custom-classname": "off"
    }
  },

  // 4. Configurações para o Plugin do Tailwind entender seu código
  {
    settings: {
      tailwindcss: {
        callees: ["cn", "cva", "clsx"], // Funções onde classes são usadas
        config: "tailwind.config.ts" // Certifique-se que o nome do arquivo está certo
      }
    }
  },

  // 5. Arquivos ignorados
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
