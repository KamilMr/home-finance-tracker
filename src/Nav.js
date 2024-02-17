import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {AppBar, Button, Box, Container} from '@mui/material';

import {useFetch} from './hooks';
import {selectToken, dropMe} from './store';

const AuthButton = () => {
  const token = useSelector(selectToken);
  const cf = useFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    cf({path: 'users/logout', method: 'POST'});
    dispatch(dropMe());
  };

  if (!token) return <Button onClick={handleNavigate}>Login</Button>;

  return (
    <>
      <Button sx={{my: 2, color: 'white'}} onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

const AccountMenu = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" color="secondary">
      <Container maxWidth="xl" sx={{textAlign: 'right'}}>
        <Box>
          <Button
            sx={{
              my: 2,
              color: 'white',
            }}
            onClick={() => navigate('/cats')}
          >
            Kotki
          </Button>
          <Button
            sx={{
              my: 2,
              color: 'white',
            }}
            onClick={() => navigate('/expense-list')}
          >
            Wydatki
          </Button>

          <AuthButton />
        </Box>
      </Container>
    </AppBar>
  );
};

export default AccountMenu;
