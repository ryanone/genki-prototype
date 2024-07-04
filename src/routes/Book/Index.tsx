import { Book } from '@/data/book';
import LessonInfo from '@/components/LessonInfo';
import { useOutletContext } from 'react-router-dom';
import styles from './Index.module.css';

export default function Index() {
  const book = useOutletContext() as Book;
  return (
    <div className={styles.indexRoute}>
      <h2>Lessons</h2>
      {
        book.lessons.map(lesson => {
          return <LessonInfo key={book.id} bookId={book.id} lesson={lesson}/>
        })
      }
    </div>
  )
}