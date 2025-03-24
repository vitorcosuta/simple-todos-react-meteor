import React from 'react';
import { Outlet } from "react-router-dom";

export const PageLayout = () => {
    
    return (
        <div className="app">
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
};