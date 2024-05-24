import React from 'react';
import { increaseScore, decreaseScore } from '../../feature/commentSlice';
import { useAppDispatch } from '../../util/hooks';

interface Props {
  score: number;
  parentCommentId?: string;
  postId: string;
}
const Score: React.FC<Props> = ({ score, parentCommentId, postId }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseScore = () => dispatch(increaseScore({ parentCommentId, postId }));
  const handleDecreaseScore = () => dispatch(decreaseScore({ parentCommentId, postId }));
  return (
    <div className="comment__score-bar">
      <span className="comment__score-button increase f-c" onClick={handleIncreaseScore}>
        <img alt="icon-plus" src="./images/icon-plus.svg" />
      </span>
      <span className="comment__score-value f-c">{score}</span>
      <span className="comment__score-button decrease f-c" onClick={handleDecreaseScore}>
        <img alt="icon-minus" src="./images/icon-minus.svg" />
      </span>
    </div>
  );
};

export default Score;
