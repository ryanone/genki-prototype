import type { Book } from '@/data/book';
import type { Exercise } from '@/data/exercise';

type BookParams = {
  bookId: string;
};

type ExerciseParams = {
  bookId: string;
  exerciseId: string;
}

export async function loadData(params: BookParams|ExerciseParams): Promise<Book|Exercise> {
  if ('exerciseId' in params) {
    return await import (`../data/exercises/${params.bookId}/${params.exerciseId}.json`);
  } else {
    return await import (`../data/navigation/${params.bookId}/index.json`);
  }
}