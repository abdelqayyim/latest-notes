import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
import {
  setValue,
  setSpinnerMessage,
  setErrorMessage,
  setlanguagesList,
  setCurrentLanguage,
  LOADING_STATE,
} from "../redux/dataSlice";
import InputPopUp from "../components/PopUps/InputPopUp";
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
  let state = useSelector((state) => state.languages);
  const loadingState = state.loading;
  const isOverlayActive = useSelector((state) => state.languages.inputPopup);
  const [mode, setMode] = useState(""); //this is for whether a language is being added or deleted
  let popupActive = state.inputPopup;
  const currentLanguages = useSelector(
    (state) => state.languages.languagesList
  );
  const [currList, setCurrList] = useState(currentLanguages);
  const [isTableView, setIsTableView] = useState(true);
  const [rows, setRows] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(undefined);

  const [anchorEl, setAnchorEl] = useState(null);
const [selectedId, setSelectedId] = useState(null);

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
      const response = await LanguageServices.deleteLanguage(selectedRow.id);
      await fetchData();
      setOpenDelete(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  //   },
  // ];
  const columns = [
    // { field: 'id', headerName: 'ID', width: 10, hide: true },
    { field: "title", headerName: 'Title', width: 150 },
    { field: "owner", headerName: 'Owner', width: 150 },
    { field: "lastEdited", headerName: 'Last Edited', width: 250 },
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => {
          event.stopPropagation(); // Prevents onRowClick from firing
          handleMenuClick(event, params.row);
        }}>
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

  // This is the home page
  // const message = useSelector((state) => state.languages.spinnerMessage);
  // let active = message !== "";

  const fetchData = async () => {
    dispatch(setSpinnerMessage("Loading Language"));
    try {
      const data = await LanguageServices.getAllLanguages();
      setCurrList(data);
      dispatch(setSpinnerMessage(""));
      // let formattedData = data.map((obj) => ({ _id: obj._id, name: obj.name }));
      dispatch(setlanguagesList(data));
      dispatch(setValue(data));
      return data;
    } catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      // throw error;
    } finally {
      dispatch(setSpinnerMessage(""));
    }
  };


  useEffect(() => {
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setCurrList(currentLanguages);
    setRows(prev => currentLanguages.map(language => ({
      id: language._id,
      title: language.name,
      owner: `${language.createdBy.firstName} ${language.createdBy.lastName}`,
      email: language.createdBy.email,
      lastEdited: new Date(language.lastEdited).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    })));
  }, [currentLanguages]);

  // if (active) {
  //   return <Spinner />;
  // }

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const languageButtonHandler = (id) => {
    dispatch(setCurrentLanguage(id));
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
      {
        <div style={{display:"flex", flexDirection: "row", alignItems:"center", justifyContent: "center", gap:"10px"}}>
          <div className={styles["typewriter"]}>
            <h1>My Notes</h1>
          </div>
          <div onClick={()=>setIsTableView(prev=>!prev)}>
            {isTableView?  Icons.GRID_VIEW: Icons.TABLE_VIEW}
          </div>
        </div>
      }

      <div className={`${styles["languages-box"]}`}>
        {
          currList.length === 0 ? (
            <div style={{display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              fontSize: "1.5rem",
              fontWeight: "bold",}}>
              <p>No courses created</p>
            </div>
          ) : isTableView ? 
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
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
                // checkboxSelection
                onRowClick={(params) => clickHandler(params.id, params.row.title)}
            sx={{ border: 0 }}
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
