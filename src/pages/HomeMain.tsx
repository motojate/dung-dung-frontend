import { Box, Typography } from '@mui/material';
import MyAnimalCard from 'src/components/cards/MyAnimalCard';
import TodayTodoCard from 'src/components/cards/TodayTodoCard';

const HomeMain = () => {
  return (
    <>
      <MyAnimalCard />
      <TodayTodoCard />
    </>
  );
};

export default HomeMain;
