import { useQuery } from 'react-query';
import questionApi from 'src/apis/question';

const { getQuestionCategory, getQuestions } = questionApi;

export const useFetchQuestionCategory = () => {
  return useQuery('question/category', getQuestionCategory, {
    staleTime: 300000,
  });
};

export const useFetchQuestions = (categoryCode: string) => {
  return useQuery(['question', categoryCode], getQuestions);
};
