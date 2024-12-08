import { useLoaderData, useOutletContext } from 'react-router';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import LessonsNavigation from '@/components/LessonsNavigation';
import { type Book } from '@/data/book';
import { type ExerciseRouteResponse } from '@/routes/loaders/exercise';
import styles from './Exercise.module.css';

export default function Exercise() {
  const exerciseResp = useLoaderData() as ExerciseRouteResponse;
  const book = useOutletContext() as Book;
  const { exercise, next, previous } = exerciseResp;

  return (
    <div className={styles.exerciseRoute}>
      <LessonsNavigation bookId={book.id} lessons={book.lessons} />
      <div className={styles.heading}>{exercise.title}</div>
      <ExerciseRenderer
        data={exercise}
        next={next}
        previous={previous}
        key={exercise.title}
      />
    </div>
  );
}
