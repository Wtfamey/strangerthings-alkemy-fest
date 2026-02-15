
CREATE DATABASE IF NOT EXISTS stranger_things_db;
USE stranger_things_db;


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS event_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subtitle VARCHAR(200),
    color VARCHAR(20) NOT NULL,
    image_src VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'confirmed',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (user_id, event_id)
);


INSERT INTO users (full_name, email, password, role) VALUES 
('Admin User', 'admin@strangerthings.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON DUPLICATE KEY UPDATE role = 'admin';


INSERT INTO users (full_name, email, password, role) VALUES 
('Test User', 'user@strangerthings.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user')
ON DUPLICATE KEY UPDATE role = 'user';


INSERT INTO event_types (name, subtitle, color, image_src, description) VALUES
('Technical', '(THE LAB)', 'purple', '/arcade-purple.png', 'Technical events including hackathons, coding competitions, and workshops'),
('Esports', '(THE ARCADE)', 'green', '/arcade-green.png', 'Gaming tournaments and esports competitions'),
('Sports', '(HAWKINS TIGERS)', 'red', '/arcade-red.png', 'Sports events and athletic competitions'),
('Cultural', "(SNOW BALL '84)", 'cyan', '/arcade-cyan.png', 'Cultural events including music, arts, and performances')
ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    subtitle = VALUES(subtitle),
    color = VALUES(color),
    image_src = VALUES(image_src),
    description = VALUES(description);

-- Insert sample events
INSERT INTO events (event_type_id, title, description, date, location, capacity, price) VALUES
(1, 'Code Demogorgon', 'Hackathon competition', '2024-03-20 09:00:00', 'Tech Lab', 100, 299.00),
(1, 'Mind Flayer Quiz', 'Technical quiz competition', '2024-03-21 14:00:00', 'Quiz Hall', 150, 199.00),
(1, 'Hawkins AV Club', 'Robotics workshop', '2024-03-22 10:00:00', 'Workshop Room', 50, 399.00),
(2, 'Gaming Tournament', 'Esports championship', '2024-03-23 12:00:00', 'Gaming Arena', 200, 149.00),
(2, 'Speedrun Challenge', 'Speedrun competition', '2024-03-24 15:00:00', 'Gaming Arena', 80, 99.00),
(2, 'VR Championship', 'Virtual reality gaming', '2024-03-25 11:00:00', 'VR Room', 40, 249.00),
(3, 'Basketball Championship', '3x3 basketball tournament', '2024-03-26 08:00:00', 'Sports Complex', 120, 179.00),
(3, 'Football League', '5-a-side football', '2024-03-27 16:00:00', 'Football Ground', 100, 149.00),
(3, 'Athletics Meet', 'Track and field events', '2024-03-28 09:00:00', 'Athletics Track', 200, 99.00),
(4, 'Music Competition', 'Battle of the bands', '2024-03-29 18:00:00', 'Auditorium', 300, 199.00),
(4, 'Art Exhibition', 'Digital art showcase', '2024-03-30 10:00:00', 'Art Gallery', 100, 149.00),
(4, 'Theater Performance', 'Drama competition', '2024-03-31 19:00:00', 'Theater Hall', 250, 179.00)
ON DUPLICATE KEY UPDATE 
    title = VALUES(title),
    description = VALUES(description),
    date = VALUES(date),
    location = VALUES(location),
    capacity = VALUES(capacity),
    price = VALUES(price);
