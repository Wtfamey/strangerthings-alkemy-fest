<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Simple router
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Remove /api/ prefix
$path = str_replace('/api/', '', $request_uri);
$path_parts = explode('/', $path);
$endpoint = $path_parts[0] ?? '';
$resource = $path_parts[1] ?? '';

// Route to appropriate files
switch($endpoint) {
    case 'users':
        if ($resource === 'manage.php') {
            include 'users/manage.php';
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
        }
        break;
    case 'events':
        if ($resource === 'manage.php') {
            include 'events/manage.php';
        } elseif ($resource === 'read.php') {
            include 'events/read.php';
        } elseif ($resource === 'create.php') {
            include 'events/create.php';
        } elseif ($resource === 'delete.php') {
            include 'events/delete.php';
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
        }
        break;
    case 'registrations':
        if ($resource === 'create.php') {
            include 'registrations/create.php';
        } elseif ($resource === 'read.php') {
            include 'registrations/read.php';
        } elseif ($resource === 'update.php') {
            include 'registrations/update.php';
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
        }
        break;
    case 'test':
        echo json_encode([
            "status" => "success",
            "message" => "API is working!",
            "timestamp" => date("Y-m-d H:i:s")
        ]);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
?>
