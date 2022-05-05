// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import { AppBar, Tab, Tabs } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import Login from './Login';
// import SignUp from './SignUp';
// import GoogleButton from 'react-google-button';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { CryptoState } from '../../CryptoContext';
// import { auth } from '../../firebase';



// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     width: 400,
//     borderRadius: 10,
//     color: 'white',
//   },
//   google: {
//     padding: 24,
//     paddingTop: 0,
//     display: 'flex',
//     flexDirection: 'column',
//     textAlign: 'center',
//     gap: 20,
//     fontSize: 20,
//     cursor: 'pointer'
//   },
//   reset_password: {
//     cursor: 'pointer',
//     background: 'transparent',
//   }
// }))









// export default function TransitionsModal() {

//   const classes = useStyles()

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [reset, set_reset] = React.useState(false)

//   const [value, set_value] = React.useState(0);
//   const handleChange = (event, new_value) => {
//     set_value(new_value)
//   };

//   const {set_alert} = CryptoState();


//   const google_provider = new GoogleAuthProvider()

//   const signInWithGoogle = () => {
//     signInWithPopup(auth, google_provider)
//       .then((res) => {
//         set_alert({
//           open: 'true',
//           message: `Sign Up successful, welcome ${res.user.email}`,
//           type: 'success'
//         });

//         handleClose()
//       })
//       .catch((error) => {
//         set_alert({
//           open: 'true',
//           message: error.message,
//           type: 'error'
//         });
//       })
//   }



//   return (
//     <div>
//       <Button onClick={handleOpen} variant='contained' style={{
//         width: 85,
//         height: 40,
//         backgroundColor: 'EEBC1D',
//         color: 'black'
//       }}> Login </Button>

//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//         className={classes.modal}
//       >
//         <Fade in={open}>

//             <div className={classes.paper}>
//               <AppBar position='static' style={{background: 'transparent', color: 'white'}}>
//                 <Tabs value={value} onChange={handleChange} variant='fullWidth' style={{borderRadius: 10}}>
//                   <Tab label='Login' />
//                   <Tab label='Sign Up' />
//                 </Tabs>
//               </AppBar>
                
//                 {value === 0 && <Login handleClose={handleClose} />}
//                 {value === 1 && <SignUp handleClose={handleClose} />}

//                 <Box className={classes.google}>
//                   <span> OR </span>
//                   <Button onClick={signInWithGoogle}>
//                     <GoogleButton style={{
//                       width: '100%',
//                       outline: 'none',
//                       cursor: 'pointer'
//                       }}
//                       />
//                   </Button>

//                   <Button className={classes.reset_password} onClick={() => handleClose()}> <a> Forgot password? </a> </Button>
 
                  

//                 </Box>

//             </div>

//         </Fade>
//       </Modal>
//     </div>
//   );
// }











import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
import ResetPassword from './ResetPassword';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    borderRadius: 10,
    color: 'white',
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 20,
    fontSize: 20,
    cursor: 'pointer'
  },
  reset_password: {
    cursor: 'pointer',
    background: 'transparent',
  }
}))









export default function TransitionsModal() {

  const classes = useStyles()

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reset, set_reset] = React.useState(false)

  const [value, set_value] = React.useState(0);
  const handleChange = (event, new_value) => {
    set_value(new_value)
  };

  const {set_alert} = CryptoState();


  const google_provider = new GoogleAuthProvider()

  const signInWithGoogle = () => {
    signInWithPopup(auth, google_provider)
      .then((res) => {
        set_alert({
          open: 'true',
          message: `Sign Up successful, welcome ${res.user.email}`,
          type: 'success'
        });

        handleClose()
      })
      .catch((error) => {
        set_alert({
          open: 'true',
          message: error.message,
          type: 'error'
        });
      })
  }






  function Modal1 () {
    return (<Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    className={classes.modal}
  >
    <Fade in={open}>

        <div className={classes.paper}>
          <AppBar position='static' style={{background: 'transparent', color: 'white'}}>
            <Tabs value={value} onChange={handleChange} variant='fullWidth' style={{borderRadius: 10}}>
              <Tab label='Login' />
              <Tab label='Sign Up' />
            </Tabs>
          </AppBar>
            
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}

            <Box className={classes.google}>
              <span> OR </span>
              <Button onClick={signInWithGoogle}>
                <GoogleButton style={{
                  width: '100%',
                  outline: 'none',
                  cursor: 'pointer'
                  }}
                  />
              </Button>

              <Button className={classes.reset_password} onClick={() => handleClose()}> <a> Forgot password? </a> </Button>

              

            </Box>

        </div>

    </Fade>
  </Modal>)

  }



  function Modal2 () {
    return (
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <Fade in={open}>

            <div className={classes.paper}>
              <AppBar position='static' style={{background: 'transparent', color: 'white'}}>
                <Tabs value={value} onChange={handleChange} variant='fullWidth' style={{borderRadius: 10}}>
                  <Tab label='Login' />
                  <Tab label='Sign Up' />
                </Tabs>
              </AppBar>
                
                <ResetPassword />

                <Box className={classes.google}>
                  <span> OR </span>
                  <Button onClick={signInWithGoogle}>
                    <GoogleButton style={{
                      width: '100%',
                      outline: 'none',
                      cursor: 'pointer'
                      }}
                      />
                  </Button>

                  <Button className={classes.reset_password} onClick={() => handleClose()}> <a> Forgot password? </a> </Button>
 
                  

                </Box>

            </div>

        </Fade>
      </Modal>
    )
  }




  return (
    <div>
      <Button onClick={handleOpen} variant='contained' style={{
        width: 85,
        height: 40,
        backgroundColor: 'EEBC1D',
        color: 'black'
      }}> Login </Button>


      <Modal1 />
      
      
    </div>
  );
}

























