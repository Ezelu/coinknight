import React from 'react';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { CoinList } from '../config/api';
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { numberWithCommas } from './Banner/Carousel';
import {useNavigate} from 'react-router-dom';
import {Pagination} from '@material-ui/lab'



const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FFD700'
    },
    type: 'dark',
  }
})

const useStyles = makeStyles((theme) => ({
  search_coin: {
    marginBottom: 20,
    width: '100%',
  },

  table_cell: {
    color: 'black', 
    fontWeight: '700'
  },

  table_head: {
    background: '#EEBC1D',
  }, 

  row: {
    backgroundColor: '#16171a',
    width: '1000%',
    cursor: 'pointer',
    "&:hover" : {
      backgroundColor: '#131111',
    },


  }
}))




export default function CoinsTable(){

  const classes = useStyles();
  const [coins, set_coins] = React.useState([]);
  const [loading, set_loading] = React.useState(false);
  const [search, set_search] = React.useState('');
  const [page, set_page] = React.useState(1);

  const navigate = useNavigate()

  const {currency, symbol} = CryptoState()

  const fetchCoins = async () => {
    set_loading(true)
    const {data} = await axios.get(CoinList(currency));
    set_coins(prev => prev = data)
    set_loading(false)
  }


  React.useEffect(() => {
    fetchCoins() 
  }, [currency])


  const handleSearch = () => {
    return coins.filter(
      (coin) => (
        coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search)
    ))
  }





  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign: 'center'}}>
        <Typography variant='h4' style={{margin: 18, fontFamily: 'verdana'}} component='h1'>
          Cryptocurrency by market cap
        </Typography>

        <TextField 
          label='Search For Coin' 
          variant='outlined' 
          className={classes.search_coin}
          onChange={(e) => set_search(e.target.value)}
          />

        <TableContainer>
          {loading ? (
            <LinearProgress background='EEBC1D' />
            ) : 
            (
            <Table>
              <TableHead className={classes.table_head}>
                <TableRow>

                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell className={classes.table_cell} key={head} align={head === 'Coin' ? "" : "right"}>
                      {head}
                    </TableCell>
                  ))}

                </TableRow>
              </TableHead>



              <TableBody>
                {
                  handleSearch()
                  .slice((page - 1) * 10, (page -1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return(

                      <TableRow 
                        onClick={() => navigate(`/coins/${row.id}`)} 
                        className={classes.row} 
                        key={row.name}>
                          
                        <TableCell component='th' scope='row' style={{display: 'flex', gap: 15}}>
                          <img 
                            src={row?.image}
                            alt = {row.name}
                            height = '50'
                            style={{marginBottom: 10}} />

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                              <span style={{textTransform: 'uppercase', fontSize: 22}}>
                                {row.symbol}
                              </span>
                              <span style={{color: 'darkgrey'}}> {row.name} </span>
                            </div>
                        </TableCell>


                        <TableCell align='right'>
                          {symbol} {" "}
                          {numberWithCommas(row.current_price.toFixed(2))} 
                        </TableCell>


                        <TableCell align='right' 
                          style={{color: profit > 0 ? 'rgb(14, 203, 129)' : 'red', fontWeight: 500}}>
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>


                        <TableCell align='right'>
                          {symbol} {" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>

                    )
                  })
                }
              </TableBody>
            </Table>

          )} 
        </TableContainer>


        <Pagination
          style = {
            {padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'}
          }
          onChange={
            (_, value) => {
              set_page(value)
              window.scroll(0, 450)
            }
          }
          count = {(handleSearch()?.length / 10).toFixed(0)}
        />



      </Container>
    </ThemeProvider>
  )
}