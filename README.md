# Full-Stack CICD Application

A complete full-stack application with React frontend, Node.js backend, MongoDB database, and Docker containerization.

## 🚀 Features

- **Frontend**: React + Vite + Vitest testing
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB Atlas
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions pipeline
- **Testing**: Automated frontend testing

## 🛠️ Local Development

### Prerequisites
- Node.js 22+
- Docker & Docker Compose
- MongoDB Atlas account

### Setup
```bash
# Clone repository
git clone https://github.com/yourusername/fullstack-cicd-app.git
cd fullstack-cicd-app

# Environment setup
cp .env.example .env
# Update .env with your MongoDB URI

# Run with Docker
docker-compose up --build

# Access application
Frontend: http://localhost
Backend: http://localhost:5000