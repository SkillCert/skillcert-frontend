# Save Profile React Integration

## Overview

This document provides a comprehensive guide for integrating the `save_profile` function from the user_management Soroban smart contract into React applications using the `useSaveProfile` custom hook.

## Prerequisites

- React 18+
- TypeScript
- Freighter Wallet browser extension
- Stellar SDK (@stellar/stellar-sdk)
- Access to Stellar Testnet/Mainnet

## Installation

Ensure you have the required dependencies:

```bash
npm install @stellar/stellar-sdk@^13.3.0 @stellar/freighter-api@^4.1.0
```

## Environment Configuration

Add the following environment variables to your `.env.local`:

```env
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT=your_contract_address_here
```

## Hook Usage

### Basic Implementation

```tsx
import { useSaveProfile } from "@/hooks/use-save-profile";

function TeacherRegistration() {
  const { saveProfile, isLoading, error, success, transactionHash } =
    useSaveProfile();

  const handleSubmit = async (formData) => {
    try {
      const result = await saveProfile({
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        specialization: formData.specialization,
        languages: formData.languages, // comma-separated string
        teachingCategories: formData.teachingCategories, // comma-separated string
      });

      if (result.success) {
        console.log("Profile saved with transaction:", result.transactionHash);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Profile"}
      </button>

      {error && <div className="error">{error}</div>}
      {success && (
        <div className="success">
          Profile saved successfully! Transaction: {transactionHash}
        </div>
      )}
    </form>
  );
}
```

### Hook Return Values

| Property          | Type                                                       | Description                         |
| ----------------- | ---------------------------------------------------------- | ----------------------------------- | -------------------------------- |
| `saveProfile`     | `(data: TeacherProfileData) => Promise<SaveProfileResult>` | Function to save teacher profile    |
| `isLoading`       | `boolean`                                                  | Loading state during transaction    |
| `error`           | `string                                                    | null`                               | Error message if operation fails |
| `success`         | `boolean`                                                  | Success state after successful save |
| `transactionHash` | `string                                                    | null`                               | Stellar transaction hash         |

### Data Types

```typescript
interface TeacherProfileData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  specialization: string;
  languages: string; // comma-separated values
  teachingCategories: string; // comma-separated values
}

interface SaveProfileResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}
```

## Contract Integration Details

The hook automatically handles:

### Data Conversion

- Converts JavaScript strings to Stellar ScVal format
- Parses comma-separated strings into arrays for contract consumption
- Handles address resolution from connected Freighter wallet

### Transaction Management

- Builds and signs transactions using Freighter wallet
- Calculates appropriate transaction fees
- Submits transactions to Stellar network
- Polls for transaction confirmation

### Error Handling

- Wallet connection errors
- Network connectivity issues
- Contract execution failures
- Transaction timeout scenarios

## Testing

### Test Data Example

```javascript
const testProfile = {
  name: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  password: "securePassword123",
  specialization: "Mathematics",
  languages: "English,Spanish,French",
  teachingCategories: "Elementary,High School,University",
};
```

### Local Development

1. Ensure Freighter wallet is installed and configured for Testnet
2. Fund your test account with Testnet XLM
3. Deploy your contract to Testnet and update environment variables
4. Test the integration with sample data

## Troubleshooting

### Common Issues

**Wallet Not Connected**

```
Error: "Freighter wallet not found or not connected"
```

- Ensure Freighter extension is installed
- Connect wallet and authorize the application

**Contract Not Found**

```
Error: "Contract address not found"
```

- Verify `NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT` is set correctly
- Ensure contract is deployed to the correct network

**Transaction Failed**

```
Error: "Transaction failed with code: [error_code]"
```

- Check account has sufficient XLM for fees
- Verify contract function parameters are correct
- Review contract logs for specific error details

**Network Issues**

```
Error: "Failed to connect to Stellar network"
```

- Verify `NEXT_PUBLIC_STELLAR_RPC_URL` is accessible
- Check network connectivity
- Try switching to different RPC endpoint

## Security Considerations

- Never expose private keys in client-side code
- Validate all user inputs before contract submission
- Use environment variables for sensitive configuration
- Implement proper error handling to avoid information leakage
- Consider rate limiting for production applications

## Production Deployment

1. Update environment variables for Mainnet:

   ```env
   NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-mainnet.stellar.org
   NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT=mainnet_contract_address
   ```

2. Test thoroughly on Testnet before Mainnet deployment
3. Monitor transaction fees and adjust as needed
4. Implement proper logging and error tracking
5. Consider implementing transaction retry logic for better UX

## Support

For issues related to:

- **Stellar SDK**: Check [Stellar Documentation](https://developers.stellar.org/)
- **Soroban Contracts**: Review [Soroban Documentation](https://soroban.stellar.org/)
- **Freighter Wallet**: Visit [Freighter Support](https://freighter.app/)
