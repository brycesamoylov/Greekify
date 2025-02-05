import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory storage
const progressStore = new Map<number, boolean>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    // Return all progress
    const progress = Array.from(progressStore.entries()).map(([wordId, learned]) => ({
      wordId,
      learned
    }));
    return res.status(200).json(progress);
  }
  
  if (req.method === 'POST') {
    const { wordId, learned } = req.body;
    progressStore.set(wordId, learned);
    return res.status(200).json({ wordId, learned });
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 