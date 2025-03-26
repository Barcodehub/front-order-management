# Order Management System - Frontend

A React-based frontend application for managing product orders with user authentication and role-based access control.

## Features

- User authentication (login/registration)
- JWT token management
- Role-based views (Admin/Client)
- Product listing and details
- Order creation and management
- Responsive design with Tailwind CSS
- TypeScript support

## Technologies Used

- React 18
- TypeScript
- React Router 6
- Axios for API calls
- Tailwind CSS for styling
- JWT for authentication

## Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── api/                # API configuration and calls
├── components/         # Reusable components
  ├── hooks/             # Custom hooks
├── types/             # TypeScript interfaces
├── views/             # Page components
├── App.tsx            # Main app component
├── main.tsx           # Application entry point
├── router.tsx         # Routing configuration
└── index.css          # Global styles
```

## Backend Requirements

This frontend requires the following backend endpoints:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /products` - List products
- `POST /products` - Create product (Admin only)
- `GET /orders` - List orders
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- Project Link: [Backend-project](https://github.com/Barcodehub/order-management-system.git)

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in local storage
4. Token used for subsequent API requests
5. Role-based access control implemented on frontend

## State Management

- Uses React Context for global state
- JWT token and user role managed globally
- Axios interceptors for token management

## Error Handling

- Centralized error handling
- User-friendly error messages
- Automatic logout on token expiration

## Contributing

1. Fork the repository
2. Create your feature branch 
3. Commit your changes 
4. Push to the branch 
5. Open a Pull Request

## License

This project is licensed under the MIT License.
