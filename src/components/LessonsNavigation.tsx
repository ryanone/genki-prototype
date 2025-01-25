import { FaBars, FaX } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import LessonsAccordion from '@/components/LessonsAccordion';
import { type Lesson } from '@/data/lesson';
import * as commonStyles from '@/styles/common.css';
import {
  lessonsNavigation,
  type LessonsNavigationVariant,
} from './LessonsNavigation.css';
import * as styles from './LessonsNavigation.css';

type LessonsNavigationProps = {
  bookId: string;
  lessons: Lesson[];
};

export default function LessonsNavigation({
  bookId,
  lessons,
}: LessonsNavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  let lessonsNavigationVariant: LessonsNavigationVariant;
  if (isVisible) {
    lessonsNavigationVariant = { mode: 'expanded' };
  }
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
  }, [location]);

  return (
    <>
      <button
        className={styles.openButtonClass}
        onClick={() => setIsVisible(true)}
        aria-label="Open navigation"
        type="button"
      >
        <FaBars />
      </button>
      <nav className={lessonsNavigation(lessonsNavigationVariant)}>
        <div className={styles.headerClass}>
          <span className={styles.titleClass}>Exercise List</span>
          <button
            className={commonStyles.secondaryButtonClass}
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
