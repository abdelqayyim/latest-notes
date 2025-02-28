import React, {useState} from "react";
// import './CreateCourseForm.css';
import Overlay from "../Overlay/Overlay";
import TextField from "@mui/material/TextField";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LanguageServices from "../../LanguageServices";
import { useDispatch } from "react-redux";
import { setValue,
  setSpinnerMessage,
  setErrorMessage,
  setlanguagesList,
  } from "../../redux/dataSlice";
import { setTab, TABS } from "../../redux/uiSlice";
import { useNavigate } from "react-router-dom";
import { customEncodeURI } from "../../utilFunctions";

const CreateCourseForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

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

  const fetchData = async () => {
    dispatch(setSpinnerMessage("Loading Language"));
    try {
      dispatch(setTab(TABS.MY_NOTES));
      const data = await LanguageServices.getAllUserLanguages();
      dispatch(setSpinnerMessage(""));
      dispatch(setlanguagesList(data));
      dispatch(setValue(data));
      return data;
    } catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      throw error;
    } finally {
      dispatch(setSpinnerMessage(""));
    }
  };

  const handleCreateCourse = async () => {
    onClose();
    dispatch(setSpinnerMessage("Adding Language"));
    try {
      await LanguageServices.addNewCourse({ name: title });
      let newCourse = await fetchData();
      navigate(`/`);
    } catch (error) {
      throw new Error("Unable to create new Course");
    } finally {
      dispatch(setSpinnerMessage(""));
    }
  }
  return (
    <Overlay isVisible={open} isOverlayVisible={true} onClose={onClose}>
      <Box
        sx={style}
        component={"form"}>
        <Container>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
            Create A Course
          </Typography>

          <TextField
            fullWidth
            required
            placeholder="Enter Title"
            margin="normal"
            id="note-form-title"
            label="Title"
            value={title}
            onChange={(event) => {
              setTitle((prev) => (event.target.value));
            }}
          />
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
            disabled={title.trim().length <= 0 }
            variant="contained"
            color="success"
            onClick={handleCreateCourse}
          >
            Create
          </Button>
        </div>
      </Box>
    </Overlay>
  );
};

export default CreateCourseForm;
