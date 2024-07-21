import { generateRandomChoices, randomizeArray } from '@/utils/randomize';
import type { MultipleChoiceExercise, Question } from '@/data/exercise';
import {
  NUM_CHOICES_PER_QUESTION,
  type Answer,
  type MultipleChoiceState,
} from '@/features/multipleChoice/multipleChoiceSlice';

export default function initializeState(
  exercise: MultipleChoiceExercise,
): MultipleChoiceState {
  const meta = exercise.meta.MULTIPLE_CHOICE;
  const randomizeQuestions = !!meta?.randomizeQuestions;
  const answers: Answer[] = (
    randomizeQuestions
      ? (randomizeArray(exercise.questions) as Question[])
      : exercise.questions
  ).map((question) => ({ question }));
  const index = 0;
  answers[index].choices = generateRandomChoices(
    answers[index].question,
    exercise.choices,
    NUM_CHOICES_PER_QUESTION,
  );
  return {
    answers,
    choices: exercise.choices,
    isQuestionFinished: false,
    index,
    initialized: true,
    meta,
    startTime: Date.now(),
  };
}
