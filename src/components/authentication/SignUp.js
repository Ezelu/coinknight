import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import {auth} from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress } from '@material-ui/core';




export default function SignUp({handleClose}){

  const [user_data, set_user_data] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  function handle_user_data(e){
    set_user_data(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [loading, set_loading] = React.useState(false)
  const {set_alert} = CryptoState()


  const handle_submit = async () => {

    set_loading(true);

    const { email, password, confirm_password } = user_data;

    if(password !== confirm_password){
      set_alert({
        open: true,
        message: 'Passwords do not match',
        type: 'error'
      })

      set_loading(false);
      return;
    }

    // Try creating account with the email and password
    try{
      const result = await createUserWithEmailAndPassword(auth, email, password );
      set_alert({
        open: true,
        message: `Sign Up successful, welcome ${result.user.email}`,
        type: 'success'
      });
      //Close the modal
      handleClose();

    } catch ( error ) {
      set_alert({
        open: true,
        message: error.message,
        type: 'error'
      });

      set_loading(false);
      return;
    }


  }


  return (
    <Box p={3} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}> 

      <TextField 
        variant = 'outlined'
        type = 'email'
        label = 'Enter email'
        name = 'email'
        value = {user_data.email}
        onChange = {(e) => handle_user_data(e)}
        fullWidth 
      />

      <TextField 
        variant = 'outlined'
        type = 'password'
        label = 'Password'
        name = 'password'
        value = {user_data.password}
        onChange = {(e) => handle_user_data(e)}
        fullWidth 
      />

      <TextField 
        variant = 'outlined'
        type = 'password'
        label = 'Confirm Password'
        name = 'confirm_password'
        value = {user_data.confirm_password}
        onChange = {(e) => handle_user_data(e)}
        fullWidth 
      />
      
      <Button variant='contained' size='large' style={{background: '#EEBC1D'}} onClick={handle_submit}>
        {loading ? <CircularProgress style={{color: 'black'}} size='2em' /> : 'Sign Up'}
      </Button>
    </Box>
  )
}
