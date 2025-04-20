import React from "react"
import { Routes, Route } from "react-router-dom"
import { ProfileView } from "../pages/Profile/ProfileView";
import { ProfileEdit } from "../pages/Profile/ProfileEdit";

export const ProfileRoutes = () => {

    return (
        <Routes>
            <Route path='view' element={<ProfileView />} />
            <Route path='edit' element={<ProfileEdit />} />
        </Routes>
    );
};