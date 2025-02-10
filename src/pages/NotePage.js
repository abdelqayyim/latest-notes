import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoteDetail from "../components/NoteDetail/NoteDetail";
import LanguageServices from "../../src/LanguageServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  setSpinnerMessage,
  setErrorMessage,
  setCurrentNote,
  setCurrentLanguage,
} from "../redux/dataSlice";

const NotePage = (props) => {
  const navigate = useNavigate();
  const { language: paramLanguageName, note: noteId } = useParams();

  const dispatch = useDispatch();
  const allData = useSelector((state) => state.languages);
  const [languageName, setLanguageName] = useState(
    allData.value.find((obj) => obj._id === allData.currentLanguageID)?.name
  );
  const [note, setNote] = useState(
    useSelector((state) => state.languages.currentNote)
  );

  useEffect(() => {
    if (!languageName) {
      // If the value is not already loaded
      const fetchData = async () => {
        dispatch(setSpinnerMessage("Loading Details"));
        try {
          const data = await LanguageServices.getNoteByLanguageName(
            paramLanguageName,
            noteId
          );

          dispatch(setCurrentLanguage(data?.languageId));
          dispatch(setCurrentNote(data));
          setLanguageName(data?.languageName);
          setNote(data);

          return data;
        } catch (error) {
          dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
          navigate("/not-found");
        } finally {
          dispatch(setSpinnerMessage(""));
        }
      };
      fetchData();
    }
  }, [languageName, paramLanguageName, noteId, dispatch]);
  function toTitleCase(str) {
    if (!str) return str; // Return the input if it's empty or null
  
    // List of small words to keep lowercase (optional)
    const smallWords = ["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "of", "in", "with"];
  
    return str
      .toLowerCase() // Convert the entire string to lowercase
      .split(" ") // Split the string into words
      .map((word, index) => {
        // Capitalize the first letter of each word, except for small words (unless it's the first word)
        if (index === 0 || !smallWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word;
        }
      })
      .join(" "); // Join the words back into a single string
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          height: "50px",
          fontSize: "32px",
        }}
      >
        {toTitleCase(languageName)} - {toTitleCase(note?.title)}
      </div>
      <NoteDetail
        note={note}
        setNote={setNote}
        changeNoteDetail={(newValue) =>
          setNote((prev) => ({ ...note, noteDetail: newValue }))
        }
      />
    </div>
  );
};

export default NotePage;
