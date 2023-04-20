<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useMessage } from "naive-ui";
import SentenceForm from "./SentenceForm.vue";
import { useUpdateSentence } from "@/apis/sentence";
import type { Sentence } from "@/types/sentence";
import BoxCard from "./BoxCard.vue";

type FormSentenceWithIdx = Sentence & { idx: number | null };
const message = useMessage();

const props = withDefaults(
  defineProps<{
    init: () => FormSentenceWithIdx;
    formValue: FormSentenceWithIdx;
    border?: boolean;
  }>(),
  {
    border: true,
  }
);
const emit = defineEmits<{
  (e: "update:formValue", item: FormSentenceWithIdx): void;
  (e: "success", item: FormSentenceWithIdx): void;
}>();

const { formValue, border } = toRefs(props);

const { mutate: mutateUpdateSentence, loading: updateLoading } =
  useUpdateSentence({
    onDone(result) {
      if (result) {
        emit("success", formValue.value);
        message.success("更新成功");
      }
    },
  });

const submit = async () => {
  const { sentenceUid, content, note, translation } = formValue.value;
  await mutateUpdateSentence({
    input: {
      sentenceUid,
      content,
      note,
      translation,
    },
  });
};
</script>
<template>
  <BoxCard :border="border" class="max-w-500px">
    <SentenceForm
      :form-value="formValue"
      @update:form-value="
        (v) => emit('update:formValue', { ...formValue, ...v })
      "
      :loading="updateLoading"
      label="更新"
      @submit="submit"
    ></SentenceForm>
  </BoxCard>
</template>
