import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const userRef = db.doc(`users/${user.uid}`);
  await userRef.set({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    joinedAt: admin.database.ServerValue.TIMESTAMP,
  });

  return null;
});
