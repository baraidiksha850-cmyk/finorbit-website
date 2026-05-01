import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyAGhwvIveO_1BINQrui0ZdztFaooFaAXns",
  authDomain: "finorbit-120fc.firebaseapp.com",
  projectId: "finorbit-120fc",
  storageBucket: "finorbit-120fc.firebasestorage.app",
  messagingSenderId: "60605974999",
  appId: "1:60605974999:web:131c9596455cad9a4ee392",
  measurementId: "G-JVBM6GKG7W"
};
 
const app = initializeApp(firebaseConfig);
 
export const auth = getAuth(app);
export const db = getFirestore(app);
