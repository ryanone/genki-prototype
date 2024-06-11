import { Book } from '@/data/book';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Index() {
  const book = useOutletContext() as Book;

  return (
    <div className="bookindexroute">
      <h2>Lessons</h2>
      {

      }
      <ol>
        <li><Link to="lesson/0/exercise/0-1">Lesson 0, Exercise 1</Link></li>
      </ol>
    </div>
  )
}