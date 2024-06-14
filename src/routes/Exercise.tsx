import ExerciseRenderer from '@/components/ExerciseRenderer';
import { useLoaderData } from 'react-router-dom';
import type { Exercise } from '@/data/exercise';
import './Exercise.css';

export default function Exercise() {
  const exercise = useLoaderData() as Exercise;

  return (
    <div className="exerciseroute">
      <div className="exerciseroute__heading">
        {exercise.title}
      </div>
      <ExerciseRenderer data={exercise} />
    </div>
  )
}