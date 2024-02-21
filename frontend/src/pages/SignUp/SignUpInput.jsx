import React from "react";

const SignUpInput = ({ label, type, name, value, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold uppercase text-stone-200 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border-b-2 rounded-sm border-stone-400 bg-stone-700 text-stone-100 focus:outline-none focus:border-stone-400 mb-4 transition duration-300 ease-in-out hover:bg-stone-600"
    />
  </div>
);

export default SignUpInput;
