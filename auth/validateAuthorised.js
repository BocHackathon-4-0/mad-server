const isUserAdmin = require("../helpers/isUserAdmin");

function validateAuthorised(req, res, next) {
  const user = req.currentUser;
  if (isUserAdmin(user) || req.body.email === user.email) {
    next();
  } else {
    console.log("> 401 unauthorized | Error validateAuthorised");
    return res.status(401).send();
  }
}

module.exports = validateAuthorised;
