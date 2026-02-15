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
    case 'test':
        if ($resource === 'connection.php') {
            include 'test_connection.php';
        } else {
            echo json_encode([
                "status" => "success",
                "message" => "API is working!",
                "timestamp" => date("Y-m-d H:i:s")
            ]);
        }
        break;
    case 'auth':
        if ($resource === 'login.php') {
            include 'auth/login.php';
        } elseif ($resource === 'register.php') {
            include 'auth/register.php';
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Auth endpoint not found']);
        }
        break;
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
    case 'event_types':
        if ($resource === 'read.php') {
            include 'event_types/read.php';
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Event types endpoint not found']);
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
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
?>
