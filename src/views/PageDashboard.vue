<script setup lang="ts">
import { ref, watch } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import {
  NButton,
  NIcon,
  useMessage,
  NModal,
  NInput,
  NInputGroup,
} from "naive-ui";
import { useGetSentenceList, useRemoveSentence } from "@/apis/sentence";
import { PlaylistAdd, Search } from "@vicons/tabler";
import SentenceCreateBox from "@/components/SentenceCreateBox.vue";
import SentenceEditBox from "@/components/SentenceEditBox.vue";
import SentenceList from "@/components/SentenceList.vue";
import type { Sentence } from "@/types/sentence";

export type SentenceBoxCardType = "create" | "update" | "";
type UpdateFormSentence = Sentence & { idx: number | null };

const message = useMessage();

const updateFormValueInit = () => ({
  idx: null,
  sentenceUid: "",
  content: "",
  note: "",
  translation: "",
});
const updateFormValue = ref<UpdateFormSentence>(updateFormValueInit());

const type = ref<SentenceBoxCardType>("");
const triggerBoxCard = (t: SentenceBoxCardType, modal: boolean) => {
  type.value = t;
  if (modal) showModal.value = !showModal.value;
};

const list = ref<Sentence[]>([]);
const listLoading = ref(false);

const updateSentence = (idx: number, modal: boolean) => {
  updateFormValue.value = {
    ...list.value[idx],
    idx,
  };
  triggerBoxCard("update", modal);
};

const createSuccess = (item: Sentence) => {
  list.value.splice(0, 0, item);
};
const updateSuccess = (item: Sentence & { idx: number | null }) => {
  const { idx, ...data } = item;
  console.log("data", list.value);
  try {
    if (typeof idx === "number")
      list.value = [
        ...list.value.slice(0, idx),
        data,
        ...list.value.slice(idx + 1, -1),
      ];
  } catch (err) {
    console.log("err", err);
  }
};

const { mutate, loading } = useRemoveSentence({
  onDone: () => {
    message.success("刪除成功");
  },
});
const deleteSentence = async (idx: number) => {
  const { sentenceUid } = list.value[idx];
  await mutate({ sentenceUid });
  list.value.splice(idx, 1);
};

const showModal = ref(false);

const keyword = ref("");
const searchWithKeyword = () => {
  // if (keyword.value !== listVariables.value.keyword) {
  //   list.value = [];
  //   listVariables.value.keyword = keyword.value;
  //   listVariables.value.paginationInfo.currentPage = 1;
  // }
};
</script>
<template>
  <section id="dashboard" class="h-full w-full overflow-hidden">
    <SentenceList
      class="px-4"
      v-model:list="list"
      v-model:loading="listLoading"
      @update="updateSentence"
      @delete="deleteSentence"
    ></SentenceList>
    <NModal v-model:show="showModal" preset="card" class="max-w-600px">
      <SentenceCreateBox
        v-if="type === 'create'"
        :border="false"
        @success="createSuccess"
      ></SentenceCreateBox>
      <SentenceEditBox
        v-else-if="type === 'update'"
        v-model:form-value="updateFormValue"
        :init="updateFormValueInit"
        :border="false"
        @success="updateSuccess"
      ></SentenceEditBox>
    </NModal>
  </section>
  <!-- <section class="h-full w-full overflow-hidden">
    <div
      class="h-full sm:grid sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-4"
    >
      <SentenceList
        class="px-4"
        v-model:list="list"
        v-model:loading="listLoading"
        @update="updateSentence"
        @delete="deleteSentence"
      ></SentenceList>
      <div class="hidden p-r-8 p-t-5 sm:block">
        <div class="sticky top-5">
          <NInputGroup>
            <NInput
              v-model:value="keyword"
              style="width: 40%"
              placeholder="篩選內容"
              @keyup.enter="searchWithKeyword"
            ></NInput>
            <NButton type="primary" ghost @click="searchWithKeyword"
              ><NIcon><Search></Search></NIcon
            ></NButton>
          </NInputGroup>
          <div class="m-b-4">
            <NButton
              :circle="true"
              :size="'large'"
              :text="true"
              class="h-10 w-10"
              @click="() => triggerBoxCard('create', false)"
            >
              <template #icon>
                <NIcon size="40"><PlaylistAdd></PlaylistAdd></NIcon>
              </template>
            </NButton>
          </div>
          <SentenceCreateBox
            v-show="type === 'create'"
            @success="createSuccess"
            @minimize="() => triggerBoxCard('', false)"
          ></SentenceCreateBox>
          <SentenceEditBox
            v-model:form-value="updateFormValue"
            :init="updateFormValueInit"
            v-show="type === 'update'"
            @success="updateSuccess"
            @minimize="() => triggerBoxCard('', false)"
          ></SentenceEditBox>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
    <NModal class="sm:hidden" v-model:show="showModal" preset="card">
      <SentenceCreateBox
        v-show="type === 'create'"
        :border="false"
        @success="createSuccess"
      ></SentenceCreateBox>
      <SentenceEditBox
        v-model:form-value="updateFormValue"
        :init="updateFormValueInit"
        :border="false"
        v-show="type === 'update'"
        @success="updateSuccess"
      ></SentenceEditBox>
    </NModal>
  </section> -->
</template>
