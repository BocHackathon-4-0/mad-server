const firebase = require("../firebase");

async function decodeJWT(req, res, next) {
  let jwt = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    try {
      jwt = "client JWT >";
      req.currentUser = await firebase.auth.verifyIdToken(idToken);
    } catch (error) {
      console.log("> Error client JWT", error);
    }
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Admin-Bearer ")
  ) {
    jwt = "cloud JWT >";
    const token = req.headers.authorization.split("Admin-Bearer ")[1];
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    req.adminEmail = payload.email;
  } else {
    jwt = "no JWT >";
  }

  // console.log(">>>>>>>>>>> *", jwt, ">", req.originalUrl, ">>>");
  next();
}

module.exports = decodeJWT;
