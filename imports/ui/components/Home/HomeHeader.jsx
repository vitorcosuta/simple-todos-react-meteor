import React from "react";
import { Meteor } from 'meteor/meteor';
import { useNavigate } from "react-router-dom";
import { HomeLoginButton } from "./HomeLoginButton";
import { CommonTextButton } from "../common/CommomTextButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export const HomeHeader = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        
        if(Meteor.userId()){
            navigate('/tasks/dashboard');
        }else{
            navigate('/login');
        }
    };

    const handleSignupClick = () => navigate('/signup');

    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '100vw',
                }}>
                    <Box component="img" src="/logo.svg" alt="Logo" sx={{ height: 80, mr: 4 }} />
                    <Box>
                        <CommonTextButton onClick={handleSignupClick} >Cadastre-se agora</CommonTextButton>
                        <HomeLoginButton onClick={handleLoginClick} >Entrar</HomeLoginButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};