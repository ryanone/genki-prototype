import { Link } from 'react-router-dom';
import { type ExerciseInfo } from '@/data/lesson';

type ExerciseLinkProps = {
  lessonId: string;
  exercise: ExerciseInfo;
}

export default function ExerciseLink({ lessonId, exercise }: ExerciseLinkProps) {
  return <Link to={`lesson/${lessonId}/exercise/${exercise.id}`}>{exercise.title}</Link>
}