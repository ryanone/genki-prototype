import { type WritingPracticeExercise } from '@/data/exercise';
import { type WritingPracticeState } from '@/features/writingPractice/writingPracticeSlice';

export default function initializeState(
  exercise: WritingPracticeExercise,
): WritingPracticeState {
  const meta = exercise.meta.WRITING_PRACTICE;
  return {
    initialized: true,
    isFinished: false,
    meta,
    rows: exercise.choices.map((choice) => ({
      choice,
      answers: Array.from({ length: meta.numRepetitions }),
    })),
    startTime: Date.now(),
  };
}
