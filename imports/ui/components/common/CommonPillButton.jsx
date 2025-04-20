import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CommonPillButton = ({ 
    children,
    textColor,
    bgColor,
    borderColor,
    hoverColor,
    onClick 
}) => {

    return (
        <Button
            variant='outlined'
            onClick={onClick}
            sx={{
                backgroundColor: bgColor,  // Cor de fundo
                color: textColor,              // Cor do texto
                borderColor: borderColor,
                borderRadius: "50px",        // Bordas arredondadas (aqui é o ponto chave!)
                borderWidth: '2px',
                padding: "10px 40px",        // Ajuste o padding para criar o efeito cilíndrico
                fontFamily: 'source-sans-pro-latin-700-normal, sans-serif',
                textTransform: 'none',
                "&:hover": {
                    backgroundColor: hoverColor,  // Cor do fundo ao passar o mouse
                },
                ml: 1,
                mr: 1,
                mb: 2,
                mt: 2,
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