import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRURVAk0WiVHYED1INUNpfISCECWFY_pg",
  authDomain: "binhhung-34f55.firebaseapp.com",
  projectId: "binhhung-34f55",
  storageBucket: "binhhung-34f55.firebasestorage.app",
  messagingSenderId: "117488743789",
  appId: "1:117488743789:web:f17584efdfc749ec085664",
  measurementId: "G-CD9VQLH5LF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();