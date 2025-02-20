import React, { useEffect, useRef } from "react";
import Text from "./Text";
import IMG from "./IMG";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentNote,
  setSpinnerMessage,
} from "../../redux/dataSlice";
import LanguageServices from "../../LanguageServices";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const NoteDetail = ({ note, setNote }) => {
  const dispatch = useDispatch();
  const refs = useRef([]); // Single ref object to hold all refs
  const selectedLanguageID = useSelector(
    (state) => state.languages.currentLanguageID
  );
  const fileInputRef = useRef(null);

  const handleAddCode = () => {
    // Capture the current content of all refs
    const updatedNoteDetail = note?.noteDetail
    ? note.noteDetail.map((detail, index) => {
        if (detail.type === "text" && refs.current[index]) {
          return { ...detail, content: refs.current[index].current.content };
        }
        return detail;
      })
    : [];

    // Add the new default code block
    updatedNoteDetail.push({
      type: "text",
      content: "Write code here",
      language: "javascript",
    });
    let newNote = { ...note, noteDetail: updatedNoteDetail };
    setNote(newNote);
    dispatch(setCurrentNote(newNote));
  };

  const handleSaveNote = async () => {
    try {
      dispatch(setSpinnerMessage("Saving Note"));
      let newNoteDetail = [];
      refs.current.forEach((ref) => {
        newNoteDetail.push(ref.current);
      });
      console.log(`newNoteDetail`,newNoteDetail);
      const response = await LanguageServices.updateNote({
        language_id: selectedLanguageID,
        title: note.title,
        description: note.description,
        note_detail: newNoteDetail,
        note_id: note._id,
      });
      dispatch(setCurrentNote(response.notes.find((n) => n._id === note._id)));
      setNote(response.notes.find((n) => n._id === note._id));
    } catch (error) {
      console.error("Error saving note:", error);
      alert(`An error occurred: ${error.message || error}`);
    } finally {
      dispatch(setSpinnerMessage(""));
    }
  };

  const moveElement = (index) => {
    if (index <= 0 || !note?.noteDetail || index >= note.noteDetail.length)
      return;

    let tempNoteDetail = [...note.noteDetail];
    let tempRefs = [...refs.current];

    [tempNoteDetail[index - 1], tempNoteDetail[index]] = [
      tempNoteDetail[index],
      tempNoteDetail[index - 1],
    ];
    [tempRefs[index - 1], tempRefs[index]] = [
      tempRefs[index],
      tempRefs[index - 1],
    ];

    setNote((prev) => ({ ...prev, noteDetail: tempNoteDetail }));
    refs.current = tempRefs;
  };

  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const uploadedImage = event.target.result;

      const updatedNoteDetail = note?.noteDetail
        ? [...note.noteDetail, { type: "img", content: uploadedImage }]
        : [{ type: "img", content: uploadedImage }];
      const newNote = { ...note, noteDetail: updatedNoteDetail };

      setNote(newNote);
      dispatch(setCurrentNote(newNote));
    };

    reader.readAsDataURL(file);
  };

  const actions = [
    {
      icon: <TextFieldsOutlinedIcon />,
      name: "Add Code",
      action: () => handleAddCode(),
    },
    {
      icon: <ImageIcon />,
      name: "Add Image",
      action: () => fileInputRef.current.click(),
    },
    {
      icon: <SaveOutlinedIcon />,
      name: "Save Note",
      action: () => handleSaveNote(),
    },
  ];

  useEffect(() => {
    if (note?.noteDetail) {
      note.noteDetail.forEach((n, index) => {
        if (!refs.current[index]) {
          refs.current[index] = React.createRef();
          refs.current[index].current = n;
        }
      });
    }
  }, [note]);

  const removeElement = (index) => {
    let temp = [...note.noteDetail];
    temp.splice(index, 1);
    if (refs.current && refs.current.length > index) {
      refs.current.splice(index, 1);
    }
    setNote((prev) => ({ ...note, noteDetail: temp }));
  };

  return (
    <div
      style={{
        position: "relative",
        overflowY: "scroll",
        paddingBottom: "100px",
        height: "calc(100vh - 20px)",
        width: "100%",
      }}
    >
      {note?.noteDetail?.map((info, index) => {
        if (info.type === "text") {
          return (
            <Text
              ref={refs}
              removeElement={removeElement}
              detail={info}
              key={info._id || `temp-${Math.random()}`}
              index={index}
              moveElement={moveElement}
            />
          );
        }
        if (info.type === "img") {
          return (
            <IMG
              img={info.content}
              key={index}
              index={index}
              removeElement={removeElement}
              moveElement={moveElement}
            />
          );
        }
      })}

      <input
        ref={fileInputRef}
        style={{ visibility: "none", display: "none", position: "absolute" }}
        type="file"
        accept="image/*,image/gif"
        onChange={handleAddImage}
      />

      {/* SpeedDial Container */}
      <div
        style={{
          position: "fixed", // Use fixed positioning to ensure it stays in view
          bottom: "16px", // Adjust as needed
          right: "16px", // Adjust as needed
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
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

export default NoteDetail;