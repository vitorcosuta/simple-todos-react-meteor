import React from "react";
import IconButton from '@mui/material/IconButton';

export const CommonIconButton = ({ children, onClick }) => {

    return (
        <IconButton 
            sx={{
                width: 40,
                height: 40,
            }}
            onClick={onClick}
        >
            {children}
        </IconButton>
    );
};