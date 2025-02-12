import React, { useState } from "react";
import styles from "./LanguageFolder.module.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom
import { useDispatch } from "react-redux";
import Confirmation from "../PopUps/Confirmation";
import LanguageServices from "../../LanguageServices";
import { customEncodeURI } from "../../utilFunctions";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  setCurrentLanguage,
} from "../../redux/dataSlice";
import { Tooltip } from "@mui/material";

const LanguageFolder = (props) => {
  const navigate = useNavigate(); // Use useNavigate instead of useRouter
  const dispatch = useDispatch();
  let path = props.name.toLowerCase();
  const [openDelete, setOpenDelete] = useState(false);


  const clickHandler = (id) => {
    dispatch(setCurrentLanguage(id));
    navigate(`/${customEncodeURI(path)}`); // Use navigate instead of router.push
  };

  const handleDeleteLanguage = async () => {
    try {
      await LanguageServices.deleteLanguage(props.id);
      await props.refetch();
      setOpenDelete(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div
        className={styles["folder-div"]}
        onClick={() => clickHandler(props.id)}
      >
        <div className={styles["back-folder-part"]}></div>
        <div className={styles["main-folder-part"]}>
         
          <Tooltip title={"Delete"} placement="right">
          <div
            className={styles["delete-div"]}
            onClick={(event) => {
              event.stopPropagation();
              setOpenDelete(true);
            }}
          >
            <DeleteIcon />
          </div>
          </Tooltip>
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
