import { useAppDispatch, useAppSelector } from '@/app/hooks';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';
import FeedbackList from '@/components/FeedbackList/FeedbackList';
import {
  selectFeedbacks,
  selectLastError,
  selectLoading,
} from '@/store/slices/feedbackSlice';
import { loadFeedbacks } from '@/store/thunks/feedbackThunk';
import { LinearProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';

const Feed = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const feedbacks = useAppSelector(selectFeedbacks);
  const loading = useAppSelector(selectLoading);
  const lastError = useAppSelector(selectLastError);

  useEffect(() => {
    dispatch(loadFeedbacks());
  }, [dispatch]);

  useEffect(() => {
    closeSnackbar();
    if (lastError) {
      enqueueSnackbar(lastError.message, { variant: 'error' });
    }
  }, [lastError, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [feedbacks]);

  return (
    <>
      <FeedbackList feedbacks={feedbacks} />
      {loading && <LinearProgress />}
      <FeedbackForm />
      <div ref={ref} />
    </>
  );
};

export default Feed;
