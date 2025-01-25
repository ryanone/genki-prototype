import ExercisesList from '@/components/ExercisesList';
import { type LessonSection } from '@/data/lesson';
import * as styles from './ExercisesSection.css';

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
    <div className={styles.exercisesSectionClass}>
      <div
        className={styles.headingClass}
        data-testid="exercises-section-heading"
      >
        {section.content}
      </div>
      <ExercisesList
        bookId={bookId}
        lessonId={lessonId}
        exercises={section.exercises}
      />
    </div>
  );
}
