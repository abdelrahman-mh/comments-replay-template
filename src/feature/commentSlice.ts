import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Comment, NewComment, NewReplay } from '../util/types';
import { getComments } from '../services/commentsServices';

type Status = 'idle' | 'succeeded' | 'loading' | 'failed';

interface NotesState {
  comments: Comment[];
  status: Status;
  error: null | string;
  openedReplayForm: string | null;
}

const initialState: NotesState = {
  comments: [],
  status: 'idle',
  error: null,
  openedReplayForm: null,
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async (_, { rejectWithValue }) => {
  try {
    const comments = await getComments();
    return comments;
  } catch (error) {
    return rejectWithValue('Failed to fetch comments');
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<NewComment>) => {
      const newComment: Comment = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toUTCString(),
        score: 0,
        replies: [],
      };
      state.comments.push(newComment);
    },
    addReplay: (state, action: PayloadAction<{ commentId: string; replay: NewReplay }>) => {
      const { commentId, replay } = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        comment.replies.push({
          ...replay,
          id: uuidv4(),
          createdAt: new Date().toUTCString(),
          score: 0,
        });
      }
    },

    removePost: (state, action: PayloadAction<{ parentCommentId?: string; postId: string }>) => {
      const { parentCommentId, postId } = action.payload;

      if (parentCommentId) {
        // Remove replay
        const comment = state.comments.find((comment) => comment.id === parentCommentId);
        if (comment && comment.replies) {
          comment.replies = comment.replies.filter((replay) => replay.id !== postId);
        }
      } else {
        // Remove comment
        state.comments = state.comments.filter((c) => c.id !== postId);
      }
    },

    editPost: (state, action: PayloadAction<{ parentCommentId?: string; postId: string; newContent: string }>) => {
      const { parentCommentId, postId, newContent } = action.payload;

      if (parentCommentId) {
        const comment = state.comments.find((c) => c.id === parentCommentId);
        const replay = comment?.replies.find((r) => r.id === postId);
        if (replay) {
          replay.content = newContent;
        }
      } else {
        const comment = state.comments.find((c) => c.id === postId);
        if (comment) comment.content = newContent;
      }
    },
    increaseScore: (state, action: PayloadAction<{ parentCommentId?: string; postId: string }>) => {
      const { parentCommentId, postId } = action.payload;

      if (parentCommentId) {
        const comment = state.comments.find((comment) => comment.id === parentCommentId);
        const replay = comment?.replies.find((r) => r.id === postId);
        if (replay) {
          replay.score++;
        }
      } else {
        const comment = state.comments.find((comment) => comment.id === postId);

        if (comment) {
          comment.score++;
        }
      }
    },
    decreaseScore: (state, action: PayloadAction<{ parentCommentId?: string; postId: string }>) => {
      const { parentCommentId, postId } = action.payload;

      if (parentCommentId) {
        const comment = state.comments.find((comment) => comment.id === parentCommentId);
        const replay = comment?.replies.find((r) => r.id === postId);
        if (replay) {
          replay.score--;
        }
      } else {
        const comment = state.comments.find((comment) => comment.id === postId);

        if (comment) {
          comment.score--;
        }
      }
    },
    setOpenedReplayForm: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.openedReplayForm = id;
    },
    closeReplayingForm: (state) => {
      state.openedReplayForm = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const { addComment, removePost, editPost, addReplay, increaseScore, decreaseScore, setOpenedReplayForm, closeReplayingForm } = commentsSlice.actions;

export default commentsSlice.reducer;
