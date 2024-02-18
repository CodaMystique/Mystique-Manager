import bcrypt from "bcryptjs";
import isValidEmail from "../utils/isValidEmail.js";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export async function signup(req, res) {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      newUser.save();

      res
        .status(200)
        .json({ fullName: newUser.fullName, email: newUser.email });
    } else {
      res.status(400).json({ error: "Failed to create new user" });
    }
  } catch (error) {
    console.error("Error in signup controller: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password || ""
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    generateTokenAndSetCookie(existingUser._id, res);

    return res
      .status(200)
      .json({ fullName: existingUser.fullName, email: existingUser.email });
  } catch (error) {
    console.error("Error in login controller : ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
