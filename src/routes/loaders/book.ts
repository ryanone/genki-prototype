import { Paths } from '@/routes/loaders';
import { loadData } from '@/api/dataLoader';
import type { ActionFunctionArgs, Params, ParamParseKey } from 'react-router-dom';
import type { Book } from '@/data/book';

interface BookLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.bookEdition>>;
}

export async function loader({ params }: BookLoaderArgs): Promise<Book> {
  try {
    const response = await loadData({ bookId: params.bookId as string }) as Book;
    return response;
  } catch(e) {
    console.error('Book loader error: %o', e);
    throw e;
  }
}