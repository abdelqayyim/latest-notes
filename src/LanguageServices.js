import { languageApi } from "./APIClient";

const LanguageServices = {
  getAllLanguages: async () => {
        try {
          const response = await languageApi.get("/all");
          return response.data;
        } catch (error) {
          console.error("Error fetching all languages", error);
          throw error;
        }
      },
  getAllUserLanguages: async () => {
    try {
      const response = await languageApi.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching all languages", error);
      throw error;
    }
  },
  getLanguageDetails : async (language_id) => {
      try {
          const response = await languageApi.get(`details`, {
              params: { language_id },
          });
          return response.data;
      } catch (error) {
          console.error("Error fetching language details:", error);
          throw error;
      }
  },
  searchLanguageByName: async (name) => {
      try {
          const response = await languageApi.get(`details`, {
              params: { name },
          });
          return response.data;
      } catch (error) {
          console.error("Error searching language by name:", error);
          throw error;
      }
  },
  getNoteByLanguageId: async (language_id, note_id) => {
      try {
          const response = await languageApi.get(`note`, {
              params: { language_id, note_id },
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching note by language_id and note_id:', error);
          throw error;
      }
  },
  getNoteByLanguageName: async (name, note_id) => {
      try {
          const response = await languageApi.get(`note/by-name`, {
              params: { name, note_id },
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
          // Make the POST request
          const response = await languageApi.post(`addNewCourse`, requestBody);

          // Return the newly created course data
          return response.data;
      } catch (error) {
          console.error('Error Creating New Note', error);
          throw error;
      }
  },

  addNewNote: async (body) => {
      try {
          const response = await languageApi.post("notes/newNote", body);
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
          const response = await languageApi.put('notes/updateNote', requestBody);

          // Return the updated note data or a success message
          return response.data;
        } catch (error) {
          console.error("Error updating note:", error);
          throw error; // Re-throw the error for further handling if needed
        }
    },
  deleteNote: async (body) => {
      try {
          const response = await languageApi.delete("deleteNote", {
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
          const response = await languageApi.delete("deleteLanguage", {
              data: { language_id } // Pass the language_id in the request body
          });
          return response;
      } catch (error) {
          console.log("Error Deleting Language", error);
          throw error;
      }
  }
};

export default LanguageServices;
