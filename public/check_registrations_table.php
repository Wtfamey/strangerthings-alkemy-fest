<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

echo "=== CHECKING REGISTRATIONS TABLE STRUCTURE ===\n\n";

// Check registrations table structure
$stmt = $db->query("DESCRIBE registrations");
$columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "Registrations table columns:\n";
foreach ($columns as $column) {
    echo "- {$column['Field']} | {$column['Type']} | {$column['Null']} | {$column['Default']}\n";
}

echo "\nChecking for date columns...\n";

// Check for various date column names
$date_columns = ['created_at', 'registration_date', 'date', 'timestamp'];
foreach ($date_columns as $col) {
    $check = $db->query("SHOW COLUMNS FROM registrations LIKE '$col'");
    if ($check->rowCount() > 0) {
        echo "✅ Found column: $col\n";
    } else {
        echo "❌ No column: $col\n";
    }
}

echo "\nSample data check:\n";
try {
    $sample = $db->query("SELECT * FROM registrations LIMIT 1");
    if ($sample->rowCount() > 0) {
        $row = $sample->fetch(PDO::FETCH_ASSOC);
        echo "Sample registration record:\n";
        foreach ($row as $key => $value) {
            echo "- $key: $value\n";
        }
    } else {
        echo "No registration records found\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== CHECK COMPLETE ===\n";
?>
