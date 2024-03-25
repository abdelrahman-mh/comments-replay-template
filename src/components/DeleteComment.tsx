import React from 'react';
import Popup from 'reactjs-popup';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<Props> = ({ isOpen, closeModal, onConfirm }) => {
  return (
    <Popup className='confirm-delete' open={isOpen} onClose={closeModal} modal lockScroll closeOnDocumentClick closeOnEscape repositionOnResize>
      <h3 className='confirm-delete__title'>Delete comment</h3>
      <p className='confirm-delete__text'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
      <div className='confirm-delete__actions'>
        <button className='cancel-btn' onClick={closeModal}>
          NO, CANCEL
        </button>
        <button className='confirm-btn' onClick={onConfirm}>
          YES, DELETE
        </button>
      </div>
    </Popup>
  );
};

export default ConfirmDelete;
