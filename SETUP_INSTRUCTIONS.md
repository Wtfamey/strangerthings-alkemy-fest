# Stranger Things 2026 - Setup Instructions

## Database Setup

### 1. Start XAMPP Services
- Open XAMPP Control Panel
- Start Apache (Port 80)
- Start MySQL (Port 3306)

### 2. Create Database
- Open phpMyAdmin (http://localhost/phpmyadmin)
- Create new database named: `stranger_things_db`
- Import the SQL file: `database/setup_database.sql`

### 3. Verify Database Tables
After importing, you should have these tables:
- `users` (with default admin and test users)
- `event_types` (4 main categories)
- `events` (sample events)
- `registrations`

## Default Login Credentials

### Admin User
- Email: `admin@strangerthings.com`
- Password: `admin123`

### Test User
- Email: `user@strangerthings.com`
- Password: `user123`

## Frontend Setup

### 1. Install Dependencies
```bash
cd C:\xampp\htdocs\strangerthings2026
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:5173
- API Test: http://localhost/api/test_connection.php

## Features

### 1. Authentication
- ✅ Login functionality
- ✅ User registration
- ✅ Admin/User roles
- ✅ Protected routes

### 2. Events Management
- ✅ 4 event types (Technical, Esports, Sports, Cultural)
- ✅ Arcade-style event cards
- ✅ Event creation/editing (Admin)
- ✅ Event registration

### 3. Upside Down Feature
- ✅ Video player on switch toggle
- ✅ Full-screen video experience
- ✅ Event schedule download
- ✅ Responsive design

### 4. Admin Panel
- ✅ Event management
- ✅ User management
- ✅ Registration management
- ✅ Dashboard

## API Endpoints

### Authentication
- `POST /api/auth/login.php` - User login
- `POST /api/auth/register.php` - User registration

### Events
- `GET /api/events/read.php` - Get all events
- `POST /api/events/create.php` - Create event
- `GET /api/event_types/read.php` - Get event types

### Test
- `GET /api/test_connection.php` - Test database connection

## Troubleshooting

### 1. Login Issues
- Check if database is created and imported
- Verify Apache and MySQL are running
- Check browser console for errors

### 2. API Issues
- Check if proxy is configured in vite.config.ts
- Verify PHP files are in public/api/ directory
- Test with /api/test_connection.php

### 3. Video Issues
- Ensure video file exists in public/ folder
- Check video format compatibility
- Verify file permissions

## File Structure

```
strangerthings2026/
├── database/
│   └── setup_database.sql
├── public/
│   ├── api/
│   │   ├── auth/
│   │   ├── events/
│   │   └── config/
│   └── strangerthingsvedio.MOV
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   └── layouts/
│   └── styles/
└── package.json
```

## Development Notes

1. The frontend runs on port 5173 (Vite dev server)
2. API calls are proxied to port 80 (Apache)
3. Database connection uses MySQL on port 3306
4. All API endpoints support CORS for development

## Next Steps

1. Set up the database using the provided SQL file
2. Test login with default credentials
3. Explore admin panel features
4. Test event registration
5. Try the upside-down video feature
