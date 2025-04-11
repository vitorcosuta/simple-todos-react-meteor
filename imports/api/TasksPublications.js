import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function () {
  
  if (!this.userId) {
    return this.ready();
  }

  return TasksCollection.find();
});

Meteor.publish("pendingTasks", function (hideCompleted) {

  const filter = {
    ... (hideCompleted ? { status: { $ne: 'Concluída' } } : {}),
    $or: [
      { userId: this.userId },      // Tarefas do usuário atual
      { isPersonal: false }          // Tarefas públicas
    ]
  };  

  return TasksCollection.find(filter);
});