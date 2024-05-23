import { CircularProgress, ThemeProvider } from '@mui/material';
import { mainTheme } from '../../styles/themes/mainTheme';
import CommonContent from '../utils/CommonContent';
import MainHeader from 'src/components/headers/MainHeader';
import React from 'react';

interface IMainLayoutProps {
  header?: boolean;
  footer?: boolean;
}

const MainLayout: React.FC<IMainLayoutProps> = ({
  header = true,
  footer = true,
}) => {
  return (
    <ThemeProvider theme={mainTheme}>
      {header && <MainHeader />}
      <CommonContent />
      {footer && <></>}
    </ThemeProvider>
  );
};

export default MainLayout;
