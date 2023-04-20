<script setup lang="ts">
import { ref } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { faker } from "@faker-js/faker";
import { useInfoStore } from "@/stores/info";

const infoStore = useInfoStore();

type Item = { id: number; content: string };

const list = ref<Item[]>(
  [...Array(50)].map((_, idx) => ({
    id: idx,
    content: faker.lorem.lines(),
  }))
);

const scrollEl = ref<any | null>(null);
useInfiniteScroll(
  scrollEl,
  () => {
    init.value = false;
    const initIdx = list.value.length;
    const newList: Item[] = [...Array(50)].map((_, idx) => ({
      id: initIdx + idx,
      content: faker.lorem.lines(),
    }));
    list.value.push(...newList);
  },
  { distance: 10 }
);
const init = ref(true);
const scrollToBottom = () => {
  if (scrollEl.value && !init.value) {
    scrollEl.value.scrollToBottom();
  }
};
</script>
<template>
  <section class="h-full w-full overflow-hidden">
    <DynamicScroller
      ref="scrollEl"
      class="h-full"
      :items="list"
      :min-item-size="1"
      key-field="id"
      :emit-update="true"
      @update="infoStore.updateVirtualScroller"
      @resize="scrollToBottom"
    >
      <template #default="{ item, index: idx, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.content]"
          :data-index="idx"
        >
          <div>
            <div>(index: {{ idx }}; active {{ active }})</div>
            <div>{{ item.content }}</div>
            <div class="h-50px"></div>
          </div>
        </DynamicScrollerItem> </template
    ></DynamicScroller>
  </section>
</template>
