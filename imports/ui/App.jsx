import { Meteor } from 'meteor/meteor';
import React, { Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { GlobalStyles } from "@mui/material";
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Signup } from './pages/Signup/Signup';
import { NotFound } from './pages/NotFound/NotFound';
import { TasksRoutes } from './routes/TasksRoutes';

import '@fontsource/source-sans-pro/300.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/700.css';

export const App = () => {

  const user = useTracker(() => Meteor.user());

  return (
    <Fragment>
      <GlobalStyles styles={{ "body, html": { margin: 0, padding: 0 } }} />
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Rotas que precisam de autenticação para serem acessadas */}
        <Route element={<ProtectedRoute currentUser={user} />}>
          <Route path='/tasks/*' element={<TasksRoutes />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Fragment>
    
  );
};
