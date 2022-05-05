import React from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth, database } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { CoinList } from "./config/api";
import axios from 'axios';




const Crypto = React.createContext()


export default function CryptoContext({children}){

  const [currency, set_currency] = React.useState('NGN');
  const [symbol, set_symbol] = React.useState('₦');
  const [loading, setLoading] = React.useState(false);


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  //Set state for user
  const [user, set_user] = React.useState(null);


  // set state for coins
  const [coins, setCoins] = React.useState([]);

  // Set state for watchlist
  const [watchlist, set_watchlist] = React.useState([])

  React.useEffect(() => {
    if ( user ) {
      const coin_ref = doc( database, 'watchlist', user.uid );

      let unsubscribe = onSnapshot(coin_ref, (coin) => {
        if ( coin.exists() ) {
          set_watchlist(coin.data().coins)
        } else {
          console.log('No items in the watchlist')
        }
      })

      // Use as a cleanup function
      return () => {
        unsubscribe()
      }

    }
  }, [user])
  
  // Set state for the alert
  const [alert, set_alert] = React.useState({
    open: false,
    message: '',
    type: 'success'
  })

  // Set user whenever the auth chanages  
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if( user ) {
        set_user(user);
      } else {
        set_user(null)
      }
      console.log(user)
    });
  }, [])




  // set currency whenever its changed

  React.useEffect(() => {
    if(currency === 'NGN'){
      set_symbol(prev => prev = '₦')
    }
    else if(currency === 'USD'){
      set_symbol(prev => prev = '$')
    }

    fetchCoins()
  }, [currency])





  return(
    <Crypto.Provider value={{currency, symbol, set_currency, alert, set_alert, user, watchlist, coins}}>
      {children}
    </Crypto.Provider>
  )
}




export const CryptoState = () => React.useContext(Crypto);
