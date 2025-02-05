import { Word, InsertProgress } from "@shared/schema";
import { apiRequest } from "./queryClient";

export function getProgress(): Set<number> {
  const saved = localStorage.getItem("learned-words");
  return new Set(saved ? JSON.parse(saved) : []);
}

export function toggleWordProgress(wordId: number): void {
  const progress = getProgress();
  const isLearned = !progress.has(wordId);

  if (isLearned) {
    progress.add(wordId);
  } else {
    progress.delete(wordId);
  }
  
  localStorage.setItem("learned-words", JSON.stringify(Array.from(progress)));
}

export function getProgressPercentage(total: number): number {
  return (getProgress().size / total) * 100;
}