import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FC, useState } from 'react';

interface ITodayTodoDialogProps {
  open: boolean;
  handleClickClose: () => void;
}

const TodayTodoDialog: FC<ITodayTodoDialogProps> = ({
  open,
  handleClickClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClickClose}>
      <DialogTitle>{'오늘의 할 일'}</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

const TodayTodoCard: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <Card>
      <CardHeader
        title={'오늘의 할 일'}
        action={<Button onClick={handleClickOpen}>{'관리하기'}</Button>}
      />
      <TodayTodoDialog open={open} handleClickClose={handleClickClose} />
      <CardContent></CardContent>
    </Card>
  );
};

export default TodayTodoCard;
