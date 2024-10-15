import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is set to JSON
          },
        }
      );

      // Assuming the response contains a token
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Redirect to the home page
      navigate("/main");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-rose-100 via-purple-100 to-teal-100 animate-text">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
