import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import BalanceIcon from '@mui/icons-material/Balance';
import MoneyIcon from '@mui/icons-material/Money';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import {Box} from '@mui/system';
import {EXPENSE_LIST_PATH, INCOME_LIST_PATH, SUMMARY_PATH} from '../common';
import {useMediaQ} from '../hooks';

const target = [EXPENSE_LIST_PATH, INCOME_LIST_PATH, SUMMARY_PATH];

const BottomNav = () => {
  const {pathname} = useLocation();

  const isMobile = useMediaQ('sm');
  const navigate = useNavigate();
  const [value, setValue] = useState(target.indexOf(pathname.split('/')[1]));

  const handleNavigate = (e, newVal) => {
    setValue(newVal);
    navigate(target[newVal]);
  };

  useEffect(() => {
    const idx = target.indexOf(pathname.split('/')[1]);
    if (idx > -1) {
      setValue(idx);
    }

  }, [pathname]);

  if (!isMobile) return null;
  return (
    <Box>
      <Paper
        sx={{position: 'fixed', bottom: 0, left: 0, right: 0}}
        elevation={3}>
        <BottomNavigation onChange={handleNavigate} value={value}>
          <BottomNavigationAction
            label="Wydatki"
            icon={<ShoppingCartCheckoutIcon />}
          />
          <BottomNavigationAction label="Wpływy" icon={<MoneyIcon />} />
          <BottomNavigationAction label="Podsumowanie" icon={<BalanceIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
