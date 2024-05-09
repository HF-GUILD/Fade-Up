import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';//"firebase/app";
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';//"firebase/auth";
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';//"firebase/firestore";

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

console.log(app, auth, db);
const experimentResultsCollection = collection(db, 'experiment_results');

try {
    const querySnapshot = await getDocs(experimentResultsCollection);
    querySnapshot.forEach((doc) => {
        let rows = [doc.data()["imageWanted"],
            doc.data()["imageSelected"],
            doc.data()["imageSuccess"],
            doc.data()["timeWhenIconShow"],
            doc.data()["detectionSuccess"],
            doc.data()["timeEnterPress"],
            doc.data()["imagesForThisTest"]]
        exportCSV(rows, doc.id)
    });
} catch (error) {
    console.error("Error fetching documents: ", error);
}

function exportCSV(rows, nameFile) {
    const csvContent = rows.map(row => row.join(',')).join('\n');

    // Create a Blob object from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a data URI from the Blob
    const csvURL = window.URL.createObjectURL(blob);

    // Create an <a> element for downloading
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = nameFile;

    // Trigger a click event on the <a> element
    link.click();
}