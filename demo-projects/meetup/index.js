require('dotenv').config();

const { Keystone } = require('@koikorn/keystone');
const { PasswordAuthStrategy } = require('@koikorn/auth-password');
const { MongooseAdapter } = require('@koikorn/adapter-mongoose');
const { GraphQLApp } = require('@koikorn/app-graphql');
const { AdminUIApp } = require('@koikorn/app-admin-ui');
const { NextApp } = require('@koikorn/app-next');

const {
  Event,
  Talk,
  User,
  Rsvp,
  Organiser,
  Sponsor,
  ForgottenPasswordToken,
  customSchema,
} = require('./schema');

const MEETUP = require('./meetupConfig');
const initialiseData = require('./initialData');

const keystone = new Keystone({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/meetup' }),
  onConnect: initialiseData,
});

keystone.createList('Event', Event);
keystone.createList('Rsvp', Rsvp);
keystone.createList('Talk', Talk);
keystone.createList('User', User);
keystone.createList('Organiser', Organiser);
keystone.createList('Sponsor', Sponsor);
keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);

keystone.extendGraphQLSchema(customSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

const adminApp = new AdminUIApp({
  name: MEETUP.name,
  adminPath: '/admin',
  authStrategy,
  pages: [
    {
      label: 'Meetup',
      children: ['Event', 'Talk', 'Organiser', 'Sponsor'],
    },
    {
      label: 'People',
      children: ['User', 'Rsvp'],
    },
  ],
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), adminApp, new NextApp({ dir: 'site' })],
};
