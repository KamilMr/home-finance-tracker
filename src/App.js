import AccountMenu from './Nav';
import React from 'react';
import {Box, Container} from '@mui/material';
import {Cats} from './Cats';
import {Navigate} from 'react-router-dom';

import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectToken} from './store';
import Login from './Login';
import ExpensesList from './screens/ExpensesList';
import Home from './screens/Home';
import ExpenseAddEdit from './screens/ExpenseAddEdit';
import IncomeAddEdit from './screens/IncomeAddEdit';
import IncomeList from './screens/IncomeList';
import Summary from './screens/Summary';

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
      </Box>
    </Container>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Layout>
          <Outlet />
        </Layout>
      </Protected>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'cats',
        element: <Cats />,
      },
      {
        path: 'expense-list',
        element: <ExpensesList />,
      },
      {
        path: 'expense-list/:param',
        element: <ExpenseAddEdit />,
      },
      {
        path: 'income-list',
        element: <IncomeList />,
      },
      {
        path: 'income-list/:param',
        element: <IncomeAddEdit />,
      },
      {
        path: 'summary',
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
