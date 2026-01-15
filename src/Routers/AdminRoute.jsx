import React from 'react'
import { Navigate, Outlet } from 'react-router';

const AdminRoute = ({children}) => {
    const token = localStorage.getItem('token');
    if(!token || token === 'undefined' || token === 'null'){
        return <Navigate to="/admin"/>
    }

    return children ? children : <Outlet/>
}

export default AdminRoute
