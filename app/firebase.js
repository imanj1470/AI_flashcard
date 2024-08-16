import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "ai-flashcard-f7a21.firebaseapp.com",
    projectId: "ai-flashcard-f7a21",
    storageBucket: "ai-flashcard-f7a21.appspot.com",
    messagingSenderId: "604134994847",
    appId: "1:604134994847:web:c32c49cf363da6720043aa",
    measurementId: "G-NEGXWVRGHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);