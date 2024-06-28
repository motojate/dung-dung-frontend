import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { FC } from 'react';
import * as yup from 'yup';
import {
  FormProvider,
  useFieldArray,
  useForm,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ValidationInput from 'src/components/inputs/ValidationInput';
import { generateLabel } from 'src/utils/data-generate.util';
import questionApi from 'src/apis/question';
import { useOutletContext } from 'react-router-dom';

export interface IQuestionCreateFormInput {
  text: string;
  options: { text: string }[];
  answer: string;
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
  answer: yup.string().required('정답은 필수 입력 값입니다.'),
});

const QuestionCreateForm: FC = () => {
  const { categoryCode } = useOutletContext<{
    categoryCode: { label: string; value: string };
  }>();

  const methods = useForm<IQuestionCreateFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: '',
      options: [{ text: '' }],
      answer: 'a',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'options',
  });

  const onSubmit = async (data: IQuestionCreateFormInput) => {
    const dto = { ...data, categoryCode: categoryCode.value };
    await questionApi.createQuestion(dto);
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
          <Controller
            name="answer"
            control={methods.control}
            render={({ field: radioField }) => (
              <RadioGroup {...radioField}>
                {fields.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 1,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={radioField.value === generateLabel(index)}
                          value={generateLabel(index)}
                        />
                      }
                      label=""
                    />
                    <ValidationInput
                      name={`options.${index}.text`}
                      label={generateLabel(index)}
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
              </RadioGroup>
            )}
          />

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
