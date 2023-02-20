import type { Sentence as QuerySentence } from "@/apis/schema";

export type Sentence = Omit<QuerySentence, "__typename">;
