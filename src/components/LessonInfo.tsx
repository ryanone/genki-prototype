import type { Lesson } from '@/data/lesson';

type LessonInfoProps = {
  data: Lesson;
}

export default function LessonInfo({ data }: LessonInfoProps) {

  return (
    <div className="lessoninfo">
      <h3>{data.title}</h3>
    </div>
  )
}