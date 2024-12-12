import { api } from '@/api';
import { Feedback, FeedbackMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadFeedbacks = createAsyncThunk(
  'feedback/loadFeedbacks',
  async () => {
    const { data, status, statusText } = await api.get<Feedback[]>('feedback');

    if (status !== 200) {
      throw new Error(statusText);
    }

    return data;
  }
);

export const sendFeedback = createAsyncThunk(
  'feedback/sendFeedback',
  async (mutation: FeedbackMutation) => {
    if (!mutation.message) {
      throw new Error('Message must be provided.');
    }

    const body = new FormData();
    body.append('message', mutation.message);

    if (mutation.author) {
      body.append('author', mutation.author);
    }

    if (mutation.image) {
      body.append('image', mutation.image);
    }

    const { data, status, statusText } = await api.post<Feedback>(
      'feedback',
      body
    );

    if (status !== 200) {
      throw new Error(statusText);
    }

    return data;
  }
);
