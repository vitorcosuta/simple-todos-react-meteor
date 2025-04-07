import React, { Fragment } from "react";
import { CommonLogoHeader } from "../../components/common/CommonLogoHeader";
import { SignupForm } from "../../components/Signup/SignupForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Signup = () => {

    return (
        <Fragment>
            <CommonLogoHeader />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: "calc(100vh - 120px)",
                backgroundColor: '#f2dcd8',
            }}>
                <Typography 
                    variant="h4"
                    sx={{
                        whiteSpace: 'pre-line',
                        fontFamily: 'source-sans-pro-latin-400-normal, sans-serif',
                        color: '#262423',
                        mb: 4,
                    }}
                >
                Sua organização elevada ao máximo
                </Typography>
                <SignupForm />
            </Box>
        </Fragment>
    );
};