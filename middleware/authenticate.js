const { decodeToken } = require("../utils");
const { UnauthenticatedError, UnauthorizedError } = require("../errors/index");

const authenticateUser = async (req, res, next) => {
  let token;
  const cookieToken = req.signedCookies.token;
  const authHeader = req.headers.authorization;

  //check cookie for token
  if (cookieToken) {
    token = cookieToken;
  } else if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  if (!token) {
    throw new UnauthenticatedError("Invalid authentication");
  }
  try {
    const decodedToken = decodeToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid authentication");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthourized. Access denied");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
