import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Box, Container} from '@mui/system';
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

import AddBtn from '../components/AddBtn';
import MultiSelect from '../components/MultiSelect';
import SearchField from '../components/SearchField';
import {format} from 'date-fns';
import {removeExpense, selectCategories, selectExpenses} from '../store';
import {useFetch} from '../hooks';

const ExpensesList = () => {
  const cf = useFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [number, setNumber] = useState(60);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState({txt: '', categories: []}); // [txt, categoryid]
  const expenses = useSelector(selectExpenses(number, filter));
  const categories = useSelector(selectCategories).map(c => c.category);

  const handleOpenFilter = () => setOpenFilter(!openFilter);
  const handleReload = () => setNumber(number + 60);
  const handleEdit = id => () => navigate(`/expense-list/${id}`);
  const handleAdd = () => navigate('/expense-list/add');
  const handleOpenDialog = id => () => {
    setOpen(id);
  };

  const handleFilters = type => val => {
    if (type === 'txt') setFilter({...filter, txt: val});
    else
      setFilter({
        ...filter,
        categories: val.target.value.filter(el => !!el).slice(-1),
      });
  };

  const clearFilters = () => setFilter({txt: '', categories: []});

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
  const handleDelete = async id => {
    let resp;
    try {
      resp = await cf({
        path: `expenses/${id}`,
        method: 'DELETE',
      }).then(res => res.json());
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
        }}
      >
        <Badge
          badgeContent={
            'Nowe: ' +
            expenses.filter(
              exp => exp.date === format(new Date(), 'dd/MM/yyyy'),
            ).length
          }
          color="primary"
        >
          <Typography variant="h4" sx={{ml: 2, pl: 1}}>
            Wydatki
          </Typography>
        </Badge>
        <Box>
          <IconButton color="primary" onClick={handleAdd} sx={{mr: 2}}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Container sx={{mb: 2}}>
        <SearchField
          value={filter.txt}
          onChange={handleFilters('txt')}
          openFilter={handleOpenFilter}
        />
        {Boolean(openFilter) ? (
          <MultiSelect
            checkedArr={filter.categories}
            items={categories}
            onChange={handleFilters('cat')}
            sxProp={{
              height: 50,
              width: '100%',
            }}
          />
        ) : null}
        {filter.txt || filter.categories.length ? (
          <Box sx={{textAlign: 'right', mt: 1}}>
            <Button size="small" variant="text" onClick={clearFilters}>
              Wymaż filtry
            </Button>
          </Box>
        ) : null}
      </Container>
      <Container>
        {expenses.map(exp => (
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
