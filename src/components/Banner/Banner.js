import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Carousel from './Carousel';


const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: 'url(./banner2.jpg)'
  },
  
  banner_content: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },

  tagline: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },

}));










export default function Banner(){

  const classes = useStyles()

  return(
    <div className={classes.banner}>
      <Container className={classes.banner_content}>
        <div className={classes.tagline}>
          <Typography 
            variant='h2' 
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'verdana'
            }}> 
              Coin Knight 
            </Typography>

            <Typography variant = 'subtitle2' style = {{ color: 'darkgrey', textTransform: 'capitalize', fontFamily: 'verdana', color: 'EEBC1D'}}>
               Get all info regarding your favorite coin
            </Typography>

            <Carousel />
        </div>
      </Container>
    </div>
  )
}