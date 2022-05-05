
import React from 'react';
import {useParams} from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { makeStyles } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import { Typography, LinearProgress, Button } from '@material-ui/core'
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Banner/Carousel';
import { doc, setDoc } from '@firebase/firestore';
import { database } from '../firebase';
import { CircularProgress } from '@material-ui/core'





const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    fontFamily: 'verdana',
  },

  side_bar: {
    width: '35%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
    padding: '0 3%',
    fontFamily: 'verdana',
  },

  description: {
    fontFamily: 'Verdana',
    letterSpacing: '1px'
  },

  heading: {
    marginBottom: 1,
    fontFamily: 'verdana',
  },

  heading1: {
    fontSize: '1.2em',
    fontFamily: 'verdana',
    fontWeight: 'lighter',
    color: 'EEBC1D'
  },

  heading2: {
    fontSize: '1.2em',
    fontFamily: 'verdana',
    fontWeight: 'lighter'
  },

  market_data: {
    alignSelf: 'start',
    padding: 10,
    paddingTop: 10,
    width: '100%',
    fontFamily: 'verdana',
    //making it responsive
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start',
    }
  }
}));







export default function CoinPage(){

  const {id} = useParams();
  const [coin, set_coin] = React.useState();

  const {currency, symbol, user, watchlist, set_alert} = CryptoState()

  const [loading, set_loading] = React.useState(false)


  const fetchCoin = async () => {
    const {data} = await axios.get(SingleCoin(id));
    set_coin(prev => prev = data)
  }

  React.useEffect(() => {
    fetchCoin()
  }, [])


  const classes = useStyles();

  const in_watchlist = watchlist.includes(coin?.id);


  const add_to_watchlist = async () => {
    set_loading(true);
    const coin_ref = doc(database, 'watchlist', user.uid)

    try{
      await setDoc( coin_ref,{
        coins: watchlist ? [...watchlist, coin.id] : [coin.id] 
      });
      set_loading(false)
      set_alert({
        open: true,
        type: 'success',
        message: `${coin.name} added to your watchlist`
      });
    } catch (error) {
      set_alert({
        open: true,
        type: 'error',
        message: error.message
      })
    }
  }


  const remove_from_watchlist = async () => {
    set_loading(true);
    const coin_ref = doc(database, 'watchlist', user.uid)

    try{
      await setDoc( 
        coin_ref,
        { 
          coins: watchlist.filter((watch) => watch !== coin.id)
        },
        {merge : 'true'}
      );
      set_loading(false);
      set_alert({
        open: true,
        type: 'warning',
        message: `${coin.name} removed from your watchlist`
      });
    } catch (error) {
      set_alert({
        open: true,
        type: 'error',
        message: error.message
      })
    }
  }


  // When Coin hasn't been fetched, show the linear progress animation.

  if (!coin) return <LinearProgress style={{backgroundColor: 'gold'}} />

  
  return (
    <div className={classes.container}>
      <div className={classes.side_bar}>

        <img
          src = {coin?.image.large}
          alt={coin?.name}
          height = '200'
          style={{marginBottom: 20}}
        />

        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>

        <Typography variant='subtitle2' className={classes.description}>
          {parse(`${coin?.description.en.split('. ')[0]}`)}.
        </Typography>


        <div className={classes.market_data}>

          <span style={{display: 'flex'}}>
            <Typography variant='h6' className={classes.heading1}> Rank: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h6' className={classes.heading2}> {coin?.market_cap_rank} </Typography>
          </span>

          <span style={{display: 'flex'}}>
            <Typography variant='h6' className={classes.heading1}> Current Price: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h6' className={classes.heading2}> 
              {symbol} {" "}
              {
                numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])
              }
            </Typography>
          </span>

          <span style={{display: 'flex'}}>
            <Typography variant='h6' className={classes.heading1}> Market Cap: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h6' className={classes.heading2}> 
              {symbol} {" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6))
                }M
            </Typography>
          </span>

          {/* Display button if user is logged in */}
          {
            user && (
              <Button variant='outlined' style={{
                width: '100%',
                height: 40,
                color: in_watchlist ? 'white' : 'black',
                backgroundColor: in_watchlist ? '#ff0000' : '#EEBC1D',
                marginTop: 20,
              }}
              onClick={ in_watchlist ? remove_from_watchlist : add_to_watchlist}>
                { loading ? <CircularProgress style={{color: 'white'}}/> : in_watchlist ? 'Remove from watchlist' : 'Add to watchlist' }
              </Button>
            )
          }

        </div>



      </div>

      {/* chart */}
      <CoinInfo coin={coin} />

    </div>
  )
}