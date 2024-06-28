import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthMain from '../pages/auth/AuthMain';
import LoginForm from 'src/components/forms/LoginForm';
import MainLayout from 'src/components/layouts/MainLayout';
import HomeMain from 'src/pages/HomeMain';
import QuestionMain from 'src/pages/question/QuestionMain';
import QuestionCreationPage from 'src/pages/question/QuestionCreationPage';
import QuestionCreateForm from 'src/components/forms/question/QuestionCreateForm';
import TodayQuestionForm from 'src/components/forms/question/TodayQuestionForm';

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
        {
          path: 'question',
          element: <QuestionMain />,
          children: [
            {
              path: 'create',
              element: <QuestionCreateForm />,
            },
            {
              path: 'view',
              element: <TodayQuestionForm />,
            },
          ],
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
