import { Paths } from '@/routes/loaders';
import { loadData } from '@/api/dataLoader';
import type { ActionFunctionArgs, Params, ParamParseKey } from 'react-router-dom';
import type { Exercise } from '@/data/exercise';
import type { LessonExercises } from '@/data/lesson';

interface ExerciseLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.exercise>>;
}

export async function loader({ params }: ExerciseLoaderArgs): Promise<Exercise> {
  try {
    const resp = await loadData({
      bookId: params.bookId as string,
      exerciseId: params.exerciseId as string,
    }) as Exercise;
    const exercise = { ...resp };
    const lessonId = `lesson-${params.lessonId}`;
    const lessonExercisesResponse = await loadData({
      bookId: params.bookId as string,
      lessonId,
    }) as LessonExercises;
    const exercises = lessonExercisesResponse.sections.flatMap((s) => s.exercises);
    exercise.title = exercises.find((e) => e.id === params.exerciseId)?.title ?? '';
    return exercise;
  } catch (e) {
    console.error('Exercise loader error: %o', e);
    throw e;
  }
}
