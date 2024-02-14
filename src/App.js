import {Box, Container} from '@mui/material';
import React from 'react';
import {Cats} from './Cats';
import AccountMenu from './Nav';
import {Navigate} from "react-router-dom";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectToken} from './store';

const Login = () => {
  return <h1>Lgoin</h1>
};

const Protected = ({children}) => {
  const token = useSelector(selectToken);
  if (!token) return <Navigate to="/login" />

  return children;
};

const Layout = ({children}) => {
  return (
    <Container>
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
        path: 'cats',
        element: <Cats />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

