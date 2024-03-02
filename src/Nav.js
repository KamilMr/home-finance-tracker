import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {
  AppBar,
  Button,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {useFetch, useMediaQ} from './hooks';
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
      <NavigateButton
        sx={{ml: 2}}
        onClick={handleLogout}
        title="Logout"
      />
    </>
  );
};

const NavigateButton = ({path, title, cb, ...rest}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQ('sm');
  const handleNavigate = (path) => (e) => {
    if (typeof cb === 'function') cb(false)(e);
    navigate(path);
  };
  return (
    <Button
      sx={{my: 1, color: isMobile ? '' : 'white'}}
      onClick={handleNavigate(path)}
      size="small"
      {...rest}>
      {title}
    </Button>
  );
};

const AccountMenu = () => {
  const isMobile = useMediaQ('sm');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    {path: '/summary', title: 'Podsumowanie'},
    {path: '/income-list', title: 'Wpływy'},
    {path: '/cats', title: 'Kotki'},
    {path: '/expense-list', title: 'Wydatki'},
    // Add more items here
  ];

  return (
    <AppBar position="fixed" color="secondary">
      <Container maxWidth="xl" sx={{textAlign: 'right'}}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem key={index}>
                    <NavigateButton
                      key={index}
                      path={item.path}
                      title={item.title}
                      cb={toggleDrawer}
                    />
                  </ListItem>
                ))}
                <AuthButton />
              </List>
            </Drawer>
          </>
        ) : (
          <Box>
            {menuItems.map((item, index) => (
              <NavigateButton key={index} path={item.path} title={item.title} />
            ))}
            <AuthButton />
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default AccountMenu;
