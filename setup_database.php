<?php
// Database setup script for XAMPP
header("Content-Type: text/plain; charset=UTF-8");

// Connect to MySQL without database first
try {
    $conn = new PDO("mysql:host=localhost", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✓ Connected to MySQL\n";
} catch(PDOException $e) {
    echo "✗ MySQL connection failed: " . $e->getMessage() . "\n";
    exit;
}

// Create database
try {
    $conn->exec("CREATE DATABASE IF NOT EXISTS stranger_things_db");
    $conn->exec("USE stranger_things_db");
    echo "✓ Database created/selected\n";
} catch(PDOException $e) {
    echo "✗ Database error: " . $e->getMessage() . "\n";
    exit;
}

// Create events table
try {
    $sql = "CREATE TABLE IF NOT EXISTS events (
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
    )";
    $conn->exec($sql);
    echo "✓ Events table created\n";
} catch(PDOException $e) {
    echo "✗ Events table error: " . $e->getMessage() . "\n";
}

// Create registrations table
try {
    $sql = "CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        college VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    )";
    $conn->exec($sql);
    echo "✓ Registrations table created\n";
} catch(PDOException $e) {
    echo "✗ Registrations table error: " . $e->getMessage() . "\n";
}

// Create users table
try {
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $conn->exec($sql);
    echo "✓ Users table created\n";
} catch(PDOException $e) {
    echo "✗ Users table error: " . $e->getMessage() . "\n";
}

// Insert sample events
try {
    $check_events = $conn->prepare("SELECT COUNT(*) as count FROM events");
    $check_events->execute();
    $event_count = $check_events->fetch(PDO::FETCH_ASSOC)['count'];
    
    if ($event_count == 0) {
        $sql = "INSERT INTO events (title, description, date, location, capacity, price) VALUES
        ('TECHNICAL QUESTS', 'The ultimate coding challenge in Hawkins Lab', '2024-03-15', 'Hawkins Lab', 100, 299.00),
        ('CULTURAL FESTIVITIES', 'Snow Ball 1984 themed cultural night', '2024-03-16', 'Hawkins High School', 200, 199.00),
        ('E-SPORTS TOURNAMENT', 'Gaming marathon at the Palace Arcade', '2024-03-17', 'Palace Arcade', 150, 149.00),
        ('SPORTS LEGENDS', 'Hawkins Tigers sports championship', '2024-03-18', 'Hawkins Community Center', 120, 99.00)";
        $conn->exec($sql);
        echo "✓ Sample events inserted\n";
    } else {
        echo "✓ Events already exist ($event_count events)\n";
    }
} catch(PDOException $e) {
    echo "✗ Events insertion error: " . $e->getMessage() . "\n";
}

// Insert admin user
try {
    $check_users = $conn->prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
    $check_users->execute();
    $admin_count = $check_users->fetch(PDO::FETCH_ASSOC)['count'];
    
    if ($admin_count == 0) {
        $hashed_password = password_hash('admin123', PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (username, email, password, role) VALUES
        ('admin', 'admin@strangerthings.com', :password, 'admin')";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->execute();
        echo "✓ Admin user created (username: admin, password: admin123)\n";
    } else {
        echo "✓ Admin user already exists\n";
    }
} catch(PDOException $e) {
    echo "✗ Admin user creation error: " . $e->getMessage() . "\n";
}

echo "\n🎉 Database setup completed!\n\n";

// Test the events API
echo "Testing events API...\n";
try {
    $stmt = $conn->prepare("SELECT id, title, date, location, capacity FROM events ORDER BY date ASC");
    $stmt->execute();
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Found " . count($events) . " events:\n";
    foreach($events as $event) {
        echo "- " . $event['title'] . " (" . $event['date'] . ") at " . $event['location'] . "\n";
    }
} catch(PDOException $e) {
    echo "✗ API test error: " . $e->getMessage() . "\n";
}
?>
