import type { GraphQLErrorExtensions } from "graphql";

declare module "graphql" {
  export interface GraphQLErrorExtensions {
    code: string;
    response?: {
      statusCode: 400 | 401 | 403 | 404 | 413 | 500 | 501 | 502;
      messageCode: string;
      log?: string;
    };
  }
}
