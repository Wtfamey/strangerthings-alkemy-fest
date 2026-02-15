<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== DEBUGGING REGISTRATIONS API ===\n\n";

// Check if file exists and is readable
$api_file = __DIR__ . '/api/registrations/read.php';
echo "API File: $api_file\n";
echo "File exists: " . (file_exists($api_file) ? "YES" : "NO") . "\n";
echo "File readable: " . (is_readable($api_file) ? "YES" : "NO") . "\n\n";

// Test database connection
try {
    include_once 'config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    echo "Database connection: ✅ SUCCESS\n";
} catch (Exception $e) {
    echo "Database connection: ❌ ERROR - " . $e->getMessage() . "\n";
}

// Test the query
try {
    $query = "SELECT COUNT(*) as total FROM registrations";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Test query result: " . $result['total'] . " registrations found\n";
} catch (Exception $e) {
    echo "Test query error: " . $e->getMessage() . "\n";
}

// Check registrations table structure
try {
    $stmt = $db->query("DESCRIBE registrations");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "\nRegistrations table structure:\n";
    foreach ($columns as $column) {
        echo "- {$column['Field']} | {$column['Type']} | {$column['Null']}\n";
    }
} catch (Exception $e) {
    echo "Table structure error: " . $e->getMessage() . "\n";
}

echo "\n=== DEBUG COMPLETE ===\n";
?>
