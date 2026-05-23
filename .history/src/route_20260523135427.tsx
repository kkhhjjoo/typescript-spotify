import { createBrowserRouter } from "react-router";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/search/:keyword',
    element: <SearchWithKeywordPage />
  },
  {
    path: '/playlist/:id',
    element: <PlayListDetailPage />
  },
  // {
  //   path: '/playlist',
  //   element: <PlayListPage/>
  // }
]);
