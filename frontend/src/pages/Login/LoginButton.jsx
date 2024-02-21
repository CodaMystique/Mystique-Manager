import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const LoginButton = ({ isLoading }) => (
  <button
    type="submit"
    className="w-full px-6 py-2 rounded-md bg-stone-400 text-stone-900 hover:bg-stone-300 focus:outline-none focus:bg-stone-300 transition duration-300 ease-in-out font-bold text-lg flex items-center justify-center"
  >
    {isLoading ? (
      <>
        <BiLoaderCircle className="animate-spin mr-2" />
        Logging In...
      </>
    ) : (
      "Login"
    )}
  </button>
);

export default LoginButton;
