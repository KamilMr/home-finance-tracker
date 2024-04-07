import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Autocomplete, Box, Button, Container, TextField } from '@mui/material';

import { handleCategory, selectMainCategories } from '../store';
import MyComponent from './Picker';

const emptyState = () => ({
  groupId: '',
  name: '',
  color: '',
});

const CategoryNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainCat = useSelector(selectMainCategories);
  const [category, setCategory] = useState(emptyState());
  const sources = mainCat.map((ar) => ar[0]);

  // Load expense data if param is an ID
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSourceChange = (_, value) => {
    setCategory({ ...category, groupId: mainCat.find(c => c[0] === value)[1] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    category.color = category.color.slice(1);
    dispatch(handleCategory({ method: 'POST', ...category }));
  };


  const handleStop = () => navigate('/category-list');
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 6,
        height: 450,
        justifyContent: 'space-between',
      }}>
      <MyComponent cb={handleChange} />
      <TextField
        name="name"
        label="nazwa"
        sx={{ mb: 2 }}
        value={category.name}
        onChange={handleChange}
      />
      <Autocomplete
        options={sources}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Kategorie" />}
        onChange={handleSourceChange}
        value={sources.find((source) => source === mainCat.find(mc => mc[1] === category.groupId)?.[0]) || null}
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

export default CategoryNew;
