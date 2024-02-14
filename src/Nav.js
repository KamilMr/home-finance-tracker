import {Button} from '@mui/base';
import {Container} from '@mui/system';
import {Link, useNavigate} from 'react-router-dom';

const AuthButton = () => {
  const isLogged = false;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  const handleLogout = () => {};

  if (!isLogged) return (
    <Button onClick={handleNavigate}>Login</Button>
  );

  return (
    <>
    <Button onClick={handleLogout}>Login</Button>
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
