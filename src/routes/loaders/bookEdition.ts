import { Paths } from '@/routes/loaders';
import { loadData } from '@/api/dataLoader';
import type { ActionFunctionArgs, Params, ParamParseKey } from 'react-router-dom';
import type { BookEdition } from '@/api/dataLoader';

interface BookEditionLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.bookEdition>>;
}

export async function loader({ params }: BookEditionLoaderArgs): Promise<BookEdition> {
  try {
    const response = await loadData({ bookEditionId: params.bookEditionId as string }) as BookEdition;
    return {
      title: response.title,
      description: response.description,
    };
  } catch(e) {
    console.error('BookEdition loader error: %o', e);
    throw e;
  }
}