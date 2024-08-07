import { useLoaderData, useOutletContext } from 'react-router-dom';
import ExerciseRenderer from '@/components/ExerciseRenderer';
import LessonsNavigation from '@/components/LessonsNavigation';
import { type Book } from '@/data/book';
import { type Exercise as ExerciseType } from '@/data/exercise';
import styles from './Exercise.module.css';

export default function Exercise() {
  const exercise = useLoaderData() as ExerciseType;
  const book = useOutletContext() as Book;

  return (
    <div className={styles.exerciseRoute}>
      <LessonsNavigation bookId={book.id} lessons={book.lessons} />
      <div className={styles.heading}>{exercise.title}</div>
      <ExerciseRenderer data={exercise} key={exercise.title} />
    </div>
  );
}
