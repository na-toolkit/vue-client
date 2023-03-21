<script setup lang="ts">
import { toRef, computed, ref } from "vue";
import { NButton, NIcon, NDivider } from "naive-ui";
import { EditCircle, Trash } from "@vicons/tabler";
import BoxCard from "./BoxCard.vue";
import type { Sentence } from "@/types/sentence";

const props = defineProps<{ item: Sentence }>();
const item = toRef(props, "item");
const sentenceList = computed(() =>
  item.value.content.split("\n").map((c, cIdx) => ({
    key: `${item.value.sentenceUid}-${cIdx}`,
    sentence: c.split(" ").map((v, vIdx) => ({
      key: `${item.value.sentenceUid}-${cIdx}-${vIdx}`,
      word: v,
    })),
  }))
);
const mark = ref<string[]>([]);

const markWord = (key: string) => {
  const item = mark.value.findIndex((v) => v === key);
  if (item === -1) mark.value.push(key);
  else mark.value.splice(item, 1);
};

const emit = defineEmits<{
  (e: "update", modal: boolean): void;
  (e: "delete"): void;
}>();

const triggerUpdate = (modal: boolean) => {
  emit("update", modal);
};
const triggerDelete = () => {
  emit("delete");
};

const showNote = ref(false);
const triggerNote = () => {
  if (item.value.note) showNote.value = !showNote.value;
};
</script>
<template>
  <BoxCard class="flex cursor-pointer" @click="triggerNote">
    <div class="flex-grow-1">
      <div v-for="list in sentenceList" :key="list.key" class="flex flex-wrap">
        <span
          v-for="sentence in list.sentence"
          :key="sentence.key"
          class="px-1px mx-1px sm:mx-2px cursor-pointer rounded ease-in-out hover:shadow-word hover:shadow-current"
          :class="{
            'shadow-word': mark.includes(sentence.key),
            'shadow-current': mark.includes(sentence.key),
          }"
          @click.stop="() => markWord(sentence.key)"
        >
          {{ sentence.word }}
        </span>
      </div>
      <div>{{ item.translation }}</div>
      <div v-if="item.note">
        <NDivider dashed>NOTE</NDivider>
        <div class="whitespace-pre-wrap text-white-mute">
          {{ item.note }}
        </div>
      </div>
    </div>
    <div class="grid auto-rows-min gap-2">
      <NButton
        :circle="true"
        :size="'large'"
        :text="true"
        class="w-6 h-6 sm:hidden"
        @click="() => triggerUpdate(true)"
      >
        <template #icon>
          <NIcon size="24"><EditCircle></EditCircle></NIcon>
        </template>
      </NButton>
      <NButton
        :circle="true"
        :size="'large'"
        :text="true"
        class="w-6 h-6 hidden sm:inline-flex"
        @click="() => triggerUpdate(false)"
      >
        <template #icon>
          <NIcon size="24"><EditCircle></EditCircle></NIcon>
        </template>
      </NButton>
      <NButton
        :circle="true"
        :size="'large'"
        :text="true"
        class="w-6 h-6"
        type="error"
        @click="triggerDelete"
      >
        <template #icon>
          <NIcon size="24"><Trash></Trash></NIcon>
        </template>
      </NButton>
    </div>
  </BoxCard>
</template>
