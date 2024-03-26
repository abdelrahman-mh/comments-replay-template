import React from 'react';
import { Replay } from '../types';
import Comment from './Comment';
interface Props {
  replies: Replay[];
  commentId: string;
}
const Replies: React.FC<Props> = ({ replies, commentId }) => {
  return (
    <div className='replies-container'>
      {replies.map((reply) => (
        <Comment key={reply.id} comment={reply} type='reply' parentId={commentId} />
      ))}
    </div>
  );
};

export default Replies;
