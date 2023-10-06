function validateUser(req, res, next) {
  const user = req.currentUser;
  if (!user) {
    console.log("> 401 unauthorized user | Error validateUser");
    return res.status(401).send();
  }

  next();
}

module.exports = validateUser;
