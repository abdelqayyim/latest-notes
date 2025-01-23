import React, { useState, useRef } from "react";
import styles from "./Note.module.css";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNotes,setErrorMessage, setSpinnerMessage,setCurrentNote, setValue} from "../../redux/slice";
import { Row } from "react-bootstrap";
import MoreButton from "../MoreButton/MoreButton";
import Confirmation from '../PopUps/Confirmation';
import LanguageServices from "../../LanguageServices";


const Note = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  let globalValue = useSelector((state) => state.languages.value);
  const currentLanguageID = useSelector(state => state.languages.currentLanguageID);
  const { language } = useParams();
  const [activeConfirmation, setActiveConfirmation] = useState(false);
  let note = { _id: props.id, title: props.title, description: props.description, noteDetail: props.detail };
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [tags, setTags] = useState([
    ...new Set(
        props.noteDetail
            .map(item => item.language) // Extract the 'language' property
            .filter(language => language) // Remove undefined or falsy values
    )
]);

  let index = 0;

  const supportedLanguageList = [
    { name: "javascript", displayName: "JavaScript", onAction:()=> {setLanguage("javascript"); updateText("javascript", index, "language");}, color:"#084887"},
    { name: "python", displayName: "Python", onAction:()=> {setLanguage("python"); updateText("python", index, "language");}, color:"#36393B"},
    { name: "typescript", displayName: "TypeScript", onAction:()=> {setLanguage("typescript"); updateText("typescript", index, "language");}, color:"#1E90FF "},
    { name: "csharp", displayName: "C#", onAction:()=> {setLanguage("csharp"); updateText("csharp", index, "language");}, color:"#9932CC"},
    { name: "c++", displayName: "C++", onAction:()=> {setLanguage("c++"); updateText("c++", index, "language");}, color:"#BFFF00"},
    { name: "markdown", displayName: "Markdown", onAction:()=> {setLanguage("markdown"); updateText("markdown", index, "language");}, color:"#8A2BE2"},
    { name: "java", displayName: "Java", onAction:()=> {setLanguage("java"); updateText("java", index, "language");}, color:"#7FDBFF"},
    { name: "ruby", displayName: "Ruby", onAction:()=> {setLanguage("ruby"); updateText("ruby", index, "language");}, color:"#FA8072"},
    { name: "sass", displayName: "SASS" , onAction:()=> {setLanguage("sass"); updateText("sass", index, "language");}, color:"#20B2AA"},
    { name: "r", displayName: "R", onAction:()=> {setLanguage("r"); updateText("r", index, "language");}, color:"#E6E6FA"},
  ];

  const setLanguage = () => {
    
  }
  const updateText = () => {

  }

  const color= { 
    "1": "#FF5733",
    "2": "#FF8C00",
    "3": "#FFD700",
    "4": "#32CD32",
    "5": "#00FFFF",
    "6": "#1E90FF",
    "7": "#9932CC",
    "8": "#FF69B4",
    "9": "#FF00FF",
    "10": "#BFFF00",
    "11": "#20B2AA",
    "12": "#40E0D0",
    "13": "#FFC107",
    "14": "#FF7F50",
    "15": "#E6E6FA",
    "16": "#7FDBFF",
    "17": "#FFDAB9",
    "18": "#FA8072",
    "19": "#8A2BE2"
  }

  const deleteNoteHandler = async () => {
    
    try {
      dispatch(setSpinnerMessage("Deleting Note"));
      const response = await fetch(URL +`${currentLanguageID}/deleteNote`, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(note),
      })
      const data = await response.json();
      let newNotes = [...data.notes];
      let tempVal = [...globalValue];
      tempVal = globalValue.map((languageOBJ) => {
        if (languageOBJ._id === currentLanguageID) {
          return { ...languageOBJ, notes: [...newNotes] };
        }
        return languageOBJ;
      })
      dispatch(setValue(tempVal));
      dispatch(setCurrentNotes(newNotes));
      dispatch(setErrorMessage({ message: "Note sucessfully Deleted", sign: "positive" }));
      dispatch(setSpinnerMessage(""));
      return data;
  }
  catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      dispatch(setSpinnerMessage(""));
      throw error;
  }
  }
  const responseHandler = (response) => {
    setActiveConfirmation(false);
    if (response == 'yes') {
      deleteNoteHandler();
    }
  }
  // const curr = useContext(AppProvider);
  const noteHandler = () => {
    // set the current note in the global context
    let note = { _id: props.id, title: props.title, description: props.description, noteDetail: props.detail };
    dispatch(setCurrentNote(note));
    navigate(`${language}/${props.id}`);
  };
  const handleEditNote = () => {
    dispatch(setCurrentNote({description: props.description, _id: props.id, title: props.title, last_edited: props.last_edited, noteDetail: props.noteDetail}));
    navigate(`/${language}/${props.id}`); 
  }
  const handleDeleteNote = async () => {
    try{
      const response = await LanguageServices.deleteNote({note_id: props.id, language_id: currentLanguageID})
    }catch(error){
      console.log("Error", error);
      throw error;
    }finally{
      setOpenConfirmation(false);
      props.refetch();
    }
  }
  let noteMenuItems = [
    { child: "Edit", onAction: () => handleEditNote() },
    { child: "Delete", onAction:()=>{setWarningMessage("Are you sure you want to delete the note? You cannot undo this action.");
    setOpenConfirmation(true);}},
  ]
  function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Use toLocaleDateString with options for month abbreviation, day, and year
    return date.toLocaleDateString('en-US', {
      month: 'short',  // 'Nov'
      day: '2-digit',  // '03'
      year: 'numeric'  // '2024'
    });
  }
  return (
    <div 
      className={styles["note-contianer"]}
      style={{ position: "relative", padding: "5px", borderRadius: "10px", backgroundColor: "#8C97A6", width: "260px", height: "280px", display: "flex", flexDirection: "column", marginRight: "10px", marginTop: "10px", alignItems: "center" }}
    >
      <Row style={{width:"100%", height:"35px", display:"flex", flexDirection:"row", alignItems:"center"}}>
        {/* <div>
          LGOG
        </div> */}
        <div>Abdel</div>

        <MoreButton menuItems={noteMenuItems} />

      </Row>
      <Row onClick={() => {
        // dispatch(setCurrentNote({description: props.description, _id: props.id, title: props.title, last_edited: props.last_edited, noteDetail: props.noteDetail}));
        // navigate(`/${language}/${props.id}`); 
        handleEditNote();
      }} style={{padding:"5px", borderRadius:"10px", backgroundColor:"white", width:"100%", flexGrow:"1"}}>
        <Row style={{color:"#562CE5", fontSize:"14px", fontWeight:"bold"}}>
        {props?.last_edited? formatDate(props.last_edited): "N/A"}   
        </Row>
        <Row style={{color:"black", fontSize:"20px", marginTop:"5px"}}>
          {props?.title}
        </Row>
        <Row style={{
            color: "black", 
            fontSize: "16px", 
            marginTop: "5px", 
            display: "-webkit-box", 
            overflow: "hidden", 
            WebkitBoxOrient: "vertical", 
            WebkitLineClamp: 6, // Change this number for more or fewer lines
            width: "100%"
        }}>
            {props?.description}  
        </Row >
        {/* Positioned absolutely at the bottom */}
        <div style={{ 
            position: "absolute", 
            bottom: "10px", 
                width: "100%",
          }}>
          {tags.length > 0 && <hr style={{ width: "90%" }} />}
          <Row style={{ display: "flex", justifyContent: "flex-end", width: "100%", paddingRight: "12px" }}>
          {tags.length > 0 && tags.map((tag, index) => {
            let obj = supportedLanguageList.find(option => option.name === tag);
            if (!obj) return null; // Skip if obj is undefined
            return (
              <span
                style={{
                  marginRight: "5px",
                  backgroundColor: obj.color,
                  borderRadius: "20px",
                  paddingRight: "5px",
                  paddingLeft: "5px",
                  fontWeight: "bold",
                  fontSize: ""
                }}
                key={index}
              >
                {obj.displayName}
              </span>
            );
          })
        }
        </Row>


        </div>
      </Row>
      <Confirmation open={openConfirmation} onClose={()=>setOpenConfirmation(false)} text={warningMessage} onConfirm={()=>handleDeleteNote()}/>

    </div>
  );
};
export default Note;
