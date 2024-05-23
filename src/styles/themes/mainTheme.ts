import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#9575cd',
    },
  },
  typography: {
    fontFamily: 'TTLaundryGothicB',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          marginBottom: '10px',
        },
      },
    },
  },
});
