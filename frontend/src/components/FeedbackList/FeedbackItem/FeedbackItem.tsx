import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  author: string | null;
  message: string;
  image: string | null;
}

const FeedbackItem: FC<Props> = ({ author, message, image }) => {
  return (
    <Card>
      {image && <CardMedia sx={{ height: 140, width: 200 }} image={image} />}
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {author}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeedbackItem;
