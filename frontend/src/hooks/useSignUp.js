import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import isValidEmail from "../utils/isValidEmail.js";

function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function signupUser({ fullName, email, password, confirmPassword }) {
    const isValid = validateInput({
      fullName,
      email,
      password,
      confirmPassword,
    });
    if (!isValid) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, signupUser };
}

function validateInput({ fullName, email, password, confirmPassword }) {
  if (
    !fullName.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
  ) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!isValidEmail(email)) {
    toast.error("Please enter a valid email");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignup;
