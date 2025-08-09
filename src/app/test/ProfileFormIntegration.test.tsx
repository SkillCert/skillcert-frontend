import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useSaveProfile } from '../contract_connections/UserProfile/useSaveProfile'

// Mock the entire saveProfile module
jest.mock('../contract_connections/UserProfile/saveProfile', () => ({
  ...jest.requireActual('../contract_connections/UserProfile/saveProfile'),
  saveProfile: jest.fn(),
}))

const TestProfileForm = () => {
  const { 
    saveUserProfile, 
    isLoading, 
    error, 
    validationErrors 
  } = useSaveProfile({
    contractAddress: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHAGK67TM',
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: 'https://soroban-testnet.stellar.org'
  })

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    profession: '',
    goals: '',
    country: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveUserProfile(formData)
  }

  return (
    <form onSubmit={handleSubmit} data-testid="profile-form">
      <input
        data-testid="name-input"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name"
      />
      <input
        data-testid="email-input"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      <input
        data-testid="country-input"
        value={formData.country}
        onChange={(e) => setFormData({...formData, country: e.target.value})}
        placeholder="Country"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Profile'}
      </button>
      
      {error && <div data-testid="error-message">{error}</div>}
      {validationErrors && (
        <div data-testid="validation-errors">
          {Object.entries(validationErrors).map(([field, message]) => (
            <div key={field}>{field}: {message}</div>
          ))}
        </div>
      )}
    </form>
  )
}

describe('Profile Form Integration', () => {
  const { saveProfile } = require('../contract_connections/UserProfile/saveProfile')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show validation errors for empty form', async () => {
    render(<TestProfileForm />)
    
    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByTestId('validation-errors')).toBeInTheDocument()
    })

    // Check that saveProfile was not called due to validation errors
    expect(saveProfile).not.toHaveBeenCalled()
  })

  it('should handle successful wallet connection and profile save', async () => {
    saveProfile.mockResolvedValue({
      success: true,
      transactionHash: 'mock-transaction-hash-123',
      profile: {
        name: 'John Doe',
        email: 'john@example.com',
        country: 'USA',
        user: 'GABC123...'
      }
    })

    render(<TestProfileForm />)
    
    // Fill out the form with valid data
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByTestId('country-input'), {
      target: { value: 'USA' }
    })

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('Saving...')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Save Profile')).toBeInTheDocument()
    })

    // Verify saveProfile was called with correct data
    expect(saveProfile).toHaveBeenCalledWith(
      {
        name: 'John Doe',
        email: 'john@example.com',
        profession: '',
        goals: '',
        country: 'USA'
      },
      expect.any(Object)
    )
  })

  it('should handle wallet connection errors', async () => {
    // Mock wallet error
    saveProfile.mockResolvedValue({
      success: false,
      error: 'Wallet connection required. Please connect your wallet and try again.'
    })

    render(<TestProfileForm />)
    
    // Fill out valid form data
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByTestId('country-input'), {
      target: { value: 'USA' }
    })

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Wallet connection required'
    )
  })

  it('should handle contract errors', async () => {
    // Mock contract error
    saveProfile.mockResolvedValue({
      success: false,
      error: 'Transaction failed: Contract execution failed'
    })

    render(<TestProfileForm />)
    
    // Fill out valid form data
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByTestId('country-input'), {
      target: { value: 'USA' }
    })

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Transaction failed'
    )
  })
})

// Test the validation function separately
describe('Validation Function Tests', () => {
  const { validateProfileData } = require('../contract_connections/UserProfile/saveProfile')

  it('should pass validation for valid data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      country: 'USA'
    }

    const result = validateProfileData(validData)
    expect(result).toBeNull()
  })

  it('should fail validation for empty required fields', () => {
    const invalidData = {
      name: '',
      email: '',
      country: ''
    }

    const result = validateProfileData(invalidData)
    expect(result).not.toBeNull()
    expect(result?.name).toContain('Name is required')
    expect(result?.email).toContain('Email is required')  
    expect(result?.country).toContain('Country is required')
  })

  it('should fail validation for invalid email', () => {
    const invalidEmailData = {
      name: 'John',
      email: 'not-an-email',
      country: 'USA'
    }

    const result = validateProfileData(invalidEmailData)
    expect(result).not.toBeNull()
    expect(result?.email).toContain('valid email address')
  })

  it('should allow optional fields to be empty', () => {
    const dataWithoutOptionals = {
      name: 'John Doe',
      email: 'john@example.com',
      country: 'USA'
      // profession and goals are undefined
    }

    const result = validateProfileData(dataWithoutOptionals)
    expect(result).toBeNull()
  })
})