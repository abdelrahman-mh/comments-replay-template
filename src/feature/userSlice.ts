import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../util/types';
import { getCurrentUser } from '../services/userServices';
type Status = 'idle' | 'succeeded' | 'loading' | 'failed';

interface NotesState {
  user: User | undefined;
  status: Status;
  error: null | string;
}

const initialState: NotesState = {
  user: undefined,
  status: 'idle',
  error: null,
};

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    return rejectWithValue('Failed to fetch current user');
  }
});

const notesSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

// export const {  } = notesSlice.actions

export default notesSlice.reducer;
