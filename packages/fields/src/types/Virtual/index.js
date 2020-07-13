import { Virtual, MongoVirtualInterface, KnexVirtualInterface } from './Implementation';
import { importView } from '@koikorn/build-field-types';

export default {
  type: 'Virtual',
  implementation: Virtual,
  views: {
    Controller: importView('./views/Controller'),
    Cell: importView('./views/Cell'),
    Field: importView('./views/Field'),
    Filter: importView('./views/Filter'),
  },
  adapters: {
    mongoose: MongoVirtualInterface,
    knex: KnexVirtualInterface,
  },
};
