import {
  Box,
  Divider,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

import { FC } from 'react';
import InfiniteScrollTable from 'src/components/tables/InfiniteScrollTable';

const JobApplicationMain: FC = () => {
  return <InfiniteScrollTable />;
};

export default JobApplicationMain;
