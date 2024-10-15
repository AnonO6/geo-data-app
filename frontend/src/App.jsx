import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import MainPage from "./component/MainPage";
import Layout from "./component/Layout";
import Signup from "./component/Signup";
import AccountManagement from "./component/AccountManagement";
import ErrorPage from "./Error";

// Create a router using createBrowserRouter
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: isAuthenticated ? <Navigate to="/main" /> : <LandingPage />, // Redirect to main if logged in
          // element: <MainPage />,
        },
        {
          path: "/login",
          element: isAuthenticated ? <Navigate to="/main" /> : <Login />, // Redirect to main if already logged in
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/account",
          element: <AccountManagement />,
        },
        {
          path: "/main",
          element: <MainPage />, // Redirect to landing if not authenticated
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
