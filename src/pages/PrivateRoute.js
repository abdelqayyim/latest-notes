import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const PrivateRoute = ({children}) => {
    const user = useSelector((state) => state.authentication);
    let location = useLocation();

    if(!user.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default PrivateRoute;