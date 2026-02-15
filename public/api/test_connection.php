<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Test database connection
include_once 'config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        // Test if users table exists
        $stmt = $db->query("SHOW TABLES LIKE 'users'");
        $usersTableExists = $stmt->rowCount() > 0;
        
        // Test if event_types table exists
        $stmt = $db->query("SHOW TABLES LIKE 'event_types'");
        $eventTypesTableExists = $stmt->rowCount() > 0;
        
        echo json_encode([
            'success' => true,
            'message' => 'Database connection successful',
            'tables' => [
                'users' => $usersTableExists,
                'event_types' => $eventTypesTableExists
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
