import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Box, Container} from '@mui/system';
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Fab,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import _ from 'lodash';

import {addIncome, selectIncomes} from '../store';
import {useFetch} from '../hooks';
import {TableCell} from '../components/material';

const AddBtn = () => {
  const navigate = useNavigate();
  const size = useMediaQuery('(max-width:600px)');
  const handleAdd = () => navigate('/expense-list/add');
  return !size ? null : (
    <Fab
      sx={{
        position: 'fixed',
        right: 50,
        bottom: 100,
      }}
      onClick={handleAdd}
    >
      <AddIcon />
    </Fab>
  );
};

const IncomeList = () => {
  const cf = useFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const icomes = useSelector(selectIncomes);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let data;
      try {
        const resp = await cf({path: 'income'});
        if (!resp.ok) {
          console.log('err');
        }
        data = await resp.json();
      } catch (err) {
        console.log(err);
        return;
      }

      dispatch(addIncome(data.d));
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const handleReload = () => setReload(!reload);
  const handleEdit = (id) => () => navigate(`/income-list/${id}`);
  const handleAdd = () => navigate('/income-list/add');
  const handleDelete = (id) => async () => {
    let resp;
    try {
      resp = await cf({
        path: `income/${id}`,
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

    dispatch(addIncome(resp.d));
  };

  return (
    <Container sx={{p: 0}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Wpływy</h1>
        <Box>
          <IconButton color="secondary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
          <Button onClick={handleReload}>Odśwież</Button>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Źródło</TableCell>
              <TableCell>Kto</TableCell>
              <TableCell>Vat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.sortBy(icomes, ['date']).reverse().map((income) => (
              <React.Fragment key={income.id}>
                <TableRow>
                  <TableCell sx={{borderBottom: 'none', p: 0}}>
                    {income.date}
                  </TableCell>
                  <TableCell sx={{borderBottom: 'none', p: 0}}>
                    {income.price}
                  </TableCell>
                  <TableCell
                    sx={{borderBottom: 'none', p: 0}}
                  >
                    {income.source}
                  </TableCell>
                  <TableCell sx={{borderBottom: 'none', p: 0}}>
                    {income.owner}
                  </TableCell>
                  <TableCell sx={{borderBottom: 'none', p: 0}}>
                    {income.vat}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      m: 0,
                      p: 0,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <IconButton sx={{mr: 3}} onClick={handleDelete(income.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={handleEdit(income.id)}>
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

export default IncomeList;
