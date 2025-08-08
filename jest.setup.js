import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock window.freighter for wallet testing
Object.defineProperty(window, 'freighter', {
  writable: true,
  value: {
    getAddress: jest.fn(),
    signTransaction: jest.fn(),
  },
})

// Mock Stellar SDK if needed
jest.mock('@stellar/stellar-sdk', () => ({
  Contract: jest.fn(),
  TransactionBuilder: jest.fn(),
  BASE_FEE: '100',
  xdr: {
    ScVal: {
      scvString: jest.fn(),
      scvVec: jest.fn(),
      scvAddress: jest.fn(),
    },
    Address: {
      fromString: jest.fn(() => ({
        toScAddress: jest.fn()
      }))
    }
  },
  Address: jest.fn()
}))

jest.mock('@stellar/stellar-sdk/rpc', () => ({
  Server: jest.fn(),
  Api: {
    isSimulationError: jest.fn()
  },
  assembleTransaction: jest.fn()
}))