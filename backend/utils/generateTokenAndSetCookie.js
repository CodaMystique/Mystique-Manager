import jwt from "jsonwebtoken";

/**
 * Function to generate JWT token and set it as a cookie in the response
 * @param {string} userId - The ID of the user for whom the token is generated
 * @param {object} res - Express response object
 * @returns {void}
 */
const generateTokenAndSetCookie = (userId, res) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 15 days
  });

  // Calculate milliseconds for 15 days
  const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;

  // Set JWT token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: fifteenDaysInMilliseconds,
    httpOnly: true,
    sameSite: "strict",
    // secure: process.env.NODE_ENV !== "development", // Secure flag based on environment
  });
};

export default generateTokenAndSetCookie;
