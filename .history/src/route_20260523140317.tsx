import { createBrowserRouter } from "react-router";
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage/HomePage';



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
      // {
  //   path: 'playlist',
  //   element: <PlayListPage/>
  // }
    ]
  }
  
]);
