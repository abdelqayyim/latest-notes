import React, { useContext } from "react";
import styles from "./AddNoteBtn.module.css";
// import { ACTIONS, AppProvider } from "../../app/AppContext";

const AddNoteBtn = (props) => {
  const curr = useContext(AppProvider);
  const handleAddNote = () => {
    curr.callDispatch({ type: ACTIONS.TOGGLE_ADD_NOTE_POPUP });
  };
  return (
    <div className={styles["add-noteBtn"]} onClick={handleAddNote}>
      Add Note
    </div>
  );
};

export default AddNoteBtn;
