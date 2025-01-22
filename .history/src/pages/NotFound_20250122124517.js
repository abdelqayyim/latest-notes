import React from 'react'; 
// import './NotFound.css';
import { useNavigate } from "react-router-dom";
import { setPageNotFound } from '../redux/slice';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
const NotFound = ({ page, redirect }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setPageNotFound(false));
        navigate(redirect);
    }
    return (
        <div style={{height:"100%", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div>{page} Not Found</div>
            <div>Go Back to Home <span
          onClick={handleClick}
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        >
          {page}
        </span> </div>
        </div>
    )
};

export default NotFound;