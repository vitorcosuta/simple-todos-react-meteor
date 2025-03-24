import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { pink } from "@mui/material/colors";

export const CommonAnchorDashboardBox = ({ children, goto }) => {
    
    const navigate = useNavigate();
    
    return (
        <Box
            component="div"
            onClick={() => navigate(goto)}
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
            <Typography
                sx={{
                    m: '10%',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: pink[50],
                }}
            >
                {children}
            </Typography>
        </Box>
    );
}