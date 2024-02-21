import React, { useState } from "react";
import useSignup from "../../hooks/useSignUp.js";
import SignUpInput from "./SignUpInput";
import SignUpButton from "./SignUpButton";
import SignUpHeading from "./SignUpHeading";
import LoginLink from "./LoginLink";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isLoading, signupUser } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupUser(formData);
  };

  return (
    <div className="flex justify-center items-center relative bg-gradient-to-br from-stone-800 to-stone-700 overflow-hidden min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute animate-float1 bg-gradient-to-tl from-stone-400 to-transparent w-20 h-20 rounded-full opacity-60 top-1/4 -left-12"></div>
        <div className="absolute animate-float3 bg-gradient-to-tl from-stone-400 to-transparent w-16 h-16 rounded-full opacity-60 bottom-1/4 -left-12"></div>
        <div className="absolute animate-float4 bg-gradient-to-tl from-stone-400 to-transparent w-24 h-24 rounded-full opacity-60 bottom-1/2 -right-12"></div>
      </div>

      <form
        id="container"
        className="bg-stone-800 text-stone-100 p-8 rounded-lg shadow-lg max-w-md w-full mx-4 md:mx-auto relative z-10"
        onSubmit={handleSubmit}
      >
        {/* SignUp Heading */}
        <SignUpHeading />

        {/* Full Name */}
        <SignUpInput
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        {/* Email */}
        <SignUpInput
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Password */}
        <SignUpInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Confirm Password */}
        <SignUpInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {/* SignUp Button */}
        <SignUpButton isLoading={isLoading} />

        {/* Login Link */}
        <LoginLink />
      </form>
    </div>
  );
}

export default SignUp;
