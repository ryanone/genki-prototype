import { Link } from 'react-router-dom';
import styles from './ExerciseLink.module.css';
import { type ExerciseInfo } from '@/data/lesson';

type ExerciseLinkProps = {
  bookId: string;
  exercise: ExerciseInfo;
  lessonId: string;
};

export default function ExerciseLink({
  bookId,
  lessonId,
  exercise,
}: ExerciseLinkProps) {
  return (
    <Link
      className={styles.exerciseLink}
      to={`/${bookId}/lesson/${lessonId}/exercise/${exercise.id}`}
    >
      {exercise.title}
    </Link>
  );
}
