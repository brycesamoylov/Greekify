import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Word } from "@shared/schema";
import { WordCard } from "@/components/WordCard";
import { FlashcardView } from "@/components/FlashcardView";
import { ProgressBar } from "@/components/ProgressBar";
import { getProgress, toggleWordProgress, getProgressPercentage } from "@/lib/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { List, LayoutGrid } from "lucide-react";

type ViewMode = "list" | "flashcard";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const { data: words, isLoading } = useQuery<Word[]>({
    queryKey: ["/api/words"],
  });

  const progress = getProgress();

  if (isLoading || !words) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Learn Greek: Top 100 Words
        </h1>

        <ProgressBar value={getProgressPercentage(words.length)} />

        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "flashcard" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("flashcard")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>

        {viewMode === "list" ? (
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4">
              {words.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  isLearned={progress.has(word.id)}
                  onToggleLearned={() => toggleWordProgress(word.id)}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <FlashcardView
            words={words}
            progress={progress}
            onToggleLearned={toggleWordProgress}
          />
        )}
      </div>
    </div>
  );
}