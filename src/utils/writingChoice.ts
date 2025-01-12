import type { WritingChoiceExercise } from '@/data/exercise';
import type { WritingChoiceState } from '@/features/writingChoice/slice';

export default function initializeState(
  exercise: WritingChoiceExercise,
): WritingChoiceState {
  const meta = exercise.meta.WRITING_CHOICE;
  return {
    answers: exercise.questions.map((question) => ({ question })),
    choices: exercise.choices,
    initialized: true,
    isFinished: false,
    meta,
    startTime: Date.now(),
  };
}
