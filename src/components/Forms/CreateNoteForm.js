import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Row, Col, Container } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { clearAllListeners } from "@reduxjs/toolkit";
import LanguageServices from "../../LanguageServices";
import { useSelector, useDispatch } from "react-redux";
import Overlay from "../Overlay/Overlay";
import CustomDropdown from "../DropDown/CustomDropdown";
import { useLocation } from "react-router-dom";

// Define the style for the Box component if it's missing
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateNoteForm = ({ open, onClose, refetch }) => {
  const currentLanguageID = useSelector(
    (state) => state.languages.currentLanguageID
  );
  const location = useLocation();
  const currentPage = location.pathname;
  console.log("currentPage", currentPage);
  console.log("currentPage === /", currentPage === "/");
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [formIsInvalid, setFormIsInvalid] = useState(true);
  const [destinationRepository, setDestinationRepository] = useState(undefined);
  const handleCreateNote = async () => {
    const response = await LanguageServices.addNewNote({
      language_id: currentLanguageID,
      title: newNote.title,
      description: newNote.description,
      note_detail: [],
    });
    console.log("response", response);
    if (response.status >= 200) {
      refetch();
    }
  };

  useEffect(() => {
    if (newNote.title.length > 0) {
      setFormIsInvalid(false);
    } else {
      setFormIsInvalid(true);
    }
  }, [newNote]);

  useEffect(() => {
    console.log(`destinationRepository`,destinationRepository);
  }, [destinationRepository]);

  const dropDownOptions = [
    { displayName: "One", registerName: "One", onSelect: () => { setDestinationRepository("One") } },
    { displayName: "Two", registerName: "Two", onSelect: () => { setDestinationRepository("Two") } },
    { displayName: "Three", registerName: "Three", onSelect: () => {setDestinationRepository("Three") } },
  ]

  return (
    <Overlay isVisible={open} isOverlayVisible={true} onClose={onClose}>
      <Box sx={style} component={"form"}>
        <Container>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
            Create A New Note
          </Typography>

          <TextField
            fullWidth
            required
            placeholder="Enter Title"
            margin="normal"
            id="note-form-title"
            label="Title"
            value={newNote.title}
            onChange={(event) =>
              setNewNote((prev) => ({ ...prev, title: event.target.value }))
            }
          />
          <TextField
            fullWidth
            multiline
            margin="normal"
            id="note-form-description"
            label="Description"
            value={newNote.description}
            onChange={(event) =>
              setNewNote((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
          />

          <CustomDropdown options={dropDownOptions} />

        </Container>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="error"
            style={{ marginRight: "10px" }}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            disabled={formIsInvalid}
            variant="contained"
            color="success"
            onClick={handleCreateNote}
          >
            Create
          </Button>
        </div>
      </Box>
    </Overlay>
  );
};

export default CreateNoteForm;
