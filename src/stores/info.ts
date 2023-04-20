import { ref } from "vue";
import { defineStore } from "pinia";

export const useInfoStore = defineStore("info", () => {
  const virtualScrollerUpdateParts = ref({
    viewStartIdx: 0,
    viewEndIdx: 0,
    visibleStartIdx: 0,
    visibleEndIdx: 0,
  });
  const updateVirtualScroller = (
    viewStartIndex: number,
    viewEndIndex: number,
    visibleStartIndex: number,
    visibleEndIndex: number
  ) => {
    virtualScrollerUpdateParts.value.viewStartIdx = viewStartIndex;
    virtualScrollerUpdateParts.value.viewEndIdx = viewEndIndex;
    virtualScrollerUpdateParts.value.visibleStartIdx = visibleStartIndex;
    virtualScrollerUpdateParts.value.visibleEndIdx = visibleEndIndex;
  };
  return {
    virtualScrollerUpdateParts,
    updateVirtualScroller,
  };
});
