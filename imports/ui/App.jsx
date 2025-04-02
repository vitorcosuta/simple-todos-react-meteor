import { Meteor } from 'meteor/meteor';
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { TasksRoutes } from './routes/TasksRoutes';

import '@fontsource/source-sans-pro/300.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/700.css';

export const App = () => {

  /** Tracker para o usuário */
  const user = useTracker(() => Meteor.user());

  return (
  
    <Routes>
      <Route path='/' element={<Home />} />

      {/* Rotas que precisam de autenticação para serem acessadas */}
      <Route element={<ProtectedRoute currentUser={user} />}>
        <Route path='/tasks/*' element={<TasksRoutes />} />
      </Route>

      <Route path='/login' element={<Login />} />

      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};
