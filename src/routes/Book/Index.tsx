import { Book } from '@/data/book';
import LessonInfo from '@/components/LessonInfo';
import { useOutletContext } from 'react-router-dom';

export default function Index() {
  const book = useOutletContext() as Book;
  return (
    <div className="bookindexroute">
      <h2>Lessons</h2>
      {
        book.lessons.map(lesson => {
          return <LessonInfo bookId={book.id} lesson={lesson}/>
        })
      }
    </div>
  )
}