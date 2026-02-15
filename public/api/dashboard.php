<?php
// Admin dashboard API endpoint
header("Content-Type: application/json");

include_once 'config/database.php';
$database = new Database();
$db = $database->getConnection();

// Get user stats
$user_query = "SELECT COUNT(*) as total_users, 
               SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admin_count,
               SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as user_count 
               FROM users";
$user_stmt = $db->prepare($user_query);
$user_stmt->execute();
$user_stats = $user_stmt->fetch(PDO::FETCH_ASSOC);

// Get event stats
$event_query = "SELECT COUNT(*) as total_events FROM events";
$event_stmt = $db->prepare($event_query);
$event_stmt->execute();
$event_stats = $event_stmt->fetch(PDO::FETCH_ASSOC);

// Get registration stats
$reg_query = "SELECT COUNT(*) as total_registrations,
              SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_count,
              SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count
              FROM registrations";
$reg_stmt = $db->prepare($reg_query);
$reg_stmt->execute();
$reg_stats = $reg_stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "status" => "success",
    "dashboard" => [
        "users" => $user_stats,
        "events" => $event_stats,
        "registrations" => $reg_stats
    ],
    "timestamp" => date("Y-m-d H:i:s")
]);
?>
