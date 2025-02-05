import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express) {
  app.get("/api/words", async (_req, res) => {
    const words = await storage.getAllWords();
    res.json(words);
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
