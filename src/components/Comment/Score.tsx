import React from 'react';
import { increaseScore, decreaseScore } from '../../feature/commentSlice';
import { useAppDispatch } from '../../hooks';

interface Props {
  score: number;
  parentId?: string;
  commentId: string;
}
const Score: React.FC<Props> = ({ score, parentId, commentId }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseScore = () => dispatch(increaseScore({ parentId, commentId }));
  const handleDecreaseScore = () => dispatch(decreaseScore({ parentId, commentId }));
  return (
    <div className='comment__score-bar'>
      <span className='comment__score-button increase f-c' onClick={handleIncreaseScore}>
        <img alt='icon-plus' src='./images/icon-plus.svg' />
      </span>
      <span className='comment__score-value'>{score}</span>
      <span className='comment__score-button decrease f-c' onClick={handleDecreaseScore}>
        <img alt='icon-minus' src='./images/icon-minus.svg' />
      </span>
    </div>
  );
};

export default Score;
