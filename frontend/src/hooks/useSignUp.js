import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { validateForSignup } from "../utils/validator.js";

function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function signupUser({ fullName, email, password, confirmPassword }) {
    if (!validateForSignup({ fullName, email, password, confirmPassword }))
      return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
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

export default useSignup;
