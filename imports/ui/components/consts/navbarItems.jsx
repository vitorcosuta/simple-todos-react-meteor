import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <HomeIcon />,
        label: 'Página Inicial',
        route: '/'
    },
    {
        id: 1,
        icon: <DashboardIcon />,
        label: 'Dashboard',
        route: '/tasks/dashboard'
    },
    {
        id: 2,
        icon: <FormatListNumberedIcon />,
        label: 'Lista de tarefas',
        route: '/tasks/view'
    },
    {
        id: 3,
        icon: <AccountBoxIcon />,
        label: 'Meus Dados',
        routes: '/profile/view'
    },
];