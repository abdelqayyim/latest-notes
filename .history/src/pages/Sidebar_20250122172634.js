import React, {useEffect, useState, useRef} from 'react'; 
import styles from './styles/Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLanguage, setCurrentNotes } from '../redux/slice';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import InputPopUp from '../components/PopUps/InputPopUp';
import { addIcon } from '../IconsSVG/IconSVG';
import CreateCourseForm from '../components/Forms/CreateNoteForm/CreateCourseForm';

const Sidebar = (props) => {
    // before the sidebar languages are display, the data is already fetched no need to do it again
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const languages = useSelector((state) => state.languages.value);
    const currentLanguageID = useSelector((state) => state.languages.currentLanguageID);
    const currentLanguageName = useSelector((state) => state.languages.currentLanguageID);
    const currentNotes = useSelector((state) => state.languages.currentNotes);
    const [collapsedSidebar, setCollapsedSidebar] = useState(false);
    const [showCreateCourseForm, setCreateCourseForm] = useState(false);
    const sidebar = useRef();
    const toggleBtn = useRef();

    const languageOnClick = (id, name) => {
        //make sure youre at the right page 
        navigate(`/${name.replace(/\s/g, "")}`)
        let newNotes = languages.filter(language => {
            if (language._id == id) {
                return language.notes;
            }
        })
        dispatch(setCurrentLanguage(id));
        dispatch(setCurrentNotes(newNotes[0].notes));
    }
    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
    }

    const handleCreateLanguage = () => {
        console.log("Should create a new language");
    }

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
        const side = sidebar.current;
        const toggle = toggleBtn.current;
        side.classList.toggle(styles.close);
        toggle.classList.toggle(styles.rotate);

       // Close all open submenus when the sidebar is closed
        if (side.classList.contains(styles.close)) {
            Array.from(side.getElementsByClassName(styles.show)).forEach(subMenu => {
                subMenu.classList.remove(styles.show);
                if (subMenu.previousElementSibling) {
                    subMenu.previousElementSibling.classList.remove(styles.rotate);
                }
            });
        }
    }

    return (
        <nav id='sidebar' className={`${styles.sidebar} ${styles.close}`} ref={sidebar}>
            <CreateCourseForm />
            <ul>
                <li>
                    <span className={styles.logo}>LOGO</span>
                    <button className={`${styles["toggle-btn"]} ${styles["rotate"]}`} onClick={toggleSideBar} ref={toggleBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg>
                    </button>
                </li>
                
                <li className={styles['active']}>
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <button className={styles["dropdown-btn"]} onClick={toggleSubMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/></svg>
                        <span>Create</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </button>
                    <ul className={styles["sub-menu"]}>
                        <div>
                            <li><a href="#">Course</a></li>
                            <li><a href="#">Note</a></li>
                        </div>
                    </ul>
                </li>
            </ul>
        </nav>
    )
};

export default Sidebar;