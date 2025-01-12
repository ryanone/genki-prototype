import { type WritingPracticeExercise } from '@/data/exercise';
import { type WritingPracticeState } from '@/features/writingPractice/slice';

export default function initializeState(
  exercise: WritingPracticeExercise,
): WritingPracticeState {
  const meta = exercise.meta.WRITING_PRACTICE;
  return {
    initialized: true,
    isFinished: false,
    meta,
    rows: exercise.questions.map((question) => ({
      question,
      answers: Array.from({ length: meta.numRepetitions }).map(() => ({})),
    })),
    startTime: Date.now(),
  };
}
