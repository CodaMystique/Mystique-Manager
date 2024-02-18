import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import isValidEmail from "../utils/isValidEmail";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function loginUser({ email, password }) {
    // Set loading state to true when starting login process
    setIsLoading(true);
    try {
      // Validate input before making the API call
      if (!validateInput({ email, password })) return;

      // Making the API call to login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Parsing the response data
      const data = await response.json();

      // Check for errors in the response
      if (data.error) {
        throw new Error(data.error);
      }

      // Set the authenticated user in the context
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      // Show error toast if login fails
      toast.error(error.message);
    } finally {
      // Set loading state to false after login attempt
      setIsLoading(false);
    }
  }

  // Return loading state and login function
  return { isLoading, loginUser };
}

function validateInput({ email, password }) {
  if (!email.trim() || !password.trim()) {
    // Show error toast if any field is empty
    toast.error("Please enter all fields");
    return false;
  }

  if (!isValidEmail(email)) {
    toast.error("Please enter valid email");
    return false;
  }

  return true;
}

export default useLogin;
