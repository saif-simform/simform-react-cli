import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/features/authSlice";
import styles from "./Layout.module.css";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    Cookies.remove('accessToken')
    dispatch(logout())
  }
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div>
          <img src="https://ik.imagekit.io/ashishkk22/simform_logo.svg?updatedAt=1697020836220" alt="simform_logo" />
        </div>
        <div>
          <div>
            <ul className={styles.nav_ul}>
              <li>
                <Link to={"/"} className={styles.nav_link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className={styles.nav_link}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to={"/about"} className={styles.nav_link}>
                  About
                </Link>
              </li>
              <li>
                <Link to={"/"} className={styles.nav_link} onClick={() => handleLogout()}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </main >
  );
};

export default Layout;
