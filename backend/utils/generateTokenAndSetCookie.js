import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Calculate maxAge in milliseconds for 15 days
  const maxAgeMilliseconds = 15 * 24 * 60 * 60 * 1000;

  res.cookie("jwt", token, {
    maxAge: maxAgeMilliseconds,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenAndSetCookie;
