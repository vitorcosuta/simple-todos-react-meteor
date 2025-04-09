import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { CommonLoadingScreen } from '../components/common/CommonLoadingScreen';

export const ProtectedRoute = ({ currentUser }) => {

    if (currentUser === undefined) {
        return(<CommonLoadingScreen />);
    }

    if(!currentUser){
        return <Navigate to='/login' replace />
    }

    return <Outlet context={currentUser} />
};