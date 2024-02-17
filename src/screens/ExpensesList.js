import {Button, Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Fab, IconButton} from '@mui/material';
import {Box, Container} from '@mui/system';

import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFetch} from '../hooks';
import {addExpense, selectExpenses} from '../store';
import {useNavigate} from 'react-router-dom';

const AddBtn = () => {
  const navigate = useNavigate();
  const handleAdd = () => navigate('/expense-list/add');
  return (
    <Fab sx={{
      position: 'fixed',
      right: 50,
      bottom: 100,
    }} onClick={handleAdd}>
      <AddIcon />
    </Fab>
  );
};

const ExpensesList = () => {
  const cf = useFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let data;
      try {
        const resp = await cf({path: 'expenses'});
        if (!resp.ok) {
          console.log('err');
        }
        data = await resp.json();
      } catch (err) {
        console.log(err);
        return;
      }

      dispatch(addExpense(data.d));
    };

    getData();

  }, [reload]);

  const handleReload = () => setReload(!reload);
  const handleEdit = id => () => navigate(`/expense-list/${id}`);
  const handleDelete = id => () => {
    // add handle delete
  };

  return (
    <Container sx={{

    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h1>Wydatki</h1>
        <Button onClick={handleReload}>Odśwież</Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>opis</TableCell>
              <TableCell>data</TableCell>
              <TableCell>cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(exp => (
              <React.Fragment key={exp.id}>
                <TableRow>
                  <TableCell
                    sx={{borderBottom: 'none'}}
                  >{exp.description}</TableCell>
                  <TableCell
                    sx={{borderBottom: 'none'}}
                  >{exp.date}</TableCell>
                  <TableCell
                    sx={{borderBottom: 'none'}}
                  >{exp.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      m: 0,
                      p: 0,
                    }}>
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={handleEdit(exp.id)}>
                      <ModeEditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddBtn />
    </Container>
  );
};

export default ExpensesList;
