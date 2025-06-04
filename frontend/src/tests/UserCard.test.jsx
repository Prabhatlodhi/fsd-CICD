import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserCard from '../components/UserCard'

describe('UserCard Component', () => {
  const mockUser = {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z'
  }

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe')
    expect(screen.getByTestId('user-email')).toHaveTextContent('john@example.com')
    expect(screen.getByTestId('user-role')).toHaveTextContent('admin')
  })

  it('displays correct avatar initial', () => {
    render(<UserCard user={mockUser} />)
    
    const avatar = screen.getByText('J')
    expect(avatar).toBeInTheDocument()
  })

  it('applies correct role class', () => {
    render(<UserCard user={mockUser} />)
    
    const roleElement = screen.getByTestId('user-role')
    expect(roleElement).toHaveClass('user-role', 'admin')
  })

  it('handles user role styling', () => {
    const userWithUserRole = { ...mockUser, role: 'user' }
    render(<UserCard user={userWithUserRole} />)
    
    const roleElement = screen.getByTestId('user-role')
    expect(roleElement).toHaveClass('user-role', 'user')
  })

  it('formats date correctly', () => {
    const userWithDifferentDate = {
      ...mockUser,
      createdAt: '2024-12-25T00:00:00.000Z'
    }
    
    render(<UserCard user={userWithDifferentDate} />)
    
    // Accept both formats (DD/MM/YYYY or MM/DD/YYYY)
    const dateElement = screen.getByTestId('user-date')
    const dateText = dateElement.textContent
    
    // Check if it contains "Joined:" and the date in either format
    expect(dateText).toMatch(/Joined: (25\/12\/2024|12\/25\/2024)/)
  })
})