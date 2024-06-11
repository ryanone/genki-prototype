import type { ActionFunctionArgs, Params, ParamParseKey } from 'react-router-dom';
import type { Exercise } from '@/data/exercises';

const Paths = {
  exercise: ':bookEditionId/lesson/:lessonId/exercise/:exerciseId',
};

interface ExerciseLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.exercise>>;
}

export async function loader({ params }: ExerciseLoaderArgs): Promise<Exercise> {
  try {
    const response = await import(`../../data/exercises/${params.bookEditionId}/${params.exerciseId}.json`) as Exercise;
    return response;
  } catch(e) {
    console.error('BookEditionLoader error: %o', e);
    throw e;
  }
}