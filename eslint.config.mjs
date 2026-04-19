import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom project rules
  {
    rules: {
      // Code quality
      "max-lines": ["warn", { max: 150, skipBlankLines: true, skipComments: true }],
      "max-params": ["warn", { max: 3 }],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // TypeScript strict rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // React rules (plugin already loaded by eslint-config-next)
      "react/no-array-index-key": "error",
    },
  },
]);

export default eslintConfig;
