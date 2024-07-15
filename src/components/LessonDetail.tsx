import { useEffect, useState } from 'react';
import ExercisesList from '@/components/ExercisesList';
import ExercisesSection from '@/components/ExercisesSection';
import loadData from '@/api/dataLoader';
import { type ExerciseInfo, type LessonExercises, type LessonSection } from '@/data/lesson';

type LessonDetailProps = {
  bookId: string;
  lessonId: string;
  viewMode: 'COMPACT' | 'DETAILED';
};

export default function LessonDetail({ bookId, lessonId, viewMode }: LessonDetailProps) {
  const [sections, setSections] = useState<LessonSection[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await loadData({ bookId, lessonId: `lesson-${lessonId}` }) as LessonExercises;
        setSections(response.sections);
      } catch (e) {
        console.error('LessonDetail - error in getData(): %o', e);
      }
    }

    getData();
  }, [bookId, lessonId]);
  const exercises: ExerciseInfo[] = viewMode === 'COMPACT' ? sections.flatMap((s) => s.exercises) : [];

  return (
    viewMode === 'DETAILED'
      ? (
        <div>
          {
            sections.map((s, i) => (
              <ExercisesSection key={s.content ?? i} bookId={bookId} lessonId={lessonId} section={s} />))
          }
        </div>
      )
      : (<ExercisesList bookId={bookId} lessonId={lessonId} exercises={exercises} />)
  );
}
