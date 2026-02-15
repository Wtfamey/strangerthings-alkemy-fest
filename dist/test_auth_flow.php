<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== TESTING AUTHENTICATION FLOW ===\n\n";

// Test 1: Check if user is logged in
echo "1. Testing user authentication state...\n";
session_start();
if (isset($_SESSION['user_id'])) {
    echo "✅ User is logged in with ID: " . $_SESSION['user_id'] . "\n";
    echo "User name: " . ($_SESSION['full_name'] ?? 'Not set') . "\n";
    echo "User email: " . ($_SESSION['email'] ?? 'Not set') . "\n";
} else {
    echo "❌ User is NOT logged in\n";
}

echo "\n2. Testing user registration data...\n";
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    // Test fetching user's registrations
    include_once '../config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT r.*, e.title as event_title, et.name as event_type_name 
              FROM registrations r 
              JOIN events e ON r.event_id = e.id 
              JOIN event_types et ON e.event_type_id = et.id 
              WHERE r.user_id = ? 
              ORDER BY r.registration_date DESC";
    $stmt = $db->prepare($query);
    $stmt->execute([$user_id]);
    
    $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Found " . count($registrations) . " registrations for user $user_id:\n";
    foreach ($registrations as $reg) {
        echo "- Event: {$reg['event_title']} ({$reg['event_type_name']}) - Status: {$reg['status']}\n";
    }
} else {
    echo "❌ Cannot test registrations - user not logged in\n";
}

echo "\n=== TEST COMPLETE ===\n";
?>
