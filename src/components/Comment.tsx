import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { increaseScore, decreaseScore } from '../feature/commentSlice';
import { Comment as CommentType } from '../types';
import { formatDate } from '../helper';
import EditForm from './EditForm';
import ReplayForm from './ReplayForm';
import ConfirmDelete from './DeleteComment';

interface Props {
  type: 'comment' | 'reply';
  comment: Omit<CommentType, 'replies'> & {
    replyingTo?: string;
  };
  parentId?: string;
}

const Comment: React.FC<Props> = ({ comment, type, parentId }) => {
  const [isReplaying, setIsReplaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user?.username);
  const isOwnComment = user === comment.user.username;

  // confirm modal
  const handleOpenModal = () => {
    setIsConfirmModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsConfirmModalOpen(false);
  };
  const handleConfirmAction = () => {
    setIsConfirmModalOpen(false);
    console.log('confirm delete')
  };

  const handleIncreaseScore = () => dispatch(increaseScore({ parentId, commentId: comment.id }));
  const handleDecreaseScore = () => dispatch(decreaseScore({ parentId, commentId: comment.id }));

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleReplaying = () => setIsReplaying(true);
  const handleCancelReplaying = () => setIsReplaying(false);

  const renderYou = () => <span className='you'>you</span>;

  return (
    <>
      <div className='comment'>
        <div className='comment__score-bar'>
          <button className='comment__score-button increase' onClick={handleIncreaseScore}>
            <img alt='icon-plus' src='./images/icon-plus.svg' />
          </button>
          <span className='comment__score-value'>{comment.score}</span>
          <button className='comment__score-button decrease' onClick={handleDecreaseScore}>
            <img alt='icon-minus' src='./images/icon-minus.svg' />
          </button>
        </div>
        <div className='comment__info-side'>
          <div className='comment__header-bar'>
            <span className='comment__header-bar_user'>
              <img alt='user-image' src={comment.user.image.png} /> {comment.user.username} {isOwnComment && renderYou()}
            </span>
            <span className='comment__header-bar_date'>{formatDate(comment.createdAt)}</span>
            <span className='comment__header-bar_actions-btn'>
              {isOwnComment && (
                <>
                  <span className='comment__delete-btn' onClick={handleOpenModal}>
                    <img alt='delete-icon' src='./images/icon-delete.svg' /> Delete
                  </span>
                  <span className='comment__edit-btn' onClick={handleEdit}>
                    <img alt='edit-icon' src='./images/icon-edit.svg' /> edit
                  </span>
                </>
              )}
              {!isOwnComment && (
                <span onClick={handleReplaying}>
                  <img alt='icon-reply' src='./images/icon-reply.svg' /> Reply
                </span>
              )}
            </span>
          </div>
          {isOwnComment && isEditing ? (
            <EditForm type={type} replyingTo={comment.replyingTo} commentId={parentId || comment.id} replayId={comment.id} content={comment.content} cancel={handleCancelEdit} />
          ) : (
            <p className='comment-content'>
              {type === 'reply' && <span className='replying-to'>{`@${comment.replyingTo} `}</span>}
              {comment.content}
            </p>
          )}
        </div>
      </div>
      {isReplaying && <ReplayForm commentId={parentId || comment.id} replyingTo={comment.user.username} close={handleCancelReplaying} />}
      <ConfirmDelete isOpen={isConfirmModalOpen} closeModal={handleCloseModal} onConfirm={handleConfirmAction} />
    </>
  );
};

export default Comment;
