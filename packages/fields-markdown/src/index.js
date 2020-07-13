import { Text } from '@koikorn/fields';
import { importView } from '@koikorn/build-field-types';

export let Markdown = {
  type: 'Markdown',
  implementation: Text.implementation,
  views: {
    Controller: Text.views.Controller,
    Field: importView('./views/Field'),
    Filter: Text.views.Filter,
  },
  adapters: Text.adapters,
};
