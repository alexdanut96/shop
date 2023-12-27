// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDXKzAYjBfyXLav-07iPXyekuz_5zHdxzw",
  authDomain: "dress-up-shop-659bc.firebaseapp.com",
  projectId: "dress-up-shop-659bc",
  // storageBucket: `${
  //   window.location.pathname.includes("user")
  //     ? "dress-up-shop-659bc.appspot.com"
  //     : "dress-up-shop-659bc.appspot.com/products"
  // }`,
  storageBucket: "dress-up-shop-659bc.appspot.com",
  messagingSenderId: "821050137877",
  appId: "1:821050137877:web:1f077e4f496bb779415d1c",
  measurementId: "G-3750XG1BM4",
};

// Initialize Firebase
const appUsers = initializeApp(firebaseConfig);
const analytics = getAnalytics(appUsers);

export default appUsers;
