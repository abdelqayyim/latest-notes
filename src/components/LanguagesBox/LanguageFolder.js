import React, { useState } from "react";
import styles from "./LanguageFolder.module.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom
import { useSelector, useDispatch } from "react-redux";
import Confirmation from "../PopUps/Confirmation";
import LanguageServices from "../../LanguageServices";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  setValue,
  setCurrentLanguage,
  setSpinnerMessage,
  setErrorMessage,
  setlanguagesList,
  setCurrentNotes,
} from "../../redux/dataSlice";

const LanguageFolder = (props) => {
  const navigate = useNavigate(); // Use useNavigate instead of useRouter
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages.languagesList);
  const currentNotes = useSelector((state) => state.languages.currentNotes);
  const values = useSelector((state) => state.languages.value);
  const [notes, setNotes] = useState(currentNotes);
  let path = props.name.replace(/\s/g, "").toLowerCase();
  const [openDelete, setOpenDelete] = useState(false);

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

  const clickHandler = (id) => {
    dispatch(setCurrentLanguage(id));
    navigate(`/${path}`); // Use navigate instead of router.push
  };

  const handleDeleteLanguage = async () => {
    console.log("Should delete language", props);
    const response = await LanguageServices.deleteLanguage(props.id);
    console.log("response", response);
  };

  return (
    <>
      <div
        className={styles["folder-div"]}
        onClick={() => clickHandler(props.id)}
      >
        <div className={styles["back-folder-part"]}></div>
        <div className={styles["main-folder-part"]}>
          <div
            className={styles["delete-div"]}
            onClick={(event) => {
              event.stopPropagation();
              setOpenDelete(true);
            }}
          >
            <DeleteIcon />
          </div>
          {props.name}
        </div>
      </div>
      <Confirmation
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        text={`Are you sure you want to delete ${props.name}, you cannot undo this action.`}
        onConfirm={() => handleDeleteLanguage()}
        isOverlayVisible={true}
      />
    </>
  );
};

export default LanguageFolder;
