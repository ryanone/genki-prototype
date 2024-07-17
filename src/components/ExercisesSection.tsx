import ExercisesList from '@/components/ExercisesList';
import { type LessonSection } from '@/data/lesson';
import styles from './ExercisesSection.module.css';

type ExercisesSectionProps = {
  bookId: string;
  lessonId: string;
  section: LessonSection;
};

export default function ExercisesSection({
  bookId,
  lessonId,
  section,
}: ExercisesSectionProps) {
  return (
    <div className={styles.exercisesSection}>
      {section.content ? (
        <div className={styles.heading}>{section.content}</div>
      ) : null}
      <ExercisesList
        bookId={bookId}
        lessonId={lessonId}
        exercises={section.exercises}
      />
    </div>
  );
}
