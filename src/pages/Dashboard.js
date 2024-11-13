import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { supabase } from '../utils/supabase'
import { Button } from '../components/Button'
import { useAuth } from '../contexts/AuthContext'

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl};
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.xl};
`

const Welcome = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
`

const Content = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: 8px;
`

export function Dashboard() {
  const { user } = useAuth()
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata.username || user.email)
    }
  }, [user])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigate('/login')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <DashboardContainer>
      <Header>
        <Welcome>Welcome, {username}!</Welcome>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Header>
      <Content>
        <h2>Your Dashboard</h2>
        {/* Add your dashboard content here */}
      </Content>
    </DashboardContainer>
  )
}