<script setup lang="ts">
import {
  NButton,
  type ButtonProps,
  NSpin,
  type SpinProps,
  NIcon,
} from "naive-ui";
import { toRefs } from "vue";
import { QuestionMark } from "@vicons/tabler";

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    size?: ButtonProps["size"];
    type?: ButtonProps["type"];
    loadingSize?: SpinProps["size"];
  }>(),
  { loading: false, size: "large", type: "success", loadingSize: 20 }
);
const emit = defineEmits<{
  (e: "click"): void;
}>();
const { size, loading, type, loadingSize } = toRefs(props);
</script>
<template>
  <NButton text :type="type" :size="size" @click="() => emit('click')">
    <template #icon>
      <NSpin v-if="loading" :size="loadingSize"></NSpin>
      <NIcon v-else
        ><slot><QuestionMark></QuestionMark></slot
      ></NIcon>
    </template>
  </NButton>
</template>
