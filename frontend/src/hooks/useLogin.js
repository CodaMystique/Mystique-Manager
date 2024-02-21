import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { validateForLogin } from "../utils/validator.js";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function loginUser({ email, password }) {
    setIsLoading(true);
    try {
      if (!validateForLogin({ email, password })) return;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, loginUser };
}

export default useLogin;
