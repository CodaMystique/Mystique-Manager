import React from "react";

const LoginForm = ({ formData, handleChange }) => {
  return (
    <>
      {/* Email */}
      <label
        htmlFor="email"
        className="block text-sm font-semibold uppercase text-stone-200 mb-1"
      >
        Email
      </label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border-b-2 rounded-sm border-stone-400 bg-stone-700 text-stone-100 focus:outline-none focus:border-stone-400 mb-4 transition duration-300 ease-in-out hover:bg-stone-600"
      />

      {/* Password */}
      <label
        htmlFor="password"
        className="block text-sm font-semibold uppercase text-stone-200 mb-1"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border-b-2 rounded-sm border-stone-400 bg-stone-700 text-stone-100 focus:outline-none focus:border-stone-400 mb-4 transition duration-300 ease-in-out hover:bg-stone-600"
      />
    </>
  );
};

export default LoginForm;
