const userToken = (user) => {
  return {
    firstName: user.firstName,
    userId: user._id,
    role: user.role,
  };
};

module.exports = userToken;
