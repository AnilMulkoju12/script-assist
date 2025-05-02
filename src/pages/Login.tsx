import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Container, Title, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthStore } from '../store/auth/useAuthStore';

type FormValues = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm<FormValues>({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => {
        if (!value.trim()) return 'Please enter your username';
        if (value.trim().length < 3) return 'Username must be at least 3 characters';
        return null;
      },
      password: (value) => {
        if (!value) return 'Please enter your password';
        if (value.length < 4) return 'Password must be at least 4 characters';
        return null;
      },
    },
  });
  const handleSubmit = (values: FormValues) => {
    const { username, password } = values;
    if (username === 'admin' && password === '1234') {
      login();
      localStorage.setItem('authUser', JSON.stringify({ username }));
  
      navigate('/resources');
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <Container size="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper
        withBorder
        shadow="lg"
        radius="md"
        p="xl"
        style={{
          width: '100%',
          backgroundColor: '#f9fafb',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title align="center" order={2} mb="lg" style={{ color: '#1e40af' }}>
          Login
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps('username')}
            mb="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps('password')}
            mb="lg"
          />
          <Button fullWidth type="submit" color="indigo">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
