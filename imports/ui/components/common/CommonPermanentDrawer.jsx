import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { CommonDrawerContent } from './CommonDrawerContent';

export const CommonPermanentDrawer = ({ userName, userEmail, userPhoto }) => {

    return (
        <Drawer
            variant='permanent'
            anchor='left'
            sx={{
                width: { xs: '64px', sm: '15vw' },
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: { xs: '64px', sm: '15vw' },
                  boxSizing: 'border-box',
                },
            }}
        >
            <CommonDrawerContent 
                userName={userName}
                userEmail={userEmail}
                userPhoto={userPhoto}
            />
        </Drawer>
    );
};