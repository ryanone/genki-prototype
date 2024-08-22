import type {
  ActionFunctionArgs,
  Params,
  ParamParseKey,
} from 'react-router-dom';
import Paths from '@/routes/loaders';
import loadData from '@/api/dataLoader';
import type { Exercise } from '@/data/exercise';
import type { ExerciseInfo, LessonExercises } from '@/data/lesson';
import { Book } from '@/data/book';

interface ExerciseLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.exercise>>;
}

async function getAdjacentLessonSummaries(
  bookId: string,
  lessonIndex: number,
  direction: 'NEXT' | 'PREVIOUS',
) {
  const adjacentIndex =
    direction === 'NEXT' ? lessonIndex + 1 : lessonIndex - 1;
  const lessonId = `lesson-${adjacentIndex}`;
  const response = (await loadData({
    bookId,
    lessonId: `lesson-${adjacentIndex}`,
  })) as LessonExercises;

  return {
    lessonId,
    summaries: response,
  };
}

export interface AdjacentExerciseInfo extends ExerciseInfo {
  bookId: string;
  lessonId: string;
}

export type ExerciseRouteResponse = {
  exercise: Exercise;
  next: AdjacentExerciseInfo | undefined;
  previous: AdjacentExerciseInfo | undefined;
};

export default async function loader({
  params,
}: ExerciseLoaderArgs): Promise<ExerciseRouteResponse> {
  try {
    const bookId = params.bookId!;
    const resp = (await loadData({
      bookId,
      exerciseId: params.exerciseId!,
    })) as Exercise;
    const exercise = { ...resp };
    const lessonId = `lesson-${params.lessonId}`;
    const lessonExercisesResponse = (await loadData({
      bookId,
      lessonId,
    })) as LessonExercises;
    const exerciseSummaries = lessonExercisesResponse.sections.flatMap(
      (s) => s.exercises,
    );
    const exerciseSummaryIndex = exerciseSummaries.findIndex(
      (e) => e.id === params.exerciseId,
    );
    exercise.title = exerciseSummaries[exerciseSummaryIndex].title;

    const book = (await loadData({
      bookId,
    })) as Book;
    const lessonIndex = parseInt(params.lessonId!, 10);
    let prevExercise;
    if (exerciseSummaryIndex > 0) {
      prevExercise = {
        ...exerciseSummaries[exerciseSummaryIndex - 1],
        bookId,
        lessonId: `${lessonIndex}`,
      };
    } else if (lessonIndex > 0) {
      const response = await getAdjacentLessonSummaries(
        bookId,
        lessonIndex,
        'PREVIOUS',
      );
      if (response) {
        const prevLessonSummaries = response.summaries.sections.flatMap(
          (s) => s.exercises,
        );
        prevExercise = {
          ...prevLessonSummaries[prevLessonSummaries.length - 1],
          bookId,
          lessonId: response.lessonId,
        };
      }
    }
    let nextExercise;
    if (exerciseSummaryIndex < exerciseSummaries.length - 1) {
      nextExercise = {
        ...exerciseSummaries[exerciseSummaryIndex + 1],
        bookId,
        lessonId: `${lessonIndex}`,
      };
    } else if (lessonIndex < book.lessons.length - 1) {
      const response = await getAdjacentLessonSummaries(
        bookId,
        lessonIndex,
        'NEXT',
      );
      if (response) {
        const nextLessonSummaries = response.summaries.sections.flatMap(
          (s) => s.exercises,
        );
        nextExercise = {
          ...nextLessonSummaries[nextLessonSummaries.length - 1],
          bookId,
          lessonId: response.lessonId,
        };
      }
    }
    return {
      exercise,
      next: nextExercise,
      previous: prevExercise,
    };
  } catch (e) {
    console.error('Exercise loader error: %o', e);
    throw e;
  }
}
