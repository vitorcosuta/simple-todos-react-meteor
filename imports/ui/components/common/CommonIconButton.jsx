import React from "react";
import Button from "@mui/material/Button";

export const CommonIconButton = ({ children, icon, onClick }) => {

    return (
        <Button
            variant="contained"
            color="error"
            startIcon={icon}
            onClick={onClick}
            sx={{
                mt: 2,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                backgroundColor: '#d16d67'
            }}
        >
            {children}
        </Button>
    );
};