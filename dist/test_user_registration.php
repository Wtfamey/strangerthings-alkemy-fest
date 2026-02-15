<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

echo "=== TESTING USER REGISTRATION ===\n\n";

// Test user authentication
echo "1. Testing user login...\n";
try {
    // Test admin login
    $admin_data = array(
        'email' => 'admin@strangerthings.com',
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
    );
    
    $admin_post = http_build_query($admin_data);
    $admin_context = stream_context_create(array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $admin_post
        )
    ));
    
    $admin_result = file_get_contents('http://localhost:5173/api/login.php', false, $admin_context);
    $admin_response = json_decode($admin_result, true);
    
    echo "Admin login result: " . ($admin_response['success'] ? "SUCCESS" : "FAILED") . "\n";
    
    if ($admin_response['success'] && isset($admin_response['token'])) {
        echo "Admin token: " . $admin_response['token'] . "\n";
        
        // Test user registration with admin token
        echo "\n2. Testing user registration API...\n";
        
        $reg_data = array(
            'user_id' => 2, // Test User ID
            'event_id' => 1  // Test Event ID
        );
        
        $reg_post = json_encode($reg_data);
        $reg_context = stream_context_create(array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-Type: application/json',
                'content' => $reg_post
            )
        ));
        
        $reg_result = file_get_contents('http://localhost:5173/api/registrations/create.php', false, $reg_context);
        $reg_response = json_decode($reg_result, true);
        
        echo "Registration API result: " . json_encode($reg_response, JSON_PRETTY_PRINT) . "\n";
        
    } else {
        echo "Admin login failed - cannot test registration\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== TEST COMPLETE ===\n";
?>
