import { createSlice } from '@reduxjs/toolkit'
export const VIEW_TYPE = { // For forms and confirmations
    GRID: "grid",
    TABLE: "table"
};
export const TABS = {
    MY_NOTES: "my notes",
    SHARED: "shared",
}

export const uiSlice = createSlice({
  name: 'ui',
    initialState: {
        view: VIEW_TYPE.GRID,
        searchString: "",
        currentTab: TABS.MY_NOTES
  },
    reducers: {
        setSearchString: (state, action) => {
            state.searchString = action.payload;
        },
        toggleView: (state, action) => {
            if (state.view === VIEW_TYPE.GRID) {
                state.view = VIEW_TYPE.TABLE;
            } else {
                state.view = VIEW_TYPE.GRID;
            }
        },
        setTab: (state, action) => {
            state.currentTab = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { setTab, setSearchString, toggleView } = uiSlice.actions;
export default uiSlice.reducer;