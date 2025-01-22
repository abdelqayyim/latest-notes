import React, { useRef, useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import NoteDetail from '../components/NoteDetail/NoteDetail';
import Spinner from '../components/Spinner/Spinner';
import LanguageServices from '../../src/LanguageServices';
import { useParams } from "react-router-dom";
import {
    setValue,
    setSpinnerMessage,
    setErrorMessage,
    setCurrentNote,
    setCurrentLanguage
} from '../redux/slice';

const NotePage = (props) => {
    const { language: paramLanguageName, note: noteId } = useParams();
    
    const dispatch = useDispatch();
    const allData = useSelector((state) => state.languages);
    const [languageName, setLanguageName] = useState(
        allData.value.find((obj) => obj._id === allData.currentLanguageID)?.name
    );
    const [note, setNote] = useState(
        useSelector((state) => state.languages.currentNote)
    );
    // const noteId = props.match.params.note; // Access route params from props
    // const paramLanguageName = props.match.params.language;
    
    const message = useSelector((state) => state.languages.spinnerMessage);
    const active = message !== "";

    useEffect(() => {
        if (!languageName) { // If the value is not already loaded
            const fetchData = async () => {
                dispatch(setSpinnerMessage("Loading Note"));
                try {
                    const data = await LanguageServices.getNoteByLanguageName();

                    console.log(`data`,data);
                    dispatch(setValue(data));

                    const currentLanguageObject = data.find(
                        (obj) => obj.name.toLowerCase() === paramLanguageName.toLowerCase()
                    );

                    if (!currentLanguageObject) {
                        // Throw Error because that language is not found in the database
                    }
                    
                    const currentNote = currentLanguageObject?.notes.find(
                        (note) => note._id === noteId
                    );

                    console.log(`currentNote`,currentNote);

                    dispatch(setCurrentLanguage(currentLanguageObject?._id));
                    dispatch(setCurrentNote(currentNote));
                    setLanguageName(currentLanguageObject?.name);
                    setNote(currentNote);

                    return data;
                } catch (error) {
                    dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
                    throw error;
                } finally {
                    dispatch(setSpinnerMessage(""));
                }
            };

            fetchData();
        }
    }, [languageName, paramLanguageName, noteId, dispatch]);

    if (active) {
        return <Spinner />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div style={{ marginTop: "10px", width: "100%", height: "50px", fontSize: "32px" }}>
                {languageName} - {note?.title}
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
