import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Comment from './Comment';
import { fetchComments } from '../feature/commentSlice';
import Replies from './Replies';

const CommentList = () => {
  const dispatch = useAppDispatch();
  const { status, error, comments } = useAppSelector((state) => state.comments);

  const handleRetry = useCallback(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  let content;

  if (status === 'loading') {
    content = <div className='loading'>Loading...</div>;
  } else if (status === 'failed') {
    content = (
      <div className='fetch-error'>
        {error}
        <button className='retry-fetch-button' onClick={handleRetry}>
          Retry
        </button>
      </div>
    );
  } else if (status === 'succeeded' && comments.length > 0) {
    content = comments.map((comment) => (
      <React.Fragment key={comment.id}>
        <Comment comment={comment} type='comment' />
        {comment.replies && comment.replies.length > 0 && <Replies replies={comment.replies} commentId={comment.id} />}
      </React.Fragment>
    ));
  } else {
    content = <div className='no-comments'>No comments to display</div>;
  }

  return <div className='comment-list'>{content}</div>;
};

export default CommentList;
