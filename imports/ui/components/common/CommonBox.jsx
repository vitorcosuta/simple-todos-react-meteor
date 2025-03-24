import React from "react";
import { Box } from "@mui/material";
import { pink } from "@mui/material/colors";

export const CommonBox = ({ children }) => {

    return (
        <Box
            component="div"
            sx={{
                width: '25vw',
                height: '25vh',
                borderRadius: 1,
                bgcolor: pink[400],
                '&:hover': {
                    bgcolor: pink[800],
                    transform: "scale(1.05)", // Efeito de leve aumento
                }
            }}
        >
            {children}
        </Box>
    );
}