import { feedbackReducer } from '@/store/slices/feedbackSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { feedbackReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
