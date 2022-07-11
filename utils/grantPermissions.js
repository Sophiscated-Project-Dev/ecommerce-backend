const { UnauthorizedError } = require("../errors/unauthorized");

//user permission check
const grantUserPermission = (requestUser, resourceUser) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId.toString() === resourceUser.toString()) return;
  throw new UnauthorizedError("Not authourize. Access denied");
};

module.exports = grantUserPermission;
