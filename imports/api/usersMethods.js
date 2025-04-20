import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { defaultUserIcon } from './defaultUserIcon';

Meteor.methods({
    async "users.signup"({ name, email, company, birthdate, gender, password }) {

        if (this.userId) {
        throw new Meteor.Error('already-logged-in', 'Você já está logado.');
        }

        check(name, String);
        check(email, String);
        check(company, String);
        check(birthdate, Date);
        check(gender, String);
        check(password, String);
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
        throw new Meteor.Error('invalid-email', 'Endereço de e-mail inválido.');
        }

        // Verifica se já existe um usuário com esse e-mail
        const existingUser = await Accounts.findUserByEmail(email);

        if (existingUser) {
            throw new Meteor.Error('email-exists', 'Este e-mail já está em uso.');
        }
  
        Accounts.createUser({
            email,
            password,
            profile: {
                name,
                gender,
                company,
                birthdate,
                photo: defaultUserIcon
            }
        });
    },
    "users.update"({ name, email, birthdate, gender, company, photo }) {
        
        if (!this.userId) throw new Meteor.Error('not-authorized', 'Sem autorização');

        check(name, String);
        check(email, String);
        check(company, String);
        check(birthdate, Date);
        check(gender, String);

        Meteor.users.updateAsync(this.userId, {
            $set: {
                'profile.name': name,
                'emails.0.address': email,
                'profile.company': company,
                'profile.gender': gender,
                'profile.birthdate': birthdate,
                'profile.photo': photo
            }
        });
    },
});
