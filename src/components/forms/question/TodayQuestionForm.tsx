import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const TodayQuestionForm: FC = () => {
  const navigate = useNavigate();
  const goCreatePage = () => {
    return navigate('create');
  };
  return (
    <Grid container alignItems="center" sx={{ marginTop: 5 }}>
      <Grid item xs={true}>
        <Typography variant="h5" gutterBottom>
          오늘의 문제 풀기
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="text" onClick={goCreatePage}>
          문제 등록하기
        </Button>
      </Grid>
    </Grid>
  );
};

export default TodayQuestionForm;
