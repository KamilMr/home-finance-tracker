import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Button, TextField, Container, Typography} from '@mui/material';

import {initMe} from './store';
import {useNavigate} from 'react-router-dom';
import {useFetch} from './hooks';

const URL = process.env.REACT_APP_BE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('kamil.mrowka@gmail.com');
  const [password, setPassword] = useState('KamilTest1!');

  const cf = useFetch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSave = async () => {

    let res
    try {
      res = await cf({
        path: 'users/login',
        body: {email, password},
        headers: {
          'Content-type': 'application/json'
        }
      });
      res = await res.json();
    } catch (err) {
      console.log(err);
      return;
    }

    if (!res.d) return;
    dispatch(initMe(res.d));
    navigate('/cats');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <form noValidate autoComplete="off">
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;

