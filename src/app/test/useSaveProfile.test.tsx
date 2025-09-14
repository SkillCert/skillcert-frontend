import { renderHook, act } from '@testing-library/react';
import { useSaveProfile } from '../contract_connections/UserProfile/useSaveProfile';
import { saveProfile } from '../contract_connections/UserProfile/saveProfile';

jest.mock('../contract_connections/UserProfile/saveProfile', () => ({
  ...jest.requireActual('../contract_connections/UserProfile/saveProfile'),
  saveProfile: jest.fn()
}));

const mockedSaveProfile = saveProfile as jest.MockedFunction<typeof saveProfile>;

describe('useSaveProfile', () => {
  const mockConfig = {
    contractAddress: 'MOCK_ADDRESS',
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: process.env.NEXT_PUBLIC_SOROBAN_RPC_URL as string,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful profile save', async () => {
    mockedSaveProfile.mockResolvedValue({
      success: true,
      transactionHash: 'mock-hash',
      profile: {
        name: 'John',
        email: 'john@test.com',
        country: 'USA',
        user: 'mock-address'
      }
    });

    const { result } = renderHook(() => useSaveProfile(mockConfig));

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      const response = await result.current.saveUserProfile({
        name: 'John',
        email: 'john@test.com',
        country: 'USA'
      });

      expect(response.success).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle validation errors', async () => {
    const { result } = renderHook(() => useSaveProfile(mockConfig));

    await act(async () => {
      await result.current.saveUserProfile({
        name: '',
        email: 'invalid',
        country: ''
      });
    });

    expect(result.current.validationErrors).not.toBeNull();
    expect(result.current.validationErrors?.name).toBeDefined();
  });
});