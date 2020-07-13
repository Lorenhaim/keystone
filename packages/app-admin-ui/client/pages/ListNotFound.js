import React from 'react';

import PageError from '../components/PageError';
import { Button } from '@arch-ui/button';
import { IssueOpenedIcon } from '@arch-ui/icons';

import { useAdminMeta } from '../providers/AdminMeta';

const ListNotFoundPage = ({ listKey }) => {
  const { adminPath } = useAdminMeta();

  return (
    <Button to={adminPath} variant="ghost">
        Página Inicial
      </Button>
  );
};

export default ListNotFoundPage;
