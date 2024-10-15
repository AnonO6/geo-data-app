import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token"); // Check for the authentication token

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App name */}
        <Link to="/" className="text-2xl font-bold">
          Geo Data App
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>

          {/* Conditionally render login or account management */}
          {token ? (
            <Link to="/account" className="text-white hover:text-gray-400">
              Account
            </Link>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-400">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
