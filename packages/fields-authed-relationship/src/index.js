import { Relationship } from '@koikorn/fields';
import { AuthedRelationship as implementation } from './Implementation';

export const AuthedRelationship = {
  ...Relationship,
  type: 'AuthedRelationship',
  implementation,
};
