# NoteSphere 📝
### Scalable Full-Stack Note-Taking Application with JWT Authentication

> A modern, secure, and scalable web application built for the *Frontend Developer Intern Assignment*. This project demonstrates proficiency in building production-ready applications with React, Node.js, MongoDB, and industry-standard security practices.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

---


## 🎯 Problem Statement

*Challenge:* Build a scalable web application with authentication and dashboard within 3 days.

*Solution:* NoteSphere addresses the common problem of scattered notes across different platforms by providing a centralized, secure, and user-friendly note management system. The application implements:
- JWT-based authentication for secure user sessions
- CRUD operations on notes (the sample entity)
- Responsive UI with real-time updates
- Scalable architecture for future enhancements

---

## 🌐 Live Demo

*Frontend:* [Deployed Link Here]  
*Backend API:* [https://notesapp-server-41bd.onrender.com]  
*API Documentation:* [Postman Collection](#-api-documentation)

*Test Credentials:*

Email: demo@notesphere.com
Password: Demo@123


---

## ✨ Core Features

### 🔐 Authentication System
- *User Registration* with email validation and password strength requirements
- *Secure Login* with JWT token generation
- *Password Hashing* using bcrypt (salt rounds: 10)
- *Protected Routes* - Dashboard accessible only to authenticated users
- *Auto Logout* on token expiration
- *Persistent Sessions* with localStorage token management

### 📝 Note Management (CRUD)
- *Create Notes* with title, description, tags, and pinning
- *View All Notes* associated with authenticated user
- *Edit Notes* with real-time updates
- *Delete Notes* with confirmation dialog
- *Pin Important Notes* for quick access
- *Search & Filter* by keywords, tags, or pinned status

### 🎨 User Experience
- *Responsive Design* - Works seamlessly on mobile, tablet, and desktop
- *Toast Notifications* for instant user feedback
- *Loading States* for better UX during API calls
- *Form Validation* (both client-side and server-side)
- *Empty States* with helpful messages
- *Error Handling* with user-friendly messages

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| *React* | UI Library | 18+ |
| *Vite* | Build Tool | Latest |
| *Tailwind CSS* | Styling Framework | 3+ |
| *React Router DOM* | Client-side Routing | 6+ |
| *Axios* | HTTP Client | Latest |
| *React Toastify* | Notifications | Latest |
| *Context API* | State Management | Built-in |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| *Node.js* | Runtime Environment | 14+ |
| *Express* | Web Framework | 4+ |
| *MongoDB* | NoSQL Database | Latest |
| *Mongoose* | ODM | Latest |
| *JWT* | Authentication | Latest |
| *Bcrypt* | Password Hashing | Latest |
| *CORS* | Cross-Origin Support | Latest |
| *Dotenv* | Environment Variables | Latest |

---

## 🏗 Architecture
```

┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  React App   │  │   Context    │  │   Routing    │      │
│  │  (Vite)      │  │   Provider   │  │  (Protected) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP/HTTPS
                            │ (Axios)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       API LAYER (REST)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Express    │  │  JWT Auth    │  │     CORS     │      │
│  │   Routes     │  │  Middleware  │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Mongoose
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  MongoDB     │  │   Schemas    │                         │
│  │  (NoSQL)     │  │  User/Note   │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. *User Action* → React Component
2. *API Request* → Axios with JWT token
3. *Authentication* → JWT Middleware validates token
4. *Controller* → Business logic execution
5. *Database* → Mongoose queries MongoDB
6. *Response* → JSON data back to frontend
7. *UI Update* → React state updates, UI re-renders

---

## 🔒 Security Implementation

### Password Security
- *Bcrypt Hashing* with salt rounds of 10
- *Password Strength Validation* (min 8 characters, uppercase, lowercase, number, special char)
- *No Plain Text Storage* - passwords are always hashed

### JWT Authentication
- *Token-Based Auth* - Stateless authentication
- *Secure Token Storage* - localStorage with XSS protection considerations
- *Token Expiration* - 7-day expiry for balance between security and UX
- *Middleware Protection* - All note routes require valid JWT

### API Security
```
javascript
// JWT Middleware Example
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
```


### Input Validation
- *Server-Side Validation* for all inputs
- *Client-Side Validation* for better UX
- *Mongoose Schema Validation* for data integrity
- *XSS Protection* through input sanitization

### Additional Security Measures
- *CORS Configuration* - Controlled cross-origin requests
- *Environment Variables* - Sensitive data in .env files
- *Error Handling* - No sensitive info in error messages
- *MongoDB Injection Prevention* - Mongoose parameterized queries

---

## 🚀 Getting Started

### Prerequisites
bash
Node.js >= 14.x
MongoDB >= 4.x
npm or yarn


### Installation

1. *Clone the repository*
bash
git clone https://github.com/AbhishekMane06/Notesapp.git
cd Notesapp


2. *Setup Backend*
bash
cd server
npm install

# Create .env file
```
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/notesphere
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
EOF
```

# Start backend server
npm run dev


3. *Setup Frontend*
bash
cd ../frontend
npm install

# Start frontend dev server
npm run dev


4. *Access the Application*
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api 

### Production Build
bash
# Frontend
cd frontend
npm run build

# Backend 
cd server
npm start


---

## 📚 API Documentation

### Base URL

https://notesapp-server-41bd.onrender.com



### Authentication Endpoints

#### Register User

```
http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

#### Login User

```
http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

```

### Note Endpoints (Protected)

#### Create Note

```
http
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Note",
  "description": "This is a sample note",
  "tags": ["work", "important"],
  "isPinned": false
}

Response: 201 Created
{
  "message": "Note created successfully",
  "note": { ... }
}

```

#### Get All Notes

```
http
GET /notes
Authorization: Bearer <token>

Response: 200 OK
{
  "notes": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My First Note",
      "description": "This is a sample note",
      "tags": ["work", "important"],
      "isPinned": false,
      "userId": "507f1f77bcf86cd799439012",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Update Note
```
http
PUT /notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "isPinned": true
}

Response: 200 OK
{
  "message": "Note updated successfully",
  "note": { ... }
}
```

#### Delete Note
```
http
DELETE /notes/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Note deleted successfully"
}
```

### Postman Collection
📁 *[Download Postman Collection](./postman/NoteSphere_API.postman_collection.json)*

Import this collection into Postman for easy API testing. It includes:
- Pre-configured requests for all endpoints
- Environment variables setup
- Example requests and responses

---

## 📁 Project Structure

```
NoteSphere/
│
├── frontend/                      # React Frontend
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Header.jsx        # Navigation header
│   │   │   ├── NoteCard.jsx      # Individual note display
│   │   │   └── NoteModal.jsx     # Create/Edit modal
│   │   ├── context/
│   │   │   └── ContextProvider.jsx  # Global state management
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Dashboard with notes
│   │   │   ├── Login.jsx         # Login page
│   │   │   └── Signup.jsx        # Registration page
│   │   ├── App.jsx               # Main app component
│   │   ├── App.css               # Global styles
│   │   └── main.jsx              # Entry point
│   ├── public/                   # Static assets
│   ├── .env                      # Environment variables
│   ├── vite.config.js            # Vite configuration
│   └── package.json              # Dependencies
│
├── server/                        # Node.js Backend
│   ├── controller/
│   │   └── noteController.js     # Business logic for notes
│   ├── db/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── middleware.js         # JWT authentication
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Note.js               # Note schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── notes.js              # Note routes
│   ├── .env                      # Environment variables
│   ├── index.js                  # Server entry point
│   └── package.json              # Dependencies
│
├── postman/                       # API documentation
│   └── NoteSphere_API.postman_collection.json
│
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

