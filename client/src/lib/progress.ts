import { Word } from "@shared/schema";

export function getProgress(): Set<number> {
  const saved = localStorage.getItem("learned-words");
  return new Set(saved ? JSON.parse(saved) : []);
}

export function toggleWordProgress(wordId: number) {
  const progress = getProgress();
  if (progress.has(wordId)) {
    progress.delete(wordId);
  } else {
    progress.add(wordId);
  }
  localStorage.setItem("learned-words", JSON.stringify(Array.from(progress)));
}

export function getProgressPercentage(total: number): number {
  return (getProgress().size / total) * 100;
}
