import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BookIndexRoute from '@/routes/Book/Index';
import BookRoute from '@/routes/Book';
import ExerciseRoute from '@/routes/Exercise';
import IndexRoute from '@/routes/Index';
import { Paths } from '@/routes/loaders';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import RootRoute from '@/routes/Root';
import { loader as bookLoader } from '@/routes/loaders/book';
import { loader as exerciseLoader } from '@/routes/loaders/exercise';
import { store } from '@/app/store';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute/>,
    children: [
      {
        index: true,
        element: <IndexRoute/>
      },
      {
        path: Paths.book,
        element: <BookRoute/>,
        loader: bookLoader,
        children: [
          {
            index: true,
            element: <BookIndexRoute/>,
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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
