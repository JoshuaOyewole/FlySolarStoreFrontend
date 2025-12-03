'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Container, Typography, CircularProgress, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { authAPI } from '../lib/api';
import { toast } from 'react-toastify';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing');
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        
        if (response.success) {
          setStatus('success');
          setMessage(response.message || 'Email verified successfully!');
          toast.success('Email verified! You can now login.');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(response.message || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Invalid or expired verification link');
        toast.error('Email verification failed');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          {status === 'verifying' && (
            <>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h5" gutterBottom>
                Verifying your email...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please wait while we verify your email address
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 80,
                  color: 'success.main',
                  mb: 2,
                }}
              />
              <Typography variant="h5" gutterBottom color="success.main">
                Email Verified Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {message}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Redirecting to login page...
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/login')}
                sx={{ mt: 2 }}
              >
                Go to Login
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <ErrorOutlineIcon
                sx={{
                  fontSize: 80,
                  color: 'error.main',
                  mb: 2,
                }}
              />
              <Typography variant="h5" gutterBottom color="error.main">
                Verification Failed
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {message}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push('/register')}
                >
                  Register Again
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push('/login')}
                >
                  Go to Login
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
