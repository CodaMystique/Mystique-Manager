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

      if (response.status === 401) {
        // JWT is expired, remove user from localStorage
        localStorage.removeItem("user");
        setAuthUser(null);
        toast.error("Session expired. Please log in again.");
      } else if (response.ok) {
        // Logout successful
        localStorage.removeItem("user");
        setAuthUser(null);
        toast.success("Logout successful");
      } else {
        // Other errors
        const data = await response.json();
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
