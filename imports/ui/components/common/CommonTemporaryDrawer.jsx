import React from "react";
import Drawer from "@mui/material/Drawer";
import { CommonDrawerContent } from "./CommonDrawerContent";

export const CommonTemporaryDrawer = ({ userName, userEmail, userPhoto, open, onClose }) => {

    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                width: { xs: '64px', sm: '15vw' },
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: { xs: '64px', sm: '15vw' },
                  boxSizing: 'border-box',
                },
            }}
        >
            <CommonDrawerContent 
                userName={userName}
                userEmail={userEmail}
                userPhoto={userPhoto}
            />
        </Drawer>
    );
};