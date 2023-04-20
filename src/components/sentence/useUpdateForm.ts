import { ref } from "vue";
import type { Sentence } from "@/types/sentence";

export type UpdateFormSentence = Sentence & { idx: number | null };

export const useUpdateForm = () => {
  const updateFormValueInit = (): UpdateFormSentence => ({
    idx: null,
    sentenceUid: "",
    content: "",
    note: "",
    translation: "",
  });
  const updateFormValue = ref<UpdateFormSentence>(updateFormValueInit());

  return {
    updateFormValue,
    updateFormValueInit,
  };
};
