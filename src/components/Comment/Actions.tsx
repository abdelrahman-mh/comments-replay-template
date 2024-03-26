import React, { useState } from 'react';
import ConfirmDelete from './DeleteComment';
import { useAppDispatch } from '../../hooks';
import { removeComment, removeReplay } from '../../feature/commentSlice';

interface Props {
  type: 'comment' | 'reply';
  commentId: string;
  replayId?: string;
  isOwnComment: boolean;
  edit: () => void;
  replying: () => void;
}

const Actions: React.FC<Props> = ({ isOwnComment, replying, edit, type, commentId, replayId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleConfirmAction = () => {
    setOpen(false);
    if (type === 'comment') {
      dispatch(removeComment(commentId));
    } else if (replayId) {
      dispatch(removeReplay({ commentId, replayId }));
    }
  };

  return (
    <div className='comment__actions-btn actions-btn'>
      {isOwnComment && (
        <>
          <span className='delete-btn action-btn' onClick={() => setOpen((o) => !o)}>
            <img alt='delete-icon' src='./images/icon-delete.svg' /> Delete
          </span>
          <span className='edit-btn action-btn' onClick={edit}>
            <img alt='edit-icon' src='./images/icon-edit.svg' /> edit
          </span>
        </>
      )}
      {!isOwnComment && (
        <span onClick={replying} className='reply-btn action-btn'>
          <img alt='icon-reply' src='./images/icon-reply.svg' /> Reply
        </span>
      )}
      <ConfirmDelete isOpen={open} closeModal={() => setOpen(false)} onConfirm={handleConfirmAction} />
    </div>
  );
};

export default Actions;
