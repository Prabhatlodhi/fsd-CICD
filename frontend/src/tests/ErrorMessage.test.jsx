import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMessage from '../components/ErrorMessage'

describe('ErrorMessage Component', () => {
  it('renders error message', () => {
    const errorText = 'Something went wrong'
    render(<ErrorMessage error={errorText} onRetry={() => {}} />)
    
    expect(screen.getByTestId('error-text')).toHaveTextContent(errorText)
    expect(screen.getByText('❌ Error')).toBeInTheDocument()
    expect(screen.getByTestId('retry-button')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const mockOnRetry = vi.fn()
    render(<ErrorMessage error="Test error" onRetry={mockOnRetry} />)
    
    fireEvent.click(screen.getByTestId('retry-button'))
    expect(mockOnRetry).toHaveBeenCalledTimes(1)
  })
})