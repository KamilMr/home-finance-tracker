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
  const handleDelete = id => async () => {
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

    dispatch(addExpense(resp.d));
  };

  return (
    <Container>
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
              <TableCell>Opis</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(exp => (
              <React.Fragment key={exp.id}>
                <TableRow>
                  <TableCell
                    sx={{borderBottom: 'none', p: 0}}
                  >{exp.description}</TableCell>
                  <TableCell
                    sx={{borderBottom: 'none', p: 0}}
                  >{exp.date}</TableCell>
                  <TableCell
                    sx={{borderBottom: 'none', p: 0, textAlign: 'center'}}
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
                    <IconButton onClick={handleDelete(exp.id)}>
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
