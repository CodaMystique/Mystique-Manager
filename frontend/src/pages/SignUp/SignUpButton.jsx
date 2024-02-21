import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const SignUpButton = ({ isLoading }) => (
  <button
    type="submit"
    className="w-full px-6 py-2 rounded-md bg-stone-400 text-stone-900 hover:bg-stone-300 focus:outline-none focus:bg-stone-300 transition duration-300 ease-in-out font-bold text-lg flex justify-center items-center"
    disabled={isLoading}
  >
    {isLoading ? (
      <>
        <BiLoaderCircle className="animate-spin mr-2" />
        Signing up...
      </>
    ) : (
      "Sign Up"
    )}
  </button>
);

export default SignUpButton;
