import type { Book } from '@/data/book';
import type { Exercise } from '@/data/exercise';
import type { LessonExercises } from '@/data/lesson';

type BookParams = {
  bookId: string;
};

type ExerciseParams = {
  bookId: string;
  exerciseId: string;
};

type LessonExercisesParams = {
  bookId: string;
  lessonId: string;
};

export async function loadData(params: BookParams | ExerciseParams | LessonExercisesParams): Promise<Book | Exercise | LessonExercises> {
  if ('lessonId' in params) {
    return await import (`../data/${params.bookId}/lessons/${params.lessonId}.json`);
  } else if ('exerciseId' in params) {
    return await import (`../data/${params.bookId}/exercises/${params.exerciseId}.json`);
  } else {
    return await import (`../data/${params.bookId}/index.json`);
  }
}
