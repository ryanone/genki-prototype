import ExerciseLink from '@/components/ExerciseLink';
import { type ExerciseInfo } from '@/data/lesson';
import styles from './ExercisesList.module.css';

type ExercisesListProps = {
  bookId: string;
  exercises: ExerciseInfo[];
  lessonId: string;
};

export default function ExercisesList({
  bookId,
  exercises,
  lessonId,
}: ExercisesListProps) {
  return (
    <ol className={styles.exercisesList}>
      {exercises.map((e) => (
        <li key={e.id}>
          <ExerciseLink bookId={bookId} lessonId={lessonId} exercise={e} />
        </li>
      ))}
    </ol>
  );
}
