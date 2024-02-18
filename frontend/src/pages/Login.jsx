import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";
import { BiLoaderCircle } from "react-icons/bi";

function Login() {
  const { isLoading, loginUser } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await loginUser(formData);
  };

  return (
    <div className="flex justify-center items-center relative bg-gradient-to-br from-stone-800 to-stone-700 overflow-hidden min-h-screen">
      {/* Floating Glowing Objects */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* Floating Object 1 */}
        <div className="absolute animate-float1 bg-gradient-to-tl from-stone-400 to-transparent w-20 h-20 rounded-full opacity-60 top-1/4 -left-12"></div>
        {/* Floating Object 2 */}
        <div className="absolute animate-float2 bg-gradient-to-tl from-stone-400 to-transparent w-12 h-12 rounded-full opacity-60 top-1/2 -right-12"></div>
        {/* Floating Object 3 */}
        <div className="absolute animate-float3 bg-gradient-to-tl from-stone-400 to-transparent w-16 h-16 rounded-full opacity-60 bottom-1/4 -left-12"></div>
        {/* Floating Object 4 */}
        <div className="absolute animate-float4 bg-gradient-to-tl from-stone-400 to-transparent w-24 h-24 rounded-full opacity-60 bottom-1/2 -right-12"></div>
      </div>

      <form
        id="container"
        className="bg-stone-800 text-stone-100 p-8 rounded-lg shadow-lg max-w-md w-full mx-4 md:mx-auto relative z-10"
        onSubmit={handleSubmit}
      >
        {/* Log In Heading */}
        <div className="text-center mb-5">
          <h3 className="text-3xl font-bold mb-2 text-stone-200 ">Login</h3>
          <p className="text-stone-400">Welcome back to Mystique Manager!</p>
        </div>

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

        {/* Log In Button */}
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

        {/* Don't have an account */}
        <div className="text-sm mt-4 text-stone-200">
          Don't have an Account yet?{" "}
          <Link to="/signup" className="text-stone-300 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
