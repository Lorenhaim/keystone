import { importView } from '@koikorn/build-field-types';

export let MyCoolFieldType = {
  views: {
    Field: importView('./views/Field'),
  },
};
