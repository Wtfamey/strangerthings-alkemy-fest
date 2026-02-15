<?php
// Simple index file for Railway
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Check if this is an API request
$request_uri = $_SERVER['REQUEST_URI'];

if (strpos($request_uri, '/api/') === 0) {
    // Route to API files
    $api_path = str_replace('/api/', '', $request_uri);
    $api_file = __DIR__ . '/public/api/' . $api_path;
    
    if (file_exists($api_file)) {
        include $api_file;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'API endpoint not found']);
    }
} else {
    // Serve frontend
    if (file_exists(__DIR__ . '/public/index.html')) {
        include __DIR__ . '/public/index.html';
    } else {
        echo json_encode(['message' => 'Stranger Things Alkemy Fest API is running!']);
    }
}
?>
