<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== TESTING REGISTRATION API DIRECTLY ===\n\n";

// Test 1: Check if API can connect to database
echo "1. Testing direct API connection...\n";
try {
    include_once '../config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        echo "✅ Database connection successful\n";
        
        // Test a simple query
        $stmt = $db->query("SELECT COUNT(*) as total FROM events");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "✅ Database query successful: Total events: " . $result['total'] . "\n";
        
        // Test the exact same query that registration API uses
        $check_query = "SELECT e.*, COUNT(r.id) as registered_count FROM events e LEFT JOIN registrations r ON e.id = r.event_id WHERE e.id = ? GROUP BY e.id";
        $check_stmt = $db->prepare($check_query);
        $check_stmt->execute([1]); // Use event ID 1 for testing
        $event_data = $check_stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($event_data) {
            echo "✅ Event data found: " . json_encode($event_data, JSON_PRETTY_PRINT) . "\n";
            echo "✅ Event ID: " . $event_data['id'] . "\n";
            echo "✅ Event Title: " . $event_data['title'] . "\n";
            echo "✅ Registration Open: " . ($event_data['registration_open'] ? 'Yes' : 'No') . "\n";
            echo "✅ Registered Count: " . $event_data['registered_count'] . "\n";
            echo "✅ Session Data: " . json_encode($_SESSION) . "\n";
        } else {
            echo "❌ Event not found\n";
        }
        
        $db = null; // Close connection
        
    } else {
        echo "❌ Database connection failed\n";
    }
    
} catch (Exception $e) {
    echo "❌ Exception: " . $e->getMessage() . "\n";
}

echo "\n=== REGISTRATION API TEST COMPLETE ===\n";
?>
