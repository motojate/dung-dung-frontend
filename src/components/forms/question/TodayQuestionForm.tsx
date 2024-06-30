import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FC, useState } from 'react';
import questionApi from 'src/apis/question';
import {
  useFetchQuestionCategory,
  useFetchQuestions,
} from 'src/queries/question/question.query';
import BasicDropdown from 'src/components/dropdowns/BasicDropdown';

const TodayQuestionForm: FC = () => {
  const { categoryCode } = useOutletContext<{
    categoryCode: { label: string; value: string };
  }>();
  const { data, isLoading } = useFetchQuestions(categoryCode.value);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<string>('');

  if (isLoading) return <div>로딩 중...</div>;

  const handleNext = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const question = data ? data[currentQuestionIndex] : null;

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
      {question ? (
        <form onSubmit={console.log}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              p: 2,
              mb: 2,
              width: '100%',
              position: 'relative',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fff',
                display: 'inline-block',
                px: 1,
              }}
            >
              문제
            </Typography>
            <Typography>{question.text}</Typography>
          </Box>
          <Divider>보기</Divider>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel
              id="question-answer-radio-buttons-group-label"
              sx={{ ml: 1 }}
            >
              정 답
            </FormLabel>
            <RadioGroup
              aria-labelledby="question-answer-radio-buttons-group-label"
              name="question-answer-radio-buttons-group"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            >
              {question.options.map((option, index) => (
                <Box
                  key={`${option.label}-${index}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1,
                  }}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label={option.label}
                    labelPlacement="start"
                  />
                  <Box
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: 1,
                      p: 1,
                      ml: 2,
                      width: '100%',
                    }}
                  >
                    <Typography>{option.text}</Typography>
                  </Box>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            type="submit"
          >
            정답 제출
          </Button>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                이전
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                disabled={data && currentQuestionIndex === data.length - 1}
              >
                다음
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <>문제가 존재하지 않습니다.</>
      )}
    </Box>
  );
};

export default TodayQuestionForm;
