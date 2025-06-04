import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import axios from 'axios'
import App from '../App'

// Mock axios
vi.mock('axios')
const mockedAxios = axios

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockUsers = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      createdAt: '2024-01-02T00:00:00.000Z'
    }
  ]

  it('renders app title after loading', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { success: true, data: [], count: 0 }
    })

    render(<App />)
    
    // Wait for loading to finish and app title to appear
    await waitFor(() => {
      expect(screen.getByTestId('app-title')).toHaveTextContent('🚀 My Full-Stack App')
    })
  })

  it('shows loading spinner initially', () => {
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}))
    
    render(<App />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.getByText('Loading users...')).toBeInTheDocument()
  })

  it('displays users after successful API call', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { success: true, data: mockUsers, count: 2 }
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('users-count')).toHaveTextContent('👥 Users (2)')
    })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('displays error banner when API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('error-banner')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error-banner')).toHaveTextContent('Error connecting to server')
  })

  it('clears error when close button is clicked', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('error-banner')).toBeInTheDocument()
    })

    // Click the close button (✕)
    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)

    // Error banner should disappear
    await waitFor(() => {
      expect(screen.queryByTestId('error-banner')).not.toBeInTheDocument()
    })
  })

  it('makes API call to correct endpoint', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { success: true, data: [], count: 0 }
    })

    render(<App />)

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/users')
    })
  })

  it('refreshes users when refresh button is clicked', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { success: true, data: mockUsers, count: 2 }
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('refresh-button')).toBeInTheDocument()
    })

    // Clear previous calls
    vi.clearAllMocks()

    // Mock second API call
    mockedAxios.get.mockResolvedValueOnce({
      data: { success: true, data: [...mockUsers, {
        _id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'user',
        createdAt: '2024-01-03T00:00:00.000Z'
      }], count: 3 }
    })

    fireEvent.click(screen.getByTestId('refresh-button'))

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/users')
    })
  })
})