import React from "react";
import { Link, Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <div>
          <ul>
            <li>
              <Link to={"/auth/login"}>Sign In</Link>
            </li>
            <li>
              <Link to={"/auth/signup"}>Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default LayoutAuth;
