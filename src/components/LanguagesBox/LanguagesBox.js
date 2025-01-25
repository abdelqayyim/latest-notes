"use client";
import React, { useEffect, useContext, useState } from "react";
import styles from "./LanguagesBox.module.css";
import DropArrow from "../DropArrow/DropArrow";
import LanguageFolder from "./LanguageFolder";

import { useSelector, useDispatch } from "react-redux";
import {
  setValue,
  setCurrentLanguage,
  setSpinnerMessage,
  setErrorMessage,
  setlanguagesList,
} from "../../redux/dataSlice";
import { LOADING_STATE } from "../../redux/dataSlice";
import InputPopUp from "../PopUps/InputPopUp";
import LanguageServices from "../../LanguageServices";

const LanguagesBox = (props) => {
  const URL = "https://fequentquestionsserver.vercel.app/languages";
  // const URL = "http://localhost:8000/language/"
  let state = useSelector((state) => state.languages);
  const dispatch = useDispatch();
  const loadingState = state.loading;
  const isOverlayActive = useSelector((state) => state.languages.inputPopup);
  const [mode, setMode] = useState(""); //this is for whether a language is being added or deleted
  let popupActive = state.inputPopup;
  const currentLanguages = useSelector(
    (state) => state.languages.languagesList
  );
  const [currList, setCurrList] = useState(currentLanguages);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const languageButtonHandler = (id) => {
    dispatch(setCurrentLanguage(id));
  };

  const changeMode = (newMode) => {
    setMode(newMode); // for input or deletion of language
  };

  if (currList.length > 0) {
    // add a second option
    return (
      <div
        className={`${styles["top-div"]} ${
          isOverlayActive ? styles["overlay-active"] : ""
        }`}
      >
        {loadingState == LOADING_STATE.IDLE && (
          <div className={styles["typewriter"]}>
            <h1>My Notes</h1>
          </div>
        )}
        <div className={`${styles["languages-box"]}`}>
          {[...currList].reverse().map((language) => {
            return (
              <LanguageFolder
                name={toTitleCase(language.name)}
                id={language._id}
                key={language._id}
                onClick={() => languageButtonHandler(language._id)}
              />
            );
          })}
        </div>
        {popupActive && <InputPopUp mode={mode} />}
      </div>
    );
  }
};

export default LanguagesBox;
