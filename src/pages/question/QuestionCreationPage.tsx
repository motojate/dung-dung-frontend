import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

const QuestionCreationPage: FC = () => {
  return (
    <Box
      sx={{
        marginTop: 5,
        padding: '20px',
      }}
    >
      <Typography variant="h5" mt={1} mb={5} gutterBottom>
        {'오늘의 asd 풀기'}
      </Typography>
      <Outlet />
    </Box>
  );
};

export default QuestionCreationPage;
