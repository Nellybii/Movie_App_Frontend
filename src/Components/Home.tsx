import React from 'react';
import { Grid, Container } from '@mui/material';

const Home: React.FC = () => {
    return (
        <div>
            <Container sx={{ paddingTop: '40px' }}>
                <Grid>
                    <Grid item xs={12}>
                        <div style={{ position: 'relative', textAlign: 'center' }}>
                            <img 
                                src="https://media.istockphoto.com/id/1441319019/photo/king-court-artistic-inside-view-with-colorful-glass-window-at-day-from-different-angle.jpg?b=1&s=612x612&w=0&k=20&c=JA470-3HyFtRX-O2SAYpeAsGkbYZeQQI5-cQCfK8tCk=" 
                                alt="Movie Store" 
                                style={{ width: '100%', height: 'auto' }} 
                            />
                            <h1 style={{ 
                                position: 'absolute', 
                                top: '50%', 
                                left: '50%', 
                                transform: 'translate(-50%, -50%)', 
                                color: 'white', 
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                                padding: '10px',
                                borderRadius: '10px'
                            }}>
                                Welcome to Movie Store
                            </h1>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Home;
