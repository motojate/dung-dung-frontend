import { Box, Button, Divider } from '@mui/material';
import { FC } from 'react';
import * as yup from 'yup';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ValidationInput from 'src/components/inputs/ValidationInput';

interface IQuestionCreateFormInput {
  text: string;
  options: { text: string }[];
}

const schema: yup.ObjectSchema<IQuestionCreateFormInput> = yup.object().shape({
  text: yup.string().required('문제는 필수 입력 값입니다.'),
  options: yup
    .array()
    .of(
      yup.object({
        text: yup.string().required('보기는 필수 입력 값입니다.'),
      })
    )
    .required(),
});

const QuestionCreateForm: FC = () => {
  const methods = useForm<IQuestionCreateFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: '',
      options: [{ text: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'options',
  });

  const onSubmit = (data: IQuestionCreateFormInput) => {
    console.log(data);
  };

  const onError = (error: any, e: any) => {
    console.error(error);
    console.log(e);
  };

  return (
    <Box
      sx={{
        borderRadius: '16px',
        p: 2,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <ValidationInput
            name="text"
            label="문제를 입력해주세요."
            multiline
            fullWidth
            minRows={4}
          />
          <Divider>보기</Divider>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 1,
            }}
          >
            <Button size="small" variant="text" disabled={fields.length >= 5}>
              보기 가져오기
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={() => append({ text: '' })}
              disabled={fields.length >= 5}
            >
              보기 추가
            </Button>
          </Box>
          {fields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between', // 간격을 균등하게 설정
                alignItems: 'center', // 세로 축 중앙 정렬
                marginBottom: 1, // 각 요소 사이의 마진 추가
              }}
            >
              <ValidationInput
                name={`options.${index}.text`}
                label={String.fromCharCode(97 + index)}
                multiline
                fullWidth
              />
              <Button
                size="small"
                variant="text"
                color="error"
                sx={{ marginLeft: 2 }} // 버튼과 입력 필드 사이의 간격
                onClick={() => remove(index)}
                disabled={fields.length <= 1}
              >
                삭제
              </Button>
            </Box>
          ))}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1 }} // 상단 여백
            type="submit"
          >
            등록
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default QuestionCreateForm;
