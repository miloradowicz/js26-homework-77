import { Box, Stack, TextField, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import FileInput from '../UI/FileInput/FileInput';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSending } from '@/store/slices/feedbackSlice';
import { loadFeedbacks, sendFeedback } from '@/store/thunks/feedbackThunk';

interface Data {
  author: string;
  message: string;
  image: File | null;
}

const FeedbackForm = () => {
  const dispatch = useAppDispatch();

  const sending = useAppSelector(selectSending);

  const [data, setData] = useState<Data>({
    author: '',
    message: '',
    image: null,
  });

  const [error, setError] = useState<string>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === 'message') {
      setError(undefined);
    }
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setData((data) => ({ ...data, [e.target.name]: file }));
    }
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!data.message) {
      setError('Message must be filled out.');

      return;
    }

    await dispatch(
      sendFeedback({
        author: data.author ? data.author : null,
        message: data.message,
        image: data.image ? data.image : null,
      })
    );

    setData((data) => ({ ...data, message: '', author: '' }));

    await dispatch(loadFeedbacks);
  };

  return (
    <Box p={4}>
      <Typography variant='h5' mb={2}>
        Tell us your thoughts. We reaaally wanna hear it.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField
            fullWidth
            label='Author'
            name='author'
            value={data.author}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label='Message'
            name='message'
            required
            value={data.message}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <FileInput
            fullWidth
            label='Image'
            name='image'
            buttonText='Upload'
            buttonProps={{ startIcon: <CloudUpload /> }}
            onChange={handleFileInputChange}
          />
          <LoadingButton type='submit' loading={sending}>
            Send
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default FeedbackForm;
