import ExerciseLink from '@/components/ExerciseLink';
import { type ExerciseInfo } from '@/data/lesson';
import { exercisesListClass } from './ExercisesList.css';

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
    <ol className={exercisesListClass}>
      {exercises.map((e) => (
        <li key={e.id}>
          <ExerciseLink bookId={bookId} lessonId={lessonId} exercise={e} />
        </li>
      ))}
    </ol>
  );
}
