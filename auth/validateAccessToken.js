function validateUser(req, res, next) {
  const { accessToken } = req;
  if (!accessToken || accessToken !== process.env.API_ACCESS_TOKEN) {
    console.log("> 401 check token");
    return res.status(401).send();
  }

  next();
}

module.exports = validateUser;
