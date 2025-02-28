const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler((req, res) => {
  // Implement registration logic here
  res.status(201).json({ message: "User registered successfully." });

  //simulate error
  //throw new Error("Registration failed.");
});

module.exports = {
  registerUser,
};
