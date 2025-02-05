import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Word } from "@shared/schema";
import { motion } from "framer-motion";

interface WordCardProps {
  word: Word;
  isLearned: boolean;
  onToggleLearned: () => void;
}

export function WordCard({ word, isLearned, onToggleLearned }: WordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="perspective-1000"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`w-full cursor-pointer transform transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardContent className="p-6">
          <div className={`${isFlipped ? "hidden" : "block"}`}>
            <h2 className="text-3xl font-bold mb-4">{word.greek}</h2>
            <p className="text-xl text-muted-foreground mb-2">{word.phonetic}</p>
            <p className="text-lg text-muted-foreground">{word.english}</p>
          </div>
          <div className={`${isFlipped ? "block" : "hidden"}`}>
            <h3 className="text-xl font-bold mb-4">Definition: {word.english}</h3>
            <p className="text-lg">Memory Helper: {word.mnemonic}</p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Badge variant={isLearned ? "default" : "outline"}>
              {isLearned ? (
                <Check className="w-4 h-4 mr-1" />
              ) : null}
              {isLearned ? "Learned" : "Not Learned"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLearned();
              }}
            >
              Mark {isLearned ? "Unlearned" : "Learned"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}