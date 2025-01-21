import React, {
    Fragment,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
  import styles from "./DropArrow.module.css";
  // import { IonIcon } from '@ionic/react';
  import { useSelector, useDispatch } from 'react-redux';
  import { fetchLanguages, setCurrentLanguage, togglePopup } from "../../redux/slice";
  
  const DropArrow = (props) => {
    // const curr = useContext(AppProvider);
    let [isActive, setIsActive] = useState(false);
    let button = useRef();
    let options = useRef();
    let icon = useRef();
    let state = useSelector((state) => state.languages);
    let popupActive = state.inputPopup;
    let dispatch = useDispatch();
  
    useEffect(() => {
      const closeDropdown = (event) => {
        if (!button.current.contains(event.target)) {
          setIsActive(false);
        }
      };
      document.addEventListener("click", closeDropdown);
      return () => {
        document.removeEventListener("click", closeDropdown);
      };
    });
  
    const addLanguageHandler = () => {
      props.mode("Add")
      setIsActive(false);
      dispatch(togglePopup());
    };
    const deleteLanguageHandler = () => {
      props.mode("Delete");
      setIsActive(false);
      dispatch(togglePopup());
    };
    const arrowClickHandler = (e) => {
      setIsActive((prev) => !prev);
    };
  
    return (
      <Fragment>
        <div className={`${styles["btn-dropdown"]}`} ref={button}>
          <button className={`${styles.arrowBtn} `} onClick={(e) => arrowClickHandler(e)}>
            {isActive? <span class="material-symbols-outlined">expand_less</span>: <span class="material-symbols-outlined">expand_more</span>}
          </button>
          <ul className={isActive ? `${styles.dropInfo} ${styles.active} `: `${styles.dropInfo}`} ref={options}>
            <li className={`${styles["add-languageOption"]}`} onClick={addLanguageHandler}>
              Add Language
            </li>
            <li className={`${styles["delete-languagegOption"]}`} onClick={deleteLanguageHandler}>
              Delete Language
            </li>
          </ul>
        </div>
      </Fragment>
    );
  };
  
  export default DropArrow;
  