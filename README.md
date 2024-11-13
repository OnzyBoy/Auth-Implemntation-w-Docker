# 🔐 Auth Dashboard

A React authentication dashboard with Supabase, containerized with Docker.

## 🚀 Quick Start

### Clone and Install
```bash
# Clone the repository
git clone https://github.com/OnzyBoy/Auth-Implemntation-w-Docker.git

# Navigate to project directory
cd Auth-Implemntation-w-Docker

# Install dependencies
npm install
```

### 🐳 Docker Setup

```bash
# Build the Docker image
docker build -t auth-dashboard .

# Run the container
docker run -p 3000:80 auth-dashboard
```

The application will be available at http://localhost:3000

## 💻 Local Development

If you prefer to run without Docker:

```bash
# Start development server
npm start
```

## 🔧 Tech Stack
- React
- Supabase (Authentication)
- Docker
- Nginx
- Styled Components

## 📝 Notes
- All users will share the same Supabase instance
- User data is stored in a centralized database
- No additional configuration needed - just clone, build and run!

## 🤝 Contributing
Pull requests are welcome! Feel free to contribute to this project.
