import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import PopupHomePage from './pages/PopupHomePage';
import PopupErrorPage from './pages/PopupErrorPage';

const router = createHashRouter([
  {
    path: '/',
    element: <PopupHomePage />,
    errorElement: <PopupErrorPage />
  }
]);

const container = document.getElementById('popup');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
