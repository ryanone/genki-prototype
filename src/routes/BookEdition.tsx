import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '@/components/Header';
import type { BookEdition } from '@/api/dataLoader';

export default function BookEdition() {
  const bookEdition = useLoaderData() as BookEdition;

  return (
    <div className="bookeditionroute">
      <Header description={bookEdition.description} title={bookEdition.title}/>
      {
        /*
        Navigation goes here
        */
      }
      <Outlet context={bookEdition}/>
    </div>
  )
}