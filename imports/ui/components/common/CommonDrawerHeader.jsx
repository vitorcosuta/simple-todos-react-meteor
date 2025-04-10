import React, { Fragment, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import { CommonIconButton } from "./CommonIconButton";
import { CommonTemporaryDrawer } from "./CommonTemporaryDrawer";

export const CommonDrawerHeader = ({ currentUser }) => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const name = currentUser?.profile?.name;
    const email = currentUser?.emails[0]?.address;
    const photo = currentUser?.profile?.photo;

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <Fragment>
            <AppBar 
                position="static"
                sx={{ 
                    backgroundColor: '#f2dcd8',
                    boxShadow: 'none',
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            gap: 2,
                        }}
                    >
                        <CommonIconButton onClick={toggleDrawer}>
                            <MenuIcon />
                        </CommonIconButton>
                        <Box component="img" src="/logo.svg" alt="Logo" sx={{ height: 60 }} />
                    </Box>
                </Toolbar>
            </AppBar>

            <CommonTemporaryDrawer 
                userName={name}
                userEmail={email}
                userPhoto={photo}
                open={openDrawer}
                onClose={toggleDrawer}
            />
        </Fragment>
    );
};