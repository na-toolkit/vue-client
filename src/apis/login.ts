import { useMutation } from "@vue/apollo-composable";
import { watch } from "vue";
import gql from "graphql-tag";
import type {
  MutationRegisterArgs,
  MutationLoginArgs,
  Mutation,
  JwtSign,
} from "./schema";
import { useMessage } from "naive-ui";

export const useMutateLogin = (options?: {
  onDone?: (result: JwtSign) => void;
}) => {
  const { onDone } = options || {};
  const message = useMessage();

  const {
    mutate,
    loading,
    error,
    onDone: onDoneOrigin,
  } = useMutation<Pick<Mutation, "login">, MutationLoginArgs>(gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        accessToken
        expiresIn
      }
    }
  `);

  onDoneOrigin((result) => {
    if (typeof onDone !== "function") return;
    if (result.data) onDone(result.data.login);
  });

  watch(error, (err) => {
    if (err) {
      const messageList = err.graphQLErrors.reduce<string[]>((acc, cur) => {
        const val = cur.extensions.response?.log || "";
        if (val) acc.push(val);
        return acc;
      }, []);
      message.error(messageList.join("\n"));
    }
  });
  return { mutate, loading, error };
};

export const useMutationRegister = (options?: {
  onDone?: (result: boolean) => void;
}) => {
  const { onDone } = options || {};
  const message = useMessage();

  const {
    mutate,
    loading,
    error,
    onDone: onDoneOrigin,
  } = useMutation<Pick<Mutation, "register">, MutationRegisterArgs>(gql`
    mutation Register($input: CreateAccountInput!) {
      register(input: $input)
    }
  `);

  onDoneOrigin((result) => {
    if (typeof onDone !== "function") return;
    if (result.data) onDone(result.data.register);
  });

  watch(error, (err) => {
    if (err) {
      const messageList = err.graphQLErrors.reduce<string[]>((acc, cur) => {
        const val = cur.extensions.response?.log || "";
        if (val) acc.push(val);
        return acc;
      }, []);
      message.error(messageList.join("\n"));
    }
  });
  return { mutate, loading, error };
};
