import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Word } from "@shared/schema";
import { WordCard } from "@/components/WordCard";
import { FlashcardView } from "@/components/FlashcardView";
import { ProgressBar } from "@/components/ProgressBar";
import { getProgress, toggleWordProgress, getProgressPercentage } from "@/lib/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { List, LayoutGrid } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

type ViewMode = "list" | "flashcard";

type Lesson = "basic" | "travel";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [lesson, setLesson] = useState<Lesson>("basic");

  const { data: words, isLoading } = useQuery<Word[]>({
    queryKey: ["/api/words", lesson],
    queryFn: () => fetch(`/api/words?lesson=${lesson}`).then(res => res.json())
  });

  const { mutate: updateProgress } = useMutation({
    mutationFn: toggleWordProgress,
    onSuccess: () => {
      // Invalidate and refetch progress
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      // Force a re-render since we're using localStorage
      setViewMode(current => current);
    },
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
        <h1 className="text-3xl font-bold text-center mb-4">
          Learn Greek: {lesson === "basic" ? "Top 100 Words" : "Travel Words"}
        </h1>
        
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={lesson === "basic" ? "default" : "outline"}
            onClick={() => setLesson("basic")}
          >
            Basic Words
          </Button>
          <Button
            variant={lesson === "travel" ? "default" : "outline"}
            onClick={() => setLesson("travel")}
          >
            Travel Words
          </Button>
        </div>

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
                  onToggleLearned={() => updateProgress(word.id)}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <FlashcardView
            words={words}
            progress={progress}
            onToggleLearned={updateProgress}
          />
        )}
      </div>
    </div>
  );
}