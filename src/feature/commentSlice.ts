import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Comment, NewComment, NewReplay } from '../types'
import { getComments } from '../services/commentsServices'

type Status = 'idle' | 'succeeded' | 'loading' | 'failed'

interface NotesState {
  comments: Comment[]
  status: Status
  error: null | string
}

const initialState: NotesState = {
  comments: [],
  status: 'idle',
  error: null,
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async (_, { rejectWithValue }) => {
  try {
    const comments = await getComments()
    return comments
  } catch (error) {
    return rejectWithValue('Failed to fetch comments')
  }
})

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
      }
      state.comments.push(newComment)
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload)
    },
    editComment: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const { id, content } = action.payload
      const commentToUpdate = state.comments.find((comment) => comment.id === id)
      if (commentToUpdate) {
        commentToUpdate.content = content
      }
    },
    addReplay: (state, action: PayloadAction<{ commentId: string; replay: NewReplay }>) => {
      const { commentId, replay } = action.payload
      const comment = state.comments.find((comment) => comment.id === commentId)
      if (comment) {
        comment.replies.push({
          ...replay,
          id: uuidv4(),
          createdAt: new Date().toUTCString(),
          score: 0,
        })
      }
    },
    removeReplay: (state, action: PayloadAction<{ commentId: string; replayId: string }>) => {
      const { commentId, replayId } = action.payload
      const comment = state.comments.find((comment) => comment.id === commentId)
      if (comment) {
        comment.replies = comment.replies.filter((replay) => replay.id !== replayId)
      }
    },
    editReplay: (state, action: PayloadAction<{ commentId: string; replayId: string; content: string }>) => {
      const { commentId, replayId, content } = action.payload
      console.log('commentID', commentId, 'replayId', replayId)
      const comment = state.comments.find((comment) => comment.id === commentId)
      if (comment) {
        const replay = comment.replies.find((replay) => replay.id === replayId)
        if (replay) {
          replay.content = content
        }
      }
    },
    increaseScore: (state, action: PayloadAction<{ parentId?: string; commentId: string }>) => {
      const { parentId, commentId } = action.payload

      if (parentId) {
        const comment = state.comments.find((comment) => comment.id === parentId)
        const replay = comment?.replies.find((r) => r.id === commentId)
        if (replay) {
          replay.score++
        }
      } else {
        const comment = state.comments.find((comment) => comment.id === commentId)

        if (comment) {
          comment.score++
        }
      }
    },
    decreaseScore: (state, action: PayloadAction<{ parentId?: string; commentId: string }>) => {
      const { parentId, commentId } = action.payload

      if (parentId) {
        const comment = state.comments.find((comment) => comment.id === parentId)
        const replay = comment?.replies.find((r) => r.id === commentId)
        if (replay) {
          replay.score--
        }
      } else {
        const comment = state.comments.find((comment) => comment.id === commentId)

        if (comment) {
          comment.score--
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload as string
    })
  },
})

export const { addComment, removeComment, editComment, addReplay, removeReplay, editReplay, increaseScore, decreaseScore } = commentsSlice.actions

export default commentsSlice.reducer
