import { createSlice } from '@reduxjs/toolkit';
import { loadFeedbacks, sendFeedback } from '../thunks/feedbackThunk';
import { RootState } from '@/app/store';
import { Feedback } from '@/types';

interface State {
  feedbacks: Feedback[];
  loading: boolean;
  sending: boolean;
  lastError?: {
    message: string;
  };
}

const initialState: State = {
  feedbacks: [],
  loading: false,
  sending: false,
};

const slice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeedbacks.pending, (state) => {
        state.lastError = undefined;
        state.loading = true;
      })
      .addCase(loadFeedbacks.fulfilled, (state, { payload }) => {
        state.feedbacks = payload;
        state.loading = false;
      })
      .addCase(loadFeedbacks.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.loading = false;
      })
      .addCase(sendFeedback.pending, (state) => {
        state.lastError = undefined;
        state.sending = true;
      })
      .addCase(sendFeedback.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendFeedback.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.sending = false;
      });
  },
});

export const feedbackReducer = slice.reducer;

export const selectFeedbacks = (state: RootState) =>
  state.feedbackReducer.feedbacks;
export const selectLoading = (state: RootState) =>
  state.feedbackReducer.loading;
export const selectSending = (state: RootState) =>
  state.feedbackReducer.sending;
export const selectLastError = (state: RootState) =>
  state.feedbackReducer.lastError;
