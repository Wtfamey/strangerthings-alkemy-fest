-- Stranger Things Alkemy Fest Database Setup
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS stranger_things_db;
USE stranger_things_db;

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.00,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    college VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create users table for admin
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample events
INSERT INTO events (title, description, date, location, capacity, price) VALUES
('TECHNICAL QUESTS', 'The ultimate coding challenge in Hawkins Lab', '2024-03-15', 'Hawkins Lab', 100, 299.00),
('CULTURAL FESTIVITIES', 'Snow Ball 1984 themed cultural night', '2024-03-16', 'Hawkins High School', 200, 199.00),
('E-SPORTS TOURNAMENT', 'Gaming marathon at the Palace Arcade', '2024-03-17', 'Palace Arcade', 150, 149.00),
('SPORTS LEGENDS', 'Hawkins Tigers sports championship', '2024-03-18', 'Hawkins Community Center', 120, 99.00);

-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@strangerthings.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Show tables and data
SELECT 'Database setup completed!' as message;
SHOW TABLES;
SELECT COUNT(*) as event_count FROM events;
SELECT COUNT(*) as user_count FROM users;
