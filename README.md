# 🚗 Rent Vehicle API

A RESTful API for vehicle rental management built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**. This API allows users to manage vehicle rentals, bookings, and user authentication with role-based access control.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)

---

## ✨ Features

- **User Authentication & Authorization** - JWT-based authentication with role-based access (admin/user)
- **User Management** - CRUD operations for user accounts
- **Vehicle Management** - Add, update, delete, and view vehicles
- **Booking System** - Create and manage vehicle rental bookings
- **Database Integration** - PostgreSQL with automatic table initialization
- **Type Safety** - Full TypeScript support
- **Security** - Password hashing with bcrypt
- **RESTful API** - Clean and organized API endpoints

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Development**: tsx (TypeScript execution)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tahmidjihan/rentVehicleAPI.git
cd rentVehicleAPI
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- Express.js
- TypeScript
- PostgreSQL driver (pg)
- JWT and bcrypt
- Type definitions

---

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

Open your PostgreSQL terminal or use a GUI tool like pgAdmin:

```sql
CREATE DATABASE rentvehicle;
```

### 2. Create a Database User (Optional)

```sql
CREATE USER rentvehicle_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE rentvehicle TO rentvehicle_user;
```

### 3. Database Tables

The application will automatically create the necessary tables when you first run it. The schema includes:

- **users** - User accounts with authentication
- **vehicles** - Vehicle inventory
- **bookings** - Rental bookings with foreign key relationships

To manually initialize the database, uncomment line 35 in `src/initDB.ts`:

```typescript
initDB();
```

Or the tables will be created automatically when you start the server.

---

## ⚙️ Environment Configuration

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
touch .env
```

### 2. Add Environment Variables

Add the following configuration to your `.env` file:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rentvehicle
DB_USER=your_database_user
DB_PASSWORD=your_database_password

# JWT Secret (use a strong, random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Security Notes

- ⚠️ **Never commit `.env` to version control** (it's already in `.gitignore`)
- 🔑 Use a strong JWT secret (at least 32 characters)
- 🔐 Use a strong database password
- 🌐 For production, use environment-specific values

---

## ▶️ Running the Project

### Development Mode (with hot reload)

```bash
npm run dev
```

This starts the server with `tsx watch`, which automatically reloads on file changes.

### Build for Production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Run Production Build

After building, you can run:

```bash
node dist/server.js
```

### Verify Server is Running

Open your browser or use curl:

```bash
curl http://localhost:3000
```

You should see: `Welcome to the Rent Vehicle API!`

---

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 Auth Endpoints

#### Register a New User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "1234567890",
  "role": "user"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user"
  }
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👥 User Endpoints

#### Get All Users (Admin Only)

```http
GET /api/v1/users
Authorization: Bearer <admin_token>
```

#### Update User

```http
PUT /api/v1/users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "phone": "9876543210"
}
```

#### Delete User (Admin Only)

```http
DELETE /api/v1/users/:userId
Authorization: Bearer <admin_token>
```

---

### 🚗 Vehicle Endpoints

#### Get All Vehicles

```http
GET /api/v1/vehicles
```

#### Get Vehicle by ID

```http
GET /api/v1/vehicles/:vehicleId
```

#### Create Vehicle (Admin Only)

```http
POST /api/v1/vehicles
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "vehicle_name": "Toyota Camry",
  "type": "Sedan",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

#### Update Vehicle (Admin Only)

```http
PUT /api/v1/vehicles/:vehicleId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "daily_rent_price": 55,
  "availability_status": "unavailable"
}
```

#### Delete Vehicle (Admin Only)

```http
DELETE /api/v1/vehicles/:vehicleId
Authorization: Bearer <admin_token>
```

---

### 📅 Booking Endpoints

#### Get All Bookings

```http
GET /api/v1/bookings
Authorization: Bearer <token>
```

#### Get Booking by ID

```http
GET /api/v1/bookings/:bookingId
Authorization: Bearer <token>
```

#### Create Booking

```http
POST /api/v1/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicle_id": 1,
  "rent_start_date": "2024-01-01",
  "rent_end_date": "2024-01-05",
  "total_price": 200,
  "status": "confirmed"
}
```

#### Update Booking

```http
PUT /api/v1/bookings/:bookingId
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

#### Delete Booking

```http
DELETE /api/v1/bookings/:bookingId
Authorization: Bearer <token>
```

---

## 📁 Project Structure

```
rentVehicleAPI/
├── src/
│   ├── api/
│   │   ├── auth/              # Authentication logic
│   │   │   ├── controllers/   # Auth controllers
│   │   │   ├── services/      # Auth services
│   │   │   ├── middleware/    # JWT middleware
│   │   │   └── index.ts       # Auth routes
│   │   ├── users/             # User management
│   │   │   ├── controllers/   # User controllers
│   │   │   ├── services/      # User services
│   │   │   └── index.ts       # User routes
│   │   ├── vehicles/          # Vehicle management
│   │   │   ├── controllers/   # Vehicle controllers
│   │   │   └── index.ts       # Vehicle routes
│   │   ├── bookings/          # Booking management
│   │   │   ├── controllers/   # Booking controllers
│   │   │   └── index.ts       # Booking routes
│   │   └── index.ts           # API router
│   ├── types/                 # TypeScript type definitions
│   ├── config.ts              # Environment configuration
│   ├── dbPool.ts              # PostgreSQL connection pool
│   ├── initDB.ts              # Database initialization
│   └── server.ts              # Express server entry point
├── dist/                      # Compiled JavaScript (generated)
├── .env                       # Environment variables (create this)
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

---

## 🌐 Deployment

This project is configured for deployment on **Vercel**.

### Deploy to Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Configure environment variables in Vercel dashboard:
   - Add all variables from your `.env` file
   - Update `DB_HOST` to your production database

### Other Deployment Options

- **Railway**: Import from GitHub, add environment variables
- **Render**: Connect repository, add environment variables
- **Heroku**: Use Heroku Postgres add-on
- **AWS/DigitalOcean**: Deploy with PM2 for process management

---

## 🧪 Testing the API

You can test the API using:

### 1. **Postman** or **Insomnia**

- Import the endpoints
- Set up environment variables for base URL and token

### 2. **cURL**

```bash
# Register user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","phone":"1234567890","role":"user"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 3. **Thunder Client** (VS Code Extension)

- Install Thunder Client extension
- Create requests within VS Code

---

## 🔧 Common Issues & Solutions

### Issue: Database Connection Error

**Solution**: Verify PostgreSQL is running and credentials in `.env` are correct

```bash
# Check PostgreSQL status
sudo systemctl status postgresql
```

### Issue: Port Already in Use

**Solution**: Change the PORT in `.env` or kill the process using the port

```bash
# Linux/Mac - Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: JWT Token Invalid

**Solution**: Ensure you're passing the correct token format:

```
Authorization: Bearer your_token_here
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Tahmid Jihan**

- GitHub: [@tahmidjihan](https://github.com/tahmidjihan)

---

## 🙏 Acknowledgments

- Built with Express.js and TypeScript
- Database powered by PostgreSQL
- Authentication using JWT

---

**Happy Coding! 🚀**
