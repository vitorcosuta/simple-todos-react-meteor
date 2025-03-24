import React from "react";
import { Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

export const CommonBoxDescription = ({children}) => {
    return (
        <Typography
            sx={{
                m: '5%',
                fontSize: '1rem',
                fontWeight: 500,
                color: pink[50],
            }}
        >
            {children}
        </Typography>
    );    
}