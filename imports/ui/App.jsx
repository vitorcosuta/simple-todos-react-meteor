import { Meteor } from 'meteor/meteor';
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { LoginForm } from './pages/Login/LoginForm';
import { PageLayout } from './routes/PageLayout';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { TasksRoutes } from './routes/TasksRoutes';

export const App = () => {

  /** Tracker para o usuário */
  const user = useTracker(() => Meteor.user());

  return (
  
    <Routes>
      <Route element={<PageLayout />}>

        <Route path='/' element={<Home />} />

        {/* Rotas que precisam de autenticação para serem acessadas */}
        <Route element={<ProtectedRoute currentUser={user} />}>
          <Route path='/tasks/*' element={<TasksRoutes />} />
        </Route>

        <Route path='/login' element={<LoginForm currentUser={user} />} />

        <Route path='*' element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};
