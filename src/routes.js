import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';

import Home from './pages/Home';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/home" /> },
        { path: 'home', element: <Home /> },
        { path: '*', element: <Navigate to="/home" /> },
      ],
    },
    { path: '*', element: <Navigate to="/home" replace /> },
  ]);
}
