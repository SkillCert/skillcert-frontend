import { validateProfileData, UserProfileData } from '../contract_connections/UserProfile/saveProfile';
import { describe, it, expect } from '@jest/globals';

describe('validateProfileData', () => {
  it('should return null for valid profile data', () => {
    const validData: UserProfileData = {
      name: 'John Doe',
      email: 'john@example.com',
      profession: 'Developer',
      goals: 'Learn blockchain',
      country: 'USA'
    };

    const result = validateProfileData(validData);
    expect(result).toBeNull();
  });

  it('should return errors for empty required fields', () => {
    const invalidData: UserProfileData = {
      name: '',
      email: '',
      country: ''
    };

    const result = validateProfileData(invalidData);
    expect(result).not.toBeNull();
    expect(result?.name).toContain('Name is required');
    expect(result?.email).toContain('Email is required');
    expect(result?.country).toContain('Country is required');
  });

  it('should validate email format', () => {
    const invalidData: UserProfileData = {
      name: 'John',
      email: 'invalid-email',
      country: 'USA'
    };

    const result = validateProfileData(invalidData);
    expect(result?.email).toContain('valid email address');
  });

  it('should allow optional fields to be undefined', () => {
    const validData: UserProfileData = {
      name: 'John Doe',
      email: 'john@example.com',
      country: 'USA'
      // profession and goals are undefined
    };

    const result = validateProfileData(validData);
    expect(result).toBeNull();
  });
});