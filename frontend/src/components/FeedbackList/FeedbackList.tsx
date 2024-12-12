import { Stack } from '@mui/material';

import FeedbackItem from './FeedbackItem/FeedbackItem';
import { Feedback } from '@/types';
import { FC } from 'react';

interface Props {
  feedbacks: Feedback[];
}

const FeedbackList: FC<Props> = ({ feedbacks }) => {
  return (
    <Stack gap={1}>
      {feedbacks.map((x) => (
        <FeedbackItem
          key={x.id}
          author={x.author}
          message={x.message}
          image={x.image}
        />
      ))}
    </Stack>
  );
};

export default FeedbackList;
