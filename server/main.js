import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
import { defaultUserIcon } from '../imports/api/defaultUserIcon';
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";
import "../imports/api/UsersPublications";
import "../imports/api/usersMethods";

const INITIAL_TASK_STATUS = 'Cadastrada';

const insertTask = (taskName, user) =>
    TasksCollection.insertAsync({
    name: taskName,
    userId: user._id,
    createdAt: new Date(),
    status: INITIAL_TASK_STATUS,
    isPersonal: false,
});

const SEED_EMAIL = 'admin@exemplo.com';
const SEED_PASSWORD = 'senha123';

Meteor.startup(async () => {

    let existingUser = await Accounts.findUserByEmail(SEED_EMAIL)

    if (!existingUser) {
        const userId = Accounts.createUser({
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

        existingUser = Meteor.users.findOneAsync(userId);
    }

    if ((await TasksCollection.find().countAsync()) === 0){
    [
        "First Task",
        "Second Task",
        "Third Task",
        "Fourth Task",
        "Fifth Task",
        "Sixth Task",
        "Seventh Task",
    ].forEach((taskName) => insertTask(taskName, existingUser));
    }
});