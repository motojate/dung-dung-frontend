import { Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useFetchQuestionCategory } from 'src/queries/question/question.query';
import BasicDropdown from 'src/components/dropdowns/BasicDropdown';

interface IMenuOption {
  title: string;
  url: string;
}

const QuestionMain: FC = () => {
  const {
    data: questionCategories,
    error,
    isLoading,
  } = useFetchQuestionCategory();
  if (isLoading) return <div>로딩 중....</div>;
  if (!questionCategories) return <div>로딩 중....</div>;

  const loadedQuestionCategories = questionCategories.map(v => ({
    label: v.name,
    value: v.code,
  }));

  const [seletedCategoryCode, setSeletedCategoryCode] = useState<{
    label: string;
    value: string;
  }>(loadedQuestionCategories[0]);
  const navigate = useNavigate();
  const menuOptions: IMenuOption[] = [
    { title: '오늘의 문제', url: 'view' },
    { title: '문제 등록', url: 'create' },
  ];
  const [menuTitle, setMenuTitle] = useState<string>(menuOptions[0].title);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeMenu = (option: IMenuOption) => {
    setMenuTitle(option.title);
    navigate(option.url);
    return handleClose();
  };

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: 5,
          marginBottom: 3,
        }}
        alignItems="center"
      >
        <Typography variant="h5" sx={{ flexGrow: 1, ml: 2 }}>
          {menuTitle}
        </Typography>
        <BasicDropdown<string>
          value={seletedCategoryCode}
          options={loadedQuestionCategories}
          onChange={setSeletedCategoryCode}
        />
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {menuOptions.map(option => (
            <MenuItem
              key={option.title}
              selected={option.title === menuTitle}
              onClick={() => changeMenu(option)}
            >
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      <Outlet context={{ categoryCode: seletedCategoryCode }} />
    </>
  );
};

export default QuestionMain;
