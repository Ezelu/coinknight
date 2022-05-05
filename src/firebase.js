
import firebaseConfig from "./config/firebaseConfig";
import { getAuth } from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore';
import { initializeApp } from 'firebase/app';



const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp)


export { auth, database }









