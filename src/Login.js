import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {Button, TextField, Container, Typography, Box} from '@mui/material';

import {initMe, setSnackbar} from './store';
import {useFetch} from './hooks';

const EMAIL = process.env.REACT_APP_EMAIL;
const PASS = process.env.REACT_APP_PASSWORD;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(EMAIL);
  const [password, setPassword] = useState(PASS);

  const cf = useFetch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSave = async () => {
    let res;
    try {
      res = await cf({
        path: 'users/login',
        method: 'POST',
        body: {email, password},
        headers: {
          'Content-type': 'application/json',
        },
      });
      res = await res.json();
    } catch (err) {
      console.log(err);
      dispatch(setSnackbar({msg: 'Coś poszło nie tak', type: 'error'}));
      return;
    }

    if (!res.d) return;
    dispatch(setSnackbar({msg: 'Zalogowano'}));
    dispatch(initMe(res.d));
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{height: '100vh'}}>
      <Box
        sx={{
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Login</Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
