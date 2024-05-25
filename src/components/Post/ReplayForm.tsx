import React, { FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../util/hooks';
import { addReplay, closeReplayingForm } from '../../feature/commentSlice';
import { validateComment } from '../../util/helper';
import Textarea from '../Textarea';

interface Props {
  commentId: string;
  replyingTo: string;
}

const ReplayForm: React.FC<Props> = ({ replyingTo, commentId }) => {
  const [content, setContent] = useState(`@${replyingTo} `);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const closeFrom = () => dispatch(closeReplayingForm());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContent: string = content.startsWith(`@${replyingTo} `) ? content.slice(replyingTo.length + 1).trim() : content.trim();

    if (user && validateComment(newContent)) {
      dispatch(
        addReplay({
          commentId: commentId,
          replay: {
            content: newContent,
            replyingTo: replyingTo,
            user,
          },
        })
      );
      setContent('');
      closeFrom();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="replay-form form card-item">
      <img src={user?.image.png} alt="user-icon" className="form__image" />
      <Textarea value={content} onChange={({ target }) => setContent(target.value)} placeholder="Add a reply..." />
      <div className="form__buttons">
        <button className="btn confirm" type="submit">
          REPLY
        </button>
        <span className="cancel-btn" onClick={() => closeFrom()}>
          Cancel
        </span>
      </div>
    </form>
  );
};

export default ReplayForm;
