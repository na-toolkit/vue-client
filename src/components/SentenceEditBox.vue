<script setup lang="ts">
import { ref, toRef } from "vue";
import { useMessage } from "naive-ui";
import SentenceForm from "./SentenceForm.vue";
import { useUpdateSentence } from "@/apis/sentence";
import type { Sentence } from "@/types/sentence";
import BoxCard from "./BoxCard.vue";

type FormSentence = Sentence & { idx: number | null };
const message = useMessage();
const props = defineProps<{
  init: () => FormSentence;
  formValue: FormSentence;
  minimize?: () => void;
}>();
const emit = defineEmits<{
  (e: "update:formValue", item: FormSentence): void;
  (e: "success", item: FormSentence): void;
  (e: "minimize"): void;
}>();

const formValue = toRef(props, "formValue");

const {
  mutate,
  loading: updateLoading,
  error,
} = useUpdateSentence({
  onDone(result) {
    if (result) message.success("更新成功");
    if (typeof formValue.value.idx === "number") {
      emit("success", formValue.value);
    }
  },
});

const submit = async () => {
  const { sentenceUid, content, note, translation } = formValue.value;
  await mutate({
    input: {
      sentenceUid,
      content,
      note,
      translation,
    },
  });
};
const minimize = () => {
  emit("update:formValue", props.init());
  if (props.minimize) {
    props.minimize();
  } else emit("minimize");
};
</script>
<template>
  <BoxCard class="w-50%">
    <SentenceForm
      :form-value="formValue"
      @update:form-value="
        (v) => emit('update:formValue', { ...formValue, ...v })
      "
      :loading="updateLoading"
      label="更新"
      @submit="() => submit()"
      @minimize="minimize"
    ></SentenceForm>
  </BoxCard>
</template>
