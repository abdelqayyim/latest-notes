import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateCourseForm from "./CreateCourseForm";
import CreateNoteForm from "./CreateNoteForm";
import Confirmation from "../PopUps/Confirmation";
import {
  setCurrentLanguage,
  setSpinnerMessage, 
  setErrorMessage,
  setPageNotFound,
  setCurrentForm,
  FORMS,
  setLanguageDetails
} from "../../redux/dataSlice";
import LanguageServices from "../../LanguageServices";
const FormsContainer = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.languages.currentForm);
  const selectedLanguageID = useSelector((state) => state.languages.currentLanguageID);

  const refetchNotes = async () => {
    dispatch(setSpinnerMessage("Loading Language"));
    let data;
    try {
      data = await LanguageServices.getLanguageDetails(selectedLanguageID);
      dispatch(setLanguageDetails(data));
      dispatch(setCurrentLanguage(data._id));
      // return data;
    } catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      if (!data) {
        dispatch(setPageNotFound(true));
      }
    } finally {
      dispatch(setSpinnerMessage(""));
      dispatch(setCurrentForm(undefined));
    }
  }

  switch (currentForm) {
    case FORMS.CREATE_COURSE:
      return (
        <CreateCourseForm
          open={true}
          onClose={() => dispatch(setCurrentForm(undefined))}
        />
      );
    case FORMS.CREATE_NOTE:
      return (
        <CreateNoteForm
          open={true}
          onClose={() => dispatch(setCurrentForm(undefined))}
          refetch={refetchNotes}
        />
      );
    default:
      return null;
  }
};

export default FormsContainer;
