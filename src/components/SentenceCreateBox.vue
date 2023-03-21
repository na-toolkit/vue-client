<script setup lang="ts">
import { ref, toRef } from "vue";
import { useMessage } from "naive-ui";
import { useCreateSentence } from "@/apis/sentence";
import type { Sentence } from "@/types/sentence";
import SentenceForm from "./SentenceForm.vue";
import BoxCard from "./BoxCard.vue";

const message = useMessage();

const props = withDefaults(
  defineProps<{
    minimize?: () => void;
    border?: boolean;
  }>(),
  {
    border: true,
  }
);
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

const border = toRef(props, "border");
</script>
<template>
  <BoxCard :border="border" class="max-w-500px">
    <SentenceForm
      v-model:form-value="formValue"
      :loading="createLoading"
      label="新增"
      :show-minimize="!!props.minimize"
      @submit="() => submit()"
      @minimize="minimize"
    ></SentenceForm>
  </BoxCard>
</template>
