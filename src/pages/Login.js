import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { supabase } from '../utils/supabase'
import { Button } from '../components/Button'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl};
`

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.text.primary};
`

const SignupLink = styled(Link)`
  display: block;
  margin-top: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <Form onSubmit={handleLogin}>
        <h1>Login</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
        <SignupLink to="/signup">
          Don't have an account? Sign up
        </SignupLink>
      </Form>
    </LoginContainer>
  )
}