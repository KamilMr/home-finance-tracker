import React from 'react';
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {Box, Container} from '@mui/material';

import AccountMenu from './Nav';
import BottomNav from './components/BottomNav';
import CategoryLAE from './screens/Category';
import Charts from './screens/SummaryChart';
import ExpenseAddEdit from './screens/ExpenseAddEdit';
import ExpensesList from './screens/ExpensesList';
import Home from './screens/Home';
import IncomeAddEdit from './screens/IncomeAddEdit';
import IncomeList from './screens/IncomeList';
import Login from './Login';
import Snackbar from './components/Snackbar.js';
import Summary from './screens/Summary';
import {Cats} from './Cats';
import {selectToken} from './store';
import {
  CATEGORY_LIST_ADD_EDIT_PATH,
  CATS_PATH,
  EXPENSE_ADD_EDIT_PATH,
  EXPENSE_LIST_PATH,
  HOME_PATH,
  INCOME_ADD_EDIT_PATH,
  INCOME_LIST_PATH,
  SUMMARY_CHART,
  SUMMARY_PATH,
} from './common';

const Protected = ({children}) => {
  const token = useSelector(selectToken);
  if (!token) return <Navigate to="/login" />;

  return children;
};

const Layout = ({children}) => {
  return (
    <Container sx={{mt: 12, p: 0, mb: 12}}>
      <Box>
        <AccountMenu />
        {children}
        <BottomNav />
      </Box>
    </Container>
  );
};

const routes = createBrowserRouter([
  {
    path: HOME_PATH,
    element: (
      <Protected>
        <Layout>
          <Outlet />
          <Snackbar />
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
      {
        path: SUMMARY_CHART,
        element: <Charts />,
      },
      {
        path: CATEGORY_LIST_ADD_EDIT_PATH,
        element: <CategoryLAE />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
