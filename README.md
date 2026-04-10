# Task Manager

A modern, full-stack task management application built with React and Node.js, featuring real-time task tracking, user authentication, and a professional UI.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-19.2-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)
![License](https://img.shields.io/badge/License-ISC-blueviolet)

## 🎯 Features

### User Management
- 🔐 Secure user authentication with JWT
- 📝 Email-based registration and login
- 🔒 Password encryption using bcrypt
- Session management with token-based auth

### Task Management
- ✅ Create, read, update, and delete tasks
- 📊 Task status tracking (Pending/Completed)
- 🎨 Intuitive task dashboard
- 🔄 Real-time task updates

### User Interface
- 💎 Professional, modern design with light color palette
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized performance
- 🎭 Smooth animations and transitions
- 🎨 OKLCH color system for perceptually uniform colors

### Development
- 🧪 Comprehensive test coverage (Frontend & Backend)
- 📚 Well-documented codebase

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Vitest** - Testing framework
- **React Router 7** - Navigation

### Backend
- **Node.js 18** - JavaScript runtime
- **Express 5** - Web framework
- **PostgreSQL 15** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Jest** - Testing framework

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v15 or higher)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task_manager
```

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration
# DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
# JWT_SECRET=your-secret-key-here

# Run database migrations
npx prisma migrate dev --name init

# Start backend server (runs on port 4000)
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 5173)
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📦 Project Structure

```
task_manager/
├── frontend/                        # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── auth/               # Login, Signup components
│   │   │   ├── tasks/              # Task management components
│   │   │   └── ui/                 # Reusable UI components
│   │   ├── lib/
│   │   │   └── utils.js            # Utility functions
│   │   ├── utils/
│   │   │   └── api.js              # API client
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   └── App.css                 # Theme colors
│   ├── package.json
│   └── vite.config.js
├── src/                            # Node backend
│   ├── controllers/
│   │   ├── auth.js                 # Auth logic
│   │   └── tasks.js                # Task logic
│   ├── routes/
│   │   ├── auth.js                 # Auth endpoints
│   │   ├── tasks.js                # Task endpoints
│   │   └── index.js                # Route aggregation
│   ├── middleware/
│   │   └── auth.js                 # JWT verification
│   ├── __tests__/                  # Test files
│   └── index.js                    # Server entry point
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Migration files
├── package.json                 
└── README.md                   
```

## 🧪 Testing

### Run All Tests

```bash
# Backend tests
npm test

# Frontend tests
cd frontend
npm test
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all tasks (requires auth)
- `POST /api/tasks` - Create new task (requires auth)
- `GET /api/tasks/:id` - Get single task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deploy to Render

1. Create a Render account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Set up environment variables
4. Add the Deploy Hook URL to GitHub secrets
5. Push to `main` branch and automatic deployment begins!

## 🔧 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/task_manager

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=4000
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:4000/api
```

## 🎨 Color Scheme (OKLCH)

The application uses OKLCH color space for perceptually uniform colors:

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Primary | oklch(0.55 0.18 248) | oklch(0.65 0.16 248) |
| Accent | oklch(0.60 0.15 200) | oklch(0.70 0.14 150) |
| Background | oklch(1 0 0) | oklch(0.15 0 0) |
| Text | oklch(0.45 0 0) | oklch(0.70 0 0) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Code Standards

- Use ESLint for code quality
- Write tests for new features
- Follow existing code style
- Keep components small and focused
- Document complex logic

## 🐛 Known Issues & Limitations

- None currently documented

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Chythanya**
- GitHub: [@chythanya](https://github.com/chythanya)

## 📞 Support

For issues and questions:
1. Check existing [GitHub Issues](https://github.com/chythanya/task_manager/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce bugs

## 🗺️ Roadmap

- [ ] Dark mode toggle
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task priorities
- [ ] Collaborative tasks
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Recurring tasks

## 🔗 Useful Links

- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)

---
