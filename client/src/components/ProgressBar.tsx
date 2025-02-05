import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <Progress value={value} className="h-2" />
      <p className="text-sm text-muted-foreground text-center">
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}
