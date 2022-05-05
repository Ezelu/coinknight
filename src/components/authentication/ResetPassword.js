import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { CircularProgress } from '@material-ui/core'




export default function ResetPassword({handleClose}){
  
  const [user_data, set_user_data] = React.useState({
    email: '',
    password: '',
  });

  function handle_user_data(e){
    set_user_data(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const { set_alert } = CryptoState()
  const [loading, set_loading] = React.useState(false)



  const handle_submit = async () => {
  
    set_loading(true);

    const { email, password } = user_data;

    if( !email || !password ){
      set_alert({
        open: true,
        message: 'Please Fill all the fields',
        type: 'error'
      })

      set_loading(false);
      return;
    }

    // Try signing in with the email and password
    try{

      const result = await signInWithEmailAndPassword(auth, email, password );
      set_alert({
        open: true,
        message: `Login successful!, welcome ${result.user.email}`,
        type: 'success'
      });
      console.log('oga')
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
      
      <Button variant='contained' size='large' style={{background: '#EEBC1D'}} onClick={handle_submit}>
        {loading ? <CircularProgress style={{color: 'black'}} size='2em' /> : 'Reset'}
      </Button>
    </Box>
  )
}