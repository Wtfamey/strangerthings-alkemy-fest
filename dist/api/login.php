<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)){
    $query = "SELECT id, full_name, email, password, role FROM users WHERE email = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$data->email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($user && password_verify($data->password, $user['password'])){
        // Start session and set session variables
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['full_name'] = $user['full_name'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['logged_in'] = true; // Add logged in flag
        
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "Login successful.",
            "user" => array(
                "id" => $user['id'],
                "full_name" => $user['full_name'],
                "email" => $user['email'],
                "role" => $user['role']
            )
        ));
    } else {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "Invalid email or password."
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Email and password are required."
    ));
}
?>
