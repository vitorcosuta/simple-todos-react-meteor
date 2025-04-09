import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const CommonLoadingScreen = () => {

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white', // fundo branco
            }}
        >
            <CircularProgress 
                size={120} // tamanho grande
                thickness={5}
                sx={{ color: '#56021F' }} // azul padrão, pode trocar
            />
        </Box>
    );
};