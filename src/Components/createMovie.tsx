import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const MovieForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        release_date: '',
        duration: '',
        genre: '',
        director: '',
        image: null as File | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files) {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('release_date', formData.release_date);
        formDataToSend.append('duration', formData.duration);
        formDataToSend.append('genre', formData.genre);
        formDataToSend.append('director', formData.director);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.post('http://127.0.0.1:8000/movies/create/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Movie created successfully:', response.data.data);
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add a New Movie
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        margin="normal"
                        type="number"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Release Date"
                        name="release_date"
                        value={formData.release_date}
                        onChange={handleChange}
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Duration (minutes)"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        margin="normal"
                        type="number"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Genre ID"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Director ID"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Upload Image
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            hidden
                            onChange={handleChange}
                        />
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default MovieForm;
