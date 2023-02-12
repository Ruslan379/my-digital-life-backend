// TODO: Add SDKs for Firebase products that you want to use
//* https://firebase.google.com/docs/web/setup#available-libraries


//! Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");


const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} = process.env;

//! Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};


//! Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log();
// console.log("app:".bgRed.black, app);//!


const auth = getAuth(app);

const storage = getStorage(app);

const db = getFirestore(app);



module.exports = {
  auth,
  storage,
  db
}



//todo   https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app/
