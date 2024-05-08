import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const RouterConfig = () => {
  const router = createBrowserRouter([
    {
      element: <></>,
      path: '',
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterConfig;
