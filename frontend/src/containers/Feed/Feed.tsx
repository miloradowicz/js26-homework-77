import { api } from '@/api';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';
import FeedbackList from '@/components/FeedbackList/FeedbackList';
import { Feedback } from '@/types';
import { LinearProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';

const Feed = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFeedback = useCallback(async () => {
    try {
      setLoading(true);

      const { data, status, statusText } = await api.get<Feedback[]>(
        'feedback'
      );

      if (status !== 200) {
        throw new Error(statusText);
      }

      setFeedbacks([...data]);
    } catch (e) {
      if (e instanceof Error) {
        enqueueSnackbar(e.message, { variant: 'error' });
      } else {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  const sendFeedback = useCallback(
    async (message: string, author: string | null, image: File | null) => {
      try {
        const body = new FormData();
        body.append('message', message);

        if (author) {
          body.append('author', author);
        }

        if (image) {
          body.append('image', image);
        }

        const { status, statusText } = await api.post<Feedback>(
          'feedback',
          body
        );

        if (status !== 200) {
          throw new Error(statusText);
        }

        await loadFeedback();
      } catch (e) {
        if (e instanceof Error) {
          enqueueSnackbar(e.message, { variant: 'error' });
        } else {
          console.error(e);
        }
      }
    },
    [enqueueSnackbar, loadFeedback]
  );

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [feedbacks]);

  return (
    <>
      <FeedbackList feedbacks={feedbacks} />
      {loading && <LinearProgress />}
      <FeedbackForm onSubmit={sendFeedback} />
      <div ref={ref} />
    </>
  );
};

export default Feed;
