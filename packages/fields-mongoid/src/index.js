import {
  MongoIdImplementation,
  MongooseMongoIdInterface,
  KnexMongoIdInterface,
} from './Implementation';
import { Text } from '@koikorn/fields';
import { importView } from '@koikorn/build-field-types';

export const MongoId = {
  type: 'MongoId',
  implementation: MongoIdImplementation,
  views: {
    Controller: importView('./views/Controller'),
    Field: Text.views.Field,
    Filter: importView('./views/Filter'),
  },
  adapters: {
    knex: KnexMongoIdInterface,
    mongoose: MongooseMongoIdInterface,
  },

  primaryKeyDefaults: {
    knex: {
      getConfig: () => {
        throw `The Uuid field type doesn't provide a default primary key field configuration for knex. ` +
          `You'll need to supply your own 'id' field for each list or use a different field type for your ` +
          `ids (eg '@koikorn/fields-auto-increment').`;
      },
    },
    mongoose: {
      getConfig: () => ({ type: MongoId }),
    },
  },
};
