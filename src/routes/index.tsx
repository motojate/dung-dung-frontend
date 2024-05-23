import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthMain from '../pages/auth/AuthMain';
import LoginForm from 'src/components/forms/LoginForm';
import MainLayout from 'src/components/layouts/MainLayout';
import HomeMain from 'src/pages/HomeMain';

const RouterConfig = () => {
  const router = createBrowserRouter([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <HomeMain />,
        },
      ],
    },
    {
      path: 'auth',
      element: <MainLayout header={false} footer={false} />,
      children: [
        {
          element: <AuthMain />,
          children: [
            {
              path: 'login',
              element: <LoginForm />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterConfig;
