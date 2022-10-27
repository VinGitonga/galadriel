import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBf0EKnuZQths6uX17YbKxraBDtCjBVcAw",
    authDomain: "virtualapp-b3d4a.firebaseapp.com",
    projectId: "virtualapp-b3d4a",
    storageBucket: "virtualapp-b3d4a.appspot.com",
    messagingSenderId: "154523385912",
    appId: "1:154523385912:web:7e45fe75ba7e8b0d9126cd",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const storage = getStorage()
const auth = getAuth(app)

export { app, db, storage, auth }
