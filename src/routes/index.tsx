import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/layouts/Layout';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
];
