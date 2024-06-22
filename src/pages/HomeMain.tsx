import { Box, Typography } from '@mui/material';
import MyAnimalCard from 'src/components/cards/MyAnimalCard';
import TodayTodoCard from 'src/components/cards/TodayTodoCard';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import moment from 'moment';

const HomeMain = () => {
  const [value, setValue] = useState<Date>(new Date());

  const onChange = (value: Value) => {
    if (value instanceof Date) setValue(value);
  };

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')}
        formatYear={(locale, date) => moment(date).format('YYYY')}
        formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
        showNeighboringMonth={false}
        calendarType="gregory"
      />
      {/* <MyAnimalCard />
      <TodayTodoCard /> */}
    </>
  );
};

export default HomeMain;
