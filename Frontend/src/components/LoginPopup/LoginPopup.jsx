import React, { useState } from "react";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrentState] = useState("Login");

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 grid place-items-center">
      <form className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 space-y-6 animate-fade-in">
        {/* Title */}
        <div className="flex justify-between items-center text-black">
          <h2 className="text-lg font-medium">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            alt="Close"
            className="w-4 cursor-pointer"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col space-y-5">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Username"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2 text-sm">
          <input type="checkbox" className="mt-1" required />
          <p>
            By continuing, I agree to the{" "}
            <span className="text-red-500 font-medium cursor-pointer">
              terms of use
            </span>{" "}
            &{" "}
            <span className="text-red-500 font-medium cursor-pointer">
              privacy policy
            </span>.
          </p>
        </div>

        {/* Toggle between Login and Sign Up */}
        {currState === "Login" ? (
          <p className="text-sm">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-red-500 font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-red-500 font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
