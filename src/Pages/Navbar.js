import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/auth";

export const Navbar = ({ user }) => {
  const auth = useAuth();

  return (
    <nav>
      <div
        style={{
          position: "relative",
          width: "100vw",
          maxHeight: "10vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          zIndex: 100,
        }}
      >
        <div
          style={{
            marginLeft: 10,
            height: "100%",
            alignItems: "center",
            display: "flex",
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <li>
            <Link style={{paddingRight:10,color:"white", textDecoration: "none"}} to="/">Home</Link>
          </li>
          <li>
            <Link style={{paddingRight:10,color:"white", textDecoration: "none"}} to="/about">About</Link>
          </li>
          {/* <li>
            <Link style={{paddingRight:10,color:"white", textDecoration: "none"}} to="/todolist">To do list</Link>
          </li> */}
        </div>
        <div
          style={{
            marginRight: 50,
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
            paddingTop: 10,
            flexWrap: "wrap",
          }}
        >
          <li>
            <Link style={{paddingRight:10,color:"white", textDecoration: "none"}} to="/registrationpage">Registrator</Link>
          </li>
          {!auth.authenticated && (
            <li>
              <Link style={{paddingRight:10,color:"white", textDecoration: "none"}} to="login">Login</Link>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};
