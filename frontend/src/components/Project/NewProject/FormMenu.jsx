// FormMenu.jsx
import React from "react";

function FormMenu({ children }) {
  return (
    <menu className="flex items-center justify-end gap-4 my-4">{children}</menu>
  );
}

export default FormMenu;
