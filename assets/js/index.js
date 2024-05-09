import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';//"firebase/app";
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';//"firebase/auth";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';//"firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrM5HAJOlesIg5XEeM-kqMWTdcVP9Bc9g",
    authDomain: "fadeup-e5b1f.firebaseapp.com",
    projectId: "fadeup-e5b1f",
    storageBucket: "fadeup-e5b1f.appspot.com",
    messagingSenderId: "775638463745",
    appId: "1:775638463745:web:4f71cffdbc41d2ca431700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//const database = getDatabase(app);
const db = getFirestore(app);

signInAnonymously(auth)
    .then(() => {
        console.log("Signed in anonymously");
    })
    .catch((error) => {
        console.error("Error signing in anonymously:", error);
    });

export function sendExperimentData(rows) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const experimentResultsCollection = collection(db, `experiment_results`);
        console.log(rows);
        addDoc(experimentResultsCollection, rows)
            .then(() => {
                console.log("Data sent successfully");
            })
            .catch((error) => {
                console.error("Error sending data:", error);
            });
    } else {
        console.error("User not signed in");
    }
}