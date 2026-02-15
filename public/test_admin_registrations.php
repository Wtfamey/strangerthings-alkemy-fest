<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== TESTING ADMIN REGISTRATIONS PAGE ===\n\n";

// Test 1: Check if API exists and works
echo "1. Testing registrations API...\n";
try {
    $response = file_get_contents('http://localhost:5173/api/registrations/read.php');
    echo "API Response: " . $response . "\n";
    
    $data = json_decode($response);
    if ($data && isset($data['success'])) {
        echo "✅ API working - Success: " . $data['success'] . "\n";
        echo "Records found: " . (isset($data['records']) ? count($data['records']) : 0) . "\n";
    } else {
        echo "❌ API failed - Response: " . $response . "\n";
    }
} catch (Exception $e) {
    echo "❌ API Error: " . $e->getMessage() . "\n";
}

echo "\n2. Testing admin authentication...\n";
session_start();
if (isset($_SESSION['user_id'])) {
    echo "✅ Admin logged in - User ID: " . $_SESSION['user_id'] . "\n";
    echo "User name: " . ($_SESSION['full_name'] ?? 'Not set') . "\n";
    echo "User role: " . ($_SESSION['role'] ?? 'Not set') . "\n";
} else {
    echo "❌ Admin NOT logged in\n";
}

echo "\n3. Testing database connection...\n";
try {
    include_once '../config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    echo "✅ Database connected\n";
    
    // Test query
    $stmt = $db->query("SELECT COUNT(*) as total FROM registrations");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Total registrations in database: " . $result['total'] . "\n";
    
} catch (Exception $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
}

echo "\n=== TEST COMPLETE ===\n";
?>
