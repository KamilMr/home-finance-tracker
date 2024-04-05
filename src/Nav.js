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
import CachedIcon from '@mui/icons-material/Cached';

import {useFetch, useMediaQ} from './hooks';
import {selectToken, dropMe, fetchIni} from './store';
import {
  CATEGORY_LIST_ADD_EDIT_PATH,
  CATS_PATH,
  EXPENSE_LIST_PATH,
  INCOME_LIST_PATH,
  SUMMARY_PATH,
} from './common.js';

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
      <NavigateButton sx={{ml: 2}} onClick={handleLogout} title="Logout" />
    </>
  );
};

const ReloadButton = () => {
  const dispatch = useDispatch();
  const handleFetchIni = () => {
    dispatch(fetchIni());
  };
  return (
    <IconButton sx={{mr: 2, color: 'white'}} onClick={handleFetchIni}>
      <CachedIcon />
    </IconButton>
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
    {path: SUMMARY_PATH, title: 'Podsumowanie'},
    {path: INCOME_LIST_PATH, title: 'Wpływy'},
    {path: CATS_PATH, title: 'Kotki'},
    {path: EXPENSE_LIST_PATH, title: 'Wydatki'},
    {path: CATEGORY_LIST_ADD_EDIT_PATH, title: 'Kategorie'},
    // Add more items here
  ];

  return (
    <AppBar position="fixed" color="secondary">
      <Container maxWidth="xl" sx={{textAlign: 'right'}}>
        {isMobile ? (
          <>
            <ReloadButton />
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
                <ReloadButton />
              </List>
            </Drawer>
          </>
        ) : (
          <Box>
            <ReloadButton />
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
