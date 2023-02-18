<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { NButton, NSpin, NIcon, NIconWrapper } from "naive-ui";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useGetSentenceList } from "@/apis/sentence";
import type { SentenceInList } from "@/apis/schema";
import { EditCircle, PlaylistAdd } from "@vicons/tabler";
import { useInfiniteScroll } from "@vueuse/core";
import SentenceCreateBox from "@/components/SentenceCreateBox.vue";
import BoxCard from "@/components/BoxCard.vue";
import SentenceList from "@/components/SentenceList.vue";

type BoxCardType = "create" | "update" | "";

const type = ref<BoxCardType>("");
const triggerBoxCard = (t: BoxCardType) => (type.value = t);
const list = ref<SentenceInList[]>([]);
const total = ref(0);
const listVariables = ref({
  paginationInfo: {
    currentPage: 1,
    pageSize: 30,
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

// const el = ref<HTMLElement | null>(null);
// useInfiniteScroll(
//   el,
//   () => {
//     if (
//       total.value >
//       listVariables.value.paginationInfo.currentPage *
//         listVariables.value.paginationInfo.pageSize
//     )
//       listVariables.value.paginationInfo.currentPage += 1;
//   },
//   { distance: 10 }
// );
</script>
<template>
  <section class="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4">
    <SentenceList class="p-4" :list="list"></SentenceList>
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
        <BoxCard v-show="type === 'create'">
          <SentenceCreateBox></SentenceCreateBox>
        </BoxCard>
      </div>
    </div>
    <!-- <div ref="el" class="overflow-y-scroll">
      <p v-for="item in list" :key="item.sentenceUid">
        {{ item.content }}
        <NButton text size="tiny">
          <template #icon>
            <NIcon><EditCircle></EditCircle></NIcon>
          </template>
        </NButton>
      </p>
      <NSpin v-if="listLoading"></NSpin>
    </div> -->
  </section>
</template>
