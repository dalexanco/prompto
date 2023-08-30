import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import PopupHome from './home';
import PopupRoot from './root';
import Settings from './settings';

const router = createHashRouter([
  {
    path: '/',
    element: <PopupRoot />,
    children: [
      {
        path: '/',
        element: <PopupHome />
      },
      {
        path: '/details/save',
        element: <Settings />
      }
    ]
  }
]);

const container = document.getElementById('popup');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
