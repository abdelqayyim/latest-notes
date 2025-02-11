import React, { useState, useRef } from "react";
import styles from "./styles/Sidebar.module.css";
import { useDispatch } from "react-redux";
import {
  setCurrentForm,
  FORMS,
} from "../redux/dataSlice";
import { Link } from "react-router-dom";
import Icons from '../pages/icons/Icons';
import { logout } from '../redux/authSlice';
import Tooltip from '@mui/material/Tooltip';

const Sidebar = (props) => {
  // before the sidebar languages are display, the data is already fetched no need to do it again
  const dispatch = useDispatch();
  const sidebar = useRef();
  const toggleBtn = useRef();
  const [sideBarOpen, setSidebarOpen] = useState(false);

  const toggleSubMenu = (event) => {
    const button = event.currentTarget;
    const subMenu = button.nextElementSibling;
    const side = sidebar.current;

    subMenu.classList.toggle(styles.show); // Use styles.show if your CSS module defines a class named `show`
    button.classList.toggle(styles.rotate);

    if (side.classList.contains(styles.close)) {
      toggleSideBar();
    }
  };
  const toggleSideBar = () => {
    setSidebarOpen(prev => !prev);
    const side = sidebar.current;
    const toggle = toggleBtn.current;
    side.classList.toggle(styles.close);
    toggle.classList.toggle(styles.rotate);

    // Close all open submenus when the sidebar is closed
    if (side.classList.contains(styles.close)) {
      Array.from(side.getElementsByClassName(styles.show)).forEach(
        (subMenu) => {
          subMenu.classList.remove(styles.show);
          if (subMenu.previousElementSibling) {
            subMenu.previousElementSibling.classList.remove(styles.rotate);
          }
        }
      );
    }
  };

  return (
    <nav
      id="sidebar"
      className={`${styles.sidebar} ${styles.close}`}
      ref={sidebar}
    >
      <ul>
        <li>
          <span className={styles.logo}>LOGO</span>
          <Tooltip title={sideBarOpen?"Close":"Open"} placement="right">
          <button
            className={`${styles["toggle-btn"]} ${styles["rotate"]}`}
            onClick={toggleSideBar}
            ref={toggleBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
            </svg>
          </button>
          </Tooltip>
        </li>

        <li className={styles["active"]}>
          
          <Tooltip title={sideBarOpen?"":"Home"} placement={"right"}>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
              <span>Home</span>
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip title={sideBarOpen?"":"Create"} placement="right">
          <button className={styles["dropdown-btn"]} onClick={toggleSubMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
            </svg>
            <span>Create</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
          </Tooltip>
          
          <ul className={styles["sub-menu"]}>
            <div>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setCurrentForm(FORMS.CREATE_COURSE));
                  }}
                >
                  Course
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setCurrentForm(FORMS.CREATE_NOTE));
                  }}
                >
                  Note
                </a>
              </li>
            </div>
          </ul>
        </li>

        <li>
          <Tooltip title={sideBarOpen? "":"Account"} placement="right">
            <button className={styles["dropdown-btn"]} onClick={toggleSubMenu}>
              {Icons.ACCOUNT_ICON}
              <span>Account</span>
              {Icons.ARROW_DOWN}
            </button>
          </Tooltip>
          <ul className={styles["sub-menu"]}>
            <div>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // dispatch(setCurrentForm(FORMS.CREATE_COURSE));
                  }}
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                  }}
                >
                  Logout
                </a>
              </li>
            </div>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
