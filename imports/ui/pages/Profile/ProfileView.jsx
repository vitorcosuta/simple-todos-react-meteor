import React, { Fragment } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CommonDrawerHeader } from "../../components/common/CommonDrawerHeader";
import { ProfileData } from "../../components/Profile/ProfileData";
import { CommonPillButton } from "../../components/common/CommonPillButton";


export const ProfileView = () => {

    const navigate = useNavigate();
    const currentUser = useOutletContext();

    const handleEditClick = () => navigate('/profile/edit');

    return (
        <Fragment>

            <CommonDrawerHeader currentUser={currentUser} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    pt: '15vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80vw',
                        backgroundColor: '#f2dcd8',
                        boxShadow: 3,
                        gap: 4,
                        p: 4,
                    }}
                >
                    <Typography 
                        variant='h5'
                        sx={{
                            whiteSpace: 'pre-line',
                            fontFamily: 'source-sans-pro-latin-400-normal, sans-serif',
                            color: '#262423',
                        }}
                    >
                        Meus dados
                    </Typography>
                    
                    <ProfileData user={currentUser} />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <CommonPillButton
                            textColor='white'
                            bgColor='#823c48'
                            borderColor='white'
                            hoverColor='#9c454b'
                            onClick={handleEditClick}
                        >
                            Editar
                        </CommonPillButton>
                    </Box>

                </Box>
            </Box>
        </Fragment>
    );
};