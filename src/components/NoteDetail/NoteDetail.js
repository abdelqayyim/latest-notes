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
  // const [note, setNote] = useState(useSelector(state => state.languages.currentNote));
  const refs = useRef([]); // Single ref object to hold all refs
  const selectedLanguageID = useSelector(
    (state) => state.languages.currentLanguageID
  );
  const fileInputRef = useRef(null);

  const handleAddCode = () => {
    // Make the changes in the currentNote, and use this same currentNote for the update
    const updatedNoteDetail = note?.noteDetail
      ? [
          ...note.noteDetail,
          { type: "text", content: "Write code here", language: "javascript" },
        ]
      : [{ type: "text", content: "", language: "javascript" }];
    let newNote = { ...note, noteDetail: updatedNoteDetail };
    setNote(newNote);
    dispatch(setCurrentNote(newNote));
  };
  const handleSaveNote = async () => {
    try {
      dispatch(setSpinnerMessage("Saving Note"));
      let newNoteDetail = [];
      refs.current.forEach((ref) => {
        // send the updated noteDetail in the request
        newNoteDetail.push(ref.current);
      });
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
      return; // Prevent invalid moves

    let tempNoteDetail = [...note.noteDetail];
    let tempRefs = [...refs.current];

    // Swap the current element with the previous one
    [tempNoteDetail[index - 1], tempNoteDetail[index]] = [
      tempNoteDetail[index],
      tempNoteDetail[index - 1],
    ];
    [tempRefs[index - 1], tempRefs[index]] = [
      tempRefs[index],
      tempRefs[index - 1],
    ];

    // Update state and refs
    setNote((prev) => ({ ...prev, noteDetail: tempNoteDetail }));
    refs.current = tempRefs; // Update refs array
  };

  const handleAddImage = async (event) => {
    const file = event.target.files[0]; // Access the first (and only) file
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const uploadedImage = event.target.result; // Get the image data (base64 string)

      const updatedNoteDetail = note?.noteDetail
        ? [...note.noteDetail, { type: "img", content: uploadedImage }]
        : [{ type: "img", content: uploadedImage }];
      const newNote = { ...note, noteDetail: updatedNoteDetail };

      setNote(newNote); // Update the local state
      dispatch(setCurrentNote(newNote)); // Dispatch to update the global state
    };

    reader.readAsDataURL(file); // Start reading the file
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
      // this will only go through for new elements added
      // Initialize refs for each item in noteDetail
      note.noteDetail.forEach((n, index) => {
        if (!refs.current[index]) {
          refs.current[index] = React.createRef(); // Dynamically create refs
          refs.current[index].current = n;
        }
      });
    }
  }, [note]);

  const removeElement = (index) => {
    // Switch the temporary with the one saved in the redux slice
    // Then change the state so that the ui update
    let temp = [...note.noteDetail];
    temp.splice(index, 1);
    // changeNoteDetail(temp);
    // Remove the element from the ref.current array
    if (refs.current && refs.current.length > index) {
      refs.current.splice(index, 1); // Modify the ref directly
    }
    setNote((prev) => ({ ...note, noteDetail: temp }));
  };

  return (
    <div
      style={{
        marginTop: "10px",
        flexGrow: "1",
        overflowY: "scroll",
        paddingBottom: "20px",
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
      <div
        style={{
          height: "0px", // Just make it real small and only the speed dial will show
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

export default NoteDetail;
