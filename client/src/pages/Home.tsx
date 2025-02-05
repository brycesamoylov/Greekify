import { useState, useCallback, useMemo } from "react";
import { WordCard } from "@/components/WordCard";
import { FlashcardView } from "@/components/FlashcardView";
import { ProgressBar } from "@/components/ProgressBar";
import { getProgress, toggleWordProgress, getProgressPercentage } from "@/lib/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { List, LayoutGrid, Search } from "lucide-react";
import { greekWords, travelWords, greetingsWords, Word } from "../lib/word-lists";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type ViewMode = "list" | "flashcard";
type Lesson = "basic" | "travel" | "greetings";

interface WordWithId extends Word {
  id: number;
  category: Lesson;
}

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [lesson, setLesson] = useState<Lesson>("basic");
  const [searchQuery, setSearchQuery] = useState("");
  const [progressState, setProgressState] = useState(() => getProgress());

  // Create a combined list of all words with their categories
  const allWords: WordWithId[] = useMemo(() => {
    let id = 1;
    return [
      ...greekWords.map(word => ({ ...word, id: id++, category: 'basic' as Lesson })),
      ...travelWords.map(word => ({ ...word, id: id++, category: 'travel' as Lesson })),
      ...greetingsWords.map(word => ({ ...word, id: id++, category: 'greetings' as Lesson }))
    ];
  }, []);

  // Get words based on current lesson and search query
  const words = useMemo(() => {
    let filteredWords = searchQuery
      ? allWords.filter(word =>
          word.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          word.greek.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allWords.filter(word => word.category === lesson);

    return filteredWords;
  }, [lesson, searchQuery, allWords]);

  const handleToggleProgress = useCallback(async (wordId: number) => {
    await toggleWordProgress(wordId);
    setProgressState(getProgress());
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Learn Greek: {lesson === "basic" ? "Top 100 Words" : lesson === "travel" ? "Travel Words" : "Greetings"}
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
          <Button
            variant={lesson === "greetings" ? "default" : "outline"}
            onClick={() => setLesson("greetings")}
          >
            Greetings
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search all words in English or Greek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <ProgressBar value={getProgressPercentage(allWords.length)} />

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
              {words.length > 0 ? (
                words.map((word: WordWithId) => (
                  <div key={word.id} className="relative">
                    {searchQuery && (
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -right-2 z-10"
                      >
                        {word.category === 'basic' ? 'Basic' : 
                         word.category === 'travel' ? 'Travel' : 
                         'Greetings'}
                      </Badge>
                    )}
                    <WordCard
                      word={word}
                      isLearned={progressState.has(word.id)}
                      onToggleLearned={() => handleToggleProgress(word.id)}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No words found matching "{searchQuery}"
                </div>
              )}
            </div>
          </ScrollArea>
        ) : (
          <FlashcardView
            words={words}
            progress={progressState}
            onToggleLearned={handleToggleProgress}
          />
        )}
      </div>
    </div>
  );
}