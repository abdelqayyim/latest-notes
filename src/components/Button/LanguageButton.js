import React, { useCallback, useEffect, useState } from "react";
import styles from "./LanguageButton.module.css";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import { useSelector, useDispatch } from "react-redux";
import { setCurrentNotes } from "../../redux/slice";

const LanguageButton = (props) => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages.languagesList);
  const currentNotes = useSelector((state) => state.languages.currentNotes);
  const values = useSelector((state) => state.languages.value);
  const [notes, setNotes] = useState(currentNotes);
  let path = props.name.replace(/\s/g, "").toLowerCase();

  // Find the ID based on the language name
  const findID = () => {
    let id = -1;
    languages.forEach((lang) => {
      if (lang.name.replace(/\s/g, "").toLowerCase() === path) {
        id = lang._id;
      }
    });
    return id;
  };

  const clickHandler = () => {
    let id = findID();
    // Fetch the notes for this language
    // If notes are empty, fetch it from value from original home page fetch
    if (notes.length === 0) {
      let temp = values.filter((obj) => {
        if (obj._id === id) {
          return obj.notes;
        }
      });
      dispatch(setCurrentNotes([...temp]));
      navigate(`/${path}`); // Use navigate instead of router.push
    }
  };

  return (
    <button
      className={styles.btn}
      onClick={clickHandler}
      name={props.name}
      id={props._id}
    >
      {props.name}
    </button>
  );
};

export default LanguageButton;
