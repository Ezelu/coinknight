import { makeStyles } from '@material-ui/core';
import React from 'react';






export default function SelectButton({children, selected, onClick}){

  const useStyles = makeStyles((theme) => ({
    select_button: {
      border: '1px solid #EEBC1D',
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: 'pointer',
      backgroundColor: selected ? '#EEBC1D' : '',
      color: selected ? 'black' : '',
      fontWeight: selected ? 700 : 500,
      '&:hover': {
        backgroundColor: '#EEBC1D',
        color: 'black',
      },
      width: '22%'
    }
  }))

  const classes = useStyles()

  return (
    <span 
      onClick={onClick}
      className={classes.select_button}
    >
      {children}
    </span>
  )
}