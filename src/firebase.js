// Import the functions you need from the SDKs you need
import 'firebase/auth';
import 'firebase/database';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getToken, getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
// import admin from 'firebase-admin';
// import nodemailer from 'nodemailer';
import emailjs from 'emailjs-com';

// const serviceAccount = require('./secret_key.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://the-og-27e6f-default-rtdb.firebaseio.com'
// });

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Agu_4g-qA9drarU7jiChC3NAyUKcj30",
  authDomain: "the-og-27e6f.firebaseapp.com",
  databaseURL: "https://the-og-27e6f-default-rtdb.firebaseio.com",
  projectId: "the-og-27e6f",
  storageBucket: "the-og-27e6f.appspot.com",
  messagingSenderId: "729039730771",
  appId: "1:729039730771:web:7509c1990d2a5e231f2ea6",
  measurementId: "G-Z9QZTQV050"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);



// // Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
//const messaging = admin.messaging();


// Request permission for notifications
export function requestPermission() {
  console.log("STart");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      //access the registration token
      // getToken(messaging, {
      //   vapidKey:
      //     "BLfNwRYQKXcFixJOZ1ycv9mtc4l_g4tShgS6Gqdr2bSnHVrp5oiUMxeVdH9QqCB5yc1qNcRxUGhDCqNCisrQeuI",
      // }).then((currentToken) => {
      //   if (currentToken) {
      //     console.log("currentToken: ", currentToken);
      //   } else {
      //     console.log("Can't get token");
      //   }
      // });

      onValue(ref(database, "/Users/1/StoveManagement/"), (snapshot) => {
        var data = snapshot.child("Safety").val();
        // console.log("New data added: ", data);
        if (data === "Unsafe") {
          console.log("Value changed to Unsafe");
          showNotification();
        }
      });

    } else {
      console.log("Do not have permission!");
    }
  });
}
function emailContact() {
  // e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

  // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
  //   .then((result) => {
  //       window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
  //   }, (error) => {
  //       console.log(error.text);
  //   });
  // onValue(ref(database, "/Users/1/Contact/"), (snapshot) => {
  //   var data = snapshot.val();
  //   console.log("Contact data: ", data);


    // let transport = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 2525,secure: false,
    //   auth: {
    //     user: "c4e0ec0c59cb56",
    //     pass: "312363c9cc1775"
    //   }
    // });

    // var mailOptions = {
    //   from: 'theog@mailtrap.io',
    //   to: "contactUser@gmail.com",
    //   subject: 'The OG -- STOVE UNSAFE',
    //   html: '<h2 style="color:#0000ff;">STOVE UNSAFE, Stove Id: 1' +
    //     '. PLEASE CHECK ON THE STOVE. -- THE-OG</h2><h2>-- THE-OG</h2>'
    // };

    // transport.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
}

function showNotification() {
  var options = {
    body: 'Notification Body',
    icon: './images/the-og-logo.png    auto=compress&cs=tinysrgb&dpr=1&w=500',
    dir: 'ltr',
  };

  // const n = new Notification('Alert! Stove Unsafe', options);
  alert('Alert! \nStove Unsafe')
  // emailContact()

}

requestPermission();

export { auth, app, database, db };