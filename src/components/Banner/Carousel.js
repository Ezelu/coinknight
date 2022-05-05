import React from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import axios from "axios";
import {TrendingCoins} from '../../config/api';
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import {Link} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    marginTop: '5%'
  },

  carousel_item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    cursor: "pointer",
    textTransform: 'uppercase',
    color: 'white',
  }
}))

export function numberWithCommas(val){
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}



export default function(){

  const [trending, set_trending] = React.useState([])
  const [loading, set_loading] = React.useState(false)
  const classes = useStyles();
  const {currency, symbol} = CryptoState();



  //Get the Trending coins at the moment

  const fetchTrendingCoins = async () => {
    set_loading(true)
    const {data} = await axios.get( TrendingCoins(currency) );
    set_trending(prev => prev = data)
    set_loading(false)
  }

  React.useEffect(() => {
    fetchTrendingCoins()
  }, [currency])


  //Map over the trending coins to get the items to be displayed

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0

    return (
      <Link className={classes.carousel_item} to={`/coins/${coin.id}`}>
        <img
          src = {coin?.image}
          alt = {coin.name}
          height = '80'
          style={{marginBottom: 10}}
          />

          <span> 
            {coin?.symbol}
            &nbsp;
            <span style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : 'red', fontWeight: 500, }}>
              { profit && '+' } { coin?.price_change_percentage_24h?.toFixed(2) }%
            </span>
          </span>

          <span style={{fontSize: 22, fontWeight: 500}}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
      </Link>
    )
  })


  //number of items on different screen sizes
  const responsive = {
    0:{
      items: 2
    },
    512:{
      items: 4
    }
  }





  return(
    <div className={classes.carousel}>
      {
        loading ? 
        (
          <CircularProgress style={{
            color: 'EEBC1D',
            margin: 'auto'
          }}/> 
        ) 
        :
        
       (<AliceCarousel 
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />)

      }

    </div>
  )
}