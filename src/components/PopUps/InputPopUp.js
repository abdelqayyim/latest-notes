import React, { useState, useContext, useRef } from "react";
import styles from "./InputPopUp.module.css";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages, setlanguagesList, togglePopup } from "../../redux/slice";
// import { IonIcon } from '@ionic/react';
// import { closeOutline } from 'ionicons/icons';
import Spinner from "../Spinner/Spinner"
import {setCurrentNotes, setErrorMessage, setSpinnerMessage, setValue} from "../../redux/slice";

const AddLanguagePopUp = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  // used in languagesBox component1
  const languages = useSelector((state) => state.languages.languagesList);
  let globalValue = useSelector((state) => state.languages.value);
  const [inputValue, setInputValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  let currentLanguageID = useSelector((state) => state.languages.currentLanguageID);
  const message = useSelector((state) => state.languages.spinnerMessage);
  let active = message !== "";

  const overlay = useRef();
  const dispatch = useDispatch();
  

  const overlayClickHandler = () => {//togle the popUp
    dispatch(togglePopup());
  }

  const languageExists = (val) => {// checks to see if the language currently exists or not
    let value = null;
    languages.forEach((language, index) => {
      // console.log(`${language.name.toLowerCase()}==${val} == ${language.name.toLowerCase() == val}`);
      if (language.name.toLowerCase() == val) {
        value = index;
        return;
      }
    })
    return value == null ? -1 : value;
  }
  const addLanguage = async () => {
    let newLanguage = inputValue.toLowerCase().trim();
    let id = languageExists(newLanguage);
    if (id != -1) { // if it exists already
      dispatch(setErrorMessage({ message: "Language Already Exists", sign: "negative" }));
      return;
    }
    try {
      const response = await fetch(URL + `${newLanguage}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const data = await response.json();
      let obj = { name: data.name, _id: data._id}
      dispatch(setlanguagesList([...languages, obj]))
      dispatch(setErrorMessage({ message: "Language Successfully Added", sign: "positive" }));
      dispatch(togglePopup());
    }
    catch (error) {
        throw error;
    }
  }
  const deleteLanguage = async () => {
    let newLanguage = inputValue.toLowerCase().trim();
    let index = languageExists(newLanguage);
    if (index == -1) { // if it does not exists already
      dispatch(setErrorMessage({ message: "Language does not Exists", sign: "negative" }));
      return;
    }
    
    try {
        const response = await fetch(URL + `${languages[index]._id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
      //remove it from the currentLanguages list
      
      let newList = [...languages].filter((lan) => {
        if (lan.name.toLowerCase() != newLanguage) {
          return lan;
        }
      });
      dispatch(setlanguagesList(newList));
      
      dispatch(setErrorMessage({ message: "Language Successfully Deleted", sign: "positive" }));
      dispatch(togglePopup());
    }
    catch (error) {
        throw error;
    }
}
  const addNote = async () => {
    let note = {
      title: titleValue,
      description: descriptionValue,
      noteDetail: [{text: "Add text"}],
      _id: ""
    }
    try {
      dispatch(togglePopup());
      dispatch(setSpinnerMessage("Adding New Note"));
      //check to see if title already exists
      const response = await fetch(URL + `${currentLanguageID}/newNote`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(note),
      })
    const data = await response.json();
    let newNotes = [...data.notes];
      dispatch(setCurrentNotes(newNotes)); 
      // now also update the global notes after this
      let tempVal = [...globalValue];
      tempVal = globalValue.map((languageOBJ) => {
        if (languageOBJ._id === currentLanguageID) {
          return { ...languageOBJ, notes: [...newNotes] };
        }
        return languageOBJ;
      })
      dispatch(setValue(tempVal));

      dispatch(setErrorMessage({ message: "Note sucessfully added", sign: "positive" }));
      dispatch(setSpinnerMessage(""));
  }
  catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      dispatch(setSpinnerMessage(""));
      throw error;
  }
}
  const addLanguageHandler = (event) => {
    if (props.mode == "Add") {
      addLanguage();
    } else {
      deleteLanguage();
    }
    // dispatch(togglePopup());
  }



  return ReactDOM.createPortal(
    <div ref={overlay} className={styles.overlay} onClick={(event)=>{if (overlay.current == event.target) {
      overlayClickHandler();
    }
    }}>
      {active && <Spinner/> }
      {/* // this is for adding a new language */}
      {(props.mode == 'Add' || props.mode == 'Delete') &&
        <div className={styles.popup}>
        <label for="input">{ props.mode} Language</label>
        <input onChange={(event) =>setInputValue(event.target.value)} className={styles.input} type="text" id="input" name="userInput" value={inputValue} />
          <button onClick={addLanguageHandler}>Submit</button>
        </div>
      }

      {/* //this is for adding a new note */}
      {props.mode == 'add-note' && 
        <div className={styles.popup}>
        <label for="input">Add New Note</label>
        <input placeholder="Tile" onChange={(event) =>setTitleValue(event.target.value)} className={styles.title} type="text" id="title" name="noteTitle" value={titleValue} />
          <input placeholder="Description" onChange={(event) => setDescriptionValue(event.target.value)} className={styles.description} type="text" id="description" name="noteDescription" value={descriptionValue} />
          
          <button onClick={addNote}>Add Note</button>
        </div>
      }
    </div>
    ,
    document.querySelector(".overlay")
  );
};

export default AddLanguagePopUp;
