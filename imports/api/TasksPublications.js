import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function () {
  
  if (!this.userId) {
    return this.ready();
  }

  return TasksCollection.find();
});

Meteor.publish("pendingTasks", function (hideCompleted) {

  const filter = hideCompleted ? { status: { $ne: 'Concluída' } } : {};

  return TasksCollection.find(filter);
});