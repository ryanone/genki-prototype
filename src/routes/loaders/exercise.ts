import type { ActionFunctionArgs, Params, ParamParseKey } from 'react-router-dom';

const Paths = {
  exercise: ':bookEditionId/lesson/:lessonId/exercise/:exerciseId',
};

interface ExerciseLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.exercise>>;
}
