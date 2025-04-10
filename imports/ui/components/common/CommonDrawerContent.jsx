import React, { Fragment, useState } from "react";
import { Meteor } from 'meteor/meteor';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { mainNavbarItems } from '../consts/navbarItems';
import { CommonSnackbar } from './CommonSnackbar';
import { CommonNavbarList } from './CommonNavbarList';
import { useNavigate } from "react-router-dom";

export const CommonDrawerContent = ({ userName, userEmail, userPhoto }) => {

    const navigate = useNavigate();

    const returnToHomepage = () => navigate('/', { replace: true });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClick = () => {
        setSnackbarOpen(true);

        const logout = () => {
            Meteor.logout();
            navigate('/');
        };

        setTimeout(logout, 500)
    }

    const handleClose = (event, reason) => {

        if (reason === 'clickaway'){
            return;
        }

        setSnackbarOpen(false);
    }

    return (
        <Fragment>
            <Toolbar>
                <Box 
                    component="img" 
                    src="/logo.svg" 
                    alt="Logo" 
                    sx={{ height: 120, cursor: 'pointer' }}
                    onClick={returnToHomepage}
                />
            </Toolbar>

            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: 4,
                    height: '50vh',
                }}
            >
                <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 2,
                }}
                >
                    <Avatar
                    src={userPhoto}
                    alt={userName}
                    sx={{ width: 64, height: 64, mb: 1 }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userEmail}
                    </Typography>
                </Box>

                <Box>
                    <Divider>
                        <Chip label="Navegação" size="small" />
                    </Divider>
                    
                    <CommonNavbarList navbarItems={mainNavbarItems} />
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: 4,
                    height: '50vh',
                }}
            >
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleClick}
                    sx={{
                        mt: 2,
                        py: 2,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        backgroundColor: '#d16d67'
                    }}
                >
                    Sair
                </Button>

                <CommonSnackbar
                    type='info'
                    message='Logout efetuado com sucesso.'
                    open={snackbarOpen}
                    onClose={handleClose}
                />
            </Box>
        </Fragment>
    );
};