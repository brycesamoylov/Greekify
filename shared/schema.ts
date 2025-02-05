import { pgTable, text, serial, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  greek: text("greek").notNull(),
  english: text("english").notNull(),
  phonetic: text("phonetic").notNull(),
  mnemonic: text("mnemonic").notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  wordId: serial("word_id").references(() => words.id),
  learned: boolean("learned").default(false),
});

export const insertWordSchema = createInsertSchema(words);
export const insertProgressSchema = createInsertSchema(userProgress);

export type Word = typeof words.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertWord = z.infer<typeof insertWordSchema>;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
