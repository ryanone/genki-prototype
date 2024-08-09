import type { Choice, ShortAnswerExercise } from '@/data/exercise';
import type {
  Item,
  ShortAnswerState,
} from '@/features/shortAnswer/shortAnswerSlice';

export default function initializeState(
  exercise: ShortAnswerExercise,
): ShortAnswerState {
  const choices = new Map(exercise.choices.map((c) => [c.id, c]));
  const meta = exercise.meta.SHORT_ANSWER;
  const config = meta.configuration;
  return {
    correctChoices: exercise.questions.reduce(
      (acc, q) => {
        acc[q.choices.correctId] = choices.get(q.choices.correctId) as Choice;
        return acc;
      },
      {} as Record<string, Choice>,
    ),
    initialized: true,
    isFinished: false,
    items: exercise.questions.map((question) => {
      const item: Item = {
        question,
      };
      if (config && question.id && config[question.id]) {
        item.width = config[question.id].width;
      }
      return item;
    }),
    meta,
    startTime: Date.now(),
  };
}
