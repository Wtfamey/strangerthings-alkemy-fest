<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== TESTING DATABASE CONNECTION ===\n\n";

// Test 1: Check if database connection works
echo "1. Testing MySQL connection...\n";
try {
    // Try direct MySQL connection first
    $conn = new PDO("mysql:host=localhost;dbname=stranger_things_db", "root", "");
    if ($conn) {
        echo "✅ Direct MySQL connection successful\n";
        
        // Test if we can query the database
        $stmt = $conn->query("SELECT COUNT(*) as total FROM events");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "✅ Database query successful: Total events: " . $result['total'] . "\n";
        
        // Test if we can query users table
        $stmt = $conn->query("SELECT COUNT(*) as total FROM users");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "✅ Users query successful: Total users: " . $result['total'] . "\n";
        
        // Test if we can query registrations table
        $stmt = $conn->query("SELECT COUNT(*) as total FROM registrations");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "✅ Registrations query successful: Total registrations: " . $result['total'] . "\n";
        
        $conn = null;
        echo "✅ Connection closed successfully\n";
    } else {
        echo "❌ Direct MySQL connection failed\n";
        echo "Error: " . $conn->errorInfo()[2] . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Exception: " . $e->getMessage() . "\n";
}

echo "\n=== DATABASE CONNECTION TEST COMPLETE ===\n";
?>
