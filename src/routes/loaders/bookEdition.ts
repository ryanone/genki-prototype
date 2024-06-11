import type { ActionFunctionArgs, Params, ParamParseKey } from 'react-router-dom';

const Paths = {
  bookEdition: ':bookEditionId',
};

interface BookEditionLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.bookEdition>>;
}

export type BookEditionData = {
  description: string;
  title: string;
};

export async function loader({ params }: BookEditionLoaderArgs): Promise<BookEditionData> {
  try {
    const response = await import(`../../data/navigation/${params.bookEditionId}/index.json`) as BookEditionData;
    return {
      title: response.title,
      description: response.description,
    };
  } catch(e) {
    console.error('BookEditionLoader error: %o', e);
    throw e;
  }
}