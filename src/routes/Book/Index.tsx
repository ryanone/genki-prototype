import { useOutletContext } from 'react-router';
import { Book } from '@/data/book';
import LessonsAccordion from '@/components/LessonsAccordion';
import styles from './Index.module.css';

export default function Index() {
  const book = useOutletContext() as Book;
  return (
    <div className={styles.indexRoute}>
      <p>{book.introduction}</p>
      <h2>Lessons</h2>
      <LessonsAccordion
        bookId={book.id}
        lessons={book.lessons}
        viewMode="DETAILED"
      />
    </div>
  );
}
