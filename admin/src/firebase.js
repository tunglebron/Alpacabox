import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2UZ_IztiOKTpC3jzg6yHZWrRmwirplP0",
  authDomain: "alpacabox-fb0fd.firebaseapp.com",
  projectId: "alpacabox-fb0fd",
  storageBucket: "alpacabox-fb0fd.appspot.com",
  messagingSenderId: "515398284641",
  appId: "1:515398284641:web:8c082d3e8fb4deac5fc120",
  measurementId: "G-HRDJ332BJZ"
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
export default storage;