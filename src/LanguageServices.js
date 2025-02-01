import axios from 'axios';
// const URL = "https://fequentquestionsserver.vercel.app/languages/";
const URL = "http://localhost:8000/languages/";


const LanguageServices = {
    getAllLanguages: async () => {
        try {
            const response = await axios.get(URL, {
                headers: { 'Accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.log("Error fetching all langauages", error);
            throw error;
        }
    },
    getLanguageDetails : async (language_id) => {
        try {
            const response = await axios.get(`${URL}details`, {
                params: { language_id },
                headers: { 'Accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching language details:", error);
            throw error;
        }
    },
    searchLanguageByName: async (name) => {
        try {
            const response = await axios.get(`${URL}details`, {
                params: { name },
                headers: { 'Accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("Error searching language by name:", error);
            throw error;
        }
    },
    getNoteByLanguageId: async (language_id, note_id) => {
        try {
            const response = await axios.get(`${URL}note`, {
                params: { language_id, note_id },
                headers: { 'Accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching note by language_id and note_id:', error);
            throw error;
        }
    },
    getNoteByLanguageName: async (name, note_id) => {
        try {
            const response = await axios.get(`${URL}note/by-name`, {
                params: { name, note_id },
                headers: { 'Accept': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching note by language name and note_id:', error);
            throw error;
        }
    },
    addNewCourse: async (requestBody) => {
        try {
            // Ensure the required field is present
            if (!requestBody.name) {
                throw new Error("Missing required field: title");
            }
            // Set the headers for JSON content
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            // Make the POST request
            const response = await axios.post(`${URL}addNewCourse`, requestBody, { headers });

            // Return the newly created course data
            return response.data;
        } catch (error) {
            console.error('Error Creating New Note', error);
            throw error;
        }
    },
    
    addNewNote: async (body) => {
        try {
            const response = await axios.post(URL + "notes/newNote",body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response;
        } catch (error) {
            console.log("Error Creating a new note", error);
            throw error;
        }
    },

    updateNote : async ({ language_id, title, description, note_detail, note_id }) => {
        try {
            // Ensure required fields are included
            if (!language_id || !note_id) {
              throw new Error("Missing required fields: language_id and note_id are required.");
            }
        
            // Create the request body
            const requestBody = {
              language_id,
              title,
              description,
              note_detail,
              note_id
            };
            // Set the headers, e.g., for JSON and authorization (if needed)
            const headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment if you need an auth token
            };
        
            const response = await axios.put(URL+'notes/updateNote', requestBody, { headers });
        
            // Return the updated note data or a success message
            return response.data;
          } catch (error) {
            console.error("Error updating note:", error);
            throw error; // Re-throw the error for further handling if needed
          }
      },
    deleteNote: async (body) => {
        try {
            const response = await axios.delete(URL + "deleteNote", {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            });
            return response;
        } catch (error) {
            console.log("Error Deletenote", error);
            throw error;
        }
    },
    deleteLanguage:  async (language_id)=>{
        try {
            const response = await axios.delete(URL + "deleteLanguage", {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { language_id } // Pass the language_id in the request body
            });
            return response;
        } catch (error) {
            console.log("Error Deleting Language", error);
            throw error;
        }
    }
}

export default LanguageServices;