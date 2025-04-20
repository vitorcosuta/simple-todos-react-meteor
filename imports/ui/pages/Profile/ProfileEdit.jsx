import React from "react";
import Box from "@mui/material/Box";
import { EditProfileForm } from "../../components/Profile/EditProfileForm";
import { useOutletContext } from "react-router-dom";

export const ProfileEdit = () => {

    const currentUser = useOutletContext();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#f2dcd8',
            }}
        >
            <EditProfileForm user={currentUser} />
        </Box>
        
    );
}; 