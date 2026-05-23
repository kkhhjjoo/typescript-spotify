import { createBrowserRouter } from "react-router";
import AppLayout from './layout/AppLayout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/HomePage/HomePage').then(m => ({ Component: m.default }))
      },
      {
        path: 'search',
        lazy: () => import('./pages/SearchPage/SearchPage').then(m => ({ Component: m.default }))
      },
      {
        path: 'search/:keyword',
        lazy: () => import('./pages/SearchWithKeywordPage/SearchWithKeywordPage').then(m => ({ Component: m.default }))
      },
      {
        path: 'playlist/:id',
        lazy: () => import('./pages/PlayListDetailPage/PlayListDetailPage').then(m => ({ Component: m.default }))
      },
      {
        path: 'playlist',
        lazy: () => import('./pages/PlayListPage/PlayListPage').then(m => ({ Component: m.default }))
      }
    ]
  }
]);
