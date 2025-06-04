import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserForm from '../components/UserForm'

describe('UserForm Component', () => {
  it('renders form with inputs and submit button', () => {
    const mockOnUserAdded = vi.fn()
    render(<UserForm onUserAdded={mockOnUserAdded} />)
    
    expect(screen.getByTestId('name-input')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('calls onUserAdded with form data when submitted', async () => {
    const mockOnUserAdded = vi.fn().mockResolvedValue({})
    render(<UserForm onUserAdded={mockOnUserAdded} />)
    
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'john@example.com' }
    })
    
    fireEvent.click(screen.getByTestId('submit-button'))
    
    await waitFor(() => {
      expect(mockOnUserAdded).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      })
    })
  })

  it('clears form after successful submission', async () => {
    const mockOnUserAdded = vi.fn().mockResolvedValue({})
    render(<UserForm onUserAdded={mockOnUserAdded} />)
    
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.click(screen.getByTestId('submit-button'))
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
    })
  })
})