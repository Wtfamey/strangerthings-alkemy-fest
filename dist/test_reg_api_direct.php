<?php
// Test the registrations API directly
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Content-Type: application/json\n\n";

// Test basic JSON output
try {
    $test_data = array(
        "success" => true,
        "records" => array(
            array(
                "id" => 1,
                "user_name" => "Test User",
                "event_title" => "Test Event",
                "status" => "confirmed"
            )
        )
    );
    
    echo json_encode($test_data);
} catch (Exception $e) {
    echo json_encode(array(
        "success" => false,
        "error" => $e->getMessage()
    ));
}
?>
