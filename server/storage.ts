import { Word, UserProgress, InsertWord, InsertProgress } from "@shared/schema";

export interface IStorage {
  getAllWords(): Promise<Word[]>;
  getProgress(): Promise<UserProgress[]>;
  updateProgress(progress: InsertProgress): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private words: Map<number, Word>;
  private progress: Map<number, UserProgress>;
  private currentProgressId: number;

  constructor() {
    this.words = new Map();
    this.progress = new Map();
    this.currentProgressId = 1;

    // Initialize with static word data
    import("../client/src/lib/words").then(({ greekWords }) => {
      greekWords.forEach((word, index) => {
        this.words.set(index + 1, { id: index + 1, ...word });
      });
    });
    import("../client/src/lib/travel-words").then(({ travelWords }) => {
      travelWords.forEach((word, index) => {
        this.words.set(this.words.size + 1, { id: this.words.size + 1, ...word });
      });
    });
  }

  async getAllWords(): Promise<Word[]> {
    return Array.from(this.words.values());
  }

  async getProgress(): Promise<UserProgress[]> {
    return Array.from(this.progress.values());
  }

  async updateProgress(insertProgress: InsertProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const progress: UserProgress = { ...insertProgress, id };
    this.progress.set(id, progress);
    return progress;
  }
}

export const storage = new MemStorage();