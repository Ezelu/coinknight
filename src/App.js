import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core/styles';
import Alert from './components/Alert';

const useStyles = makeStyles((theme) => ({
  app: {
    background: '#14161a',
    color: 'white',
    minHeight: '100vh',
    fontFamily: 'Lucida Sans',
  }
}));


export default function App(){
  
  const classes = useStyles();

  return(
      <div className={classes.app}>
        <Header />
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>

        <Alert />
      </div>
  )
}















