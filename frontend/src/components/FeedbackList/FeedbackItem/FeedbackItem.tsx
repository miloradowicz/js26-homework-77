import { baseURL } from '@/constants';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FC, memo } from 'react';

interface Props {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
}

const FeedbackItem: FC<Props> = ({ author, message, image }) => {
  return (
    <Card variant='outlined' sx={{ display: 'flex' }}>
      {image && (
        <CardMedia
          sx={{ minHeight: 150, maxHeight: '100%', minWidth: 250 }}
          image={new URL(image, new URL('images/', baseURL)).href}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {author ?? 'Anonymous'}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(FeedbackItem, (prev, next) => prev.id === next.id);
