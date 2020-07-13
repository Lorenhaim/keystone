const { Keystone } = require('@koikorn/keystone');
const { MongooseAdapter } = require('@koikorn/adapter-mongoose');
const { Text } = require('@koikorn/fields');
const { GraphQLApp } = require('@koikorn/app-graphql');
const { AdminUIApp } = require('@koikorn/app-admin-ui');
const { StaticApp } = require('@koikorn/app-static');

const keystone = new Keystone({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/todo' }),
});

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do', isRequired: true },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    // Setup the optional Admin UI
    new AdminUIApp({ name: 'Keystone To-Do List', enableDefaultRoute: true }),
  ],
};
