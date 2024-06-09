import { Link, Outlet, useLoaderData } from 'react-router-dom';
import Header from '@/components/Header';
import type { BookEditionData } from '@/routes/loaders/bookEdition';

export default function Index() {
  const bookEdition: BookEditionData = useLoaderData() as BookEditionData;

  return (
    <div className="bookeditionroute">
      <Header description={bookEdition.description} title={bookEdition.title}/>
      {
        /*
        Navigation goes here
        */
      }
      <h3>Lessons</h3>
      <ol>
        <li><Link to="lesson/1/exercise/1">Lesson 1, Exercise 1</Link></li>
      </ol>
      <Outlet/>
    </div>
  )
}