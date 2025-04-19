import React, { Fragment, useState } from "react";
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { AddTaskForm } from "./AddTaskForm";

export const AddTaskModal = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick'){
            handleClose();
        }
    };

    return (
        <Fragment>
            <IconButton 
                onClick={handleOpen} 
                sx={{
                    bgcolor: '#7b343f',
                    color: 'white',
                    '&:hover':{
                        bgcolor: '#f3998e'
                    },
                }}
            >
                <AddIcon />
            </IconButton>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <AddTaskForm setOpen={setOpen} />
                </Box>
            </Modal>
        </Fragment>
    );
};