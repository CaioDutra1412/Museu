import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCwaZjKPrz2rzbA98edD_I7Wm26F-wdScg',
    authDomain: 'museu-5e227.firebaseapp.com',
    projectId: 'museu-5e227',
    storageBucket: 'museu-5e227.appspot.com',
    messagingSenderId: '436360115638',
    appId: '1:436360115638:web:ac7f0795723d28fec0fd17'
  };
  
  initializeApp(firebaseConfig);

  const db = getFirestore();
  
  export default db;