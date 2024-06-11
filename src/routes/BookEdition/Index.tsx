import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="bookeditionindexroute">
      <h3>Lessons</h3>
      <ol>
        <li><Link to="lesson/0/exercise/0-1">Lesson 0, Exercise 1</Link></li>
      </ol>
    </div>
  )
}