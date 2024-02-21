// LoadingIndicator.jsx
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center">
      <BiLoaderCircle className="animate-spin mr-2" />
      <span>Loading...</span>
    </div>
  );
}

export default LoadingIndicator;
