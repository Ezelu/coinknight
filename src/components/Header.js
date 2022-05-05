
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './authentication/AuthModal';
import UserSideBar from './authentication/UserSideBar';


const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FFD700'
    },
    type: 'dark',
  }
})




const useStyles = makeStyles((theme) => ({
  select_currency: {
    width: '100',
    height: '40',
    marginLeft: 'auto',
    marginRight: '2%'
  },

  title: {
    flex: 1,
    color: 'EEBC1D',
    fontFamily: 'Verdana',
    fontWeight: 'Bold',
    cursor: 'pointer'
  },
}));




export default function Header(){

  const classes = useStyles();
  const { currency, symbol, set_currency, user } = CryptoState();



  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar sx={{display: 'flex'}}>
            <Link to='/'>
              <Typography variant='h6' component='h1' className={classes.title}> Coin Knight </Typography>
            </Link>

            <Select 
              variant='outlined' 
              className={classes.select_currency} 
              value={currency}
              onChange={(e) => set_currency(e.target.value)}
              >
              <MenuItem value={'NGN'}> NGN </MenuItem>
              <MenuItem value={'USD'}> USD </MenuItem>
            </Select>

            { user ? <UserSideBar /> : <AuthModal /> }
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}