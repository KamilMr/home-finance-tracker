import {Button} from '@mui/base';
import {Container} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
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

  if (!token) return (
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
        <Link style={{marginRight: 12}} to={'/cats'}>Kotki</Link>
        <Link style={{marginRight: 12}} to={'/expense-list'}>Wydatki</Link>
        <AuthButton />
      </Container>
    </nav>
  );
};

export default AccountMenu;
