require('dotenv').config();

// Lets not hardcode password, even for test data
const password = process.env.INITIAL_DATA_PASSWORD;
const PASSWORD_MIN_LENGTH = 8;

// You can force a re-init in development with the RECREATE_DATABASE
// environment variable.
const shouldRecreateDatabase = () =>
  process.env.NODE_ENV !== 'production' && process.env.RECREATE_DATABASE;

const validatePassword = () => {
  if (!password) {
    throw new Error(`To seed initial data, set the 'INITIAL_DATA_PASSWORD' environment variable`);
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `To seed initial data, the 'INITIAL_DATA_PASSWORD' environment variable must be at least ${PASSWORD_MIN_LENGTH} characters`
    );
  }
};

module.exports = async keystone => {
  // Check the users list to see if there are any; if we find none, assume
  // it's a new database and initialise the demo data set.
  const users = await keystone.lists.User.adapter.findAll();
  if (!users.length || shouldRecreateDatabase()) {
    // Ensure a valid initial password is available to be used
    validatePassword();
    // Drop the connected database to ensure no existing collections remain
    Object.values(keystone.adapters).forEach(async adapter => {
      await adapter.dropDatabase();
    });
    console.log('💾 Creating initial data...');
    await keystone.createItems(initialData);
  }
};

const initialData = {
  User: [
    { name: 'Admin User', email: 'admin@koikorn.com', isAdmin: true, password },
    {
      name: 'Organiser 1',
      email: 'organiser1@koikorn.com',
      twitterHandle: '@organiser1',
      password,
    },
    {
      name: 'Organiser 2',
      email: 'organiser2@koikorn.com',
      twitterHandle: '@organiser2',
      password,
    },
    {
      name: 'Organiser 3',
      email: 'organiser3@koikorn.com',
      twitterHandle: '@organiser3',
      password,
    },
    {
      name: 'Speaker 1',
      email: 'speaker1@koikorn.com',
      twitterHandle: '@speaker1',
      password,
    },
    {
      name: 'Speaker 2',
      email: 'speaker2@koikorn.com',
      twitterHandle: '@speaker2',
      password,
    },
    {
      name: 'Speaker 3',
      email: 'speaker3@koikorn.com',
      twitterHandle: '@speaker3',
      password,
    },
    {
      name: 'Attendee 1',
      email: 'attendee1@koikorn.com',
      twitterHandle: `@attendee1`,
      password,
    },
    {
      name: 'Attendee 2',
      email: 'attendee2@koikorn.com',
      twitterHandle: `@attendee2`,
      password,
    },
    {
      name: 'Attendee 3',
      email: 'attendee3@koikorn.com',
      twitterHandle: `@attendee3`,
      password,
    },
  ],
  Organiser: [
    { user: { where: { name: 'Organiser 1' } }, order: 1, role: 'Organiser' },
    { user: { where: { name: 'Organiser 2' } }, order: 2, role: 'Organiser' },
    { user: { where: { name: 'Organiser 3' } }, order: 3, role: 'Organiser' },
  ],
  Event: [
    {
      name: 'Keystone Launch',
      status: 'active',
      themeColor: '#334455',
      // Default to "1 month from now"
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      durationMins: 150,
      maxRsvps: 120,
      isRsvpAvailable: true,
    },
  ],
  Talk: [{ name: 'Introducing Keystone 5 🎉' }, { name: 'Keystone 5 - Under the hood' }],
  Rsvp: [],
  Sponsor: [{ name: 'Thinkmill', website: 'www.thinkmill.com.au' }],
};
