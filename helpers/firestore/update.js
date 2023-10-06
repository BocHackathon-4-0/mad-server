const firebase = require("../../firebase");

async function updateDocument({ dbCollection, id, data }) {
  return firebase.db
    .collection(dbCollection)
    .doc(id)
    .update({
      ...data,
    });
}

async function updateUserInvestments({ userId, amount }) {
  return firebase.db
    .collection("Users")
    .doc(userId)
    .update({
      investments: firebase.fieldValue.arrayUnion({ date: new Date(), amount }),
    });
}

module.exports = { updateDocument, updateUserInvestments };
