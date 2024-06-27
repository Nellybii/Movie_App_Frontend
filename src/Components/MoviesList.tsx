import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import MovieCard from './MovieCard';
import { Container } from '@mui/system';
import axios from '../axiosConfig';

export interface Movie {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    release_date: string;
    genre: string | string[];
    director: string | string[];
    duration: number;
}

const MoviesList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('/list/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = response.data;
                console.log('Fetched movies:', data);
                setMovies(data);
            } catch (error: any) {
                if (error.response) {
                    setError(error.response.data.detail || error.message);
                    console.error('Error fetching movies:', error);
                } else {
                    setError('An unknown error occurred');
                    console.error('Unknown error fetching movies:', error);
                }
            }
        };

        fetchMovies();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movies.length) {
        return <div>No movies found</div>;
    }

    const decodeImageUrl = (url: string) => {
        return decodeURIComponent(url);
    };

    return (
        <Container style={{ width: '100vw', paddingTop: 40, margin: 0 }}>
            <h1 style={{ color: 'blue', textAlign: 'center' }}>Available Movies</h1>
            <Grid container spacing={3} style={{ margin: 0, width: '100%' }}>
                {movies.map((movie: Movie) => (
                    <Grid item xs={10} sm={6} md={4} key={movie.id}>
                        <MovieCard
                            movie={{
                                ...movie,
                                genre: Array.isArray(movie.genre) ? movie.genre : [movie.genre],
                                director: Array.isArray(movie.director) ? movie.director : [movie.director],
                                image: decodeImageUrl(movie.image)
                            }}
                        />
                       
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MoviesList;
