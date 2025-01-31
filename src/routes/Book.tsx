import { Outlet, useLoaderData } from 'react-router';
import Header from '@/components/Header';
import type { Book } from '@/data/book';

export default function BookRoute() {
  const book = useLoaderData() as Book;

  return (
    <div className="bookroute">
      <Header
        bookId={book.id}
        description={book.description}
        title={book.title}
      />
      <Outlet context={book} />
    </div>
  );
}
