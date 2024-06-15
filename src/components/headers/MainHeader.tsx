import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';

const MainHeader: FC = () => {
  const title = 'TODO';
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Button variant="text" color="inherit" size={'small'}>
          {title}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
