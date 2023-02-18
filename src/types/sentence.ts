import type { SentenceInList } from "@/apis/schema";

export type Sentence = Pick<
  SentenceInList,
  "content" | "note" | "sentenceUid" | "translation"
>;
