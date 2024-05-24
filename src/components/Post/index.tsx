import React, { useState } from 'react';
import { useAppSelector } from '../../util/hooks';
import { Post as PostType } from '../../util/types';
import { formatDate } from '../../util/helper';

import Score from './Score';
import EditForm from './EditPostForm';
import ReplayForm from './ReplayForm';
import Actions from './Actions';

interface Props {
  isComment: boolean;
  post: PostType;
  parentCommentId?: string;
}

// Post can be a comment or replay
// If not parentCommentId so the post is comment, if reverse the post is replay
const Post: React.FC<Props> = ({ post, isComment, parentCommentId }) => {
  const [isReplaying, setIsReplaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const user = useAppSelector((state) => state.user.user?.username);
  const isOwnComment = user === post.user.username;

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleReplaying = () => setIsReplaying(true);
  const handleCancelReplaying = () => setIsReplaying(false);

  const renderYou = () => <span className="you">you</span>;

  return (
    <>
      <div className="comment card-item">
        <Score score={post.score} postId={post.id} parentCommentId={parentCommentId} />

        <div className="comment__desc">
          <span className="comment__desc_user">
            <img alt="user-image" src={post.user.image.png} /> {post.user.username} {isOwnComment && renderYou()}
          </span>
          <span className="comment__desc_date">{formatDate(post.createdAt)}</span>
        </div>

        <Actions isOwnComment={isOwnComment} parentCommentId={parentCommentId} postId={post.id} edit={handleEdit} replying={handleReplaying} />

        {isOwnComment && isEditing ? (
          <EditForm isComment={isComment} replyingTo={post.replyingTo} parentCommentId={parentCommentId} postId={post.id} content={post.content} cancel={handleCancelEdit} />
        ) : (
          <p className="comment__content">
            {!isComment && <span className="replying-to">{`@${post.replyingTo} `}</span>}
            {post.content}
          </p>
        )}
      </div>

      {isReplaying && <ReplayForm commentId={parentCommentId || post.id} replyingTo={post.user.username} close={handleCancelReplaying} />}
    </>
  );
};

export default Post;
