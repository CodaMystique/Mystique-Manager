import React from "react";
import { Link } from "react-router-dom";

const LoginLink = () => (
  <div className="text-sm mt-4 text-stone-200">
    Already have an Account{" "}
    <Link to="/login" className="text-stone-300 hover:underline">
      Log In
    </Link>
  </div>
);

export default LoginLink;
