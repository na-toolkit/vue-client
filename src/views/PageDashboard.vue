<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { NButton, NSpin, NIcon, NIconWrapper } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useGetSentenceList } from "@/apis/sentence";
import type { SentenceInList } from "@/apis/schema";
import { EditCircle, PlaylistAdd } from "@vicons/tabler";
import SentenceCreateBox from "@/components/SentenceCreateBox.vue";
import BoxCard from "@/components/BoxCard.vue";
import SentenceList from "@/components/SentenceList.vue";
import type { Sentence } from "@/types/sentence";

type BoxCardType = "create" | "update" | "";

const type = ref<BoxCardType>("");
const triggerBoxCard = (t: BoxCardType) => (type.value = t);
const list = ref<SentenceInList[]>([]);
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
const createSuccess = (item: Sentence) => {
  list.value.splice(0, 0, item);
};
</script>
<template>
  <section class="w-100% h-100% overflow-y-scroll" ref="scrollEl">
    <div class="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4">
      <SentenceList
        class="p-4"
        :list="list"
        :loading="listLoading"
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
          <BoxCard class="w-50%" v-show="type === 'create'">
            <SentenceCreateBox @create="createSuccess"></SentenceCreateBox>
          </BoxCard>
        </div>
      </div>
    </div>
  </section>
</template>
