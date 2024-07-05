import ExerciseLink from '@/components/ExerciseLink';
import { type ExerciseInfo } from '@/data/lesson';
import styles from './ExercisesList.module.css';

type ExercisesListProps = {
  exercises: ExerciseInfo[];
  lessonId: string;
}

export default function ExercisesList({ exercises, lessonId }: ExercisesListProps) {
  return (
    <ol className={styles.exercisesList}>
      {
        exercises.map(e => <li key={e.id}><ExerciseLink lessonId={lessonId} exercise={e}/></li>)
      }
    </ol>
  )
}