<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();

if (isset($_SESSION['user_id'])) {
    // Get user details from database
    include_once '../config/database.php';
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT id, full_name, email, role FROM users WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo json_encode(array(
            "success" => true,
            "user" => array(
                "id" => $user['id'],
                "full_name" => $user['full_name'],
                "email" => $user['email'],
                "role" => $user['role']
            )
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "No active session found"
        ));
    }
?>
