const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoic2hzIiwiZW1haWwiOiJ5YW1pQGkiLCJpZCI6IjY0MjQ1MGQ1NTFjOThhYWYzYTQ1OTE1MCJ9LCJpYXQiOjE2ODAxMDI3NTIsImV4cCI6MTY4MDEwMjgxMn0.AU5soCn0bBmd9JZq6l-8_eaOK8Bp5RfdYpbgoxxSpgQ
    // for this ex. " " will return ["Bearer", "eyjhb..."] and we want token to [1]
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRAT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }

      // console.log(decoded);

      req.user = decoded.user;

      next();

      // if (!token) {
      //   res.status(401);
      //   throw new Error("user is not authorized or missing token");
      // }
    });
  }
});

module.exports = validateToken;
