import {
  DateTimeUtcImplementation,
  MongoDateTimeUtcInterface,
  KnexDateTimeUtcInterface,
} from './Implementation';
import { DateTime } from '@koikorn/fields';

export const DateTimeUtc = {
  type: 'DateTimeUtc',
  implementation: DateTimeUtcImplementation,
  views: {
    Controller: DateTime.views.Controller,
    Field: DateTime.views.Field,
    Filter: DateTime.views.Filter,
    Cell: DateTime.views.Cell,
  },
  adapters: {
    mongoose: MongoDateTimeUtcInterface,
    knex: KnexDateTimeUtcInterface,
  },
};
