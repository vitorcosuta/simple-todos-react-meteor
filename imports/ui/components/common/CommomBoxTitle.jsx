import React from "react";
import { Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

export const CommonBoxTitle = ({children}) => {
    return (
        <Typography
            sx={{
                ml: '5%',
                fontSize: '5rem',
                fontWeight: 700,
                color: pink[50],
            }}
        >
            {children}
        </Typography>
    );
}