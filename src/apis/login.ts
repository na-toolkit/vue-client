import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import type { MutationLoginArgs, JwtSign } from "./schema";

export const useMutateLogin = () => {
  const { mutate: mutateLogin, loading } = useMutation<
    JwtSign,
    MutationLoginArgs
  >(gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        accessToken
        expiresIn
      }
    }
  `);
  const wrapFunc = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const result = await mutateLogin({
        input: { account: username, passwordInput: password },
      });
      return [null, result?.data] as const;
    } catch (err) {
      return [err as Error, null] as const;
    }
  };
  return { mutateLogin: wrapFunc, loading };
};
