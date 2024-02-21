import React from "react";
import { Link } from "react-router-dom";

const SignUpLink = () => (
  <div className="text-sm mt-4 text-stone-200">
    Don't have an Account yet?{" "}
    <Link to="/signup" className="text-stone-300 hover:underline">
      Sign Up
    </Link>
  </div>
);

export default SignUpLink;
