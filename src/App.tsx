import React from 'react';
import { AuthProvider } from './AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignUp from './Components/signup';
import Login from './Components/login';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import MovieList from './Components/MoviesList';
import MovieForm from './Components/createMovie';

const theme = createTheme();

const App: React.FC = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container>
          <NavBar />
          <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movieform" element={<MovieForm />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
