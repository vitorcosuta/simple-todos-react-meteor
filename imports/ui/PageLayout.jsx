import React from 'react';
import { Outlet } from "react-router-dom";

export const PageLayout = () => {
    
    return (
        <div className="app">
            <header>
                <div className="app-bar">
                    <div className="app-header">
                        <h1>
                        📝️ To Do List
                        </h1>
                    </div>
                </div>
            </header>
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
};