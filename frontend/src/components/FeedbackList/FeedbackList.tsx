import { Box, Stack, Typography } from '@mui/material';

import FeedbackItem from './FeedbackItem/FeedbackItem';
import { Feedback } from '@/types';
import { FC } from 'react';

interface Props {
  feedbacks: Feedback[];
}

const FeedbackList: FC<Props> = ({ feedbacks }) => {
  return (
    <Box p={2}>
      <Typography variant='h4' mb={2}>
        Your reeeeaaally valuable feedback
      </Typography>
      <Stack gap={1}>
        {!feedbacks.length ? (
          <Typography variant='h6'>No feedback yet</Typography>
        ) : (
          feedbacks.map((x) => (
            <FeedbackItem
              key={x.id}
              id={x.id}
              author={x.author}
              message={x.message}
              image={x.image}
            />
          ))
        )}
      </Stack>
    </Box>
  );
};

export default FeedbackList;
