import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Box, Container} from '@mui/system';
import {
  Button,
  IconButton,
  Badge,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';

import {removeExpense, selectExpenses} from '../store';
import {useFetch} from '../hooks';
import AddBtn from '../components/AddBtn';

const ExpensesList = () => {
  const cf = useFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [number, setNumber] = useState(20);
  const [open, setOpen] = useState(false);
  const expenses = useSelector(selectExpenses(number));

  const handleReload = () => setNumber(number + 60);
  const handleEdit = (id) => () => navigate(`/expense-list/${id}`);
  const handleAdd = () => navigate('/expense-list/add');
  const handleOpenDialog = (id) => () => {
    setOpen(id);
  };

  const handleConfirmDialog = async () => {
    try {
      await handleDelete(open);
    } catch (err) {
      console.log(err);
    }

    setOpen(false);
  };

  const handleCloseDialog = async () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    let resp;
    try {
      resp = await cf({
        path: `expenses/${id}`,
        method: 'DELETE',
      }).then((res) => res.json());
    } catch (err) {
      console.log(err);
      return;
    }
    if (typeof resp.err === 'string') {
      console.log(resp.err);
      return;
    }

    dispatch(removeExpense(id));
  };

  return (
    <Container sx={{p: 0, m: 0, textAlign: 'center'}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Badge badgeContent={expenses.length} color="primary">
          <Typography variant="h4">Wydatki</Typography>
        </Badge>
        <Box>
          <IconButton color="secondary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Container>
        {expenses.map((exp) => (
          <Card key={exp.id} sx={{m: 0, mb: 1, p: 0, textAlign: 'left'}}>
            <CardHeader subheader={exp.description} />
            <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box>
                  <Typography>{exp.date}</Typography>
                  <Typography>{exp.price + ' zł'}</Typography>
                </Box>
                <Box>
                  <Typography>{exp.category}</Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <IconButton sx={{mr: 3}} onClick={handleOpenDialog(exp.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleEdit(exp.id)}>
                <ModeEditIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Container>
      <Button onClick={handleReload}>Pokaż więcej</Button>
      <AddBtn path="/expense-list/add" />
      <DialogBox
        handleClose={handleCloseDialog}
        open={open}
        title="Usunąć ten wydatek?"
        txt="Zamierzasz usunąć wydatek, co chcesz zrobić?"
        handleConfirm={handleConfirmDialog}
      />
    </Container>
  );
};

const DialogBox = ({handleClose, open, title, txt, handleConfirm}) => {
  return (
    <Dialog onClose={handleClose} open={Boolean(open)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{txt}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Nie</Button>
        <Button onClick={handleConfirm} autoFocus>
          Tak
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpensesList;
