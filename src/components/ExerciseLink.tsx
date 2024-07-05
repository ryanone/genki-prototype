import { Link } from 'react-router-dom';
import styles from './ExerciseLink.module.css';
import { type ExerciseInfo } from '@/data/lesson';

type ExerciseLinkProps = {
  lessonId: string;
  exercise: ExerciseInfo;
}

export default function ExerciseLink({ lessonId, exercise }: ExerciseLinkProps) {
  return <Link className={styles.exerciseLink} to={`lesson/${lessonId}/exercise/${exercise.id}`}>{exercise.title}</Link>
}