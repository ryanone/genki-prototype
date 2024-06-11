import type { Exercise } from '@/data/exercises';

type BookParams = {
  bookEditionId: string;
};

type ExerciseParams = {
  bookEditionId: string;
  exerciseId: string;
}

export type BookEdition = {
  description: string;
  title: string;
};

export async function loadData(params: BookParams|ExerciseParams): Promise<BookEdition|Exercise> {
  if ('exerciseId' in params) {
    return await import (`../data/exercises/${params.bookEditionId}/${params.exerciseId}.json`);
  } else {
    return await import (`../data/navigation/${params.bookEditionId}/index.json`);
  }
}