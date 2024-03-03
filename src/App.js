import React from 'react';
import {Box, Container} from '@mui/material';
import {Cats} from './Cats';
import {Navigate} from 'react-router-dom';

import AccountMenu from './Nav';
import BottomNav from './components/BottomNav';
import ExpenseAddEdit from './screens/ExpenseAddEdit';
import ExpensesList from './screens/ExpensesList';
import Home from './screens/Home';
import IncomeAddEdit from './screens/IncomeAddEdit';
import IncomeList from './screens/IncomeList';
import Login from './Login';
import Summary from './screens/Summary';
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import {selectToken} from './store';
import {useSelector} from 'react-redux';
import {
  CATS_PATH,
  EXPENSE_ADD_EDIT_PATH,
  EXPENSE_LIST_PATH,
  HOME_PATH,
  INCOME_ADD_EDIT_PATH,
  INCOME_LIST_PATH,
  SUMMARY_PATH,
} from './common';

const Protected = ({children}) => {
  const token = useSelector(selectToken);
  if (!token) return <Navigate to="/login" />;

  return children;
};

const Layout = ({children}) => {
  return (
    <Container sx={{mt: 12}}>
      <Box>
        <AccountMenu />
        {children}
        <BottomNav />
      </Box>
    </Container>
  );
};

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: (
      <Protected>
        <Layout>
          <Outlet />
        </Layout>
      </Protected>
    ),
    children: [
      {
        path: HOME_PATH,
        element: <Home />,
      },
      {
        path: CATS_PATH,
        element: <Cats />,
      },
      {
        path: EXPENSE_LIST_PATH,
        element: <ExpensesList />,
      },
      {
        path: EXPENSE_ADD_EDIT_PATH,
        element: <ExpenseAddEdit />,
      },
      {
        path: INCOME_LIST_PATH,
        element: <IncomeList />,
      },
      {
        path: INCOME_ADD_EDIT_PATH,
        element: <IncomeAddEdit />,
      },
      {
        path: SUMMARY_PATH,
        element: <Summary />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} defaul />;
};

export default App;
