# Skill_Sync Frontend

A React-based frontend application for the Skill_Sync platform, enabling users to connect, communicate, and build professional networks.

## Project Structure

```
src/
 ├── components/
 │     ├── Navbar.tsx
 │     ├── Footer.tsx
 │     ├── ProtectedRoute.tsx   // Auth check
 │     └── UI/                  // Reusable components (buttons, inputs, cards, etc.)
 │
 ├── pages/
 │     ├── Login.tsx
 │     ├── Signup.tsx
 │     ├── Dashboard.tsx
 │     ├── Profile.tsx
 │     ├── Connections.tsx
 │     ├── Chat.tsx
 │     └── ErrorPage.tsx
 │
 ├── context/
 │     └── AuthContext.tsx      // User & token state management
 │
 ├── hooks/
 │     └── useAuth.ts           // Custom auth hook
 │
 ├── utils/
 │     ├── api.ts               // Axios instance configuration
 │     └── constants.ts         // App constants
 │
 ├── assets/                    // Images & icons
 │
 ├── App.tsx
 ├── main.tsx
 └── index.css
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Features

- User authentication (Login/Signup)
- Protected routes for authenticated users
- User profile management
- Connection management
- Real-time chat functionality
- Responsive UI components

