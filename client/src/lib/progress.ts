import { Word, InsertProgress } from "@shared/schema";
import { apiRequest } from "./queryClient";

export function getProgress(): Set<number> {
  const saved = localStorage.getItem("learned-words");
  return new Set(saved ? JSON.parse(saved) : []);
}

export async function toggleWordProgress(wordId: number) {
  const progress = getProgress();
  const isLearned = !progress.has(wordId);

  // Update local storage
  if (isLearned) {
    progress.add(wordId);
  } else {
    progress.delete(wordId);
  }
  localStorage.setItem("learned-words", JSON.stringify(Array.from(progress)));

  // Update server
  await apiRequest("POST", "/api/progress", {
    wordId,
    learned: isLearned
  });
}

export function getProgressPercentage(total: number): number {
  return (getProgress().size / total) * 100;
}