import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setValue,
  setSpinnerMessage,
  setErrorMessage,
  setlanguagesList,
  setCurrentLanguage,
} from "../redux/dataSlice";
import { VIEW_TYPE, TABS } from "../redux/uiSlice";
import LanguageFolder from "../components/LanguagesBox/LanguageFolder";
import styles from "./styles/Home.module.css";
import LanguageServices from "../LanguageServices";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Icons from "./icons/Icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Confirmation from "../components/PopUps/Confirmation";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLanguages = useSelector((state) => state.languages.languagesList);
  const [currList, setCurrList] = useState(currentLanguages);
  const [isTableView, setIsTableView] = useState(true);
  const [rows, setRows] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const isDataFetched = useRef(false); // Track if data has been fetched
  const displayType = useSelector((state) => state.ui.view);
  const currentTab = useSelector((state) => state.ui.currentTab);

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(row.id);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const clickHandler = (id, name) => {
    let path = name.replace(/\s/g, "").toLowerCase();
    dispatch(setCurrentLanguage(id));
      navigate(`/${path}`); // Use navigate instead of router.push
  };
  const handleDeleteLanguage = async () => {
    try {
      console.log(`selectedRow`,selectedRow);
      await LanguageServices.deleteLanguage(selectedRow.id);
      await fetchData();
      setOpenDelete(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const columns = [
    // { field: 'id', headerName: 'ID', width: 10, hide: true },
    { field: "title", headerName: 'Title', width: 150,  headerClassName: "custom-header", },
    { field: "owner", headerName: 'Owner', width: 150,  headerClassName: "custom-header", },
    { field: "lastEdited", headerName: 'Last Edited', width: 250,  headerClassName: "custom-header", },
    {
      field: "actions",
      headerName: "More",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => {
            event.stopPropagation(); // Prevents onRowClick from firing
            handleMenuClick(event, params.row);
            }}
            sx={{color:"white"}}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl && selectedId === params.id)}
            onClose={handleMenuClose} // Close menu when clicking outside
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => { clickHandler(params.id, params.row.title)}}>Edit</MenuItem>
            <MenuItem onClick={() => {setOpenDelete(true) }}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ]
  const paginationModel = { page: 0, pageSize: 5 };

  const fetchData = async () => {
    switch (currentTab) {
      case TABS.MY_NOTES:
        dispatch(setSpinnerMessage("Loading Language"));
        try {
          const data = await LanguageServices.getAllUserLanguages();
          setCurrList(data);
          dispatch(setSpinnerMessage(""));
          dispatch(setlanguagesList(data));
          dispatch(setValue(data));
          return data;
        } catch (error) {
          dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
        } finally {
          dispatch(setSpinnerMessage(""));
        }
        break;
      case "All":
        dispatch(setSpinnerMessage("Loading Language"));
        try {
          const data = await LanguageServices.getAllLanguages();
          setCurrList(data);
          dispatch(setSpinnerMessage(""));
          dispatch(setlanguagesList(data));
          dispatch(setValue(data));
          return data;
        } catch (error) {
          dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
        } finally {
          dispatch(setSpinnerMessage(""));
        }
        break
      default:
        break;
    }
    
  };

  useEffect(() => {
    if (!isDataFetched.current) {
        fetchData();
      isDataFetched.current = true;
    } else {
      fetchData();
    }
  }, [currentTab]);

  useEffect(() => {
    setCurrList(currentLanguages);
    setRows(prev => currentLanguages.map(language => ({
      id: language._id ?? "Unknown",
      title: language.name ?? "Unknown",
      owner: `${language.createdBy?.firstName ?? "Unknown"} ${language.createdBy?.lastName ?? "Unknown"}`,
      email: language.createdBy?.email ?? "Unknown",
      lastEdited: language.lastEdited 
        ? new Date(language.lastEdited).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        : "Unknown"
    })));
  }, [currentLanguages]);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className={`${styles["languages-box"]}`}>
        {
          currList.length === 0 ? (
            <div style={{display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
              fontSize: "1.5rem",
              fontWeight: "bold",          
            }}>
              <p>No courses created</p>
            </div>
          ) : displayType === VIEW_TYPE.GRID ? 
          [...currList].reverse().map((language) => {
            return (
              <LanguageFolder
                name={toTitleCase(language.name)}
                id={language._id}
                key={language._id}
                // onClick={() => languageButtonHandler(language._id)}
                onClick={() => console.log("clicked")}
                refetch={() => fetchData()}
              />
            );
          })
        :
          <Paper sx={{ height: 400, width: '100%', bgcolor: "#11121a", color: "white" }}>
            <DataGrid
              rows={rows}
              columns={columns.map(col => ({ ...col, headerClassName: "custom-header" }))} // ✅ Apply globally
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              onRowClick={(params) => clickHandler(params.id, params.row.title)}
              sx={{
                border: 0,
                color: "white",
                "& .MuiDataGrid-root": {
                  backgroundColor: "#11121a",
                  color: "white",
                },
                "& .MuiDataGrid-cell": {
                  color: "white",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#222330", // ✅ Ensures full header row is styled
                  color: "white",
                  fontWeight: "bold",
                },
                "& .custom-header": {
                  backgroundColor: "#222330",
                  color: "white",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: "#11121a",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#1b1c26",
                },
              }}
            />
          </Paper>
        }
      </div>
      {
        openDelete && 
        <Confirmation
        open={openDelete}
          onClose={() => { setOpenDelete(false);  handleMenuClose()}}
        text={`Are you sure you want to delete ${selectedRow?.name}, you cannot undo this action.`}
        onConfirm={() => handleDeleteLanguage()}
        isOverlayVisible={true}
      />
      }
    </div>
  );
}
