import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
import { defaultUserIcon } from '../imports/api/defaultUserIcon';
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";
import "../imports/api/usersMethods";

const INITIAL_TASK_STATUS = 'Cadastrada';

const insertTask = (taskText, user) =>
  TasksCollection.insertAsync({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
    status: INITIAL_TASK_STATUS,
  });

const SEED_EMAIL = 'admin@exemplo.com';
const SEED_PASSWORD = 'senha123';

Meteor.startup(async () => {

  const existingUser = await Accounts.findUserByEmail(SEED_EMAIL)

  if (!existingUser) {
    Accounts.createUser({
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
      profile: {
        name: 'Administrador',
        company: 'Minha Empresa',
        gender: 'Outro',
        birthdate: new Date('1990-01-01'),
        photo: defaultUserIcon
      }
    });
  }

  const user = await Accounts.findUserByEmail(SEED_EMAIL);

  if ((await TasksCollection.find().countAsync()) === 0){
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});