import { useMutation } from "@vue/apollo-composable";
import type { GraphQLError } from "graphql";
import gql from "graphql-tag";

export const useMutateLogin = () => {
  const { mutate: mutateLogin, loading } = useMutation<
    {
      accessToken: string;
      expiresIn: number;
    },
    { input: { account: string; passwordInput: string } }
  >(gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        accessToken
        expiresIn
      }
    }
  `);
  const func = async ({
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
  return { mutateLogin: func, loading };
};
