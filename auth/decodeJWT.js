// const firebase = require("../firebase");

async function decodeJWT(req, res, next) {
  console.log(">>>", new Date());
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split("Bearer ")[1];

    try {
      req.accessToken = token;
    } catch (error) {
      console.log("> Error client JWT", error);
    }
  }

  next();
}

module.exports = decodeJWT;
