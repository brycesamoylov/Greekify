import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Word } from "@shared/schema";
import { WordCard } from "./WordCard";

interface FlashcardViewProps {
  words: Word[];
  progress: Set<number>;
  onToggleLearned: (wordId: number) => void;
}

export function FlashcardView({ words, progress, onToggleLearned }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          onClick={goToPrevious} 
          disabled={currentIndex === 0}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {words.length}
        </span>
        <Button 
          onClick={goToNext} 
          disabled={currentIndex === words.length - 1}
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <WordCard
        word={words[currentIndex]}
        isLearned={progress.has(words[currentIndex].id)}
        onToggleLearned={() => onToggleLearned(words[currentIndex].id)}
      />
    </div>
  );
}
