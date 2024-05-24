import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './util/hooks';
import { fetchComments } from './feature/commentSlice';
import { fetchCurrentUser } from './feature/userSlice';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import GitHub from './components/GitHub';

const App = () => {
  const dispatch = useAppDispatch();
  const { status: commentsStatus } = useAppSelector((state) => state.comments);
  const { status: userStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (commentsStatus === 'idle') {
      dispatch(fetchComments());
    }
    if (userStatus === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, commentsStatus, userStatus]);
  return (
    <React.Fragment>
      <CommentList />
      <CommentForm />
      <GitHub />
    </React.Fragment>
  );
};

export default App;
