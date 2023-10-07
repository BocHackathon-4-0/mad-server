const firebase = require("../../firebase");

async function updateDocument({ dbCollection, id, data }) {
  return firebase.db
    .collection(dbCollection)
    .doc(id)
    .update({
      ...data,
    });
}

async function updateUserSavings({ userId, stock, amount }) {
  console.log(">> Smart saving contribution");

  const savings = [{ stock, amount }];

  return firebase.db
    .collection("Users")
    .doc(userId)
    .update({
      investments: firebase.fieldValue.arrayUnion(...savings),
    });
}

module.exports = { updateDocument, updateUserSavings };
