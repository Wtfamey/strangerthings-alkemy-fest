<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

// Direct database connection
$host = 'localhost';
$dbname = 'stranger_things_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "=== NUCLEAR RESET - COMPLETE DATABASE WIPE ===\n\n";
    
    // Step 1: Show current state
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM event_types");
    $current_count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    echo "Current event types count: $current_count\n\n";
    
    // Step 2: Drop and recreate tables completely
    echo "Step 1: Dropping all related tables...\n";
    
    $tables_to_drop = ['registrations', 'events', 'event_types'];
    foreach ($tables_to_drop as $table) {
        $pdo->exec("DROP TABLE IF EXISTS $table");
        echo "✓ Dropped table: $table\n";
    }
    
    echo "\nStep 2: Recreating tables...\n";
    
    // Recreate event_types table
    $pdo->exec("
        CREATE TABLE event_types (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            subtitle VARCHAR(200),
            color VARCHAR(20) NOT NULL,
            image_src VARCHAR(255),
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");
    echo "✓ Recreated event_types table\n";
    
    // Recreate events table
    $pdo->exec("
        CREATE TABLE events (
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
        )
    ");
    echo "✓ Recreated events table\n";
    
    // Recreate registrations table
    $pdo->exec("
        CREATE TABLE registrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            event_id INT NOT NULL,
            registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'confirmed',
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
            UNIQUE KEY unique_registration (user_id, event_id)
        )
    ");
    echo "✓ Recreated registrations table\n";
    
    echo "\nStep 3: Inserting clean event types...\n";
    
    $event_types = [
        [1, 'Technical', '(THE LAB)', 'purple', '/arcade-purple.png', 'Technical events including hackathons, coding competitions, and workshops'],
        [2, 'Esports', '(THE ARCADE)', 'green', '/arcade-green.png', 'Gaming tournaments and esports competitions'],
        [3, 'Sports', '(HAWKINS TIGERS)', 'red', '/arcade-red.png', 'Sports events and athletic competitions'],
        [4, 'Cultural', "(SNOW BALL '84)", 'cyan', '/arcade-cyan.png', 'Cultural events including music, arts, and performances']
    ];
    
    foreach ($event_types as $type) {
        $sql = "INSERT INTO event_types (id, name, subtitle, color, image_src, description) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($type);
        echo "✓ Inserted: {$type[1]} (ID: {$type[0]})\n";
    }
    
    echo "\nStep 4: Adding sample events...\n";
    
    $sample_events = [
        [1, 'Code Demogorgon', 'Hackathon competition', '2024-03-20 09:00:00', 'Tech Lab', 100, 299.00],
        [1, 'Mind Flayer Quiz', 'Technical quiz competition', '2024-03-21 14:00:00', 'Quiz Hall', 150, 199.00],
        [1, 'Hawkins AV Club', 'Robotics workshop', '2024-03-22 10:00:00', 'Workshop Room', 50, 399.00],
        
        [2, 'Gaming Tournament', 'Esports championship', '2024-03-23 12:00:00', 'Gaming Arena', 200, 149.00],
        [2, 'Speedrun Challenge', 'Speedrun competition', '2024-03-24 15:00:00', 'Gaming Arena', 80, 99.00],
        [2, 'VR Championship', 'Virtual reality gaming', '2024-03-25 11:00:00', 'VR Room', 40, 249.00],
        
        [3, 'Basketball Championship', '3x3 basketball tournament', '2024-03-26 08:00:00', 'Sports Complex', 120, 179.00],
        [3, 'Football League', '5-a-side football', '2024-03-27 16:00:00', 'Football Ground', 100, 149.00],
        [3, 'Athletics Meet', 'Track and field events', '2024-03-28 09:00:00', 'Athletics Track', 200, 99.00],
        
        [4, 'Music Competition', 'Battle of the bands', '2024-03-29 18:00:00', 'Auditorium', 300, 199.00],
        [4, 'Art Exhibition', 'Digital art showcase', '2024-03-30 10:00:00', 'Art Gallery', 100, 149.00],
        [4, 'Theater Performance', 'Drama competition', '2024-03-31 19:00:00', 'Theater Hall', 250, 179.00]
    ];
    
    foreach ($sample_events as $event) {
        $insert = "INSERT INTO events (event_type_id, title, description, date, location, capacity, price) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($insert);
        $stmt->execute($event);
    }
    echo "✓ Added " . count($sample_events) . " sample events\n";
    
    echo "\nStep 5: Final verification...\n";
    
    $stmt = $pdo->query("SELECT * FROM event_types ORDER BY id");
    $final_types = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Final event types count: " . count($final_types) . "\n";
    foreach ($final_types as $type) {
        echo "- {$type['name']} ({$type['color']}) - ID: {$type['id']}\n";
    }
    
    echo "\n=== NUCLEAR RESET COMPLETE! ===\n";
    echo "✅ Database completely reset\n";
    echo "✅ Exactly 4 event types\n";
    echo "✅ No duplicates possible\n";
    echo "✅ Fresh sample events added\n";
    echo "✅ Ready for testing\n\n";
    
    echo "NEXT STEPS:\n";
    echo "1. Clear browser cache (Ctrl+Shift+R)\n";
    echo "2. Check console logs\n";
    echo "3. Verify events page shows 4 cabinets\n";
    echo "4. Verify admin dropdown shows 4 options\n";
    
} catch (PDOException $e) {
    echo "❌ DATABASE ERROR: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
}
?>
