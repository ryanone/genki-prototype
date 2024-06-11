import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BookEditionRoute from '@/routes/BookEdition/Index';
import ExerciseRoute from '@/routes/Exercise';
import React from 'react';
import ReactDOM from 'react-dom/client';
import RootRoute from '@/routes/Root';
import { loader as bookEditionLoader } from '@/routes/loaders/bookEdition';
import { loader as exerciseLoader } from '@/routes/loaders/exercise';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute/>,
    children: [
      {
        path: ':bookEditionId',
        element: <BookEditionRoute/>,
        loader: bookEditionLoader,
      },
      {
        path: ':bookEditionId/lesson/:lessonId/exercise/:exerciseId',
        element: <ExerciseRoute/>,
        loader: exerciseLoader,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
