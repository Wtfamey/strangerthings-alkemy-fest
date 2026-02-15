<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== TESTING COMPLETE REGISTRATION FLOW ===\n\n";

// Test 1: Simulate login and session
echo "1. Simulating user login...\n";
session_start();
$_SESSION['user_id'] = 2; // Test User ID
$_SESSION['full_name'] = 'Test User';
$_SESSION['email'] = 'user@strangerthings.com';
$_SESSION['role'] = 'user';
$_SESSION['logged_in'] = true;
echo "✅ Session created: User ID = " . $_SESSION['user_id'] . "\n";

// Test 2: Simulate registration request
echo "\n2. Simulating registration request...\n";
$registration_data = array(
    'user_id' => 2,
    'event_id' => 1
);

$api_url = 'http://localhost:5173/api/registrations/create.php';
$post_data = json_encode($registration_data);

$context = stream_context_create(array(
    'http' => array(
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => $post_data
    )
));

echo "Sending request to: $api_url\n";
echo "Request data: $post_data\n";

$response = file_get_contents($api_url, false, $context);
echo "Response: $response\n";

// Test 3: Check response
if ($response !== false) {
    $response_data = json_decode($response);
    if ($response_data && isset($response_data['success'])) {
        echo "✅ Registration successful: " . $response_data['message'] . "\n";
    } else {
        echo "❌ Registration failed: " . json_encode($response_data) . "\n";
    }
} else {
    echo "❌ Failed to call registration API\n";
}

echo "\n=== REGISTRATION FLOW TEST COMPLETE ===\n";
?>
