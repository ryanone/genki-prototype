import { RouterProvider, createBrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BookIndexRoute from '@/routes/Book/Index';
import BookRoute from '@/routes/Book';
import ExerciseRoute from '@/routes/Exercise';
import IndexRoute from '@/routes/Index';
import RootBoundary from '@/routes/RootBoundary';
import Paths from '@/routes/loaders';
import RootRoute from '@/routes/Root';
import bookLoader from '@/routes/loaders/book';
import exerciseLoader from '@/routes/loaders/exercise';
import { setupStore } from '@/app/store';
import '@/styles/globalStyles.css';

const router = createBrowserRouter([
  {
    hydrateFallbackElement: <h2>Loading...</h2>,
    path: '/',
    errorElement: <RootBoundary />,
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: Paths.book,
        element: <BookRoute />,
        loader: bookLoader,
        children: [
          {
            index: true,
            element: <BookIndexRoute />,
          },
          {
            path: Paths.exercise,
            element: <ExerciseRoute />,
            loader: exerciseLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
