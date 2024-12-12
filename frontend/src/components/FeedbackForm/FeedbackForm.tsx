import { Box, Stack, TextField } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import FileInput from '../UI/FileInput/FileInput';

const FeedbackForm = () => {
  return (
    <Box p={2}>
      <form>
        <Stack gap={2}>
          <TextField fullWidth label='Author' name='author' />
          <TextField fullWidth label='Message' name='message' required />
          <FileInput
            fullWidth
            label='Image'
            name='image'
            buttonText='Upload'
            buttonProps={{ startIcon: <CloudUpload /> }}
          />
        </Stack>
      </form>
    </Box>
  );
};

export default FeedbackForm;
