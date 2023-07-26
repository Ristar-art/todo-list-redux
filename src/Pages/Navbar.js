import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/auth";

export const Navbar = ({ user }) => {
  const auth = useAuth();

  return (
    <nav>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/todolist">To do list</Link>
        </li>
        <li>
          <Link to="/registrationpage">Registration Page</Link>
        </li>
        {!auth.authenticated && (
          <li>
            <Link to="login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
