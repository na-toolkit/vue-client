import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  ignoreNoDocuments: true,
  generates: {
    "src/apis/schema.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
