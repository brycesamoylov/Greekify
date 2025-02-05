import { useQuery } from "@tanstack/react-query";
import { Word } from "@shared/schema";
import { WordCard } from "@/components/WordCard";
import { ProgressBar } from "@/components/ProgressBar";
import { getProgress, toggleWordProgress, getProgressPercentage } from "@/lib/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
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
        
        <ScrollArea className="h-[calc(100vh-200px)]">
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
      </div>
    </div>
  );
}
