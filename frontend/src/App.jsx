import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import NewProject from "./components/Project/NewProject.jsx";
import NoProjectSelected from "./components/Project/NoProjectSelected.jsx";
import SelectedProject from "./components/Project/SelectedProject.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import useGetProjects from "./hooks/useGetProjects.js";

function App() {
  const { authUser } = useAuthContext();
  const { getProjects } = useGetProjects();

  useEffect(() => {
    async function fetchProjects() {
      await getProjects();
    }
    fetchProjects();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <Layout>
                <NoProjectSelected />
              </Layout>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/new-project"
          element={
            authUser ? (
              <Layout>
                <NewProject />
              </Layout>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/:projectId"
          element={
            authUser ? (
              <Layout>
                <SelectedProject />
              </Layout>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
