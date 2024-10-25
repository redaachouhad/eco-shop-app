// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "hhhhhhhhhhhhhhhhhhhhhhhhhhh",
  authDomain: "eco-shop-app.firebaseappmkokjihuygtfrd.com",
  projectId: "eco-shop-app",
  storageBucket: "eco-shop-app.akljhghfdppspot.com",
  messagingSenderId: "jkhgghijjomjm",
  appId: "1:158945387818:web:b9jkgjcxwsfxgfhjka6c8f5950afe0153aa53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, "gs://eco-shop-app.appspot.com");
