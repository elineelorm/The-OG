/* eslint-disable max-len */
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendNotification = functions.database.ref("/test/{name}").onCreate((snapshot, context) => {
  // Get the value of the newly added notification
  const notification = snapshot.val();
  // Get the user token to send the notification to
  const userToken = notification.userToken;
  // Get the message to send in the notification
  // const message = notification.message;

  // Construct the FCM payload
  const payload = {
    notification: {
      title: "New Notification",
      // body: message,
      body: "I work",
      click_action: "", // app-url
    },
  };

  // Send the notification to the user's device
  return admin.messaging().sendToDevice(userToken, payload);
});
