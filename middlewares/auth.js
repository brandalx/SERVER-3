const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  // Checks at all that a token has been sent in the directory
  let token = req.header("x-api-key");
  if (!token) {
    return res
      .status(401)
      .json({ err: "You should send token to this endpoint" });
  }
  try {
    // tries to decode the token and get its payload, which is currently an ID
    let decodeToken = jwt.verify(token, "secret");
    // req -> parameter of an object that is shared by all functions in the routers chain
    req.tokenData = decodeToken;

    // We would like to continue to the next function in the router thread
    // next() -> calls the next function in the router's chain
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "Token you provided invalid or expired" });
  }
};
