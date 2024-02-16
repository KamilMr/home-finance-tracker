import {Button, Table, TableContainer, TableHead, TableCell, TableRow, TableBody} from '@mui/material';
import {Box, Container} from '@mui/system';
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFetch} from '../hooks';
import {addExpense, selectExpenses} from '../store';

const ExpensesList = () => {
  const cf = useFetch();
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
              <TableCell>opis</TableCell>
              <TableCell>data</TableCell>
              <TableCell>cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(exp => (
              <TableRow key={exp.id}>
                <TableCell>{exp.description}</TableCell>
                <TableCell>{format(exp.date,  'dd/MM/yyyy')}</TableCell>
                <TableCell>{exp.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExpensesList;
