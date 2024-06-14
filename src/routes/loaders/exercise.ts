import { Paths } from '@/routes/loaders';
import { loadData } from '@/api/dataLoader';
import type { ActionFunctionArgs, Params, ParamParseKey } from 'react-router-dom';
import type { Exercise } from '@/data/exercise';

interface ExerciseLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.exercise>>;
}

export async function loader({ params }: ExerciseLoaderArgs): Promise<Exercise> {
  try {
    const response = await loadData({
      bookId: params.bookId as string,
      exerciseId: params.exerciseId as string,
   }) as Exercise;
    return response;
  } catch(e) {
    console.error('Exercise loader error: %o', e);
    throw e;
  }
}