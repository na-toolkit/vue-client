<script setup lang="ts">
import { toRef, computed, ref } from "vue";
import {
  NButton,
  NIcon,
  NDivider,
  NCollapseTransition,
  NPopconfirm,
} from "naive-ui";
import {
  EditCircle,
  Trash,
  ChevronDown,
  ChevronUp,
  Copy,
} from "@vicons/tabler";
import BoxCard from "./BoxCard.vue";
import type { Sentence } from "@/types/sentence";
import { useMessage } from "naive-ui";
import { useClipboard } from "@vueuse/core";

const message = useMessage();

const props = defineProps<{ item: Sentence }>();
const item = toRef(props, "item");
const sentenceList = computed(() =>
  item.value.content.split("\n").map((c, cIdx) => ({
    key: `${item.value.sentenceUid}-${cIdx}`,
    sentence: c.split(" ").map((v, vIdx) => ({
      key: `${item.value.sentenceUid}-${cIdx}-${vIdx}`,
      word: v,
    })),
    copy: c,
  }))
);
// const mark = ref<string[]>([]);

// const markWord = (key: string) => {
//   const item = mark.value.findIndex((v) => v === key);
//   if (item === -1) mark.value.push(key);
//   else mark.value.splice(item, 1);
// };

defineEmits<{
  (e: "updateWithModal"): void;
  (e: "delete"): void;
}>();

const showNote = ref(false);
const triggerNote = () => {
  if (item.value.note) showNote.value = !showNote.value;
};

const { copy: copyPromise } = useClipboard();
const copy = async (sentence: string) => {
  try {
    await copyPromise(sentence);
    message.success("複製成功");
  } catch (err) {
    message.error(`複製失敗: ${(err as Error).message}`);
  }
};
</script>
<template>
  <BoxCard>
    <div class="flex gap-1">
      <div class="flex-grow-1">
        <div
          v-for="list in sentenceList"
          :key="list.key"
          class="flex flex-wrap items-center"
        >
          <!-- <span
            v-for="sentence in list.sentence"
            :key="sentence.key"
            class="mx-1px cursor-pointer rounded px-1px ease-in-out sm:mx-2px hover:shadow-current hover:shadow-word"
            :class="{
              'shadow-word': mark.includes(sentence.key),
              'shadow-current': mark.includes(sentence.key),
            }"
            @click.stop="() => markWord(sentence.key)"
          >
            {{ sentence.word }}
          </span> -->
          <div>
            {{ list.copy }}
            <NIcon
              class="m-l-1 cursor-pointer"
              @click.stop="() => copy(list.copy)"
              ><Copy></Copy
            ></NIcon>
          </div>
        </div>
        <div>{{ item.translation }}</div>
        <div v-if="item.note" class="mb--.75rem flex justify-center">
          <NIcon class="cursor-pointer px-2 py-1" @click="triggerNote">
            <ChevronUp v-if="showNote"></ChevronUp>
            <ChevronDown v-else></ChevronDown>
          </NIcon>
        </div>
        <NCollapseTransition :show="showNote">
          <div
            class="overflow-hidden transition-max-height duration-300 ease-in-out"
            v-if="item.note"
          >
            <NDivider dashed>NOTE</NDivider>
            <div
              class="whitespace-pre-wrap text-white-mute"
              @click.stop="() => {}"
            >
              {{ item.note }}
            </div>
          </div>
        </NCollapseTransition>
      </div>
      <div class="grid auto-rows-min gap-2">
        <NButton
          :circle="true"
          :size="'large'"
          :text="true"
          class="h-6 w-6"
          @click="() => $emit('updateWithModal')"
        >
          <template #icon>
            <NIcon size="24"><EditCircle></EditCircle></NIcon>
          </template>
        </NButton>
        <!-- <NButton
          :circle="true"
          :size="'large'"
          :text="true"
          class="hidden h-6 w-6 sm:inline-flex"
          @click="() => triggerUpdate(false)"
        >
          <template #icon>
            <NIcon size="24"><EditCircle></EditCircle></NIcon>
          </template>
        </NButton> -->
        <NPopconfirm :negative-text="null" :show-icon="false">
          <template #trigger>
            <NButton
              :circle="true"
              :size="'large'"
              :text="true"
              class="h-6 w-6"
              type="error"
            >
              <template #icon>
                <NIcon size="24"><Trash></Trash></NIcon>
              </template>
            </NButton>
          </template>
          <template #action>
            <NButton :type="'error'" @click="() => $emit('delete')"
              >刪除</NButton
            >
          </template>
        </NPopconfirm>
      </div>
    </div>
  </BoxCard>
</template>
