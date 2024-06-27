import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Movie } from "./MoviesList"
import { red } from '@mui/material/colors';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
 // const fallbackImage = '';
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <img
            src={movie.image}
            alt={movie.title}
            style={{ width: '100%', height: 'auto' }}
          />
          <Typography gutterBottom variant="h5" component="div">
            Title: {movie.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
          >
            Description: {movie.description}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ color: red[500] }}
          >
            Price: {movie.price}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Duration: {movie.duration} minutes
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;