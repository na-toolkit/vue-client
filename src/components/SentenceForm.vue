<script setup lang="ts">
import { ref, toRef } from "vue";
import {
  NInput,
  NForm,
  NFormItem,
  NButton,
  NSpin,
  useMessage,
  NIcon,
  type FormInst,
  type FormRules,
} from "naive-ui";
import type { Sentence } from "@/types/sentence";
import { ArrowsDiagonalMinimize2 } from "@vicons/tabler";

type FormSentence = Omit<Sentence, "sentenceUid">;

const props = withDefaults(
  defineProps<{
    loading: boolean;
    label: string;
    formValue: FormSentence;
    showMinimize?: boolean;
  }>(),
  {
    showMinimize: false,
  }
);
const emit = defineEmits<{
  (e: "submit"): void;
  (e: "minimize"): void;
  (e: "update:formValue", value: FormSentence): void;
}>();

const message = useMessage();

const formRef = ref<FormInst | null>(null);
const formValue = toRef(props, "formValue");
const rules: FormRules = {
  content: {
    required: true,
    trigger: ["input", "blur"],
  },
};

const submit = async () => {
  try {
    await formRef.value?.validate();
  } catch (err) {
    console.debug("login form validate failed:", err);
    message.error("請按照提示填寫");
    return;
  }
  emit("submit");
};

const showMinimize = toRef(props, "showMinimize");
</script>
<template>
  <div class="flex flex-col items-end">
    <NButton
      v-if="showMinimize"
      class="m-b-2 m-t--2"
      :circle="true"
      :size="'large'"
      :text="true"
      @click="() => emit('minimize')"
    >
      <template #icon>
        <NIcon><ArrowsDiagonalMinimize2></ArrowsDiagonalMinimize2></NIcon>
      </template>
    </NButton>
    <NForm
      ref="formRef"
      :model="formValue"
      :show-label="false"
      :show-feedback="false"
      :rules="rules"
      class="grid gap-4 w-full"
    >
      <NFormItem path="content">
        <NInput
          :value="formValue.content"
          type="textarea"
          :autosize="{ minRows: 1 }"
          @update:value="
            (v) => emit('update:formValue', { ...formValue, content: v })
          "
          size="large"
          placeholder="內容"
        >
        </NInput>
      </NFormItem>
      <NFormItem path="translation">
        <NInput
          :value="formValue.translation"
          type="textarea"
          :autosize="{ minRows: 1 }"
          @update:value="
            (v) => emit('update:formValue', { ...formValue, translation: v })
          "
          size="large"
          placeholder="翻譯"
        >
        </NInput>
      </NFormItem>
      <NFormItem path="note">
        <NInput
          :value="formValue.note"
          type="textarea"
          :autosize="{ minRows: 1 }"
          @update:value="
            (v) => emit('update:formValue', { ...formValue, note: v })
          "
          size="large"
          placeholder="備註"
        >
        </NInput>
      </NFormItem>
      <NButton @click="submit">
        <NSpin v-if="props.loading"></NSpin>
        <span v-else>{{ props.label }}</span>
      </NButton>
    </NForm>
  </div>
</template>
