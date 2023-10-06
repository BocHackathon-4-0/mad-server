const firebase = require("../../firebase");

async function addDoc({ dbCollection, id = null, data }) {
  if (!id) {
    return firebase.db.collection(dbCollection).add(data);
  } else {
    return firebase.db.collection(dbCollection).doc(id).set(data);
  }
}

module.exports = addDoc;
