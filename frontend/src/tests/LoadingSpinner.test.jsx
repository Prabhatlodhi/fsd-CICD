import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../components/LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('renders default loading message', () => {
    render(<LoadingSpinner />)
    expect(screen.getByTestId('loading-spinner')).toHaveTextContent('Loading...')
  })

  it('renders custom loading message', () => {
    render(<LoadingSpinner message="Loading users..." />)
    expect(screen.getByTestId('loading-spinner')).toHaveTextContent('Loading users...')
  })
})