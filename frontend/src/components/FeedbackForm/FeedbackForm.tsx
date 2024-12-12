import { Box, Stack, TextField } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import FileInput from '../UI/FileInput/FileInput';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { LoadingButton } from '@mui/lab';

interface Data {
  author: string;
  message: string;
  image: File | null;
}

interface Props {
  onSubmit: (
    message: string,
    author: string | null,
    image: File | null
  ) => void;
}

const FeedbackForm: FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<Data>({
    author: '',
    message: '',
    image: null,
  });
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit: FormEventHandler = (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!data.message) {
        setError('Message must be filled out.');

        return;
      }

      onSubmit(
        data.message,
        data.author ? data.author : null,
        data.image ? data.image : null
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2}>
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
          <LoadingButton type='submit' loading={loading}>
            Send
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default FeedbackForm;