---

## 📈 Scalability Considerations

### Current Implementation
- *Modular Architecture* - Separation of concerns (MVC pattern)
- *RESTful API Design* - Stateless, cacheable endpoints
- *JWT Tokens* - Stateless authentication for horizontal scaling
- *Async/Await* - Non-blocking I/O operations
- *Error Handling* - Centralized error handling middleware

### Production-Ready Enhancements

#### 1. *Backend Scalability*
javascript
// Implement rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Add caching layer (Redis)
const redis = require('redis');
const client = redis.createClient();

// Database indexing
User.index({ email: 1 });
Note.index({ userId: 1, createdAt: -1 });


#### 2. *Frontend Optimization*
- *Code Splitting* - Dynamic imports for route-based splitting
- *Lazy Loading* - Load components on demand
- *Memoization* - React.memo() for expensive components
- *Debouncing* - Search input optimization
- *Service Workers* - Offline functionality and caching

#### 3. *Infrastructure*
- *Load Balancer* - Distribute traffic across multiple servers
- *CDN* - Serve static assets from edge locations
- *Container Orchestration* - Docker + Kubernetes for deployment
- *Database Replication* - MongoDB replica sets for high availability
- *Monitoring* - Application Performance Monitoring (APM)

#### 4. *Database Optimization*
javascript
// Implement pagination
GET /notes?page=1&limit=20

// Add database indexes
noteSchema.index({ userId: 1, isPinned: -1, createdAt: -1 });

// Use aggregation for complex queries
Note.aggregate([
  { $match: { userId: ObjectId(userId) } },
  { $sort: { isPinned: -1, createdAt: -1 } }
]);


#### 5. *Security Enhancements*
- *Rate Limiting* - Prevent brute force attacks
- *HTTPS* - SSL/TLS encryption in production
- *Helmet.js* - Security headers
- *Input Sanitization* - Prevent XSS and injection
- *CSRF Protection* - Token-based verification
- *Regular Security Audits* - npm audit, Snyk integration

#### 6. *Microservices Migration Path*

Current Monolith → Modular Monolith → Microservices

Services to extract:
- Auth Service (User management & JWT)
- Note Service (CRUD operations)
- Notification Service (Email/Push)
- Search Service (ElasticSearch integration)


---


## 🚀 Future Enhancements

### Phase 1 (Short-term)
- [ ] Rich text editor (Quill.js or TipTap)
- [ ] Note categories/folders
- [ ] Color-coded tags
- [ ] Dark mode toggle
- [ ] Export notes (PDF, Markdown)

### Phase 2 (Mid-term)
- [ ] Real-time collaboration
- [ ] Note sharing with permissions
- [ ] Image/file attachments
- [ ] Full-text search (ElasticSearch)
- [ ] Note versioning/history

### Phase 3 (Long-term)
- [ ] Mobile applications (React Native)
- [ ] AI-powered note summarization
- [ ] Voice notes integration
- [ ] Markdown support
- [ ] Browser extension

---



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Developer

*Abhishek Mane*

- GitHub: [@AbhishekMane06](https://github.com/AbhishekMane06)
- Email: [abhishekmane467@gmail.com](mailto:abhishekmane467@gmail.com)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---


## 📞 Support

If you have any questions or need clarification about the implementation:

- 📧 Email: [abhishekmane467@gmail.com](abhishekmane467@gmail.com)
- 💬 GitHub Issues: [Create an Issue](https://github.com/AbhishekMane06/Notesapp/issues)
- 📝 Documentation: Check the /docs folder for detailed guides

---

<div align="center">

### ⭐ Star this repository if you found it helpfull!

</div>
