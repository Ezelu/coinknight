import { Snackbar } from '@mui/material';
import React from 'react';
import { CryptoState } from '../CryptoContext';
import { Alert } from '@material-ui/lab'



export default function (){

  const {alert, set_alert} = CryptoState();

  const handleClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }

    set_alert({open: false})
  }





  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose} 
    anchorOrigin={{
       vertical: "bottom",
       horizontal: "center"
    }}>

      <Alert onClose={handleClose} elevation={10} variant='filled' severity={alert.type}>
        {alert.message}
      </Alert>

    </Snackbar>
  )
}