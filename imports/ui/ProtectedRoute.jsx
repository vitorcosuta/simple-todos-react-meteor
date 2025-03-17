import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ currentUser }) => {

    if (currentUser === undefined) {
        return <p>Carregando...</p>;
    }

    if(!currentUser){
        return <Navigate to='/login' replace />
    }

    return <Outlet context={{userData: currentUser}} />
};