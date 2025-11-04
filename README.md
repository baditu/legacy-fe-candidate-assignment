# Web3 Message Signer & Verifier

A full-stack Web3 application that enables users to authenticate with Dynamic.xyz embedded wallets, sign custom messages, and verify signatures on the backend.

## Overview

This application demonstrates a complete Web3 authentication and message signing workflow:

1. **Authentication**: Users connect via Dynamic.xyz's headless embedded wallet implementation
2. **Message Signing**: Users can sign custom messages using their connected wallet
3. **Signature Verification**: Backend verifies signatures using `viem` and returns validation results
4. **Message History**: Signed messages are persisted locally and displayed in a beautiful history view

## Features

- **Dynamic.xyz Headless Authentication**: Embedded wallet integration without using the widget
- **Custom Message Signing**: Users can sign any message of their choice
- **Signature Verification**: Backend validates signatures using `viem`'s cryptographic functions
- **Message History**: Local storage persistence with an animated history view
- **Beautiful UI**: Modern, responsive design with smooth animations using Framer Motion
- **Comprehensive Testing**: Full test suite with Bun testing framework
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript implementation with Zod validation

## Tech Stack

### Frontend
- React 18+
- TypeScript
- Dynamic.xyz SDK (@dynamic-labs/sdk-react-core)
- Wagmi + Viem
- React Hook Form + Zod
- shadcn/ui (UI component library)
- Framer Motion
- Tailwind CSS
- Sonner (Toast notifications)

### Backend
- Node.js
- Express
- TypeScript
- Viem (signature verification)
- Zod (validation)
- Pino (logging)
- Bun (runtime + testing)

## Setup Instructions

### Prerequisites

- **Node.js** (v18+) or **Bun** (recommended for backend)
- A **Dynamic.xyz** account and environment ID
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Create a `.env` file in the `frontend` directory:
```bash
cp .env.example .env
```

4. Add your Dynamic.xyz environment ID to `.env`:
```env
VITE_DYNAMIC_ENVIRONMENT_ID=your_environment_id_here
VITE_API_BASE_URL=http://localhost:3001
```

5. Start the development server:
```bash
npm run dev
# or
bun dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Create a `.env` file in the `backend` directory:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
# or
bun dev
```

The backend will be available at `http://localhost:3001`

## Testing

### Backend Tests

Run the test suite from the backend directory:

```bash
cd backend
npm test
# or
bun test
```

The test suite includes:
- Valid signature verification
- Case-insensitive address handling
- Missing header validation
- Invalid address format validation
- Empty message validation
- Invalid signature format validation
- Signature mismatch scenarios

### Frontend Testing

The frontend uses ESLint for code quality:

```bash
cd frontend
npm run lint
```

### API Testing with Postman

The backend endpoint was tested using **Postman** to verify signature validation functionality. The endpoint accepts:

- **Endpoint**: `POST /api/verify-signature`
- **Headers**:
  - `Content-Type: application/json`
  - `x-wallet-address: <wallet_address>` (required)
- **Body**:
  ```json
  {
    "message": "your message here",
    "signature": "0x..."
  }
  ```

This manual testing approach complements the automated test suite and helps verify the API's behavior in a real-world scenario.

## Trade-offs & Areas for Improvement

### Trade-offs Made

1. **LocalStorage for History**: Chose localStorage over a database for simplicity, as specified in requirements. In production, this would ideally be server-side storage.

2. **Header-based Address Validation**: The backend validates signatures against an `x-wallet-address` header. This adds an extra layer of validation but requires frontend coordination.

### Areas for Improvement

1. **Database Integration**: 
   - Persist message history server-side
   - Add user accounts and session management
   - Store signature metadata for analytics

2. **Enhanced Security**:
   - Implement rate limiting on API endpoints
   - Add request signing/authentication tokens

3. **Multi-Factor Authentication**:
   - Implement Dynamic.xyz headless MFA as a bonus feature
   - Add additional security layers

4. **Testing**:
   - Increase backend test coverage

5. **Performance**:
   - Implement pagination for message history

6. **User Experience**:
   - Add message templates
   - Export message history as JSON/CSV
   - Add copy-to-clipboard functionality
   - Implement search/filter for message history

## License

This project was created as a take-home assignment.

