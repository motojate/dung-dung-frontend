import { Box, Typography } from '@mui/material';
import MyAnimalCard from 'src/components/cards/MyAnimalCard';
import TodayTodoCard from 'src/components/cards/TodayTodoCard';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import { TileArgs, Value } from 'react-calendar/dist/cjs/shared/types';
import styles from 'src/modules/Calendar.module.css';

const HomeMain = () => {
  const [value, setValue] = useState<Date>(new Date());

  const onChange = (value: Value) => {
    if (value instanceof Date) setValue(value);
  };

  const titleClassName = ({ date, view }: TileArgs) => {
    if (view === 'month') {
      if (date.getDay() === 0) return styles.sundayHeader;
      if (date.getDay() === 6) return styles.saturdayBody;
    }
  };

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        calendarType="gregory"
        showNeighboringMonth={false}
        tileClassName={titleClassName}
      />
      {/* <MyAnimalCard />
      <TodayTodoCard /> */}
    </>
  );
};

export default HomeMain;
