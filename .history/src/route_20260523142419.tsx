import { createBrowserRouter } from "react-router";
import React from 'react';
// import AppLayout from './layout/AppLayout';
// import HomePage from './pages/HomePage/HomePage';
// import SearchPage from './pages/SearchPage/SearchPage';
// import PlayListPage from './pages/PlayListPage/PlayListPage';
// import PlayListDetailPage from './pages/PlayListDetailPage/PlayListDetailPage';
// import SearchWithKeywordPage from './pages/SearchWithKeywordPage/SearchWithKeywordPage';

//lazy loading
const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/SearchWithKeywordPage/SearchWithKeywordPage'));
const PlayListDetailPage = React.lazy(() => import('./pages/PlayListDetailPage/PlayListDetailPage'));
const PlayListPage = React.lazy(() => import('./pages/PlayListPage/PlayListPage'));


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
    path: 'search',
    element: <SearchPage />
      },
      {
    path: 'search/:keyword',
    element: <SearchWithKeywordPage />
      },
      {
    path: 'playlist/:id',
    element: <PlayListDetailPage />
      },
      {
    path: 'playlist',
    element: <PlayListPage />
  }
    ]
  }
  
]);
