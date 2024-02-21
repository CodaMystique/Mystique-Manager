import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useProjectsContext } from "../context/ProjectsContext.jsx";

function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setProjectsState } = useProjectsContext();

  async function logoutUser() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        localStorage.removeItem("user");
        setAuthUser(null);
        setProjectsState((prevState) => ({
          ...prevState,
          selectedProjectId: undefined,
        }));
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
