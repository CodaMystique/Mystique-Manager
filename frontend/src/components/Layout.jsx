import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import useGetProjects from "../hooks/useGetProjects";
import { useEffect } from "react";

function Layout({ children }) {
  const { isLoading, getProjects } = useGetProjects();

  useEffect(() => {
    getProjects();
  });

  return (
    <main className="h-screen flex gap-8">
      <Sidebar></Sidebar>
      {children}
    </main>
  );
}

export default Layout;
