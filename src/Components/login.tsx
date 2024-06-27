import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useFormik } from 'formik';
import axios from '../axiosConfig';
import * as Yup from 'yup';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true); 
      try {
        const res = await axios.post('/token/', values);
        console.log('Login successful:', res.data);
        localStorage.setItem('accessToken', res.data.access);
        toast.success('Login successful', { position: 'top-right' });
        navigate('/');
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('Invalid username/password!', { position: 'top-right' });
      } finally {
        setLoading(false); 
        setSubmitting(false);
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <StyledContainer maxWidth="xs">
      <ToastContainer />
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <StyledForm noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting || loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </StyledButton>
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Register here
          </Link>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
