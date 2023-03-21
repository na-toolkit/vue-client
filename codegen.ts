import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.VITE_API_URL}/graphql`,
  ignoreNoDocuments: true,
  generates: {
    "src/apis/schema.ts": {
      plugins: ["typescript"],
      config: {
        scalars: { UnixDate: "number" },
      },
    },
  },
};

export default config;
