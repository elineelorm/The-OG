// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";



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
const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

getToken(messaging, {
    vapidKey: "BLfNwRYQKXcFixJOZ1ycv9mtc4l_g4tShgS6Gqdr2bSnHVrp5oiUMxeVdH9QqCB5yc1qNcRxUGhDCqNCisrQeuI"
});



// Request permission for notifications
function requestPermission() {
    console.log("STart");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        //access the registration token
        getToken(messaging, {
          vapidKey:
            "BLfNwRYQKXcFixJOZ1ycv9mtc4l_g4tShgS6Gqdr2bSnHVrp5oiUMxeVdH9QqCB5yc1qNcRxUGhDCqNCisrQeuI",
        }).then((currentToken) => {
          if (currentToken) {
            console.log("currentToken: ", currentToken);
          } else {
            console.log("Can't get token");
          }
        });
      } else {
        console.log("Do not have permission!");
      }
    });
  }
  
  requestPermission();