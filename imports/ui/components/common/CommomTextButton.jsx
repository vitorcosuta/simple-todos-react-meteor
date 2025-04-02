import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CommonTextButton = ({ children, onClick }) => {

    return (
        <Button
            variant='text'
            onClick={onClick}
            sx={{
                backgroundColor: 'white',  // Cor de fundo
                color: '#262423',             // Cor do texto
                borderRadius: "50px",        // Bordas arredondadas
                padding: "10px 30px",        // Ajuste o padding para criar o efeito cilíndrico
                fontFamily: 'source-sans-pro-latin-400-normal, sans-serif',
                textTransform: 'none',
                "&:hover": {
                    backgroundColor: '#f2f2f2',  // Cor do fundo ao passar o mouse
                },
                mr: 1,
                ml: 1,
            }}
        >
            <Typography 
                sx={{
                    fontFamily: 'inherit',
                }}
            >
                { children }
            </Typography>
        </Button>
    );
};