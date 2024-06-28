import { useQuery } from 'react-query';
import questionApi from 'src/apis/question';

const { getQuestionCategory } = questionApi;

export const useFetchQuestionCategory = () => {
  return useQuery('question/category', () => getQuestionCategory(), {
    staleTime: 300000,
  });
};
