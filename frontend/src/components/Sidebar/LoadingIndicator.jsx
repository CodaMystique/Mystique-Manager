// LoadingIndicator.jsx
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function LoadingIndicator() {
  return (
    <div className="flex justify-center mt-9">
      <BiLoaderCircle className="animate-spin h-8 w-8" />
    </div>
  );
}

export default LoadingIndicator;
