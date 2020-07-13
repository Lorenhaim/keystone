import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button } from '@arch-ui/button';
import Confirm from '@arch-ui/confirm';

export default function DeleteItemModal({ isOpen, item, list, onClose, onDelete }) {
  const [deleteItem, { loading }] = useMutation(list.deleteMutation);
  return (
    <Confirm
      isOpen={isOpen}
      onKeyDown={e => {
        if (e.key === 'Escape' && !loading) {
          onClose();
        }
      }}
    >
      <p style={{ marginTop: 0 }}>
        Tem certeza que deseja Deletar? <strong>{item._label_}</strong>?
      </p>
      <footer>
        <Button
          appearance="danger"
          variant="ghost"
          onClick={() => {
            if (loading) return;
            onDelete(deleteItem({ variables: { id: item.id } }));
          }}
        >
          Deletar
        </Button>
        <Button
          variant="subtle"
          onClick={() => {
            if (loading) return;
            onClose();
          }}
        >
          Cancelar
        </Button>
      </footer>
    </Confirm>
  );
}
