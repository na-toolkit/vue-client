<script setup lang="ts">
import { ref, watch } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { NButton, NIcon } from "naive-ui";
import { useGetSentenceList } from "@/apis/sentence";
import { PlaylistAdd } from "@vicons/tabler";
import SentenceCreateBox from "@/components/SentenceCreateBox.vue";
import SentenceEditBox from "@/components/SentenceEditBox.vue";
import SentenceList from "@/components/SentenceList.vue";
import type { Sentence } from "@/types/sentence";

export type SentenceBoxCardType = "create" | "update" | "";
type UpdateFormSentence = Sentence & { idx: number | null };

const updateFormValueInit = () => ({
  idx: null,
  sentenceUid: "",
  content: "",
  note: "",
  translation: "",
});
const updateFormValue = ref<UpdateFormSentence>(updateFormValueInit());

const type = ref<SentenceBoxCardType>("");
const triggerBoxCard = (t: SentenceBoxCardType) => (type.value = t);

const list = ref<Sentence[]>([]);
const total = ref(0);
const listVariables = ref({
  paginationInfo: {
    currentPage: 1,
    pageSize: 20,
  },
});
const {
  result,
  loading: listLoading,
  error: listError,
  fetchMore,
  refetch: listRefetch,
} = useGetSentenceList({
  input: listVariables.value,
});
watch(result, (v) => {
  if (v) {
    const {
      data,
      paginationInfo: { currentPage, total: totalResult },
    } = v.getSentenceList;
    total.value = totalResult;
    if (currentPage !== 1) list.value = [...list.value, ...data];
    else list.value = [...data];
  }
});

const scrollEl = ref<HTMLElement | null>(null);
useInfiniteScroll(
  scrollEl,
  () => {
    if (
      total.value >
      listVariables.value.paginationInfo.currentPage *
        listVariables.value.paginationInfo.pageSize
    )
      listVariables.value.paginationInfo.currentPage += 1;
  },
  { distance: 10 }
);
const updateSentence = (idx: number) => {
  updateFormValue.value = {
    ...list.value[idx],
    idx,
  };
  triggerBoxCard("update");
};
const createSuccess = (item: Sentence) => {
  list.value.splice(0, 0, item);
};
const updateSuccess = (item: Sentence & { idx: number | null }) => {
  const { idx, ...data } = item;
  if (typeof idx === "number") list.value.splice(idx, 1, data);
};
</script>
<template>
  <section class="w-100% h-100% overflow-y-scroll" ref="scrollEl">
    <div class="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4">
      <SentenceList
        class="p-4"
        :list="list"
        :loading="listLoading"
        @update="updateSentence"
      ></SentenceList>
      <div class="p-t-15 p-r-8">
        <div class="sticky top-15">
          <div class="m-b-4">
            <NButton
              :circle="true"
              :size="'large'"
              :text="true"
              class="w-10 h-10"
              @click="() => triggerBoxCard('create')"
            >
              <template #icon>
                <NIcon size="40"><PlaylistAdd></PlaylistAdd></NIcon>
              </template>
            </NButton>
          </div>
          <SentenceCreateBox
            v-show="type === 'create'"
            @success="createSuccess"
            @minimize="() => triggerBoxCard('')"
          ></SentenceCreateBox>
          <SentenceEditBox
            v-model:form-value="updateFormValue"
            :init="updateFormValueInit"
            v-show="type === 'update'"
            @success="updateSuccess"
            @minimize="() => triggerBoxCard('')"
          ></SentenceEditBox>
        </div>
      </div>
    </div>
  </section>
</template>
