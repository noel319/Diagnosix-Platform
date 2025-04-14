# Diagnosix Platform

Diagnosix is a medical imaging and diagnostics platform that allows secure upload, storage, and analysis of medical images. The platform consists of microservices for authentication, file upload, and processing.

## Architecture

The platform is built using a microservices architecture with the following components:

1. **Auth Service**: Handles user authentication and authorization
   - User registration and login
   - JWT token generation and validation
   - Role-based access control (patient, doctor, admin)

2. **Frontend Application**: React-based user interface
   - Material UI components
   - Responsive design
   - Role-specific dashboards

## Technology Stack

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic (migrations)
- JWT Authentication
- Docker & Docker Compose

### Frontend
- React
- TypeScript
- Material UI
- React Router
- Axios

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Git

### Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/diagnosix.git
   cd diagnosix
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/v1/docs

## Development

### Backend Development

The auth-service is implemented using FastAPI and follows these design patterns:
- Clean architecture with separation of concerns
- Repository pattern for data access
- Dependency injection
- OpenAPI documentation

To work on the backend:
```bash
cd auth-service
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Development

The frontend is implemented using React with TypeScript and follows these patterns:
- Component-based architecture
- Context API for state management
- Custom hooks
- Type-safe development with TypeScript

To work on the frontend:
```bash
cd frontend
npm install
npm start
```

## API Documentation

API documentation is available through Swagger UI at:
- Auth Service: http://localhost:8000/api/v1/docs

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Environment variable configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.