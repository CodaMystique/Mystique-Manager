import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function logoutUser() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("user");
        setAuthUser(null);
      } else {
        throw new Error(data.error || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, logoutUser };
}

export default useLogout;
