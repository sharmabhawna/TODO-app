const { placeInObject } = require('./utils.js');

const readBody = function (req, res, next) {
  let content = "";
  req.on('data', chunk => {
    content += chunk
  });
  req.on('end', () => {
    req.body = content
    next();
  });
}

const readCookies = function (req, res, next) {
  const cookies = req.headers["cookie"];
  req.cookies = {};
  if (cookies) {
    cookies.split(';').forEach((cookie) => {
      let [name, value] = cookie.split('=');
      req.cookies[name] = value;
    });
  }
  next();
};


const readArgs = content => {
  return content.split('&').reduce(placeInObject, {});
};

module.exports = {
  readBody,
  readCookies,
  readArgs
}