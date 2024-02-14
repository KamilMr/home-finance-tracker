import {Button} from '@mui/base';
import {Container} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {selectToken, dropMe} from './store';

const AuthButton = () => {
  const isLogged = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(dropMe);
  };

  if (!isLogged) return (
    <Button onClick={handleNavigate}>Login</Button>
  );

  return (
    <>
    <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

const AccountMenu = () => {
  return (
    <nav>
      <Container sx={{
        textAlign: 'right',
      }}>
        <Link style={{marginRight: 12}} to={'/cats'}>Cats</Link>
        <Link style={{marginRight: 12}} to={'/'}>App</Link>
        <AuthButton />
      </Container>
    </nav>
  );
};

export default AccountMenu;
