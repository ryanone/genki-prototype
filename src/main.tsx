import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BookEditionIndexRoute from '@/routes/BookEdition/Index';
import BookEditionRoute from '@/routes/BookEdition';
import ExerciseRoute from '@/routes/Exercise';
import { Paths } from '@/routes/loaders';
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
        path: Paths.bookEdition,
        element: <BookEditionRoute/>,
        loader: bookEditionLoader,
        children: [
          {
            index: true,
            element: <BookEditionIndexRoute/>,
          },
          {
            path: Paths.exercise,
            element: <ExerciseRoute/>,
            loader: exerciseLoader,
          }
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
