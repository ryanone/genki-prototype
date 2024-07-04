import ExerciseRenderer from '@/components/ExerciseRenderer';
import { useLoaderData } from 'react-router-dom';
import type { Exercise } from '@/data/exercise';
import styles from './Exercise.module.css';

export default function Exercise() {
  const exercise = useLoaderData() as Exercise;

  return (
    <div className={styles.exerciseRoute}>
      <div className={styles.heading}>
        {exercise.title}
      </div>
      <ExerciseRenderer data={exercise} />
    </div>
  )
}