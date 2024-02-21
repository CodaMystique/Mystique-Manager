import { useState } from "react";
import { useProjectsContext } from "../context/ProjectsContext.jsx";

export default function useGetProjects() {
  const [isLoading, setIsLoading] = useState(false);
  const { setProjectsState } = useProjectsContext();

  async function getProjects() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setProjectsState((prevState) => ({ ...prevState, projects: data }));

      return data;
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching projects:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, getProjects };
}
