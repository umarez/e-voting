import admin from "firebase-admin";

const serviceAccount = require("../firebaseAdmin.json")

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }

  return admin.auth().verifyIdToken(token);
};
