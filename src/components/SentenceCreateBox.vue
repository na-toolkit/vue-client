<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useCreateSentence } from "@/apis/sentence";
import type { Sentence } from "@/types/sentence";
import SentenceForm from "./SentenceForm.vue";
import BoxCard from "./BoxCard.vue";

const message = useMessage();

const props = defineProps<{
  minimize?: () => void;
}>();
const emit = defineEmits<{
  (e: "success", item: Sentence): void;
  (e: "minimize"): void;
}>();

type FormSentence = Omit<Sentence, "sentenceUid">;
const formInit = (): FormSentence => ({
  content: "",
  note: "",
  translation: "",
});
const formValue = ref<FormSentence>(formInit());

const {
  mutate,
  loading: createLoading,
  error: createError,
} = useCreateSentence({
  onDone(result) {
    if (result) message.success("新增成功");
    emit("success", result);
    formValue.value = formInit();
  },
});

const submit = async () => {
  const { content, note, translation } = formValue.value;
  await mutate({
    input: { content, note, translation },
  });
};
const minimize = () => {
  formValue.value = formInit();
  if (props.minimize) {
    props.minimize();
  } else emit("minimize");
};
</script>
<template>
  <BoxCard class="w-50%">
    <SentenceForm
      v-model:form-value="formValue"
      :loading="createLoading"
      label="新增"
      @submit="() => submit()"
      @minimize="minimize"
    ></SentenceForm>
  </BoxCard>
</template>
