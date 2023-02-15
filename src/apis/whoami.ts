import { useLazyQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { watch, ref } from "vue";
import { useMessage } from "naive-ui";
import type { Query, Account } from "@/apis/schema";

export const useWhoami = (options?: {
  onResult: (params: Account) => void;
}) => {
  const { onResult } = options || {};
  const message = useMessage();
  const init = ref(true);

  const {
    load,
    refetch,
    loading,
    error,
    onResult: onResultOrigin,
  } = useLazyQuery<Pick<Query, "whoami">, never>(
    gql`
      query Whoami {
        whoami {
          account
          accountUid
          name
          profile
          status
        }
      }
    `,
    undefined,
    { fetchPolicy: "network-only" }
  );

  onResultOrigin((param) => {
    if (init.value) init.value = false;
    if (typeof onResult !== "function") return;
    if (param.loading) return;
    if (param.errors) return;
    onResult(param.data.whoami);
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
  const query = () => {
    if (init.value) return load();
    return refetch();
  };
  return { query, loading, error };
};
