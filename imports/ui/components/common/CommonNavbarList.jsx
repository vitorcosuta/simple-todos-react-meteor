import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export const CommonNavbarList = ({ navbarItems }) => {

    const navigate = useNavigate();

    return (
        <List>
            {navbarItems.map((item, index) => (
                <ListItem
                    button
                    key={item.id}
                    onClick={() => navigate(item.route)}
                    sx={{ 
                        ml: 2,
                        pt: 2,
                        pb: 2,
                        cursor: 'pointer' }} 
                    disablePadding
                >
                <ListItemIcon
                    sx={{
                        ml: 1,
                        color: '#d7766e',
                    }}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText 
                    primary={<Typography color='#893241' >{item.label}</Typography>}
                    sx={{
                        display: {
                        xs: 'none', // Esconde texto em telas pequenas
                        sm: 'block' // Mostra texto a partir de "sm" (600px+)
                        }
                    }}
                />
                </ListItem>
            ))}
        </List>
    );
};