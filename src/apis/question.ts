import { IQuestionCreateFormInput } from 'src/components/forms/question/QuestionCreateForm';
import axiosInstanceObj from '.';
import { generateLabel } from 'src/utils/data-generate.util';
import { QueryFunctionContext } from 'react-query';

const { serviceAxiosInstance } = axiosInstanceObj;

export interface IQuestionCategory {
  name: string;
  code: string;
}

interface IQuestion {
  answer: string;
  text: string;
  options: { text: string; label: string }[];
}

export type TQueryKey<T> = [string, T];

const getQuestions = async ({
  queryKey,
}: QueryFunctionContext<TQueryKey<string>>) => {
  const [, categoryCode] = queryKey;
  const { data: result } = await serviceAxiosInstance.get<{
    code: number;
    data: IQuestion[];
  }>(`/question?categoryCode=${categoryCode}`);

  const { data } = result;

  return data;
};

const getQuestionCategory = async () => {
  const { data: result } = await serviceAxiosInstance.get<{
    code: number;
    data: IQuestionCategory[];
  }>('/question/category');

  const { data } = result;

  return data;
};

const createQuestion = async (dto: IQuestionCreateFormInput) => {
  const { options, ...otherDto } = dto;
  const addLabelOptions = options.map((v, idx) => ({
    ...v,
    label: generateLabel(idx),
  }));
  const newDto = {
    ...otherDto,
    options: addLabelOptions,
  };

  await serviceAxiosInstance.post('/question', newDto);
};

const questionApi = {
  createQuestion,
  getQuestionCategory,
  getQuestions,
};

export default questionApi;
