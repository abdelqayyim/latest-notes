import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
import {
  setValue,
  setSpinnerMessage,
  setErrorMessage,
  setlanguagesList,
  setCurrentLanguage,
  LOADING_STATE
} from "../redux/slice";
import InputPopUp from '../components/PopUps/InputPopUp';
import LanguageFolder from "../components/LanguagesBox/LanguageFolder";
import styles from './styles/Home.module.css';

import LanguagesBox from "../components/LanguagesBox/LanguagesBox";
import { useParams } from "react-router-dom";  // React Router's useParams hook
import LanguageServices from "../LanguageServices";

export default function Home() {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.languages);
  const loadingState = state.loading;
  const isOverlayActive = useSelector((state) => state.languages.inputPopup);
  const [mode, setMode] = useState(""); //this is for whether a language is being added or deleted
  let popupActive = state.inputPopup;
  const currentLanguages = useSelector((state) => state.languages.languagesList);
  const [currList, setCurrList] = useState(currentLanguages);

  // This is the home page
  const message = useSelector((state) => state.languages.spinnerMessage);
  let active = message !== "";

  const fetchData = async () => {
    dispatch(setSpinnerMessage("Loading Language"));
    try {
      const data = await LanguageServices.getAllLanguages();
      setCurrList(data);
      dispatch(setSpinnerMessage(""));
      let formattedData = data.map(obj => ({ _id: obj._id, name: obj.name }));
      dispatch(setlanguagesList(formattedData));
      dispatch(setValue(data));
      return data;
    } catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      throw error;
    }
  }

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  if (active) {
    return <Spinner />;
  }

  const toTitleCase = (str)=> {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  const languageButtonHandler = (id) => {
    dispatch(setCurrentLanguage(id));
  };

  return (
    <div style={{ height:"100%", display:"flex",flexDirection:"column", alignItems: "center"}}>
        {<div className={styles["typewriter"]}>
          <h1>My Notes</h1>
      </div>}
      
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
    </div>
  );
}
