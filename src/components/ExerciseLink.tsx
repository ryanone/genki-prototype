import { Link } from 'react-router';
import { type ExerciseInfo } from '@/data/lesson';
import { exerciseLinkClass } from './ExerciseLink.css';

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
      className={exerciseLinkClass}
      to={`/${bookId}/lesson/${lessonId}/exercise/${exercise.id}`}
    >
      {exercise.title}
    </Link>
  );
}
