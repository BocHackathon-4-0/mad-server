const firebaseAdmin = require("firebase-admin");

const googleServiceAccountCreds = process.env.GOOGLE_SERVICE_ACCOUNT_CREDS;
if (!googleServiceAccountCreds) {
  throw new Error(
    "The GOOGLE_SERVICE_ACCOUNT_CREDS environment variable was not found!"
  );
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    JSON.parse(
      Buffer.from(googleServiceAccountCreds, "base64").toString("ascii")
    )
  ),
});

const db = firebaseAdmin.firestore();
const fieldValue = firebaseAdmin.firestore.FieldValue;
const auth = firebaseAdmin.auth();

module.exports = {
  db,
  fieldValue,
  auth,
};
