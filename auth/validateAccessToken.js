function validateUser(req, res, next) {
  const { token } = req;
  if (!token || token !== process.env.API_ACCESS_TOKEN) {
    console.log("> 401 unauthorized user | Error validateUser");
    return res.status(401).send();
  }

  next();
}

module.exports = validateUser;
