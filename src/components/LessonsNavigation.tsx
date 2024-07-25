import { FaBars, FaX } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LessonsAccordion from '@/components/LessonsAccordion';
import { type Lesson } from '@/data/lesson';
import styles from './LessonsNavigation.module.css';
import commonStyles from '@/styles/common.module.css';

type LessonsNavigationProps = {
  bookId: string;
  lessons: Lesson[];
};

export default function LessonsNavigation({
  bookId,
  lessons,
}: LessonsNavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const navigationClasses = [styles.lessonsNavigation];
  if (isVisible) {
    navigationClasses.push(styles.expanded);
  }
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
  }, [location]);

  return (
    <>
      <button
        className={`${commonStyles.button} ${styles.openButton}`}
        onClick={() => setIsVisible(true)}
        aria-label="Open navigation"
        type="button"
      >
        <FaBars />
      </button>
      <nav className={navigationClasses.join(' ')}>
        <div className={styles.header}>
          <span className={styles.title}>Exercise List</span>
          <button
            className={commonStyles.secondaryButton}
            onClick={() => setIsVisible(false)}
            aria-label="Close navigation"
            type="button"
          >
            <FaX />
          </button>
        </div>
        <LessonsAccordion
          bookId={bookId}
          lessons={lessons}
          viewMode="COMPACT"
        />
      </nav>
    </>
  );
}
