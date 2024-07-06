import ExercisesList from '@/components/ExercisesList';
import { type LessonSection } from '@/data/lesson';
import styles from './ExercisesSection.module.css';

type ExercisesSectionProps = {
  lessonId: string;
  section: LessonSection;
}

export default function ExercisesSection({ lessonId, section }: ExercisesSectionProps) {
  return (
    <div className={styles.exercisesSection}>
      { section.content ?? <div className={styles.heading}>{section.content}</div> }
      <ExercisesList lessonId={lessonId} exercises={section.exercises}/>
    </div>
  )
}