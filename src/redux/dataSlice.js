import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// const URL = "http://localhost:8000/languages/";
const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
export const LOADING_STATE = { IDLE: "idle", LOADING: "laoding", SUCCEEDED: "succeeded", FAILED: "failed" };
export const FORMS = { // For forms and confirmations
    CREATE_COURSE: "create course", // The creates can also be used for edits
    CREATE_NOTE: "create note",
    WARNING: "warning", // To Show warnings/confirmations to the user
}

//NOTE: with normal redux, unable to make async calls so will use middledware reduc-thunk


export const dataSlice = createSlice({
  name: 'data',
    initialState: {
        value: [],
        languagesList: [], // [{_id:, name}]
        currentLanguageID: undefined,
        currentNote: { _id: null, title: null, description: null, noteDetail: null },
        currentNotes: [],
        languageDetails: {notes:[], name:undefined, logo:undefined},
        loading: LOADING_STATE.IDLE,
        errorMessage: "",// for bottom popUp
        errorSign: "", // for bottom popUp
        spinnerMessage: "", 
        inputPopup: false, // this is for add/delete language,
        takingNote: false, //this is for the add, delete button to show when the user is taking notes on a particular note,
        viewingNotes: true,
        pageNotFound: false,
        currentForm: undefined
  },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setCurrentForm: (state, action) => {
            state.currentForm = action.payload;
        },
        setPageNotFound: (state, action) => {
            state.pageNotFound = action.payload;
        },
        setSpinnerMessage: (state, action) => {
          state.spinnerMessage = action.payload;  
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload.message;
            state.errorSign = action.payload.sign;
        },
        setlanguagesList: (state, action) => {
            state.languagesList = action.payload;
        },
        setCurrentLanguage: (state, action) => {
            state.currentLanguageID = action.payload;
        },
        setLanguageDetails: (state, action) => {
            state.languageDetails = action.payload
        },
        setCurrentNotes: (state, action) => {
            state.currentNotes = [...action.payload];
        },
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload;
        },
        updateNoteObject:(state, action)=> {
            console.log(action.payload);
        },
        togglePopup: (state, action) => {
            state.inputPopup = !state.inputPopup
        },
        resetError: (state, action) => { 
            state.errorMessage = "";
            state.errorSign = "";
        },
        takingNote: (state, action)=>{
            state.takingNote = action.payload; 
            state.viewingNotes = false; 
        },
        viewingNotes: (state, action) => {
            state.takingNote = false;  
            state.viewingNotes = action.payload;  
        },
        addText: (state, _) => { //adding text to notes
            // console.log('state', JSON.stringify(state.value));
            if (!state.currentNote) {
                console.log("ABOUT TO RETURN");
                return;
            }
        
            // Add the new text to noteDetail
            console.log(`state`,state);
            state.currentNote.noteDetail = [
                ...state.currentNote.noteDetail,
                { type: "text", language: "javascript", content: "Edit" }
            ];
            
        },
        addImage: (state, action) => {
            state.currentNote.noteDetail = [...state.currentNote.noteDetail, { img: action.payload }];
        },
        updateNote: (state, action) => {
            let noteObject = { 
                title: state.currentNote.title,
                description: state.currentNote.description,
                noteDetail: [...action.payload],
                _id: state.currentNote._id
            }
            state.currentNote = noteObject;
        },
        
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLanguages.pending, (state) => {
            state.loading = LOADING_STATE.LOADING;
      })
        .addCase(fetchLanguages.fulfilled, (state, action) => {
            state.loading = LOADING_STATE.SUCCEEDED;
            state.value = action.payload;
            state.currentNotes = action.payload.map((lang) => {
<<<<<<< HEAD
                if (lang._id == state.currentLanguageID) {
=======
                if (lang._id === state.currentLanguageID) {
>>>>>>> a94cd02 (New Admin changes.)
                    return lang.notes;
                }
            })
            state.loading = LOADING_STATE.IDLE;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
            state.loading = LOADING_STATE.FAILED;
          state.error = "Failed to Fetch Languages";
          state.errorSign = "positive";
          state.loading = LOADING_STATE.IDLE;
      })
        .addCase(addLanguage.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(addLanguage.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.value = [...state.value, {_id:"",name:action.meta.arg, note:[]}];
                state.errorMessage = "Language Successfully Added";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
               
            })
            .addCase(addLanguage.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(deleteLanguage.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(deleteLanguage.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.value = state.value.filter(lang => lang.name !== action.meta.arg);
                state.errorMessage = "Language Successfully Deleted";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(deleteLanguage.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(addNote.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.value = state.value.filter(lang => lang.name !== action.meta.arg);
                state.errorMessage = "Note Successfully Added";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(addNote.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(deleteNote.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                console.log(action);
                state.errorMessage = "Note Successfully Deleted";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(getNotes.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.currentNotes = action.payload;
                console.log(action);
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(saveNote.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(saveNote.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.errorMessage = "Note Successfully Saved";
                state.errorSign = "positive";
                state.currentNote = action.payload;
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(saveNote.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            });
    }
})
const fetchLanguages = createAsyncThunk(
    'languages/fetchLanguages',
    async (_, { dispatch }) => {
        try {
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);
const languageExists = (language, currentLanguages) => {
    for (const lang of currentLanguages) {
        if (lang.name.toLowerCase() === language.trim().toLowerCase()) {
            return true;
        }
    }
    return false;
}
const addLanguage = createAsyncThunk(
    'languages/addLanguage',
    async (language, { getState }) => {
        const state = getState();
        const languages = state.languages.value;
        try {
            if (languageExists(language, languages)) {
                throw new Error("Language Already exists"); 
            }
<<<<<<< HEAD
            const response = await fetch(URL + `${language}`, {
=======
            await fetch(URL + `${language}`, {
>>>>>>> a94cd02 (New Admin changes.)
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)
const addNote = createAsyncThunk( //receives only the note
    'languages/addNote',
    async (note, { getState, dispatch }) => {
        let temp = { ...note, noteDetail: [{text: "Insert Text"}]}
        const state = getState();
        const currentLanguageID = state.languages.currentLanguageID;
        try {
            //check to see if title already exists
<<<<<<< HEAD
            const response = await fetch(URL + `${currentLanguageID}/newNote`, {
=======
            await fetch(URL + `${currentLanguageID}/newNote`, {
>>>>>>> a94cd02 (New Admin changes.)
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(temp),
            })
            dispatch(fetchLanguages());
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)
const deleteNote = createAsyncThunk( //receives only the note
    'languages/deleteNote',
    async (note, { getState, dispatch }) => {
        const currentLanguageID = getState().languages.currentLanguageID;
        try {
            //check to see if title already exists
<<<<<<< HEAD
            const response = await fetch(URL +`${currentLanguageID}/deleteNote`, {
=======
            await fetch(URL +`${currentLanguageID}/deleteNote`, {
>>>>>>> a94cd02 (New Admin changes.)
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note),
            })
            dispatch(fetchLanguages());
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)
const getNotes = createAsyncThunk( //receives only the note
    'languages/getNotes',
    async (_, { getState }) => {
        console.log("CALLED---");
        const currentLanguageID = getState().languages.currentLanguageID;
        try {
            //check to see if title already exists
            const response = await fetch(URL +`${currentLanguageID}/getNotes`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)
const saveNote = createAsyncThunk( //receives only the note
    'languages/updateNote',
    async (arr, { getState, dispatch }) => {
        const currentLanguageID = getState().languages.currentLanguageID;
        const temp = getState().languages.currentNote;
        let n = {
            ...temp,
            title: arr[0],
            description: arr[1]
        }
        try {
            //check to see if title already exists
<<<<<<< HEAD
            const response = await fetch(URL +`${currentLanguageID}/updateNote`, {
=======
            await fetch(URL +`${currentLanguageID}/updateNote`, {
>>>>>>> a94cd02 (New Admin changes.)
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(n)
            })
            return n;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)

const deleteLanguage = createAsyncThunk(
    'languages/deleteLanguage',
    async (language, { getState }) => {
        console.log(language);
        const state = getState();
        const languages = state.languages.value;
        const l = state.languages.value.filter(lang => {
<<<<<<< HEAD
            return lang.name.toLowerCase() == language
=======
            return lang.name.toLowerCase() === language
>>>>>>> a94cd02 (New Admin changes.)
        });
        try {
            if (!languageExists(language, languages)) {
                throw new Error("Language Does not Exists"); 
            }
            const response = await fetch(URL + `${l[0]._id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)


// Action creators are generated for each case reducer function
export { fetchLanguages, addLanguage,deleteLanguage, addNote,deleteNote, getNotes, saveNote };
export const { setLanguageDetails, setCurrentForm, setPageNotFound, updateNoteObject, setCurrentNotes, setlanguagesList, setErrorMessage, setSpinnerMessage, setValue, setCurrentLanguage, togglePopup, resetError, setCurrentNote,takingNote, addText,viewingNotes,addImage,updateNote, getCurrentNote } = dataSlice.actions;
export default dataSlice.reducer;