import React, { useState } from 'react';
import { useAppSelector } from '../../util/hooks';
import { Comment as CommentType } from '../../util/types';
import { formatDate } from '../../util/helper';

import Score from './Score';
import EditForm from '../EditForm';
import ReplayForm from '../ReplayForm';
import Actions from './Actions';

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

  const user = useAppSelector((state) => state.user.user?.username);
  const isOwnComment = user === comment.user.username;

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleReplaying = () => setIsReplaying(true);
  const handleCancelReplaying = () => setIsReplaying(false);

  const renderYou = () => <span className='you'>you</span>;

  return (
    <>
      <div className='comment card-item'>
        <Score score={comment.score} parentId={parentId} commentId={comment.id} />
        <div className='comment__desc'>
          <span className='comment__desc_user'>
            <img alt='user-image' src={comment.user.image.png} /> {comment.user.username} {isOwnComment && renderYou()}
          </span>
          <span className='comment__desc_date'>{formatDate(comment.createdAt)}</span>
        </div>
        <Actions type={type} isOwnComment={isOwnComment} commentId={parentId || comment.id} replayId={comment.id} edit={handleEdit} replying={handleReplaying} />
        {isOwnComment && isEditing ? (
          <EditForm type={type} replyingTo={comment.replyingTo} commentId={parentId || comment.id} replayId={comment.id} content={comment.content} cancel={handleCancelEdit} />
        ) : (
          <p className='comment__content'>
            {type === 'reply' && <span className='replying-to'>{`@${comment.replyingTo} `}</span>}
            {comment.content}
          </p>
        )}
      </div>
      {isReplaying && <ReplayForm commentId={parentId || comment.id} replyingTo={comment.user.username} close={handleCancelReplaying} />}
    </>
  );
};

export default Comment;
