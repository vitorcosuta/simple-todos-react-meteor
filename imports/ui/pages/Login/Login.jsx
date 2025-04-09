import React, { Fragment } from "react";
import { CommonLogoHeader } from "../../components/common/CommonLogoHeader";
import { LoginForm } from "../../components/Login/LoginForm";
import Box from "@mui/material/Box";

export const Login = () => {

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
                <LoginForm />
            </Box>
        </Fragment>
    );
}