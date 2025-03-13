# Restaurant Booking System

A standalone restaurant booking system that integrates the data structure from OnlineOrderVue.

## Features

- Table management
- Booking creation and management
- Availability checking
- RESTful API for tables, bookings, and availability

## Project Structure

The project is divided into two main parts:

### Backend (Next.js API Routes)

- `/backend/src/models` - Data models for tables and bookings
- `/backend/src/services` - Data services for handling business logic
- `/backend/src/app/api` - API routes for tables, bookings, and availability
- `/backend/src/data` - JSON data storage

### Frontend (Vue.js)

- `/frontend/vue-project/src/services` - API client services
- `/frontend/vue-project/src/stores` - Pinia stores for state management
- `/frontend/vue-project/src/views` - Vue components for booking pages

## API Endpoints

### Tables

- `GET /api/tables` - Get all tables
- `POST /api/tables` - Create a new table
- `GET /api/tables/:id` - Get a specific table
- `PUT /api/tables/:id` - Update a table
- `DELETE /api/tables/:id` - Delete a table

### Bookings

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get a specific booking
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking

### Availability

- `GET /api/availability?date=YYYY-MM-DD&time=HH:MM&partySize=2` - Check table availability

## Data Models

### Table

```javascript
{
  id: Number,
  name: String,
  capacity: Number,
  location: String,
  isAvailable: Boolean,
  restaurantId: String
}
```

### Booking

```javascript
{
  id: String,
  restaurantId: String,
  tableId: String,
  date: String,
  time: String,
  partySize: Number,
  name: String,
  email: String,
  phone: String,
  specialRequests: String,
  status: String, // 'confirmed', 'cancelled', 'completed'
  createdAt: String
}
```

## Getting Started

1. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend/vue-project
npm install
```

2. Start the development servers:

```bash
# From the project root
node start-servers.js
```

This will start both the backend server (on port 3000) and the frontend development server (on port 5173).

## Integration with OnlineOrderVue

This project integrates the table and booking data structure from OnlineOrderVue while keeping it as a standalone system. The API structure follows a similar pattern to the OnlineOrderVue booking routes, making it easy to integrate with existing systems.
