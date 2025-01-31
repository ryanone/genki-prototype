import { useLoaderData, useOutletContext } from 'react-router';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import LessonsNavigation from '@/components/LessonsNavigation';
import { type Book } from '@/data/book';
import { type ExerciseRouteResponse } from '@/routes/loaders/exercise';
import * as styles from './Exercise.css';

export default function Exercise() {
  const exerciseResp = useLoaderData() as ExerciseRouteResponse;
  const book = useOutletContext() as Book;
  const { exercise, next, previous } = exerciseResp;

  return (
    <div className={styles.exerciseRouteClass}>
      <LessonsNavigation bookId={book.id} lessons={book.lessons} />
      <div className={styles.headingClass}>{exercise.title}</div>
      <ExerciseRenderer
        data={exercise}
        next={next}
        previous={previous}
        key={exercise.title}
      />
    </div>
  );
}
