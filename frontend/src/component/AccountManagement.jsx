import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountManagement = () => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   // Fetch current account details
  //   const fetchAccountDetails = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/account", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });

  //       setUsername(response.data.username);
  //       setEmail(response.data.email);
  //     } catch (err) {
  //       setError("Failed to load account information.");
  //     }
  //   };

  //   // fetchAccountDetails();
  // }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in again.");
      return;
    }
    const updateData = {
      email: email,
      password: newPassword,
      old_password: oldPassword,
    };
    try {
      const response = await axios.put(
        "https://geoapi.aviral.software/api/update",
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 2000,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      setError("Failed to update account information.");
      console.log(err);
      console.log(token);
      setSuccess(false); // Ensure success message doesn't appear
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Account Management
      </h2>
      <form onSubmit={handleUpdate}>
        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Old Password Input */}
        <div className="mb-4">
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
            placeholder="Old Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* New Password Input */}
        <div className="mb-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update Account
        </button>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4">Account updated successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AccountManagement;
