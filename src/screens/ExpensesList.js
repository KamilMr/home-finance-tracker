import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
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
  Paper,
  InputBase,
  Divider,
} from '@mui/material';

import {removeExpense, selectExpenses} from '../store';
import {useFetch} from '../hooks';
import AddBtn from '../components/AddBtn';
import {format} from 'date-fns';

const SearchField = ({handleFilters}) => {
  const [value, setValue] = useState('');
  const onChange = e => {
    const val = e.target.value;
    if (typeof handleFilters === 'function') {
      handleFilters(val);
    }
    setValue(val);
  };
  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 320,
        m: 2
      }}>
      <InputBase
        sx={{ml: 1, flex: 1}}
        value={value}
        placeholder="Szukaj"
        inputProps={{'aria-label': 'search google maps'}}
        onChange={onChange}
      />
      <IconButton type="button" sx={{p: '10px'}} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{height: 28, m: 0.5}} orientation="vertical" />
      <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
        <FilterListIcon />
      </IconButton>
    </Paper>
  );
};

const ExpensesList = () => {
  const cf = useFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [number, setNumber] = useState(60);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({txt: ''}); // [txt, categoryid]
  const expenses = useSelector(selectExpenses(number, filter));

  const handleReload = () => setNumber(number + 60);
  const handleEdit = (id) => () => navigate(`/expense-list/${id}`);
  const handleAdd = () => navigate('/expense-list/add');
  const handleOpenDialog = (id) => () => {
    setOpen(id);
  };

  const handleFilters = val => {
    setFilter({...filter, txt: val});
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
        <Badge
          badgeContent={
            'Nowe: ' +
            expenses.filter(
              (exp) => exp.date === format(new Date(), 'dd/MM/yyyy'),
            ).length
          }
          color="primary">
          <Typography variant="h4">Wydatki</Typography>
        </Badge>
        <Box>
          <IconButton color="secondary" onClick={handleAdd} sx={{mr: 2}}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <SearchField handleFilters={handleFilters} />
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
