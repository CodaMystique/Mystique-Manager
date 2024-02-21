// LogoutButton.jsx
import React from "react";
import { BiLogOut } from "react-icons/bi";

function LogoutButton({ isLoading, logoutUser }) {
  return (
    <div className="mt-auto">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <BiLogOut
          className="w-7 h-7 text-white cursor-pointer"
          onClick={logoutUser}
        />
      )}
    </div>
  );
}

export default LogoutButton;
