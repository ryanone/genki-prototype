// TODO: Delete when LessonDetail component is complete
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadData } from '@/api/dataLoader';
import type { Lesson, LessonExercises, ExerciseInfo } from '@/data/lesson';

type LessonInfoProps = {
  bookId: string;
  lesson: Lesson;
}

export default function LessonInfo({ bookId, lesson }: LessonInfoProps) {
  const [exercises, setExercises] = useState<ExerciseInfo[]|undefined>();

  useEffect(() => {
    async function getData() {
      loadData({
        bookId,
        lessonId: lesson.exercisesId
      })
      .then((response) => {
        const le = response as LessonExercises;
        setExercises(le.exercises);
      })
      .catch(e => {
        console.error('LessonInfo error in useEffect() %o', e);
      });
    }


    getData();
  }, [bookId, lesson]);

  const exerciseList = exercises &&
    (<ol>
      {exercises.map(e => <li key={e.id}><Link to={`lesson/${lesson.id}/exercise/${e.id}`}>{e.title}</Link></li>)}
    </ol>);


  return (
    <div className="lessoninfo">
      <h3>{lesson.title}</h3>
      {exerciseList}
    </div>
  )
}