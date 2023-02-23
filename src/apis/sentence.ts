import { useMutation, useQuery } from "@vue/apollo-composable";
import { watch } from "vue";
import gql from "graphql-tag";
import type {
  MutationCreateSentenceArgs,
  Mutation,
  MutationUpdateSentenceArgs,
  Query,
  QueryGetSentenceListArgs,
  MutationRemoveSentenceArgs,
} from "./schema";
import { useMessage } from "naive-ui";
import type { Sentence } from "@/types/sentence";

export const useCreateSentence = (options?: {
  onDone?: (result: Sentence) => void;
}) => {
  const { onDone } = options || {};
  const message = useMessage();

  const {
    mutate,
    loading,
    error,
    onDone: onDoneOrigin,
  } = useMutation<
    Pick<Mutation, "createSentence">,
    MutationCreateSentenceArgs
  >(gql`
    mutation CreateSentence($input: CreateSentenceInput!) {
      createSentence(input: $input) {
        content
        note
        sentenceUid
        translation
      }
    }
  `);

  onDoneOrigin((result) => {
    if (typeof onDone !== "function") return;
    if (result.data) onDone(result.data.createSentence);
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

export const useUpdateSentence = (options?: {
  onDone?: (result: boolean) => void;
}) => {
  const { onDone } = options || {};
  const message = useMessage();

  const {
    mutate,
    loading,
    error,
    onDone: onDoneOrigin,
  } = useMutation<
    Pick<Mutation, "updateSentence">,
    MutationUpdateSentenceArgs
  >(gql`
    mutation UpdateSentence($input: UpdateSentenceInput!) {
      updateSentence(input: $input)
    }
  `);

  onDoneOrigin((result) => {
    if (typeof onDone !== "function") return;
    if (result.data) onDone(result.data.updateSentence);
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

export const useRemoveSentence = (options?: {
  onDone?: (result: boolean) => void;
}) => {
  const { onDone } = options || {};
  const message = useMessage();

  const {
    mutate,
    loading,
    error,
    onDone: onDoneOrigin,
  } = useMutation<
    Pick<Mutation, "removeSentence">,
    MutationRemoveSentenceArgs
  >(gql`
    mutation RemoveSentence($sentenceUid: String!) {
      removeSentence(sentenceUid: $sentenceUid)
    }
  `);

  onDoneOrigin((result) => {
    if (typeof onDone !== "function") return;
    if (result.data) onDone(result.data.removeSentence);
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

export const useGetSentenceList = (initVariable: QueryGetSentenceListArgs) => {
  const { result, loading, error, fetchMore, refetch } = useQuery<
    Pick<Query, "getSentenceList">,
    QueryGetSentenceListArgs
  >(
    gql`
      query GetSentenceList($input: SearchSentenceWithPaginationInput!) {
        getSentenceList(input: $input) {
          paginationInfo {
            currentPage
            pageSize
            total
          }
          data {
            content
            note
            sentenceUid
            translation
          }
        }
      }
    `,
    initVariable,
    { fetchPolicy: "network-only" }
  );
  return { result, loading, error, fetchMore, refetch };
};
