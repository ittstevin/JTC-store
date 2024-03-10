// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCngcwWVDY3OF-03tsgS8a75riGK4yJi1M",
    authDomain: "jtc-store.firebaseapp.com",
    projectId: "jtc-store",
    storageBucket: "jtc-store.appspot.com",
    messagingSenderId: "269638551401",
    appId: "1:269638551401:web:ceeef89892a2a28320dff8",
    measurementId: "G-D34M7YSMT6"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
