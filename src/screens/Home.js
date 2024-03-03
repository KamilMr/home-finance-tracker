import {Typography} from '@mui/material';
import {Container} from '@mui/system';
import {useSelector} from 'react-redux';
import AddBtn from '../components/AddBtn';
import {useFetchIni} from '../hooks';

import {selectMe} from '../store';

const Home = () => {
  useFetchIni();

  const {name = ''} = useSelector(selectMe);

  return (
    <Container
      sx={{
        mt: 6,
      }}
    >
      <Typography variant="h3">{`Cześć ${name}`}</Typography>
      <Typography variant="h5">Miłego dnia!</Typography>
      <Typography variant="h5">Buenos dias!</Typography>
      <Typography variant="h5">Buen dia!</Typography>
      <Typography variant="h5">Good morning!</Typography>
      <AddBtn path="/expense-list/add" />
    </Container>
  );
};

export default Home;
