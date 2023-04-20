<script setup lang="ts">
import { defineProps, withDefaults, toRefs, ref, watch, computed } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import SentenceItem from "./SentenceItem.vue";
import { NSkeleton } from "naive-ui";
import type { Sentence } from "@/types/sentence";
import { useGetSentenceList } from "@/apis/sentence";
import { throttle } from "lodash-es";

const props = withDefaults(
  defineProps<{ list: Sentence[]; loading: boolean }>(),
  {
    list: () => [],
    loading: false,
  }
);
const emit = defineEmits<{
  (e: "update", idx: number, modal: boolean): void;
  (e: "delete", idx: number): void;
  (e: "update:list", data: Sentence[]): void;
  (e: "update:loading", data: boolean): void;
}>();

const { list, loading } = toRefs(props);

const total = ref(0);
const listVariables = ref({
  keyword: "",
  paginationInfo: {
    currentPage: 1,
    pageSize: 20,
  },
});
const { result, loading: requestLoading } = useGetSentenceList({
  input: listVariables.value,
});
watch(
  result,
  (v) => {
    if (v) {
      const {
        data,
        paginationInfo: { currentPage, total: totalResult },
      } = v.getSentenceList;
      total.value = totalResult;
      if (currentPage !== 1) {
        emit("update:list", [...list.value, ...data]);
      } else emit("update:list", data);
    }
  },
  { immediate: true }
);
watch(
  requestLoading,
  (v) => {
    emit("update:loading", v);
  },
  { immediate: true }
);
const scrollEl = ref<HTMLElement | null>(null);
const scrollData = computed(() => {
  return (
    total.value >
    listVariables.value.paginationInfo.currentPage *
      listVariables.value.paginationInfo.pageSize
  );
});
useInfiniteScroll(
  scrollEl,
  throttle(() => {
    if (scrollData.value && !requestLoading.value) {
      listVariables.value.paginationInfo.currentPage += 1;
    }
  }, 300),
  { distance: 200 }
);

const triggerUpdate = (modal: boolean, idx: number) => {
  emit("update", idx, modal);
};
const triggerDelete = (idx: number) => {
  emit("delete", idx);
};
</script>
<template>
  <div class="h-full overflow-y-scroll" ref="scrollEl">
    <div class="grid max-w-1024px gap-8 p-y-4">
      <SentenceItem
        v-for="(item, idx) in list"
        :key="item.sentenceUid"
        :item="item"
        @update="(modal) => triggerUpdate(modal, idx)"
        @delete="() => triggerDelete(idx)"
      ></SentenceItem>
      <div v-if="list.length === 0 && !loading">暫無資料</div>
      <div v-if="loading" class="flex flex-col gap-4">
        <NSkeleton :height="50"></NSkeleton>
        <NSkeleton :height="20" width="90%"></NSkeleton>
        <NSkeleton :height="30" width="85%"></NSkeleton>
      </div>
    </div>
  </div>
</template>
