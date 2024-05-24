import React from 'react';
import { Replay } from '../util/types';
import Post from './Post';
interface Props {
  replies: Replay[];
  commentId: string;
}
const Replies: React.FC<Props> = ({ replies, commentId }) => {
  return (
    <div className="replies-container">
      {replies.map((reply) => (
        <Post key={reply.id} post={reply} isComment={false} parentCommentId={commentId} />
      ))}
    </div>
  );
};

export default Replies;
