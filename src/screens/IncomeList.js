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
  IconButton,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import {format} from 'date-fns';

import {addIncome, selectIncomes} from '../store';
import {useFetch} from '../hooks';
import {TableCell} from '../components/material';
import AddBtn from '../components/AddBtn';

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
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography variant="h4">Wpływy</Typography>
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
              <TableCell sx={{borderBottom: '.1rem solid'}}>Data</TableCell>
              <TableCell sx={{borderBottom: '.1rem solid'}}>Kwota</TableCell>
              <TableCell sx={{borderBottom: '.1rem solid'}}>Źródło</TableCell>
              <TableCell sx={{borderBottom: '.1rem solid'}}>Kto</TableCell>
              <TableCell sx={{borderBottom: '.1rem solid'}}>Vat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.sortBy(icomes, ['date'])
              .reverse()
              .map((income) => (
                <React.Fragment key={income.id}>
                  <TableRow>
                    <TableCell>{format(new Date(income.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{income.price + ' zł'}</TableCell>
                    <TableCell>{income.source}</TableCell>
                    <TableCell>{income.owner}</TableCell>
                    <TableCell>{income.vat + '%'}</TableCell>
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
                      }}>
                      <IconButton
                        sx={{mr: 3}}
                        onClick={handleDelete(income.id)}>
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
      <AddBtn path="/income-list/add" />
    </Container>
  );
};

export default IncomeList;
