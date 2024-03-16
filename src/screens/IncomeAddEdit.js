import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {Autocomplete, Box, Button, Container, TextField} from '@mui/material';
import _ from 'lodash';

import {selectIncome, setSnackbar} from '../store';
import {format} from 'date-fns';
import {useFetch} from '../hooks';

const emptyState = () => ({
  id: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  price: '',
  source: '',
  vat: 0,
});

const ExpenseAddEdit = () => {
  const dispatch = useDispatch();
  const {param} = useParams();
  const cf = useFetch();
  const sources = ['JOB', 'INVESTMENT', 'OTHER'];
  const navigate = useNavigate();
  const savedExpense = useSelector(selectIncome(param)) || emptyState();
  const [income, setIncome] = useState(savedExpense);

  const handleSave = async (d) => {
    const newD = _.omitBy(d, (d) => !d || d === 'undefined');
    const {date, price, source, vat = 0} = newD;

    let resp;
    try {
      resp = await cf({
        path: `income/${!isNaN(param) ? param : ''}`,
        method: !isNaN(param) ? 'PATCH' : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: {date, price: +price, source, vat: 1 * vat},
      }).then((res) => res.json());
    } catch (err) {
      console.log(err);
    }
    if (!resp.d) {
      dispatch(setSnackbar({msg: resp.err}));
      return;
    }

    navigate('/income-list');
  };

  // Load expense data if param is an ID
  const handleChange = (event) => {
    const {name, value} = event.target;
    setIncome({...income, [name]: value});
  };

  const handleSourceChange = (_, value) => {
    setIncome({...income, source: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSave(income);
  };

  const handleStop = () => navigate('/income-list');

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 6,
        height: 450,
        justifyContent: 'space-between',
      }}>
      <TextField
        name="date"
        label="Data"
        sx={{mb: 2}}
        type="date"
        value={income.date}
        onChange={handleChange}
        InputLabelProps={{shrink: true}}
      />
      <TextField
        name="price"
        label="Kwota"
        type="number"
        sx={{mb: 2}}
        value={income.price}
        onChange={handleChange}
      />
      <Autocomplete
        options={sources}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Źródło" />}
        onChange={handleSourceChange}
        value={
          sources.find((source) => source === income.source) || null
        }
      />
      <TextField
        name="vat"
        label="Podatek"
        sx={{mb: 2}}
        value={income.description}
        onChange={handleChange}
      />
      <Box
        sx={{
          textAlign: 'right',
        }}>
        <Button color="error" onClick={handleStop}>
          Przerwij
        </Button>
        <Button onClick={handleSubmit}>Zapisz</Button>
      </Box>
    </Container>
  );
};

export default ExpenseAddEdit;
