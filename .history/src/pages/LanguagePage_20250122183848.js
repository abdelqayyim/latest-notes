import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Note from "../components/Note/Note";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import CreateNoteForm from "../components/Forms/CreateNoteForm";
import Spinner from "../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import {
  setValue,
  setlanguagesList,
  setCurrentLanguage,
  setCurrentNotes,
  togglePopup,
  setSpinnerMessage,
  setErrorMessage,
  setPageNotFound,
  setCurrentForm,
  FORMS
} from "../redux/slice";
import { Row } from "react-bootstrap";
import LanguageServices from "../LanguageServices";
import NotFound from "./NotFound";

const LanguagePage = () => {
  const dispatch = useDispatch();
  // const allData = useSelector(undefined);
  const selectedLanguageID = useSelector(
    (state) => state.languages.currentLanguageID
  );
  const { language } = useParams();
  const message = useSelector((state) => state.languages.spinnerMessage);
  const active = message !== "";

  const [noteEntity, setNoteEntity] = useState(
    useSelector((state) => state.languages.currentNote)
  );
  // const [openForm, setOpenForm] = useState(false);
  const pageNotFound = useSelector((state) => state.languages.pageNotFound);

  const fetchData = async () => {
    dispatch(setSpinnerMessage("Loading Language"));
    // setOpenForm(false);
    let data;
    try {
      if (selectedLanguageID) {
        data = await LanguageServices.getLanguageDetails(selectedLanguageID);
      } else {
        // Search the database using the name in the url parameter
        // Fetch by name
        data = await LanguageServices.searchLanguageByName(language);
      }
      setNoteEntity(data);
      // return data;
    } catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      if (!data) {
        dispatch(setPageNotFound(true));
      }
    } finally {
      dispatch(setSpinnerMessage(""));
    }
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase() // Ensure all letters are lowercase first
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the array back into a single string
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const addNoteHandler = () => {
    dispatch(togglePopup());
  };

  if (active) {
    return <Spinner />;
  }

  const actions = [
    { icon: <AddIcon />, name: "Add", action: () => dispatch(setCurr)},
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];
  return pageNotFound ? (
    <NotFound page={"Page"} redirect={"/"} />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <Outlet />
      <CreateNoteForm
        isOpen={openForm}
        handleClose={() => setOpenForm(false)}
        refetch={fetchData}
      />
      <Row
        style={{
          width: "100%",
          marginTop: "5px",
          height: "60px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {noteEntity?.logo && <div>LOGO</div>}
        {noteEntity?.name && (
          <div style={{ marginRight: "5px", fontSize: "38px" }}>
            {toTitleCase(noteEntity?.name)}
          </div>
        )}
        {/* <span className="material-symbols-outlined">tune</span> */}
      </Row>
      <Row
        style={{
          flexGrow: "1",
          marginTop: "5px",
          padding: "10px 0px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {!noteEntity.notes || noteEntity?.notes.length === 0 ? (
          <>No notes added</>
        ) : (
          [...noteEntity?.notes]
            .reverse()
            .map((note, index) => (
              <Note
                key={index}
                id={note._id}
                title={note.title}
                description={note.description}
                noteDetail={note.noteDetail}
                last_edited={note.last_edited}
                refetch={fetchData}
              />
            ))
        )}
      </Row>
      <div
        style={{
          height: "0px",
          width: "0px",
          display: "flex",
          position: "absolute",
          right: "0",
          bottom: "0",
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
};

export default LanguagePage;
