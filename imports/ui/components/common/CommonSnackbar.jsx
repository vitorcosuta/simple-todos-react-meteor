import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const CommonSnackbar = ({ type, message, open, onClose }) => {

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert
            onClose={onClose}
            severity={type}
            variant="filled"
            sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};