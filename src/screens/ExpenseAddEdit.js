import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {Autocomplete, Box, Button, Container, TextField} from '@mui/material';
import _ from 'lodash';

import {selectCategories, selectExpense} from '../store';
import {format} from 'date-fns';
import {useFetch} from '../hooks';

const emptyState = () => ({
  id: '',
  description: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  price: '',
  categoryId: ''
});

const ExpenseAddEdit = () => {
  const {param} = useParams();
  const cf = useFetch();
  const categories = useSelector(selectCategories);
  const navigate = useNavigate();
  const savedExpense = useSelector(selectExpense(param)) || emptyState();
  const [expense, setExpense] = useState(savedExpense);

  const handleSave = async (d) => {
    const newD = _.omitBy(d, (d) => !d || d === 'undefined');
    const {description, categoryId, date, price} = newD;
    let resp;
    try {
      resp = await cf({
        path: `expenses/${!isNaN(param) ? param : ''}`,
        method: !isNaN(param) ? 'PUT' : 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: {description, categoryId, date, price},
      }).then(res => res.json());
    }catch (err) {
      console.log(err);
    }
    if (!resp.d) return;

    navigate('/expense-list');
  };

  // Load expense data if param is an ID
  const handleChange = (event) => {
    const {name, value} = event.target;
    setExpense({...expense, [name]: value});
  };

  const handleCategoryChange = (event, value) => {
    setExpense({...expense, categoryId: value.catId});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSave(expense);
  };

  const handleStop = () => navigate('/expense-list');

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      mt: 6,
      height: 450,
      justifyContent: 'space-between',
    }}>
      <TextField
        name="description"
        label="Opis"
        value={expense.description}
        onChange={handleChange}
      />
      <TextField
        name="date"
        label="Data"
        type="date"
        value={expense.date}
        onChange={handleChange}
        InputLabelProps={{shrink: true}}
      />
      <TextField
        name="price"
        label="Cena"
        type="number"
        value={expense.price}
        onChange={handleChange}
      />
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.category}
        renderInput={(params) => <TextField {...params} label="Kategorie" />}
        onChange={handleCategoryChange}
        value={categories.find(cat => cat.catId === expense.categoryId) || null}
      />
      <Box sx={{
        textAlign: 'right'
        }}>
        <Button onClick={handleStop}>Stop</Button>
        <Button onClick={handleSubmit}>Zapisz</Button>
      </Box>
    </Container>
  );
};

export default ExpenseAddEdit;
