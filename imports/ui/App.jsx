import { Meteor } from 'meteor/meteor';
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "./ProtectedRoute"
import { LoginForm } from './LoginForm';
import { PageLayout } from './PageLayout';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { TasksRoutes } from './TasksRoutes';

export const App = () => {

  /** Tracker para o usuário */
  const user = useTracker(() => Meteor.user());

  // /** O hook useSubscribe retorna TRUE se a assinatura/inscrição ainda está
  //  *  carregando, e FALSE se a assinatura já foi carregada e os dados estão
  //  *  disponíveis.
  //  */
  // const isLoading = useSubscribe('tasks');

  // /** Contador para tasks pendentes */
  // const pendingTasksCount = useTracker(() => {

  //   if (!user) {
  //     return 0;
  //   }

  //   return TasksCollection.find(hideCompletedFilter).count();
  // });

  return (
  
    <Routes>
      <Route element={<PageLayout />}>
        {/* Rotas que precisam de autenticação para serem acessadas */}
        <Route element={<ProtectedRoute currentUser={user} />}>
          <Route path='/' element={<Home />} />
          <Route path='/tasks/*' element={<TasksRoutes />} />
        </Route>

        <Route path='/login' element={<LoginForm currentUser={user} />} />

        <Route path='*' element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};
