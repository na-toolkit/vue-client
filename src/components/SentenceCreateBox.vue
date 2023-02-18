<script setup lang="ts">
import { ref } from "vue";
import {
  NInput,
  NForm,
  NFormItem,
  NButton,
  NSpin,
  useMessage,
  type FormInst,
  type FormRules,
} from "naive-ui";
import { useCreateSentence } from "@/apis/sentence";

const message = useMessage();

const {
  mutate,
  loading: createLoading,
  error: createError,
} = useCreateSentence({
  onDone(result) {
    // if (result) message.success("新增成功");
    // listVariables.value.paginationInfo.currentPage = 1;
    // listRefetch({ input: listVariables.value });
  },
});

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  content: "",
  note: "",
  translation: "",
});
const rules: FormRules = {
  content: {
    required: true,
    trigger: ["input", "blur"],
  },
};

const create = async () => {
  try {
    await formRef.value?.validate();
  } catch (err) {
    console.debug("login form validate failed:", err);
    message.error("請按照提示填寫");
    return;
  }
  const { content, note, translation } = formValue.value;
  await mutate({
    input: { content, note, translation },
  });
};
</script>
<template>
  <NForm
    ref="formRef"
    :model="formValue"
    :show-label="false"
    :show-feedback="false"
    :rules="rules"
    class="grid gap-4"
  >
    <NFormItem path="content">
      <NInput v-model:value="formValue.content" size="large" placeholder="內容">
      </NInput>
    </NFormItem>
    <NFormItem path="translation">
      <NInput
        v-model:value="formValue.translation"
        size="large"
        placeholder="翻譯"
      >
      </NInput>
    </NFormItem>
    <NFormItem path="note">
      <NInput v-model:value="formValue.note" size="large" placeholder="備註">
      </NInput>
    </NFormItem>
    <NButton @click="create">
      <NSpin v-if="createLoading"></NSpin>
      <span v-else>新增</span>
    </NButton>
  </NForm>
</template>