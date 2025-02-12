import React, {useEffect} from 'react'
import {useSelector} from "react-redux"
import { Navigate, useLocation } from "react-router-dom";
import { setState } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem("reactNotes-accessToken");
        const storedUser = JSON.parse(localStorage.getItem("reactNotes-user"));
    
        if (accessToken && storedUser) {
            dispatch(setState({
                isAuthenticated: true,
                firstName: storedUser.firstName,
                lastName: storedUser.lastName,
                username: storedUser.username,
                profilePicture: storedUser.profilePicture,
                email: storedUser.email,
                isAdmin: storedUser.isAdmin,
                userId: storedUser.userId,
                accessToken: localStorage.getItem("reactNotes-accessToken"),
                refreshToken: localStorage.getItem("reactNotes-refreshToken")
            }))
        }
    }, [dispatch]);

    const user = useSelector((state) => state.authentication);
    let location = useLocation();

    // Redirect authenticated users away from /login
    if (user.isAuthenticated && location.pathname === "/login") {
        return <Navigate to="/" replace />;
    }

    // Redirect unauthenticated users to /login
    if (!user.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children

};

export default PrivateRoute;