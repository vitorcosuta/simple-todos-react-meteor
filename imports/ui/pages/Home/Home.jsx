import React, { Fragment } from "react"
import { HomeHeader } from "../../components/Home/HomeHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const catchPhraseTitle = 'Precisa de ajuda\npara organizar a vida?'
const catchPhraseSubtitle = 'Cadastre-se agora e \ndeixe que façamos isso por você.'

export const Home = () => {

    return (
        <Fragment>
            <HomeHeader />
            <Box
                sx={{
                    marginTop: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100vw',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        ml: '10vw',
                        mr: 5,
                    }}
                >
                    <Typography 
                        variant="h3"
                        sx={{
                            mr: 4,
                            whiteSpace: 'pre-line',
                            fontFamily: 'source-sans-pro-latin-400-normal, sans-serif',
                            fontWeight: 'bold',
                            color: '#262423',
                            mb: 5,
                        }}
                    >
                        {catchPhraseTitle}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mr: 4,
                            whiteSpace: 'pre-line',
                            fontFamily: 'source-sans-pro-latin-400-normal, sans-serif',
                            color: '#262423',
                        }}
                    >
                        {catchPhraseSubtitle}
                    </Typography>
                </Box>
                <Box 
                    component="img" 
                    src="/home-illustration.png" 
                    alt="Illustration" 
                    sx={{ 
                        width: '50%',
                        height: 'auto',  // Mantém a proporção original
                        maxWidth: '600px', // Evita que fique muito grande em telas grandes
                        display: 'block',
                        borderRadius: '20%',
                        marginRight: '5%',
                    }} 
                />
            </Box>
        </Fragment>
    );
}