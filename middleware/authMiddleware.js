const jwt = require("jsonwebtoken");
let auth = (req, res, next) => {
  const list = {};
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) return res.redirect("/login");

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });
  const token = list.jwt;

  if (!token) return res.redirect("/login");
  if (token) {
    jwt.sign(token, process.env.ACCESS_TOKEN, (err, dToken) => {
      if (err) return res.redirect("/login");

      next();
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = auth;
