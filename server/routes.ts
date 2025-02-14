import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { greekWords } from "../client/src/lib/words";
import { travelWords } from "../client/src/lib/travel-words";
import { greetingsWords } from "../client/src/lib/greetings-words";

export function registerRoutes(app: Express) {
  app.get("/api/words", async (req, res) => {
    const lesson = req.query.lesson || 'basic';
    let words;
    switch (lesson) {
      case 'travel':
        words = travelWords;
        break;
      case 'greetings':
        words = greetingsWords;
        break;
      default:
        words = greekWords;
    }
    res.json(words.map((word, index) => ({ ...word, id: index + 1 })));
  });

  app.get("/api/progress", async (_req, res) => {
    const progress = await storage.getProgress();
    res.json(progress);
  });

  app.post("/api/progress", async (req, res) => {
    const progress = await storage.updateProgress(req.body);
    res.json(progress);
  });

  return createServer(app);
}
