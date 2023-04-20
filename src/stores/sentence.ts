import {
  useUpdateForm,
  type UpdateFormSentence,
} from "@/components/sentence/useUpdateForm";
import { defineStore } from "pinia";

import { ref, readonly } from "vue";

type SentenceBoxCardType = "create" | "update" | "";

export const useSentenceStore = defineStore("sentence", () => {
  const showModal = ref(false);
  const modalType = ref<SentenceBoxCardType>("");
  const { updateFormValue, updateFormValueInit } = useUpdateForm();

  const openCreateModal = () => {
    openModal("create");
  };
  const openUpdateModal = (v: UpdateFormSentence) => {
    updateFormValue.value = v;
    openModal("update");
  };
  const openModal = (type: Exclude<SentenceBoxCardType, "">) => {
    modalType.value = type;
    showModal.value = true;
  };
  const closeModal = () => {
    modalType.value = "";
    showModal.value = false;
  };

  return {
    showModal,
    modalType: readonly(modalType),
    updateFormValue,
    updateFormValueInit,
    openCreateModal,
    openUpdateModal,
    closeModal,
  };
});
