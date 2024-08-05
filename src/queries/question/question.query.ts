import { useQuery } from '@tanstack/react-query';
import questionApi from 'src/apis/question';

const { getQuestionCategory, getQuestions } = questionApi;

export const useFetchQuestionCategory = () => {
  return useQuery({
    queryKey: ['question/category'],
    queryFn: getQuestionCategory,
  });
};

export const useFetchQuestions = (categoryCode: string) => {
  return useQuery({
    queryKey: ['question', categoryCode],
    queryFn: getQuestions,
  });
};
