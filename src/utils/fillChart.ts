import type { FillChartExercise } from '@/data/exercise';
import type { FillChartState } from '@/features/fillChart/slice';

export default function initializeState(
  exercise: FillChartExercise,
): FillChartState {
  const meta = exercise.meta.FILL_CHART;
  const choicesMap = new Map(
    exercise.choices.map((choice) => [choice.id, choice]),
  );
  return {
    initialized: true,
    isFinished: false,
    items: exercise.questions.map((question) => ({
      answer: {},
      correctChoice: choicesMap.get(question.choices.correctId)!,
      question,
    })),
    meta,
    startTime: Date.now(),
  };
}
